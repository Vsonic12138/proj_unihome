#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

# 约定：压缩包文件名与解压后的目录名保持一致，便于服务器侧操作与排障。
# tar: proj-unihome-deploy-bundle.tar.gz  ->  dir: proj-unihome-deploy-bundle/
PKG_DIR="proj-unihome-deploy-bundle"
BUNDLE_NAME="proj-unihome-deploy-bundle.tar.gz"
IMAGE_TAG_DEFAULT="proj-unihome-app:production"
PROFILE="init"
POSTGRES_IMAGE_DEFAULT="postgres:16"
BUILD_ORIGIN=""
BUILD_TURNSTILE_SITE_KEY=""

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

usage() {
  cat <<'EOF'
Usage:
  bash ops/deploy/create-deploy-bundle.sh [--profile init|update] [--origin <origin>] [--turnstile-site-key <site-key>]

Profiles:
  init   Full bundle for first-time deploy / disaster recovery. Includes db dump and media backup.
  update Lightweight bundle for routine updates. Does NOT include db dump or media backup and does NOT generate new secrets.
EOF
}

parse_args() {
  while [ $# -gt 0 ]; do
    case "$1" in
      --profile)
        PROFILE="${2:-}"
        shift 2
        ;;
      --origin)
        BUILD_ORIGIN="${2:-}"
        shift 2
        ;;
      --turnstile-site-key)
        BUILD_TURNSTILE_SITE_KEY="${2:-}"
        shift 2
        ;;
      --help|-h)
        usage
        exit 0
        ;;
      *)
        die "未知参数: $1（可用 --help 查看用法）"
        ;;
    esac
  done

  case "$PROFILE" in
    init|update) ;;
    *)
      die "无效 profile: $PROFILE（仅支持 init 或 update）"
      ;;
  esac
}

validate_origin() {
  local origin="$1"

  [ -n "$origin" ] || die "NEXT_PUBLIC_SERVER_URL 构建值为空，请通过 --origin 传入真实域名"
  case "$origin" in
    http://YOUR_DOMAIN_OR_IP|https://YOUR_DOMAIN_OR_IP|http://localhost:3000|http://localhost:3005|https://localhost:3000|https://localhost:3005)
      die "NEXT_PUBLIC_SERVER_URL 仍为占位值或 localhost：$origin"
      ;;
  esac

  case "$origin" in
    http://*|https://*) ;;
    *)
      die "NEXT_PUBLIC_SERVER_URL 必须包含协议头（http:// 或 https://）：$origin"
      ;;
  esac
}

preflight_checks() {
  log "[preflight] 检查本地构建前置条件"

  docker info >/dev/null 2>&1 || die "Docker daemon 未就绪，请确认 Docker Desktop 已启动"

  if [ "$PROFILE" = "update" ]; then
    validate_origin "$BUILD_ORIGIN"
    return 0
  fi

  # init profile:
  # - Allow passing --origin to build a production-correct image on first deploy.
  # - If origin is not provided, fall back to localhost for convenience, but warn because
  #   Next.js `images.remotePatterns` is baked at build time and may block absolute /media URLs.
  if [ -n "$BUILD_ORIGIN" ]; then
    validate_origin "$BUILD_ORIGIN"
  else
    warn "未指定 --origin：将使用 http://localhost:3005 进行构建。"
    warn "如果你的生产环境会通过绝对 URL（如 https://yourdomain.com/media/xxx）引用媒体，next/image 可能因 allowlist 不匹配而拒绝加载。"
    warn "建议：首次上线前就用 --origin 指定真实域名/公网 IP；或上线后尽快用 update bundle（带 --origin）重新打包并发布。"
  fi
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
# 部署前必须将 NEXT_PUBLIC_SERVER_URL 改为服务器的真实域名或公网 IP
APP_IMAGE=${IMAGE_TAG_DEFAULT}
NEXT_PUBLIC_SERVER_URL=http://YOUR_DOMAIN_OR_IP

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

  npm run cms:backup:local

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
  log "[4/7] 本地构建生产镜像（build 阶段不再依赖真实 DB）"

  local build_db_uri="postgresql://build:build@127.0.0.1:5432/build"
  echo "[info] 正在构建镜像，这一步可能需要几分钟..."

  local build_origin
  if [ "$PROFILE" = "init" ]; then
    build_origin="${BUILD_ORIGIN:-http://localhost:3005}"
  else
    build_origin="$BUILD_ORIGIN"
  fi

  docker build \
    -f ops/docker/Dockerfile \
    --build-arg NEXT_PUBLIC_SERVER_URL="$build_origin" \
    --build-arg NEXT_PUBLIC_TURNSTILE_SITE_KEY="$BUILD_TURNSTILE_SITE_KEY" \
    --build-arg DATABASE_URI="$build_db_uri" \
    --build-arg PAYLOAD_SCHEMA_PUSH=false \
    --build-arg BUILD_SKIP_PAYLOAD=true \
    -t "$IMAGE_TAG_DEFAULT" \
    .
}

