# 仓库布局说明

本文描述当前仓库的职责边界，以及未来若出现独立业务后端时的演进方向。  
**目标是让目录可读，而不是为了“看起来像 monorepo”而强行搬家。**

## 1. 当前形态（保持）

本仓库是**单应用产品仓**：

- 前台官网（Next.js App Router）
- Payload CMS Admin（`/admin`）
- Payload API（`/api`）
- PostgreSQL 内容数据
- 本地/生产运维脚本

三者运行在**同一个 Next.js 进程**中，不是前后端分两个 git 仓库。

```text
proj_unihome/
├─ src/                 # 应用主体（前台 + CMS 接入）
│  ├─ app/              # 路由：前台 [locale] + Payload admin/api
│  ├─ components/       # 前台 UI
│  ├─ payload/          # 内容模型：collections / globals / blocks / admin
│  ├─ lib/              # 取数、SEO、业务 helper
│  ├─ i18n/             # next-intl 配置
│  ├─ migrations/       # Payload schema migrations
│  └─ styles/ types/
├─ public/              # 静态资源
├─ messages/            # 前台文案 JSON；部分 seed 仍会读取
├─ scripts/             # CMS 检查 / seed / 发布 / 补丁 / 备份脚本
├─ ops/                 # Docker、部署包、远端部署、环境模板
├─ docs/                # 当前文档（历史材料在 docs/archive）
├─ media/               # 本地 CMS 上传目录（gitignore，勿提交）
├─ backups/             # 本地备份（gitignore，勿提交）
├─ payload.config.ts    # Payload 入口（与 Next 同仓）
├─ next.config.mjs
├─ package.json
└─ version.md
```

## 2. 职责边界（读代码时按这个分）

```text
┌──────────────────┬────────────────────────────────────────────┐
│ 边界             │ 目录 / 入口                                │
├──────────────────┼────────────────────────────────────────────┤
│ 前台展示         │ src/app/[locale]、src/components、messages │
│ 内容后端（CMS）  │ src/payload、payload.config.ts、migrations │
│ 共享取数层       │ src/lib/payload.ts 等                      │
│ 内容运维         │ scripts/payload/**                         │
│ 部署运维         │ ops/**                                     │
│ 本地数据（不入库）│ media/、backups/、node_modules/、.next/    │
└──────────────────┴────────────────────────────────────────────┘
```

### 页面 vs 业务条目

- `pages` 集合：页面骨架与 blocks（模块拼装）
- `caseStudies` / `products` / `news` 等：业务实体
- 列表类 block（如 `caseStudiesList`、`newsShowcase`）只保存筛选/数量配置，真正列表在渲染时再查询对应集合

## 3. 根目录里常见但“看起来乱”的目录

这些目录**多数是正确且必要的**，只是不应提交到 git：

| 路径 | 作用 | 是否应删除 |
|---|---|---|
| `media/` | CMS 上传文件 | 否（本地需要） |
| `backups/` | 本地/同步备份 | 否（可按保留策略瘦身） |
| `node_modules/` | 依赖 | 否 |
| `.next/` | 构建缓存 | 可删，会再生 |
| `proj-unihome-*-bundle*` | 部署/补丁产物 | 可删，用脚本重建 |

AI/编辑器本地缓存（`.kilo/`、`.superpowers/`、`.antigravitycli/` 等）应被 gitignore，不参与产品逻辑。

## 4. 未来演进（暂不施工）

当出现**第二个可独立部署服务**（例如业务 API、worker）时，再物理升级为：

```text
proj_unihome/
├─ apps/
│  ├─ web/              # 当前 Next + Payload 迁入
│  └─ api/              # 新业务后端
├─ packages/
│  ├─ content-schema/   # 共享类型 / 校验
│  └─ api-client/
├─ ops/
├─ scripts/ 或 tooling/
└─ docs/
```

在此之前：

- **不要**为了目录美观把 `src/` 整包搬到 `apps/web/`
- **不要**过早拆成 frontend / backend 两个 git 仓库

触发条件（满足 2 条以上再考虑搬家）：

1. 后端服务不只服务本官网
2. 需要独立扩缩容或独立发布窗口
3. 需要跨应用共享类型/SDK
4. 不同团队对前后端有硬隔离需求

## 5. 相关文档

- 总览：`docs/overview.md`
- 开发：`docs/development.md`
- 部署：`docs/deployment.md`
- CMS：`docs/cms.md`
- 生产 CMS 补丁：`docs/production-cms-patch-flow.md`
