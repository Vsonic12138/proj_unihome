# 正式上线状态检查记录

检查日期：2026-05-09  
目标域名：`https://unitc.cn/`  
ICP备案号：`京ICP备2026020664号`  
备案审核通过日期：2026-04-21

本文档记录 `unitc.cn` 正式上线过程中的检查结果、已执行操作、问题处理和后续待办。

补充检查日期：2026-05-10

## 当前结论

官网已经可以通过 `https://unitc.cn/` 访问，主域页面、后台、媒体、`robots.txt`、`sitemap.xml` 和 `manifest.webmanifest` 当前均可正常返回。`www.unitc.cn` 已配置为 301 跳转到主域。

工单提交链路已经完成生产配置：Cloudflare Turnstile 服务端校验已生效，阿里云 Direct Mail SMTP 已完成真实发信验证，官网风格邮件模板已随应用更新发布。

本次已完成：

- 手动备份生产数据库和媒体目录。
- 执行 `npm run deploy:aliyun:update`，保留线上数据库和媒体，仅更新应用镜像。
- 修复 `robots.txt`、`sitemap.xml`、页面 SEO 元数据中错误输出 `http://localhost:3005` 的问题。
- 补齐生产数据库中当前代码需要但线上缺失的字段。
- 在 CMS 中填写并验证 ICP 备案号和公安联网备案号。
- 修改 Nginx 配置，将 `www.unitc.cn` 301 跳转到 `unitc.cn`。
- 增加生产 Nginx 保守限流，保护全站、后台、API 和工单提交接口。
- 补齐 `/opt/proj_unihome/deploy/backup.sh`，并通过 `backup.sh check` 验证。
- 配置并验证工单 Cloudflare Turnstile 人机验证。
- 配置并验证阿里云 Direct Mail SMTP 工单邮件通知。
- 更新工单邮件模板为官网风格 HTML 邮件，并完成应用更新发布。
- 复查最近应用日志，未再出现 missing column / Failed query / ERROR。

当前仍需处理：

- 提交 `https://unitc.cn/sitemap.xml` 到站长平台。
- 可选：增加定时备份、站点监控、SSL 证书到期提醒和 CDN/WAF。

## 已执行操作

### 1. 生产数据备份

执行位置：阿里云 ECS `/opt/proj_unihome`

已执行数据库备份：

```bash
mkdir -p /opt/proj_unihome/backups

docker exec proj_unihome_postgres pg_dump \
  -U proj_unihome \
  -d proj_unihome \
  -Fc \
  | gzip > /opt/proj_unihome/backups/db_backup_$(date +%Y%m%d_%H%M%S).dump.gz
```

已执行媒体目录备份：

```bash
tar -czf /opt/proj_unihome/backups/media_backup_$(date +%Y%m%d_%H%M%S).tar.gz \
  -C /opt/proj_unihome media
```

已确认备份文件：

```text
/opt/proj_unihome/backups/db_backup_20260509_163353.dump.gz
/opt/proj_unihome/backups/media_backup_20260509_163411.tar.gz
```

备份大小：

```text
db_backup_20260509_163353.dump.gz      1.6M
media_backup_20260509_163411.tar.gz    321M
```

### 2. 执行代码更新发布

执行位置：本地 WSL 项目目录

执行命令：

```bash
npm run deploy:aliyun:update
```

发布过程确认：

- 本地构建 update 部署包。
- 构建 origin 使用远程已有配置：`https://unitc.cn`。
- 上传 `proj-unihome-deploy-bundle.tar.gz` 到阿里云。
- 服务器执行 `deploy.sh update`。
- 仅重建并启动 `proj_unihome_app`。
- 未恢复数据库。
- 未覆盖媒体目录。
- 未覆盖 `shared/.env.production`。

发布输出中确认：

```text
[info] Reuse remote NEXT_PUBLIC_SERVER_URL=https://unitc.cn for build
[info] Keep existing NEXT_PUBLIC_SERVER_URL=https://unitc.cn
更新应用（仅重启 app，不动 postgres/db/media）
update 完成
```

### 3. 修复生产数据库缺失字段

