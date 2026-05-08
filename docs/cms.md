# CMS

本文档说明当前仓库中的 Payload CMS 结构，以及常用的内容脚本和运维命令。

## 当前结论

当前仓库已经将官网主要内容纳入 Payload CMS 管理。

- 后台地址：`/admin`
- API 地址：`/api/*`

## 内容结构

当前主要 collections：

- `users`
- `mediaFolders`
- `media`
- `pages`
- `productSeries`
- `products`
- `faq`
- `caseStudies`
- `tickets`

当前主要 globals：

- `siteSettings`
- `navigation`
- `footer`

## 常用脚本

检查类：

```bash
npm run cms:check:db          # 检查与 PostgreSQL 数据库的连接是否正常
npm run cms:check:pages       # 检查 pages 集合是否存在，通常用于验证基础数据
npm run cms:check:home        # 检查中文首页 (slug: home) 是否已创建
npm run cms:check:products    # 检查产品 (products) 数据是否正常载入
```

种子与初始化：

```bash
npm run cms:seed:base           # 从 messages/*.json 注入基础数据（用户、全局设置、导航、核心页面等）
npm run cms:seed:images         # 注入演示媒体文件到 media 集合
npm run cms:seed:cases          # 注入案例研究 (caseStudies) 的演示数据
npm run cms:seed:knowledge-base # 注入 FAQ 和开发者知识库演示数据
```

发布类：

```bash
npm run cms:publish:all       # 将所有处于草稿 (draft) 状态的页面、产品和案例设为发布 (published)
npm run cms:publish:pages     # 仅发布处于草稿状态的页面
npm run cms:publish:products  # 仅发布处于草稿状态的产品
npm run cms:publish:cases     # 仅发布处于草稿状态的案例研究
```

快照与恢复：

```bash
npm run cms:snapshot:export   # 导出当前 CMS 的 JSON 内容快照到 backups/ 目录
npm run cms:snapshot:restore  # 从 backups/ 目录的最新快照恢复 CMS 内容
npm run cms:backup:local      # 执行本地备份，包含数据库 dump 和 CMS 内容快照
```

## 工单提交

站点公开工单当前统一走：

```text
POST /api/public/tickets
```

请求通过校验后写入 `tickets` collection，并根据环境配置发送邮件通知。
