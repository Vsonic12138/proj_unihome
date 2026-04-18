# ops 目录说明（部署与运维）

本目录用于集中管理本项目的 **Docker/部署/运维自动化**。业务代码仍在 `src/`，这里存放“如何构建、如何打包、如何上线、如何更新”相关的工具与规范。

## 目录结构

### `ops/docker/`

- `Dockerfile`
  - 生产镜像构建文件（多阶段构建 + Next.js `standalone` 输出）
  - 注意：构建阶段使用占位数据库连接与 `BUILD_SKIP_PAYLOAD=true`，不再要求真实 Postgres 可访问
- `compose.dev.yml`
  - 仅用于本地开发时快速启动 Postgres（容器名固定为 `proj_unihome_postgres`）
- `compose.prod.yml`
  - 生产编排（源码构建模式）：提供 `app + postgres` 的编排示例
  - 用于在“服务器可构建镜像”的场景下直接 `docker compose up --build`

### `ops/env/`

- `.env.production.example`
  - 生产环境 `.env.production` 模板（供在服务器上手工维护使用）

### `ops/deploy/`

- `create-deploy-bundle.sh`
  - **本地一键生成部署包**：`proj-unihome-deploy-bundle.tar.gz`
  - 默认生成“全量包”：包含镜像导出包、db dump、CMS 快照、media 备份、以及服务器端一键脚本
- `deploy.sh`
  - **服务器端一键部署脚本**（会被复制进 `proj-unihome-deploy-bundle/`）
  - 支持 `check/init/update/ps/logs`：
    - `init`：首次部署（自动启动 postgres、恢复 dump、启动 app）
    - `update`：常规更新（仅加载新镜像并重启 app，不动 db/media）
- `backup.sh`
  - **服务器端标准备份入口**（会被复制进 `proj-unihome-deploy-bundle/`）
  - 支持 `check/run`，可被 cron 或 systemd timer 直接调用
- `templates/compose.prod.yml`
  - 部署包内使用的 compose 模板（不含 build，默认只 `docker load` 后运行）
- `README.md`
  - 部署包内 README 模板（会被复制进 `proj-unihome-deploy-bundle/README.md`）

## 常用命令（推荐以 npm scripts 为唯一入口）

本地启动开发数据库：

```bash
npm run docker:up:dev:db
```

本地构建镜像（基于 `ops/docker/Dockerfile`）：

```bash
npm run docker:build
```

生成部署包（推荐的生产交付方式）：

```bash
npm run deploy:bundle:init
```

## 部署包工作流（生产推荐）

### 1) 本地生成部署包（WSL/开发机）

```bash
npm run deploy:bundle:init
```

产物：
- 根目录生成 `proj-unihome-deploy-bundle.tar.gz`
- 生成中间目录 `proj-unihome-deploy-bundle/`（已在 `.gitignore/.dockerignore` 忽略，不会进仓库）

### 2) 上传到服务器并首次部署

推荐方式：使用一键远程脚本（在本地执行）：

```bash
npm run deploy:aliyun:bootstrap
npm run deploy:aliyun:init
```

### 3) 常规更新（最快路径）

常规更新推荐生成 update 包并一键更新（不会覆盖服务器 db/media）：

```bash
npm run deploy:bundle:update
npm run deploy:aliyun:update
```

说明：`update` 默认只更新 app，不会恢复数据库，也不会覆盖 `media/`。

## 本机验证流程（维护者自测清单）

以下是验证本次自动化链路“端到端无断点”的最小步骤：

1. 启动本地 Postgres（或确认它已在运行）
   ```bash
   npm run docker:up:dev:db
   npm run check:db
   ```
2. 生成部署包
   ```bash
   npm run deploy:bundle:init
   ```
3. 在本机模拟服务器首次部署（注意会占用 `127.0.0.1:3005`）
   ```bash
   cd proj-unihome-deploy-bundle
   # 临时把 NEXT_PUBLIC_SERVER_URL 改成可用值
   sed -i 's#^NEXT_PUBLIC_SERVER_URL=.*#NEXT_PUBLIC_SERVER_URL=http://127.0.0.1:3005#' .env.production
   bash deploy.sh init
   curl -I http://127.0.0.1:3005/
   bash backup.sh check
   bash deploy.sh update
   ```
