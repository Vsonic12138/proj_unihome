# 工单提交通知与防刷说明

本文档说明官网联系表单的工单提交流程、邮件转发协议以及生产环境推荐的防刷配置。

状态：`ACTIVE`（最近审查：2026-04-16）

## 1. 当前提交流程

用户在前端联系表单提交后，系统按以下顺序处理：

1. 前端将表单提交到 `POST /api/public/tickets`
2. 服务端校验必填字段、验证码、防刷规则
3. 校验通过后写入 Payload `tickets` collection
4. 写入成功后，将工单内容转发到邮件 Webhook
5. 前端收到结果，并展示成功/失败提示与 `requestId`

注意：

- 匿名用户不再允许直接调用 Payload 默认 `POST /api/tickets` 创建工单
- 所有公开工单请求都应统一走 `POST /api/public/tickets`

## 2. 相关环境变量

先区分两类环境：

- 本地开发：使用 `Mailpit + SMTP`
- 生产环境：使用 `Webhook`、正式 `SMTP` 或 `Resend`

模板文件位置：

- 本地示例：[.env.local.mailpit.example](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/ops/env/.env.local.mailpit.example)
- 生产示例：[.env.production.example](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/ops/env/.env.production.example)

生产环境至少需要确认以下变量：

```env
# 站点正式域名
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# 工单邮件 Webhook（推荐）
TICKET_EMAIL_WEBHOOK_URL=https://your-webhook.example.com/ticket-email
TICKET_EMAIL_WEBHOOK_SECRET=replace-with-a-long-random-secret

# Turnstile 验证码
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
TURNSTILE_SECRET_KEY=0x4AAAA...
```

说明：

- `TICKET_EMAIL_WEBHOOK_URL` 未配置时，工单仍可写入 CMS，但不会成功发送邮件通知，服务端日志会记录失败原因
- 本地测试也可改用 SMTP：`SMTP_HOST`、`SMTP_PORT`、`TICKET_EMAIL_TO`、`TICKET_EMAIL_FROM`
- `TURNSTILE_SECRET_KEY` 在生产环境建议必配，否则工单接口会拒绝请求
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` 用于前端渲染验证码组件

### 2.1 本地 Mailpit 配置

本地开发推荐使用：

```env
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
SMTP_SECURE=false
TICKET_EMAIL_TO=test@unihome.local
TICKET_EMAIL_FROM=UniHome Local <noreply@unihome.local>
```

配套容器：

- SMTP: `localhost:1025`
- Mailpit Web UI: `http://localhost:8025`

本地注意事项：

- 本地不需要配置 `TICKET_EMAIL_WEBHOOK_URL`
- 本地通常也不需要配置 Turnstile，留空即可
- 本地邮件只会进入 Mailpit，不会真实发给外部邮箱

### 2.2 生产配置边界

生产环境不要直接沿用本地 Mailpit 配置，尤其不要保留以下值：

```env
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
TICKET_EMAIL_TO=test@unihome.local
TICKET_EMAIL_FROM=UniHome Local <noreply@unihome.local>
```

生产环境请选择一种正式通知方式：

1. `Webhook`：推荐，站点将工单 JSON 转发到你自己的邮件服务
2. `SMTP`：站点直接连接正式 SMTP 服务器发信
3. `Resend`：站点直接调用 Resend API

三种方式只启用一种即可，不建议同时混用。

## 3. Webhook 协议

系统会在工单写入 CMS 成功后，向 `TICKET_EMAIL_WEBHOOK_URL` 发送一个 `POST` 请求：

- Method: `POST`
- Header:
  - `Content-Type: application/json`
  - `Authorization: Bearer <TICKET_EMAIL_WEBHOOK_SECRET>`（仅当配置了 secret 时发送）

请求体示例：

```json
{
  "type": "ticket.submitted",
  "requestId": "f2c1b9d0-1111-2222-3333-abcdefabcdef",
  "ticketId": 123,
  "payload": {
    "name": "Alice",
    "email": "alice@example.com",
    "phone": "13800000000",
    "intention": "渠道合作",
    "message": "Please contact me next week.",
    "ip": "203.0.113.10",
    "userAgent": "Mozilla/5.0 ..."
  }
}
```

Webhook 返回约定：

- 返回 `2xx`：视为邮件通知成功
- 返回非 `2xx`：视为邮件通知失败，但不会回滚已创建的工单
- 超时/网络错误：视为邮件通知失败，错误信息会写入服务器日志

推荐实现：

- 在你方邮件网关中校验 `Authorization` header
- 将 webhook 请求转发到企业邮箱、SMTP 服务或第三方邮件平台
- 建议在邮件标题中包含 `ticketId` 和 `requestId`

## 4. 防刷策略

当前实现包含以下防刷策略：

- `限频`
  - 同一 IP 10 分钟内最多 5 次
  - 同一 IP 24 小时内最多 30 次
- `重复提交检测`
  - 基于 `IP + UA + name/email/phone/intention/message` 计算指纹
  - 短时间内重复内容会被拒绝
- `蜜罐字段`
  - 表单包含隐藏字段 `website`
  - 若该字段被填写，请求会被判定为可疑提交
- `表单耗时校验`
  - 表单打开到提交时间过短，会被判定为疑似机器人
- `Turnstile 验证码`
  - 前端必须先通过验证码，服务端才会继续处理

注意：

- 当前限流基于单实例内存实现，适合当前阿里云 ECS 单实例部署
- 如果未来升级为多实例部署，建议将限流状态迁移到 Redis 等共享存储

## 5. 前端与排障

工单接口返回失败时，会携带：

- `requestId`
- `code`
- `error`
- `details`（部分错误场景会带）

常见错误码：

| 错误码 | 含义 |
|--------|------|
| `missing_required_fields` | 缺少必填字段 |
| `missing_captcha_token` | 前端未提交验证码 token |
| `captcha_verification_failed` | 验证码校验失败 |
| `captcha_configuration_error` | 生产环境未配置 Turnstile 密钥 |
| `rate_limited` | 提交频率过高 |
| `duplicate_submission` | 短时间内重复提交了相同内容 |
| `suspected_bot_submission` | 表单提交过快，疑似脚本 |
| `payload_not_configured` | 服务器未正确配置 Payload 运行环境 |
| `unexpected_server_error` | 服务端内部错误 |

排障建议：

1. 前端提示失败时，先记录页面上的 `requestId`
2. 到服务器日志中搜索该 `requestId`
3. 查看错误发生阶段：验证码、限流、CMS 写入或 Webhook 通知

## 6. 上线检查清单

上线后至少验证以下场景：

1. 正常提交一条工单，确认 CMS 中可见
2. 确认邮件 Webhook 收到请求并成功转发邮件
3. 不通过验证码直接提交，确认接口被拒绝
4. 连续多次提交，确认限流生效
5. 重复提交相同内容，确认出现重复提交提示
6. 服务器日志中可按 `requestId` 检索到对应请求
