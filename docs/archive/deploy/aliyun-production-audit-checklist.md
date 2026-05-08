# 阿里云 ECS 正式上线审查列表（unitc.cn）

> 适用项目：本仓库（Next.js App Router + Payload CMS + Postgres）  
> 目标域名：`https://unitc.cn/`（当前：备案中）  
> 说明：本表用于上线前/上线后验收。将“当前情况”更新为你的真实状态，并按“处理/下一步”逐项闭环。

## 当前已知信息（已填）

- ECS 公网 IP：`8.163.85.108`
- 已执行：`npm run deploy:aliyun:bootstrap`、`npm run deploy:aliyun:init`

## 域名策略（已确认）

- 主站（canonical）：`https://unitc.cn`
- 兼容入口：`https://www.unitc.cn`（**301 跳转**到 `https://unitc.cn`）
- i18n 路由：访问根域会按浏览器语言/默认语言跳转到 `https://unitc.cn/zh`、`/en`、`/ja`（本项目预期行为）

## 审查表（上线准备）

| 模块 | 审查项 | 标准/期望 | 当前情况 | 处理/下一步 |
|---|---|---|---|---|
| 备案 | ICP 备案完成 | 备案通过后再用域名对外提供服务 | 备案中 | 备案未完成前仅用 `http://ECS公网IP` 验收 |
| DNS | `unitc.cn` A 记录 | `@` 指向 ECS 公网 IP | 已完成 | 保持：`@ -> 8.163.85.108` |
| DNS | `www.unitc.cn` A 记录 | `www` 指向 ECS 公网 IP（并做 301） | 已完成 | 保持：`www -> 8.163.85.108`（Nginx 将 `www` 301 到根域） |
| 安全组 | 入方向 22 | 允许 SSH | 待确认 | 放行 `22/tcp` |
| 安全组 | 入方向 80 | 允许 HTTP | 待确认 | 放行 `80/tcp`（证书签发/跳转需要） |
| 安全组 | 入方向 443 | 允许 HTTPS | 待确认 | 放行 `443/tcp` |
| 反代 | Nginx 已安装并运行 | `nginx -t` 通过，服务启用 | 已执行 bootstrap（待在服务器确认） | 登录服务器运行 `nginx -t`、`systemctl status nginx` |
| 反代 | Nginx 反代到应用 | `proxy_pass http://127.0.0.1:3005` | 已执行 bootstrap（待在服务器确认） | 检查 `/etc/nginx/sites-available/proj_unihome` 并 `curl -I http://127.0.0.1` |
| HTTPS | 证书签发 | Let’s Encrypt 或阿里云 SSL 可用 | 待确认（备案后） | 备案通过后签发；80 需可访问用于验证 |
| Docker | Docker/Compose 可用 | `docker version` / `docker compose version` 正常 | 已执行 bootstrap（待在服务器确认） | 登录服务器运行 `docker version`、`docker compose version` |
| 数据库 | Postgres 容器健康 | `proj_unihome_postgres` 为 `healthy` | 已执行 init（待在服务器确认） | 在 `/opt/proj_unihome/deploy` 运行 `bash deploy.sh ps` |
| 应用 | App 容器运行 | `proj_unihome_app` 为 `running` | 已执行 init（待在服务器确认） | 在 `/opt/proj_unihome/deploy` 运行 `bash deploy.sh logs app` |
| 端口 | 仅本机暴露 3005 | 生产仅 `127.0.0.1:3005:3000`（不对公网开 3005） | 代码已符合 | 无需对外开放 3005 |
| 环境变量 | `PAYLOAD_SECRET` | 生产必填 | 待确认 | 写入 `/opt/proj_unihome/shared/.env.production` |
| 环境变量 | `DATABASE_URI` | 生产必填；建议指向 `postgres` service | 待确认 | 写入 shared env；与 `compose.prod.yml` 匹配 |
| 环境变量 | `NEXT_PUBLIC_SERVER_URL`（IP 阶段） | `http://ECS公网IP` | 建议设为 `http://8.163.85.108` | 写入 `shared/.env.production` 后执行 `bash deploy.sh update` |
| 环境变量 | `NEXT_PUBLIC_SERVER_URL`（域名阶段） | `https://unitc.cn` | 待确认（备案后） | 备案通过后改为域名并 `bash deploy.sh update` |
| 构建 | 构建期 origin 正确 | 部署脚本传 `--domain unitc.cn` 或 `--origin https://unitc.cn` | 待确认 | 建议首次上线也传，避免 `next/image` allowlist 不匹配 |
| i18n | locale 强制前缀 | 根域跳转到 `/zh`、`/en`、`/ja` | 代码已符合 | 符合预期访问行为 |
| SEO | `robots.txt` | 生产允许抓取，禁止 `/api/`、`/admin/` | 代码已实现 | 上线后访问 `/robots.txt` 验证 |
| SEO | `sitemap.xml` | 生成成功，包含多语言路由 | 代码已实现 | 上线后访问 `/sitemap.xml` 验证 |
| 内容 | 动态内容进入 sitemap | Payload 可连通且内容为 `published` | 待确认 | 上线后确保发布；必要时执行 `npm run cms:publish:all` |
| 合规 | 页脚备案号/链接 | ICP/公网安备案信息可配置展示 | 代码已实现 | 备案通过后在 CMS SiteSettings 填真实备案号/链接 |
| 站长平台 | 提交站点/站点地图 | 提交 `https://unitc.cn/sitemap.xml` | 未做 | 上线后到各站长平台提交 |
| 观测 | 日志可查看 | 能快速定位 502/DB 连接等问题 | 待确认 | 使用 `bash deploy.sh logs app` / `bash deploy.sh logs postgres` |

## 上线后最小验收 URL（建议逐条打勾）

备案未完成（IP 阶段）：
- `http://8.163.85.108/robots.txt`
- `http://8.163.85.108/sitemap.xml`
- `http://8.163.85.108/zh`
- `http://8.163.85.108/en`
- `http://8.163.85.108/ja`

备案完成（域名阶段）：
- `https://unitc.cn/robots.txt`
- `https://unitc.cn/sitemap.xml`
- `https://unitc.cn/zh`
- `https://unitc.cn/en`
- `https://unitc.cn/ja`
- `https://unitc.cn/media/...`（随机打开一张媒体，确认不 404/不被拦）
