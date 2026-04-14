#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

PKG_DIR="deploy-pkg"
BUNDLE_NAME="proj-unihome-deploy-bundle.tar.gz"
IMAGE_TAG_DEFAULT="proj-unihome-app:production"

log() {
  echo "==> $*"
}

warn() {
  echo "[warning] $*" >&2
}

die() {
  echo "[error] $*" >&2
  exit 1
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "未找到命令: $1"
}

gen_token() {
  # gen_token <len>
  local len="$1"
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -base64 48 | tr -dc 'a-zA-Z0-9' | head -c "$len"
    return 0
  fi

  # Fallback: node crypto
  if command -v node >/dev/null 2>&1; then
    node -e "console.log(require('crypto').randomBytes(64).toString('base64').replace(/[^a-zA-Z0-9]/g,'').slice(0,${len}))"
    return 0
  fi

  die "无法生成随机密钥：缺少 openssl 或 node"
}

get_env_value() {
  # get_env_value <file> <key>
  local file="$1"
  local key="$2"
  local line
  line="$(grep -E "^${key}=" "$file" 2>/dev/null | tail -n 1 || true)"
  if [ -z "$line" ]; then
    echo ""
    return 0
  fi
  echo "${line#*=}"
}

sha256_file() {
  local file="$1"
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$file" | awk '{print $1}'
    return 0
  fi
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$file" | awk '{print $1}'
    return 0
  fi
  if command -v openssl >/dev/null 2>&1; then
    openssl dgst -sha256 "$file" | awk '{print $2}'
    return 0
  fi
  die "缺少 sha256sum/shasum/openssl，无法生成校验文件"
}

prepare_pkg_dir() {
  log "[1/7] 初始化部署包目录: $PKG_DIR"
  rm -rf "$PKG_DIR"
  mkdir -p "$PKG_DIR/backups"
}

write_env_production() {
  log "[2/7] 生成生产环境 .env.production（随机密钥与数据库密码）"
  local gen_payload_secret gen_preview_secret gen_db_pass
  gen_payload_secret="$(gen_token 32)"
  gen_preview_secret="$(gen_token 32)"
  gen_db_pass="$(gen_token 24)"

  cat > "$PKG_DIR/.env.production" <<EOF
# [自动生成] 生产环境安全配置
# 部署前必须将 NEXT_PUBLIC_SERVER_URL 改为你服务器的真实域名或公网 IP
APP_IMAGE=${IMAGE_TAG_DEFAULT}
NEXT_PUBLIC_SERVER_URL=http://localhost:3005

# 核心密钥
PAYLOAD_SECRET=${gen_payload_secret}
PREVIEW_SECRET=${gen_preview_secret}

# 生产环境安全限定
PAYLOAD_SCHEMA_PUSH=false

# 数据库容器配置
POSTGRES_DB=proj_unihome
POSTGRES_USER=proj_unihome
POSTGRES_PASSWORD=${gen_db_pass}

# 内部网络数据库连接地址 (postgres 是 compose 中的 service 名字)
DATABASE_URI=postgresql://proj_unihome:${gen_db_pass}@postgres:5432/proj_unihome
EOF

  echo "[ok] 已生成: $PKG_DIR/.env.production"
}

backup_db_and_media() {
  log "[3/7] 执行最新的数据库与媒体资源备份"

  npm run backup:all

  local latest_dump
  latest_dump="$(ls -t backups/db_backup_*.dump 2>/dev/null | head -n 1 || true)"
  if [ -n "$latest_dump" ]; then
    cp "$latest_dump" "$PKG_DIR/backups/"
    echo "[ok] 数据库 dump 已复制入包: $latest_dump"
  else
    warn "未找到数据库 dump（backups/db_backup_*.dump）"
  fi

  if [ -f "backups/cms_snapshot_latest.json" ]; then
    cp "backups/cms_snapshot_latest.json" "$PKG_DIR/backups/"
    echo "[ok] CMS 快照已复制入包: backups/cms_snapshot_latest.json"
  else
    warn "未找到 CMS 快照（backups/cms_snapshot_latest.json）"
  fi

  if [ -d "media" ]; then
    tar -czf "$PKG_DIR/media_backup.tar.gz" media
    echo "[ok] 媒体目录已压缩: $PKG_DIR/media_backup.tar.gz"
  else
    warn "未找到 media/ 目录，跳过媒体打包"
  fi
}

