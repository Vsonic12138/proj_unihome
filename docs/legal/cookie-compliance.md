# Cookie 合规与实现指南

本文档记录当前项目中与 Cookie 同意、隐私页展示、CMS 配置及合规边界相关的真实实现状态。

状态：`ACTIVE`（最近审查：2026-04-15）

---

## 1. 架构概览

当前项目采用 **Payload CMS + Next.js App Router** 架构：

- Cookie 横幅文案来自 `SiteSettings.cookieConsent`
- 隐私页正文优先来自 `SiteSettings.legalText`
- Cookie 同意状态保存在浏览器 Cookie，并以 `localStorage` 作为备份

数据流如下：

```text
Payload CMS (SiteSettings)
  ├─ cookieConsent
  └─ legalText
        ↓
src/app/[locale]/layout.tsx
  └─ <CookieConsent siteSettings={...} />
        ↓
src/components/Common/CookieConsent.tsx
  └─ 读取用户是否已选择同意状态

src/app/[locale]/privacy-policy/page.tsx
  └─ 优先渲染 siteSettings.legalText
```

---

## 2. CMS 配置

### 2.1 SiteSettings Schema

文件：`src/payload/globals/SiteSettings.ts`

当前 Cookie 相关字段为：

```text
SiteSettings
└── 合规与政策 (Legal & Compliance)
    ├── cookieConsent
    │   ├── ariaLabel
    │   ├── message
    │   ├── privacyPolicyLink   (localized)
    │   ├── learnMore
    │   ├── acceptAll
    │   └── rejectNonEssential
    └── legalText              (richText, localized)
```

### 2.2 当前已清理的冗余字段

以下字段已从 CMS schema 中移除，因为前端没有实际使用：

- `cookieConsent.title`
- `cookieConsent.description`
- `cookieConsent.acceptLabel`

### 2.3 字段用途

| 字段 | 用途 | 当前状态 |
|------|------|----------|
| `cookieConsent.ariaLabel` | 横幅无障碍标签 | 已使用 |
| `cookieConsent.message` | 横幅正文 | 已使用 |
| `cookieConsent.privacyPolicyLink` | “了解更多”链接地址 | 已使用 |
| `cookieConsent.learnMore` | “了解更多”文案 | 已使用 |
| `cookieConsent.acceptAll` | 接受全部按钮文案 | 已使用 |
| `cookieConsent.rejectNonEssential` | 仅必要/拒绝非必要按钮文案 | 已使用 |
| `legalText` | 隐私页正文 | 已使用，且为优先正文来源 |

### 2.4 默认种子数据

文件：`scripts/payload/seed.ts`

当前 seed 会写入：

- `cookieConsent.ariaLabel`
- `cookieConsent.message`
- `cookieConsent.privacyPolicyLink`
- `cookieConsent.learnMore`
- `cookieConsent.acceptAll`
- `cookieConsent.rejectNonEssential`
- `legalText`

---

## 3. 前端实现

### 3.1 CookieConsent 横幅

文件：`src/components/Common/CookieConsent.tsx`

当前行为：

- 页面挂载约 `500ms` 后检查是否需要显示横幅
- 若用户尚未选择，则在底部显示 Cookie 横幅
- 提供两个按钮：
  - `acceptAll`
  - `rejectNonEssential`
- 点击后保存状态并关闭横幅
- 页脚可通过“Cookie 设置”重新打开横幅

当前 UI 结构：

```text
[Cookie 图标] message + learnMore 链接
[仅必要 Cookie] [接受全部]
```

### 3.2 Cookie 设置入口

文件：

- `src/components/Common/CookiePreferencesButton.tsx`
- `src/components/Footer/index.tsx`

当前页脚提供两个相关入口：

- `隐私与 Cookie 政策`
- `Cookie 设置`

点击 `Cookie 设置` 会：

- 清除当前同意状态
- 重新打开 Cookie 横幅

### 3.3 隐私页

文件：`src/app/[locale]/privacy-policy/page.tsx`

当前逻辑：

- 若 `siteSettings.legalText` 有可渲染正文，则**优先直接展示 CMS 正文**
- 若 CMS 正文为空，则回退到 `messages/{locale}/common.json` 中的默认隐私说明内容

这意味着现在隐私页已经可以通过 CMS 调整，而不是只能依赖内置文案。

---

## 4. 存储与同意机制

### 4.1 当前使用的存储

| 名称 | 类型 | 用途 |
|------|------|------|
| `cookie-consent-status` | Cookie + localStorage | 保存用户是否接受全部或仅必要 |
| `proj_uinhome-language` | Cookie | 保存用户语言偏好 |
| `theme` | localStorage | 保存明暗主题偏好 |

