# 阿里云 Direct Mail 上线指南

本文档用于说明如何将官网工单通知邮件接入阿里云 Direct Mail（SMTP 方式），并与本项目当前的工单提交流程配合使用。

状态：`ACTIVE`（最近审查：2026-04-17）

适用场景：

- 生产环境部署在阿里云 ECS
- 官网工单提交后需要发送正式通知邮件
- 不准备额外维护独立 Webhook 邮件服务

官方参考：

- 产品概览：<https://www.alibabacloud.com/help/en/direct-mail/product-overview/directmail>
- 快速接入流程：<https://www.alibabacloud.com/help/en/direct-mail/getting-started/simplified-procedure-of-sending-by-api-and-smtp>
- SMTP 服务地址：<https://www.alibabacloud.com/help/en/direct-mail/smtp-endpoints>
- 发件地址与 SMTP 密码：<https://www.alibabacloud.com/help/en/direct-mail/user-guide/setup-sender-addresses>
- DNS 校验：<https://www.alibabacloud.com/help/doc-detail/605567.html>
- IP 白名单：<https://www.alibabacloud.com/help/en/direct-mail/user-guide/enable-ip-protection>
- 邮件类型与限制：<https://www.alibabacloud.com/help/en/direct-mail/getting-started/product-rules/>
- 规格限制：<https://www.alibabacloud.com/help/en/direct-mail/product-overview/limits>

## 1. 方案定位

本项目当前已经支持通过 SMTP 发送工单通知邮件，因此接入阿里云 Direct Mail 时不需要再增加中间服务，只需要完成以下工作：

1. 开通 Direct Mail
2. 配置发信域名
3. 创建发件地址
4. 为发件地址设置 SMTP 密码
5. 将 SMTP 参数写入 `shared/.env.production`
6. 联调官网工单提交与收件邮箱

注意：

- 官方允许 Direct Mail 发送触发型邮件（Triggered emails），例如注册通知、交易通知、密码重置和系统提醒；这与官网工单通知场景匹配
- 触发型邮件只能通过 API 或 SMTP 发送

## 2. 开通 Direct Mail

按官方流程先开通 Direct Mail：

1. 登录阿里云控制台
2. 进入 Direct Mail 产品页
3. 选择资源包或按量付费方式开通
4. 确保阿里云账号已经完成实名认证

官方说明：

- Direct Mail 支持 Console、API、SMTP 三种接入方式
- 中国内地使用时需要完成实名认证

## 3. 配置发信域名

在 Direct Mail 控制台中配置一个专门用于发信的域名或子域名。

推荐做法：

- 不要直接复用企业邮箱主域名
- 优先使用专门的子域名，例如 `mail.example.com` 或 `notify.example.com`

这样做的原因是，阿里云官方建议不要将 Direct Mail 域名与企业邮箱域名混用，以免影响企业邮箱投递。

你需要在 Direct Mail 控制台的域名配置页面，按页面提示添加 DNS 记录。官方文档明确提到要检查：

- 域名所有权校验
- SPF
- DKIM
- DMARC
- MX（如页面要求）

配置完成后，用官方文档里的方法验证 DNS 是否已生效。

## 4. 创建发件地址

域名绑定完成后，在 Direct Mail 控制台创建发件地址：

1. 进入 `Sender Addresses`
2. 选择已经绑定的发信域名
3. 创建一个专门用于工单通知的地址

建议命名：

- `noreply@your-mail-subdomain`
- `tickets@your-mail-subdomain`
- `support@your-mail-subdomain`

发件类型建议选择：

- `Triggered Emails`

因为官网工单通知属于用户动作触发的通知邮件。

## 5. 设置 Reply-To 与 SMTP 密码

### 5.1 Reply-To

如果你希望收件人点击“回复”时回到真实客服邮箱，需要配置 Reply-To 地址。

注意：

- Reply-To 地址必须先完成验证
- 对 SMTP 发送方式，官方说明 Reply-To 不会自动带入，需要在 SMTP 调用代码里手动设置 `Reply-To`

