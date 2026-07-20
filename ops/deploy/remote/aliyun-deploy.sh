#!/usr/bin/env bash

set -euo pipefail

HOST="unibot_aliyun"
SERVER_DIR="/opt/proj_unihome"
MODE="update" # init|update
DOMAIN=""
ORIGIN=""
TURNSTILE_SITE_KEY=""
BUNDLE_NAME="proj-unihome-deploy-bundle.tar.gz"
PKG_DIR="proj-unihome-deploy-bundle"

usage() {
  cat <<'EOF'
Usage:
  bash ops/deploy/remote/aliyun-deploy.sh --mode init|update [--host <ssh-host>] [--server-dir <dir>] [--domain <domain>] [--origin <origin>] [--turnstile-site-key <site-key>]

Notes:
  - init: uploads full bundle and initializes server (db restore/media restore optional).
  - update: uploads lightweight bundle and only restarts app (does not touch db/media).
  - If neither --domain nor --origin is provided, init will set origin to http://<resolved-hostname-ip>.
EOF
}

parse_args() {
  while [ $# -gt 0 ]; do
    case "$1" in
      --host)
        HOST="${2:-}"; shift 2 ;;
      --server-dir)
        SERVER_DIR="${2:-}"; shift 2 ;;
      --mode)
        MODE="${2:-}"; shift 2 ;;
      --domain)
        DOMAIN="${2:-}"; shift 2 ;;
      --origin)
        ORIGIN="${2:-}"; shift 2 ;;
      --turnstile-site-key)
        TURNSTILE_SITE_KEY="${2:-}"; shift 2 ;;
      -h|--help)
        usage; exit 0 ;;
      *)
        echo "[error] Unknown arg: $1" >&2
        exit 1 ;;
    esac
  done

  case "$MODE" in
    init|update) ;;
    *) echo "[error] Invalid --mode: $MODE" >&2; exit 1 ;;
  esac
}

resolve_hostname_ip() {
  # Best-effort: resolve ssh config HostName for HOST.
  if command -v ssh >/dev/null 2>&1; then
    local h
    h="$(ssh -G "$HOST" 2>/dev/null | awk '/^hostname / {print $2; exit}')"
    if [ -n "$h" ]; then
      echo "$h"
      return 0
    fi
  fi
  echo ""
}

remote() {
  ssh "$HOST" "$@"
}

