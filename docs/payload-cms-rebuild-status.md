# Payload CMS v3 官网内容架构重构 - 当前进度记录

更新时间：2026-04-04

本文件用于记录“官网内容架构完全重构（Payload CMS v3）”在本仓库内的**真实落地状态**、可运行方式、以及下一步待办。

---

## 1. 当前结论（可直接理解为“现在做到哪一步了”）

- **已完成**
  - Payload CMS v3 已接入本仓库（Next.js App Router 下的 `(payload)` 路由组），`/admin` 与 `/api` 可访问
  - 本地 PostgreSQL（Docker）已接入
  - Schema（Collections / Globals / Blocks）已落地（见 `src/payload/*`）
  - 迁移已生成并可运行：`src/migrations/20260404_084231_init.ts`、`20260404_103246.ts`、`20260404_111827.ts`
  - 已编写并跑通自动化迁移脚本（Seed）：
    - `scripts/payload/seed-images.ts`：`messages/*/*.json` 引用的 `/images/*` 批量导入 `media`
    - `scripts/payload/seed.ts`：Globals + `pages(slug=home)` blocks + `productSeries/products/faq` 导入
  - Payload Local API 封装与渲染层已落地：
    - `src/lib/payload.ts`
    - `src/components/payload/BlockRenderer.tsx`
    - `src/components/payload/RichText.tsx`
  - 全站布局已切换为 Payload globals：`navigation/footer/siteSettings` 下发 Header/Footer/FloatingContact/CookieConsent
  - 页面已迁移为 Payload 驱动：`home/products/products-[slug]/case-studies/*/developers/*/about/contact/custom-solutions/error`
  - 现有页面已移除 next-intl 内容回退（缺内容时直接空/404）
  - 为兼容 Payload + TS 配置已完成工程调整：`"type": "module"`、`postcss.config.cjs`、`scripts/generate-changelog.cjs`

- **未开始 / 待完成（以当前代码为准）**
  - 逐组件移除 `useTranslations()` / `t.raw()` 依赖（改为 Payload 字段或 props 注入）
  - 删除 `messages/` 目录与 `src/i18n/request.ts` 的 JSON import 逻辑
  - 清理 `public/images/`（已迁移资源改用 Payload Media）
  - 生产部署/运维化（Docker 生产化、缓存策略、权限、备份）

---

## 2. 已落地的核心架构

### 2.1 Payload 路由接入

Payload 已以 Next.js App Router 的推荐结构接入到：

- `src/app/(payload)/layout.tsx`
- `src/app/(payload)/admin/[[...segments]]/page.tsx`
- `src/app/(payload)/admin/[[...segments]]/not-found.tsx`
- `src/app/(payload)/api/[...slug]/route.ts`

访问入口：

- **后台**：`/admin`
- **REST API**：`/api/*`（例如 `/api/users` 会因为访问控制返回 403 属于预期）

同时已调整 `src/middleware.ts`，确保 `next-intl` 的 middleware 不会拦截 `/admin`。

### 2.2 数据库与迁移策略

- 使用 `docker-compose.yml` 启动 PostgreSQL
- `payload.config.ts` 使用 `@payloadcms/db-postgres`
- 当前为了避免 drizzle 的交互式 push 提示，已设置 `db.push: false`，并创建了迁移文件：
  - `src/migrations/20260404_084231_init.ts`

### 2.3 关键依赖与版本约束

由于 `@payloadcms/next` 对 Next.js 的 peer 版本范围限制，本仓库已把 Next.js **固定**到：

- `next@15.4.11`
- `eslint-config-next@15.4.11`

并在 `package.json` 增加了：

- `payload`、`@payloadcms/next`、`@payloadcms/db-postgres`、`@payloadcms/richtext-lexical`
- `sharp`（用于图片尺寸处理）

另外，为了让 `payload.config.ts`（TS）能被 Node 正常加载，仓库已设置：

- `package.json` 增加 `"type": "module"`
- `postcss.config.js` 改为 `postcss.config.cjs`
- `scripts/generate-changelog.js` 改为 `scripts/generate-changelog.cjs` 并更新了 npm script

---

## 3. Schema（内容模型）落地位置

入口：`payload.config.ts`

### 3.1 Collections

位于 `src/payload/collections/`：

- `Users`：`users`（Payload Admin 登录用）
- `Media`：`media`（上传资源）
  - 增加了 `sourcePath` 字段，用于把原 `public/images/...` 与 Payload Media 建立可追溯映射，便于迁移与去重
- `Pages`：`pages`（页面 + blocks）
- `ProductSeries`：`productSeries`
- `Products`：`products`
- `FAQ`：`faq`
- `CaseStudies`：`caseStudies`

### 3.2 Globals

位于 `src/payload/globals/`：

- `SiteSettings`：`siteSettings`
- `Navigation`：`navigation`
- `Footer`：`footer`

### 3.3 Blocks

位于 `src/payload/blocks/`（给 `Pages.blocks` 使用）：

- `HeroBlock`
- `FeaturesBlock`
- `AboutBlock`
- `ContactBlock`
- `RichTextBlock`
- `ImageGalleryBlock`

