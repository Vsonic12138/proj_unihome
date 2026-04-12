#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
BACKUPS_DIR="$ROOT_DIR/backups"
CONTAINER_NAME="${POSTGRES_CONTAINER_NAME:-proj_unihome_postgres}"
DB_USER="${POSTGRES_USER:-proj_unihome}"
DB_NAME="${POSTGRES_DB:-proj_unihome}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
DB_BACKUP_PATH="$BACKUPS_DIR/db_backup_${TIMESTAMP}.dump"

echo "==> 备份前检查"

if ! command -v docker >/dev/null 2>&1; then
  echo "[error] 未找到 docker 命令"
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[error] 未找到 npm 命令"
  exit 1
fi

if [ ! -f "$ROOT_DIR/.env" ]; then
  echo "[error] 未找到 .env 文件: $ROOT_DIR/.env"
  exit 1
fi

if ! docker inspect "$CONTAINER_NAME" >/dev/null 2>&1; then
  echo "[error] 未找到数据库容器: $CONTAINER_NAME"
  exit 1
fi

CONTAINER_STATUS="$(docker inspect -f '{{.State.Status}}' "$CONTAINER_NAME")"
if [ "$CONTAINER_STATUS" != "running" ]; then
  echo "[error] 数据库容器未运行，当前状态: $CONTAINER_STATUS"
  exit 1
fi

mkdir -p "$BACKUPS_DIR"
touch "$BACKUPS_DIR/.backup-write-test"
rm -f "$BACKUPS_DIR/.backup-write-test"

if ! docker exec "$CONTAINER_NAME" pg_isready -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; then
  echo "[error] Postgres 未就绪，无法开始备份"
  exit 1
fi

echo "[ok] Docker / Postgres / backups 目录检查通过"
echo "[ok] 执行应用侧数据库连接检查"
(cd "$ROOT_DIR" && npm run check:db >/dev/null)

echo "==> 导出数据库备份"
docker exec "$CONTAINER_NAME" pg_dump -U "$DB_USER" -d "$DB_NAME" -Fc -f "/tmp/${TIMESTAMP}.dump"
docker cp "$CONTAINER_NAME:/tmp/${TIMESTAMP}.dump" "$DB_BACKUP_PATH"
docker exec "$CONTAINER_NAME" rm -f "/tmp/${TIMESTAMP}.dump"
ls -lh "$DB_BACKUP_PATH"

echo "==> 导出 CMS 内容快照"
(cd "$ROOT_DIR" && npm run export:cms-snapshot)

echo "==> 备份完成"
echo "数据库备份: $DB_BACKUP_PATH"
echo "CMS 快照: $BACKUPS_DIR/cms_snapshot_latest.json"
