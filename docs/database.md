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

## 恢复

首次部署或恢复场景下，`bash deploy.sh init` 会在备份存在时自动执行数据库与媒体恢复。
