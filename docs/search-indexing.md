# 搜索引擎收录

本文档说明当前官网在 Google、Bing 和百度站长平台中的站点验证、Sitemap 提交、收录观察和常用排查方式。

## 当前结论

当前官网已经具备搜索引擎收录所需的基础条件。

- 主站地址：`https://unitc.cn`
- Sitemap 地址：`https://unitc.cn/sitemap.xml`
- Robots 地址：`https://unitc.cn/robots.txt`
- 规范主域：`unitc.cn`
- `www.unitc.cn`：301 跳转到 `unitc.cn`

当前已确认：

- Google Search Console 已添加成功。
- Google 已成功读取 `https://unitc.cn/sitemap.xml`。
- Google 当前已发现网页：`96`。
- 百度验证代码已加入项目，支持文件验证和 HTML 标签验证。

说明：

```text
提交 Sitemap 只表示搜索引擎可以发现 URL，不保证立即收录，也不保证关键词排名。
```

## 代码结构

搜索收录相关代码集中在：

- `src/app/robots.ts`：生成 `robots.txt`
- `src/app/sitemap.ts`：生成 `sitemap.xml`
- `src/app/[locale]/layout.tsx`：页面 SEO metadata 和百度验证 meta
- `public/baidu_verify_codeva-8hCxnEikGb.html`：百度文件验证

当前 `robots.txt` 会输出：

```text
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://unitc.cn/sitemap.xml
```

当前 `sitemap.xml` 会输出多语言页面，并包含 `zh`、`en`、`ja` 的 alternate 链接。

## Google Search Console

入口：

```text
https://search.google.com/search-console
```

当前状态：

```text
站点地图：https://unitc.cn/sitemap.xml
状态：成功
已发现的网页：96
```

推荐站点添加方式：

```text
Domain property: unitc.cn
```

推荐验证方式：

```text
DNS TXT 记录验证
```

常规步骤：

1. 添加资源 `unitc.cn`。
2. 按 Google 提示到 DNS 服务商添加 TXT 记录。
3. 等待 DNS 生效。
4. 回到 Google Search Console 点击验证。
5. 进入 `Sitemaps`。
6. 提交：

```text
https://unitc.cn/sitemap.xml
```

如果平台只要求填写相对路径，也可以填写：

```text
sitemap.xml
```

提交后重点观察：

- `Sitemaps` 中是否显示成功。
- `Pages` 中是否逐步从“已发现，尚未编入索引”进入“已编入索引”。
- `URL Inspection` 中首页和核心页面是否可抓取、可编入索引。
- `Performance` 是否开始出现曝光和点击。

重要页面可手动请求编入索引：

```text
https://unitc.cn/zh
https://unitc.cn/zh/products
https://unitc.cn/zh/about
https://unitc.cn/zh/contact
```

## Bing Webmaster Tools

入口：

```text
https://www.bing.com/webmasters
```

推荐方式：

```text
从 Google Search Console 导入站点
```

如果不导入，也可以手动添加：

```text
https://unitc.cn
```

常规步骤：

1. 登录 Bing Webmaster Tools。
2. 选择从 Google Search Console 导入，或手动添加站点。
3. 完成站点所有权验证。
4. 进入 `Sitemaps`。
5. 提交：

```text
https://unitc.cn/sitemap.xml
```

Bing 也会读取 `robots.txt` 中声明的 Sitemap。平台内提交是补充动作，便于观察状态和错误。

## 百度搜索资源平台

入口：

```text
https://ziyuan.baidu.com/
```

推荐添加站点：

```text
协议：https://
网站：unitc.cn
```

不要填写：

```text
https://unitc.cn/zh
unitc.cn/zh
```

说明：

- 当前规范主域是 `unitc.cn`。
- `www.unitc.cn` 已 301 跳转到 `unitc.cn`。
- 百度提示“建议添加带 www 的主站”时，优先继续添加 `unitc.cn`。
- 如果百度平台限制导致无法添加 `unitc.cn`，可临时添加 `www.unitc.cn` 完成验证，但主站和 Sitemap 仍以 `unitc.cn` 为准。

当前百度验证方式已准备两种。

文件验证：

```text
https://unitc.cn/baidu_verify_codeva-8hCxnEikGb.html
```

文件内容：

```text
1cfee50ccfe8f2327d033edfc07616da
```

HTML 标签验证：

```html
<meta name="baidu-site-verification" content="codeva-8hCxnEikGb" />
```

常规步骤：

1. 在百度搜索资源平台添加站点 `https://unitc.cn`。
2. 选择文件验证或 HTML 标签验证。
3. 发布包含验证文件和验证 meta 的应用版本。
4. 打开验证文件确认可访问。
5. 回到百度平台点击完成验证。
6. 进入资源提交或普通收录中的 Sitemap 提交入口。
7. 提交：

```text
https://unitc.cn/sitemap.xml
```

## 百度主动推送接口

百度搜索资源平台支持通过 API 主动推送 URL。

当前接口格式：

```text
http://data.zz.baidu.com/urls?site=https://unitc.cn&token=<百度推送准入密钥>
```

说明：

- `site` 必须与百度搜索资源平台中验证通过的站点一致。
- `token` 是百度搜索资源平台提供的推送准入密钥。
- `token` 属于敏感信息，不应提交到 Git，也不应写入文档。
- 主动推送不等于保证收录，只是加快百度发现 URL。

推荐本地临时执行方式：

