# 北京有你同创科技公司官网

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-v3-111827)](https://payloadcms.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-required-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2018.17.0-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)

北京有你同创科技公司官方网站，基于 **Next.js 15 App Router + Tailwind CSS v4 + TypeScript** 构建，并集成 **Payload CMS v3**（`/admin`）与 **PostgreSQL**。

> 官网链接：待补充

> 当前版本：详见 `version.md`

---

## 快速开始

请确保 Node.js ≥ 18.17.0（Next.js 15 官方要求）。以下命令默认使用 `npm`。

```bash
npm install
```

启动本地数据库（PostgreSQL，Docker）：

```bash
npm run docker:up:dev:db
```

启动开发服务：

```bash
npm run dev
```

访问：

- 前台：`http://localhost:3000`
- CMS 管理后台：`http://localhost:3000/admin`

---

## 部署与运维

部署与运维相关内容已统一整理在 `ops/` 与 `docs/`：

- `ops/README.md`：部署包生成与服务器端一键 `init/update`
- `docs/README.md`：详细文档索引（部署、数据库、容器、CMS、合规、方案）

常用命令：

```bash
npm run deploy:bundle
```

---

## 核心架构

本项目是一个一体化应用：

- Next.js 15 App Router 提供前台路由与服务端渲染
- Payload CMS v3 运行在同一个 Next.js 服务中
  - 管理后台：`/admin`
  - API：`/api/*`
- 数据库使用 PostgreSQL（Payload 使用 `@payloadcms/db-postgres` 连接）
- 多语言使用 next-intl，前台路由采用 `/{locale}/...` 前缀（由 `src/middleware.ts` 处理）

生产交付推荐使用“部署包”方式：

- 本地生成 bundle：`npm run deploy:bundle:init`（首次）或 `npm run deploy:bundle:update`（常规更新）
- 服务器端执行一键 `init/update`，并将 `shared/.env.production`、`media/`、`postgres-data/` 固化为持久化目录（详见 `ops/README.md`）

---

## 目录说明

- `src/`：应用主代码
- `src/app/`：Next.js App Router（包含前台路由，以及 Payload 的 `/admin`、`/api` 路由组）
- `src/components/`：通用 UI 组件
- `src/payload/`：Payload 内容模型与后台定制（collections/globals/blocks/admin）
- `src/i18n/`：next-intl 配置与加载逻辑
- `messages/`：国际化 JSON 文案（按语言拆分）
- `public/`：静态资源（不经 Payload 管理的资源）
- `scripts/payload/`：CMS 脚本体系（`checks/`、`seed/`、`ops/`、`migrations/`、`dev/`、`archive/`）
- `ops/`：部署与运维自动化（Docker、部署包、阿里云一键脚本等）
- `docs/`：详细文档与手册（以 `docs/README.md` 为索引入口）
