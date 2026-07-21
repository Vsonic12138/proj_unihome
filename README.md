# 北京有你同创科技公司官网

这是一个基于 Next.js 15、Payload CMS v3 和 PostgreSQL 的官网项目。前端页面、CMS 后台和 API 运行在同一个 Next.js 服务中。

## 技术栈

- Next.js 15
- Payload CMS v3
- PostgreSQL 16
- TypeScript
- Tailwind CSS v4

## 快速开始

```bash
npm install
npm run docker:up:dev:db
npm run dev
```

默认访问地址：

- 前端：`http://localhost:3000`
- CMS：`http://localhost:3000/admin`
- API：`http://localhost:3000/api`

## 必要环境变量

至少需要：

- `PAYLOAD_SECRET`
- `DATABASE_URI` 或 `DATABASE_URL`

本地和生产环境模板见：

- `.env.example`
- `ops/env/.env.local.mailpit.example`
- `ops/env/.env.production.example`

## 仓库结构

- 应用主体：`src/`（前台 + Payload CMS）
- 运维脚本：`scripts/`、`ops/`
- 文档入口：见下方列表；布局说明见 `docs/repo-layout.md`

本地数据目录 `media/`、`backups/`、`node_modules/` 不入库，属于正常运行时/缓存，不是源码混乱。

## 文档入口

- `docs/overview.md`
- `docs/repo-layout.md`
- `docs/development.md`
- `docs/deployment.md`
- `docs/database.md`
- `docs/cms.md`
- `docs/archive/README.md`
