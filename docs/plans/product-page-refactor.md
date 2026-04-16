# 产品页重构计划

消除 CMS Schema 与前端之间的字段错位、硬编码特判、死代码和反模式，建立统一的数据驱动渲染架构。

状态：`DRAFT`（最近审查：2026-04-15）

---

## 1. 现状审计总结

### 1.1 产品清单与数据格式差异

| 产品 slug | sampleCases 格式 | experiments 格式 | controllerConfig | softwareConfig 布局字段 |
|---|---|---|---|---|
| `ubot-mr20` | 原生数组 (modules/chassis/arms/compositeRobots) | 旧格式 (preparation/moduleBasics/...) | ✅ 有 images | ❌ 无布局字段 |
| `gx-mat-09s` | 原生数组 + `compositeGroups` | 新格式 (sections) | ✅ 有 images | ❌ 无布局字段 |
| `rai-p4` | **`sections`** (非 CMS 原生) | 新格式 (sections) | ⚠️ 无 images 键 | ⚠️ 4 个布局字段 |
| `rai-m4` | **`sections`** (非 CMS 原生) | 新格式 (sections) | ✅ 有 images | ❌ 无布局字段 |
| `rai-q2` | **`sections`** (非 CMS 原生) | 新格式 (sections) | ✅ 有 images | ❌ 无布局字段 |
| `uni-wr2` | **`sections`** (非 CMS 原生) | 新格式 (sections) | ✅ 有 images | ⚠️ 4 个布局字段 |
| `alo-le4` | **`sections`** (非 CMS 原生) | 新格式 (sections) | ❌ 无 | ❌ 无 |

### 1.2 已识别问题清单

#### P0 — 架构级问题

| # | 问题 | 影响范围 | 详情 |
|---|---|---|---|
| **A1** | CMS Schema 的 `sampleCases` 定义了 `modules/chassis/arms/composites` 四个关系型数组，但 7 个产品中有 5 个使用 `sections` JSON 格式 | rai-p4, rai-m4, rai-q2, uni-wr2, alo-le4 | Schema 与实际数据严重不一致；`sections` 字段曾被强行注入又回滚，导致 Drizzle 警告 |
| **A2** | `resolveMediaURL()` 优先返回 `sizes.hero.url`（800×600 裁剪版），宽幅图被截断 | 所有使用 upload 关系的图片 | 目前仅对 `rai-p4` 做了 slug 硬编码绕过 |
| **A3** | CSS 布局类名（gridClassName, aspectClass, cardClassName 等）混入数据 JSON | rai-p4, uni-wr2 的 softwareConfig；sampleCases 的多个产品 | 违反数据/表现分离，前端需要大量 `??` 默认值回退 |

#### P1 — 前端硬编码与死代码

| # | 位置 | 问题 | 类型 |
|---|---|---|---|
| **B1** | page.tsx L137 | `product.slug === 'rai-p4'` 强制使用原图 URL | 硬编码特判 |
| **B2** | page.tsx L197-205 | `product.slug === "rai-p4"` 强制 grid/aspect/card 类名 | 硬编码特判 |
| **B3** | page.tsx L371 | `product.slug !== 'rai-p4'` 隐藏 Modules 标题 | 硬编码特判 |
| **B4** | page.tsx L330-364 | `sampleCustomSections` 分支：读取 `sampleCases.sections`，但 CMS 中已无此字段（被删除），永远为 null | 死代码 |
| **B5** | page.tsx L586-719 | 旧实验格式渲染 (preparation/moduleBasics/...) | 仅 ubot-mr20 使用，其余 6 个产品走 sections 分支 |
| **B6** | page.tsx L432-455 | `compositeGroups` 渲染 | 仅 gx-mat-09s 使用 |
| **B7** | page.tsx L196 | `sampleCustomSections = sampleCases?.sections` 本应从 JSON 字段读取但管道被切断 | 残留逻辑 |

#### P2 — CMS Schema 废弃字段

| # | Schema 字段 | 状态 |
|---|---|---|
| **C1** | `details.specs` | 前端已不渲染（技术参数板块已删除），但 schema 仍 required，导致脚本写入时验证失败 |
| **C2** | `details.gallery` | 前端从未引用该字段 |
| **C3** | `details.resources` | 前端已用硬编码「知识库」横幅替代，该字段无用 |

