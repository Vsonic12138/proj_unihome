# Docker 与容器环境说明

状态：`ACTIVE`（最近审查：2026-04-15）

本项目的本地开发与部署自动化均可在“有 Docker 的环境”中获得最佳体验。

## 我必须使用 Docker Desktop 吗？

不必须。本项目要求的是 **可用的 Docker Engine + Docker Compose**：

- Windows：通常使用 Docker Desktop
- macOS：通常使用 Docker Desktop（或 Colima 等替代品）
- Linux：可直接安装 Docker Engine + docker-compose-plugin

只要 `docker` 与 `docker compose` 命令可用即可。

## 项目中哪些流程依赖 Docker？

### 1) 本地数据库（推荐）

项目提供 `ops/docker/compose.dev.yml` 用于启动开发用 PostgreSQL：

```bash
npm run docker:up:dev:db
```

该方式的优点是开箱即用，且与仓库内的备份脚本天然兼容。

### 2) 备份脚本

`npm run backup:all` 会通过 `docker exec` 进入 Postgres 容器执行 `pg_dump` 并导出备份。

结论：如果不使用容器化 Postgres（改为本机/远程 Postgres），应用仍可运行，但备份脚本需要调整为“直连 pg_dump”方式。

### 3) 部署包生成

`npm run deploy:bundle` 会：

1. 执行 `npm run backup:all`（依赖 Docker 容器化 Postgres）
2. `docker build` 构建生产镜像
3. `docker save` 导出镜像并打包为部署包

因此，生成部署包需要 Docker 可用。

## 常见问题

### Q: `permission denied while trying to connect to the docker API`？

这表示当前用户无权限访问 `/var/run/docker.sock`。常见解决方案：

- Linux：将用户加入 `docker` 组并重新登录（或临时用 `sudo`）
- WSL/Windows：确认 Docker Desktop 已启动，并开启 WSL 集成
