# 部署包使用说明（deploy-pkg）

本目录由本地脚本自动生成并打包为 `proj-unihome-deploy-bundle.tar.gz`。
你在服务器上解压后进入 `deploy-pkg/`，可以使用 `deploy.sh` 一键完成首次部署或更新。

## 目录内容

- `compose.prod.yml`: 生产环境 Docker Compose 编排文件
- `.env.production`: 生产环境变量（自动生成，部署前需修改 `NEXT_PUBLIC_SERVER_URL`）
- `proj-unihome-app.tar.gz`: 已构建好的应用镜像导出包（gzip 压缩）
- `media_backup.tar.gz`: Payload 媒体目录备份（可选）
- `backups/`: 数据库 dump 与 CMS 快照（可选）
- `deploy.sh`: 服务器端一键部署脚本

## 首次部署（init）

1. 将 `NEXT_PUBLIC_SERVER_URL` 改成真实域名或公网 IP：
   ```bash
   nano .env.production
   ```
2. 执行首次部署：
   ```bash
   bash deploy.sh init
   ```

## 常规更新（update）

当你上传了新的部署包并覆盖解压后，在 `deploy-pkg/` 里执行：

```bash
bash deploy.sh update
```

默认行为：仅加载新镜像并重启 `app` 容器，不会恢复数据库或覆盖媒体目录。

