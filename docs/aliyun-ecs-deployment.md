# 阿里云 ECS 部署手册

本文档面向阿里云国内 ECS 实例的部署场景，采用与 GCP 手册相同的核心链路：**本地 WSL 一键构建包 → scp 直传 → 云端拼合拉起**。

与 GCP 方案相比，阿里云路径更直接：

| 对比项 | GCP | 阿里云 ECS |
|--------|-----|------------|
| 文件传输 | IAP 隧道 + split 切片，绕过断联 | scp 直传公网 IP，无需切片 |
| 端口/防火墙 | GCP VPC 防火墙规则 | 阿里云安全组（控制台配置）|
| 反向代理 | Nginx / Cloudflare Tunnel | Nginx + Certbot（或阿里云免费 SSL）|
| 镜像拉取加速 | 无需 | 配置阿里云镜像加速器 |
| 域名访问 | 无强制要求 | 国内域名须完成 ICP 备案 |

> 若尚未完成备案，可先用 ECS 公网 IP 临时访问，备案通过后再绑定域名。详见 [附录 B：ICP 备案说明](#附录-b-icp-备案说明)。

---

## 第一阶段：购买与初始化 ECS

### 1.1 推荐机型

登录 [阿里云 ECS 控制台](https://ecs.console.aliyun.com/) 购买实例，按如下参数选型：

| 参数 | 最低配置 | 推荐配置 |
|------|----------|----------|
| vCPU | 2 核 | 2-4 核 |
| 内存 | 2 GB | **4 GB**（推荐，避免 Node.js OOM）|
| 系统盘 | 30 GB SSD | **50 GB SSD** |
| 操作系统 | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |
| 付费方式 | 包年包月（≥3 个月，备案要求）| 包年包月 |
| 带宽 | 1 Mbps 固定 | 3-5 Mbps（或按流量计费）|

> **备案要求**：中国内地节点，付费方式必须为包年包月且购买时长不低于 3 个月，才能申请 ICP 备案。

### 1.2 配置安全组

ECS 实例创建完成后，在控制台 **网络与安全 → 安全组** 中，为该实例的安全组添加以下**入方向**规则：

| 授权策略 | 协议类型 | 端口范围 | 授权来源 | 说明 |
|----------|----------|----------|----------|------|
| 允许 | TCP | 22/22 | 0.0.0.0/0 | SSH 管理 |
| 允许 | TCP | 80/80 | 0.0.0.0/0 | HTTP（供 Certbot 验证 + 重定向）|
| 允许 | TCP | 443/443 | 0.0.0.0/0 | HTTPS 正式访问 |

> 应用层的 `3005` 端口无需对外开放——它只绑定 `127.0.0.1`，由 Nginx 内部转发。

### 1.3 创建部署目录

SSH 登录服务器后，创建统一的部署工作目录：

```bash
sudo mkdir -p /opt/proj_unihome
sudo chown $USER:$USER /opt/proj_unihome
cd /opt/proj_unihome
```

---

## 第二阶段：服务器环境准备

### 2.1 安装 Docker Engine

```bash
# 卸载旧版本（全新服务器可跳过）
sudo apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# 安装依赖
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# 添加 Docker GPG Key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 添加阿里云 Docker 仓库（解决 Docker Hub 连通性问题）
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker CE + Compose 插件
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin

# 启动并设置开机自启
sudo systemctl enable --now docker

# 允许当前用户免 sudo 使用 docker（重新登录后生效）
sudo usermod -aG docker $USER
newgrp docker
```

### 2.2 配置镜像加速器

登录阿里云控制台 → **容器镜像服务 ACR** → **镜像工具** → **镜像加速器**，获取你专属的加速器地址（格式如 `https://xxxx.mirror.aliyuncs.com`）。

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<'EOF'
{
  "registry-mirrors": ["https://your-accelerator-id.mirror.aliyuncs.com"]
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker

# 验证配置生效
docker info | grep -A 2 "Registry Mirrors"
```

> 注意：将 `your-accelerator-id` 替换为你在控制台拿到的真实 ID。

### 2.3 安装 Nginx

```bash
sudo apt install -y nginx
sudo systemctl enable --now nginx

# 验证安装
nginx -v
```

---

## 第三阶段：本地打包（WSL）

在你的 **WSL 终端**中，进入项目根目录，执行一键打包：

```bash
cd /path/to/proj_unihome
npm run deploy:bundle
```

该命令会调用 `ops/deploy/create-deploy-bundle.sh`，自动完成以下工作：

1. 生成高强度随机密钥、数据库密码，写入 `.env.production`
2. 执行 `npm run backup:all`，备份最新数据库 dump 和 media
3. 本地 `docker build` 构建生产镜像（连接本地开发 DB）
4. `docker save` 导出镜像为 `proj-unihome-app.tar.gz`
5. 将所有文件打包为 `proj-unihome-deploy-bundle.tar.gz`

> **等待时间**：构建阶段约需 5-10 分钟，请耐心等待。

打包完成后，在项目根目录确认产物：

```bash
ls -lh proj-unihome-deploy-bundle.tar.gz
# 预计大小：200MB - 500MB（视镜像和媒体文件量而定）
```

---

## 第四阶段：传输文件到阿里云 ECS

与 GCP（IAP 隧道）不同，阿里云 ECS 有公网 IP，可以直接 scp 传输，**无需切片**。

### 4.1 单文件直传（推荐）

在 **WSL 终端**或 **PowerShell** 中执行（根据你的习惯选择）：

```bash
# WSL 终端（推荐）
scp -P 22 proj-unihome-deploy-bundle.tar.gz \
  your-user@your-ecs-ip:/opt/proj_unihome/
```

```powershell
# Windows PowerShell
scp -P 22 proj-unihome-deploy-bundle.tar.gz `
  your-user@your-ecs-ip:/opt/proj_unihome/
```

> 将 `your-user` 替换为 ECS 登录用户名（默认通常为 `root` 或 `ubuntu`），`your-ecs-ip` 替换为 ECS 公网 IP。

### 4.2 如传输中断（大包备选方案）

若网络较差导致单次传输中断，可先切片再分批传输：

```bash
# 切分为 100MB 小块
split -b 100m proj-unihome-deploy-bundle.tar.gz bundle_part_

# 分批上传
scp -P 22 bundle_part_* your-user@your-ecs-ip:/opt/proj_unihome/

# 服务器端拼合
ssh your-user@your-ecs-ip "cd /opt/proj_unihome && cat bundle_part_* > proj-unihome-deploy-bundle.tar.gz && rm bundle_part_*"
```

### 4.3 验证传输完整性（可选）

```bash
# 本地计算 MD5
md5sum proj-unihome-deploy-bundle.tar.gz

# 服务器端计算 MD5（两者应完全一致）
ssh your-user@your-ecs-ip "md5sum /opt/proj_unihome/proj-unihome-deploy-bundle.tar.gz"
```

---

## 第五阶段：云端解压与服务部署

SSH 登录 ECS：

```bash
ssh your-user@your-ecs-ip
cd /opt/proj_unihome
```

### 5.1 解压部署包

```bash
tar -xzf proj-unihome-deploy-bundle.tar.gz
cd deploy-pkg
ls
# 应看到：compose.prod.yml  .env.production  deploy.sh  backups/  media_backup.tar.gz  proj-unihome-app.tar.gz
```

### 5.2 配置正式域名

编辑自动生成的 `.env.production`，填写你的真实公网域名：

```bash
nano .env.production
```

至少修改以下值：

```env
# 改为你的真实域名（如备案尚未完成，可先用 http://你的ECS公网IP）
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# 其他密钥已由打包脚本自动生成，无需修改
```

> **为什么要填真实域名**：Payload CMS 上传图片时会将绝对路径发给前端；若不改，图片全部裂开无法加载，Next.js sitemap 和 OG 图片也会失效。

### 5.3 恢复媒体文件

如果你使用的是一键脚本，媒体恢复会在 `init` 中自动处理（仅当 `media/` 为空时才会解压）。
如需手动恢复，可执行：

```bash
tar -xzf media_backup.tar.gz -C .
ls media/
```

### 5.4 启动 PostgreSQL 并恢复数据

推荐使用一键初始化（会自动启动 Postgres、等待健康、并恢复 dump）：

```bash
bash deploy.sh init
```

### 5.5 载入镜像并启动应用

常规更新（最快路径，仅更新 app 镜像并重启 app 容器）：

```bash
bash deploy.sh update
```

### 5.6 验证容器状态

```bash
bash deploy.sh ps
# 两个容器均应为 Up / healthy 状态

# 检查应用日志，确认无报错
bash deploy.sh logs app
```

此时应用已在 `127.0.0.1:3005` 监听，用以下命令快速验证：

```bash
curl -I http://127.0.0.1:3005
# 应返回 HTTP 200 或重定向响应
```

---

## 第六阶段：Nginx 反向代理 + HTTPS

### 6.1 创建 Nginx 站点配置（先配 HTTP）

在申请 HTTPS 证书之前，先建立 HTTP 的反代配置，用于 Certbot 的域名验证：

```bash
sudo tee /etc/nginx/sites-available/proj_unihome > /dev/null <<'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Certbot 验证目录（申请证书时使用）
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # 其余请求先转发到应用（之后会改为 HTTPS 重定向）
    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # 针对大型媒体上传增加超时
        client_max_body_size 100m;
        proxy_connect_timeout 60s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }
}
EOF

# 将 yourdomain.com 替换为真实域名
sudo sed -i 's/yourdomain.com/你的真实域名/g' /etc/nginx/sites-available/proj_unihome

# 启用站点
sudo ln -sf /etc/nginx/sites-available/proj_unihome /etc/nginx/sites-enabled/proj_unihome

# 删除默认站点（如有冲突）
sudo rm -f /etc/nginx/sites-enabled/default

# 测试配置语法
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

### 6.2 申请 Let's Encrypt 免费 HTTPS 证书

```bash
# 安装 Certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# 申请证书（自动配置 Nginx）
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

按提示：
1. 输入邮箱（用于证书过期提醒）
2. 同意服务条款
3. Certbot 会自动完成验证并修改 Nginx 配置，将 HTTP 重定向到 HTTPS

### 6.3 验证自动续期

证书有效期 90 天，Certbot 已自动注册 systemd 定时任务续期：

```bash
# 模拟续期，验证配置正确
sudo certbot renew --dry-run

# 查看定时任务状态
sudo systemctl status snap.certbot.renew.timer
```

### 6.4 最终 Nginx 配置确认

Certbot 自动修改后，`/etc/nginx/sites-available/proj_unihome` 的内容大致如下（供参考）：

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 100m;
        proxy_read_timeout 120s;
    }
}
```

> **备选方案**：也可在阿里云控制台 **数字证书管理服务** 中申请阿里云免费 SSL 证书（1 年有效期），下载后手动部署到 Nginx。适合不方便使用命令行申请证书的场景。

---

## 第七阶段：发布后状态核验

完成以上步骤后，逐项确认：

- [ ] 浏览器访问 `https://yourdomain.com`，官网首页正常加载
- [ ] 浏览器地址栏显示绿色锁图标（HTTPS 有效）
- [ ] `http://` 访问自动跳转到 `https://`
- [ ] 访问 `https://yourdomain.com/admin`，Payload 管理后台可登录
- [ ] 管理后台上传一张测试图片，确认能正常显示（检查 `media/` 目录写入权限）
- [ ] 访问 `/zh`、`/en`、`/ja` 多语言路由，页面内容正常
- [ ] `docker ps` 查看两个容器状态均为 `Up`
- [ ] 重启服务器后（`sudo reboot`），容器自动恢复运行（`restart: unless-stopped`）

---

## 附录 A：定时数据库备份

### A.1 宿主机 crontab 方式（简单推荐）

在 ECS 服务器上，使用宿主机 crontab 定期执行 `docker exec pg_dump`：

```bash
# 创建备份脚本
sudo mkdir -p /opt/proj_unihome/backups

tee /opt/proj_unihome/backup-db.sh > /dev/null <<'EOF'
#!/bin/bash
set -e
BACKUP_DIR="/opt/proj_unihome/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/db_backup_${TIMESTAMP}.dump"

# 执行备份
docker exec proj_unihome_postgres pg_dump \
  -U proj_unihome \
  -d proj_unihome \
  -Fc \
  -f /tmp/db_backup_tmp.dump

docker cp proj_unihome_postgres:/tmp/db_backup_tmp.dump "$BACKUP_FILE"

# 只保留最近 7 份备份
ls -t "$BACKUP_DIR"/db_backup_*.dump | tail -n +8 | xargs -r rm

echo "[$(date)] Backup completed: $BACKUP_FILE"
EOF

chmod +x /opt/proj_unihome/backup-db.sh

# 添加定时任务：每天凌晨 3 点执行
(crontab -l 2>/dev/null; echo "0 3 * * * /opt/proj_unihome/backup-db.sh >> /opt/proj_unihome/backups/backup.log 2>&1") | crontab -

# 验证 crontab
crontab -l
```

### A.2 可选：备份到阿里云 OSS（推荐用于生产）

使用 [`isaced/postgres-backup-oss`](https://github.com/isaced/postgres-backup-oss) 镜像，将备份自动上传到阿里云 OSS，更安全可靠：

在 `compose.prod.yml` 的 `services` 下追加：

```yaml
  backup:
    image: isaced/postgres-backup-oss:latest
    restart: unless-stopped
    environment:
      SCHEDULE: "0 3 * * *"        # 每天凌晨 3 点
      POSTGRES_HOST: postgres
      POSTGRES_DATABASE: proj_unihome
      POSTGRES_USER: proj_unihome
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      OSS_BUCKET_NAME: your-oss-bucket
      OSS_REGION: cn-hangzhou
      OSS_ACCESS_KEY_ID: ${OSS_ACCESS_KEY_ID}
      OSS_ACCESS_KEY_SECRET: ${OSS_ACCESS_KEY_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
```

同时在 `.env.production` 中补充：

```env
OSS_ACCESS_KEY_ID=your-ram-access-key-id
OSS_ACCESS_KEY_SECRET=your-ram-access-key-secret
```

---

## 附录 B：ICP 备案说明

在国内服务器上用域名对外访问，**必须完成 ICP 备案**（直接用 IP 访问不需要）。

### B.1 前置要求

- 购买阿里云**中国内地**节点 ECS（如北京/上海/杭州等），付费方式为**包年包月 ≥ 3 个月**
- 域名已完成**实名认证**，并在阿里云 DNS 解析

### B.2 所需材料（个人备案）

- 身份证正反面照片
- 本人手持身份证半身照
- 手机号（核验短信）

企业备案还需：营业执照、法人身份证、授权书等。

### B.3 备案时间参考

| 阶段 | 耗时 |
|------|------|
| 提交材料 + 阿里云初审 | 1 个工作日 |
| 短信核验 | 24 小时内 |
| 管局审核 | **1-20 个工作日**（各省差异大）|
| **合计** | **通常 5-15 天** |

### B.4 备案流程入口

登录阿里云控制台 → 搜索 **"备案"** → 按引导提交（全程线上）。

### B.5 备案通过后

1. 在网站底部添加备案号及链接（法律要求）
2. 将 `NEXT_PUBLIC_SERVER_URL` 修改为正式域名后重启 app 容器

---

## 附录 C：常用运维命令

以下命令在 `/opt/proj_unihome/deploy-pkg` 目录下执行：

```bash
# 查看容器运行状态
bash deploy.sh ps

# 查看应用日志（实时跟踪）
bash deploy.sh logs app

# 查看数据库日志
bash deploy.sh logs postgres

# 重启应用（更换镜像后执行）
bash deploy.sh update

# 停止所有服务
docker compose --project-directory . -f compose.prod.yml --env-file .env.production down
# ⚠️ 切勿加 -v 参数，否则数据库卷数据将被删除

# 进入应用容器 shell
docker exec -it proj_unihome_app sh

# 进入数据库容器 shell
docker exec -it proj_unihome_postgres psql -U proj_unihome -d proj_unihome

# 手动执行数据库备份
/opt/proj_unihome/backup-db.sh

# 查看磁盘使用情况
df -h
du -sh /opt/proj_unihome/media
du -sh /opt/proj_unihome/postgres-data
du -sh /opt/proj_unihome/backups

# 清理 Docker 无用资源（释放磁盘空间）
docker system prune -f
```

---

## 更新部署流程（后续迭代）

当代码有更新，需要重新部署时，只需重复第三和第四阶段：

```bash
# 本地：重新打包（包含最新代码、最新 DB 数据）
npm run deploy:bundle

# 上传新的部署包到 ECS（覆盖旧文件）
scp proj-unihome-deploy-bundle.tar.gz your-user@your-ecs-ip:/opt/proj_unihome/

# 服务器端：解压、载入新镜像、重启 app
ssh your-user@your-ecs-ip
cd /opt/proj_unihome
tar -xzf proj-unihome-deploy-bundle.tar.gz
cd deploy-pkg
bash deploy.sh update
```

> **注意**：更新部署时不需要重跑数据库恢复步骤；只需替换 app 镜像即可，数据库数据由持久化卷保留。
