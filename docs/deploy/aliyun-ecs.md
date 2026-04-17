# 阿里云 ECS 部署手册

本文档面向阿里云国内 ECS 实例的部署场景，采用与 GCP 手册相同的核心链路：**本地 WSL 一键构建包 → scp 直传 → 云端拼合拉起**。

状态：`ACTIVE`（最近审查：2026-04-15）

如果本地已经配置好了 SSH（例如 `Host aliyun`），推荐直接使用本仓库提供的一键脚本完成 bootstrap 与发布：

```bash
# 在 ECS 上安装并启用 Docker Engine、Docker Compose 插件与 Nginx，并写入最小可用的 HTTP 反向代理配置
# （应用端口保持 127.0.0.1:3005 仅本机可访问）
npm run deploy:aliyun:bootstrap

# 在本地构建 init 部署包并上传到 ECS，然后在 ECS 端完成解压、目录切换、必要的初始化与容器拉起
# （可能包含 db dump/media 的恢复逻辑，且不会覆盖既有的 shared/.env.production）
npm run deploy:aliyun:init
```

补充说明：
- `init` 部署包会携带 `postgres-16.tar.gz`（PostgreSQL 镜像）。这样即使服务器无法访问 Docker Hub，也不会因为拉取 `postgres:16` 超时而阻塞首次部署。

后续常规更新（不覆盖服务器数据库与媒体目录）：

```bash
# 在本地构建 update 部署包并上传到 ECS，然后在 ECS 端原子切换 deploy/ 目录并仅重启 app
# （默认不恢复 db/media，不修改 shared/.env.production）
npm run deploy:aliyun:update
```

说明：
- `deploy:aliyun:*` 脚本内部会自动构建对应的部署包；因此不需要手工额外运行 `npm run deploy:bundle:update`。

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

## 最短路径（只需要记住这 3 条命令）

1. 只做一次：准备服务器（安装 Docker/Nginx）：`npm run deploy:aliyun:bootstrap`
2. 首次上线：全量初始化（可能恢复 db/media）：`npm run deploy:aliyun:init`
3. 日常更新：轻量更新（不动 db/media，不改 shared env）：`npm run deploy:aliyun:update`

如果只想把链路跑通，优先使用上面的 3 条命令。本文档后续章节用于排障与解释。

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
# 创建统一的部署根目录（推荐所有生产数据与 deploy 都放在该目录下）
sudo mkdir -p /opt/proj_unihome

# 将目录所有权交给当前登录用户，避免后续频繁使用 sudo
sudo chown $USER:$USER /opt/proj_unihome

# 进入部署根目录，后续所有操作以此为基准
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

命令说明（按出现顺序）：
- `sudo apt remove ... || true`：清理可能存在的旧 Docker 组件，避免安装冲突（全新机器可跳过）。
- `sudo apt update`：刷新 apt 包索引。
- `sudo apt install -y ca-certificates curl gnupg lsb-release`：安装安装源/签名校验所需依赖（证书、curl、gpg、lsb-release）。
- `sudo install -m 0755 -d /etc/apt/keyrings`：创建存放第三方源 GPG key 的目录（官方推荐方式）。
- `curl ... | sudo gpg --dearmor -o ...`：下载 Docker 仓库 GPG key 并写入 keyring。
- `sudo chmod a+r ...`：确保 apt 可读取该 keyring 文件。
- `echo ... | sudo tee ...`：写入 Docker apt 源（此处使用阿里云镜像以改善国内连通性）。
- `sudo apt install -y docker-ce ... docker-compose-plugin`：安装 Docker Engine 与 Compose 插件。
- `sudo systemctl enable --now docker`：启用并立即启动 docker 服务。
- `sudo usermod -aG docker $USER`：将当前用户加入 `docker` 组（使 `docker` 命令免 sudo；需要重新登录或执行 `newgrp` 生效）。
- `newgrp docker`：在当前会话立刻刷新组权限（不必退出重登）。

### 2.2 配置镜像加速器

登录阿里云控制台 → **容器镜像服务 ACR** → **镜像工具** → **镜像加速器**，获取账号对应的加速器地址（格式如 `https://xxxx.mirror.aliyuncs.com`）。

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

> 注意：将 `your-accelerator-id` 替换为控制台提供的真实 ID。

命令说明：
- `sudo mkdir -p /etc/docker`：创建 Docker daemon 配置目录。
- `sudo tee /etc/docker/daemon.json ...`：写入镜像加速器配置（改善 Docker Hub 拉取稳定性与速度）。
- `sudo systemctl daemon-reload`：重载 systemd 配置。
- `sudo systemctl restart docker`：重启 docker 服务应用新配置。
- `docker info | grep ...`：检查镜像加速器配置是否生效。

