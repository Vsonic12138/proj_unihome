# Nginx 限流

本文档说明当前生产环境中的 Nginx 限流配置、适用路径、验证方式和回滚方式。

## 当前结论

当前生产环境已经在 Nginx 层增加保守限流。

限流目标是降低单个 IP 高频访问、接口扫描和工单接口刷提交对应用的影响。限流发生在请求进入 Next.js / Payload 应用之前。

当前生产流量路径：

```text
公网流量
  -> Nginx
  -> 127.0.0.1:3005
  -> proj_unihome_app
  -> proj_unihome_postgres
```

## 配置位置

生产服务器上的配置文件：

- `/etc/nginx/nginx.conf`
- `/etc/nginx/sites-available/proj_unihome`

修改前已备份：

```text
/etc/nginx/nginx.conf.bak.20260509_190417
/etc/nginx/sites-available/proj_unihome.bak.20260509_190417
```

## 限流规则

当前在 `/etc/nginx/nginx.conf` 中配置：

```nginx
limit_req_zone $binary_remote_addr zone=site_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=5r/s;
limit_req_zone $binary_remote_addr zone=cms_api_limit:10m rate=30r/s;
limit_req_zone $binary_remote_addr zone=admin_limit:10m rate=3r/s;
limit_req_zone $binary_remote_addr zone=form_limit:10m rate=2r/m;
limit_req_status 429;
```

当前在 `/etc/nginx/sites-available/proj_unihome` 中应用：

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

- `/api/public/tickets` 是公开工单提交接口，限制最严格。
- `/api/media/file/` 是 Payload 媒体文件读取路径，不套用通用 API 限流，避免 CMS 媒体库批量缩略图加载触发 429。
- `/api/media` 和 `/api/mediaFolders` 是 CMS 媒体管理相关接口，使用较宽松的 `cms_api_limit`。
- `/admin` 和其他 `/api/` 用于降低扫描和异常请求压力。
- `/` 使用较宽松限制，避免影响正常页面访问。
- 静态资源和媒体文件未单独设置严格限流，避免影响页面资源加载。
- 限流命中时返回 `429 Too Many Requests`。

## 验证

修改配置后必须先检查语法：

```bash
nginx -t
```

通过后再重新加载：

```bash
systemctl reload nginx
```

常用公网检查：

```bash
curl -I -L https://unitc.cn/
curl -I https://unitc.cn/zh
curl -I https://unitc.cn/admin
curl -I https://unitc.cn/robots.txt
curl -I https://unitc.cn/sitemap.xml
curl -I https://www.unitc.cn/
```

预期结果：

```text
https://unitc.cn/           307 -> /zh -> 200
https://unitc.cn/zh         200
https://unitc.cn/admin      200
https://unitc.cn/robots.txt 200
https://unitc.cn/sitemap.xml 200
https://www.unitc.cn/       301 -> https://unitc.cn/
```

轻量访问验证：

```bash
for i in $(seq 1 5); do
  curl -s -o /dev/null -w "%{http_code}\n" https://unitc.cn/zh
done
```

预期结果：

```text
200
200
200
200
200
```

表单限流验证：

```bash
for i in $(seq 1 8); do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST https://unitc.cn/api/public/tickets \
    -H 'Content-Type: application/json' \
    --data '{}'
done
```

预期结果：

```text
部分请求由应用返回 400。
超过 form_limit 后，Nginx 返回 429。
```

媒体文件验证：

```bash
for i in $(seq 1 60); do
  curl -s -o /dev/null -w "%{http_code}\n" \
    https://unitc.cn/api/media/file/swing-1.png
done | sort | uniq -c
```

预期结果：

```text
60 200
```

## 日志

查看 Nginx 错误日志：

```bash
tail -n 120 /var/log/nginx/error.log
```

限流命中时通常会出现：

```text
limiting requests ... by zone "form_limit"
```

如果 CMS 媒体库加载或上传异常，应重点检查是否仍出现：

```text
limiting requests ... by zone "api_limit" ... /api/media/file/
limiting requests ... by zone "api_limit" ... /api/mediaFolders
```

这些日志表示媒体相关路径仍被通用 API 限流误伤。

查看最近应用日志：

```bash
cd /opt/proj_unihome/deploy
docker compose --project-directory . \
  -f compose.prod.yml \
  --env-file ../shared/.env.production \
  logs --tail=160 app
```

限流配置调整后，应确认没有新的应用错误：

```text
Failed query
missing column
500
```

## 回滚

如果 `nginx -t` 失败，不要 reload，先修复配置。

如果 reload 后访问异常，可恢复备份：

```bash
cp /etc/nginx/nginx.conf.bak.20260509_190417 /etc/nginx/nginx.conf
cp /etc/nginx/sites-available/proj_unihome.bak.20260509_190417 /etc/nginx/sites-available/proj_unihome
nginx -t
systemctl reload nginx
```

## 后续调整

当前规则是保守配置，适合公司官网初期上线。

如果后续出现明显爬虫、带宽压力或表单垃圾提交，可以再考虑：

- 根据 Nginx 日志调整限流阈值。
- 为媒体文件接入 CDN。
- 在阿里云侧增加 WAF 或 CDN 安全规则。
- 完成 Turnstile 和工单邮件通知配置。
