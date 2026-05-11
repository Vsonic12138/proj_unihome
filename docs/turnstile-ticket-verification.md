# 工单 Turnstile 验证码

本文档说明当前官网工单提交中的 Cloudflare Turnstile 验证码机制、配置方式、验证链路、日志排查和后续调整方式。

## 当前结论

当前工单提交接口已经接入 Cloudflare Turnstile。

验证码目标是降低自动化脚本、接口扫描和批量垃圾工单对应用与 CMS 的影响。验证码校验发生在请求进入 Payload 写入流程之前。

当前工单提交路径：

```text
用户浏览器
  -> 联系表单 Turnstile Widget
  -> POST /api/public/tickets
  -> Cloudflare Turnstile siteverify
  -> 应用内 spam protection
  -> Payload tickets collection
  -> 工单邮件通知
```

说明：

- 前端只负责渲染验证码和提交 `captchaToken`。
- 服务端不信任前端状态，必须调用 Cloudflare `siteverify` 校验 token。
- 验证码通过后，才继续执行 honeypot、提交速度、应用内频率限制、重复提交检查和落库。
- Nginx 的 `/api/public/tickets` 限流仍然保留，验证码不是唯一防护层。

## 配置位置

前端验证码组件：

- `src/components/TurnstileWidget/index.tsx`
- `src/components/Contact/index.tsx`

服务端验证码校验：

- `src/lib/tickets/turnstile.ts`
- `src/lib/tickets/turnstileConfig.ts`
- `src/app/api/public/tickets/route.ts`

部署和环境变量：

- `ops/docker/Dockerfile`
- `ops/deploy/create-deploy-bundle.sh`
- `ops/deploy/remote/aliyun-deploy.sh`
- `ops/env/.env.production.example`
- 生产服务器：`/opt/proj_unihome/shared/.env.production`

## 环境变量

生产环境需要配置：

```env
NEXT_PUBLIC_SERVER_URL=https://unitc.cn
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
TURNSTILE_SECRET_KEY=0x4AAAA...
```

说明：

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` 是前端构建期变量，用于渲染 Turnstile Widget。
- `TURNSTILE_SECRET_KEY` 是运行期服务端变量，用于调用 Cloudflare `siteverify`。
- `NEXT_PUBLIC_SERVER_URL` 用于推导期望的 Turnstile `hostname`，当前生产应为 `https://unitc.cn`。
- 生产环境中 `NEXT_PUBLIC_TURNSTILE_SITE_KEY` 和 `TURNSTILE_SECRET_KEY` 必须成对配置。
- 如果只配置 site key，前端会显示验证码，但服务端无法校验。
- 如果只配置 secret key，前端不会渲染验证码，但服务端会拒绝提交。

部署脚本在 `update` 模式下会从远端 `shared/.env.production` 复用 `NEXT_PUBLIC_TURNSTILE_SITE_KEY`，并检查 site key 与 secret key 是否成对配置。

## 验证规则

前端渲染 Turnstile 时使用：

```text
action = ticket_submit
```

服务端当前校验链路：

```text
captchaToken 存在
  -> TURNSTILE_SECRET_KEY 存在
  -> Cloudflare siteverify 返回 success=true
  -> hostname 匹配 NEXT_PUBLIC_SERVER_URL 的 hostname
  -> action 匹配 ticket_submit
  -> 进入应用内 spam protection
  -> 写入 Payload tickets
```

当前应用内 spam protection 包括：

- honeypot 字段：命中后静默返回。
- 表单填写时间：过快提交会被拒绝。
- 单 IP 10 分钟提交次数限制。
- 单 IP 24 小时提交次数限制。
- 近期重复提交指纹检查。

客户端 IP 当前优先读取：

```text
x-real-ip
x-forwarded-for 的第一个 IP
0.0.0.0
```

生产 Nginx 应继续传递真实客户端 IP：

