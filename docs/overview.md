# 项目概览

本文档用于说明当前仓库的整体结构，以及前端、CMS、数据库和部署之间的关系。

## 当前结论

这是一个单体式网站项目，前端、Payload CMS 和 Payload API 运行在同一个 Next.js 服务中。

- 前端框架：Next.js 15 App Router
- CMS：Payload CMS v3
- 数据库：PostgreSQL 16
- 语言：TypeScript
- 样式：Tailwind CSS v4

## 系统结构

当前运行结构如下：

```text
浏览器
  -> Nginx（生产环境）
  -> Next.js 服务
     -> 前端页面 /{locale}/*
     -> Payload Admin /admin
     -> Payload API /api/*
     -> PostgreSQL
```

项目没有将前端和 CMS 拆成两个独立服务。

## 路由约定

- 前端页面位于 `src/app/[locale]/...`
- CMS 后台地址是 `/admin`
- Payload API 地址是 `/api/*`

国际化由 `next-intl` 处理，当前启用语言为：

- `zh`
- `en`
- `ja`

前端路由始终带语言前缀。`/admin`、`/api`、`/_next` 和静态文件路径不参与语言路由处理。

## 代码目录

- `src/app/`：路由与页面
- `src/components/`：前端组件
- `src/payload/`：Payload collections、globals、blocks、后台定制
- `src/i18n/`：国际化配置
- `messages/`：前端文案 JSON
- `scripts/payload/`：CMS 检查、备份、发布、迁移、种子脚本
- `ops/`：Docker、部署脚本、环境模板
- `docs/`：项目文档

## CMS 结构

当前已注册的 collections 包括：

- `users`
- `mediaFolders`
- `media`
- `pages`
- `productSeries`
- `products`
- `faq`
- `caseStudies`
- `tickets`

当前已注册的 globals 包括：

- `siteSettings`
- `navigation`
- `footer`

站点页面内容、产品、案例、媒体、导航、页脚和工单都已经纳入 CMS。