---

## 2. 重构方案

### 阶段一：统一 `sampleCases` 数据模型

> [!IMPORTANT]
> 这是最关键的变更。目前 CMS 中有两套并行的数据路径：结构化数组（modules/chassis/arms/composites）和 JSON sections。需要统一为一种模型。

**方案：将 `sampleCases` 从结构化数组改为统一的 JSON 字段**

理由：
- 7 个产品中 5 个已使用 sections 格式，这是多数派
- sections 格式更灵活，可以支持不同数量、不同标题的子分组
- 结构化数组（modules/chassis/arms/composites）命名过于特化（专门为 ubot-mr20 设计），对其他产品不适用

#### 具体变更

##### [MODIFY] `src/payload/collections/Products.ts`

```text
sampleCases: group → json (localized)
```

- 删除 `sampleCases` 下的 `title`, `description`, `modules`, `chassis`, `arms`, `composites` 子字段定义
- 将 `sampleCases` 改为 `type: "json", localized: true`
- 同时删除 `specs`、`gallery`、`resources` 废弃字段

##### [MODIFY] `src/app/[locale]/products/[slug]/page.tsx`

1. **删除所有 slug 硬编码特判**（B1, B2, B3）
2. **删除 `sampleCustomSections` 分支判断**（B4），统一走 sections 渲染
3. **删除旧的 modules/chassis/arms/compositeRobots 分支**（仅保留 sections 渲染）
4. **统一 `mapGalleryItems`**，不再基于 slug 做条件分支

##### [MODIFY] `messages/{zh,en,ja}/products.json`

- 将 `ubot-mr20` 和 `gx-mat-09s` 的 sampleCases 统一改写为 sections 格式
- 每个 section 携带 `title`、`items[]`，items 内每项有 `name` + `image`（URL 字符串）
- 移除所有布局类名字段（gridClassName 等）

##### 数据迁移脚本

- 编写 `scripts/payload/migrate-sample-cases.ts`，将数据库中 ubot-mr20、gx-mat-09s 的结构化数组数据转换为 sections JSON 格式

---

### 阶段二：统一 experiments 数据模型

**方案：全部统一为 sections 格式**

- `ubot-mr20` 的旧格式（preparation/moduleBasics/structureDesign/perception/comprehensiveProjects/extensionProjects）转换为 sections 格式
- 删除 page.tsx 中旧格式的渲染代码（L586-719），仅保留 sections 渲染分支
- 特殊子结构（如 extensionProjects.groups）转换为等效的 sections 项

##### [MODIFY] `messages/{zh,en,ja}/products.json` — ubot-mr20 experiments 部分

##### [MODIFY] `src/app/[locale]/products/[slug]/page.tsx`（旧 experiments 分支）

删除整个旧格式分支。

---

### 阶段三：分离布局配置与数据内容

**方案：布局类名从 JSON 数据中剥离，改为前端默认值体系**

当前问题：`softwareConfig` 中混入了 `imageGridClassName`、`imageWrapperClassName`、`figureClassName`、`showCaptions` 等纯前端样式字段。

变更：
- 前端为 softwareConfig 图片区定义统一默认样式
- 从 JSON 数据中移除所有 `*ClassName`、`showCaptions` 字段
- 如有个别产品确实需要差异化排版，通过 CMS 中的 `displayHints` JSON 字段（单独一个可选字段）传递，而非混入内容数据

##### [MODIFY] `src/app/[locale]/products/[slug]/page.tsx`

- 移除 L196-219 中全部 `sampleCases?.xxxClassName` / `softwareConfig?.xxxClassName` 的读取
- 替换为统一的常量或可从 CMS 可选字段 `displayHints` 读取

##### [MODIFY] `messages/{zh,en,ja}/products.json`

- 从所有产品的 `softwareConfig` 和 `sampleCases` 中删除布局类名字段

---

### 阶段四：修复 `resolveMediaURL` 优先级

**方案：优先返回原始尺寸 URL，裁剪版仅在明确请求时使用**

##### [MODIFY] `src/lib/payload.ts`