更新后应用日志出现 missing column 错误：

```text
column site_settings.icp_number does not exist
column footer__locales.legal_privacy_policy_label does not exist
```

根因：

```text
本地代码已包含新的 Payload 字段，但线上数据库尚未执行对应 schema 迁移。
```

尝试在 app 容器内执行：

```bash
npx payload migrate
```

失败原因：

```text
运行镜像是 Next standalone 运行镜像，不包含完整源码迁移文件。
npx 尝试联网下载 payload，并因 nextjs 用户无 /home/nextjs 写入权限失败。
```

已在生产数据库执行只增字段的 schema 补丁：

```sql
BEGIN;

ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS icp_number varchar,
  ADD COLUMN IF NOT EXISTS icp_link varchar,
  ADD COLUMN IF NOT EXISTS psb_number varchar,
  ADD COLUMN IF NOT EXISTS psb_icon_id integer;

ALTER TABLE footer_locales
  ADD COLUMN IF NOT EXISTS legal_privacy_policy_label varchar,
  ADD COLUMN IF NOT EXISTS legal_cookie_settings_label varchar;

UPDATE footer_locales
SET
  legal_privacy_policy_label = COALESCE(
    legal_privacy_policy_label,
    CASE _locale
      WHEN 'zh' THEN '隐私与 Cookie 政策'
      WHEN 'en' THEN 'Privacy & Cookie Policy'
      WHEN 'ja' THEN 'プライバシー・Cookie ポリシー'
      ELSE 'Privacy & Cookie Policy'
    END
  ),
  legal_cookie_settings_label = COALESCE(
    legal_cookie_settings_label,
    CASE _locale
      WHEN 'zh' THEN 'Cookie 设置'
      WHEN 'en' THEN 'Cookie Settings'
      WHEN 'ja' THEN 'Cookie 設定'
      ELSE 'Cookie Settings'
    END
  );

CREATE INDEX IF NOT EXISTS site_settings_psb_icon_idx
  ON site_settings USING btree (psb_icon_id);

COMMIT;
```

已复查字段存在：

```text
site_settings:
- icp_link
- icp_number
- psb_icon_id
- psb_number

footer_locales:
- legal_cookie_settings_label
- legal_privacy_policy_label
```

### 4. 填写并验证备案信息

已在 CMS 中填写备案信息。

公网首页 HTML 已检出：

```text
京ICP备2026020664号
京公网安备11010702003097号
```

公网首页 HTML 已检出备案链接：

```text
beian.miit.gov.cn
beian.mps.gov.cn
```

复查命令：

```bash
curl -sS -L https://unitc.cn/zh \
  | grep -o '京ICP备[0-9]*号\|京公网安备[0-9]*号\|beian.miit.gov.cn\|beian.mps.gov.cn\|localhost:3005' \
  | sort \
  | uniq -c
```

复查结果：

```text
2 beian.miit.gov.cn
1 beian.mps.gov.cn
2 京ICP备2026020664号
2 京公网安备11010702003097号
```

未检出：

```text
localhost:3005
```

### 5. 配置 www 跳转到主域

修改前状态：

```text
https://www.unitc.cn/ -> 307 /zh -> 200
```

问题：

```text
www.unitc.cn 直接服务页面，未归一到主域。
```

修改前 Nginx 配置中存在：

```nginx
server_name unitc.cn www.unitc.cn;
```

已备份原配置：

```text
/etc/nginx/sites-available/proj_unihome.bak.20260509_174413
```

已将 `/etc/nginx/sites-available/proj_unihome` 改为主域和 `www` 分离：

```nginx
server {
    listen 443 ssl;
    server_name www.unitc.cn;

    ssl_certificate /etc/letsencrypt/live/unitc.cn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/unitc.cn/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://unitc.cn$request_uri;
}

server {
    listen 443 ssl;
    server_name unitc.cn;

    ssl_certificate /etc/letsencrypt/live/unitc.cn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/unitc.cn/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        client_max_body_size 100m;
        proxy_connect_timeout 60s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }
}

server {
    listen 80;
    server_name www.unitc.cn;
    return 301 https://unitc.cn$request_uri;
}

server {
    listen 80;
    server_name unitc.cn;
    return 301 https://unitc.cn$request_uri;
}
```