---

## 4. 自动化迁移（Seed）脚本

### 4.1 图片导入

脚本：`scripts/payload/seed-images.ts`

功能：

- 扫描 `messages/*/*.json` 中所有 `"/images/..."` 路径
- 读取 `public/images/...` 对应文件
- 写入 Payload `media` collection
  - `sourcePath = "/images/xxx"`（去重关键）
  - `alt` 三语言默认填文件名（后续可在 Admin 里编辑）

命令：

```bash
PAYLOAD_SECRET=dev-secret \
DATABASE_URI='postgresql://proj_uinhome:proj_uinhome_password@localhost:5432/proj_uinhome?sslmode=disable' \
NEXT_PUBLIC_SERVER_URL='http://localhost:3000' \
npm run seed:payload:images
```

说明：

- 脚本末尾会做数据库连接销毁并强制 `process.exit(0)`，以避免已知的 Postgres adapter 关闭连接挂起导致脚本不退出。

### 4.2 内容导入（Globals / Home / Products / FAQ）

脚本：`scripts/payload/seed.ts`

功能：

- 从 `messages/{zh,en,ja}` 读取：
  - `common.json`（导航、页脚、联系方式等）
  - `home.json`（hero、features、about 等）
  - `pages.json`（页面 SEO title/description）
  - `products.json`（catalog、details、faq 等）
  - `contact.json`（联系表单区域文案）
- 写入 Payload：
  - `navigation` global
  - `footer` global
  - `siteSettings` global
  - `pages`：写入 `slug=home` 且填充 blocks
  - `productSeries`、`products`
  - `faq`

富文本处理：

- 当前把原 JSON 中的纯文本（含换行）转换成 Lexical JSON（最基础的段落结构），实现“可编辑富文本”的第一步
- 转换工具：`scripts/payload/lexical.ts`

命令：

```bash
PAYLOAD_SECRET=dev-secret \
DATABASE_URI='postgresql://proj_uinhome:proj_uinhome_password@localhost:5432/proj_uinhome?sslmode=disable' \
NEXT_PUBLIC_SERVER_URL='http://localhost:3000' \
npm run seed:payload
```

---

## 5. 本地启动（可复现步骤）

### 5.1 准备环境变量

参考 `.env.example`，本地可直接在终端导出（或创建 `.env` 文件）：

- `PAYLOAD_SECRET`
- `DATABASE_URI`
- `NEXT_PUBLIC_SERVER_URL`

### 5.2 启动 Postgres

```bash
docker compose up -d postgres
```

### 5.3 初始化数据库（推荐使用迁移）

```bash
PAYLOAD_SECRET=dev-secret \
DATABASE_URI='postgresql://proj_uinhome:proj_uinhome_password@localhost:5432/proj_uinhome?sslmode=disable' \
npx payload migrate:fresh --forceAcceptWarning
```

### 5.4 导入图片与内容

```bash
npm run seed:payload:images
npm run seed:payload
```

### 5.5 启动开发服务器

```bash
PAYLOAD_SECRET=dev-secret \
DATABASE_URI='postgresql://proj_uinhome:proj_uinhome_password@localhost:5432/proj_uinhome?sslmode=disable' \
NEXT_PUBLIC_SERVER_URL='http://localhost:3000' \
npm run dev
```

然后访问：

- `http://localhost:3000/admin`（首次会提示创建第一个用户）

---

## 6. 已知问题 / 警告（当前不阻塞，但会影响体验）

- **Payload email adapter 未配置**
  - 现象：启动/运行脚本会提示 “No email adapter provided”
  - 影响：发邮件会写到控制台（对官网内容重构不构成阻塞）

- **next-intl webpack cache warning**
  - 现象：Next dev 输出里有 next-intl 的 `import(t)` 解析警告
  - 影响：主要是缓存失效提示，不影响功能

---

## 7. 下一步工作（对应待办：阶段 5 / 6）

### 7.0 真实状态核对（重要）

当前前端已切换为 Payload 数据源（页面与全站 globals），**不再使用 next-intl 作为内容回退**；但仍保留 next-intl 用于部分 UI/ARIA 文案。

接下来的重点是：

- 逐组件移除 `useTranslations()` / `t.raw()` 依赖（改为 Payload 字段或 props 注入）
- 删除 `messages/` 与 `src/i18n/request.ts` 的 JSON import
- 清理 `public/images/` 与 `next.config.mjs` 中遗留 remotePatterns

### 7.1 阶段 5：全站组件适配 + 删除 messages（进行中）

- 全站移除 `useTranslations()` / `t()` / `t.raw()` 依赖（改为从 Payload 取数据并通过 props 下发）
- 删除 `messages/` 目录（建议在全站切换完成后一次性移除）
- 清理 `public/images/` 中已迁移资源（迁移后改为从 Payload Media 读取）

### 7.2 阶段 6：部署与运维配置（未开始）

- 固化 Next.js + Payload + Postgres 的生产部署方式（建议包含 `media/` 的持久化挂载策略）
- Admin 权限/账号管理策略
- 数据库备份策略（Postgres 定期备份与恢复演练）
