# 系统架构、部署与数据库概览

状态：`ACTIVE`（整理日期：2026-05-08）

本文档用于汇总当前仓库中已经落地的系统结构、部署方式和数据库信息。内容基于仓库内文档、配置文件、脚本以及当前本地开发环境的实际状态整理，不包含推测性的结论。

## 1. 系统定位

当前仓库是一个一体化站点应用，同时承载：

- 官网前端
- Payload CMS v3 管理后台
- Payload API
- PostgreSQL 数据存储

技术栈以当前代码和 `package.json` 为准：

- Next.js `15.4.11`
- React `19.1.0`
- TypeScript `5.3.3`
- Tailwind CSS `4.1.3`
- Payload `^3.0.0`
- PostgreSQL `16`

## 2. 整体架构

### 2.1 运行形态

前端与 CMS 没有拆成两个独立服务，而是运行在同一个 Next.js 服务中：

- 前端页面：`src/app/[locale]/...`
- Payload Admin：`/admin`
- Payload API：`/api/*`

Payload 配置入口为 `payload.config.ts`，数据库适配器使用 `@payloadcms/db-postgres`，富文本编辑器使用 Lexical。

### 2.2 国际化

前端使用 `next-intl`，已配置的语言为：

- `zh`
- `en`
- `ja`

当前约定如下：

- 前端路由始终带语言前缀，例如 `/{locale}/products`
- 默认语言为 `zh`
- 语言偏好 Cookie 名为 `proj_uinhome-language`
- `src/middleware.ts` 明确排除了 `api|admin|_next|.*\\..*`，因此 `/admin` 和 `/api` 不参与前端语言路由处理

### 2.3 内容模型

当前 Payload 已在 `payload.config.ts` 中注册以下 collections：

- `users`
- `mediaFolders`
- `media`
- `pages`
- `productSeries`
- `products`
- `faq`
- `caseStudies`
- `tickets`

已注册的 globals：

- `siteSettings`
- `navigation`
- `footer`

这意味着站点的页面内容、导航、页脚、产品、案例、媒体资源和工单数据都已经进入 CMS 管理范围。

## 3. 代码目录与职责

主要目录职责如下：

- `src/app/`：Next.js App Router 路由
- `src/app/[locale]/`：前端多语言页面
- `src/app/(payload)/`：Payload Admin 与 API 接入
- `src/components/`：前端组件
- `src/payload/`：CMS collections、globals、blocks、admin 定制
- `src/i18n/`：国际化配置
- `messages/`：前端静态文案 JSON
- `scripts/payload/`：CMS 检查、发布、备份、快照、迁移、种子脚本
- `ops/`：Docker、部署包、阿里云远程部署脚本
- `docs/`：部署、数据库、CMS 和运维文档

## 4. 本地开发环境

### 4.1 当前环境形态

根据当前仓库配置与本机运行状态，本地开发环境是：

- 开发终端：WSL2
- 容器运行时：Windows 10 上的 Docker Desktop
- 本地数据库：Docker 容器中的 PostgreSQL
- 本地邮件调试：Mailpit

当前运行中的容器状态已核对：

- `proj_unihome_postgres`
  - 镜像：`postgres:16`
  - 端口映射：`127.0.0.1:15432 -> 5432`
- `proj_unihome_mailpit`
  - 镜像：`axllent/mailpit:latest`
  - SMTP：`1025`
  - Web UI：`8025`

### 4.2 本地数据库连接

仓库默认的开发数据库编排在 `ops/docker/compose.dev.yml` 中，默认宿主机端口是 `5432`。但当前本机实际通过 `.env` 覆盖成了 `15432`。

当前本地 `.env` 中的实际数据库连接地址为：

```env
DATABASE_URI=postgresql://proj_unihome:proj_unihome_password@localhost:15432/proj_unihome?sslmode=disable
```

这与当前 `docker ps` 的运行状态一致，因此当前本地应用连接的是：

- 主机：`localhost`
- 端口：`15432`
- 数据库名：`proj_unihome`
- 用户名：`proj_unihome`

### 4.3 本地启动方式

本地常用启动流程是：

```bash
npm install
npm run docker:up:dev:db
npm run dev
```

启动后默认访问地址：

- 前端：`http://localhost:3000`
- CMS 后台：`http://localhost:3000/admin`
- Payload API：`http://localhost:3000/api`
- Mailpit：`http://localhost:8025`

## 5. 生产部署架构

### 5.1 部署模型

当前仓库的生产部署不是“服务器拉源码再构建”为主，而是以“本地构建部署包，再上传服务器执行”作为推荐路径。

部署包由 `ops/deploy/create-deploy-bundle.sh` 生成，分两种模式：

- `init`
  - 用于首次部署或灾备恢复
  - 包含应用镜像、数据库 dump、CMS 快照、媒体备份
- `update`
  - 用于常规发版
  - 只更新应用，不恢复数据库和媒体目录

对应 npm 命令：

- `npm run deploy:bundle:init`
- `npm run deploy:bundle:update`
- `npm run deploy:aliyun:init`
- `npm run deploy:aliyun:update`

### 5.2 生产容器结构

生产环境的容器结构由 `ops/deploy/templates/compose.prod.yml` 定义，核心是两个容器：

- `proj_unihome_app`
  - 容器内监听 `3000`
  - 宿主机绑定 `127.0.0.1:3005`
- `proj_unihome_postgres`
  - PostgreSQL 16
  - 不直接对公网暴露数据库端口

持久化目录：

- `../media`：Payload 上传文件
- `../postgres-data`：数据库数据目录
- `../shared/.env.production`：生产环境变量
- `../backups`：备份文件

### 5.3 服务器目录结构

