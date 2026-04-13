#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

PKG_DIR="deploy-pkg"
echo "==> [1/6] 初始化部署包目录: $PKG_DIR"
rm -rf "$PKG_DIR"
mkdir -p "$PKG_DIR"
mkdir -p "$PKG_DIR/backups"

echo "==> [2/6] 生成高强度的生产环境密钥和密码"
# 使用 openssl 生成随机字符串，过滤掉特殊字符以免引发 URL 解析问题
GEN_PAYLOAD_SECRET=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 32)
GEN_PREVIEW_SECRET=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 32)
GEN_DB_PASS=$(openssl rand -base64 16 | tr -dc 'a-zA-Z0-9' | head -c 24)

cat > "$PKG_DIR/.env.production" <<EOF
# [自动生成] 生产环境安全配置
# 部署时请将 NEXT_PUBLIC_SERVER_URL 改为你服务器的真实域名或 IP
APP_IMAGE=proj-unihome-app:production
NEXT_PUBLIC_SERVER_URL=http://localhost:3005

# 核心密钥
PAYLOAD_SECRET=${GEN_PAYLOAD_SECRET}
PREVIEW_SECRET=${GEN_PREVIEW_SECRET}

# 生产环境安全限定
PAYLOAD_SCHEMA_PUSH=false

# 数据库容器配置
POSTGRES_DB=proj_unihome
POSTGRES_USER=proj_unihome
POSTGRES_PASSWORD=${GEN_DB_PASS}

# 内部网络数据库连接地址 (postgres 是 compose 中的 service 名字)
DATABASE_URI=postgresql://proj_unihome:${GEN_DB_PASS}@postgres:5432/proj_unihome
EOF
echo "[ok] 已生成 .env.production 文件"

echo "==> [3/6] 执行最新的数据库与媒体资源备份"
npm run backup:all

LATEST_DUMP=$(ls -t backups/db_backup_*.dump | head -n 1)
if [ -n "$LATEST_DUMP" ]; then
  cp "$LATEST_DUMP" "$PKG_DIR/backups/"
  echo "[ok] 数据库归档已复制入包: $LATEST_DUMP"
else
  echo "[warning] 未找到新的数据库 dump 备份文件"
fi

tar -czf "$PKG_DIR/media_backup.tar.gz" media
echo "[ok] 媒体文件压缩完成: media_backup.tar.gz"

echo "==> [4/6] 准备 Docker 本地构建"
# 读取本地 .env 中的开发数据库地址，给构建期使用
# 因为 Docker build 是跑在隔离网络里的，需要用 host.docker.internal 访问 WSL 里的 DB
SOURCE_DB_URI=$(grep "^DATABASE_URI=" .env | cut -d '=' -f2)
BUILD_DB_URI="${SOURCE_DB_URI//localhost/host.docker.internal}"
BUILD_DB_URI="${BUILD_DB_URI//127.0.0.1/host.docker.internal}"

echo "[info] 构建用的数据库 URI: $BUILD_DB_URI"
echo "[info] 正在构建生产镜像，这一步可能需要几分钟..."

docker build \
  --build-arg NEXT_PUBLIC_SERVER_URL=http://localhost:3005 \
  --build-arg PAYLOAD_SECRET="$GEN_PAYLOAD_SECRET" \
  --build-arg PREVIEW_SECRET="$GEN_PREVIEW_SECRET" \
  --build-arg DATABASE_URI="$BUILD_DB_URI" \
  --build-arg PAYLOAD_SCHEMA_PUSH=false \
  -t proj-unihome-app:production .

echo "==> [5/6] 导出 Docker 镜像"
docker save proj-unihome-app:production | gzip > "$PKG_DIR/proj-unihome-app.tar.gz"
echo "[ok] 镜像导出成功: proj-unihome-app.tar.gz"

echo "==> [6/6] 组装并压缩部署套件"
cp docker-compose.prod.yml "$PKG_DIR/"
cp docs/gcp-server-migration-playbook.md "$PKG_DIR/README.md"

BUNDLE_NAME="proj-unihome-deploy-bundle.tar.gz"
tar -czf "$BUNDLE_NAME" "$PKG_DIR"

echo ""
echo "=========================================================="
echo "🎉 部署包构建完成！"
echo "👉 输出文件: \$(pwd)/$BUNDLE_NAME"
echo ""
echo "请将该 $BUNDLE_NAME 上传至 GCP 服务器，然后在服务器执行："
echo "1. tar -xzf $BUNDLE_NAME"
echo "2. cd $PKG_DIR"
echo "3. 修改 .env.production 将 NEXT_PUBLIC_SERVER_URL 改为你的真实公网域名"
echo "4. 执行：tar -xzf media_backup.tar.gz -C ."
echo "5. 执行：docker compose -f docker-compose.prod.yml --env-file .env.production up -d postgres"
echo "6. 导入数据库备份 (具体参考包内的 README.md)"
echo "7. 执行：docker load < proj-unihome-app.tar.gz"
echo "8. 执行：docker compose -f docker-compose.prod.yml --env-file .env.production up -d app"
echo "=========================================================="
