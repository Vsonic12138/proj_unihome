# Payload 脚本治理说明

更新时间：2026-04-18

## 目录结构

- `checks/`：日常检查脚本
- `seed/`：初始化与内容导入脚本
- `ops/`：发布、快照、本地备份等运维脚本
- `migrations/data/`：需要保留的数据迁移脚本
- `dev/`：仅开发排障使用的显式危险脚本
- `lib/`：供脚本复用的辅助模块
- `archive/`：历史一次性脚本，不纳入日常命令入口
- `data/`：供 seed 脚本读取的静态数据

## 受支持命令

- `npm run cms:check:db`
- `npm run cms:check:pages`
- `npm run cms:check:home`
- `npm run cms:check:products`
- `npm run cms:seed:base`
- `npm run cms:seed:images`
- `npm run cms:seed:cases`
- `npm run cms:seed:knowledge-base`
- `npm run cms:publish:all`
- `npm run cms:publish:pages`
- `npm run cms:publish:products`
- `npm run cms:publish:cases`
- `npm run cms:snapshot:export`
- `npm run cms:snapshot:restore`
- `npm run cms:backup:local`
- `npm run cms:local:patches`
- `npm run cms:patch:bundle`
- `npm run cms:sync:prod:local`
- `npm run cms:data:migrate:site-settings-cta`
- `npm run cms:data:migrate:footer:contact-items`
- `npm run cms:data:migrate:footer:contact-info`
- `npm run cms:data:migrate:cookie-privacy-link:localized`
- `npm run cms:schema:create -- <name>`
- `npm run cms:schema:migrate`
- `npm run cms:schema:status`
- `npm run cms:schema:push:dev`

## Schema 变更规则

- 默认禁止 `schema push`
- 只有显式执行 `npm run cms:schema:push:dev` 才允许 push
- 常规 schema 变更统一走 migration 流程

标准流程：

1. 修改 Payload schema
2. `npm run cms:schema:create -- <migration-name>`
3. 审阅 `src/migrations/*`
4. `npm run cms:schema:migrate`
5. `npm run cms:schema:status`

## Archive 说明

- `archive/` 中脚本仅用于历史追溯或特殊排障
- 这些脚本不再提供 `npm scripts` 入口
- 非明确需要时，不应将 `archive/` 中脚本重新纳入日常流程