已执行：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

验证结果：

```text
https://www.unitc.cn/ -> 301 Location: https://unitc.cn/
http://www.unitc.cn/  -> 301 Location: https://unitc.cn/
https://unitc.cn/     -> 307 /zh -> 200 OK
https://www.unitc.cn/ -> 301 https://unitc.cn/ -> 307 /zh -> 200 OK
```

### 6. 补齐生产备份脚本

修改前状态：

```text
/opt/proj_unihome/deploy/backup.sh 不存在
```

已从本地同步脚本：

```bash
scp ops/deploy/backup.sh aliyun:/opt/proj_unihome/deploy/backup.sh
ssh aliyun 'chmod +x /opt/proj_unihome/deploy/backup.sh'
```

已执行检查：

```bash
ssh aliyun 'cd /opt/proj_unihome/deploy && bash backup.sh check'
```

检查结果：

```text
==> check 通过
-rwxr-xr-x 1 1000 1000 3785 May  9 17:52 backup.sh
```

说明：

```text
标准备份入口已补齐。后续可在服务器 /opt/proj_unihome/deploy 下执行 bash backup.sh run。
```

## 当前检查结果

### 服务器连接与目录状态

当前通过 SSH 主机别名连接：

```bash
ssh aliyun
```

当前服务器主机名：

```text
iZ7xve7u43k63e4v5fxl5lZ
```

当前检查时的登录用户：

```text
root
```

生产部署根目录：

```text
/opt/proj_unihome
```

当前 `/opt/proj_unihome` 目录结构：

```text
backups
deploy
deploy.prev
media
postgres-data
proj-unihome-deploy-bundle.tar.gz
shared
```

当前目录状态摘要：

```text
/opt/proj_unihome/backups        生产备份目录
/opt/proj_unihome/deploy         当前生效部署目录
/opt/proj_unihome/deploy.prev    上一版部署目录
/opt/proj_unihome/media          Payload 媒体目录
/opt/proj_unihome/postgres-data  PostgreSQL 数据目录
/opt/proj_unihome/shared         生产环境变量目录
```

当前 `/opt/proj_unihome/deploy` 中的关键文件：

```text
backup.sh
compose.prod.yml
deploy.sh
proj-unihome-app.tar.gz
RELEASE.json
SHA256SUMS
```

当前部署包大小：

```text
/opt/proj_unihome/proj-unihome-deploy-bundle.tar.gz  约 144MB
```

### 主域访问

`https://unitc.cn/`：

```text
307 -> /zh
200 OK
```

`https://unitc.cn/zh`：

```text
200 OK
```

`https://unitc.cn/zh/contact`：

```text
200 OK
```

`https://unitc.cn/admin`：

```text
200 OK
```

`https://unitc.cn/manifest.webmanifest`：

```text
200 OK
```

### www 跳转

`https://www.unitc.cn/`：

```text
301 -> https://unitc.cn/
```

`http://www.unitc.cn/`：

```text
301 -> https://unitc.cn/
```

`https://www.unitc.cn/` 跟随跳转：

```text
301 -> https://unitc.cn/ -> 307 /zh -> 200 OK
```

### SEO 文件

`https://unitc.cn/robots.txt` 当前输出：

```text
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://unitc.cn/sitemap.xml
```

`https://unitc.cn/sitemap.xml` 当前已输出正式域名：

```xml
<loc>https://unitc.cn/zh</loc>
<xhtml:link rel="alternate" hreflang="zh" href="https://unitc.cn/zh" />
<xhtml:link rel="alternate" hreflang="en" href="https://unitc.cn/en" />
<xhtml:link rel="alternate" hreflang="ja" href="https://unitc.cn/ja" />
```

### 容器状态

服务器容器状态：

```text
proj_unihome_app        running
proj_unihome_postgres   running / healthy
```

当前 `bash deploy.sh ps` 输出摘要：

