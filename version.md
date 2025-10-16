# 更新日志

记录更新内容，提交的时候无需将日期一起放入commit当中。

**更新类型说明：**
- 类型(type)：
  - feat: 功能变更（新增/修改功能）
  - remove: 删除内容（文件/代码/资源）
  - refactor: 代码重构（结构调整/优化）
  - docs: 文档相关（README/注释/手册）
  - fix: 问题修复（BUG/逻辑错误）
  - ui: 界面调整（布局/样式/交互）
  - chore: 日常维护（构建/配置/清理）
  - test: 测试相关（用例/框架）

**版本规则：**

版本格式: `V{主版本}.{次版本}.{修订版本}`

**版本号说明**:
- 主版本: 当做出不兼容的 API 修改或重大功能变更时递增
- 次版本: 当以向后兼容的方式添加功能时递增
- 修订版本: 当进行向后兼容的问题修复时递增

**版本升级规则**:
- 修订版本 `V1.0.1`: 修复小问题、安全性更新
- 次版本 `V1.1.0`: 添加向后兼容的新功能
- 主版本 `V2.0.0`: 重大功能更新、不兼容的API变更

**注意事项**:
- 版本号严格按照语义化版本规范执行
- 每次发布新版本时，至少递增一个数字
- 首次发布版本号从 `V1.0.0` 开始

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
3. 交互组件国际化
    - 新增 LocaleSwitcher 并嵌入导航栏，实现语言切换、Cookie 记忆与页面刷新。
    - 更新博客、定价、视频、页头页脚等组件，使按钮标签、ARIA 文案、分页等均来自词典数据。
4. 无障碍与工程细节
    - 将 ScrollToTop 改为 <button>，补齐键盘可达性与聚焦样式。
    - .gitignore 新增 *.tsbuildinfo，避免 TypeScript 增量编译文件入库。
    - 自动生成的 next-env.d.ts 及其路由声明保持同步。

文件变更:

- 新增: src/app/[locale]/...、src/app/about/AboutContent.tsx、src/app/contact/ContactContent.tsx、src/app/blog-details/BlogDetailsContent.tsx、src/app/blog-sidebar/BlogSidebarContent.tsx、src/app/signin/
  SigninContent.tsx、src/app/signup/SignupContent.tsx
- 新增: src/i18n/config.ts、src/i18n/locales/{en,zh,ja}.ts、src/i18n/utils.ts、src/components/Header/LocaleSwitcher.tsx、src/middleware.ts、version.md
- 修改: src/app/layout.tsx、src/app/providers.tsx、src/components/* 大量组件的文案来源与参数签名
- 修改: .gitignore（忽略 *.tsbuildinfo）
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
