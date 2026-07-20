# 数据库

本文档说明当前项目的数据库类型、连接方式，以及本地和生产环境中的备份恢复方式。

## 当前结论

当前项目使用 PostgreSQL，Payload 通过 `@payloadcms/db-postgres` 连接数据库。

应用启动时使用：

- `DATABASE_URI`
- `DATABASE_URL`

## 本地数据库

本地推荐使用 Docker 启动 PostgreSQL：

```bash
npm run docker:up:dev:db  # 启动本地开发环境所需的 PostgreSQL 数据库容器
```

默认开发容器定义在 `ops/docker/compose.dev.yml`：

- 容器名：`proj_unihome_postgres`
- 镜像：`postgres:16`
- 默认数据库：`proj_unihome`
- 默认用户：`proj_unihome`
- 默认密码：`proj_unihome_password`

仓库模板默认使用宿主机 `5432`，但你当前本地 `.env` 实际连接的是 `15432`。

## 生产数据库

生产环境默认使用 Docker Compose 在同一台服务器上运行 PostgreSQL：

- 容器名：`proj_unihome_postgres`
- 应用通过内部服务名 `postgres` 连接数据库

生产示例连接形式：

```env
DATABASE_URI=postgresql://proj_unihome:<password>@postgres:5432/proj_unihome
```

## 备份

本地标准备份命令：

```bash
npm run cms:backup:local  # [本地执行] 备份数据库 dump 并导出 CMS 内容快照
```

服务器备份命令：

```bash
cd /opt/proj_unihome/deploy
bash backup.sh run        # [服务器执行] 在生产环境运行数据库备份与 CMS 快照导出
```

如需同时打包媒体目录：

```bash
cd /opt/proj_unihome/deploy
INCLUDE_MEDIA=true bash backup.sh run  # [服务器执行] 在备份时同时包含整个 media/ 媒体资源目录
```

## 从生产同步到本地开发库

当本地 CMS 内容落后于线上时，不要运行 `cms:seed:*` 覆盖线上内容。标准方向是：

1. 生产服务器导出 PostgreSQL dump 和 `media/`
2. 本地先备份当前数据库
3. 清空本地 PostgreSQL `public` schema
4. 恢复生产 dump
5. 用生产 `media/` 覆盖本地 `media/`
6. 对当前本地代码执行一次 schema push，补齐本地代码新增但线上 dump 尚不存在的表
7. 执行本地 CMS 补丁，补回当前代码已新增但线上尚未上线的内容模块

推荐使用脚本：

```bash
npm run cms:sync:prod:local -- --yes
```

默认配置：

- SSH 主机：`unibot_aliyun`
- 服务器目录：`/opt/proj_unihome`
- 本地 Postgres 容器：`proj_unihome_postgres`
- 本地数据库：`proj_unihome`

可用环境变量覆盖：

```bash
SSH_HOST=unibot_aliyun \
SERVER_DIR=/opt/proj_unihome \
POSTGRES_CONTAINER_NAME=proj_unihome_postgres \
POSTGRES_USER=proj_unihome \
POSTGRES_DB=proj_unihome \
RUN_SCHEMA_PUSH=true \
RUN_LOCAL_CMS_PATCHES=true \
npm run cms:sync:prod:local -- --yes
```

脚本会在本地保留旧数据：

- 旧数据库 dump：`backups/local-before-prod-sync/`
- 旧媒体目录：`media.local-before-prod-sync-*`
- 从生产拉取的备份：`backups/from-prod/`

同步后如果 `npm run dev` 已经在运行，重启 dev server。Payload 客户端会缓存 schema 和全局数据，数据库恢复或 schema push 后继续使用旧进程可能出现 `/manifest.webmanifest` 500 或旧内容残留。

当前本地 CMS 补丁入口是：

```bash
npm run cms:local:patches
```

它用于将仍未进入生产库的本地 CMS 结构补丁写回开发库，例如首页赞助商 Logo 滚动条。

## 恢复

首次部署或恢复场景下，`bash deploy.sh init` 会在备份存在时自动执行数据库与媒体恢复。

## 媒体目录权限

生产环境 Payload 媒体目录位于：

```text
/opt/proj_unihome/media
```

该目录挂载到应用容器内：

```text
/app/media
```

当前应用容器运行用户：

```text
uid=1001(nextjs) gid=1001(nodejs)
```

因此生产媒体目录需要允许 `1001:1001` 写入。上传图片报错时，如果应用日志出现：

```text
EACCES: permission denied, open 'media/...'
上传文件时出现了问题。
```

优先检查并修复目录权限：

```bash
chown -R 1001:1001 /opt/proj_unihome/media
find /opt/proj_unihome/media -type d -exec chmod 755 {} +
find /opt/proj_unihome/media -type f -exec chmod 644 {} +
```

修复后验证容器内可写：

```bash
cd /opt/proj_unihome/deploy
docker compose --project-directory . \
  -f compose.prod.yml \
  --env-file ../shared/.env.production \
  exec app sh -lc 'touch /app/media/.write-test && rm /app/media/.write-test'
```
