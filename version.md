# 更新日志

本文件记录项目的所有版本变更。**版本号唯一真值源为项目根目录的 `package.json`**，提交时请同步更新此文件。

---

## 版本号规则

格式：`VX.Y.Z`（三段式语义化版本）

| 段位 | 名称 | 递增时机 |
|------|------|----------|
| **X** | MAJOR | 产品形态重大变化，如架构重写、平台切换等不兼容变更 |
| **Y** | MINOR | 每次 `feat` / `refactor` / `remove` 类变更 |
| **Z** | PATCH | `fix` / `docs` / `ui` / `chore` / `test` 类维护变更 |

**递增规则：**
- MAJOR 递增 → Y 和 Z 归零
- MINOR 递增 → Z 归零
- 多条同类 fix/docs 可合并为一次 PATCH 递增

---

## Commit 信息格式

```
VX.Y.Z type(scope): 简要描述
```

> 版本号必须与 `package.json` 保持一致。提交前请先更新 `package.json` 中的版本号，再写 commit message。

**变更类型 (type) 与递增对应：**

| 类型 | 说明 | 递增段位 |
|------|------|----------|
| `feat` | 新增/修改功能 | **MINOR** |
| `refactor` | 代码重构、结构调整 | **MINOR** |
| `remove` | 删除功能、文件、资源 | **MINOR** |
| `fix` | 问题修复、BUG 修正 | PATCH |
| `ui` | 界面调整、样式、布局 | PATCH |
| `docs` | 文档更新 | PATCH |
| `chore` | 构建、配置、日常维护 | PATCH |
| `test` | 测试用例、测试框架 | PATCH |

**常用 scope 参考值：** `i18n` / `components` / `pages` / `config` / `ui` / `deps`

---

## 版本号更新工作流

每次提交前，按以下步骤操作：

```bash
# Step 1: 在根目录运行版本更新脚本
npm run version:minor   # feat / refactor / remove 类变更
npm run version:patch   # fix / docs / ui / chore / test 类变更

# Step 2: 在 version.md 历史日志顶部插入本次变更记录（版本号须与 package.json 一致）

# Step 3: git add + git commit
```

**示例：**
- `V1.21.0 feat(i18n): 新增韩语支持`
- `V1.21.1 ui(components): 修复导航栏移动端显示异常`
- `V1.22.0 refactor(pages): 重构产品详情页数据流`

---

V1.25.5 docs(docs): 重组 docs 目录并完善部署与运维文档

类型: docs

范围: docs, deploy

说明:
本次提交对 `docs/` 文档目录进行分层重组并统一命名风格，同时补齐生产部署与运维说明，使“阿里云 ECS 上线与日常更新”具备更强的可复制性与排障可读性。

实现细节:

1. **文档目录重组与索引**
   - 将文档按 `deploy/infra/containers/cms/legal/plans` 分层归档，并在 `docs/README.md` 提供索引与状态标记（ACTIVE/OPTIONAL/DRAFT/ARCHIVED）。
2. **部署手册可复制化**
   - 为关键命令块补充“命令说明”，并尽量保持命令块本身可直接复制执行。
   - 对 `init/update` 的职责边界进行明确说明，降低误操作概率。
3. **内容审查与去过时**
   - 修正明显会导致照抄失败的示例（例如连接串拼写、旧路径引用）。
   - 将 GCP 相关文档标记为归档（ARCHIVED），避免被当作默认路径执行。

文件变更:
新增/移动/修改文件（节选）:
- `/docs/README.md`（索引与状态标记）
- `/docs/deploy/aliyun-ecs.md`（ECS 部署手册，命令说明与可复制化）
- `/docs/deploy/docker-production.md`（生产部署结构与 init/update 解释）
- `/docs/infra/database.md`（数据库连接与备份说明）
- `/docs/containers/docker.md`（Docker 环境说明）

改进效果:
- 文档结构更清晰，新成员或新 AI 会话更容易定位“应该看哪篇”。
- 部署命令的含义更明确，复制执行更顺畅，排障成本更低。

影响范围:
- 仅影响文档结构与内容；不影响业务代码运行逻辑。
- 文档路径发生变化（旧文档文件名已迁移到新的 `docs/**` 结构下）。

---

V1.25.4 chore(deploy): Docker 与部署流程迁移至 ops 并提供一键 init/update

类型: chore

范围: deploy, config, docs

说明:
本次提交对 Docker 与部署相关文件进行结构性整理：将 Dockerfile/Compose/生产 env 示例统一迁移到 `ops/` 下，并将“本地打包部署包 + 服务器解压部署”的流程自动化为可重复执行的一键脚本（`deploy.sh init/update`），以降低部署与更新的手工出错概率。

实现细节:

1. **目录结构整理（Breaking Change）**
   - 将 `Dockerfile` 迁移到 `ops/docker/Dockerfile`
   - 将 `docker-compose*.yml` 迁移并改名为 `ops/docker/compose.*.yml`
   - 将 `.env.production.example` 迁移到 `ops/env/.env.production.example`
2. **部署包自动化**
   - 新增 `ops/deploy/create-deploy-bundle.sh`：本地一键生成 `proj-unihome-deploy-bundle.tar.gz`
   - 新增 `ops/deploy/deploy.sh`：在服务器端一键执行 `check/init/update`
   - 为部署包提供 `compose.prod.yml` 模板与 README 模板
3. **命令与文档统一**
   - 调整 `package.json` scripts，新增 `deploy:bundle`、`docker:*` 入口
   - 更新部署相关文档，替换旧的分步命令为 `deploy.sh init/update`，并同步新路径

文件变更:
修改/移动/新增文件（节选）:

- `/ops/docker/Dockerfile`
- `/ops/docker/compose.prod.yml`
- `/ops/docker/compose.dev.yml`
- `/ops/env/.env.production.example`
- `/ops/deploy/create-deploy-bundle.sh`
- `/ops/deploy/deploy.sh`
- `/docs/deploy/docker-production.md`

改进效果:

- Docker/部署文件集中，仓库根目录更干净，维护成本更低
- 首次部署与常规更新流程可一键执行，减少人工操作与误差

影响范围:

- 仅影响部署相关文件路径与脚本入口（属于 breaking change），不改变线上业务逻辑

---

V1.25.3 chore(config): 完善仓库上手说明并收紧 Docker/Git 忽略规则

类型: chore

范围: config, workflows

说明:
本次提交聚焦协作与工程配置维护：补充 `AGENTS.md` 的 Quickstart 关键信息，强化变更日志工作流对 AI 助手的约束说明，并优化 `.gitignore/.dockerignore` 以避免本地工具与大体积产物进入版本库或 Docker 构建上下文。

实现细节:

1. **仓库协作说明补全**
   - 在 `AGENTS.md` 增加 Quickstart 段落，明确必需环境变量、关键路由约定与 i18n 关键点。
2. **工作流约束更明确**
   - 更新 `.agents/workflows/generate-changelog.md`，明确 AI 仅可执行 `git add`，并补充“拆分提交与版本号”的推荐策略。
3. **忽略规则收紧**
   - 更新 `.gitignore`，忽略本地 AI/工具目录（例如 `.codex`、`.kilo/`）避免误提交。
   - 更新 `.dockerignore`，排除本地数据、构建产物和超大打包物（例如 `*.tar.gz`）以缩小 Docker build context。

文件变更:
修改文件:

- `/.agents/workflows/generate-changelog.md`
- `/.dockerignore`
- `/.gitignore`
- `/AGENTS.md`
- `/package.json`
- `/package-lock.json`
- `/version.md`

改进效果:

- 新开 AI 会话更容易在不翻大量文件的情况下正确上手仓库。
- 降低误提交本地工具目录/敏感文件/大体积产物的风险。
- 加快 Docker 构建（减少 build context 体积），提升缓存稳定性。

影响范围:

- 仅影响文档、忽略规则与构建上下文，不改变业务逻辑与页面行为。

---

V1.25.2 docs(deploy): 补充阿里云、GCP及Docker生产部署操作指南

类型: docs

范围: deploy

说明:
本次提交主要补充了一系列关于项目服务器部署和环境配置的知识沉淀文档，完善了相关的操作指南。这与代码逻辑无直接关联，纯粹是对运维与部署知识的积累。

实现细节:

1. **部署指南新增**
   - 新增 `docs/deploy/docker-production.md`，提供关于 Docker 生产环境部署的详细指南。
   - 新增 `docs/deploy/aliyun-ecs.md`，提供在阿里云 ECS 上部署该项目的步骤指导。
   - 新增 `docs/deploy/gcp-migration.md`，记录了 GCP 服务器迁移的操作手册和策略。
   - 新增 `docs/deploy/cloudflare-tunnel.md`，提供 Cloudflare 子域名配置与绑定的设置指南。

文件变更:
修改文件:

- `/package.json`
- `/package-lock.json`
- `/version.md`

新增文件:

- `/docs/deploy/docker-production.md`
- `/docs/deploy/aliyun-ecs.md`
- `/docs/deploy/gcp-migration.md`
- `/docs/deploy/cloudflare-tunnel.md`

改进效果:

- 完善了项目的部署生态文档。
- 降低了团队后续在多云平台（阿里云、GCP等）以及使用 Docker 容器化部署时的上手门槛与沟通成本。

影响范围:

- 仅增加了文档资源，不影响任何代码逻辑和构建产物。

---

V1.25.1 chore(scripts): 新增一键部署打包脚本与工作流规范说明

类型: chore

范围: scripts, config

说明:
本次提交主要补充自动化部署的构建脚本，完善了 `.gitignore` 的打包产物忽略规则，并新增了供 AI Agent 与开发人员参考的版本更新工作流规范。

实现细节:

1. **新增自动化打包脚本**
   - 新增部署包生成脚本（当前入口在 `ops/deploy/create-deploy-bundle.sh`），用于一键构建并提取包含生产镜像、编排文件与可选快照的部署包。
2. **沉淀规范与工作流**
   - 新增 `.agents/workflows/generate-changelog.md`，规范记录了从递增版本号到编写 `version.md` 日志以及最终提交的完整步骤。
3. **完善代码库忽略规则**
   - 更新 `.gitignore`，增加对部署包中间目录（当前为 `proj-unihome-deploy-bundle/`，旧名 `deploy-pkg/`）与 `.tar.gz` 打包产物的忽略，避免构建产物污染代码库。

文件变更:
修改文件:

- `/.gitignore`
- `/package.json`
- `/package-lock.json`
- `/version.md`

新增文件:

- `/ops/deploy/create-deploy-bundle.sh`
- `/.agents/workflows/generate-changelog.md`

改进效果:

- 支持一键生成用于分发的生产环境部署压缩包，降低了手动收集产物的出错率。
- 增强了项目协作与 AI 辅助提交的规范性。

影响范围:

- 影响项目的打包发布准备阶段及协作流规范，不影响线上代码运行。

---

V1.25.0 feat(deploy): 引入 Docker 容器化环境与生产构建配置

类型: feat

范围: deploy

说明:
本次提交聚焦项目的容器化与生产环境构建支持，主要引入 Docker 容器编排及 Next.js 独立输出模式 (standalone output)。这为项目提供了标准的生产环境部署能力，确保开发、测试和生产环境的一致性。

实现细节:

1. **引入容器化配置文件**
   - 新增 `Dockerfile`，定义 Next.js 独立产物构建与运行环境。
   - 新增 `.dockerignore`，避免非必要文件进入镜像构建上下文。
   - 新增 `docker-compose.prod.yml`，定义生产环境的多服务编排（如 Web 服务和 Postgres 数据库）。
   - 新增 `.env.production.example`，提供生产环境的配置参数示例。

2. **支持生产环境图片域名动态配置**
   - 修改 `next.config.mjs`，在 `images.remotePatterns` 中根据环境变量 `NEXT_PUBLIC_SERVER_URL` 动态注入图片允许域名，适应多环境部署。
   - 修改 `next.config.mjs`，开启 `output: 'standalone'` 模式，减小容器化构建时的镜像体积。

3. **同步版本记录**
   - 更新 `package.json`、`package-lock.json` 与 `version.md` 版本号到 `1.25.0`。

文件变更:
修改文件:

- `/next.config.mjs`
- `/package.json`
- `/package-lock.json`
- `/version.md`

新增文件:

- `/.dockerignore`
- `/.env.production.example`
- `/Dockerfile`
- `/docker-compose.prod.yml`

改进效果:

- 支持项目直接打包为轻量级 Docker 镜像，方便跨平台部署。
- 解除了本地开发与生产环境在图片访问域名等方面的硬编码耦合。
- 提供生产级别的环境变量范例及容器编排范例。

影响范围:

- 影响项目的生产打包方式及服务器部署流程。
- 不影响本地现有的基于 `npm run dev` 的开发体验。

---

V1.24.0 remove(scripts): 清理一次性 Payload 内容维护脚本

类型: remove

范围: scripts

说明:
本次提交聚焦 `scripts/payload` 目录的内容清理，删除一批仅服务于单次产品修补、测试或恢复操作的脚本。这些脚本未作为项目长期运维入口使用，继续保留会增加脚本目录的维护成本与理解负担，因此本次将其从仓库中移除。

实现细节:

1. **删除一次性样机案例与内容回填脚本**
   - 删除 `fill-09s-sample-cases.ts`
   - 删除 `fill-alo-le4-content.ts`
   - 删除 `fill-rai-m4-sample-cases.ts`
   - 删除 `fill-rai-p4-sample-cases.ts`
   - 删除 `fill-ubot-mr40-sample-cases.ts`
   - 删除 `fill-uni-wr2-content.ts`

2. **删除单次修补与恢复脚本**
   - 删除 `patch-09s-images.ts`
   - 删除 `patch-rai-m4-sample-cases.ts`
   - 删除 `patch-rai-p4-controller.ts`
   - 删除 `patch-rai-p4.ts`
   - 删除 `patch-ubot-highlights.ts`
   - 删除 `recover-rai-p4.ts`
   - 删除 `recover-rai-p4-v2.ts`
   - 删除 `remove-09s-experiment.ts`

3. **删除临时检查与测试脚本**
   - 删除 `inspect-rai-m4.ts`
   - 删除 `test-id.ts`
   - 删除 `test-locale.ts`

4. **同步版本记录**
   - 更新 `package.json`、`package-lock.json` 与 `version.md` 版本号到 `1.24.0`。

文件变更:
修改文件:

- `/package.json`
- `/package-lock.json`
- `/version.md`

删除文件:

- `/scripts/payload/fill-09s-sample-cases.ts`
- `/scripts/payload/fill-alo-le4-content.ts`
- `/scripts/payload/fill-rai-m4-sample-cases.ts`
- `/scripts/payload/fill-rai-p4-sample-cases.ts`
- `/scripts/payload/fill-ubot-mr40-sample-cases.ts`
- `/scripts/payload/fill-uni-wr2-content.ts`
- `/scripts/payload/inspect-rai-m4.ts`
- `/scripts/payload/patch-09s-images.ts`
- `/scripts/payload/patch-rai-m4-sample-cases.ts`
- `/scripts/payload/patch-rai-p4-controller.ts`
- `/scripts/payload/patch-rai-p4.ts`
- `/scripts/payload/patch-ubot-highlights.ts`
- `/scripts/payload/recover-rai-p4.ts`
- `/scripts/payload/recover-rai-p4-v2.ts`
- `/scripts/payload/remove-09s-experiment.ts`
- `/scripts/payload/test-id.ts`
- `/scripts/payload/test-locale.ts`

改进效果:

- `scripts/payload` 目录中的一次性维护脚本数量减少，目录职责更清晰。
- 降低后续继续误用历史修补脚本的风险。
- 保留备份、发布、迁移、通用修复等长期可复用脚本。

影响范围:

- 影响仓库中的 Payload 辅助脚本目录结构。
- 不直接修改前端页面、CMS schema 或线上内容数据。

---

V1.23.3 fix(products): 修复 MR40 样机案例展示并统一多语言产品标识

类型: fix

范围: products

说明:
本次提交聚焦 `Ubot MR40` 产品内容的名称统一与 CMS 数据回填。针对产品详情页“样机案例”缺少可展示图片分组的问题，补充专用脚本以按中文、英文、日文三种语言将案例分组写回 CMS；同时将消息文件中残留的旧标识 `ubot-mr20` 统一调整为 `ubot-mr40`，减少后续维护时的命名混淆。

实现细节:

1. **统一三语产品标识**
   - 将 `messages/{zh,en,ja}/products.json` 中 MR40 的产品卡片 `slug` 从 `ubot-mr20` 调整为 `ubot-mr40`。
   - 将三语产品详情数据键名从 `ubot-mr20` 调整为 `ubot-mr40`。
   - 将 `messages/{zh,en,ja}/home.json` 首页精选产品中的旧产品标识同步改为 `ubot-mr40`。

2. **补充 MR40 样机案例回填脚本**
   - 新增 `scripts/payload/fill-ubot-mr40-sample-cases.ts`。
   - 该脚本会读取三语消息文件中的 MR40 样机案例分组，并将 `modules / chassis / arms / compositeRobots` 映射为 CMS 可直接消费的 `sampleCases.sections`。