```typescript
export function resolveMediaURL(media: MediaLike): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "number") return null;
  // 优先原图
  if (media.url) return media.url;
  // 回退到预设尺寸
  if (media.sizes?.hero?.url) return media.sizes.hero.url;
  if (media.sizes?.card?.url) return media.sizes.card.url;
  if (media.sizes?.thumbnail?.url) return media.sizes.thumbnail.url;
  return null;
}
```

这样所有产品的所有图片都自动使用原图，彻底消除 B1 硬编码。

> [!WARNING]
> 修改 `resolveMediaURL` 的优先级会影响全站所有调用方（首页轮播、案例页封面等）。需要确认这些场景是否也应使用原图。如果部分场景需要缩略图，可以新增一个 `resolveMediaThumbnail()` 函数单独使用。

---

### 阶段五：清理 CMS Schema 废弃字段

##### [MODIFY] `src/payload/collections/Products.ts`

删除以下字段定义：
- `details.specs`（C1）
- `details.gallery`（C2）
- `details.resources`（C3）

> [!CAUTION]
> 删除 Schema 字段会触发 Drizzle 的 `DATA LOSS WARNING`。需要在执行前确认数据库中这些字段的现有数据可以丢弃。建议先用 `pg_dump` 备份数据库。

---

## 3. 产品级变更矩阵

| 产品 | sampleCases 转换 | experiments 转换 | 布局字段清理 | controllerConfig 修复 |
|---|---|---|---|---|
| `ubot-mr20` | ⚠️ 需转换为 sections | ⚠️ 需从旧格式转为 sections | ❌ 无需 | ❌ 无需 |
| `gx-mat-09s` | ⚠️ 需转换 compositeGroups 为 sections | ✅ 已是 sections | ❌ 无需 | ❌ 无需 |
| `rai-p4` | ✅ 已是 sections | ✅ 已是 sections | ⚠️ 清理 softwareConfig 布局字段 | ⚠️ 补 images 数据 |
| `rai-m4` | ✅ 已是 sections | ✅ 已是 sections | ❌ 无需 | ❌ 无需 |
| `rai-q2` | ✅ 已是 sections | ✅ 已是 sections | ❌ 无需 | ❌ 无需 |
| `uni-wr2` | ✅ 已是 sections | ✅ 已是 sections | ⚠️ 清理 softwareConfig 布局字段 | ❌ 无需 |
| `alo-le4` | ✅ 已是 sections | ✅ 已是 sections | ❌ 无需 | ❌ 无需（无配置） |

---

## 4. 执行顺序

```text
阶段四（修复 resolveMediaURL）
       ↓
阶段一（统一 sampleCases）
       ↓
阶段二（统一 experiments）
       ↓
阶段三（分离布局配置）
       ↓
阶段五（清理废弃 Schema 字段）
       ↓
全量验证（逐产品刷新确认）
```

> [!IMPORTANT]
> 阶段四最先执行是因为它修改了一个底层公共函数，可能影响全站。需要先验证其他页面（首页轮播、案例页）没有出现图片异常，再继续后续阶段。

---

## Open Questions

1. **`resolveMediaURL` 全局修改**：将原图置为最高优先级后，首页轮播等使用 `sizes.hero` 裁剪图做加速加载的地方是否会产生性能差异？是否需要对这些场景保留裁剪版？
2. **数据库备份**：删除 `specs`/`gallery`/`resources` Schema 字段前，是否需要先做一次完整的数据库备份？
3. **`ubot-mr20` 的 sampleCases 中有大量通过 upload 关系绑定的图片资源**（modules 11 张, chassis 11 张, arms 8 张, composites 多张），转换为 sections JSON 后将改为 URL 字符串引用。这意味着 CMS 管理后台将无法再通过图片选择器管理这些图片，而是需要手动填写 URL。这个取舍是否可以接受？

---

## Verification Plan

### 自动化
- 重构完成后执行 `npm run build`，确保编译无错误
- 运行 `npm run dev` 后逐一访问全部 7 个产品页面的 zh/en/ja 路由（共 21 个 URL），确认无 500/404

### 手动验证
- 逐产品检查：样机案例图片是否完整渲染、无裁剪
- 检查系统配置区（传感器/控制器/软件）是否正常
- 检查实验项目区是否正常展示
- 确认首页轮播、案例页封面图未受 `resolveMediaURL` 改动影响
