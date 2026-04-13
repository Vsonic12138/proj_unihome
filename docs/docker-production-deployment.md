# Docker 生产部署说明

本文档说明本项目在生产环境中的容器化部署结构、文件职责以及启动方式。

注意：

- 本项目在 `next build` 阶段会读取 Payload/PostgreSQL 数据
- 因此 Docker 镜像构建阶段必须能访问数据库
- 生产环境最稳妥的方案是：本地预构建镜像，再上传到服务器运行

## 1. 部署架构

本项目当前是一个一体化应用：

- `Next.js 15` 负责官网前台渲染
- `Payload CMS 3` 提供 `/admin` 管理后台和 `/api` 接口
- `PostgreSQL 16` 作为 Payload 的数据库
- `media/` 目录存储 Payload 上传的媒体文件

生产环境推荐使用如下结构：

- `app` 容器：运行 Next.js + Payload
- `postgres` 容器：运行 PostgreSQL
- `./media`：宿主机挂载目录，持久化上传媒体
- `./postgres-data`：宿主机挂载目录，持久化数据库数据
- 反向代理：使用现有 Nginx 或 Caddy 将域名流量转发到 `127.0.0.1:3005`

## 2. 新增文件说明

### `Dockerfile`

职责：

- 使用多阶段构建减少镜像体积
- 在构建阶段执行 `npm run build`
- 使用 Next.js `standalone` 产物运行生产服务

说明：

- 运行镜像时不再依赖宿主机 Node.js
- `media/` 不打进镜像，而是由宿主机目录挂载
- 构建阶段会读取 `PAYLOAD_SECRET`、`PREVIEW_SECRET`、`DATABASE_URI`

### `.dockerignore`

职责：

- 排除 `node_modules`、`.next`、`media`、`backups` 等不应进入镜像上下文的内容
- 减少构建耗时和上传体积

### `docker-compose.prod.yml`

职责：

- 编排 `app` 和 `postgres` 两个生产服务
- 将 `app` 暴露到本机回环地址 `127.0.0.1:3005`
- 将 `media/` 和 `postgres-data/` 绑定为宿主机持久化目录

说明：

- `postgres` 不对宿主机公开 `5432`
- `app` 通过 Docker 内部网络访问 `postgres`
- 启用了 `healthcheck`，避免数据库未就绪时应用抢先启动

### `.env.production.example`

职责：

- 给服务器生产环境变量提供模板
- 明确数据库地址、密钥和正式域名的填写方式
- 支持通过 `APP_IMAGE` 指定预构建镜像标签

## 3. 启动前准备

服务器目录建议如下：

```text
/opt/proj_unihome/
  ├─ docker-compose.prod.yml
  ├─ .env.production
  ├─ media/
  ├─ postgres-data/
  ├─ backups/
  └─ repo/               # 仓库源码目录
```

建议将仓库克隆到 `repo/` 后，在该目录执行 Compose。

## 4. 推荐镜像构建方式

### 4.1 推荐方案：本地预构建，再传到服务器

由于本项目构建阶段依赖数据库，推荐在你本地已有数据库和源码的环境中构建镜像。

示例：

```bash
docker build \
  --build-arg NEXT_PUBLIC_SERVER_URL=https://yourdomain.com \
  --build-arg PAYLOAD_SECRET="$PAYLOAD_SECRET" \
  --build-arg PREVIEW_SECRET="$PREVIEW_SECRET" \
  --build-arg DATABASE_URI="$DATABASE_URI" \
  --build-arg PAYLOAD_SCHEMA_PUSH=false \
  -t proj-unihome-app:local .
```

构建完成后导出镜像：

```bash
docker save proj-unihome-app:local | gzip > proj-unihome-app.tar.gz
```

服务器上传并加载：

```bash
docker load < proj-unihome-app.tar.gz
```

### 4.2 次选方案：在服务器构建镜像

仅在以下条件同时满足时使用：

- 服务器上的构建环境能访问 PostgreSQL
- `.env.production` 已正确配置
- 你明确知道构建阶段会访问数据库

如果服务器构建失败，优先切换到“本地预构建镜像”方案，不要反复在生产机试错。

## 5. 首次启动流程

### 5.1 准备环境变量

以模板为基础创建生产文件：

```bash
cp .env.production.example .env.production
```

然后至少修改以下值：

```env
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
PAYLOAD_SECRET=强随机字符串
PREVIEW_SECRET=强随机字符串
POSTGRES_PASSWORD=强密码
DATABASE_URI=postgresql://proj_unihome:强密码@postgres:5432/proj_unihome
```

### 5.2 启动数据库

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d postgres
```

### 5.3 恢复数据库

本项目备份脚本使用的是 `pg_dump -Fc` custom format，因此恢复时建议使用如下方式：

```bash
docker cp ./backups/db_backup_xxx.dump proj_unihome_postgres:/tmp/restore.dump

docker exec proj_unihome_postgres pg_restore \
  -U proj_unihome \
  -d proj_unihome \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  /tmp/restore.dump
```

### 5.4 恢复媒体文件

如果你本地打包了 `media_backup.tar.gz`，可以在服务器上执行：

```bash
mkdir -p media
tar -xzf media_backup.tar.gz -C .
```

确认最终媒体目录为：

```text
./media/...
```

### 5.5 启动应用

如果你已经通过 `docker load` 导入了预构建镜像，可以直接启动：

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d app
```

如果你确定服务器构建环境可用，也可以执行：

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build app
```

## 6. 常用运维命令

查看服务状态：

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production ps
```

查看应用日志：

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f app
```

查看数据库日志：

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f postgres
```

重建应用镜像并启动：

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build app
```

停止服务：

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production down
```

注意：

- 不要执行 `docker compose down -v`
- 这会删除挂载卷，导致数据库数据被清空

## 7. 反向代理建议

如果服务器上已经有 Nginx 或 Caddy，请只新增一个站点配置，将域名流量反代到：

```text
127.0.0.1:3005
```

推荐做法：

- `80/443` 仅由反向代理进程占用
- Node 应用只监听本机回环
- 统一由反向代理处理 HTTPS、证书续期和访问日志

## 8. 上线后核对清单

- 官网首页可正常访问
- `/admin` 可登录
- Payload 图片可正常加载
- 多语言路由正常工作
- `/api/preview` 预览可用
- 新上传图片能写入 `media/`
- 重启容器后数据仍然存在
