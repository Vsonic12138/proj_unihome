# Docker 生产部署指南

本文档用于说明本项目在生产环境中的容器化部署结构、文件职责以及启动方式。

状态：`ACTIVE`（最近审查：2026-04-15）

注意：

- 本项目在 `next build` 阶段会读取 Payload/PostgreSQL 数据
- 因此 Docker 镜像构建阶段必须能访问数据库
- 生产环境最稳妥的方案是：本地预构建镜像，再上传到服务器运行

## 最短路径（推荐）

如果不想看细节，只想快速上线：

1. 本地生成首次部署包（包含 db/media，可用于首次上线或灾备）：`npm run deploy:bundle:init`
2. 把 `proj-unihome-deploy-bundle.tar.gz` 上传到服务器 `/opt/proj_unihome/`
3. 服务器端解压并切换 `deploy/` 目录，然后执行：`bash deploy.sh init`
4. 后续更新使用轻量更新包（不打包 db/media，不旋转密钥）：`npm run deploy:bundle:update`，服务器执行：`bash deploy.sh update`

说明：部署包解压后目录名与压缩包同名，即 `proj-unihome-deploy-bundle/`。

补充：`init` 部署包会额外携带 `postgres-16.tar.gz`（PostgreSQL 镜像）。这样即使服务器无法访问 Docker Hub，也可以完成首次 `init`（不会再在服务器上拉取 `postgres:16`）。

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

### `ops/docker/Dockerfile`

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

### `ops/docker/compose.prod.yml`

职责：

- 编排 `app` 和 `postgres` 两个生产服务
- 将 `app` 暴露到本机回环地址 `127.0.0.1:3005`
- 将 `media/` 和 `postgres-data/` 绑定为宿主机持久化目录

说明：

- `postgres` 不对宿主机公开 `5432`
- `app` 通过 Docker 内部网络访问 `postgres`
- 启用了 `healthcheck`，避免数据库未就绪时应用抢先启动

### `ops/env/.env.production.example`

职责：

- 给服务器生产环境变量提供模板
- 明确数据库地址、密钥和正式域名的填写方式
- 支持通过 `APP_IMAGE` 指定预构建镜像标签

### `ops/deploy/create-deploy-bundle.sh` 与 `deploy/deploy.sh`

职责：

- `create-deploy-bundle.sh`：在本地一键生成 `proj-unihome-deploy-bundle.tar.gz`（包含镜像导出包、db dump、media、compose 与一键部署脚本）
- `deploy.sh`：服务器端一键 `init/update/check`，把“首次部署/常规更新”的手工步骤固化成可重复命令

## 3. 启动前准备

服务器目录建议如下（推荐仅存放部署包与运行数据，不必克隆仓库源码）：

```text
/opt/proj_unihome/
  ├─ proj-unihome-deploy-bundle.tar.gz
  ├─ media/
  ├─ postgres-data/
  ├─ backups/
  ├─ shared/
  ├─ deploy/
```

说明：

- `shared/.env.production` 固化生产密钥与数据库口令，避免更新时被覆盖（强烈推荐）
- `media/` 与 `postgres-data/` 为持久化目录
- `deploy/` 为可替换目录，内含 `compose.prod.yml`、`deploy.sh` 与镜像文件

## 4. 推荐镜像构建方式

### 4.1 推荐方案：本地预构建，再传到服务器

由于本项目构建阶段依赖数据库，推荐在本地已有数据库和源码的环境中构建镜像。

示例：

```bash
docker build \
  -f ops/docker/Dockerfile \
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
gzip -dc proj-unihome-app.tar.gz | docker load
```

### 4.2 次选方案：在服务器构建镜像

仅在以下条件同时满足时使用：

- 服务器上的构建环境能访问 PostgreSQL
- `.env.production` 已正确配置
- 明确知道构建阶段会访问数据库

如果服务器构建失败，优先切换到“本地预构建镜像”方案，不要反复在生产机试错。

## 5. 首次启动流程

推荐方式：使用本地一键部署包（最稳妥，且把服务器端操作简化为一条命令）。

### 5.1 准备环境变量

在首次部署时，需要在服务器上准备 `shared/.env.production` 并设置 `NEXT_PUBLIC_SERVER_URL` 为真实域名或公网 IP。

注意：
- `deploy:bundle:init` 生成的部署包通常会包含一份 `.env.production`（用于首次落地的起点），但后续 `deploy:bundle:update` 可能不会再打包它。
- 因此生产环境请始终以 `/opt/proj_unihome/shared/.env.production` 为准，不要依赖每次部署包里是否带 `.env.production`。

### 5.2 一键首次部署

```bash
tar -xzf proj-unihome-deploy-bundle.tar.gz
mkdir -p shared
rm -rf deploy || true
mv proj-unihome-deploy-bundle deploy
test -f shared/.env.production || cp deploy/.env.production shared/.env.production
cd deploy
bash deploy.sh init
```

`deploy.sh init` 会自动：

- 解压媒体（仅当包内存在且 `media/` 为空时）
- 导入镜像（gzip -> docker load）
- 启动 Postgres 并等待健康检查通过
- 如存在 dump 则自动执行 `pg_restore`
- 启动 app

### 5.3 常规更新（最快路径）

当生成并上传了新的部署包后，在服务器端执行：

```bash
tar -xzf proj-unihome-deploy-bundle.tar.gz
rm -rf deploy || true
mv proj-unihome-deploy-bundle deploy
cd deploy
bash deploy.sh update
```

默认行为：仅加载新镜像并重启 `app` 容器，不会恢复数据库或覆盖媒体目录。

## 6. 常用运维命令

查看服务状态：

```bash
cd /opt/proj_unihome/deploy
bash deploy.sh ps
```

查看应用日志：

```bash
cd /opt/proj_unihome/deploy
bash deploy.sh logs app
```

查看数据库日志：

```bash
cd /opt/proj_unihome/deploy
bash deploy.sh logs postgres
```

停止服务：

```bash
cd /opt/proj_unihome/deploy
docker compose --project-directory . -f compose.prod.yml --env-file ../shared/.env.production down
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
