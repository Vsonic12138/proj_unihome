# 邮件服务

本文档说明当前仓库中的工单邮件通知机制，以及本地开发、生产部署和常用排查方式。

## 当前结论

当前官网工单邮件通知已经接入阿里云 Direct Mail SMTP。

- 触发入口：`POST /api/public/tickets`
- 当前生产发信域名：`notify.unitc.cn`
- 当前生产发信地址：`tickets@notify.unitc.cn`
- 当前生产收信地址：`1373912749@qq.com`
- 当前生产 SMTP：`smtpdm.aliyun.com:465`
- 当前生产加密方式：SSL

工单请求通过校验后会写入 Payload `tickets` collection，并发送邮件通知。邮件发送失败不会回滚工单创建，后端会在应用日志中记录失败原因和脱敏后的配置状态。

## 代码结构

邮件相关代码集中在：

- `src/app/api/public/tickets/route.ts`：公开工单提交接口
- `src/lib/tickets/notification.ts`：邮件发送入口和供应商选择逻辑
- `src/lib/tickets/notificationTemplate.ts`：工单邮件主题、纯文本和 HTML 模板
- `src/lib/tickets/__tests__/notificationTemplate.test.ts`：邮件模板测试

当前发送优先级：

```text
Webhook -> SMTP -> Resend -> none
```

如果配置了 `TICKET_EMAIL_WEBHOOK_URL`，系统优先调用 Webhook。当前生产未使用 Webhook，使用 SMTP。

## 环境变量

邮件通知使用以下环境变量：

```bash
# 方案 A：Webhook 邮件转发
TICKET_EMAIL_WEBHOOK_URL=
TICKET_EMAIL_WEBHOOK_SECRET=

# 方案 B：SMTP
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
TICKET_EMAIL_TO=
TICKET_EMAIL_FROM=

# 方案 C：Resend
RESEND_API_KEY=
```

生产环境不要同时启用多个供应商。当前建议只保留 SMTP 方案。

## 当前生产配置

生产环境配置文件位置：

```text
/opt/proj_unihome/shared/.env.production
```

当前生产邮件配置应保持为：

```bash
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
- `80` 端口曾出现登录拒绝，当前生产不使用。

SMTP 密码属于敏感信息，不应提交到 Git，也不应写入文档。

## 本地开发

本地开发推荐使用 Mailpit，不需要连接真实邮件服务。

启动本地 PostgreSQL 和 Mailpit：

```bash
npm run docker:up:dev:db
```

Mailpit Web UI：

```text
http://localhost:8025
```

本地 `.env` 可参考：

```text
ops/env/.env.local.mailpit.example
```

本地 SMTP 示例：

```bash
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
TICKET_EMAIL_TO=test@unihome.local
TICKET_EMAIL_FROM=UniHome Local <noreply@unihome.local>
```

## 生产部署

邮件配置不打包进镜像，生产以服务器上的环境文件为准。

修改生产邮件配置：

```bash
cd /opt/proj_unihome
cp shared/.env.production shared/.env.production.bak.$(date +%Y%m%d_%H%M%S)
vim shared/.env.production
```

修改后重启应用容器：

```bash
cd /opt/proj_unihome/deploy
docker compose --env-file ../shared/.env.production up -d app
```

如果同时有代码改动，例如邮件模板更新，需要执行常规应用更新：

```bash
npm run deploy:aliyun:update
```

更新流程会保留服务器上的 `shared/.env.production`，不会覆盖生产邮件密码。

## 发信域名配置

阿里云 Direct Mail 需要先配置并验证发信域名。

当前使用：

```text
notify.unitc.cn
```

常规步骤：

1. 在阿里云 Direct Mail 中添加发信域名。
2. 按控制台提示添加 DNS 解析记录。
3. 等待域名验证通过。
4. 创建发信地址 `tickets@notify.unitc.cn`。
5. 设置 SMTP 密码。
6. 将 SMTP 配置写入生产 `.env.production`。
7. 提交一次测试工单验证收信。

如果域名一直处于待验证，优先检查 DNS 记录是否完整、主机记录是否填写正确，以及 DNS 是否已经生效。

## 邮件内容

当前工单邮件包含：

- 邮件主题：`【官网工单】客户姓名 - 合作意向`
- 客户信息：姓名、电话、邮箱、合作意向
- 留言内容
- 工单信息：工单 ID、请求 ID、提交时间
- 技术信息：IP、User-Agent

HTML 邮件模板使用官网风格：

- 白底内容卡片
- 暖橙色强调色 `#ff6b35`
- 客户信息优先展示
- 技术信息弱化展示

用户输入会在 HTML 邮件中转义，避免把表单内容作为 HTML 执行。

## 验证方式

代码级验证：

```bash
node --import tsx/esm --test \
  src/lib/tickets/__tests__/notificationTemplate.test.ts \
  src/lib/tickets/__tests__/clientIp.test.ts \
  src/lib/tickets/__tests__/turnstileConfig.test.ts
```

完整构建验证：

```bash
npm run build
```

生产链路验证：

1. 打开 `https://unitc.cn/zh/contact`。
2. 完成 Turnstile 人机验证。
3. 提交一条测试工单。
4. 确认 Payload `tickets` collection 中出现新记录。
5. 确认 `TICKET_EMAIL_TO` 收到邮件。
6. 检查应用日志中没有 `[tickets] Notification failed`。

查看应用日志：

```bash
cd /opt/proj_unihome/deploy
docker compose --env-file ../shared/.env.production logs --tail=200 app
```

## 常见问题

### 邮件没有发送

优先检查生产环境变量：

```bash
cd /opt/proj_unihome/deploy
docker compose --env-file ../shared/.env.production exec app env \
  | grep -E 'SMTP_|TICKET_EMAIL_|RESEND_|WEBHOOK'
```

注意不要把包含 `SMTP_PASS` 的完整输出贴到公开位置。

### SMTP 登录失败

优先检查：

- `SMTP_USER` 是否为阿里云 Direct Mail 发信地址。
- `SMTP_PASS` 是否为发信地址的 SMTP 密码，不是邮箱登录密码。
- `SMTP_PORT=465` 时 `SMTP_SECURE=true`。
- 发信域名是否已经验证通过。
- 发信地址是否已经创建并启用。

### 工单创建了但没有邮件

这通常说明 Payload 写入成功，但邮件通知失败。

检查应用日志：

```bash
cd /opt/proj_unihome/deploy
docker compose --env-file ../shared/.env.production logs --tail=200 app \
  | grep 'Notification failed'
```

日志会输出供应商、错误信息和脱敏后的配置状态。

### 本地收不到邮件

本地使用 Mailpit 时，邮件不会发到真实邮箱。应打开：

```text
http://localhost:8025
```

如果 Mailpit 没有邮件，检查本地 `.env` 是否使用：

```bash
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
SMTP_SECURE=false
```

