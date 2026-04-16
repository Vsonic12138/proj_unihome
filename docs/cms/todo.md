# Payload CMS 重构待办清单

更新时间：2026-04-04

状态：`ACTIVE`（最近审查：2026-04-15）

说明：本清单以“最小闭环 → 渐进替换 → 收尾清理 → 上线运维”为推进顺序。每完成一项会在本文件内勾选，并在仓库中落地对应代码/文档变更。

---

## 阶段 3：前端数据层最小闭环（优先）

- [x] 新增 `src/lib/payload.ts`：封装 Payload Local API（`getPayload({ config })`）与常用查询（globals/page/product）
- [x] 新增 `src/components/payload/RichText.tsx`：渲染 Payload Lexical RichText JSON
- [x] 新增 `src/components/payload/BlockRenderer.tsx`：将 `pages.blocks` 分发到现有 UI 组件（Hero/Features/About/Contact…）
- [x] 首页改造：`src/app/[locale]/page.tsx` 从 Payload `pages(slug=home)` 渲染 blocks（移除 next-intl fallback）
- [x] `src/app/[locale]/layout.tsx`：切换为 Payload globals 驱动 Header/Footer/FloatingContact/CookieConsent

---

## 阶段 3.5：Globals 先切换（建议尽快）

- [x] `src/app/[locale]/layout.tsx`：从 Payload 拉取 globals，并将 `navigation/footer/siteSettings` 下发给全站组件
- [x] Header：导航菜单数据源改为 Payload `navigation`（移除 fallback）
- [x] Footer：页脚 description/sections/二维码数据源改为 Payload `footer`（移除 fallback）
- [x] FloatingContact：数据源改为 Payload `siteSettings.floatingContact`（移除 fallback）
- [x] CookieConsent：数据源改为 Payload `siteSettings.cookieConsent`（移除 fallback）
- [x] SiteSettings Schema 扩展 + 迁移：新增 `floatingContact` 与 cookieConsent 追加字段，并生成迁移与 types

---

## 阶段 4：页面逐一重构

- [x] 产品列表页改造：从 Payload `products`/`productSeries` 查询（FAQ 暂未接入 Payload，当前不渲染）
- [x] 产品详情页改造：从 Payload `products(slug)` 查询，并改造 `generateStaticParams`
- [x] 案例页改造：改为 Payload `pages` 驱动（PageIntro + Blocks 渲染）
- [x] 其它页面迁移：`about/contact/custom-solutions/developers/*/error` 改为 Payload `pages` 驱动（PageIntro + Blocks）

---

## 阶段 5：全站组件适配 + 删除 messages

- [ ] 逐组件移除 `useTranslations()` / `t.raw()` 依赖（改为 props 注入）
- [ ] 删除 `messages/` 目录并移除 `src/i18n/request.ts` 的 JSON import 逻辑
- [ ] 清理 `public/images/`（已迁移资源改用 Payload Media）
- [ ] `next.config.mjs` 清理遗留（如 `cdn.sanity.io` remotePatterns）

---

## 阶段 6：部署与运维

- [ ] 生产 Docker 化（Next.js + Payload + Postgres）与环境变量固化
- [ ] `media/` 持久化策略（volume 或 S3）与备份/恢复演练
- [ ] Admin 权限/账号策略（角色、最小权限、审计）
- [ ] 缓存/ISR/发布流程（内容发布后的 revalidate 策略）
