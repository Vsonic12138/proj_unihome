# 本地开发

本文档说明当前仓库的本地开发方式、依赖项和常用命令。

## 当前环境

根据仓库配置和当前实际使用方式，本地开发环境通常是：

- 开发终端：WSL2
- Docker 运行时：Windows 上的 Docker Desktop
- 本地数据库：Docker 容器中的 PostgreSQL
- 本地邮件调试：Mailpit

仓库要求的是可用的 Docker Engine 和 `docker compose`，不强制必须使用 Docker Desktop。

## 必要条件

- Node.js
- npm
- Docker
- Docker Compose

## 必要环境变量

应用和 CMS 启动至少需要：

- `PAYLOAD_SECRET`
- `DATABASE_URI` 或 `DATABASE_URL`

常用但非必须：

- `NEXT_PUBLIC_SERVER_URL`
- `PAYLOAD_SCHEMA_PUSH=false`

本地示例可参考：

- `.env.example`
- `ops/env/.env.local.mailpit.example`

## 本地数据库

推荐使用仓库自带的开发数据库编排：

```bash
npm run docker:up:dev:db  # 一键启动本地开发专用的 PostgreSQL 数据库与 Mailpit 邮件调试容器
```

默认定义位于 `ops/docker/compose.dev.yml`，包含：

- `proj_unihome_postgres`
- `proj_unihome_mailpit`

仓库模板默认把 PostgreSQL 暴露到宿主机 `5432`，但你当前本地 `.env` 实际使用的是：

```env
DATABASE_URI=postgresql://proj_unihome:proj_unihome_password@localhost:15432/proj_unihome?sslmode=disable
```

因此，你当前本地开发数据库实际端口是 `15432`。

## 启动方式

```bash
npm install               # 安装项目所需的全部依赖包
npm run docker:up:dev:db  # 确保本地开发数据库与邮件服务容器已启动
npm run dev               # 启动 Next.js 本地开发服务器（含热更新与 Payload 后台）
```

默认访问地址：

- 前端：`http://localhost:3000`
- CMS：`http://localhost:3000/admin`
- API：`http://localhost:3000/api`
- Mailpit：`http://localhost:8025`

## 常用命令

```bash
npm run dev             # 启动开发服务器
npm run build           # 执行 Next.js 生产环境构建
npm run start           # 在本地以生产模式运行构建后的应用
npm run lint            # 执行代码规范与类型检查
npm run generate:types  # 根据 Payload Schema 重新生成 TypeScript 类型定义
```

CMS 相关常用命令：

```bash
npm run cms:check:db       # 验证当前应用与数据库的连接是否正常
npm run cms:publish:all    # 一键将所有草稿状态的内容设为发布
npm run cms:seed:base      # 初始化基础内容数据（导航、设置、核心页面等）
npm run cms:seed:images    # 载入演示所需的媒体图片
npm run cms:backup:local   # 在本地环境中执行全量备份（DB + CMS 快照）
```