### 2.3 安装 Nginx

```bash
# 安装 Nginx
sudo apt install -y nginx

# 设置开机自启并立即启动
sudo systemctl enable --now nginx

# 验证安装（输出版本号用于验证安装成功）
nginx -v
```

---

## 第三阶段：本地打包（WSL）

在 **WSL 终端**中进入项目根目录，执行一键打包：

```bash
# 进入仓库根目录
cd /path/to/proj_unihome

# 生成 init 部署包
# （包含镜像导出包，且会尝试打包 db dump/media/CMS 快照用于首次上线或灾备）
npm run deploy:bundle:init
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
# 确认部署包已生成并查看体积（体积会随镜像、媒体量变化）
ls -lh proj-unihome-deploy-bundle.tar.gz
# 预计大小：200MB - 500MB（视镜像和媒体文件量而定）
```

---

## 第四阶段：传输文件到阿里云 ECS

与 GCP（IAP 隧道）不同，阿里云 ECS 有公网 IP，可以直接 scp 传输，**无需切片**。

### 4.1 单文件直传（推荐）

在 **WSL 终端**或 **PowerShell** 中执行（任选其一）：

```bash
# WSL 终端（推荐）
# 将部署包上传到服务器部署根目录（默认 SSH 端口为 22）
scp -P 22 proj-unihome-deploy-bundle.tar.gz \
  your-user@your-ecs-ip:/opt/proj_unihome/
```

```powershell
# Windows PowerShell
# 将部署包上传到服务器部署根目录（默认 SSH 端口为 22）
scp -P 22 proj-unihome-deploy-bundle.tar.gz `
  your-user@your-ecs-ip:/opt/proj_unihome/
```

> 将 `your-user` 替换为 ECS 登录用户名（默认通常为 `root` 或 `ubuntu`），`your-ecs-ip` 替换为 ECS 公网 IP。

### 4.2 如传输中断（大包备选方案）

若网络较差导致单次传输中断，可先切片再分批传输：

```bash
# 将大文件切分为多个 100MB 小块（用于网络不稳定时提高传输成功率）
split -b 100m proj-unihome-deploy-bundle.tar.gz bundle_part_

# 批量上传所有分片
scp -P 22 bundle_part_* your-user@your-ecs-ip:/opt/proj_unihome/

# 在服务器端将分片合并回完整 tar.gz，并删除分片文件
ssh your-user@your-ecs-ip "cd /opt/proj_unihome && cat bundle_part_* > proj-unihome-deploy-bundle.tar.gz && rm bundle_part_*"
```

### 4.3 验证传输完整性（可选）

```bash
# 计算本地部署包的 MD5 校验值
md5sum proj-unihome-deploy-bundle.tar.gz

# 计算服务器端部署包的 MD5 校验值；两者一致表示传输完整无损
ssh your-user@your-ecs-ip "md5sum /opt/proj_unihome/proj-unihome-deploy-bundle.tar.gz"
```

---

## 第五阶段：云端解压与服务部署

SSH 登录 ECS：

```bash
# 登录 ECS
ssh your-user@your-ecs-ip

# 进入部署根目录
cd /opt/proj_unihome
```

### 5.1 解压部署包

```bash
# 解压部署包（解压目录名为 proj-unihome-deploy-bundle/）
tar -xzf proj-unihome-deploy-bundle.tar.gz

# 移除旧的 deploy/ 目录（如果存在）；此目录是“可替换运行目录”
rm -rf deploy || true

# 将新解压目录移动为标准运行目录名 deploy/
mv proj-unihome-deploy-bundle deploy

# 进入运行目录，后续使用 deploy.sh 管理服务
cd deploy

# 检查是否包含 compose.prod.yml、deploy.sh、镜像文件和可选快照
ls
```
### 5.2 配置正式域名（首次部署必做）

为避免后续更新覆盖密钥与数据库口令，生产环境变量建议固定保存在：

```text
/opt/proj_unihome/shared/.env.production
```

如果该文件不存在，可在首次解压后从部署包内复制一份作为起点：

```bash
# 创建生产环境变量固定目录
mkdir -p ../shared

# 将部署包内生成的 .env.production 作为首次落地起点（后续更新不再覆盖该文件）
cp .env.production ../shared/.env.production
```

然后编辑 `../shared/.env.production`，填写真实公网域名：

```bash
# 编辑生产环境变量（至少需要设置 NEXT_PUBLIC_SERVER_URL 为真实域名或公网 IP）
nano ../shared/.env.production
```

至少修改以下值：

```env
# 改为真实域名（如备案尚未完成，可先用 http://ECS公网IP）
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# Cloudflare Turnstile 验证码
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
TURNSTILE_SECRET_KEY=0x4AAAA...