本项目当前仅发送通知邮件，没有额外设置 `Reply-To` 头；如果后续需要接收用户直接回复，可以再补这部分实现。

### 5.2 SMTP 密码

要启用 SMTP 发送，必须为发件地址设置 SMTP 密码：

1. 进入 `Sender Addresses`
2. 找到目标发件地址
3. 点击 `Set SMTP Password`
4. 设置并保存密码

官方说明：

- 未设置 SMTP 密码时，不能通过 SMTP 发信
- 新设置的 SMTP 密码通常需要等待约 10 分钟生效

## 6. 选择 SMTP 服务地址与端口

官方当前列出的 Direct Mail SMTP 服务地址如下：

| 区域 | SMTP 地址 |
|------|-----------|
| China (Hangzhou) | `smtpdm.aliyun.com` |
| Singapore | `smtpdm-ap-southeast-1.aliyuncs.com` |
| US (Virginia) | `smtpdm-us-east-1.aliyuncs.com` |
| Germany (Frankfurt) | `smtpdm-eu-central-1.aliyuncs.com` |

官方列出的可用端口：

- `25`
- `80`
- `465`（SSL）

官方特别说明：

- ECS 默认会禁用 25 端口
- 如果在 ECS 上发信，未启用 SSL 时优先使用 `80`
- 如果启用 SSL，使用 `465`
- `25` 和 `80` 也支持通过 `STARTTLS` 启用显式 TLS

对本项目，推荐优先级如下：

1. `SMTP_PORT=80` + `SMTP_SECURE=false`
2. `SMTP_PORT=465` + `SMTP_SECURE=true`

只有当你明确确认网络和证书链都没问题时，再选其它组合。

## 7. 配置 IP 白名单

阿里云 Direct Mail 支持 IP Protection / IP Whitelist。

如果你启用了这个功能：

- 必须先把实际发信服务器公网 IP 加入白名单
- 再启用 IP 白名单开关

否则官方会直接阻止该 IP 通过 SMTP / API 发信。

白名单支持：

- 单个 IP
- IP 范围
- CIDR

注意：

- 不支持私网 IP
- 最多 10 条记录
- 如果 ECS 公网 IP 变化，必须同步更新白名单

## 8. 项目配置示例

在服务器的 `shared/.env.production` 中，填写类似如下配置：

```env
# 官网正式域名
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
TURNSTILE_SECRET_KEY=0x4AAAA...

# 阿里云 Direct Mail SMTP（示例为 China (Hangzhou)）
SMTP_HOST=smtpdm.aliyun.com
SMTP_PORT=80
SMTP_SECURE=false
SMTP_USER=tickets@notify.example.com
SMTP_PASS=replace-with-your-smtp-password
TICKET_EMAIL_TO=ops@example.com
TICKET_EMAIL_FROM=UniHome <tickets@notify.example.com>
```

如果你的 Direct Mail 实际开通区域不是 China (Hangzhou)，请替换成官方文档对应区域的 SMTP 地址。

## 9. 上线联调清单

上线前后，至少验证以下项目：

1. 工单提交成功后，CMS 中是否生成 `tickets` 记录
2. 收件邮箱是否收到通知邮件
3. 发件人地址是否显示正确
4. 邮件是否进入垃圾箱
5. 重复提交与高频提交限制是否仍然生效
6. 若开启了 IP 白名单，ECS 当前公网 IP 是否已加入允许列表

## 10. 使用限制与风险提醒

官方文档中与当前场景直接相关的限制包括：

- 初始每日额度通常为 2,000 封
- 总免费额度通常为 2,000 封，每日最多 200 封
- 只允许合规、许可型邮件
- 触发型邮件可以通过 SMTP 发送

对当前官网工单通知场景，这些额度通常已经足够；但如果后续还要承担营销邮件、批量通知或大量系统信件，需要单独评估额度与送达率。
