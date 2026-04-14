#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

COMPOSE_FILE="$SCRIPT_DIR/compose.prod.yml"
ENV_FILE="$SCRIPT_DIR/.env.production"

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

get_env_value() {
  # Extract KEY=value from .env file without sourcing it.
  # Usage: get_env_value KEY default_value
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
  docker compose --project-directory "$SCRIPT_DIR" -f "$COMPOSE_FILE" --env-file "$ENV_FILE" "$@"
}

check_next_public_server_url() {
  local url
  url="$(get_env_value NEXT_PUBLIC_SERVER_URL "")"
  if [ -z "$url" ]; then
    die "NEXT_PUBLIC_SERVER_URL 未设置，请先编辑 .env.production"
  fi
  if [ "$url" = "http://localhost:3005" ] || [ "$url" = "http://localhost:3000" ]; then
    die "NEXT_PUBLIC_SERVER_URL 仍为默认值 ($url)，请改为真实域名或公网 IP"
  fi
}

wait_postgres_healthy() {
  local container_name="proj_unihome_postgres"
  local timeout_sec="${1:-120}"
  local start
  start="$(date +%s)"

  log "等待 Postgres 健康检查通过（最多 ${timeout_sec}s）..."
  while true; do
    if ! docker inspect "$container_name" >/dev/null 2>&1; then
      warn "未找到容器 $container_name，等待其创建..."
    else
      local status
      status="$(docker inspect -f '{{.State.Health.Status}}' "$container_name" 2>/dev/null || true)"
      if [ "$status" = "healthy" ]; then
        log "Postgres 已就绪"
        return 0
      fi
      warn "Postgres 状态: ${status:-unknown}"
    fi

    local now
    now="$(date +%s)"
    if [ $((now - start)) -ge "$timeout_sec" ]; then
      die "等待 Postgres 就绪超时。可执行: docker logs proj_unihome_postgres"
    fi
    sleep 3
  done
}

load_image() {
  local image_tar_gz="$SCRIPT_DIR/proj-unihome-app.tar.gz"
  [ -f "$image_tar_gz" ] || die "未找到镜像文件: $image_tar_gz"
  need_cmd gzip
  log "导入应用镜像（gzip -> docker load）..."
  gzip -dc "$image_tar_gz" | docker load
}

restore_db_if_present() {
  local dump
  dump="$(ls -t "$SCRIPT_DIR"/backups/db_backup_*.dump 2>/dev/null | head -n 1 || true)"
  if [ -z "$dump" ]; then
    warn "未找到数据库 dump（backups/db_backup_*.dump），跳过恢复"
    return 0
  fi

 local db_user db_name
  db_user="$(get_env_value POSTGRES_USER "proj_unihome")"
  db_name="$(get_env_value POSTGRES_DB "proj_unihome")"

  log "恢复数据库: $dump"
  docker cp "$dump" proj_unihome_postgres:/tmp/restore.dump
  docker exec proj_unihome_postgres pg_restore \
    -U "$db_user" \
    -d "$db_name" \
    --clean \
    --if-exists \
    --no-owner \
    --no-privileges \
    /tmp/restore.dump
  docker exec proj_unihome_postgres rm -f /tmp/restore.dump
  log "数据库恢复完成"
}

restore_media_if_present() {
  local media_tar="$SCRIPT_DIR/media_backup.tar.gz"
  if [ ! -f "$media_tar" ]; then
    warn "未找到 media_backup.tar.gz，跳过媒体恢复"
    return 0
  fi

  mkdir -p "$SCRIPT_DIR/media"
  if [ -n "$(ls -A "$SCRIPT_DIR/media" 2>/dev/null || true)" ]; then
    warn "media/ 非空，跳过解压（如需强制覆盖，请手动处理）"
    return 0
  fi

  log "恢复媒体文件..."
  tar -xzf "$media_tar" -C "$SCRIPT_DIR"
  log "媒体恢复完成"
}

cmd_check() {
  need_cmd docker
  need_cmd tar
  need_cmd gzip

  [ -f "$COMPOSE_FILE" ] || die "缺少 compose 文件: $COMPOSE_FILE"
  [ -f "$ENV_FILE" ] || die "缺少环境文件: $ENV_FILE"
  check_next_public_server_url

  # Validate docker compose availability
  docker compose version >/dev/null 2>&1 || die "docker compose 不可用，请安装 docker-compose-plugin"

  log "check 通过"
}

cmd_init() {
  cmd_check
  mkdir -p "$SCRIPT_DIR/media" "$SCRIPT_DIR/postgres-data" "$SCRIPT_DIR/backups"

  restore_media_if_present
  load_image

  log "启动 Postgres..."
  compose up -d postgres
  wait_postgres_healthy 180
  restore_db_if_present

  log "启动应用..."
  compose up -d app
  log "init 完成。可执行: bash deploy.sh ps / bash deploy.sh logs app"
}

cmd_update() {
  cmd_check
  load_image
  log "更新应用（仅重启 app，不动 postgres/db/media）..."
  compose up -d --no-deps app
  log "update 完成"
}

cmd_ps() {
  cmd_check
  compose ps
}

cmd_logs() {
  cmd_check
  local svc="${1:-app}"
  compose logs -f --tail=100 "$svc"
}

usage() {
  cat <<'EOF'
Usage:
  bash deploy.sh check
  bash deploy.sh init
  bash deploy.sh update
  bash deploy.sh ps
  bash deploy.sh logs [app|postgres]
EOF
}

main() {
  local cmd="${1:-}"
  case "$cmd" in
    check) cmd_check ;;
    init) cmd_init ;;
    update) cmd_update ;;
    ps) cmd_ps ;;
    logs) shift; cmd_logs "${1:-app}" ;;
    ""|-h|--help) usage ;;
    *) usage; die "未知命令: $cmd" ;;
  esac
}

main "$@"