3. **同步辅助脚本命名**
   - 调整 `scripts/payload/patch-ubot-highlights.ts`，使其读取 `ubot-mr40` 键名，避免继续依赖旧命名。

4. **同步版本记录**
   - 更新 `package.json`、`package-lock.json` 与 `version.md` 版本号到 `1.23.3`。

文件变更:
修改文件:

- `/messages/zh/home.json`
- `/messages/en/home.json`
- `/messages/ja/home.json`
- `/messages/zh/products.json`
- `/messages/en/products.json`
- `/messages/ja/products.json`
- `/scripts/payload/patch-ubot-highlights.ts`
- `/package.json`
- `/package-lock.json`
- `/version.md`

新增文件 / 目录:

- `/scripts/payload/fill-ubot-mr40-sample-cases.ts`

改进效果:

- `Ubot MR40` 的三语产品标识在消息文件与辅助脚本中保持一致。
- MR40 详情页“样机案例”具备写回 CMS 所需的标准化数据回填脚本。
- 降低后续继续混用 `ubot-mr20` 旧命名的风险。

影响范围:

- 影响 MR40 相关的三语产品消息数据、首页精选产品配置与 CMS 内容回填脚本。
- 不涉及新的前端布局改造，仅修正现有内容标识与数据准备方式。

---

V1.23.2 chore(assets): 补充产品展示资源并移除旧版 favicon

类型: chore

范围: assets

说明:
本次提交聚焦静态资源整理，补充产品页所需的图片素材，并移除旧版 `favicon.ico`。这样可以让产品详情与相关展示模块使用新的资源组织方式，同时清理已被新图标资源替代的旧文件。

实现细节:

1. **补充产品展示图片资源**
   - 新增 `GX-MAT-09S` 相关底盘、机械臂、复合机器人与控制板图片。
   - 新增 `RAI-P4` 相关展示图片。

2. **移除旧版站点图标**
   - 删除 `public/favicon.ico`。
   - 与前面已接入的新 SVG 图标方案保持一致，减少重复资源。

文件变更:
修改文件:

- `/version.md`

新增文件 / 目录:

- `/public/images/products/gx-mat-09s/arms/`
- `/public/images/products/gx-mat-09s/chassis/`
- `/public/images/products/gx-mat-09s/composite/`
- `/public/images/products/gx-mat-09s/controller/motherboard.png`
- `/public/images/products/rai-p4/rai-p4-comprehensive-training-display.png`

删除文件:

- `/public/favicon.ico`

改进效果:

- 产品页展示素材更完整，支撑前台图文呈现。
- 静态资源结构更贴近当前产品内容模型。
- 清理与新图标方案重复的旧 favicon 资源。

影响范围:

- 影响产品页相关图片展示与站点图标资源文件集合。
- 不影响业务逻辑与 CMS 数据结构。

---

V1.23.1 chore(config): 整理开发文档与变更日志辅助脚本

类型: chore

范围: config

说明:
本次提交聚焦开发辅助内容整理，补充仓库说明文档、同步开发协作规范，并将变更日志生成脚本从旧的 `.js` 版本切换为 `.cjs` 版本，便于在当前项目配置下稳定运行，减少后续维护歧义。

实现细节:

1. **补充与整理开发文档**
   - 更新 `AGENTS.md`。
   - 新增 `docs/` 下的项目说明与运维相关文档。

2. **调整变更日志辅助脚本**
   - 新增 `scripts/generate-changelog.cjs`。
   - 删除旧的 `scripts/generate-changelog.js`，统一脚本形态。

3. **同步版本记录**
   - 更新 `version.md`，登记本次文档与脚本整理内容。

文件变更:
修改文件:

- `/AGENTS.md`
- `/version.md`

新增文件 / 目录:

- `/docs/`
- `/scripts/generate-changelog.cjs`

删除文件:

- `/scripts/generate-changelog.js`

改进效果:

- 仓库内的开发说明和协作规则更完整。
- 版本日志辅助脚本与当前 Node/模块配置保持一致。
- 为后续提交和版本记录维护提供更稳定的辅助能力。

影响范围:

- 仅影响开发文档、协作规范与辅助脚本，不影响前台业务功能。

---

V1.23.0 feat(cases): 重构服务案例路由与多语言内容结构

类型: feat

范围: cases

说明:
本次提交聚焦服务案例模块的 CMS 化与结构调整，重构 `case-studies` 路由组织方式，接入新的案例详情与分类页面，同时补充对应的三语文案与案例展示组件，替换旧的专题页面结构，使案例模块与新的 CMS 内容模型保持一致。

实现细节:

1. **重构案例路由结构**
   - 调整 `src/app/[locale]/case-studies/page.tsx` 列表页。
   - 新增基于 slug 的案例详情路由与分类页面目录。
   - 删除旧的 `co-research`、`k12`、`universities` 等遗留页面实现。

2. **补充案例前台组件**
   - 新增 `src/components/Cases/`，统一承接案例卡片、详情区块及分类展示逻辑。

3. **同步三语案例文案**
   - 新增 `messages/{zh,en,ja}/cases.json`。
   - 让案例列表页、分类页和详情页在三语环境下具备完整文案支撑。

4. **统一案例模块与 CMS 内容模型**
   - 让前台案例访问路径、分类结构与 Payload 中的 case studies 数据组织方式保持一致。

文件变更:
修改文件:

- `/src/app/[locale]/case-studies/page.tsx`

新增文件 / 目录:

- `/src/app/[locale]/case-studies/[slug]/`
- `/src/app/[locale]/case-studies/innovation-competition/`
- `/src/app/[locale]/case-studies/practical-teaching/`
- `/src/app/[locale]/case-studies/sci-tech-innovation/`
- `/src/app/[locale]/case-studies/training-base/`
- `/src/components/Cases/`
- `/messages/zh/cases.json`
- `/messages/en/cases.json`
- `/messages/ja/cases.json`

删除文件:

- `/src/app/[locale]/case-studies/co-research/page.tsx`
- `/src/app/[locale]/case-studies/k12/page.tsx`
- `/src/app/[locale]/case-studies/universities/page.tsx`

改进效果:

- 服务案例模块具备更清晰的路由组织和更稳定的多语言内容结构。
- 前台案例页面与 CMS 数据模型对齐，便于后续继续运营与扩展。
- 替换旧的专题页残留实现，减少维护歧义。

影响范围:

- 影响 `case-studies` 列表页、分类页与详情页访问结构。
- 影响三语案例文案与案例相关前台组件渲染逻辑。

---

V1.22.0 feat(pages): 将多语言页面与通用组件接入 CMS 内容源

类型: feat

范围: pages

说明:
本次提交聚焦官网前台页面的 CMS 化改造，将首页、关于、联系、开发者、产品等多语言页面及其通用展示组件接入 Payload 内容源，同时补齐对应的多语言消息文件与前台渲染适配逻辑，使页面内容能够由 CMS 统一驱动。

实现细节:

1. **接通多语言页面的数据读取**
   - 调整 `src/app/[locale]/` 下首页、关于、联系、开发者、产品等页面路由。
   - 统一改为按当前 locale 读取 CMS 页面内容、全局配置与产品数据。

2. **接入前台区块渲染能力**
   - 新增 `src/components/payload/`，承接 CMS blocks 的前台渲染。
   - 让页面可根据 CMS 配置渲染 Hero、Features、Contact、Rich Text 等区块。

3. **改造通用前台组件**
   - 调整 Header、Footer、Hero、Features、Contact、Breadcrumb、Cookie 相关组件。
   - 补齐产品相关展示组件对 CMS 数据的消费能力。

4. **同步多语言文案文件**
   - 更新 `messages/{zh,en,ja}` 下与首页、通用、页面、产品、联系相关的消息文件。
   - 让前台静态文案与 CMS 输出在三语环境下保持一致。

5. **补充路由与样式配套调整**
   - 调整 `src/i18n/request.ts`、`src/middleware.ts` 与全局样式。
   - 删除旧的根布局 `src/app/layout.tsx`，统一由 locale 布局承接前台结构。

文件变更:
修改文件:

- `/src/app/[locale]/layout.tsx`
- `/src/app/[locale]/page.tsx`
- `/src/app/[locale]/about/page.tsx`
- `/src/app/[locale]/contact/page.tsx`
- `/src/app/[locale]/custom-solutions/page.tsx`
- `/src/app/[locale]/developers/page.tsx`
- `/src/app/[locale]/developers/knowledge-base/page.tsx`
- `/src/app/[locale]/developers/open-source/page.tsx`
- `/src/app/[locale]/products/page.tsx`
- `/src/app/[locale]/products/[slug]/page.tsx`
- `/src/app/[locale]/error/page.tsx`
- `/src/components/About/AboutSectionTwo.tsx`
- `/src/components/Common/Breadcrumb.tsx`
- `/src/components/Common/CookieConsent.tsx`
- `/src/components/Common/FloatingContact.tsx`
- `/src/components/Contact/index.tsx`
- `/src/components/Features/index.tsx`
- `/src/components/Footer/index.tsx`
- `/src/components/Header/index.tsx`
- `/src/components/Header/menuData.tsx`
- `/src/components/Hero/index.tsx`
- `/src/components/Products/FAQ.tsx`
- `/src/components/Products/ImageGridWithLightbox.tsx`
- `/src/i18n/request.ts`
- `/src/middleware.ts`
- `/src/styles/index.css`
- `/messages/zh/common.json`
- `/messages/zh/contact.json`
- `/messages/zh/home.json`
- `/messages/zh/pages.json`
- `/messages/zh/products.json`
- `/messages/en/common.json`
- `/messages/en/contact.json`
- `/messages/en/home.json`
- `/messages/en/pages.json`
- `/messages/en/products.json`
- `/messages/ja/common.json`
- `/messages/ja/contact.json`
- `/messages/ja/home.json`
- `/messages/ja/pages.json`
- `/messages/ja/products.json`

新增文件 / 目录:

- `/src/components/payload/`
- `/src/components/Common/CookiePreferencesButton.tsx`
- `/src/components/Products/SafeProductImage.tsx`
- `/src/app/[locale]/privacy-policy/`

删除文件:

- `/src/app/layout.tsx`

改进效果:

- 官网主要前台页面开始由 CMS 内容统一驱动。
- 三语页面的内容来源、渲染方式与组件行为趋于一致。
- 为后续 case studies、资源页与更多前台模块的 CMS 化改造打下基础。

影响范围:

- 影响首页、关于页、联系页、开发者页、产品页等主要前台路由。
- 影响三语页面渲染、导航读取与通用组件展示逻辑。

---

V1.21.0 feat(cms): 接入 Payload CMS 基础设施与后台管理能力

类型: feat

范围: cms

说明:
本次提交聚焦于项目的 CMS 基础设施接入，正式将 Payload CMS 引入当前官网工程，补齐数据库、内容模型、后台管理入口、API 路由、类型产物与内容运维脚本，为后续页面改造成“由 CMS 驱动”建立底座。

实现细节:

1. **接入 Payload CMS 核心配置**
   - 新增 `payload.config.ts`，定义 CMS 主配置入口。
   - 新增 `src/payload/`，集中管理 collections、globals、blocks 与后台自定义逻辑。
   - 新增 `src/payload-types.ts`，提供内容结构类型产物。

2. **补齐数据库与运行支撑**
   - 新增 `src/migrations/`，纳入数据库 schema 迁移记录。
   - 新增 `docker-compose.yml`，补齐本地数据库运行支撑。
   - 新增 `.env.example`，明确本地运行所需环境变量模板。

3. **接通 Next.js 与 Payload 集成入口**
   - 新增 `src/app/(payload)/` 作为后台挂载入口。
   - 新增 `src/app/api/` 中的相关接口路由，支撑预览与 CMS 交互流程。
   - 新增 `src/lib/payload.ts`，统一前台读取 Payload 数据的接入层。

4. **补充内容运维与恢复工具**
   - 新增 `scripts/payload/` 下的备份、导出、恢复、发布、同步与填充脚本。
   - 支持后续进行 CMS 快照导出、内容恢复、批量发布与多语言同步。

5. **同步构建与配置文件**
   - 更新 `package.json`、`package-lock.json`、`next.config.mjs`、`tsconfig.json`。
   - 新增 `postcss.config.cjs` 并删除旧的 `postcss.config.js`。

文件变更:
修改文件:

- `package.json` (引入 Payload CMS 相关依赖与脚本)
- `package-lock.json` (同步依赖锁文件)
- `next.config.mjs` (同步 Next.js 与 Payload 集成配置)
- `tsconfig.json` (补充 CMS 接入后的类型与路径配置)

新增文件 / 目录:

- `/payload.config.ts`
- `/docker-compose.yml`
- `/.env.example`
- `/src/app/(payload)/`
- `/src/app/api/`
- `/src/lib/payload.ts`
- `/src/migrations/`
- `/src/payload/`
- `/src/payload-types.ts`
- `/scripts/payload/`
- `/postcss.config.cjs`

删除文件:

- `/postcss.config.js` (由 `.cjs` 版本替代)

改进效果:

- 官网项目具备独立的 CMS 建模、录入、预览、发布与恢复能力。
- 为后续页面内容改造、多语言同步与内容运营提供统一底座。
- 降低手工维护页面静态内容的成本。

影响范围:

- 影响本地开发环境、依赖安装、数据库启动与内容管理流程。
- 为后续页面与组件的 CMS 化改造提供前置依赖。

---

V1.20.8 chore(config): 补充本地临时文件与 CMS 备份忽略规则

类型: chore

范围: config

说明:
本次提交仅调整仓库根目录的 `.gitignore`，补充当前项目实际开发流程中会产生、但不应纳入版本管理的本地文件与备份文件规则，避免后续分批提交时误将临时产物、AI 辅助目录或 CMS 快照一并提交。

实现细节:

1. **补充 AI 工作目录忽略**
   - 忽略 `.codex/`，避免本地 AI 工具生成的工作目录进入仓库。

2. **补充 CMS 备份与快照忽略**
   - 忽略 `backups/*.json`、`backups/*.tar.gz`、`backups/*.zip`。
   - 与已有的 `.dump` / `.sql` / `.log` 一起，覆盖当前常见的导出与备份格式。

3. **补充本地临时检查文件忽略**
   - 忽略 `backup*_list.txt`、`1.png`、`2.png` 等本地临时文件，减少误提交风险。

文件变更:
修改文件:

- `/.gitignore` (补充本地 AI 目录、CMS 快照/备份压缩包、临时截图与检查文件的忽略规则)

改进效果:

- 降低分批提交时误将本地文件提交进仓库的概率。
- 让 CMS 数据备份继续保留在本地，但不进入 Git 历史。
- 为后续多次版本提交提供更干净的工作区基础。

影响范围:

- 仅影响 Git 跟踪规则，不影响前端运行、CMS 功能或构建行为。

---

V1.20.7 chore(config): 规范并重构版本管理机制

类型: chore

范围: config

说明:
为了解决一直以来 `package.json` 版本号与 `version.md` 日志版本号脱节（package.json 仍停留在模板早期的 2.2.0）导致的混淆问题，本次更新引入了一套全新的、受控的语义化版本管理机制。此机制将彻底解决版本管理的混乱。

实现细节:

1. **唯一真值源 (SSOT) 确立**
   - 将 `package.json` 中的版本号从不再维护的 `2.2.0` 修正并同步到目前的最新序列 `1.20.7`。
   - 确定 `package.json` 现为整个项目的版本唯一真值源，所有的日志和 Commit 标注都必须以此为准。

2. **Npm Scripts 自动化配置**
   - 引入两个基于 `npm version` 的免 tag 命令，方便团队快速迭代并避免人工修改出错。
   - `npm run version:minor`：专门用于递增次版本号（feat, refactor 等）。
   - `npm run version:patch`：专门用于递增修订版本号（fix, docs, chore 等）。

3. **辅助更新日志脚本**
   - 新增了 `scripts/generate-changelog.js`，支持交互式命令行提示。
   - 配置了 `npm run changelog` 命令，只需在终端回复三个简单问题（类型、作用域、一句话概括），即可自动提取 `package.json` 里的最新版本，并在 `version.md` 顶部精确插入规范的模板供开发者填充，提升开发体验。

4. **规范文档重写**
   - 在 `version.md` 的头部重新编写了明确的版本号规划（MAJOR, MINOR, PATCH 对应何种行为）。
   - 提供了一套简单清晰的 3 步提交工作流指南。

文件变更:
修改文件:
- `package.json` (修正并同步版本号到 1.20.7，注入版本命令脚本)
- `version.md` (重写规范头部说明)

新增文件:
- `scripts/generate-changelog.js` (实现自动生成变更模板的交互式脚本)

改进效果:
- 消消除以前存在的严重版本不匹配。
- 引入自动化流程大幅降低人工遗漏导致的版本错位风险。
- 为开发者提升了体验并标准化了团队的工作流。

影响范围:
- 开发者流程变动：未来每次提交务必依据流程，先运行版本增加脚本，再生成日志模板。
- 不影响生产系统的应用运行。

---

V1.20.6 style(format): 统一 Markdown 列表标记和格式规范