# 工单邮件通知：三选一，生产环境不要混用

# 方案 A（推荐）：Webhook 邮件转发
TICKET_EMAIL_WEBHOOK_URL=https://your-webhook.example.com/ticket-email
TICKET_EMAIL_WEBHOOK_SECRET=replace-with-a-long-random-secret

# 方案 B：正式 SMTP 发信（如阿里云 Direct Mail）
# SMTP_HOST=smtpdm.aliyun.com
# SMTP_PORT=80
# SMTP_SECURE=false
# SMTP_USER=your-smtp-user
# SMTP_PASS=your-smtp-password
# TICKET_EMAIL_TO=ops@example.com
# TICKET_EMAIL_FROM=UniHome <noreply@example.com>

# 方案 C：Resend API
# RESEND_API_KEY=re_xxxxxxxxx
# TICKET_EMAIL_TO=ops@example.com
# TICKET_EMAIL_FROM=UniHome <noreply@example.com>

# 其他密钥已由打包脚本自动生成，无需修改
```

> **为什么要填真实域名**：Payload CMS 上传图片时会将绝对路径发给前端；若不改，图片全部裂开无法加载，Next.js sitemap 和 OG 图片也会失效。
>
> **为什么要补工单相关配置**：
> - `TICKET_EMAIL_WEBHOOK_URL` 用于将官网工单自动转发到你的邮件服务
> - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` 与 `TURNSTILE_SECRET_KEY` 用于启用验证码，阻止脚本刷单

如果你暂时还没有邮件 Webhook 服务，可先只完成 Turnstile 配置；此时工单仍会写入 CMS，但不会发送邮件通知。
生产环境不要保留本地测试用的 `Mailpit` 参数，例如 `SMTP_HOST=127.0.0.1`、`SMTP_PORT=1025`。

### 5.3 配置 Turnstile（推荐生产环境必做）

工单接口已接入 Cloudflare Turnstile。生产环境建议在上线前先完成以下配置：

1. 登录 Cloudflare 控制台
2. 进入 `Turnstile`
3. 新建一个 Site
4. 将站点域名加入允许列表
5. 复制生成的 `Site Key` 和 `Secret Key`
6. 分别写入 `shared/.env.production`：

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
TURNSTILE_SECRET_KEY=0x4AAAA...
```

如果当前只是临时用公网 IP 验证，可先创建一个测试站点并把该 IP 对应访问域名或临时域名加入允许范围；正式域名上线后再切换为正式 Key。

### 5.4 配置工单邮件 Webhook（推荐）

工单在写入 CMS 成功后，会向 `TICKET_EMAIL_WEBHOOK_URL` 发送一个 `POST` 请求。你需要准备一个可用的 Webhook 地址，负责接收 JSON 并转发邮件。

在 `shared/.env.production` 中补充：

```env
TICKET_EMAIL_WEBHOOK_URL=https://your-webhook.example.com/ticket-email
TICKET_EMAIL_WEBHOOK_SECRET=replace-with-a-long-random-secret
```

Webhook 侧建议至少实现：

1. 校验 `Authorization: Bearer <secret>`
2. 解析 JSON 请求体
3. 发送邮件给运营或客服邮箱
4. 成功时返回 `200`
5. 失败时返回非 `2xx`，方便站点日志记录错误

Webhook 请求体格式详见 [ticket-submission.md](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/docs/cms/ticket-submission.md)。

### 5.5 使用阿里云 Direct Mail（推荐 SMTP 方案）

如果你计划直接使用阿里云官方邮件服务上线工单通知，而不是自建 Webhook，请优先参考：

- [aliyun-direct-mail.md](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/docs/deploy/aliyun-direct-mail.md)

该文档已经整理了官方可确认的信息，包括：

1. 开通 Direct Mail
2. 配置发信域名与 DNS
3. 创建 Triggered Emails 类型发件地址
4. 设置 SMTP 密码
5. 选择官方 SMTP 地址与端口
6. 配置 IP 白名单
7. 将 SMTP 参数写入 `shared/.env.production`

### 5.6 恢复媒体文件

如果使用一键脚本，媒体恢复会在 `init` 中自动处理（仅当 `media/` 为空时才会解压）。
如需手动恢复，可执行：

```bash
# 将媒体备份解压到 /opt/proj_unihome/media/
tar -xzf media_backup.tar.gz -C ..

