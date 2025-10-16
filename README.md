# Startup Next.js 国际化官网模板

面向初创企业与 SaaS 产品的多语言官网模板，基于 **Next.js App Router + Tailwind CSS v4 + TypeScript** 构建。项目已内置中/英/日三种语言的完整内容与路由结构，并在保持原有视觉设计的基础上，强化了 SEO、无障碍体验以及组件可维护性。

> 当前版本：详见 `version.md`

---

## ✨ 功能亮点

- **多语言路由体系**：通过 `src/middleware.ts` 自动识别语言，所有页面位于 `/[locale]` 路径下，可直接生成静态页面。
- **词典驱动的文案管理**：统一在 `src/i18n/locales` 中维护多语言内容，新增语言只需新增词典文件。
- **组件级国际化支持**：导航栏、页脚、表单、弹窗、博客等模块全部支持动态文案与辅助标签（ARIA label）。
- **深色模式与主题切换**：延续原有 UI，并优化 `ThemeToggler` 的水合表现。
- **无障碍优化**：回到顶部按钮等交互改造为可聚焦按钮，完全支持键盘操作。
- **前后端分离部署友好**：纯前端静态站点，可直接部署到 Vercel、Netlify、静态主机或任何 CDN。

---

## 🛠 技术栈

| 分类       | 技术/工具                        |
| ---------- | -------------------------------- |
| 前端框架   | Next.js 15（App Router）         |
| 语言       | TypeScript 5                     |
| UI / 样式  | Tailwind CSS v4、CSS Modules     |
| 状态管理   | React Hooks                      |
| 主题切换   | next-themes                      |
| 代码质量   | ESLint、Prettier                 |

---

## 🚀 快速开始

> 请确保 Node.js ≥ 18.17.0（Next.js 15 官方要求）。以下命令默认使用 `npm`，也可根据习惯改用 `pnpm` / `yarn`。

```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发服务
npm run dev

# 3. 访问地址
# 浏览器打开 http://localhost:3000
```

生产构建与预览：

```bash
npm run build   # 生成产物
npm run start   # 以生产模式启动本地服务
```

代码规范检查：

```bash
npm run lint
```

---

## 🌐 国际化指南

- **语言列表**：`src/i18n/config.ts` 中的 `SUPPORTED_LOCALES` 与 `DEFAULT_LOCALE`。
- **词典文件**：位于 `src/i18n/locales/{en,zh,ja}.ts`，使用对象结构统一管理页面与组件文案。
- **路由结构**：所有页面在 `src/app/[locale]/` 下注册，`generateStaticParams` 会自动针对每种语言生成静态路径。
- **语言切换**：`src/components/Header/LocaleSwitcher.tsx` 提供下拉切换，并将用户选择写入 Cookie（名称 `startup-nextjs-language`）。
- **新增语言步骤**：
  1. 在 `config.ts` 中添加语言代码与词典加载器；
  2. 新建词典文件，参考现有结构补齐内容；
  3. 更新 `LocaleSwitcher` 选项；
  4. 视需要补充新的页面静态资源或文案。

---

## 📁 主要目录结构

```
├─ src/
│  ├─ app/
│  │  ├─ [locale]/             # 多语言路由
│  │  ├─ about/                # 内容组件（无路由）
│  │  ├─ blog/                 # 博客内容组件
│  │  ├─ contact/              # 联系我们内容组件
│  │  ├─ error/                # 404/错误页内容组件
│  │  ├─ signin/ signup/       # 认证页面内容组件
│  │  └─ providers.tsx         # 全局 Provider（主题等）
│  ├─ components/              # 通用组件
│  ├─ i18n/                    # 国际化配置与词典
│  ├─ styles/                  # 全局样式
│  └─ middleware.ts            # 语言重定向
├─ public/                     # 静态资源
├─ .gitignore
├─ package.json
├─ README.md
└─ version.md
```

---

## ⚙️ 常用配置说明

- **环境变量**：默认无需额外配置。如需注入分析工具或 API 地址，可在根目录创建 `.env.local` 并通过 `process.env` 读取。
- **Tailwind 配置**：使用 v4 原生 `tailwind.config`。如需扩展设计系统，可在 `src/styles/index.css` 或 `postcss` 管道中调整。
- **多语言 SEO**：Next.js 会基于 `[locale]` 生成静态路由。若部署到自定义域名，建议在 `next.config.js` 中添加 `<link rel="alternate" hrefLang>` 等高级配置。

---

## 👩‍💻 开发规范

1. **TypeScript**：所有新组件优先使用 TS/TSX，并补全类型定义。
2. **组件拆分**：与语言相关的展示逻辑统一接收词典 `props`，避免硬编码文案。
3. **无障碍**：交互组件必须包含合适的 ARIA 属性与键盘支持。
4. **提交日志**：按照 `version.md` 维护语义化版本与 commit 信息。

---

## 📦 部署建议

- **Vercel（推荐）**：直接使用 Vercel Dashboard 导入仓库即可，支持按语言的静态导出与动态路由。
- **Netlify / 静态空间**：执行 `npm run build` 后，上传 `.next` 产物并配置 Node 运行时或使用 `next export`（如后续提供 CSR 版本）。
- **自托管**：通过 Docker/Nginx 部署时，记得转发所有未知路由到 Next.js 应用，以便国际化中间件生效。

---

## 📄 许可

本项目基于原仓库的开源模板进行二次开发，延续原模板许可协议（MIT）。如在商业项目中使用，请保留相关版权信息。

---

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- 原模板作者 [NextJSTemplates](https://nextjstemplates.com/)
  
如果这个模板对你的项目有所帮助，欢迎 Star ⭐️ 支持我们。