resolve_remote_origin() {
  remote "set -euo pipefail
    env_file=\"$SERVER_DIR/shared/.env.production\"
    if [ ! -f \"\$env_file\" ]; then
      exit 0
    fi
    current_origin=\$(grep -E '^NEXT_PUBLIC_SERVER_URL=' \"\$env_file\" | tail -n 1 | cut -d '=' -f2- || true)
    if [ -n \"\$current_origin\" ]; then
      printf '%s' \"\$current_origin\"
    fi
  " || true
}

resolve_remote_env_value() {
  local key="$1"
  remote "set -euo pipefail
    env_file=\"$SERVER_DIR/shared/.env.production\"
    if [ ! -f \"\$env_file\" ]; then
      exit 0
    fi
    value=\$(grep -E '^${key}=' \"\$env_file\" | tail -n 1 | cut -d '=' -f2- || true)
    if [ -n \"\$value\" ]; then
      printf '%s' \"\$value\"
    fi
  " || true
}

validate_turnstile_pair() {
  local mode="$1"
  local site_key="$2"
  local secret_key="$3"

  if [ "$mode" != "production" ]; then
    return 0
  fi

  if [ -n "$site_key" ] && [ -z "$secret_key" ]; then
    echo "[error] NEXT_PUBLIC_TURNSTILE_SITE_KEY 已配置，但 TURNSTILE_SECRET_KEY 缺失。生产环境必须同时配置二者。" >&2
    exit 1
  fi

  if [ -z "$site_key" ] && [ -n "$secret_key" ]; then
    echo "[error] TURNSTILE_SECRET_KEY 已配置，但 NEXT_PUBLIC_TURNSTILE_SITE_KEY 缺失。生产环境必须同时配置二者。" >&2
    exit 1
  fi
}

main() {
  parse_args "$@"
  local remote_turnstile_secret=""

  if [ -z "$ORIGIN" ]; then
    if [ -n "$DOMAIN" ]; then
      ORIGIN="https://${DOMAIN}"
    elif [ "$MODE" = "init" ]; then
      local ip
      ip="$(resolve_hostname_ip)"
      if [ -n "$ip" ]; then
        ORIGIN="http://${ip}"
      fi
    fi
  fi

  if [ "$MODE" = "update" ] && [ -z "$ORIGIN" ]; then
    ORIGIN="$(resolve_remote_origin)"
    if [ -n "$ORIGIN" ]; then
      echo "[info] Reuse remote NEXT_PUBLIC_SERVER_URL=$ORIGIN for build"
    fi
  fi

  if [ "$MODE" = "update" ] && [ -z "$TURNSTILE_SITE_KEY" ]; then
    TURNSTILE_SITE_KEY="$(resolve_remote_env_value NEXT_PUBLIC_TURNSTILE_SITE_KEY)"
    if [ -n "$TURNSTILE_SITE_KEY" ]; then
      echo "[info] Reuse remote NEXT_PUBLIC_TURNSTILE_SITE_KEY for build"
    else
      echo "[info] Remote NEXT_PUBLIC_TURNSTILE_SITE_KEY is empty; Turnstile widget will not be rendered in this build"
    fi
  fi

  if [ "$MODE" = "update" ]; then
    remote_turnstile_secret="$(resolve_remote_env_value TURNSTILE_SECRET_KEY)"
    validate_turnstile_pair "production" "$TURNSTILE_SITE_KEY" "$remote_turnstile_secret"
  fi

  echo "==> Build bundle (mode=$MODE)"
  if [ "$MODE" = "init" ]; then
    if [ -n "$ORIGIN" ]; then
      npm run deploy:bundle:init -- --origin "$ORIGIN" --turnstile-site-key "$TURNSTILE_SITE_KEY"
    else
      npm run deploy:bundle:init -- --turnstile-site-key "$TURNSTILE_SITE_KEY"
    fi
  else
    [ -n "$ORIGIN" ] || {
      echo "[error] update 模式无法确定构建所需的 NEXT_PUBLIC_SERVER_URL，请通过 --domain 或 --origin 显式传入，或确保服务器 shared/.env.production 已配置该值" >&2
      exit 1
    }
    npm run deploy:bundle:update -- --origin "$ORIGIN" --turnstile-site-key "$TURNSTILE_SITE_KEY"
  fi

  echo "==> Upload bundle to $HOST:$SERVER_DIR/$BUNDLE_NAME"
  scp "$BUNDLE_NAME" "$HOST:$SERVER_DIR/$BUNDLE_NAME"

  echo "==> Remote deploy (mode=$MODE)"
  remote "set -euo pipefail
    cd \"$SERVER_DIR\"

    rm -rf deploy.new
    mkdir -p deploy.new
    tar -xzf \"$BUNDLE_NAME\" -C deploy.new

    # deploy.new/<pkg-dir> is the bundle root
    if [ ! -d \"deploy.new/$PKG_DIR\" ]; then
      echo \"[error] invalid bundle: missing deploy.new/$PKG_DIR\" >&2
      exit 1
    fi

    mkdir -p shared media postgres-data backups

    # Initialize shared env once
    if [ ! -f shared/.env.production ]; then
      if [ -f \"deploy.new/$PKG_DIR/.env.production\" ]; then
        mv \"deploy.new/$PKG_DIR/.env.production\" shared/.env.production
      else
        echo \"[error] shared/.env.production missing and init bundle does not contain .env.production\" >&2
        exit 1
      fi
    fi

    if [ -n \"$ORIGIN\" ]; then
      # Only set origin when it's missing or still a placeholder.
      current_origin=\"\$(grep -E '^NEXT_PUBLIC_SERVER_URL=' shared/.env.production | tail -n 1 | cut -d '=' -f2- || true)\"
      if [ -z \"\$current_origin\" ] || [ \"\$current_origin\" = \"http://YOUR_DOMAIN_OR_IP\" ] || [ \"\$current_origin\" = \"https://YOUR_DOMAIN_OR_IP\" ] || [ \"\$current_origin\" = \"http://localhost:3005\" ] || [ \"\$current_origin\" = \"http://localhost:3000\" ]; then
        if grep -q '^NEXT_PUBLIC_SERVER_URL=' shared/.env.production; then
          sed -i 's#^NEXT_PUBLIC_SERVER_URL=.*#NEXT_PUBLIC_SERVER_URL=$ORIGIN#' shared/.env.production
        else
          echo 'NEXT_PUBLIC_SERVER_URL=$ORIGIN' >> shared/.env.production
        fi
      else
        echo \"[info] Keep existing NEXT_PUBLIC_SERVER_URL=\$current_origin\"
      fi
    fi

    # Promote deploy dir atomically
    rm -rf deploy.prev || true
    if [ -d deploy ]; then
      mv deploy deploy.prev
    fi
    mv \"deploy.new/$PKG_DIR\" deploy
    rm -rf deploy.new

    cd deploy
    chmod +x deploy.sh

    if [ \"$MODE\" = \"init\" ]; then
      bash deploy.sh init
    else
      bash deploy.sh update
    fi
  "

  echo "[ok] Done"
  if [ -n "$ORIGIN" ]; then
    echo "Origin: $ORIGIN"
  fi
}

main "$@"
