#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_DIR="${SERVER_DIR:-$(cd "$SCRIPT_DIR/../.." && pwd)}"
DEPLOY_DIR="${DEPLOY_DIR:-$SERVER_DIR/deploy}"
ENV_FILE="${ENV_FILE:-$SERVER_DIR/shared/.env.production}"
COMPOSE_FILE="${COMPOSE_FILE:-$DEPLOY_DIR/compose.prod.yml}"
RUNNER_IMAGE="${RUNNER_IMAGE:-node:20-bookworm-slim}"
REQUIRE_APP_VERSION="${REQUIRE_APP_VERSION:-true}"
INCLUDE_MEDIA_BACKUP="${INCLUDE_MEDIA_BACKUP:-true}"

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

json_value() {
  # json_value <file> <key>
  # Lightweight extraction for the flat RELEASE.json files used by this repo.
  local file="$1"
  local key="$2"
  if [ ! -f "$file" ]; then
    echo ""
    return 0
  fi
  sed -nE "s/^[[:space:]]*\"${key}\"[[:space:]]*:[[:space:]]*\"([^\"]*)\".*/\1/p" "$file" | head -n 1
}

get_env_value() {
  local key="$1"
  local default_value="${2:-}"
  if [ ! -f "$ENV_FILE" ]; then
    echo "$default_value"
    return 0
  fi
  local line
  line="$(grep -E "^${key}=" "$ENV_FILE" | tail -n 1 || true)"
  if [ -z "$line" ]; then
    echo "$default_value"
    return 0
  fi
  echo "${line#*=}"
}

compose() {
  docker compose --project-directory "$DEPLOY_DIR" -f "$COMPOSE_FILE" --env-file "$ENV_FILE" "$@"
}

docker_network_name() {
  local container
  for container in proj_unihome_app proj_unihome_postgres; do
    local network
    network="$(docker inspect "$container" \
      --format '{{range $name, $_ := .NetworkSettings.Networks}}{{println $name}}{{end}}' \
      2>/dev/null | head -n 1 || true)"
    if [ -n "$network" ]; then
      echo "$network"
      return 0
    fi
  done
}

cmd_check() {
  need_cmd docker

  [ -d "$DEPLOY_DIR" ] || die "缺少部署目录: $DEPLOY_DIR"
  [ -f "$ENV_FILE" ] || die "缺少生产环境文件: $ENV_FILE"
  [ -f "$COMPOSE_FILE" ] || die "缺少 compose 文件: $COMPOSE_FILE"
  [ -f "$SCRIPT_DIR/package.json" ] || die "补丁包缺少 package.json"
  [ -f "$SCRIPT_DIR/package-lock.json" ] || die "补丁包缺少 package-lock.json"
  [ -f "$SCRIPT_DIR/payload.config.ts" ] || die "补丁包缺少 payload.config.ts"
  [ -f "$SCRIPT_DIR/scripts/payload/ops/apply-local-cms-patches.ts" ] || die "补丁包缺少 CMS 补丁脚本"
  [ -d "$SCRIPT_DIR/src/payload" ] || die "补丁包缺少 src/payload"
  [ -d "$SCRIPT_DIR/messages" ] || die "补丁包缺少 messages"
  [ -d "$SCRIPT_DIR/public/images/sponsors" ] || die "补丁包缺少赞助商图片"

  docker compose version >/dev/null 2>&1 || die "docker compose 不可用，请安装 docker-compose-plugin"

  local app_status pg_status
  app_status="$(docker inspect -f '{{.State.Status}}' proj_unihome_app 2>/dev/null || true)"
  pg_status="$(docker inspect -f '{{.State.Status}}' proj_unihome_postgres 2>/dev/null || true)"
  if [ "$app_status" != "running" ]; then
    warn "生产 app 容器未运行，当前状态: ${app_status:-missing}。如果刚发布了新 schema，这可能是预期状态，补丁完成后会重启 app。"
  fi
  [ "$pg_status" = "running" ] || die "生产 Postgres 容器未运行，当前状态: ${pg_status:-missing}"

  local db_user db_name
  db_user="$(get_env_value POSTGRES_USER "proj_unihome")"
  db_name="$(get_env_value POSTGRES_DB "proj_unihome")"
  docker exec proj_unihome_postgres pg_isready -U "$db_user" -d "$db_name" >/dev/null 2>&1 \
    || die "Postgres 未就绪"

  local network
  network="$(docker_network_name)"
  [ -n "$network" ] || die "无法解析 app 容器所在 Docker network"

  local patch_version deploy_version
  patch_version="$(json_value "$SCRIPT_DIR/CMS_PATCH_RELEASE.json" version)"
  deploy_version="$(json_value "$DEPLOY_DIR/RELEASE.json" version)"
  if [ "$REQUIRE_APP_VERSION" = "true" ] && [ -n "$patch_version" ] && [ -n "$deploy_version" ] && [ "$patch_version" != "$deploy_version" ]; then
    die "补丁版本 ($patch_version) 与当前部署版本 ($deploy_version) 不一致。请先部署同版本应用，或设置 REQUIRE_APP_VERSION=false 手动覆盖。"
  fi

  log "check 通过"
  if [ -n "$patch_version" ]; then
    echo "Patch version: $patch_version"
  fi
  if [ -n "$deploy_version" ]; then
    echo "Deploy version: $deploy_version"
  fi
  echo "Docker network: $network"
}