# 检查媒体目录是否存在文件
ls ../media/
```

### 5.7 启动 PostgreSQL 并恢复数据

推荐使用一键初始化（会自动启动 Postgres、等待健康、并恢复 dump）：

```bash
# 首次启动流程（加载镜像、启动 postgres、等待健康检查、可选恢复 db dump/media，然后启动 app）
bash deploy.sh init
```

### 5.8 载入镜像并启动应用

常规更新（最快路径，仅更新 app 镜像并重启 app 容器）：

```bash
# 常规更新流程（默认仅加载新镜像并重启 app；不恢复 db/media）
bash deploy.sh update
```

### 5.9 验证容器状态

```bash
# 查看 app/postgres 容器状态
bash deploy.sh ps

# 检查应用日志，用于确认是否存在数据库连接失败、Payload 启动错误等
bash deploy.sh logs app
```

此时应用已在 `127.0.0.1:3005` 监听，用以下命令快速验证：

```bash
# 在服务器本机验证应用是否可响应（仅检查响应头，不下载正文）
curl -I http://127.0.0.1:3005
# 应返回 HTTP 200 或重定向响应
```

首次启用工单邮件与验证码后，建议额外做一次人工验证：

1. 打开官网联系页，确认表单下方出现 Turnstile 验证框
2. 正常提交一条测试工单，确认 CMS 中出现记录
3. 确认你的 Webhook 服务收到请求并成功发出邮件
4. 刷新页面后重复快速提交，确认频率限制或重复提交提示生效

---

## 第六阶段：配置 DNS 域名解析（阿里云云解析示例）

在配置 Nginx 与 HTTPS 前，需要将你的域名（例如 `yourdomain.com`）解析到该 ECS 的公网 IP。以阿里云万网为例，具体步骤如下：

1. 登录 [阿里云控制台](https://console.aliyun.com/)。
2. 在顶部搜索并进入 **“云解析 DNS”** 页面。
3. 在域名列表中找到您的目标域名，点击右侧 **“解析设置”**。
4. 点击左上角的 **“添加记录”**，我们需要分别**添加两条记录**来支持访问：

**第一条：主域名记录**
- **记录类型**：`A`
- **主机记录**：`@` （代表直接访问主域名）
- **记录值**：填写您 ECS 的**公网 IP 地址**（例如 `8.163.85.108`）
- 点击左下角 **“确定”** 完成第一条的添加。

**第二条：WWW 子域名记录**
- 再次点击 **“添加记录”**。
- **记录类型**：`A`
- **主机记录**：`www` （代表访问带 www 的域名）
- **记录值**：依然填写您 ECS 的**公网 IP 地址**（例如 `8.163.85.108`）
- 再次点击左下角 **“确定”**。

最终您的解析列表应该是这样的对应关系：

| 记录类型 | 主机记录 | 解析请求来源 | 记录值 | TTL | 作用说明 |
| -------- | -------- | ------------ | ------ | --- | -------- |
| A | `@` | 默认 | ECS 公网 IP 地址 | 10分钟 | 用于直接访问 `yourdomain.com` |
| A | `www` | 默认 | ECS 公网 IP 地址 | 10分钟 | 用于访问 `www.yourdomain.com` |

> **版本提示**：如果页面弹出提示“您当前使用的免费版DNS，不适合企业客户”，由于免费版的底层可用性极高且完全免费，对绝大多数网站已经完全足够，**直接点击“不再提示”或关闭该推销弹窗即可**，无需为此付费升级。添加记录后通常会在数分钟内全网生效。

---

## 第七阶段：Nginx 反向代理 + HTTPS

### 7.1 创建 Nginx 站点配置（先配 HTTP）

在申请 HTTPS 证书之前，先建立 HTTP 的反代配置，用于 Certbot 的域名验证：

```bash
# 写入 Nginx 站点配置文件（HTTP 反代到 127.0.0.1:3005，并预留 Certbot 验证目录）
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

# 将配置中的域名占位符替换为真实域名（也可手动使用 nano / vim 编辑该文件替换）
sudo sed -i 's/yourdomain.com/your-real-domain.example/g' /etc/nginx/sites-available/proj_unihome

# 启用站点（创建符号链接）
sudo ln -sf /etc/nginx/sites-available/proj_unihome /etc/nginx/sites-enabled/proj_unihome

# 移除默认站点（避免与新站点冲突）
sudo rm -f /etc/nginx/sites-enabled/default

# 校验 Nginx 配置语法
sudo nginx -t