```text
proj_unihome_app        proj-unihome-app:production   Up About an hour   127.0.0.1:3005->3000/tcp
proj_unihome_postgres   postgres:16                   Up 3 weeks         5432/tcp / healthy
```

说明：

```text
应用只绑定在服务器本机 127.0.0.1:3005，由 Nginx 对外反向代理。
PostgreSQL 未直接暴露公网端口。
```

### 生产环境变量

已确认：

```env
NEXT_PUBLIC_SERVER_URL=https://unitc.cn
PAYLOAD_SCHEMA_PUSH=false
DATABASE_URI=postgresql://proj_unihome:***@postgres:5432/proj_unihome
```

### 备份脚本状态

当前 `/opt/proj_unihome/deploy/backup.sh` 已存在：

```text
-rwxr-xr-x 1 1000 1000 3785 May  9 17:52 backup.sh
```

当前检查结果：

```bash
cd /opt/proj_unihome/deploy
bash backup.sh check
```

输出：

```text
==> check 通过
```

### 最近应用日志

补齐字段后复查最近 5 分钟日志：

```text
未检出 missing column
未检出 Failed query
未检出 ERROR
未检出 500
```

### Nginx 限流配置

配置时间：2026-05-09 19:06-19:45 CST

修改前已备份：

```text
/etc/nginx/nginx.conf.bak.20260509_190417
/etc/nginx/sites-available/proj_unihome.bak.20260509_190417
```

当前已在 `/etc/nginx/nginx.conf` 中配置限流 zone：

```nginx
limit_req_zone $binary_remote_addr zone=site_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=5r/s;
limit_req_zone $binary_remote_addr zone=cms_api_limit:10m rate=30r/s;
limit_req_zone $binary_remote_addr zone=admin_limit:10m rate=3r/s;
limit_req_zone $binary_remote_addr zone=form_limit:10m rate=2r/m;
limit_req_status 429;
```

当前已在 `/etc/nginx/sites-available/proj_unihome` 中配置路径级限流：

```text
/api/public/tickets   form_limit    burst=3
/api/media/file/      no limit
/api/media            cms_api_limit burst=120
/api/media/           cms_api_limit burst=120
/api/mediaFolders     cms_api_limit burst=60
/admin                admin_limit   burst=10
/api/                 api_limit     burst=20
/                     site_limit    burst=30
```

说明：

```text
Payload 媒体文件读取不套用通用 API 限流，避免 CMS 媒体库批量缩略图加载触发 429。
CMS 媒体管理接口使用较宽松的 cms_api_limit。
Nginx 限流命中时返回 429 Too Many Requests。
```

已执行校验：

```bash
nginx -t
systemctl reload nginx
```

校验结果：

```text
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

公网验证结果：

```text
https://unitc.cn/           307 -> /zh -> 200
https://unitc.cn/zh         200
https://unitc.cn/admin      200
https://unitc.cn/robots.txt 200
https://unitc.cn/sitemap.xml 200
https://www.unitc.cn/       301 -> https://unitc.cn/
```

限流验证结果：

```text
连续 5 次访问 https://unitc.cn/zh 均返回 200。
连续 8 次 POST /api/public/tickets，前 4 次由应用返回 400，后续请求被 Nginx form_limit 拦截。
调整 limit_req_status 后，限流命中按 429 Too Many Requests 返回。
```

最近应用日志复查：

```text
最近 5 分钟未检出 Failed query
最近 5 分钟未检出 missing column
最近 5 分钟未检出 500
```

### 8. 配置工单 Turnstile 验证码

配置时间：2026-05-09 至 2026-05-10

当前工单提交接口已经接入 Cloudflare Turnstile。

生产环境变量已配置：

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
```

当前验证链路：

```text
联系表单 Turnstile Widget
-> POST /api/public/tickets
-> Cloudflare Turnstile siteverify
-> 应用内 spam protection
-> Payload tickets collection
-> 工单邮件通知
```

服务端当前校验：

- `captchaToken` 必须存在。
- Cloudflare `siteverify` 必须返回 `success=true`。
- `hostname` 必须匹配 `NEXT_PUBLIC_SERVER_URL` 的 hostname。
- `action` 必须匹配 `ticket_submit`。

