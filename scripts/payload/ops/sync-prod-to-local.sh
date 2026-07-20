#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
SSH_HOST="${SSH_HOST:-unibot_aliyun}"
SERVER_DIR="${SERVER_DIR:-/opt/proj_unihome}"
LOCAL_CONTAINER="${POSTGRES_CONTAINER_NAME:-proj_unihome_postgres}"
DB_USER="${POSTGRES_USER:-proj_unihome}"
DB_NAME="${POSTGRES_DB:-proj_unihome}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
FROM_PROD_DIR="$ROOT_DIR/backups/from-prod"
LOCAL_BACKUP_DIR="$ROOT_DIR/backups/local-before-prod-sync"
RUN_SCHEMA_PUSH="${RUN_SCHEMA_PUSH:-true}"
RUN_LOCAL_CMS_PATCHES="${RUN_LOCAL_CMS_PATCHES:-true}"
YES="false"

usage() {
  cat <<'EOF'
Usage:
  npm run cms:sync:prod:local -- --yes

Environment overrides:
  SSH_HOST=unibot_aliyun
  SERVER_DIR=/opt/proj_unihome
  POSTGRES_CONTAINER_NAME=proj_unihome_postgres
  POSTGRES_USER=proj_unihome
  POSTGRES_DB=proj_unihome
  RUN_SCHEMA_PUSH=true
  RUN_LOCAL_CMS_PATCHES=true

This overwrites the local PostgreSQL database and local media/ directory with
production data. It creates local backups before overwriting.
EOF
}

for arg in "$@"; do
  case "$arg" in
    --yes|-y) YES="true" ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage
      echo "[error] Unknown argument: $arg" >&2
      exit 1
      ;;
  esac
done

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "[error] Missing command: $1" >&2
    exit 1
  }
}

log() {
  echo "==> $*"
}

if [ "$YES" != "true" ]; then
  echo "[error] This command overwrites the local CMS database and media directory." >&2
  echo "        Re-run with --yes after confirming production -> local is intended." >&2
  exit 1
fi

need_cmd docker
need_cmd gzip
need_cmd tar
need_cmd ssh
need_cmd scp
need_cmd node

cd "$ROOT_DIR"

if [ ! -f "$ROOT_DIR/.env" ]; then
  echo "[error] Missing local .env: $ROOT_DIR/.env" >&2
  exit 1
fi

if ! docker inspect "$LOCAL_CONTAINER" >/dev/null 2>&1; then
  echo "[error] Missing local Postgres container: $LOCAL_CONTAINER" >&2
  exit 1
fi

mkdir -p "$FROM_PROD_DIR" "$LOCAL_BACKUP_DIR"

log "Creating production backup on $SSH_HOST"
ssh "$SSH_HOST" "cd '$SERVER_DIR/deploy' && INCLUDE_MEDIA=true bash backup.sh run"

REMOTE_DB="$(ssh "$SSH_HOST" "ls -t '$SERVER_DIR'/backups/db_backup_*.dump.gz | head -n 1")"
REMOTE_MEDIA="$(ssh "$SSH_HOST" "ls -t '$SERVER_DIR'/backups/media_backup_*.tar.gz | head -n 1")"
LOCAL_DB="$FROM_PROD_DIR/$(basename "$REMOTE_DB")"
LOCAL_MEDIA="$FROM_PROD_DIR/$(basename "$REMOTE_MEDIA")"

log "Downloading production DB dump"
scp "$SSH_HOST:$REMOTE_DB" "$LOCAL_DB"
gzip -t "$LOCAL_DB"

log "Downloading production media archive"
scp "$SSH_HOST:$REMOTE_MEDIA" "$LOCAL_MEDIA"
tar -tzf "$LOCAL_MEDIA" >/dev/null

log "Backing up current local DB"
docker exec "$LOCAL_CONTAINER" pg_dump -U "$DB_USER" -d "$DB_NAME" -Fc \
  | gzip > "$LOCAL_BACKUP_DIR/db_backup_${TIMESTAMP}.dump.gz"
ls -lh "$LOCAL_BACKUP_DIR/db_backup_${TIMESTAMP}.dump.gz"

if [ -e "$ROOT_DIR/media" ]; then
  log "Moving current local media directory aside"
  mv "$ROOT_DIR/media" "$ROOT_DIR/media.local-before-prod-sync-${TIMESTAMP}"
fi

log "Restoring production DB into local Postgres"
docker exec "$LOCAL_CONTAINER" psql -U "$DB_USER" -d postgres -c \
  "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='${DB_NAME}' AND pid <> pg_backend_pid();" >/dev/null
docker exec "$LOCAL_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 -c \
  "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO ${DB_USER}; GRANT ALL ON SCHEMA public TO public;"
gunzip -c "$LOCAL_DB" \
  | docker exec -i "$LOCAL_CONTAINER" pg_restore -U "$DB_USER" -d "$DB_NAME" --no-owner --no-privileges

log "Restoring production media into local workspace"
tar -xzf "$LOCAL_MEDIA" -C "$ROOT_DIR"

if [ "$RUN_SCHEMA_PUSH" = "true" ]; then
  log "Syncing local schema for current code"
  PAYLOAD_SCHEMA_PUSH=true node --env-file=.env --import tsx/esm scripts/payload/dev/push-schema.ts
fi

if [ "$RUN_LOCAL_CMS_PATCHES" = "true" ]; then
  log "Applying local CMS patches for current code"
  node --env-file=.env --import tsx/esm scripts/payload/ops/apply-local-cms-patches.ts
fi

log "Verifying local data"
docker exec "$LOCAL_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -c \
  "select _status, count(*) from pages group by _status order by _status;"
docker exec "$LOCAL_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -c \
  "select count(*) as media_count from media;"
find "$ROOT_DIR/media" -maxdepth 1 -type f | wc -l | xargs echo "media files:"

log "Production CMS data has been restored locally. Restart npm run dev if it was running."
