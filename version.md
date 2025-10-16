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