已执行公网验证：

```bash
curl -sS -X POST https://unitc.cn/api/public/tickets \
  -H 'Content-Type: application/json' \
  --data '{"name":"测试","phone":"13800000000","intention":"上线审查"}'
```

返回结果：

```json
{
  "ok": false,
  "code": "missing_captcha_token"
}
```

说明：

```text
未带验证码 token 的公网工单提交已经被服务端拒绝。
```

详细机制见：

```text
docs/turnstile-ticket-verification.md
```

### 9. 配置工单邮件通知

配置时间：2026-05-09 至 2026-05-10

当前官网工单邮件通知已经接入阿里云 Direct Mail SMTP。

当前生产配置：

```env
SMTP_HOST=smtpdm.aliyun.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tickets@notify.unitc.cn
SMTP_PASS=<阿里云 Direct Mail SMTP 密码>
TICKET_EMAIL_TO=1373912749@qq.com
TICKET_EMAIL_FROM=UniHome Website <tickets@notify.unitc.cn>
```

当前阿里云 Direct Mail 状态：

- 发信域名 `notify.unitc.cn` 已验证通过。
- 发信地址 `tickets@notify.unitc.cn` 已用于真实工单发信。
- `465` SSL SMTP 已完成真实发信验证。
- 工单邮件已经成功投递到 `1373912749@qq.com`。

邮件模板已更新为官网风格：

- 中文主题：`【官网工单】客户姓名 - 合作意向`
- HTML 邮件使用官网暖橙强调色 `#ff6b35`
- 客户信息、留言内容和工单信息分区展示
- 技术信息弱化展示
- 用户输入在 HTML 邮件中进行转义

说明：

```text
SMTP 密码属于敏感信息，不写入文档和 Git。
```

详细机制见：

```text
docs/mail-service.md
```

### 10. 修复 CMS 媒体上传权限

修复时间：2026-05-10

问题现象：

```text
CMS 媒体库上传图片时 POST /api/media 返回 400 Bad Request。
```

生产应用日志显示：

```text
EACCES: permission denied, open 'media/公安网备案图标'
上传文件时出现了问题。
```

根因：

```text
应用容器运行用户为 nextjs:nodejs (1001:1001)，但 /app/media 挂载目录属主不是 1001:1001，容器内无法写入媒体文件。
```

已执行修复：

```bash
chown -R 1001:1001 /opt/proj_unihome/media
find /opt/proj_unihome/media -type d -exec chmod 755 {} +
find /opt/proj_unihome/media -type f -exec chmod 644 {} +
```

已验证：

```text
容器内 /app/media 可创建并删除测试文件。
现有媒体文件 https://unitc.cn/api/media/file/swing-1.png 返回 200。
```

后续恢复媒体备份或手动同步媒体目录后，应复查 `/opt/proj_unihome/media` 属主和写权限。

## 仍需处理的问题

### 1. 提交 sitemap 到站长平台

当前 `https://unitc.cn/sitemap.xml` 已正常输出正式域名。

仍建议提交到：

- 百度搜索资源平台
- Google Search Console
- Bing Webmaster Tools

这不是官网正式上线的阻塞项，但有助于搜索引擎发现页面。

### 2. 运维增强项

以下事项不阻塞当前正式上线，但建议后续补齐：

- 配置定时备份任务，定期执行 `/opt/proj_unihome/deploy/backup.sh run`。
- 增加站点可用性监控，覆盖首页、联系页、后台登录页和工单接口。
- 增加 SSL 证书到期提醒。
- 根据后续访问量评估 CDN/WAF。

## 后续建议顺序

1. 提交 `https://unitc.cn/sitemap.xml` 到站长平台。
2. 配置定时备份和站点监控。
3. 根据访问量评估 CDN/WAF。

## 当前上线判断

当前状态：

```text
网站主域已可正常访问，SEO 域名问题已修复，数据库 schema 已补齐，工单验证码和邮件通知已完成生产验证。
```

当前判断：

```text
已满足正式上线官网的基础要求。
```

剩余事项主要是搜索收录和运维增强，不阻塞官网正式运行。
