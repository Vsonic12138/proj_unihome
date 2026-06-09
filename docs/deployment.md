# 生产部署

本文档说明当前仓库的生产部署方式。以阿里云 ECS 为主，部署模型以本地构建部署包再上传服务器为准。

## 当前结论

当前推荐的生产发布方式是：

1. 在本地构建部署包
2. 上传到服务器
3. 在服务器执行 `init` 或 `update`

## 部署模型

部署包由 `ops/deploy/create-deploy-bundle.sh` 生成，分为两类：

- `init`
  - 用于首次部署或恢复
  - 可包含应用镜像、数据库 dump、CMS 快照和媒体备份
- `update`
  - 用于常规更新
  - 只更新应用，不恢复数据库和媒体目录

常用命令：

```bash
npm run deploy:bundle:init        # [本地执行] 生成完整部署包：包含应用镜像、Postgres 镜像、本地数据库 dump、CMS 快照及媒体备份，适用于首次部署或灾备恢复
npm run deploy:bundle:update      # [本地执行] 生成更新部署包：仅包含应用镜像及部署脚本，体积较小，适用于日常代码更新，不会覆盖服务器的数据库和媒体数据
npm run deploy:aliyun:bootstrap   # [本地执行] 远程初始化阿里云服务器：安装 Docker、Nginx 并配置基础的反向代理，准备生产目录环境
npm run deploy:aliyun:init        # [本地执行] 远程首次部署：自动执行打包 init、上传部署包并在服务器执行 deploy.sh init，初始化密钥和环境
npm run deploy:aliyun:update      # [本地执行] 远程更新部署：自动执行打包 update、上传部署包并在服务器执行 deploy.sh update，实现零停机（或极短停机）更新
npm run deploy:aliyun:cms-patch   # [本地执行] 上传生产 CMS 补丁包；加 -- --apply 可在服务器备份后执行补丁
```

## 生产 CMS 补丁

普通 `update` 只更新应用镜像，不修改生产数据库和媒体目录。

当发布内容依赖新的 Payload schema 或需要写入生产 CMS 数据时，使用独立 CMS 补丁流程：

```bash
npm run deploy:aliyun:update             # 先发布包含新 schema 的应用
npm run deploy:aliyun:cms-patch          # 再上传 CMS 补丁包
npm run deploy:aliyun:cms-patch -- --apply  # 或上传后立即备份并执行补丁
```

完整流程见：

- `docs/production-cms-patch-flow.md`

## 生产结构

生产环境默认包含两个容器：

- `proj_unihome_app`
- `proj_unihome_postgres`

运行关系如下：

```text
公网流量
  -> Nginx
  -> 127.0.0.1:3005
  -> proj_unihome_app
  -> proj_unihome_postgres
```

## 服务器目录

生产目录约定为：

```text
/opt/proj_unihome
```

主要目录：

- `deploy/`
- `shared/`
- `media/`
- `postgres-data/`
- `backups/`

## 阿里云 ECS

当前仓库已经提供阿里云一键脚本：

```bash
npm run deploy:aliyun:bootstrap   # [本地执行] 远程初始化服务器环境（Docker/Nginx/目录）
npm run deploy:aliyun:init        # [本地执行] 远程首次部署全量包（含数据库与媒体初始化）
npm run deploy:aliyun:update      # [本地执行] 远程更新部署增量包（仅更新代码镜像）
npm run deploy:aliyun:cms-patch   # [本地执行] 上传生产 CMS 补丁包；加 -- --apply 可执行补丁
```

建议使用方式：

1. 首次准备服务器时执行 `bootstrap`
2. 首次上线执行 `init`
3. 后续发版执行 `update`

如果只是通过 CMS 修改内容，通常不需要重新部署代码。

## 生产环境变量

生产环境变量以 `shared/.env.production` 为准。示例模板见：

- `ops/env/.env.production.example`

至少需要确认以下配置：

- `NEXT_PUBLIC_SERVER_URL`
- `PAYLOAD_SECRET`
- `PREVIEW_SECRET`
- `POSTGRES_PASSWORD`
- `DATABASE_URI`

## 备份

服务器端标准备份入口：

```bash
cd /opt/proj_unihome/deploy
bash backup.sh run  # [服务器执行] 在生产服务器上执行标准备份（包含 DB Dump 与 CMS 快照）
```

同时备份媒体：

```bash
cd /opt/proj_unihome/deploy
INCLUDE_MEDIA=true bash backup.sh run  # [服务器执行] 执行全量备份，包含所有上传的媒体文件
```
