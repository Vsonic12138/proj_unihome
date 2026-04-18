#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$BASE_DIR/shared/.env.production"
COMPOSE_FILE="$SCRIPT_DIR/compose.prod.yml"
BACKUPS_DIR="${BACKUPS_DIR:-$BASE_DIR/backups}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
DB_RETENTION_DAYS="${DB_RETENTION_DAYS:-7}"
MEDIA_RETENTION_DAYS="${MEDIA_RETENTION_DAYS:-28}"
INCLUDE_MEDIA="${INCLUDE_MEDIA:-false}"

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

prune_old_backups() {
  local pattern="$1"
  local retention_days="$2"
  if [ "$retention_days" -lt 0 ] 2>/dev/null; then
    warn "忽略无效保留天数: $retention_days"
    return 0
  fi

  find "$BACKUPS_DIR" -maxdepth 1 -type f -name "$pattern" -mtime "+$retention_days" -print -delete 2>/dev/null || true
}

cmd_check() {
  need_cmd docker
  need_cmd gzip
  need_cmd tar

  [ -f "$COMPOSE_FILE" ] || die "缺少 compose 文件: $COMPOSE_FILE"
  [ -f "$ENV_FILE" ] || die "缺少环境文件: $ENV_FILE"

  if ! docker inspect proj_unihome_postgres >/dev/null 2>&1; then
    die "未找到 Postgres 容器: proj_unihome_postgres"
  fi

  local status
  status="$(docker inspect -f '{{.State.Status}}' proj_unihome_postgres 2>/dev/null || true)"
  [ "$status" = "running" ] || die "Postgres 容器未运行，当前状态: ${status:-unknown}"

  local db_user db_name
  db_user="$(get_env_value POSTGRES_USER "proj_unihome")"
  db_name="$(get_env_value POSTGRES_DB "proj_unihome")"
  docker exec proj_unihome_postgres pg_isready -U "$db_user" -d "$db_name" >/dev/null 2>&1 \
    || die "Postgres 未就绪"

  mkdir -p "$BACKUPS_DIR"
  log "check 通过"
}

cmd_run() {
  cmd_check

  local db_user db_name dump_path
  db_user="$(get_env_value POSTGRES_USER "proj_unihome")"
  db_name="$(get_env_value POSTGRES_DB "proj_unihome")"
  dump_path="$BACKUPS_DIR/db_backup_${TIMESTAMP}.dump.gz"

  log "导出 PostgreSQL dump"
  docker exec proj_unihome_postgres pg_dump -U "$db_user" -d "$db_name" -Fc \
    | gzip > "$dump_path"
  ls -lh "$dump_path"

  if [ "$INCLUDE_MEDIA" = "true" ]; then
    local media_dir="$BASE_DIR/media"
    local media_tar="$BACKUPS_DIR/media_backup_${TIMESTAMP}.tar.gz"
    if [ -d "$media_dir" ]; then
      log "打包 media 目录"
      tar -czf "$media_tar" -C "$BASE_DIR" media
      ls -lh "$media_tar"
    else
      warn "未找到 media 目录，跳过媒体备份"
    fi
  else
    log "跳过媒体备份（如需启用，使用 INCLUDE_MEDIA=true bash backup.sh run）"
  fi

  log "执行保留策略清理"
  prune_old_backups "db_backup_*.dump.gz" "$DB_RETENTION_DAYS"
  if [ "$INCLUDE_MEDIA" = "true" ]; then
    prune_old_backups "media_backup_*.tar.gz" "$MEDIA_RETENTION_DAYS"
  fi

  log "备份完成"
}

usage() {
  cat <<'EOF'
Usage:
  bash backup.sh check
  bash backup.sh run

Environment overrides:
  BACKUPS_DIR=/opt/proj_unihome/backups
  DB_RETENTION_DAYS=7
  MEDIA_RETENTION_DAYS=28
  INCLUDE_MEDIA=true

Examples:
  bash backup.sh run
  INCLUDE_MEDIA=true bash backup.sh run
EOF
}

main() {
  local cmd="${1:-}"
  case "$cmd" in
    check) cmd_check ;;
    run) cmd_run ;;
    ""|-h|--help) usage ;;
    *) usage; die "未知命令: $cmd" ;;
  esac
}

main "$@"