文档和脚本约定的生产目录根路径是：

```text
/opt/proj_unihome
```

主要子目录：

- `deploy/`：当前生效的部署目录
- `shared/`：持久化环境变量
- `media/`：媒体文件
- `postgres-data/`：PostgreSQL 数据目录
- `backups/`：备份目录

### 5.4 反向代理与外部访问

阿里云部署脚本 `ops/deploy/remote/aliyun-bootstrap.sh` 会在服务器上安装并配置 Nginx。当前约定是：

- 对外暴露 `80/443`
- Nginx 反向代理到 `127.0.0.1:3005`
- 应用端口 `3005` 只绑定回环地址，不直接暴露到公网

这意味着公网入口通常是：

- 浏览器 -> Nginx -> `127.0.0.1:3005` -> Next.js + Payload

## 6. 阿里云部署方式

当前仓库已经内置阿里云 ECS 一键脚本：

- `ops/deploy/remote/aliyun-bootstrap.sh`
- `ops/deploy/remote/aliyun-deploy.sh`

推荐流程分三步：

1. `npm run deploy:aliyun:bootstrap`
   - 在 ECS 上安装 Docker、Compose 插件、Nginx
   - 创建 `/opt/proj_unihome` 相关目录
2. `npm run deploy:aliyun:init`
   - 构建并上传 `init` 部署包
   - 服务器解压后执行 `bash deploy.sh init`
3. `npm run deploy:aliyun:update`
   - 构建并上传 `update` 部署包
   - 服务器解压后执行 `bash deploy.sh update`

`deploy.sh` 的实际行为已经在脚本中固化：

- `init`
  - 检查 `shared/.env.production`
  - 导入应用镜像
  - 如包内存在 `postgres-16.tar.gz`，先导入 PostgreSQL 镜像
  - 启动数据库并等待健康检查通过
  - 如包内存在数据库 dump，则执行 `pg_restore`
  - 如媒体目录为空且包内存在备份，则恢复媒体
  - 启动应用容器
- `update`
  - 只导入新应用镜像
  - 仅重启 `app`
  - 不动数据库和媒体目录

## 7. 数据库信息

### 7.1 当前数据库类型与适配方式

当前唯一落地的数据存储是 PostgreSQL，Payload 通过：

- `DATABASE_URI`
- 或 `DATABASE_URL`

连接数据库。

`payload.config.ts` 中启用了如下逻辑：

- `PAYLOAD_SECRET` 缺失时应用不会启动
- `DATABASE_URI` 或 `DATABASE_URL` 缺失时应用不会启动
- `PAYLOAD_SCHEMA_PUSH=true` 时才允许自动推送 schema

默认情况下，仓库倾向于使用 migration，而不是在运行时自动改库。

### 7.2 本地数据库容器信息

开发数据库的默认容器定义在 `ops/docker/compose.dev.yml`：

- 镜像：`postgres:16`
- 容器名：`proj_unihome_postgres`
- 默认数据库：`proj_unihome`
- 默认用户：`proj_unihome`
- 默认密码：`proj_unihome_password`
- 数据卷：`proj_unihome_postgres_data`

当前实际运行时，宿主机端口不是默认的 `5432`，而是已切换为 `15432`。

### 7.3 生产数据库形态

生产环境默认不是托管云数据库，而是与应用一起通过 Docker Compose 运行在同一台服务器上：

- 应用容器：`proj_unihome_app`
- 数据库容器：`proj_unihome_postgres`

应用在生产环境中通过 Docker 内部服务名 `postgres` 访问数据库，示例模板见 `ops/env/.env.production.example`：

```env
DATABASE_URI=postgresql://proj_unihome:<password>@postgres:5432/proj_unihome
```

## 8. 备份与恢复

### 8.1 本地备份

本地标准备份入口是：

```bash
npm run cms:backup:local
```

该脚本会：

- 检查 Docker 和数据库容器状态
- 执行应用侧数据库连通性检查
- 通过 `pg_dump -Fc` 导出数据库
- 导出 CMS 内容快照

备份产物目录：

- `backups/db_backup_时间戳.dump`
- `backups/cms_snapshot_latest.json`

### 8.2 生产备份

服务器端标准备份入口是：

```bash
cd /opt/proj_unihome/deploy
bash backup.sh run
```

可选同时打包媒体：

```bash
cd /opt/proj_unihome/deploy
INCLUDE_MEDIA=true bash backup.sh run
```

生产备份默认保留策略：

- 数据库备份保留 `7` 天
- 媒体备份保留 `28` 天

## 9. 与站点运行直接相关的外围能力

除了前端、CMS 和数据库，当前仓库还包含两个与线上运行直接相关的外围能力：

- 工单提交
  - 公开入口：`POST /api/public/tickets`
  - 数据写入 `tickets` collection
- 邮件通知
  - 本地可使用 Mailpit SMTP
  - 生产环境支持 Webhook、SMTP 或 Resend 三种方式之一

当前文档建议生产优先评估 Webhook 或正式 SMTP，不建议直接沿用本地 Mailpit 配置。

## 10. 当前可以确认的结论

- 当前项目是单体式站点，不是前后端分离部署。
- 前端、Payload Admin、Payload API 运行在同一个 Next.js 服务中。
- 数据库是 PostgreSQL 16，本地和生产都以容器化方案为主。
- 你当前本地开发环境确实是 WSL2 + Docker Desktop，数据库实际暴露端口是 `15432`，不是模板中的默认 `5432`。
- 生产推荐路径是“本地构建部署包 -> 上传阿里云 ECS -> 服务器执行 init/update”。
- 生产服务器默认通过 Nginx 反代到 `127.0.0.1:3005`，数据库与媒体目录都做了持久化。