### 4.2 同意状态

文件：`src/lib/cookieConsent.ts`

当前同意状态只有两种：

- `accepted`
- `rejected`

### 4.3 当前策略

| 用户操作 | 必要 Cookie | 功能性 Cookie | 分析 Cookie | 营销 Cookie |
|----------|:-----------:|:-------------:|:-----------:|:-----------:|
| 接受全部 | ✅ | ✅ | ✅* | ✅* |
| 仅必要 | ✅ | ✅ | ❌* | ❌* |
| 未选择 | ✅（横幅待选择） | ✅（语言/主题仍会工作） | ❌ | ❌ |

说明：

- 当前站点**没有真正接入**分析或营销脚本
- `enableAnalyticsCookies()` / `disableAnalyticsCookies()` 仍是预留占位函数
- 所以表格中分析/营销的 `✅* / ❌*` 只是逻辑层预留，并非已有真实第三方脚本切换

---

## 5. 合规性审查

### 5.1 当前版本的合规定位

当前实现适用于：

- 主要展示型官网
- 尚未接入 Google Analytics / Pixel / Hotjar / Clarity / 广告追踪
- 需要提供基础 Cookie 提示、隐私说明与重开设置入口

### 5.2 当前已满足的点

| 项目 | 状态 | 说明 |
|------|:----:|------|
| 有 Cookie 横幅 | ✅ | 首次访问时展示 |
| 有拒绝入口 | ✅ | 提供“仅必要 Cookie” |
| 有重开入口 | ✅ | 页脚 `Cookie 设置` 可重新打开 |
| 有隐私页 | ✅ | 已存在 `/[locale]/privacy-policy` |
| 隐私页可由 CMS 控制正文 | ✅ | `legalText` 已接入 |
| 多语言支持 | ✅ | Cookie 与隐私页均支持中英日 |

### 5.3 当前仍存在的边界

| 项目 | 状态 | 说明 |
|------|:----:|------|
| 细粒度分类开关 | ❌ | 当前只有 accepted / rejected 两态 |
| 真正的 analytics 阻止与放行 | ⚠️ | 预留接口存在，但尚无真实脚本接入 |
| 完整 Cookie 清单页 | ❌ | 目前隐私页为说明型，不是严格清单型 |
| 第三方追踪披露机制 | ⚠️ | 未来若接入第三方统计/营销工具，需要补充 |

---

## 6. 当前结论

### 6.1 是否合理

**合理。**

对当前这个尚未接入统计/营销追踪脚本的官网来说，这套实现是成立的：

- 结构清晰
- CMS 可维护
- 用户可以重新修改 Cookie 选择
- 隐私页可以真正由 CMS 控制

### 6.2 是否足够

**对当前站点足够，对未来增长场景不完全足够。**

如果后续需要面向海外正式部署，并接入：

- Google Analytics
- Meta Pixel
- 广告归因
- 热图 / 行为分析

那就必须进一步升级为：

- 先阻止脚本加载
- 用户同意后再启用
- 按分类控制 consent

---

## 7. 后续建议

### 建议保留现状的部分

- 保留当前 Cookie 横幅两按钮结构
- 保留页脚的 `Cookie 设置`
- 保留 `privacyPolicyLink` 的多语言 CMS 配置
- 保留 `legalText` 作为隐私页 CMS 正文

### 后续如果继续增强，优先级建议

1. 接入真实 analytics 前，先实现“按 consent 延迟加载脚本”
2. 如确实需要更高合规级别，再做分类级设置面板
3. 若面向欧盟市场并有更多第三方工具，再补充完整 Cookie 清单与第三方披露

---

## 8. 相关文件

| 文件 | 说明 |
|------|------|
| `src/payload/globals/SiteSettings.ts` | Cookie 与隐私页 CMS schema |
| `src/components/Common/CookieConsent.tsx` | Cookie 横幅 |
| `src/components/Common/CookiePreferencesButton.tsx` | Cookie 设置重开入口 |
| `src/components/Footer/index.tsx` | 页脚隐私链接与 Cookie 设置入口 |
| `src/lib/cookieConsent.ts` | 同意状态与工具函数 |
| `src/app/[locale]/privacy-policy/page.tsx` | 隐私页 |
| `scripts/payload/seed.ts` | Cookie 默认 seed |
| `scripts/payload/fix-lexical.ts` | `legalText` 兜底修复脚本 |

---

> 文档最后更新：2026-04-11
