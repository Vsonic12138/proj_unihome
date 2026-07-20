# 生产 CMS 补丁发布流程

本文档说明如何将已经在代码中定义、但需要写入生产数据库和媒体库的 CMS 内容补丁发布到阿里云生产环境。

## 适用场景

使用本流程处理需要修改生产 CMS 数据的发布，例如：

- 新增 Payload 区块后，需要给生产页面写入对应区块内容
- 上传并注册新的 CMS 媒体资源
- 修正多语言 CMS 字段内容
- 将本地验证过的一次性 CMS 内容补丁发布到生产库

不适用场景：

- 只改前端代码：使用 `npm run deploy:aliyun:update`
- 只在 Payload Admin 手动改内容：不需要代码补丁包
- 首次部署或灾备恢复：使用 `npm run deploy:aliyun:init`

## 核心原则

生产 CMS 补丁与普通应用更新分开执行。

- 普通 `update` 只更新应用镜像，不改生产数据库和媒体目录
- CMS 补丁先备份生产数据库和媒体，再写入数据
- 当补丁依赖新的 Payload schema 时，必须先部署同版本应用
- 补丁脚本默认要求补丁版本与服务器当前部署版本一致

## 当前命令

本地生成补丁包：

```bash
npm run cms:patch:bundle
```

上传到阿里云但不执行：

```bash
npm run deploy:aliyun:cms-patch
```

上传并立即执行：

```bash
npm run deploy:aliyun:cms-patch -- --apply
```

## 标准发布顺序

当补丁依赖新的 Payload schema 时，按以下顺序发布：

1. 本地确认版本号、`version.md` 和提交已经完成
2. 本地构建并发布应用更新

```bash
npm run deploy:aliyun:update
```

3. 本地上传 CMS 补丁包

```bash
npm run deploy:aliyun:cms-patch
```

4. 登录服务器检查补丁

```bash
ssh unibot_aliyun
cd /opt/proj_unihome/cms-patches
find . -maxdepth 2 -name run-production-cms-patch.sh -print
```

5. 进入最新补丁目录执行检查

```bash
cd /opt/proj_unihome/cms-patches/<patch-id>/proj-unihome-cms-patch-bundle
SERVER_DIR=/opt/proj_unihome bash run-production-cms-patch.sh check
```

6. 执行补丁

```bash
SERVER_DIR=/opt/proj_unihome bash run-production-cms-patch.sh apply
```

也可以将第 3 到第 6 步合并为：

```bash
npm run deploy:aliyun:cms-patch -- --apply
```

## 服务器端执行内容

`run-production-cms-patch.sh apply` 会依次执行：

1. 检查生产目录、环境变量、Docker Compose、app/Postgres 容器和数据库健康状态
2. 检查补丁版本是否与 `/opt/proj_unihome/deploy/RELEASE.json` 一致
3. 执行生产备份

```bash
cd /opt/proj_unihome/deploy
INCLUDE_MEDIA=true bash backup.sh run
```

4. 使用临时 Node 容器安装补丁包依赖
5. 临时启用 `PAYLOAD_SCHEMA_PUSH=true`，初始化 Payload schema
6. 关闭 schema push，执行 CMS 内容补丁
7. 修复 `/opt/proj_unihome/media` 权限
8. 重启生产 app 容器

如果刚发布的新应用依赖尚未初始化的 schema，app 容器可能处于非 running 状态。补丁脚本会对此发出警告，但只要 Postgres 正常运行，仍会继续执行补丁，并在补丁完成后重新拉起 app。

## 当前补丁内容

当前 CMS 补丁包包含：

- Payload schema 初始化
- 首页 `sponsorLogos` 区块写入
- `public/images/sponsors/` 下的赞助商 Logo 媒体注册
- 中英日首页赞助商字段内容

## 版本一致性

默认情况下，补丁执行会比较：

- 补丁包：`CMS_PATCH_RELEASE.json`
- 当前部署：`/opt/proj_unihome/deploy/RELEASE.json`

两个文件中的 `version` 必须一致。这样可以避免旧应用镜像运行新 CMS schema 或新内容。

只有在明确知道风险并完成备份后，才允许临时覆盖：

```bash
REQUIRE_APP_VERSION=false SERVER_DIR=/opt/proj_unihome bash run-production-cms-patch.sh apply
```

## 回滚

CMS 补丁会在执行前自动创建生产备份。若补丁执行后需要回滚，优先使用执行前生成的最新备份。

数据库备份目录：

```text
/opt/proj_unihome/backups
```

媒体备份文件形如：

```text
media_backup_YYYYMMDD_HHMMSS.tar.gz
```

数据库 dump 文件形如：

```text
db_backup_YYYYMMDD_HHMMSS.dump.gz
```

回滚生产数据库和媒体属于高风险操作，应在维护窗口手动执行，并先停止 app 容器。

## 发布后检查

执行补丁后检查：

```bash
curl -I https://<your-domain>/zh
curl -I https://<your-domain>/en
curl -I https://<your-domain>/ja
```

然后在浏览器打开首页，确认：

- 中文、英文、日文首页都能访问
- 赞助商 Logo 区块出现
- Logo 图片可以加载
- `/zh/developers` 仍为不发布页面，不应恢复为可访问状态

## 常见问题

### 为什么不让 `deploy:aliyun:update` 自动执行 CMS 补丁？

普通应用更新应该保持可预测：只替换应用镜像，不触碰数据库和媒体。CMS 补丁会写生产数据，必须有单独备份、检查和版本一致性约束。

### 为什么补丁包需要安装依赖？

生产 app 镜像是 Next.js standalone 运行镜像，不包含完整仓库源码。补丁包会携带 Payload 配置和必要源码，并在临时 Node 容器中运行 Payload local API，避免直接手写 SQL 修改 Payload 表结构。

### 执行时拉取 `node:20-bookworm-slim` 很慢怎么办？

可提前在服务器拉取：

```bash
docker pull node:20-bookworm-slim
```

也可以指定已有 Node 镜像：

```bash
RUNNER_IMAGE=node:20-bookworm-slim SERVER_DIR=/opt/proj_unihome bash run-production-cms-patch.sh apply
```