export_image() {
  log "[5/7] 导出 Docker 镜像"
  need_cmd gzip
  docker save "$IMAGE_TAG_DEFAULT" | gzip > "$PKG_DIR/proj-unihome-app.tar.gz"
  echo "[ok] 镜像导出成功: $PKG_DIR/proj-unihome-app.tar.gz"

  if [ "$PROFILE" = "init" ]; then
    # Make init bundle independent from Docker Hub availability on the server.
    # If postgres image already exists locally, this won't hit the network.
    log "[5/7] 导出 PostgreSQL 镜像（用于离线 init）"
    if ! docker image inspect "$POSTGRES_IMAGE_DEFAULT" >/dev/null 2>&1; then
      log "本地未找到 $POSTGRES_IMAGE_DEFAULT，尝试拉取..."
      docker pull "$POSTGRES_IMAGE_DEFAULT"
    fi
    docker save "$POSTGRES_IMAGE_DEFAULT" | gzip > "$PKG_DIR/postgres-16.tar.gz"
    echo "[ok] PostgreSQL 镜像导出成功: $PKG_DIR/postgres-16.tar.gz"
  fi
}

assemble_pkg() {
  log "[6/7] 组装部署包内容（compose + deploy.sh + README + 元信息）"

  cp ops/deploy/templates/compose.prod.yml "$PKG_DIR/compose.prod.yml"
  cp ops/deploy/deploy.sh "$PKG_DIR/deploy.sh"
  cp ops/deploy/backup.sh "$PKG_DIR/backup.sh"
  cp ops/deploy/README.md "$PKG_DIR/README.md"
  chmod +x "$PKG_DIR/deploy.sh"
  chmod +x "$PKG_DIR/backup.sh"

  if [ "$PROFILE" = "update" ]; then
    # Include a template for first-time creation / reference, but do NOT rotate secrets.
    cp ops/env/.env.production.example "$PKG_DIR/.env.production.example" 2>/dev/null || true
  fi

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
  "postgresImage": "${POSTGRES_IMAGE_DEFAULT}",
  "dbDump": "${latest_dump_name}",
  "includesMedia": $(test -f "$PKG_DIR/media_backup.tar.gz" && echo "true" || echo "false"),
  "includesPostgresImage": $(test -f "$PKG_DIR/postgres-16.tar.gz" && echo "true" || echo "false"),
  "includesDbDump": $(ls "$PKG_DIR"/backups/db_backup_*.dump >/dev/null 2>&1 && echo "true" || echo "false"),
  "includesCmsSnapshot": $(test -f "$PKG_DIR/backups/cms_snapshot_latest.json" && echo "true" || echo "false")
}
EOF

  # Create SHA256SUMS for key artifacts
  : > "$PKG_DIR/SHA256SUMS"
  local f
  for f in \
    ".env.production" \
    ".env.production.example" \
    "compose.prod.yml" \
    "deploy.sh" \
    "backup.sh" \
    "README.md" \
    "RELEASE.json" \
    "proj-unihome-app.tar.gz" \
    "postgres-16.tar.gz" \
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
  echo "3) bash deploy.sh init|update"
  echo "=========================================================="
}

main() {
  parse_args "$@"
  need_cmd npm
  need_cmd docker
  need_cmd tar
  need_cmd git
  preflight_checks

  prepare_pkg_dir
  if [ "$PROFILE" = "init" ]; then
    write_env_production
    backup_db_and_media
  else
    log "[2/7] update profile: 跳过生成新 .env.production / 跳过备份（避免覆盖服务器 DB/Media）"
  fi
  build_image
  export_image
  assemble_pkg
  pack_bundle
}

main "$@"