```bash
export BAIDU_PUSH_TOKEN='<百度推送准入密钥>'

curl -sS https://unitc.cn/sitemap.xml \
  | sed -n 's:.*<loc>\(.*\)</loc>.*:\1:p' \
  > urls.txt

curl -H 'Content-Type:text/plain' \
  --data-binary @urls.txt \
  "http://data.zz.baidu.com/urls?site=https://unitc.cn&token=${BAIDU_PUSH_TOKEN}"

unset BAIDU_PUSH_TOKEN
```

如果只推送少量重点页面，可以手工创建 `urls.txt`：

```text
https://unitc.cn/zh
https://unitc.cn/zh/products
https://unitc.cn/zh/about
https://unitc.cn/zh/contact
```

然后执行：

```bash
export BAIDU_PUSH_TOKEN='<百度推送准入密钥>'

curl -H 'Content-Type:text/plain' \
  --data-binary @urls.txt \
  "http://data.zz.baidu.com/urls?site=https://unitc.cn&token=${BAIDU_PUSH_TOKEN}"

unset BAIDU_PUSH_TOKEN
```

成功返回示例：

```json
{
  "remain": 99998,
  "success": 2,
  "not_same_site": [],
  "not_valid": []
}
```

字段说明：

- `success`：本次成功推送的 URL 数量。
- `remain`：当天剩余可推送 URL 数量。
- `not_same_site`：不属于当前站点而未处理的 URL。
- `not_valid`：格式不合法的 URL。

如果返回 `not_same_site`，优先检查：

- 百度平台验证的站点是否为 `https://unitc.cn`。
- 推送 URL 是否全部以 `https://unitc.cn` 开头。
- 是否混入了 `https://www.unitc.cn` 或其他域名。

## 生产发布

搜索验证相关代码或文件变更后，需要执行常规应用更新：

```bash
npm run deploy:aliyun:update
```

更新后检查：

```bash
curl -I https://unitc.cn/zh
curl -sS https://unitc.cn/robots.txt
curl -sS https://unitc.cn/sitemap.xml | head
curl -sS https://unitc.cn/baidu_verify_codeva-8hCxnEikGb.html
```

预期结果：

```text
https://unitc.cn/zh 返回 200
robots.txt 包含 Sitemap: https://unitc.cn/sitemap.xml
sitemap.xml 输出正式域名
百度验证文件输出 1cfee50ccfe8f2327d033edfc07616da
```

检查百度 meta：

```bash
curl -sS https://unitc.cn/zh | grep 'baidu-site-verification'
```

预期结果：

```html
<meta name="baidu-site-verification" content="codeva-8hCxnEikGb" />
```

## 收录观察

常用搜索检查：

```text
site:unitc.cn
site:unitc.cn UniHome
site:unitc.cn 优联体
site:unitc.cn UNITC
```

一般时间预期：

- Sitemap 成功读取：通常几分钟到数小时。
- 开始抓取页面：通常数小时到数天。
- 开始索引展示：常见为数天到两周。
- 新站稳定收录和关键词排名：可能需要数周。

说明：

```text
收录速度取决于搜索引擎抓取频率、站点质量、外链、内容质量和历史信任度。
```

## 常见问题

### Sitemap 成功但搜索不到

这通常表示搜索引擎已经发现 URL，但还没有完成索引或排名。

优先检查：

- Search Console / Webmaster Tools 中 Sitemap 状态是否成功。
- 页面是否被 `robots.txt` 禁止。
- 页面是否返回 `200`。
- 页面是否存在明显重复内容或低质量内容。
- 是否有其他站点链接到官网。

### 百度验证文件访问失败

检查文件是否已经随应用发布：

```bash
curl -sS https://unitc.cn/baidu_verify_codeva-8hCxnEikGb.html
```

预期输出：

```text
1cfee50ccfe8f2327d033edfc07616da
```

如果返回 404，需要确认：

- 文件是否位于 `public/` 目录。
- 是否已经执行 `npm run deploy:aliyun:update`。
- Nginx 是否正常转发到应用。

### 百度 HTML 标签验证失败

检查首页 HTML：

```bash
curl -sS https://unitc.cn/zh | grep 'baidu-site-verification'
```

如果没有输出，说明新版本尚未发布，或 metadata 未出现在当前页面。

### www 与非 www 不一致

当前规范主域是：

```text
https://unitc.cn
```

当前跳转策略：

```text
https://www.unitc.cn/ -> 301 -> https://unitc.cn/
```

搜索平台中的 Sitemap、robots 和主要页面提交应统一使用非 www 主域。

### Sitemap 页面数与平台发现数不同

这是正常情况。

原因可能包括：

- 搜索平台尚未完全处理 Sitemap。
- 平台会合并重复或 canonical 相同的 URL。
- 部分页面暂未抓取。
- 多语言 alternate URL 处理需要时间。

## 后续建议

上线初期建议每周检查一次：

- Google Search Console 的索引页面数量。
- Bing Webmaster Tools 的 Sitemap 状态。
- 百度搜索资源平台的 Sitemap 状态。
- `site:unitc.cn` 的搜索结果变化。

如果两到四周后仍几乎没有收录，优先补充高质量外链和企业可信信息，例如：

- GitHub / 开源项目 README 中链接官网。
- 公司介绍页、公众号文章或合作方页面链接官网。
- 产品、案例和开发者文档页补充更完整的原创内容。