cmd_backup() {
  cmd_check

  log "执行生产备份"
  if [ "$INCLUDE_MEDIA_BACKUP" = "true" ]; then
    (cd "$DEPLOY_DIR" && INCLUDE_MEDIA=true bash backup.sh run)
  else
    (cd "$DEPLOY_DIR" && bash backup.sh run)
  fi
}

cmd_apply() {
  cmd_backup

  local network database_uri
  network="$(docker_network_name)"
  database_uri="$(get_env_value DATABASE_URI "")"
  if [ -z "$database_uri" ]; then
    database_uri="$(get_env_value DATABASE_URL "")"
  fi
  [ -n "$database_uri" ] || die "DATABASE_URI / DATABASE_URL 未设置"

  mkdir -p "$SERVER_DIR/media"

  log "在临时 Node 容器中安装依赖并执行 Payload schema push + CMS 内容补丁"
  docker run --rm \
    --network "$network" \
    --env-file "$ENV_FILE" \
    -e NODE_ENV=production \
    -e DATABASE_URI="$database_uri" \
    -e DATABASE_URL="$database_uri" \
    -v "$SCRIPT_DIR:/workspace" \
    -v "$SERVER_DIR/media:/workspace/media" \
    -w /workspace \
    "$RUNNER_IMAGE" \
    bash -lc 'set -euo pipefail
      npm ci
      PAYLOAD_SCHEMA_PUSH=true node --import tsx/esm scripts/payload/dev/push-schema.ts
      PAYLOAD_SCHEMA_PUSH=false node --import tsx/esm scripts/payload/ops/apply-local-cms-patches.ts
    '

  log "修复 media 目录权限"
  chown -R 1001:1001 "$SERVER_DIR/media" || warn "无法 chown media 目录，请手动检查权限"

  log "重启生产 app，使新 schema/content 缓存生效"
  compose up -d --no-deps app

  log "CMS 补丁执行完成"
}

usage() {
  cat <<'EOF'
Usage:
  bash run-production-cms-patch.sh check
  bash run-production-cms-patch.sh backup
  bash run-production-cms-patch.sh apply

Environment overrides:
  SERVER_DIR=/opt/proj_unihome
  DEPLOY_DIR=/opt/proj_unihome/deploy
  ENV_FILE=/opt/proj_unihome/shared/.env.production
  RUNNER_IMAGE=node:20-bookworm-slim
  REQUIRE_APP_VERSION=true
  INCLUDE_MEDIA_BACKUP=true

Notes:
  - Run this after the matching app version has been deployed.
  - apply always runs backup first.
  - schema push is enabled only for the schema initialization command.
EOF
}

main() {
  local cmd="${1:-}"
  case "$cmd" in
    check) cmd_check ;;
    backup) cmd_backup ;;
    apply) cmd_apply ;;
    ""|-h|--help) usage ;;
    *) usage; die "未知命令: $cmd" ;;
  esac
}

main "$@"