```nginx
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

## 返回状态

验证码相关失败通常返回：

```text
400 captcha_verification_failed
400 missing_captcha_token
503 captcha_configuration_error
503 captcha_verification_failed
```

说明：

- `missing_captcha_token` 表示前端未提交 token，或验证码尚未完成。
- `captcha_verification_failed` 表示 Cloudflare 校验失败、hostname/action 不匹配，或请求 Cloudflare 出错。
- `captcha_configuration_error` 表示生产环境 Turnstile 配置不完整。
- Cloudflare `siteverify` 请求当前设置 5 秒超时。
- 所有工单接口响应都带 `Cache-Control: no-store`。

## 验证

检查生产环境变量：

```bash
cd /opt/proj_unihome/deploy
grep -E '^(NEXT_PUBLIC_SERVER_URL|NEXT_PUBLIC_TURNSTILE_SITE_KEY|TURNSTILE_SECRET_KEY)=' \
  ../shared/.env.production
```

预期结果：

```text
NEXT_PUBLIC_SERVER_URL=https://unitc.cn
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
```

检查联系页可访问：

```bash
curl -I https://unitc.cn/zh/contact
```

预期结果：

```text
200 OK
```

未带验证码 token 的接口请求：

```bash
curl -sS -X POST https://unitc.cn/api/public/tickets \
  -H 'Content-Type: application/json' \
  --data '{"name":"测试","phone":"13800000000","intention":"课程/实验室/专业建设合作"}'
```

预期结果：

```json
{
  "ok": false,
  "code": "missing_captcha_token"
}
```

真实表单验证：

1. 打开 `https://unitc.cn/zh/contact`。
2. 确认表单下方出现 Cloudflare Turnstile 验证组件。
3. 完成验证码后提交工单。
4. 确认页面显示提交成功。
5. 确认 Payload Admin 中出现对应 `tickets` 记录。

部署前本地验证：

```bash
node --import tsx/esm --test \
  src/lib/tickets/__tests__/clientIp.test.ts \
  src/lib/tickets/__tests__/turnstileConfig.test.ts

npm run build
```

## 日志

查看最近应用日志：

```bash
cd /opt/proj_unihome/deploy
docker compose --project-directory . \
  -f compose.prod.yml \
  --env-file ../shared/.env.production \
  logs --tail=160 app
```

验证码配置或校验异常时，应重点搜索：

```text
captcha_configuration_error
captcha_verification_failed
Turnstile
Submission error
```

同时检查 Nginx 限流日志：

```bash
tail -n 120 /var/log/nginx/error.log
```

如果表单接口被 Nginx 限流，通常会出现：

```text
limiting requests ... by zone "form_limit"
```

## 回滚

如果 Turnstile 配置导致生产工单无法提交，优先修复环境变量并重新发布 update bundle。

常规修复路径：

```bash
cd /opt/proj_unihome/shared
vim .env.production
```

确认同时存在：

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
```

然后在本地重新构建并发布：

```bash
npm run deploy:aliyun:update
```

说明：

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` 是构建期变量，仅修改服务器 `.env.production` 不会更新前端 bundle。
- `TURNSTILE_SECRET_KEY` 是运行期变量，修改后需要重启 app 才会生效。
- `deploy:aliyun:update` 会重建并重启 app，不会恢复数据库或覆盖媒体目录。

如果需要临时关闭验证码：

1. 从生产 `.env.production` 中同时移除 `NEXT_PUBLIC_TURNSTILE_SITE_KEY` 和 `TURNSTILE_SECRET_KEY`。
2. 重新执行 `npm run deploy:aliyun:update`。
3. 保留 Nginx `form_limit` 和应用内 spam protection。

## 后续调整

当前规则适合公司官网初期上线。

如果后续出现垃圾提交或误拦截，可以再考虑：

- 在 Cloudflare Turnstile 控制台检查挑战通过率和失败原因。
- 确认 Turnstile 站点域名包含 `unitc.cn`，不要只配置 `www.unitc.cn`。
- 根据日志调整 Nginx `/api/public/tickets` 限流阈值。
- 将应用内 IP 频率限制迁移到 Redis 或数据库，避免多实例部署时只在单实例内生效。
- 为工单邮件通知补充独立告警，避免工单已落库但通知失败时无人处理。