类型: style, chore

范围: docs, formatting

说明:
本次更新对整个 `version.md` 文件执行 Prettier 格式化，统一 Markdown 列表标记（`*` → `-`），规范化标题和列表间的空行，确保文档风格一致。

实现细节:

1. **列表标记统一**

   - 将所有 `*` 无序列表标记统一为 `-`（符合 Prettier 默认风格）
   - 确保列表缩进和间距一致性

2. **空行规范化**

   - 在标题和列表之间添加适当的空行
   - 保持段落间的视觉分隔清晰

3. **格式一致性**
   - 统一代码块和引用格式
   - 确保所有列表项使用相同标记风格

文件变更:
修改文件:

- [`version.md`](version.md:1) (Prettier 格式化，统一 Markdown 风格)

改进效果:

- **风格一致性**: 整个文档使用统一的 `-` 列表标记，符合 Prettier 和社区最佳实践。
- **可读性提升**: 规范化的空行使文档结构更清晰。
- **维护成本降低**: 后续编辑不会触发意外的格式变更。

影响范围:

- 仅格式化变更，不影响业务功能逻辑与页面结构。
- 所有内容保持不变，仅标记风格统一。

---

V1.20.5 chore(deps): 深度清理模板残留依赖与资源

类型: chore, remove, docs

范围: deps, types, assets, config

说明:
本次更新对项目进行了深度清理，移除了从开源 startup 模板继承的未使用依赖、类型定义、静态资源和冗余配置文件，同时新增 AGENTS.md 开发规范文档，进一步精简代码库并提升可维护性。

实现细节:

1. **依赖清理**

   - `package.json` / `package-lock.json`:
     - 移除未使用的 `autoprefixer`（Tailwind CSS v4 已内置）

2. **类型定义清理**

   - `src/types/testimonial.ts`:
     - 移除未使用的客户评价类型定义。
   - `src/types/brand.ts`:
     - 移除未使用的品牌logo类型定义。
   - `src/types/blog.ts`:
     - 移除未使用的博客类型定义。

3. **静态资源清理**

   - `public/images/about/about-image.svg` / `about-image-dark.svg` / `about-image-2.svg` / `about-image-2-dark.svg`:
     - 移除未使用的 about 页面插图。
   - `public/images/hero/shape-01.svg` / `shape-02.svg`:
     - 移除未使用的 hero 装饰图形。
   - `public/images/favicon.png`:
     - 移除冗余的 favicon（已存在 favicon.ico）。

4. **配置文件清理**

   - `jsconfig.json`:
     - 移除冗余的 JavaScript 配置文件（项目使用 TypeScript，`tsconfig.json` 已足够）。

5. **文档新增**
   - `AGENTS.md`:
     - 新增开发规范文档，包含构建命令、项目技术栈、代码风格指南和目录结构说明。

文件变更:
修改文件:

- [`package.json`](package.json:1) (移除 autoprefixer 依赖)
- [`package-lock.json`](package-lock.json:1) (同步依赖更新)

删除文件:

- [`src/types/testimonial.ts`](src/types/testimonial.ts:1) (未使用的客户评价类型)
- [`src/types/brand.ts`](src/types/brand.ts:1) (未使用的品牌类型)
- [`src/types/blog.ts`](src/types/blog.ts:1) (未使用的博客类型)
- [`public/images/about/about-image.svg`](public/images/about/about-image.svg:1) (未使用插图)
- [`public/images/about/about-image-dark.svg`](public/images/about/about-image-dark.svg:1) (未使用插图)
- [`public/images/about/about-image-2.svg`](public/images/about/about-image-2.svg:1) (未使用插图)
- [`public/images/about/about-image-2-dark.svg`](public/images/about/about-image-2-dark.svg:1) (未使用插图)
- [`public/images/hero/shape-01.svg`](public/images/hero/shape-01.svg:1) (未使用装饰图形)
- [`public/images/hero/shape-02.svg`](public/images/hero/shape-02.svg:1) (未使用装饰图形)
- [`public/images/favicon.png`](public/images/favicon.png:1) (冗余 favicon)
- [`jsconfig.json`](jsconfig.json:1) (冗余 JS 配置)

新增文件:

- [`AGENTS.md`](AGENTS.md:1) (开发规范文档)

改进效果:

- **代码库更精简**: 移除未使用依赖和类型定义，减少维护负担。
- **资源更纯净**: 清理未引用图片，减小仓库体积。
- **配置更规范**: 移除冗余 jsconfig.json，避免与 tsconfig.json 冲突。
- **文档更完善**: 新增 AGENTS.md 为后续开发提供规范指引。

影响范围:

- 仅清理未使用资源，不影响业务功能逻辑与页面结构。
- 构建验证通过，确认无运行时错误。

---

V1.20.4 chore(legal): 更新许可证为公司专有 All Rights Reserved

类型: chore, docs

范围: legal, license

说明:
本次更新将项目许可证从模板 MIT 替换为公司官方专用许可证，明确仓库内容归北京有你同创科技有限公司所有，以符合官网项目合规要求。

实现细节:

1. **许可证主体更新**
   - `LICENSE`:
     - 将原 MIT 许可文本（Copyright (c) 2023 Next.js Templates）移除。
     - 替换为公司官方专有许可证（All Rights Reserved），指定版权主体为“北京有你同创科技有限公司”，年份为 2026。
     - 明确未经书面授权禁止复制、修改、分发，仅限经授权的员工/承包商按协议内部使用。
     - 保留对第三方开源组件的许可声明的特别段落，确保依赖仍按各自许可证处理。

文件变更:
修改文件:

- [`LICENSE`](LICENSE:1) (替换为公司专有 All Rights Reserved 许可证，版权主体为北京有你同创科技有限公司，年份 2026)

改进效果:

- **合规性提升**: 许可证明确与公司主体一致，消除了模板残留的版权归属问题。
- **权责清晰**: 明确了使用范围与授权要求，降低法律争议风险。
- **第三方兼容性**: 保留第三方组件按各自许可证授权的声明，不影响开源依赖合规。

影响范围:

- 法律/合规层面：变更仓库对外版权声明；不影响代码逻辑与运行时行为，也无需更新部署。

---

V1.20.3 chore(repo): 去模板化并清理静态资源

类型: chore, remove, docs

范围: repo, assets, config, docs

说明:
本次更新完成项目标识去模板化与无用静态资源清理，统一包名与语言 Cookie，并移除未引用的模板组件与素材，进一步收敛官网资产。

实现细节:

1. **项目标识去模板化**

   - `package.json` / `package-lock.json`:
     - 包名统一为 `proj_uinhome`。
   - `src/middleware.ts`、`src/components/Header/LocaleSwitcher.tsx`、`README.md`:
     - 更新语言偏好 Cookie 为 `proj_uinhome-language`。

2. **模板资源清理**

   - `src/components/Brands/*`、`src/components/video-modal.tsx`:
     - 移除未使用的品牌墙与视频弹窗组件。
   - `public/images/brands/*`、`public/images/blog/*`、`public/images/testimonials/*`、`public/images/video/*`、`public/images/404.svg`:
     - 清理模板品牌、博客、评价、视频素材与 404 插图。

3. **文档调整**
   - `README.md`:
     - 移除模板致谢内容。

文件变更:
修改文件:

- [`README.md`](README.md:1) (移除模板致谢并更新 Cookie 说明)
- [`package.json`](package.json:1) (包名调整为 proj_uinhome)
- [`package-lock.json`](package-lock.json:1) (同步包名)
- [`src/middleware.ts`](src/middleware.ts:1) (更新语言 Cookie 名)
- [`src/components/Header/LocaleSwitcher.tsx`](src/components/Header/LocaleSwitcher.tsx:1) (更新语言 Cookie 名)

删除文件:

- [`src/components/Brands/brandsData.tsx`](src/components/Brands/brandsData.tsx:1) (移除模板品牌墙数据)
- [`src/components/Brands/index.tsx`](src/components/Brands/index.tsx:1) (移除模板品牌墙组件)
- [`src/components/video-modal.tsx`](src/components/video-modal.tsx:1) (移除模板视频弹窗)
- [`public/images/404.svg`](public/images/404.svg:1) (移除模板 404 插图)
- [`public/images/brands/formbold.svg`](public/images/brands/formbold.svg:1) (清理品牌墙模板素材)
- [`public/images/blog/blog-01.jpg`](public/images/blog/blog-01.jpg:1) (清理博客模板素材)
- [`public/images/testimonials/author-01.png`](public/images/testimonials/author-01.png:1) (清理评价模板素材)
- [`public/images/video/video.jpg`](public/images/video/video.jpg:1) (清理视频模板素材)

改进效果:

- **品牌一致性提升**: 包名与 Cookie 统一为项目标识，降低模板痕迹。
- **仓库更精简**: 移除未引用组件与模板素材，减少资源冗余。
- **文档更清晰**: README 去模板化，说明更聚焦实际项目。

影响范围:

- 仅影响项目标识与静态资源，不改变业务功能逻辑与页面结构。

---

V1.20.2 chore(build): 修复 package-lock.json 依赖配置

类型: chore

范围: build, dependencies

说明:
本次更新修复 package-lock.json 中 jiti 包的 peer 依赖标记问题，移除不必要的 peer: true 属性，确保依赖解析正确性。

实现细节:

1. **依赖配置修复**
   - `package-lock.json`:
     - 移除 `jiti` 包的 `peer: true` 标记，避免潜在的依赖冲突问题。

文件变更:
修改文件:

- [`package-lock.json`](package-lock.json:1) (修复 jiti 依赖配置)

改进效果:

- **依赖管理更规范**: 避免 peer 依赖标记导致的解析歧义。
- **构建稳定性提升**: 确保依赖树结构清晰，减少潜在冲突。

影响范围:

- 仅影响构建时的依赖解析过程，不影响业务逻辑和运行时行为。

---

V1.20.1 docs(repo): 更新项目说明并清理忽略规则

类型: docs, chore, remove

范围: docs, git, tooling

说明:

本次更新调整 README 的项目定位与说明内容，去除模板与开源许可表述，并补齐本地环境忽略规则，同时移除不再使用的脚本文件。

实现细节:

1. **README 定位更新**

   - `README.md`:
     - 更新为公司官网描述，补充官网链接占位。
     - 同步国际化方案说明为 next-intl 与 JSON 文案结构。
     - 移除开源许可章节。

2. **忽略规则补充**

   - `.gitignore`:
     - 增加 `.envrc` 与 `.direnv/` 忽略，避免本地环境配置被提交。

3. **无用脚本清理**
   - `scan_i18n.sh`:
     - 删除旧的扫描脚本文件。

文件变更:

修改文件:

- [`README.md`](README.md:1) (更新官网定位与国际化说明)
- [`.gitignore`](.gitignore:1) (补充本地环境忽略项)

删除文件:

- [`scan_i18n.sh`](scan_i18n.sh:1) (移除旧脚本)

改进效果:

- **项目说明更准确**: 与公司官网定位一致，减少模板化描述。
- **版本库更干净**: 避免本地环境配置误提交。

影响范围:

- 仅影响文档说明与仓库维护规则，不影响业务逻辑。

---

V1.20.0 feat(i18n): 切换至 next-intl 并重构多语言体系

类型: feat, refactor, fix, chore

范围: i18n, routing, pages, components, config, build

说明:

本次更新完成国际化体系升级，从原有自定义字典方案迁移到 next-intl，并将所有页面与组件统一到 JSON 消息源与 App Router 语言路由体系，提升可维护性与路由稳定性。

实现细节:

1. **国际化核心迁移**

   - `src/i18n/request.ts`:
     - 新增 next-intl 请求配置，支持 `requestLocale` 回退与非法语言拦截。
     - 合并加载多份 JSON 消息模块，统一提供给客户端。
   - `src/i18n/routing.ts`:
     - 集中维护 `locales` 与 `defaultLocale`，供路由与中间件复用。
   - `src/middleware.ts`:
     - 采用 next-intl 中间件处理语言前缀与 cookie。

2. **消息资源拆分与结构调整**

   - `messages/*/*.json`:
     - 新增按语言分组的 JSON 文案目录（home、products、contact、pages 等）。
   - `src/i18n/locales/*.ts`、`src/i18n/config.ts`、`src/i18n/utils.ts`:
     - 移除旧的 TypeScript 字典与工具函数。

3. **页面与组件全面对接 next-intl**

   - `src/app/[locale]/**`:
     - 页面改用 `getTranslations`/`NextIntlClientProvider`，元数据与内容统一读取 JSON 文案。
     - 在布局中加入 `setRequestLocale(locale)`，稳定静态渲染。
   - `src/components/**`:
     - Header/Footer/Hero/Features/Contact 等组件改用 `useTranslations` 与 `useLocale`。
     - 语言切换与路由拼接统一按 locale 前缀生成。

4. **构建配置与依赖更新**
   - `next.config.mjs`:
     - 使用 next-intl 插件加载请求配置并替换原 `next.config.js`。
   - `package.json`、`package-lock.json`:
     - 新增 `next-intl` 依赖并更新锁文件。
   - `tsconfig.json`:
     - JSX 配置调整以兼容 App Router 输出。

文件变更:

新增文件:

- [`src/i18n/request.ts`](src/i18n/request.ts:1) (next-intl 请求配置)
- [`src/i18n/routing.ts`](src/i18n/routing.ts:1) (统一 locale 配置)
- [`messages/zh/*.json`](messages/zh/common.json:1) (中文消息模块)
- [`messages/en/*.json`](messages/en/common.json:1) (英文消息模块)
- [`messages/ja/*.json`](messages/ja/common.json:1) (日文消息模块)
- [`next.config.mjs`](next.config.mjs:1) (next-intl 插件配置)

删除文件:

- [`src/i18n/config.ts`](src/i18n/config.ts:1) (旧字典配置)
- [`src/i18n/utils.ts`](src/i18n/utils.ts:1) (旧工具函数)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts:1) (旧中文字典)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts:1) (旧英文字典)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts:1) (旧日文字典)
- [`next.config.js`](next.config.js:1) (旧 CJS 配置)

修改文件:

