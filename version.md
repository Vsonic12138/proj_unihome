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