build_image() {
  log "[4/7] 本地构建生产镜像（build 阶段需要可访问 DB）"

  local source_env="$ROOT_DIR/.env"
  [ -f "$source_env" ] || die "未找到 $source_env（用于读取 DATABASE_URI 供构建期使用）"

  local source_db_uri
  source_db_uri="$(get_env_value "$source_env" "DATABASE_URI")"
  [ -n "$source_db_uri" ] || die "未从 .env 读取到 DATABASE_URI=..."

  # Docker build 在隔离网络里：WSL/Windows 场景需要 host.docker.internal 访问宿主机 DB
  local build_db_uri
  build_db_uri="${source_db_uri//localhost/host.docker.internal}"
  build_db_uri="${build_db_uri//127.0.0.1/host.docker.internal}"

  echo "[info] 构建期数据库 URI: $build_db_uri"
  echo "[info] 正在构建镜像，这一步可能需要几分钟..."

  local payload_secret preview_secret
  payload_secret="$(get_env_value "$PKG_DIR/.env.production" "PAYLOAD_SECRET")"
  preview_secret="$(get_env_value "$PKG_DIR/.env.production" "PREVIEW_SECRET")"

  docker build \
    -f ops/docker/Dockerfile \
    --build-arg NEXT_PUBLIC_SERVER_URL=http://localhost:3005 \
    --build-arg PAYLOAD_SECRET="$payload_secret" \
    --build-arg PREVIEW_SECRET="$preview_secret" \
    --build-arg DATABASE_URI="$build_db_uri" \
    --build-arg PAYLOAD_SCHEMA_PUSH=false \
    -t "$IMAGE_TAG_DEFAULT" \
    .
}

export_image() {
  log "[5/7] 导出 Docker 镜像"
  need_cmd gzip
  docker save "$IMAGE_TAG_DEFAULT" | gzip > "$PKG_DIR/proj-unihome-app.tar.gz"
  echo "[ok] 镜像导出成功: $PKG_DIR/proj-unihome-app.tar.gz"
}

assemble_pkg() {
  log "[6/7] 组装部署包内容（compose + deploy.sh + README + 元信息）"

  cp ops/deploy/templates/compose.prod.yml "$PKG_DIR/compose.prod.yml"
  cp ops/deploy/deploy.sh "$PKG_DIR/deploy.sh"
  cp ops/deploy/README.md "$PKG_DIR/README.md"
  chmod +x "$PKG_DIR/deploy.sh"

  local version git_commit built_at
  version="$(node -p "require('./package.json').version")"
  git_commit="$(git rev-parse HEAD 2>/dev/null || echo "unknown")"
  built_at="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

  local latest_dump_name=""
  latest_dump_name="$(ls -t "$PKG_DIR"/backups/db_backup_*.dump 2>/dev/null | head -n 1 | xargs -I{} basename {} || true)"

  cat > "$PKG_DIR/RELEASE.json" <<EOF
{
  "version": "${version}",
  "gitCommit": "${git_commit}",
  "builtAtUtc": "${built_at}",
  "imageTag": "${IMAGE_TAG_DEFAULT}",
  "dbDump": "${latest_dump_name}",
  "includesMedia": $(test -f "$PKG_DIR/media_backup.tar.gz" && echo "true" || echo "false"),
  "includesDbDump": $(ls "$PKG_DIR"/backups/db_backup_*.dump >/dev/null 2>&1 && echo "true" || echo "false"),
  "includesCmsSnapshot": $(test -f "$PKG_DIR/backups/cms_snapshot_latest.json" && echo "true" || echo "false")
}
EOF

  # Create SHA256SUMS for key artifacts
  : > "$PKG_DIR/SHA256SUMS"
  local f
  for f in \
    ".env.production" \
    "compose.prod.yml" \
    "deploy.sh" \
    "README.md" \
    "RELEASE.json" \
    "proj-unihome-app.tar.gz" \
    "media_backup.tar.gz"
  do
    if [ -f "$PKG_DIR/$f" ]; then
      printf "%s  %s\n" "$(sha256_file "$PKG_DIR/$f")" "$f" >> "$PKG_DIR/SHA256SUMS"
    fi
  done

  if ls "$PKG_DIR"/backups/* >/dev/null 2>&1; then
    for f in "$PKG_DIR"/backups/*; do
      printf "%s  %s\n" "$(sha256_file "$f")" "backups/$(basename "$f")" >> "$PKG_DIR/SHA256SUMS"
    done
  fi
}

pack_bundle() {
  log "[7/7] 压缩部署套件"
  tar -czf "$BUNDLE_NAME" "$PKG_DIR"
  echo ""
  echo "=========================================================="
  echo "部署包构建完成"
  echo "输出文件: $ROOT_DIR/$BUNDLE_NAME"
  echo ""
  echo "服务器端建议执行："
  echo "1) tar -xzf $BUNDLE_NAME"
  echo "2) cd $PKG_DIR"
  echo "3) nano .env.production  # 修改 NEXT_PUBLIC_SERVER_URL"
  echo "4) bash deploy.sh init   # 首次部署"
  echo "5) bash deploy.sh update # 常规更新"
  echo "=========================================================="
}

main() {
  need_cmd npm
  need_cmd docker
  need_cmd tar
  need_cmd git

  prepare_pkg_dir
  write_env_production
  backup_db_and_media
  build_image
  export_image
  assemble_pkg
  pack_bundle
}

main "$@"

