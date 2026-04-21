# 产品页重构计划（V2）

**目标**：消除 CMS Schema 与前端之间的字段错位、硬编码特判、死代码和反模式，建立统一的数据驱动渲染架构。
**变更**：根据用户反馈决策，已确认使用**未裁剪原始图片**，并在全站保留 **CMS 图片选择器** 功能。

状态：`DRAFT`（最近审查：2026-04-15）

---

## 1. 现状审计总结

### 1.1 产品数据格式诊断差异

| 产品 slug | sampleCases 格式 | experiments 格式 |
|---|---|---|
| `ubot-mr20` | 原生数组 (modules/chassis/arms/compositeRobots) | 旧格式 (preparation/moduleBasics/...) | 
| `gx-mat-09s` | 原生数组 + `compositeGroups` | 新格式 (sections) |
| `rai-p4` | **`sections`** (非原生，注入的 JSON) | 新格式 (sections) |
| `rai-m4`, `rai-q2`, `uni-wr2`, `alo-le4` | **`sections`** (非原生，注入的 JSON) | 新格式 (sections) |

**前端硬代码与废弃字段：**
- **page.tsx**：为 `rai-p4` 强制做了 3 处硬编码（特判使用原图、注入特制 class 排版类名）。
- **page.tsx**：存在约 130 行冗余读取废弃 `sampleCases.sections` 节点的设计（永远为 null）。
- **Products Schema**：包含已被前端抛弃使用的 `specs`、`gallery`、`resources`，需要清理。

---

## 2. 重构方案与阶段规划

> 说明：执行该计划前，请先做数据库备份（例如 `npm run cms:backup:local`）。

### 阶段一：建立统一规格的 `sampleCases` 关系模型

> [!IMPORTANT]
> 为满足“保留图片选择器”的诉求，不再将 `sampleCases` 改做黑盒 JSON。我们要为其量身打造一个真正的 `sections` 嵌套数组表单结构。

#### [MODIFY] `src/payload/collections/Products.ts`
重构 `sampleCases` 字段定义：
```typescript
{
  name: "sampleCases",
  type: "group",
  label: { ... },
  fields: [
    { name: "description", type: "richText", localized: true },
    // 增加正式的 sections 格式支持
    {
      name: "sections",
      type: "array",
      localized: true,
      fields: [
        { name: "title", type: "text", localized: true },
        { 
          name: "items", 
          type: "array", 
          localized: true,
          fields: [
            { name: "name", type: "text", localized: true },
            { name: "image", type: "upload", relationTo: "media" } // ✅ 保留选图能力
          ]
        }
      ]
    }
  ]
}
```

*注：此时暂时不要删除旧的 `modules`、`chassis`、`arms` 字段，以防数据丢失。仅做添加并开始前端适配。*

#### [MODIFY] 数据迁移与录入
- 编写 Node 脚本将所有使用静态 JSON Sections（rai-p4, rai-m4等）及分离数组（ubot-mr20）的数据平铺合并转换入新设计的正式 `sections` 表单结构内。图片将被解析为 Media ID 进行正确关联配置。

### 阶段二：打通统一前端渲染管道与原图逻辑

#### [MODIFY] `src/lib/payload.ts` L41-52
全局修复，让所有产品图库彻底脱离压缩裁剪的限制：
```typescript
export function resolveMediaURL(media: MediaLike): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "number") return null;
  // 全局修改：优先尝试调取原始长宽分辨率原图 URL，放弃 fallback 至 hero 裁剪尺寸
  if (media.url) return media.url;
  // ... 其他回退
}
```

#### [MODIFY] `src/app/[locale]/products/[slug]/page.tsx`
实施大清理：
1. 删除 `if (product.slug === 'rai-p4')` 开头的所有脏代码判断。
2. 删除 `softwareConfig` / `sampleCases` 引用的废弃排版控制类名读取（将退回默认响应式 Grid 框架）。
3. 砍掉基于四部分旧模块（modules/chassis...）的特殊渲染逻辑，以及冗杂的旧 format Experiments (`preparation/moduleBasics...`) 分支。
4. **统一重定向至针对 `details.sampleCases.sections` 与 `details.experiments.sections` 的渲染循环。**

### 阶段三：去除冗余旧结构（清理技术债）

在第一和第二部分成功连接并将有效数据迁入 `sections` 之后，在 `Products.ts` 中**彻底剔除**遗留下来的废弃节点字段，彻底切断它们的数据库连接释放空间：
1. 删除 `details.specs`
2. 删除 `details.gallery`
3. 删除 `details.resources` 
4. 删除 `sampleCases.modules`, `sampleCases.chassis`, `sampleCases.arms`, `sampleCases.composites`, `sampleCases.compositeGroups`。

> [!WARNING]
> 这个动作会导致后续 Payload `npm run dev` 执行时报出 `DATA LOSS WARNING`。我们已经做了数据库备份，这是安全的系统重置操作。

---

## 3. 验证计划 (Verification Plan)
- **前后端打通验证**：执行一次 `npx db-migrate`，确保在 Payload 后台中，每个 Product 都在 `sampleCases > sections` 中看到了漂亮的图片选择器和数据。
- **UI 无损检查**：访问 localhost 的 `ubot-mr20` 和 `rai-p4` ，验证原来以分类和 JSON 呈现的两批次数据均可走通标准的 `sections` 循环。

---

## 期待确认

所有的反馈决策已反映在计划中，**数据库已就绪**。
请检阅本方案V2版本。若无疑问，请下达正式批准指令，我将启动**阶段一和二**的代码及格式转换操作。