- [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx:1) (注入 NextIntlClientProvider 与 setRequestLocale)
- [`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx:1) (首页内容改用翻译读取)
- [`src/app/[locale]/products/[slug]/page.tsx`](src/app/[locale]/products/[slug]/page.tsx:1) (详情页翻译与静态参数改造)
- [`src/components/Header/index.tsx`](src/components/Header/index.tsx:1) (Header 改为 useTranslations)
- [`src/components/Footer/index.tsx`](src/components/Footer/index.tsx:1) (Footer 改为 useTranslations)

改进效果:

- **国际化维护更清晰**: 文案按模块拆分为 JSON，便于协作与扩展。
- **路由与语言一致性提升**: 统一 locales 配置，减少多处重复配置。
- **页面渲染更稳定**: 避免因 locale 解析不完整而导致 404。

影响范围:

- 影响所有多语言页面、路由与组件文案获取逻辑。

---

V1.19.2 chore(config): 优化 Next.js 生产环境构建配置

类型: chore

范围: config, build

说明:

本次更新旨在优化 Next.js 项目的生产环境构建配置，以增强应用的安全性和构建性能。通过禁用生产环境的 source map 和显式启用 SWC 压缩，确保项目在部署时更加安全和高效。

实现细节:

1. **禁用生产环境 Source Map**

   - `next.config.js`:
     - 新增 `productionBrowserSourceMaps: false` 配置。
     - 此举可以防止在生产环境中泄露客户端源代码，提升应用的安全性。

2. **启用 SWC 压缩**
   - `next.config.js`:
     - 新增 `swcMinify: true` 配置。
     - 虽然这是 Next.js 的默认行为，但显式声明可以确保项目始终使用基于 Rust 的 SWC 编译器进行代码压缩，以获得更快的构建速度。

文件变更:

修改文件:

- [`next.config.js`](next.config.js:1) (添加生产环境构建优化配置)

改进效果:

- **安全性增强**: 禁用了生产环境的 source map，有效防止了源码泄露风险。
- **构建性能确认**: 显式启用了 SWC 压缩，确保了高效的构建过程。

影响范围:

- 本次变更将影响项目的生产环境构建流程，不会对开发环境或应用运行时功能产生直接影响。

---

V1.19.1 ui(floating-contact): 优化悬浮联系组件位置布局

类型: ui

范围: floating-contact, components

说明:

本次更新对悬浮联系组件的位置进行了微调，以改善在不同屏幕尺寸下的视觉表现和用户体验。通过精确调整桌面版侧边栏和移动版悬浮按钮的定位，使组件能够更好地适应页面布局。

实现细节:

1. **桌面版侧边栏位置优化**

   - `src/components/Common/FloatingContact.tsx:163`:
     - 将桌面版右侧面板的定位从 `bottom-1/4` (25%位置) 调整至 `bottom-[15%]` (15%位置)
     - 使侧边栏在视觉上更加突出，同时避免与页面底部内容产生视觉冲突

2. **移动版悬浮按钮位置调整**
   - `src/components/Common/FloatingContact.tsx:314`:
     - 将滚动状态下的按钮位置从 `bottom-24` 优化为 `bottom-20`
     - 将默认状态下的按钮位置从 `bottom-6` 优化为 `bottom-4`
     - 提供了更舒适的触控体验和更好的视觉平衡

文件变更:

修改文件:

- [`src/components/Common/FloatingContact.tsx`](src/components/Common/FloatingContact.tsx:163) (调整桌面版和移动版悬浮组件的位置定位)

改进效果:

- **视觉体验提升**: 优化后的位置使悬浮组件在不同屏幕尺寸下都能保持良好的视觉效果
- **用户体验改善**: 移动端按钮位置的微调提供了更舒适的交互体验
- **布局协调性增强**: 组件位置与页面整体布局更加协调统一

影响范围:

- 网站所有页面的悬浮联系组件将展示优化后的位置布局

---

V1.19.0 feat(privacy): 新增 Cookie 同意管理横幅，优化默认设置

类型: feat, ui, chore

范围: privacy, components, i18n, theme

说明:

本次更新引入了一个核心功能：一个符合隐私法规（如 GDPR）的 Cookie 同意管理横幅。此外，还对网站的初始默认设置进行了调整，将默认主题更改为“亮色”，默认语言更改为“中文”，以更好地服务于主要用户群体。

实现细节:

1.  **Cookie 同意管理功能**

    - `src/lib/cookieConsent.ts`: 新增了处理 Cookie 同意逻辑的核心模块。它提供了获取、设置和重置用户同意状态的功能，并将用户的选择存储在 Cookie 和 localStorage 中。
    - `src/components/Common/CookieConsent.tsx`: 创建了一个新的 React 组件，用于展示 Cookie 同意横幅。该组件具有响应式设计，并包含优雅的滑入/滑出动画效果。
    - `src/app/[locale]/layout.tsx`: 将 `CookieConsent` 组件集成到全局布局中，确保所有访问者都能看到。
    - `src/i18n/locales/(en|ja|zh).ts`: 为 Cookie 横幅的所有文本内容添加了对应的国际化翻译。

2.  **UI 与动画增强**

    - `src/styles/index.css`: 新增了 `@keyframes slideUp` 和 `slideDownOut` 动画规则，用于控制横幅的出现和消失，提升了用户交互的流畅度。

3.  **默认设置优化**
    - `src/app/providers.tsx`: 将 `ThemeProvider` 的 `defaultTheme` 从 `dark` 修改为 `light`，使网站首次加载时以亮色主题呈现。
    - `src/i18n/config.ts`: 将 `DEFAULT_LOCALE` 从 `en` 修改为 `zh`，使中文成为网站的默认语言。

文件变更:

新增文件:

- [`src/components/Common/CookieConsent.tsx`](src/components/Common/CookieConsent.tsx:1) (新建 Cookie 同意横幅 UI 组件)
- [`src/lib/cookieConsent.ts`](src/lib/cookieConsent.ts:1) (新增 Cookie 同意状态管理逻辑)

修改文件:

- [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx:1) (在主布局中集成 Cookie 横幅)
- [`src/app/providers.tsx`](src/app/providers.tsx:1) (将默认主题修改为亮色)
- [`src/i18n/config.ts`](src/i18n/config.ts:1) (将默认语言修改为中文)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts:1) (添加 Cookie 横幅的英文文案)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts:1) (添加 Cookie 横幅的日文文案)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts:1) (添加 Cookie 横幅的中文文案)
- [`src/styles/index.css`](src/styles/index.css:1) (为 Cookie 横幅添加滑入/滑出动画)

改进效果:

- **隐私合规性**: 引入了明确的用户同意机制，增强了网站的隐私保护和数据合规性。
- **用户体验优化**: 调整了默认主题和语言，更符合目标用户的偏好，减少了用户初次访问时的操作成本。
- **交互更友好**: 流畅的动画效果使 Cookie 横幅的出现和消失过程更加自然，不会对用户浏览造成干扰。

影响范围:

- 首次访问网站的用户将看到一个 Cookie 同意管理横幅。
- 网站的默认外观将是亮色主题，默认语言将是中文。

---

V1.18.3 ui(header): 优化头部组件交互动画与语言顺序

类型: ui

范围: header, components, i18n

说明:

本次更新专注于提升网站头部（Header）区域的用户交互体验。我们为“主题切换器”和“语言选择器”添加了平滑的过渡动画，并调整了语言选项的默认顺序，以优化界面的动态反馈和用户友好性。

实现细节:

1.  **主题切换器动画增强**

    - `src/components/Header/ThemeToggler.tsx`:
      - **交互动画**: 当用户点击切换“亮色/暗色”主题时，图标会以一个优雅的“旋转淡入”动画（`iconSpinIn`）进行替换，提供了即时且生动的视觉反馈。
      - **悬停效果**: 为按钮添加了 `hover` 状态下的背景色变化，增强了可交互性。
    - `src/styles/index.css`:
      - **新增动画**: 添加了 `@keyframes iconSpinIn` 规则，定义了图标切换时的动画效果。

2.  **语言选择器动画优化**

    - `src/components/Header/LocaleSwitcher.tsx`:
      - **背景遮罩动画**: 下拉菜单展开时的背景遮罩层现在会以“淡入”（`fadeIn`）效果出现。
      - **下拉菜单动画**: 下拉菜单本身则以“向下滑入”（`slideDown`）的动画效果展开，使整个过程更加流畅自然。
    - `src/styles/index.css`:
      - **新增动画**: 添加了 `@keyframes fadeIn` 和 `@keyframes slideDown` 规则，以支持上述动画效果。

3.  **语言顺序调整**
    - `src/i18n/locales/(en|ja|zh).ts`:
      - **顺序优化**: 将“语言选择器”下拉菜单中的语言顺序调整为“中文”、“English”、“日本語”，将中文置于首位，更符合主要用户群体的习惯。

文件变更:

修改文件:

- [`src/components/Header/ThemeToggler.tsx`](src/components/Header/ThemeToggler.tsx:1) (为主题切换图标添加动画和悬停效果)
- [`src/components/Header/LocaleSwitcher.tsx`](src/components/Header/LocaleSwitcher.tsx:1) (为语言选择器下拉菜单添加动画)
- [`src/styles/index.css`](src/styles/index.css:1) (新增 `fadeIn`, `slideDown`, `iconSpinIn` 的 `@keyframes` 动画)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts:1) (调整语言显示顺序)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts:1) (调整语言显示顺序)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts:1) (调整语言显示顺序)

改进效果:

- **交互体验更佳**: 流畅的动画效果让用户在与页面元素交互时感觉更加愉悦和自然。
- **视觉反馈更清晰**: 图标的动态变化为用户的操作提供了明确的视觉确认。
- **用户友好性提升**: 调整后的语言顺序更贴近目标用户的访问习惯。

影响范围:

- 网站全局头部的“主题切换”按钮和“语言选择”下拉菜单将展示新的动画效果和语言排序。

---

V1.18.2 ui(hero): 优化首页轮播图视觉表现与布局

类型: ui, fix

范围: hero, components

说明:

本次更新主要针对首页的轮播图（Hero）组件进行了两项关键的视觉优化：确保视频内容能够铺满整个容器，并移除了该模块与下方“产品平台”模块之间的多余空白。这些调整旨在提升页面的视觉连贯性和沉浸式体验。

实现细节:

1.  **轮播视频铺满容器**

    - `src/components/Hero/index.tsx`:
      - **样式调整**: 将轮播图内视频元素的 `object-fit` 样式从 `object-contain` 更改为 `object-cover`。此举确保了视频内容能够像图片一样完全覆盖其容器，消除了在某些宽高比下可能出现的黑边。

2.  **移除模块间白边**
    - `src/components/Hero/index.tsx`:
      - **布局修复**: 移除了 `Hero` 组件根 `section` 元素的底部内边距（`pb-8`, `sm:pb-12`, `lg:pb-16`）。这消除了轮播图与其下方“产品平台”模块之间的白色间隙，使页面过渡更加平滑、无缝。

文件变更:

修改文件:

- [`src/components/Hero/index.tsx`](src/components/Hero/index.tsx:1) (调整视频填充模式并移除组件底部边距)
- [`next-env.d.ts`](next-env.d.ts:1) (Next.js 类型声明更新)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts:1) (国际化文案更新)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts:1) (国际化文案更新)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts:1) (国际化文案更新)

改进效果:

- **视觉沉浸感提升**: 视频内容现在能够全屏展示，为用户提供了更具吸引力的视觉体验。
- **页面布局更连贯**: 消除了不必要的模块间距，使得首页从上到下的滚动浏览体验更加流畅自然。

影响范围:

- 网站首页的轮播图模块将以优化的样式展示，特别是包含视频的轮播项和模块底部的布局。

---

V1.18.1 ui(about): 优化“关于我们”页面核心亮点为勾选列表样式

类型: ui, refactor

范围: about, components

说明:

本次更新对“关于我们”页面的核心亮点部分进行了视觉优化。原有的标签式（tag-based）布局被重构为更清晰、更具吸引力的勾选列表（check-marked list）样式，从而提升了内容的可读性和专业感。

实现细节:

1.  **UI组件重构**
    - `src/components/About/AboutSectionOne.tsx`:
      - **布局变更**: 将原先的 `flex flex-wrap` 布局调整为 `grid sm:grid-cols-2`，使列表在不同屏幕尺寸下都能保持对齐和结构化。
      - **样式增强**: 为每个亮点项添加了一个勾选（`✓`）SVG图标，并调整了文本样式，使其更加突出和易于阅读。

文件变更:

修改文件:

- [`src/components/About/AboutSectionOne.tsx`](src/components/About/AboutSectionOne.tsx:1) (重构核心亮点区块的UI布局与样式)

改进效果:

- **可读性增强**: 勾选列表的形式让每个亮点都一目了然，用户可以更快地抓住核心信息。
- **视觉效果提升**: 新的布局和图标设计使页面看起来更加现代化和精致，提升了整体的用户体验。

影响范围:

- 网站的“关于我们”页面的“核心亮点”展示部分将采用新的勾选列表样式。

---

V1.18.0 feat(developers): 新增“开源项目”页面，集中展示硬件与软件成果

类型: feat, ui, docs

范围: open-source, i18n, components

说明:

本次更新在“开发者”板块下新增了一个“开源项目”页面。该页面旨在集中展示公司在硬件（PCB）和软件（代码）领域的开源贡献，为开发者、学生和技术爱好者提供丰富的学习资源和参考案例，从而增强技术社区互动与品牌影响力。

实现细节:

1.  **新增开源项目内容**

    - `src/i18n/locales/*.ts`: 在中、英、日三种语言的国际化文件中，为 `openSource` 页面新增了完整的内容结构。
      - **内容扩充**: 添加了页面的标题、描述，并将开源项目划分为“硬件开源 (PCB)”和“软件开源 (代码)”两大类别。
      - **项目详情**: 为每个类别填充了多个具体的开源项目，包含项目名称、详细描述、技术标签和外部链接。

2.  **创建开源项目UI组件**

    - `src/app/OpenSource/OpenSourceContent.tsx`: 新建了一个独立的React组件，用于动态渲染“开源项目”页面的所有内容。该组件通过卡片式布局清晰地展示了各个项目，并优化了交互体验。

3.  **集成新页面**

    - `src/app/[locale]/developers/open-source/page.tsx`: 创建了新的页面路由，并在其中引入并渲染了新建的 `OpenSourceContent` 组件，使新页面得以展示。

4.  **项目配置优化**
    - `tsconfig.json`: 将 `jsx` 编译选项从 `"preserve"` 更新为 `"react-jsx"`，以适配较新版本的React JSX转换机制。
    - `next-env.d.ts`: 将Next.js类型声明的引用方式从 `/// <reference path=... />` 更新为 `import` 语句，以改善模块解析。

文件变更:

新增文件:

- [`src/app/OpenSource/OpenSourceContent.tsx`](src/app/OpenSource/OpenSourceContent.tsx:1) (新建“开源项目”UI组件)

修改文件:

- [`src/app/[locale]/developers/open-source/page.tsx`](src/app/[locale]/developers/open-source/page.tsx:1) (集成并渲染新组件)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts:1) (Added content for the new open source page)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts:1) (Added content for the new open source page)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts:1) (为新的“开源项目”页面添加文案)
- [`next-env.d.ts`](next-env.d.ts:1) (更新类型引用方式)
- [`tsconfig.json`](tsconfig.json:1) (更新JSX编译选项)

改进效果:

- **资源集中化**: 为社区提供了一个统一的入口，方便查找和使用公司的开源软硬件资源。
- **提升品牌价值**: 通过展示技术成果，增强了公司在开发者社区中的专业形象和影响力。
- **代码结构优化**: 新建的 `OpenSourceContent` 组件实现了内容与视图的分离，提高了代码的可维护性。

影响范围:

- 网站“开发者”导航菜单下将出现一个新的“开源项目”页面。
- 访问该页面的用户将能浏览和访问公司提供的所有开源项目资源。

---

V1.17.0 feat(solutions): 新增“定制化解决方案”页面合作模式模块

类型: feat, ui, docs

范围: custom-solutions, i18n, components

说明:

本次更新为“定制化解决方案”页面增加了一个全新的“合作模式”内容模块。该模块旨在清晰地向潜在客户与合作伙伴展示我们提供的核心合作方式，从而提升信息透明度并优化用户引导。为此，我们创建了一个新的UI组件，并补充了相应的中、英、日三语国际化文案。

实现细节:

1.  **新增合作模式内容**

    - `src/i18n/locales/*.ts`: 在中、英、日三种语言的国际化文件中，为 `customSolutions` 页面新增了 `cooperationModes` 字段。
      - **内容扩充**: 填充了该模块的标题、描述，并详细定义了“ODM (原始设计制造)”和“JDM (联合设计制造)”两种合作模式，每种模式均包含标题、副标题和详细说明。

2.  **创建可复用UI组件**

    - `src/app/CustomSolutions/CooperationModes.tsx`: 新建了一个独立的React组件，用于动态渲染“合作模式”模块。该组件从国际化文件中获取数据，并将其展示为结构清晰的卡片式布局。

3.  **集成新模块到页面**
    - `src/app/[locale]/custom-solutions/page.tsx`: 在“定制化解决方案”页面中引入并渲染了新建的 `CooperationModes` 组件，使新内容模块得以展示。

文件变更:

新增文件:

- [`src/app/CustomSolutions/CooperationModes.tsx`](src/app/CustomSolutions/CooperationModes.tsx:1) (新建“合作模式”UI组件)

修改文件:

- [`src/app/[locale]/custom-solutions/page.tsx`](src/app/[locale]/custom-solutions/page.tsx:1) (集成并渲染新的内容模块)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts:1) (Added content for the new cooperation modes section)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts:1) (Added content for the new cooperation modes section)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts:1) (为新的“合作模式”内容节添加文案)

改进效果:

- **信息透明度提升**: “定制化解决方案”页面现在能更清晰地展示与公司合作的多种途径，方便用户快速了解。
- **用户引导性增强**: 明确的合作模式有助于引导潜在客户选择合适的方案，提升了沟通效率。
- **代码结构优化**: 通过创建可复用组件，提升了代码的可维护性和扩展性。

影响范围:

- 网站的“定制化解决方案”页面将展示新增的“合作模式”内容区块。
- 访问该页面的用户将能获取到更清晰、更具引导性的合作信息。

---

V1.16.0 feat(about): 新增“关于我们”页面内容模块，丰富公司介绍

类型: feat, ui, docs

范围: about, i18n, components

说明:

本次更新为“关于我们”页面增加了一个全新的内容区块，旨在更全面地介绍公司背景、核心优势与品牌形象。我们为此创建了新的UI组件，并补充了相应的中、英、日三语国际化文案与图片资源，提升了页面的信息承载能力和视觉表现力。

实现细节:

1.  **新增“关于我们”第一节内容**

    - `src/i18n/locales/*.ts`: 在中、英、日三种语言的国际化文件中，为 `about` 页面新增了 `sectionOne` 字段。
      - **内容扩充**: 填充了关于公司定位、业务重点的详细描述，并提炼了“具身智能机器人”、“产学研一体化”等六大核心亮点 (`highlights`)。
      - **品牌形象**: 引入了新的公司吉祥物图片资源，增强了品牌辨识度。
    - `src/app/about/AboutContent.tsx`: 更新了页面结构，将新内容节 `sectionOne` 动态渲染到页面中。

2.  **创建可复用组件**

    - `src/components/About/AboutSectionOne.tsx`: 新建了一个独立的React组件，用于展示图文结合的内容区块。该组件负责渲染标题、描述、亮点标签和配图，具有良好的可复用性。

3.  **更新页面引言**
    - `src/i18n/locales/*.ts`: 更新了“关于我们”页面的引言描述 (`pageIntro.about.description`)，使其更贴合品牌愿景——“让每个人都能快乐地链接未来智能！”。

文件变更:

新增文件:

- [`public/images/about/company-mascot.png`](public/images/about/company-mascot.png) (新增公司吉祥物图片)
- [`src/components/About/AboutSectionOne.tsx`](src/components/About/AboutSectionOne.tsx) (新建“关于”页面第一节内容的UI组件)

修改文件:

- [`src/app/about/AboutContent.tsx`](src/app/about/AboutContent.tsx) (集成并渲染新的内容节)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts) (Added content for the new about section and updated page description)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts) (Added content for the new about section and updated page description)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (为新的“关于”内容节添加文案并更新页面描述)

改进效果:

- **信息更丰富**: “关于我们”页面现在能更全面地展示公司的核心价值与业务特色。
- **品牌形象更突出**: 新增的吉祥物图片和优化的文案有助于塑造更鲜明的品牌形象。
- **代码结构优化**: 通过创建可复用组件，提升了代码的可维护性和扩展性。

影响范围:

- 网站的“关于我们”页面将展示新增的图文内容区块。
- 访问该页面的用户将能获取到更详尽、更具吸引力的公司信息。

---

V1.15.0 refactor(products): 重构RAI-P4产品案例展示结构，提升内容清晰度

类型: refactor, docs

范围: products, i18n

说明:

本次更新对“具身智能任务规划实训平台 RAI-P4”的产品详情数据结构进行了重构。我们优化了“样机案例” (sampleCases) 部分的组织方式，从原有的两个独立列表升级为更具描述性的 `sections` 结构。这一改进使得案例内容可以被划分为逻辑更清晰、带有独立标题和描述的区块，显著提升了信息的可读性和结构化程度。

实现细节:

1.  **数据结构重构**
    - `src/i18n/locales/*.ts`: 在中、英、日三种语言的国际化文件中，将 `rai-p4` 产品下的 `sampleCases` 字段重构。
      - **引入 `sections` 结构**: 新结构允许将案例划分为多个带 `title` 和 `description` 的独立部分，如“任务规划流程示意”和“视觉搬运与运动学综合实训”。
      - **内容优化**: 更新了各个语言版本中的描述性文本，使其更准确地反映每个案例的核心内容，增强了专业性和清晰度。

文件变更:

修改文件:

- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts) (Refactored sample cases data structure and updated descriptions)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts) (Refactored sample cases data structure and updated descriptions)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (重构样机案例数据结构并更新描述文案)

改进效果:

- **内容结构更清晰**: RAI-P4 产品的案例介绍从扁平列表升级为分区块的结构化内容，逻辑更清晰，用户更容易理解。
- **可读性与专业性提升**: 优化后的标题和描述文本使案例内容更专业、更易于理解，提升了产品信息的价值。

影响范围:

- 网站 “RAI-P4” 产品详情页的“样机案例”部分将采用新的布局和内容展示。
- 访问该页面的用户将能获取到结构更清晰、描述更详尽的案例信息。

---

V1.14.0 feat(products): 新增五款具身智能产品详情，丰富产品矩阵

类型: feat, docs, ui

范围: products, i18n, public, components

说明:

本次更新大规模扩充了网站的产品内容，为五款全新的具身智能产品创建了全面、高度结构化的产品详情页。我们为 RAI-Q2、RAI-M4、ALO-LE4、RAI-P4 和 UNI-WR2 注入了深度内容，涵盖从产品概述、特性、软硬件配置到结构化实验体系的全方位信息，并为其补充了完整的图片资源。同时，对部分通用UI组件进行了微调，以优化页面布局和渲染逻辑。

实现细节:

1.  **新增五款产品体系**

    - `src/i18n/locales/*.ts`: 在中、英、日三种语言的国际化文件中，为 `rai-q2`, `rai-m4`, `alo-le4`, `rai-p4`, `uni-wr2` 五款产品添加了完整且详尽的数据结构。
      - **内容深度扩充**: 新增了 `overview` (概述), `features` (产品特点), `sampleCases` (样机案例), `sensorConfig` (传感器配置), `controllerConfig` (控制器配置), `softwareConfig` (软件配置) 等字段，并填充了专业内容。
      - **结构化实验体系**: 为每款产品设计了按 `sections` (章节) 组织的结构化实验大纲，内容详实，逻辑清晰，显著提升了产品的教学价值。
      - **图文并茂**: `features` 和 `sampleCases` 字段支持内嵌媒体和自定义区块，使产品介绍更直观、更具吸引力。

2.  **新增大量产品图片资源**

    - `public/images/products/`: 为 `alo-le4`, `rai-m4`, `rai-q2` 三款新产品新增了多张高质量图片，包括主图、各角度视图、功能示意图等，并已在产品数据中正确引用。

3.  **产品图片路径更新与规范化**

    - `public/images/products/ubot-mr20/`: 将 `ubot-mr20` 的主图重命名为 `ubot-mr20-hero.jpg` 并移入专属文件夹，统一了资源管理规范。
    - `src/i18n/locales/*.ts`: 全面更新了各产品数据中的图片路径，将原有的占位符替换为实际的产品图片，确保了产品展示的准确性。

4.  **UI 组件微调**
    - `src/components/Common/Breadcrumb.tsx`: 为面包屑导航增加了底部间距，优化了页面顶部布局的呼吸感。
    - `src/components/Common/PageIntro.tsx`: 调整了页面引言组件的渲染逻辑，当没有子内容时不再渲染空白区域，提升了页面的健壮性。

文件变更:

新增文件:

- [`public/images/products/alo-le4/front-view.png`](public/images/products/alo-le4/front-view.png)
- [`public/images/products/alo-le4/module-overview.png`](public/images/products/alo-le4/module-overview.png)
- [`public/images/products/alo-le4/top-view.png`](public/images/products/alo-le4/top-view.png)
- [`public/images/products/rai-m4/front-view.png`](public/images/products/rai-m4/front-view.png)
- [`public/images/products/rai-m4/left-view.png`](public/images/products/rai-m4/left-view.png)
- [`public/images/products/rai-m4/module-overview.png`](public/images/products/rai-m4/module-overview.png)
- [`public/images/products/rai-m4/right-view.png`](public/images/products/rai-m4/right-view.png)
- [`public/images/products/rai-m4/top-view.png`](public/images/products/rai-m4/top-view.png)
- [`public/images/products/rai-q2/feature-overview.png`](public/images/products/rai-q2/feature-overview.png)
- [`public/images/products/rai-q2/front-view.png`](public/images/products/rai-q2/front-view.png)
- [`public/images/products/rai-q2/hero.png`](public/images/products/rai-q2/hero.png)
- [`public/images/products/rai-q2/side-view.png`](public/images/products/rai-q2/side-view.png)
- [`public/images/products/rai-q2/top-view.png`](public/images/products/rai-q2/top-view.png)

重命名文件:

- `public/images/products/ubot-mr20-main.jpg` -> [`public/images/products/ubot-mr20/ubot-mr20-hero.jpg`](public/images/products/ubot-mr20/ubot-mr20-hero.jpg)

修改文件:

- [`src/components/Common/Breadcrumb.tsx`](src/components/Common/Breadcrumb.tsx) (UI样式微调)
- [`src/components/Common/PageIntro.tsx`](src/components/Common/PageIntro.tsx) (优化渲染逻辑)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts) (新增五款产品数据并更新图片路径)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts) (新增五款产品数据并更新图片路径)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (新增五款产品数据并更新图片路径)

改进效果:

- **产品矩阵极大丰富**: 网站新增了五款核心产品，形成了覆盖从视觉感知、任务规划到操作执行的完整具身智能产品矩阵。
- **信息深度与专业性提升**: 每款产品都具备了详尽专业的内容，为目标用户（高校师生、研究人员）提供了极高的参考价值。
- **用户体验优化**: 统一的资源管理和优化的UI组件，提升了网站的整体质量和浏览体验。

影响范围:

- 网站新增五个产品的深度详情页，用户现在可以浏览和了解这些新产品。
- 现有产品列表和相关页面的产品图片已更新，展示更准确。

---

V1.13.0 feat(products): 全面重构UNI-WR2产品详情，构建桌面级ROS工程化教学体系

类型: feat, docs, ui, refactor

范围: products, i18n, public

说明:

本次更新的核心是为“便携式ROS导航机器人学习平台 UNI-WR2”创建了全面、高度结构化的产品详情页内容。我们对其数据体系进行了彻底重构，新增了从产品概述、特性、硬件配置到结构化实验体系的全方位信息，并为其补充了完整的产品图片资源。为支持这些深度内容，我们还对产品详情页的渲染逻辑进行了重构，使其能够展示更丰富、更灵活的数据结构。

实现细节:

1.  **新增 UNI-WR2 产品体系**

    - `src/i18n/locales/zh.ts`: 在国际化文件中，为 `uni-wr2` 添加了完整且详尽的数据结构。
      - **内容深度扩充**: 新增了 `overview` (概述), `applicable` (适用场景), `highlights` (核心亮点), `features` (产品特点), `sensorConfig` (传感器配置), `controllerConfig` (控制器配置), `softwareConfig` (软件配置) 等字段，并填充了专业内容。
      - **结构化实验体系**: 全面设计了 `experiments` 字段，将其组织为按 `sections` (章节) 划分的结构化大纲，涵盖了从“ROS 基础”到“移动机器人运动学控制”的3大主题，共计8个具体实验项目。
      - **自定义内容区块**: 在 `sampleCases` 中引入了 `sections` 结构，用于自定义展示外观、尺寸、BOM 等内容，取代了原有的固定分类。
      - **图文并茂的特性**: `features` 字段现在支持内嵌 `media` 数组，允许每个产品特性都配有多张图片进行说明。

2.  **产品详情页 UI 渲染重构**

    - `src/app/[locale]/products/[slug]/page.tsx`: 对产品详情页的渲染逻辑进行了重构，以增强其对不同数据结构的适应性。
      - **特性媒体渲染**: 组件现在能够动态渲染每个 `feature` 卡片中包含的图片网格，使特性介绍更直观。
      - **自定义区块渲染**: 页面新增了对 `sampleCases.sections` 的渲染逻辑，使其可以根据数据动态生成标题和图片网格，提高了内容展示的灵活性。
      - **向后兼容**: 渲染逻辑会优先检查并使用新的 `sampleCustomSections`，如果不存在，则回退到旧的 `modules`, `chassis` 等分类，确保了对旧数据的兼容性。
      - **样式优化**: 调整了控制器配置图片的布局和样式，使其在页面上展示效果更佳。

3.  **新增产品图片资源**
    - `public/images/products/uni-wr2/`: 为 UNI-WR2 新增了12张高质量产品图片，包括主图 (`hero`)、各角度外观图、功能示意图、硬件细节图（控制器、BOM）以及软件图标，并已在产品数据中正确引用。

文件变更:

新增文件:

- [`public/images/products/uni-wr2/uni-wr2-bom.png`](public/images/products/uni-wr2/uni-wr2-bom.png)
- [`public/images/products/uni-wr2/uni-wr2-controller.png`](public/images/products/uni-wr2/uni-wr2-controller.png)
- [`public/images/products/uni-wr2/uni-wr2-desktop-layout.png`](public/images/products/uni-wr2/uni-wr2-desktop-layout.png)
- [`public/images/products/uni-wr2/uni-wr2-dimensions.png`](public/images/products/uni-wr2/uni-wr2-dimensions.png)
- [`public/images/products/uni-wr2/uni-wr2-exterior-overview.png`](public/images/products/uni-wr2/uni-wr2-exterior-overview.png)
- [`public/images/products/uni-wr2/uni-wr2-feature-charging.png`](public/images/products/uni-wr2/uni-wr2-feature-charging.png)
- [`public/images/products/uni-wr2/uni-wr2-feature-deploy-1.png`](public/images/products/uni-wr2/uni-wr2-feature-deploy-1.png)
- [`public/images/products/uni-wr2/uni-wr2-feature-deploy-2.png`](public/images/products/uni-wr2/uni-wr2-feature-deploy-2.png)
- [`public/images/products/uni-wr2/uni-wr2-feature-portable.png`](public/images/products/uni-wr2/uni-wr2-feature-portable.png)
- [`public/images/products/uni-wr2/uni-wr2-hero.png`](public/images/products/uni-wr2/uni-wr2-hero.png)
- [`public/images/products/uni-wr2/uni-wr2-software-ros.png`](public/images/products/uni-wr2/uni-wr2-software-ros.png)
- [`public/images/products/uni-wr2/uni-wr2-software-ubuntu.png`](public/images/products/uni-wr2/uni-wr2-software-ubuntu.png)

修改文件:

- [`src/app/[locale]/products/[slug]/page.tsx`](src/app/[locale]/products/[slug]/page.tsx) (重构UI渲染以支持更丰富的数据结构)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (全面重构UNI-WR2产品数据)

改进效果:

- **产品信息极大丰富**: UNI-WR2 的产品信息变得极为详尽和专业，其深度内容为目标用户（高校师生、研究人员）提供了极高的参考价值。
- **页面灵活性提升**: 产品详情页模板现在能够适应更多样化的内容结构和布局需求，为未来添加更多不同形态的产品打下了坚实基础。
- **教学价值凸显**: 全新的结构化实验体系清晰地展示了该产品的教学路径和应用场景，显著提升了其在教育市场的吸引力。

影响范围:

- 网站 “UNI-WR2” 产品的详情页内容已全面更新。
- 访问该页面的用户将能获取到关于此产品的全面、深入的信息。

---

V1.12.0 feat(products): 全面重构RAI-P4产品详情，构建具身智能任务规划体系

类型: feat, docs, refactor, ui

范围: products, i18n, components, public

说明:

本次更新的核心是为“具身智能任务规划实训平台 RAI-P4”产品创建了全面、高度结构化的产品详情页内容。我们对其数据体系进行了彻底重构，新增了从产品概述、特性、应用案例到软硬件配置的全方位信息，并为其设计了一套包含超过40个实验项目的全新实验体系。为支持这些深度内容，我们还对产品详情页的渲染逻辑进行了重构，使其更具灵活性和可扩展性。

实现细节:

1.  **新增 RAI-P4 产品体系**

    - `src/i18n/locales/zh.ts`: 在国际化文件中，为 `rai-p4` 添加了完整且详尽的数据结构。
      - **内容深度扩充**: 新增了 `overview` (概述), `features` (产品特点), `sampleCases` (样机案例), `sensorConfig` (传感器配置), `controllerConfig` (控制器配置), `softwareConfig` (软件配置) 等字段，并填充了专业内容。
      - **结构化实验体系**: 全面设计了 `experiments` 字段，将其组织为按 `sections` (章节) 划分的结构化大纲，涵盖了从“机器人本体控制”到“嵌入式开发”的9大主题，共计40余个具体实验项目，逻辑清晰，内容详实。
      - **专业化案例与配置**: 为 `sampleCases` 和 `softwareConfig` 增加了更具体的展示内容和图片，并允许通过数据驱动的方式自定义其样式。

2.  **产品详情页 UI 渲染重构**

    - `src/app/[locale]/products/[slug]/page.tsx`: 对产品详情页的渲染逻辑进行了重构，以增强其对不同数据结构的适应性。
      - **数据驱动样式**: 组件现在可以从产品数据中读取并应用自定义的 CSS 类名（如 `modulesGridClassName`, `softwareImageGridClassName` 等），使得不同产品的布局可以高度定制化，提高了组件的灵活性和可复用性。
      - **健壮性提升**: 代码现在会优雅地处理可选字段（如 `sampleCases`, `softwareConfig`），确保即使某些产品数据不完整，页面也能正常渲染。

3.  **组件功能增强**

    - `src/components/Products/ImageGridWithLightbox.tsx`: 为图片网格组件新增了 `cardClassName` 属性，允许对单个图片卡片容器进行样式定制，以适应不同尺寸和布局的图片展示需求。

4.  **新增产品图片资源**
    - `public/images/products/rai-p4/`: 为 RAI-P4 新增了产品主图 (`hero.png`) 以及多张展示其核心功能的图片（任务规划、工作流、软件套件），并已在产品数据中正确引用。

文件变更:

新增文件:

- [`public/images/products/rai-p4/rai-p4-hero.png`](public/images/products/rai-p4/rai-p4-hero.png)
- [`public/images/products/rai-p4/rai-p4-manipulator-workflows.png`](public/images/products/rai-p4/rai-p4-manipulator-workflows.png)
- [`public/images/products/rai-p4/rai-p4-software-suite.png`](public/images/products/rai-p4/rai-p4-software-suite.png)
- [`public/images/products/rai-p4/rai-p4-task-planning.png`](public/images/products/rai-p4/rai-p4-task-planning.png)

修改文件:

- [`src/app/[locale]/products/[slug]/page.tsx`](src/app/[locale]/products/[slug]/page.tsx) (重构UI渲染以支持数据驱动样式)
- [`src/components/Products/ImageGridWithLightbox.tsx`](src/components/Products/ImageGridWithLightbox.tsx) (增加样式定制属性)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (全面重构RAI-P4产品数据)

改进效果:

- **产品信息极大丰富**: RAI-P4 的产品信息变得极为详尽和专业，其深度内容为目标用户（高校师生、研究人员）提供了极高的参考价值。
- **页面灵活性提升**: 产品详情页模板现在能够适应更多样化的内容结构和布局需求，为未来添加更多不同形态的产品打下了坚实基础。
- **教学价值凸显**: 全新的结构化实验体系清晰地展示了该产品的教学路径和应用场景，显著提升了其在教育市场的吸引力。

影响范围:

- 网站新增 “RAI-P4” 产品的深度详情页。
- 访问该页面的用户将能获取到关于此产品的全面、深入的信息。

---

V1.11.0 feat(products): 新增GX-MAT-09S产品详情，重构实验体系与UI

类型: feat, docs, ui, refactor

范围: products, i18n, components, public

说明:

本次更新的核心是为产品线新增了一款旗舰级产品——“具身机器人创新设计平台（增强版）GX-MAT-09S”。我们为其创建了全面、高度结构化的产品详情页内容，涵盖了从产品概述、特性、样机案例到传感器、控制器、软件配置的全方位信息。特别地，我们为其设计了一套包含超过70个实验项目的全新实验体系，并对产品详情页的UI渲染逻辑进行了重构，以更好地展示这些深度内容。

实现细节:

1.  **新增 GX-MAT-09S 产品体系**

    - `src/i18n/locales/*.ts`: 在三种语言（中、英、日）的国际化文件中，为 `gx-mat-09s` 添加了完整且详尽的数据结构。
      - **内容深度扩充**: 新增了 `overview` (概述), `features` (产品特点), `sampleCases` (样机案例), `sensorConfig` (传感器配置), `controllerConfig` (控制器配置), `softwareConfig` (软件配置) 等字段，并填充了专业内容。
      - **结构化实验体系**: 全面重构了 `experiments` 字段，将其设计为按 `sections` (章节) 组织的结构化大纲，涵盖了从“单片机”到“移动导航”的9大主题，共计78个具体实验项目，逻辑清晰，内容详实。
      - **样机案例分组**: 在 `sampleCases` 中引入了 `compositeGroups` 字段，用于分类展示基于不同底盘的复合机器人组合，使信息结构更有条理。

2.  **产品详情页 UI 渲染升级**

    - `src/app/[locale]/products/[slug]/page.tsx`: 对产品详情页的渲染逻辑进行了多项重构，以适配新的数据结构。
      - **动态计数**: 样机案例部分的标题（如“机器人模块”、“机器人底盘”）现在会动态计算并显示其包含的种类数量。
      - **实验体系渲染**: 页面现在能够渲染新的、按章节划分的实验体系，将每个实验章节以独立的卡片形式展示，提升了可读性。
      - **分组列表展示**: 新增了对 `compositeGroups` 的渲染逻辑，以分组形式清晰地展示各类复合机器人。

3.  **新增产品图片资源**

    - `public/images/products/gx-mat-09s/`: 为 GX-MAT-09S 新增了产品主图 (`hero.png`) 以及多张控制器图片（Arduino, RDK X5, STM32），并已在 `controllerConfig` 中正确引用。

4.  **组件样式微调**
    - `src/components/Products/ImageGridWithLightbox.tsx`: 为图片网格中的图片添加了 `rounded-lg` 样式，使其视觉效果与网站整体风格更统一。

文件变更:

新增文件:

- [`public/images/products/gx-mat-09s/hero.png`](public/images/products/gx-mat-09s/hero.png)
- [`public/images/products/gx-mat-09s/controller/arduino-mega2560.png`](public/images/products/gx-mat-09s/controller/arduino-mega2560.png)
- [`public/images/products/gx-mat-09s/controller/rdk-x5.png`](public/images/products/gx-mat-09s/controller/rdk-x5.png)
- [`public/images/products/gx-mat-09s/controller/stm32f407.jpg`](public/images/products/gx-mat-09s/controller/stm32f407.jpg)

修改文件:

- [`src/app/[locale]/products/[slug]/page.tsx`](src/app/[locale]/products/[slug]/page.tsx) (重构UI渲染以适配新数据)
- [`src/components/Products/ImageGridWithLightbox.tsx`](src/components/Products/ImageGridWithLightbox.tsx) (样式微调)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts) (新增GX-MAT-09S产品数据)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts) (新增GX-MAT-09S产品数据)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (新增GX-MAT-09S产品数据)

改进效果:

- **产品信息极大丰富**: GX-MAT-09S 成为网站上内容最详尽的产品，其专业性和深度为目标用户（高校师生、研究人员）提供了极高的参考价值。
- **内容结构优化**: 新的实验体系和分组展示方式，使得复杂的产品信息更易于理解和消化。
- **用户体验提升**: 动态计数和更具结构感的UI布局，提升了产品详情页的整体浏览体验。

影响范围:

- 网站新增 “GX-MAT-09S” 产品详情页。
- 访问该页面的用户将能获取到关于此产品的全面、深入的信息。

---

V1.10.0 feat(products): 引入图片灯箱并全面更新产品体系

类型: feat, ui, docs, refactor

范围: products, i18n, components, public

说明:

本次更新专注于提升产品页面的用户体验和信息深度。我们为产品详情页引入了带灯箱（Lightbox）功能的图片网格组件，使用户可以点击查看高清大图。同时，对全线产品的数据进行了系统性的重构和扩充，统一了产品型号命名，并为每款核心产品补充了详细的配置、实验案例和技术规格，使产品信息更加专业、完整。

实现细节:

1.  **新增图片灯箱组件 (Image Lightbox)**

    - `src/components/Products/ImageGridWithLightbox.tsx`: 创建了一个全新的、可复用的图片网格组件，该组件集成了灯箱功能，允许用户点击图片后进行放大预览。
    - `src/app/[locale]/products/[slug]/page.tsx`: 在 Ubot MR20 产品详情页中，使用 `ImageGridWithLightbox` 组件重构了“机器人模块”、“机器人底盘”和“复合机器人”部分的图片展示逻辑，替代了原有的静态图片列表，提升了交互体验和代码的可维护性。

2.  **产品数据体系全面升级**

    - `src/i18n/locales/*.ts`: 对三种语言（中、英、日）的国际化文件进行了大规模内容更新。
      - **产品型号标准化**: 统一并简化了产品型号，例如 `gx-mat-09s23` 更新为 `gx-mat-09s`，`rai-p433` 更新为 `rai-p4` 等，使其更清晰易记。
      - **内容结构化扩充**: 为 `gx-mat-09s`, `rai-p4`, `rai-m4`, `rai-q2`, `uni-wr2`, `alo-le4` 等核心产品系统性地补充了 `configuration` (配置清单), `experiments` (实验项目), `specs` (技术参数) 等详细字段。
      - **FAQ 更新**: 根据新的产品体系和定位，全面修订了“常见问题解答”部分的内容，使其信息更准确、更具指导性。

3.  **新增产品详情图片**

    - `public/images/products/ubot-mr20/`: 为 Ubot MR20 产品新增了控制器 (`controller`) 和软件界面 (`software`) 的高清图片。
    - `src/i18n/locales/*.ts`: 将新增的图片资源整合进 `ubot-mr20` 的 `controllerConfig` 和 `softwareConfig` 数据中，实现了图文并茂的展示效果。

4.  **项目配置调整**
    - `tsconfig.json`: 将 `jsx` 编译选项从 `"react-jsx"` 修改为 `"preserve"`，以适应项目构建需求。
    - `next-env.d.ts`: 更新了 Next.js 的类型定义引用路径。

文件变更:

新增文件:

- [`public/images/products/ubot-mr20/controller/controller-overview.png`](public/images/products/ubot-mr20/controller/controller-overview.png)
- [`public/images/products/ubot-mr20/software/openblock-interface-1.jpg`](public/images/products/ubot-mr20/software/openblock-interface-1.jpg)
- [`public/images/products/ubot-mr20/software/openblock-interface-2.jpg`](public/images/products/ubot-mr20/software/openblock-interface-2.jpg)
- [`src/components/Products/ImageGridWithLightbox.tsx`](src/components/Products/ImageGridWithLightbox.tsx)

修改文件:

- [`src/app/[locale]/products/[slug]/page.tsx`](src/app/[locale]/products/[slug]/page.tsx) (重构图片展示逻辑)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts) (全面更新产品数据体系)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts) (全面更新产品数据体系)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (全面更新产品数据体系)
- [`tsconfig.json`](tsconfig.json) (更新编译选项)
- [`next-env.d.ts`](next-env.d.ts) (更新类型引用)

改进效果:

- **用户体验提升**: 新的灯箱组件让用户可以更清晰地查看产品细节图，交互更友好。
- **信息专业化**: 结构化的产品数据和详尽的技术规格，极大地提升了产品信息的专业性和透明度，有助于用户进行精准选型。
- **内容一致性**: 标准化的产品命名和同步更新的 FAQ，确保了网站信息的一致性和准确性。

影响范围:

- “Ubot MR20” 产品详情页的图片展示方式已更新。
- 网站所有产品的数据信息、型号和介绍内容均已全面刷新。

---

V1.9.0 feat(products): 丰富Ubot MR20产品详情页，增加模块化案例与实验体系

类型: feat, ui, docs

范围: products, i18n, public

说明:

本次更新极大地丰富了“Ubot MR20 具身智能机器人创新设计套件”的产品详情页。我们为其增加了全面的内容，包括详细的产品特点、模块化的样机案例、完整的传感器与控制器配置、以及一套从入门到进阶的结构化实验体系。同时，新增了数十张高清产品图片，为用户提供了更直观、更深入的产品了解体验。

实现细节:

1.  **产品内容体系化扩充**

    - `src/i18n/locales/*.ts`: 针对 `ubot-mr20` 产品，在三种语言（中、英、日）的国际化文件中完全重构了数据结构。新增了 `overview` (概述), `features` (产品特点), `sampleCases` (样机案例), `sensorConfig` (传感器配置), `controllerConfig` (控制器配置), `softwareConfig` (软件配置), `experiments` (实验项目) 和 `specs` (技术参数) 等多个详细字段。
    - `experiments` 字段被设计为一套完整的教学大纲，涵盖了从“实验准备”到“扩展项目”的六个阶段，共包含32个基础实验和20个扩展项目，逻辑清晰，内容详实。

2.  **产品详情页UI重构与渲染**

    - `src/app/[locale]/products/[slug]/page.tsx`: 更新了产品详情页的渲染逻辑，以适配新的、高度结构化的产品数据。页面现在可以动态展示样机案例中的各类图片（如机器人模块、底盘、机械臂、复合机器人），并以清晰的卡片和列表形式呈现实验项目和技术规格。

3.  **新增大量高清产品图片**

    - `public/images/products/`: 新增了 `ubot-mr20` 的主图 (`ubot-mr20-main.jpg`) 以及一个包含超过30张图片的 `ubot-mr20` 专属目录。这些图片详细展示了产品的各个模块、不同底盘和机械臂的组合形态，为页面内容提供了强有力的视觉支持。

4.  **国际化文案与标签更新**
    - 在 `detailLabels` 中添加了新的标签（如“产品特点”、“样机案例”、“机器人模块”等），以支持新版详情页的UI展示。
    - 更新了产品列表页中 `ubot-mr20` 的简介和图片，使其信息与详情页保持一致。

文件变更:

新增文件:

- public/images/products/ubot-mr20-main.jpg
- public/images/products/ubot-mr20/ (整个目录及其下所有图片)

修改文件:

- src/app/[locale]/products/[slug]/page.tsx (适配新数据结构，重构UI渲染)
- src/i18n/locales/en.ts (全面更新ubot-mr20产品数据)
- src/i18n/locales/ja.ts (全面更新ubot-mr20产品数据)
- src/i18n/locales/zh.ts (全面更新ubot-mr20产品数据)

改进效果:

- **信息深度提升**: 产品页面从简单的概述升级为一份详尽的产品白皮书，极大地提升了信息的专业性和完整性。
- **用户体验优化**: 图文并茂的展示方式，特别是模块化案例的可视化呈现，使用户能够快速理解产品的核心价值和多变形态。
- **教学价值凸显**: 完整的实验体系清晰地展示了该产品的教育路径和应用场景，对教育工作者和学习者更具吸引力。

影响范围:

- 网站的 `Ubot MR20` 产品详情页外观和内容被彻底更新。
- 访问该页面的用户将能获取到关于此产品的全面、深入的信息。

---

V1.8.0 refactor(products): 重构产品目录结构并移除博客与认证功能

类型: refactor, remove, ui

范围: products, i18n, components, pages

说明:

本次更新旨在精简网站功能，将核心聚焦于产品展示。为此，我们对产品目录的数据结构进行了重构，并彻底移除了博客（Blog）和用户认证（Sign In/Sign Up）两大模块。这使得网站的导航更清晰，内容结构更合理，同时也降低了后续的维护成本。

实现细节:

1. 产品目录结构重构

   - `src/i18n/locales/*.ts`: 核心数据结构变更。将原有的扁平化产品列表 (`products.catalog.items`) 调整为按系列分组的结构 (`products.catalog.series`)，例如 “M 系列” 和 “P 系列”，使产品分类更加清晰。
   - `src/components/Products/index.tsx`: 更新了产品列表页的渲染逻辑，现在会先遍历产品系列，再展示系列下的具体产品卡片。
   - `src/app/[locale]/products/[slug]/page.tsx`: 修改了动态路由的静态参数生成逻辑 (`generateStaticParams`)，以适配新的嵌套式产品数据结构。
   - 内容更新: 全面更新了所有产品信息，包括型号（如 `ubot-mr205` -> `ubot-mr20`）、名称、描述、FAQ 和规格详情，并将核心产品数量从 8 款调整为 7 款。

2. 博客与认证功能移除
   - 文件删除:
     - 移除了所有与博客相关的页面 (`/blog`, `/blog-details`, `/blog-sidebar`) 和组件 (`src/components/Blog/*`)。
     - 移除了所有与用户认证相关的页面 (`/signin`, `/signup`) 和内容组件 (`src/app/signin/*`, `src/app/signup/*`)。
   - UI 简化:
     - `src/components/Header/index.tsx`: 移除了页眉中的“登录”和“注册”按钮，简化了顶部导航栏。
     - `src/app/[locale]/layout.tsx`: 从布局组件中删除了传递给页眉的 `auth` 属性。
   - 国际化文案清理:
     - 从 `en.ts`, `ja.ts`, `zh.ts` 文件中彻底删除了已不再使用的 `auth`, `blog`, `blogDetailPage` 等国际化文案对象，保持了配置的整洁。

文件变更:

删除文件:

- src/app/[locale]/blog/page.tsx
- src/app/[locale]/blog-details/page.tsx
- src/app/[locale]/blog-sidebar/page.tsx
- src/app/[locale]/signin/page.tsx
- src/app/[locale]/signup/page.tsx
- src/app/blog/BlogContent.tsx
- src/app/blog-details/BlogDetailsContent.tsx
- src/app/blog-sidebar/BlogSidebarContent.tsx
- src/app/signin/SigninContent.tsx
- src/app/signup/SignupContent.tsx
- src/components/Blog/\* (整个目录)

修改文件:

- src/i18n/locales/en.ts (重构产品数据，移除废弃文案)
- src/i18n/locales/ja.ts (重构产品数据，移除废弃文案)
- src/i18n/locales/zh.ts (重构产品数据，移除废弃文案)
- src/components/Products/index.tsx (适配新的产品系列结构)
- src/app/[locale]/products/[slug]/page.tsx (更新静态路由生成逻辑)
- src/components/Header/index.tsx (移除认证链接)
- src/app/[locale]/layout.tsx (移除认证属性传递)
- src/components/Features/index.tsx (更新首页精选方案展示逻辑)
- src/components/Products/ProductCard.tsx (样式微调)

改进效果:

- 聚焦核心业务: 网站内容完全围绕产品展开，为访客提供了更专注、更清晰的浏览体验。
- 提升可维护性: 通过移除非核心功能模块，简化了代码库，降低了复杂度和未来的维护成本。
- 优化信息架构: 产品按系列分类，结构更清晰，有助于用户根据需求快速找到合适的产品。

影响范围:

- 网站不再提供博客内容和用户注册/登录功能。
- 产品列表页的展示方式已更新为按系列分组。
- 网站的整体导航和信息结构更加精简。

---

V1.7.1 refactor(breadcrumb): 移除面包屑导航路径，简化页面标题组件

类型: refactor, ui

范围: components, pages, i18n

说明:

本次更新对面包屑（Breadcrumb）组件进行了重构，移除了传统的“首页 > 当前页面”导航路径，将其简化为一个只包含页面标题和描述的纯粹的页面介绍组件。此举旨在简化页面顶部UI，使用户更专注于当前页面的核心内容。

实现细节:

1. 面包屑组件重构

   - `src/components/Common/Breadcrumb.tsx`: 核心重构文件。
     - 完全移除了用于生成导航路径（如 "首页 / 关于我们"）的 `Link` 和 `ul` 列表结构。
     - 删除了 `homeLabel` 和 `homeHref` 属性，组件现在只负责展示 `pageName` 和 `description`。
     - 调整了布局样式，使其作为页面引言（Page Intro）的标题部分。

2. 封装组件与页面适配

   - `src/components/Common/PageIntro.tsx`: 作为 `Breadcrumb` 的直接封装组件，移除了对应的 `homeLabel` 和 `homeHref` 属性传递。
   - `src/app/[locale]/**/*.tsx`: 所有使用 `PageIntro` 或 `Breadcrumb` 的页面都进行了更新，删除了不再需要的属性。这包括“关于我们”、“联系我们”、“案例研究”下的所有子页面、“开发者服务”下的所有子页面以及“产品”页面等。
   - `src/app/*/AboutContent.tsx`, `ContactContent.tsx`, `BlogContent.tsx`, `ErrorContent.tsx`: 这些内容组件也同步更新，不再接收和传递面包屑相关的属性。

3. 国际化文案清理
   - `src/i18n/locales/*.ts`: 在 `en`, `ja`, `zh` 语言文件中，删除了已不再使用的 `breadcrumbs` 对象，保持了i18n配置的整洁。

文件变更:

修改文件:

- src/components/Common/Breadcrumb.tsx (组件核心重构)
- src/components/Common/PageIntro.tsx (移除废弃属性)
- src/app/about/AboutContent.tsx (适配组件变更)
- src/app/contact/ContactContent.tsx (适配组件变更)
- src/app/error/ErrorContent.tsx (适配组件变更)
- src/app/blog/BlogContent.tsx (适配组件变更)
- src/app/[locale]/about/page.tsx (适配组件变更)
- src/app/[locale]/case-studies/\*_/_.tsx (适配组件变更)
- src/app/[locale]/contact/page.tsx (适配组件变更)
- src/app/[locale]/custom-solutions/page.tsx (适配组件变更)
- src/app/[locale]/developers/\*_/_.tsx (适配组件变更)
- src/app/[locale]/error/page.tsx (适配组件变更)
- src/app/[locale]/products/page.tsx (适配组件变更)
- src/i18n/locales/en.ts (移除废弃文案)
- src/i18n/locales/ja.ts (移除废弃文案)
- src/i18n/locales/zh.ts (移除废弃文案)

改进效果:

- UI简化: 网站所有二级页面的顶部导航路径被移除，界面更加简洁、现代化。
- 代码可维护性提升: 通过移除不再需要的属性传递（prop drilling），简化了组件之间的依赖关系，使代码更易于维护。
- 职责单一: `Breadcrumb` 组件的职责更加明确，现在专注于作为页面标题展示，而非导航。

影响范围:

- 全站所有二级页面的顶部UI均已更新。
- 传统的面包屑导航功能已被移除。

---

V1.7.0 feat(footer): 重构页脚，增加社交媒体弹窗并更新链接结构

类型: feat, ui

范围: footer, components, i18n

说明:

本次更新对网站页脚（Footer）进行了全面重构，引入了交互式弹窗（Modal）来展示QQ和微信的二维码，并更新了页脚的链接结构，使其内容更符合网站的导航需求。此外，还对悬浮联系组件、“关于我们”板块的UI以及项目类型配置进行了优化。

实现细节:

1. 页脚功能重构与UI升级

   - `src/components/Footer/index.tsx`: 完全重构了页脚组件。
     - 使用 `useState` 管理弹窗状态，实现了点击社交图标（QQ、微信）弹出二维码模态窗口的功能。
     - 社交链接和页脚导航栏目现在通过读取i18n配置文件动态生成，增强了可维护性和国际化支持。
     - 新增了Bilibili图标链接。

2. 国际化内容更新

   - `src/i18n/locales/*.ts`: 在 `en`, `ja`, `zh` 语言文件中：
     - 更新了 `footer.columns` 的内容，将原有的“常用链接”、“条款政策”等替换为“产品”、“开发者服务”、“定制合作”，使其更具业务导向性。
     - 新增了 `footer.contact` 对象，用于存放联系方式、社交链接以及弹窗所需的文案。
     - 在 `floatingContact` 中增加了Bilibili的链接和文案。

3. 组件UI优化与功能增强

   - `src/components/Common/FloatingContact.tsx`:
     - 新增了Bilibili的快捷链接。
     - 淘宝链接改为从i18n配置中动态获取，而非硬编码。
   - `src/components/About/AboutSectionTwo.tsx`:
     - 为“关于我们”的第二部分内容区域增加了一个卡片式UI（圆角、阴影、背景），提升了视觉效果。

4. 项目配置优化
   - `tsconfig.json`: 将 `jsx` 选项从 `"preserve"` 更新为 `"react-jsx"`，并调整了 `include` 路径以优化类型检查。
   - `next-env.d.ts`: 更新了Next.js路由类型的引用方式，以适应新的项目配置。

文件变更:

修改文件:

- src/components/Footer/index.tsx (组件完全重构)
- src/i18n/locales/en.ts (页脚及联系方式内容更新)
- src/i18n/locales/ja.ts (页脚及联系方式内容更新)
- src/i18n/locales/zh.ts (页脚及联系方式内容更新)
- src/components/Common/FloatingContact.tsx (新增Bilibili链接)
- src/components/About/AboutSectionTwo.tsx (UI样式更新)
- tsconfig.json (JSX配置与类型路径更新)
- next-env.d.ts (类型引用方式更新)
- version.md (为新版本记录做准备)

改进效果:

- 交互体验提升: 用户现在可以通过点击页脚的图标直接查看QQ群和微信公众号的二维码，无需跳转页面。
- 信息架构优化: 页脚的导航链接经过重新组织，更能反映网站的核心内容板块，提高了导航效率。
- 代码可维护性增强: 将文案和链接集中到i18n文件中进行管理，使得组件更加数据驱动，便于未来修改。
- 视觉效果改善: “关于我们”板块的卡片式设计使页面布局更清晰、更具现代感。

影响范围:

- 网站的页脚部分在外观和功能上发生了显著变化。
- 用户与社交媒体渠道的交互方式得到简化。
- 网站的整体导航结构在页脚部分得到了更清晰的体现。

---

V1.6.0 feat(homepage): 重新设计主页，采用动态主视觉轮播和面向产品的功能

类型: feat, ui

范围: homepage, components, content

说明:

本次更新对网站首页进行了全面重构，引入了动态轮播的Hero组件，并重新设计了“核心优势”板块，将其升级为以产品为中心的“产品平台”展示区。通过移除部分冗余组件和内容，优化了页面结构，提升了视觉吸引力和信息传达效率。

实现细节:

1. 首页Hero区域重构

   - `src/components/Hero/index.tsx`: 将原有的静态Hero区域替换为支持自动播放的动态轮播组件。
   - `public/images/hero/`: 新增 `slide-1.png`, `slide-2.png`, `slide-3.png` 作为轮播图资源。
   - `src/i18n/locales/*.ts`: 更新了 `hero` 部分的文案，以适应新的轮播图数据结构，包含图片、链接等。

2. “产品平台”板块升级 (原“核心优势”)

   - `src/components/Features/index.tsx`: 重构了该组件，现在分为“精选方案矩阵”和“亮点”两部分，更聚焦于产品展示。
   - `src/components/Features/SingleFeature.tsx`: 更新了单个特性组件的UI，现在展示产品图片、摘要和关键词，而非简单的图标和段落。
   - `src/types/feature.ts`: 修改了 `Feature` 类型定义，以匹配新的数据结构。
   - `src/i18n/locales/*.ts`: 完全重写了 `features` 部分的文案，以反映新的“产品平台”定位。

3. 内容与组件简化

   - `src/components/About/AboutSectionOne.tsx`: 删除了此组件，简化了关于我们部分的介绍。
   - `src/components/Contact/NewsLatterBox.tsx`: 移除了邮件订阅组件，使联系表单更简洁。
   - `src/app/[locale]/page.tsx`: 更新首页布局，移除了已删除的组件。

4. UI与资源优化
   - `src/components/Footer/index.tsx`: 更新页脚的社交媒体图标，使用 `next/image` 组件加载SVG，并统一了图标风格。
   - `public/images/icons/`: 新增 `bilibili.svg`, `qq.svg`, `wechat.svg` 等新版图标，移除了旧版或命名不一致的图标。
   - `src/components/Common/FloatingContact.tsx`: 优化了悬浮联系组件的文案和图标。

文件变更:

新增文件:

- public/images/about/section-two.jpg
- public/images/hero/slide-1.png
- public/images/hero/slide-2.png
- public/images/hero/slide-3.png
- public/images/icons/bilibili.svg
- public/images/icons/qq.svg
- public/images/icons/wechat.svg
- public/images/products/placeholder.svg

删除文件:

- public/images/icons/QQ.svg
- public/images/icons/wechat-fill.svg
- src/components/About/AboutSectionOne.tsx
- src/components/Contact/NewsLatterBox.tsx

修改文件:

- src/app/[locale]/page.tsx (页面结构调整)
- src/components/Hero/index.tsx (组件完全重构)
- src/components/Features/index.tsx (组件重构)
- src/components/Features/SingleFeature.tsx (UI更新)
- src/components/Features/featuresData.tsx (数据结构更新)
- src/components/About/AboutSectionTwo.tsx (内容更新)
- src/components/Contact/index.tsx (移除订阅组件)
- src/components/Footer/index.tsx (图标实现方式更新)
- src/components/Common/FloatingContact.tsx (文案与图标更新)
- src/i18n/locales/en.ts (内容全面更新)
- src/i18n/locales/ja.ts (内容全面更新)
- src/i18n/locales/zh.ts (内容全面更新)
- src/types/feature.ts (类型定义更新)
- version.md (准备下一次版本记录)

改进效果:

- 视觉吸引力增强: 动态的首页轮播图提供了更强的视觉冲击力，能更好地展示核心业务场景。
- 信息架构优化: 以产品为中心的“产品平台”板块，使用户能更快速地了解核心产品与解决方案。
- 用户体验提升: 简化了页面内容，移除了非核心模块，使用户能更专注于关键信息。
- 代码可维护性: 组件化的重构和类型定义的更新，提升了代码质量和后续的可维护性。

影响范围:

- 网站首页的整体外观和用户体验发生了显著变化。
- “核心优势”板块被“产品平台”取代，信息传递的重心从抽象概念转向具体产品。
- 移除了邮件订阅功能，简化了用户与我们联系的渠道。

---

V1.5.1 chore(dependencies): 更新Next.js依赖至最新版本并优化项目配置

类型: chore

范围: dependencies, config

说明:

本次更新主要包含Next.js核心依赖的版本升级以及项目配置的优化。Next.js框架从15.4.5升级至15.5.6，同时更新了相关的SWC编译器和环境依赖。此外，对.gitignore文件进行了全面优化，增加了更多类型的忽略规则，使项目配置更加完善。

实现细节:

1. Next.js依赖升级

   - `package-lock.json`: 将Next.js主依赖从15.4.5升级至15.5.6
   - `@next/env`: 从15.4.5升级至15.5.6
   - 所有平台相关的SWC编译器依赖均从15.4.5升级至15.5.6 (darwin-arm64, darwin-x64, linux-arm64-gnu, linux-arm64-musl, linux-x64-gnu, linux-x64-musl, win32-arm64-msvc, win32-x64-msvc)
   - 各依赖项添加了peer属性标记，明确依赖关系

2. 项目配置优化
   - `next-env.d.ts`: 添加了对路由类型的引用，增强类型安全
   - `.gitignore`: 完全重构了忽略规则，增加了更全面的文件类型忽略，包括Turbo/SWC缓存、更多环境变量格式、编辑器配置文件等

文件变更:

修改文件:

- .gitignore (全面优化忽略规则)
- next-env.d.ts (添加路由类型引用)
- package-lock.json (Next.js及相关依赖升级)

改进效果:

- 项目依赖保持最新：确保使用最新的Next.js功能和安全修复
- 更完善的配置：.gitignore文件更加全面，避免不必要的文件被提交
- 类型安全增强：next-env.d.ts的更新提供了更好的路由类型支持
- 项目维护性提升：依赖关系更加清晰，便于后续维护

影响范围:

- 项目构建和运行基于更新后的Next.js版本
- Git提交行为受更新的忽略规则影响
- 类型检查包含新的路由类型定义

---

V1.5.0 feat(products): 新增产品详情页与悬浮联系组件，丰富交互体验

类型: feat, ui

范围: products, contact, components

说明:

本次更新引入了动态产品详情页，允许展示每个产品的详细信息、视频和常见问题解答(FAQ)。同时，新增了功能更强大的悬浮联系组件，集成了电话、QQ群和微信公众号等多种联系方式，极大地提升了用户获取信息和联系我们的便捷性。

实现细节:

1. 产品详情模块

   - `src/app/[locale]/products/[slug]/page.tsx`: 新增产品动态路由页面，用于展示单个产品的详细信息。
   - `src/components/Products/ProductCard.tsx`: 新增产品详情卡片组件，包含产品标题、描述、视频和功能列表等内容。
   - `src/components/Products/FAQ.tsx`: 新增可折叠的常见问题解答(FAQ)组件，以更好地解答用户疑问。

2. 悬浮联系组件增强

   - `src/components/Common/FloatingContact.tsx`: 重构悬浮联系组件，从简单的电话图标链接变为一个可展开的联系方式面板。
   - `public/images/contact/weChat-official-account.jpg`: 新增微信公众号二维码图片资源。
   - `public/images/icons/phone.svg`: 更新了电话图标的视觉样式。
   - 组件现在包含电话、QQ群二维码和微信公众号二维码，提供多种便捷的联系途径。

3. 首页与产品页集成

   - `src/app/[locale]/page.tsx`: 在首页右下角集成了新的悬浮联系组件，方便用户随时联系。
   - `src/app/[locale]/products/page.tsx`: 更新了产品列表页面，为后续展示产品卡片列表做好了准备。

4. 国际化内容支持
   - `src/i18n/locales/*.ts`: 在 `en`, `ja`, `zh` 语言文件中添加了新组件所需的翻译，如 "常见问题"、"联系我们"、"QQ群"、"微信公众号" 等。

文件变更:

新增文件:

- public/images/contact/weChat-official-account.jpg
- src/app/[locale]/products/[slug]/page.tsx
- src/components/Products/FAQ.tsx
- src/components/Products/ProductCard.tsx
- src/components/Products/index.tsx

修改文件:

- next-env.d.ts (类型定义清理)
- public/images/icons/phone.svg (图标样式更新)
- src/app/[locale]/page.tsx (集成悬浮联系组件)
- src/app/[locale]/products/page.tsx (页面结构更新)
- src/components/Common/FloatingContact.tsx (功能重构与UI增强)
- src/i18n/locales/en.ts (新增翻译)
- src/i18n/locales/ja.ts (新增翻译)
- src/i18n/locales/zh.ts (新增翻译)

改进效果:

- 信息更丰富: 用户现在可以查看详细的产品介绍、功能和常见问题，做出更明智的决策。
- 交互更便捷: 全局悬浮联系组件让用户可以随时随地找到联系方式，提升了客户服务的可及性。
- 体验更统一: 通过组件化的方式构建产品详情和FAQ，确保了网站整体风格的一致性。

影响范围:

- 网站新增了 `/products/[slug]` 动态产品详情路由。
- 网站所有页面的右下角将出现新的悬浮联系按钮，显著改变了用户联系我们的交互方式。
- 产品列表页面的内容结构已更新，为下一步的产品展示奠定了基础。

---

V1.4.0 remove(template): 移除定价、评价、视频等模板化组件，专注核心业务展示

类型: remove, ui, refactor

范围: homepage, components, branding, content

说明:

本次更新移除了网站中的模板化组件（定价、客户评价、视频展示），进一步简化网站结构，专注于智能机器人教育解决方案的核心业务内容展示。同时更新了品牌标识和相关内容，使网站更加专业和聚焦。

实现细节:

1. 模板化组件移除

   - `src/components/Pricing/`：删除整个定价组件目录，包括 `OfferList.tsx`、`PricingBox.tsx`、`index.tsx`
   - `src/components/Testimonials/`：删除客户评价组件目录，包括 `SingleTestimonial.tsx`、`index.tsx`
   - `src/components/Video/index.tsx`：删除视频展示组件

2. 首页结构简化

   - `src/app/[locale]/page.tsx`：移除 `Video`、`Testimonials`、`Pricing` 组件的导入和使用
   - 简化后的首页结构为：Hero → Features → Brands → AboutSectionOne → AboutSectionTwo → Contact
   - 保留核心业务展示内容，移除营销导向的模板化内容

3. 品牌标识优化

   - `public/images/logo/logo.svg`：主品牌标识文件优化，文件大小减少 70% (1340 → 393 行)
   - `public/images/logo/logo-2.svg`：品牌变体标识优化，文件大小减少 45% (739 → 437 行)
   - `public/images/logo/logo-text.svg`：文字标识大幅优化，文件大小减少 73% (2305 → 611 行)
   - `public/images/logo/logo-text-inverse.svg`：反色文字标识优化，文件大小减少 66% (1617 → 551 行)
   - 所有标识文件在保持视觉效果的同时大幅提升了加载性能

4. 国际化内容更新

   - `src/i18n/locales/en.ts`：英文版本内容专业化更新，标题从"智能机器人教育解决方案领先提供商"更新为"具身智能创新全球领导者"
   - `src/i18n/locales/ja.ts`：日文版本对应内容同步更新
   - `src/i18n/locales/zh.ts`：中文版本内容本地化优化
   - 所有版本的内容都更加聚焦于核心技术优势和解决方案定位

5. 页脚信息微调
   - `src/components/Footer/index.tsx`：更新底部联系信息和展示内容

文件变更:

删除文件:

- src/components/Pricing/OfferList.tsx
- src/components/Pricing/PricingBox.tsx
- src/components/Pricing/index.tsx
- src/components/Testimonials/SingleTestimonial.tsx
- src/components/Testimonials/index.tsx
- src/components/Video/index.tsx

修改文件:

- src/app/[locale]/page.tsx (移除模板组件)
- src/components/Footer/index.tsx (信息更新)
- src/i18n/locales/en.ts (内容专业化)
- src/i18n/locales/ja.ts (内容同步)
- src/i18n/locales/zh.ts (本地化优化)
- public/images/logo/logo.svg (性能优化)
- public/images/logo/logo-2.svg (性能优化)
- public/images/logo/logo-text.svg (性能优化)
- public/images/logo/logo-text-inverse.svg (性能优化)

改进效果:

- 网站更聚焦：移除营销导向的模板内容，专注于核心业务价值展示
- 性能提升：品牌标识文件大幅优化，提升页面加载速度
- 用户体验：简化后的页面结构让用户更容易获取关键信息
- 品牌一致：统一的国际化内容表达，强化专业定位
- 维护简化：减少组件数量，降低后续维护复杂度

影响范围:

- 首页用户体验显著改变
- 移除了价格展示和客户评价等销售导向内容
- 网站更加偏向技术解决方案展示而非产品销售

---

V1.3.0 feat(website): 全面重构网站结构，新增产品展示与案例研究板块

类型: feat

范围: website, navigation, pages, branding

说明:

本次更新对网站进行了全面重构，移除了原有的通用模板内容，专注于智能机器人教育解决方案的专业展示，新增产品、开发者服务、定制解决方案和案例研究等核心业务板块。

实现细节:

1. 导航架构重新设计

   - `src/components/Header/menuData.tsx`：完全重构导航菜单，从通用模板结构改为业务导向布局
   - 新增"产品"、"开发者服务"、"定制解决方案"、"案例研究"等核心导航项
   - 移除"博客"、"支持"、"更多页面"等通用模板导航
   - 案例研究下设"大学项目"、"K12教育"、"联合研究"子菜单

2. 新增核心业务页面

   - `src/app/[locale]/products/page.tsx`：产品组合展示页面
   - `src/app/[locale]/developers/page.tsx`：开发者服务总览
   - `src/app/[locale]/developers/knowledge-base/page.tsx`：知识库页面
   - `src/app/[locale]/developers/open-source/page.tsx`：开源项目页面
   - `src/app/[locale]/custom-solutions/page.tsx`：定制解决方案页面
   - `src/app/[locale]/case-studies/page.tsx`：案例研究总览
   - `src/app/[locale]/case-studies/universities/page.tsx`：大学合作案例
   - `src/app/[locale]/case-studies/k12/page.tsx`：K12教育案例
   - `src/app/[locale]/case-studies/co-research/page.tsx`：联合研究案例

3. 国际化内容全面升级

   - `src/i18n/locales/en.ts`：英文版本专业化内容，突出智能机器人教育解决方案定位
   - `src/i18n/locales/ja.ts`：日文版本本地化适配
   - `src/i18n/locales/zh.ts`：中文版本品牌信息更新
   - 所有页面均有对应的国际化内容支持

4. 品牌视觉识别更新

   - `public/favicon.ico`：更新网站图标
   - `public/images/logo/logo.svg`：主品牌标识全面升级
   - `public/images/logo/logo-2.svg`：品牌变体标识更新
   - 新增`public/images/logo/logo-text.svg`和`public/images/logo/logo-text-inverse.svg`：纯文字版本标识

5. 通用组件优化
   - `src/components/Common/PageIntro.tsx`：新增页面介绍组件，统一新页面的展示格式
   - `src/components/Header/index.tsx`：头部组件适配新导航结构
   - `src/components/Footer/index.tsx`：底部信息更新，包括公司地址等联系信息

文件变更:

新增文件:

- src/app/[locale]/products/page.tsx
- src/app/[locale]/developers/page.tsx
- src/app/[locale]/developers/knowledge-base/page.tsx
- src/app/[locale]/developers/open-source/page.tsx
- src/app/[locale]/custom-solutions/page.tsx
- src/app/[locale]/case-studies/page.tsx
- src/app/[locale]/case-studies/universities/page.tsx
- src/app/[locale]/case-studies/k12/page.tsx
- src/app/[locale]/case-studies/co-research/page.tsx
- src/components/Common/PageIntro.tsx
- public/images/logo/logo-text.svg
- public/images/logo/logo-text-inverse.svg

修改文件:

- src/components/Header/menuData.tsx (完全重构)
- src/components/Header/index.tsx (适配新导航)
- src/components/Footer/index.tsx (信息更新)
- src/i18n/locales/en.ts (内容专业化)
- src/i18n/locales/ja.ts (本地化优化)
- src/i18n/locales/zh.ts (品牌信息更新)
- public/favicon.ico (图标更新)
- public/images/logo/logo.svg (品牌升级)
- public/images/logo/logo-2.svg (标识变体)

改进效果:

- 专业定位: 网站从通用模板转变为专业的智能机器人教育解决方案平台
- 业务聚焦: 围绕产品、服务、案例的核心业务架构，提升用户导航体验
- 品牌一致: 统一的视觉识别和专业化的内容表达
- 国际化支持: 三语言版本的专业内容适配
- 可扩展性: 模块化的页面结构便于后续功能扩展

---

V1.2.0 remove(blog): 移除博客相关页面及导航入口

类型: remove

范围: blog, header, pages

说明:

本次更新移除了博客相关的所有页面及其在导航菜单中的入口，简化了网站结构，聚焦核心业务内容。

实现细节:

1. 页面移除

   - `src/app/[locale]/blog-details/page.tsx`、`src/app/[locale]/blog-sidebar/page.tsx`、`src/app/[locale]/blog/page.tsx`：全部内容替换为 `notFound()`，原有博客详情、侧边栏、列表页功能被废弃。
   - `src/app/[locale]/page.tsx`：主页移除 `BlogSection` 组件，不再展示博客板块。

2. 导航菜单调整
   - `src/components/Header/menuData.tsx`：移除主导航中的“博客”入口，以及“页面”子菜单下的“博客侧边栏”和“博客详情”入口。

文件变更:

- 修改: src/app/[locale]/blog-details/page.tsx
- 修改: src/app/[locale]/blog-sidebar/page.tsx
- 修改: src/app/[locale]/blog/page.tsx
- 修改: src/app/[locale]/page.tsx
- 修改: src/components/Header/menuData.tsx

改进效果:

- 网站结构更简洁，用户聚焦于核心产品与服务内容
- 移除无用页面，减少维护成本
- 导航菜单更清晰，提升用户体验

---

V1.1.2 feat(i18n): 英文和日文版本国际化内容优化

类型: feat

范围: i18n

说明:

优化官网英文和日文版本的国际化内容，确保品牌信息的一致性和本地化适应性，提升国际用户体验。

实现细节:

1. 英文版本内容优化 (src/i18n/locales/en.ts)

   - 更新导航菜单文案，简化页面名称表述（如 "About Page" → "About"）
   - 重写Hero区域标题和描述，突出"有你同创"作为智能机器人教育解决方案提供商的定位
   - 优化产品特性文案，将通用功能描述替换为具体的教育机器人产品介绍
   - 更新用户评价部分，简化职位头衔并优化推荐内容
   - 调整定价方案描述，使其更贴合实际产品服务
   - 优化博客板块标题和文章内容，提升可读性

2. 日文版本内容优化 (src/i18n/locales/ja.ts)
   - 完善日文翻译，确保专业术语的准确性
   - 翻译并适配品牌介绍和产品优势内容
   - 本地化用户评价和定价方案描述
   - 优化导航结构和页面命名，符合日文用户习惯

文件变更:

- 修改: src/i18n/locales/en.ts (全面优化英文版本内容)
- 修改: src/i18n/locales/ja.ts (完善日文版本翻译和本地化)

改进效果:

- 品牌一致性: 三个语言版本的品牌定位和价值主张保持统一
- 本地化质量: 英文和日文版本更符合目标用户的语言习惯和文化背景
- 用户体验: 国际用户能更好地理解产品价值和技术优势
- 专业性: 技术术语翻译准确，提升品牌专业形象

---

V1.1.1 feat(contact): 新增浮动联系方式组件与深色主题样式优化

类型: feat

范围: contact

说明:

为官网新增智能浮动联系方式组件，提供QQ群、电话、淘宝、微信等多种联系渠道，并同步优化深色主题下的样式一致性，提升用户联系便利性和视觉体验。

实现细节:

1. 浮动联系方式组件开发

   - 新增 `FloatingContact` 组件，包含可折叠的联系面板和浮动操作按钮
   - 支持QQ群号复制、电话号码复制、淘宝店铺链接等功能
   - 集成二维码展示、复制成功提示、键盘导航等交互特性
   - 响应式设计，移动端自动切换为模态弹窗形式

2. 多语言国际化支持

   - 在 `en.ts`、`zh.ts`、`ja.ts` 中新增 `floatingContact` 词典配置
   - 包含完整的文案国际化：QQ群、电话、淘宝、微信等联系方式的标签和提示信息
   - 支持复制成功提示、访问链接等交互文案的本地化

3. 联系方式资源集成

   - 新增联系相关图标：QQ、电话、淘宝、微信填充图标
   - 添加QQ群二维码图片资源，便于用户扫码加群
   - 配置淘宝店铺链接和微信预留接口

4. 深色主题样式统一

   - 修正多个组件在深色模式下的背景色一致性（从 `#2C303B` 统一为 `#2d2520`）
   - 更新错误页面的主色调，保持与品牌橙色 `#ff6b35` 一致
   - 优化视频区域SVG渐变色，适配新的主题色彩

5. 全局布局集成
   - 在主布局文件中引入FloatingContact组件
   - 传递多语言词典配置，确保组件支持国际化

文件变更:

- 新增: src/components/Common/FloatingContact.tsx (568行，核心组件)
- 新增: public/images/contact/qq-group-qrcode.jpg (QQ群二维码)
- 新增: public/images/icons/QQ.svg, phone.svg, taobao.svg, wechat-fill.svg (联系图标)
- 修改: src/app/[locale]/layout.tsx (集成浮动组件)
- 修改: src/i18n/locales/{en,zh,ja}.ts (新增floatingContact词典)
- 修改: src/styles/index.css (主题色调整)
- 修改: public/images/video/shape.svg (渐变色更新)
- 修改: 多个组件的深色主题样式 (blog-sidebar, error, signin, signup, breadcrumb, pricing, testimonials, footer等)

改进效果:

- 联系便利性: 用户可通过浮动面板快速访问各种联系方式，无需跳转到联系页面
- 交互体验: 复制功能、二维码展示、键盘导航等特性提供流畅的用户操作体验
- 品牌一致性: 全站深色主题样式统一，保持橙色主题的视觉连贯性
- 移动适配: 响应式设计确保在移动设备上也有良好的使用体验
- 国际化完整: 新功能完全支持多语言，符合项目的国际化架构要求

---

V1.1.0 feat(branding): 官网品牌化内容重塑与主题色更新

类型: feat

范围: branding

说明:

对官网进行全面的品牌化升级，将内容从通用SaaS模板更新为“有你同创”智能机器人教育解决方案，并同步更新了主视觉配色，以建立清晰、专业的品牌形象。

实现细节:

1. 品牌内容全面焕新

   - 重写 `hero`, `features`, `about` 及 `footer` 等核心板块的中文文案，使其精准传达“有你同创”在教育机器人领域的专业定位与产品优势。
   - 内容聚焦于拼装小车、ROS2平台、具身智能机器人等核心产品，强调为高校提供解决方案的价值。

2. 主题色与视觉调整

   - 将全局主色调从蓝色 (`#4A6CF7`) 更改为更具活力的橙色 (`#ff6b35`)，更新了 CSS 变量与 Hero 区域的 SVG 矢量图形配色，提升品牌辨识度。
   - 调整了 Hero 区域两个核心行动号召（CTA）按钮的链接，使其指向页面内部的“产品优势”和“联系我们”板块，优化了用户站内导航体验。

3. 工程维护
   - 清理了 `next-env.d.ts` 文件中不再需要的路由类型定义引用，保持项目整洁。

文件变更:

- 修改: src/i18n/locales/zh.ts (核心文案重写)
- 修改: src/components/Hero/index.tsx (CTA链接与SVG颜色变更)
- 修改: src/styles/index.css (全局主色调变更)
- 修改: next-env.d.ts (类型定义清理)

改进效果:

- 品牌一致性: 网站内容与视觉风格高度统一，清晰传达了“有你同创”的品牌定位。
- 用户体验: 访客能快速了解公司的核心业务与产品，站内导航路径更明确。
- 视觉吸引力: 新的主题色让网站看起来更有活力和科技感。

---

V1.0.1 docs(readme): 完整本地化README文档为中文

类型: docs

范围: readme

说明:

将项目主文档从英文完整翻译为中文，并针对国际化功能进行详细说明，为中文开发者提供更友好的使用指南。

实现细节:

1. 文档结构重组

   - 重新设计README结构，增加功能亮点、技术栈、快速开始等核心板块
   - 移除原有英文的商业化推广内容，聚焦技术文档本身

2. 本地化内容覆盖

   - 标题、说明文字、代码注释等全部改为中文
   - 保持技术术语的准确性，如Next.js、TypeScript、Tailwind CSS等专有名词保持原文
   - 代码示例和命令行操作使用中文说明

3. 国际化功能详解

   - 详细说明多语言路由体系的工作原理
   - 提供完整的国际化配置指南
   - 包含语言切换、词典管理、SEO优化等关键信息

4. 开发与部署指南
   - 增加详细的快速开始步骤
   - 补充技术栈对照表和目录结构说明
   - 提供多种部署方案的建议

文件变更:

- 修改: README.md（完整重写为中文版本）

改进效果:

- 开发者体验: 中文开发者可以直接阅读母语文档，降低理解门槛
- 文档完整性: 覆盖从安装到部署的全流程，提供实用指导
- 国际化展示: README本身就是项目国际化能力的一个展示案例
- 维护友好: 结构化文档便于后续更新和维护

---

V1.0.0 feat(i18n): 引入多语言路由体系与词典资源

类型: feat

范围: i18n

说明:

为企业官网首次加入完整的多语言支持，包含路由分层、词典加载、语言切换与国际化内容重构，确保英文、中文、日文三种语言均可顺畅浏览并保持 SEO 与可访问性。

实现细节:

1. 路由与中间件改造
   - 全量迁移页面文案至词典，新增拆分组件（如 AboutContent、BlogContent、ContactContent 等）以简化翻译维护。
2. 交互组件国际化
   - 新增 LocaleSwitcher 并嵌入导航栏，实现语言切换、Cookie 记忆与页面刷新。
   - 更新博客、定价、视频、页头页脚等组件，使按钮标签、ARIA 文案、分页等均来自词典数据。
3. 无障碍与工程细节
   - 将 ScrollToTop 改为 <button>，补齐键盘可达性与聚焦样式。
   - .gitignore 新增 \*.tsbuildinfo，避免 TypeScript 增量编译文件入库。
   - 自动生成的 next-env.d.ts 及其路由声明保持同步。

文件变更:

- 新增: src/app/[locale]/...、src/app/about/AboutContent.tsx、src/app/contact/ContactContent.tsx、src/app/blog-details/BlogDetailsContent.tsx、src/app/blog-sidebar/BlogSidebarContent.tsx、src/app/signin/
  SigninContent.tsx、src/app/signup/SignupContent.tsx
- 新增: src/i18n/config.ts、src/i18n/locales/{en,zh,ja}.ts、src/i18n/utils.ts、src/components/Header/LocaleSwitcher.tsx、src/middleware.ts、version.md
- 修改: src/app/layout.tsx、src/app/providers.tsx、src/components/\* 大量组件的文案来源与参数签名
- 修改: .gitignore（忽略 \*.tsbuildinfo）
- 删除/重构: 原 src/app/{page.tsx,about/page.tsx,...} 等单语言页面，改由内容组件 + [locale] 路由接管
- 修改: src/components/ScrollToTop/index.tsx（按钮化处理）
- 自动更新: next-env.d.ts（Next.js 路由类型声明）

改进效果:

- 多语言覆盖: 官网内容完全支持 EN/中文/日文，URL 层面可直接区分语言，利于搜索引擎收录。
- 维护效率: 文案集中在词典中，未来新增语言或修改文案更便捷。
- 用户体验: 语言切换即时生效，导航、分页、提示信息均符合当地语言习惯。
- 可访问性: 回到顶部按钮支持键盘操作，符合 WCAG 要求。
- 工程规范: 编译产物不再进入仓库，保持版本库整洁。

---