# 在不中断进程的情况下热重载 Nginx 配置
sudo systemctl reload nginx
```

### 7.2 申请 Let's Encrypt 免费 HTTPS 证书

```bash
# 安装 Certbot（snap 方式）
sudo snap install --classic certbot

# 创建便捷的 certbot 命令软链接（可选，但便于使用）
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# 申请并自动配置 Nginx HTTPS 证书（要求域名解析已指向该 ECS，且 80 端口可访问用于验证）
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

按提示：
1. 输入邮箱（用于证书过期提醒）
2. 同意服务条款
3. Certbot 会自动完成验证并修改 Nginx 配置，将 HTTP 重定向到 HTTPS

### 7.3 验证自动续期

证书有效期 90 天，Certbot 已自动注册 systemd 定时任务续期：

```bash
# 模拟证书续期，用于验证自动续期链路可用
sudo certbot renew --dry-run

# 查看 Certbot 自动续期定时器状态
sudo systemctl status snap.certbot.renew.timer
```

### 7.4 最终 Nginx 配置确认

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

## 第八阶段：发布后状态核验

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

命令说明（按出现顺序）：
- `sudo mkdir -p /opt/proj_unihome/backups`：创建宿主机备份目录（用于存放导出的 `.dump` 文件与日志）。
- `tee /opt/proj_unihome/backup-db.sh ...`：写入备份脚本（内部通过 `docker exec pg_dump` 生成 dump，再用 `docker cp` 拷贝到宿主机）。
- `chmod +x /opt/proj_unihome/backup-db.sh`：赋予脚本可执行权限。
- `(crontab -l ...; echo "...") | crontab -`：向当前用户 crontab 追加定时任务（每天 03:00 执行，并将输出写入日志）。
- `crontab -l`：检查定时任务是否写入成功。

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

片段说明：
- `backup` 服务会在容器内按 `SCHEDULE` 定时执行 `pg_dump`，并上传到 OSS；适合生产环境做异地备份。
- `POSTGRES_PASSWORD` 复用 `shared/.env.production` 中的数据库口令，避免明文重复配置。
- `OSS_ACCESS_KEY_*` 建议使用最小权限 RAM 子账号，并仅授予目标 bucket 的写入权限。

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

以下命令在 `/opt/proj_unihome/deploy` 目录下执行：

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
docker compose --project-directory . -f compose.prod.yml --env-file ../shared/.env.production down
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

命令说明（按出现顺序）：
- `bash deploy.sh ps`：查看服务与健康检查状态。
- `bash deploy.sh logs app`：查看应用日志（排查启动失败/数据库连接失败/路由错误等）。
- `bash deploy.sh logs postgres`：查看数据库日志。
- `bash deploy.sh update`：重启 app 并加载新镜像（默认不触碰 db/media）。
- `docker compose ... down`：停止服务但保留持久化数据目录；不要加 `-v`。
- `docker exec -it proj_unihome_app sh`：进入 app 容器执行排障命令。
- `docker exec -it proj_unihome_postgres psql ...`：进入数据库容器执行交互式 SQL。
- `/opt/proj_unihome/backup-db.sh`：执行宿主机备份脚本（如果已按附录 A.1 安装）。
- `df -h` / `du -sh ...`：查看磁盘空间与关键目录占用。
- `docker system prune -f`：清理未使用的 Docker 资源（谨慎使用，避免影响正在使用的镜像/缓存策略）。

---

## 更新部署流程（后续迭代）

当代码有更新，需要重新部署时，推荐直接使用一键脚本发布（默认不打包 db/media，不旋转密钥）：

```bash
# 生成 update 部署包并上传到 ECS，然后原子切换 deploy/ 目录并仅重启 app
npm run deploy:aliyun:update
```

如需仅在本地生成 `update` 部署包（例如排查 bundle 内容），可单独执行：

```bash
npm run deploy:bundle:update
```

如需手动方式（不推荐，仅用于排障），在服务器端解压后执行 `deploy.sh update` 即可：

```bash
# 登录 ECS
ssh your-user@your-ecs-ip

# 进入部署根目录
cd /opt/proj_unihome

# 解压部署包
tar -xzf proj-unihome-deploy-bundle.tar.gz

# 删除旧的 deploy/（如果存在）
rm -rf deploy || true

# 将新部署目录切换为 deploy/
mv proj-unihome-deploy-bundle deploy

# 进入运行目录
cd deploy

# 加载新镜像并重启 app
bash deploy.sh update
```

> 注意：更新部署时不需要重跑数据库恢复步骤；只需替换 app 镜像即可，数据库数据由持久化目录保留。
