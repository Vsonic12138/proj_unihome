#!/usr/bin/env bash

set -euo pipefail

HOST="aliyun"
SERVER_DIR="/opt/proj_unihome"
INSTALL_CERTBOT="false"
DOMAIN=""

usage() {
  cat <<'EOF'
Usage:
  bash ops/deploy/remote/aliyun-bootstrap.sh [--host <ssh-host>] [--server-dir <dir>] [--install-certbot] [--domain <domain>]

Examples:
  bash ops/deploy/remote/aliyun-bootstrap.sh
  bash ops/deploy/remote/aliyun-bootstrap.sh --domain example.com --install-certbot
EOF
}

parse_args() {
  while [ $# -gt 0 ]; do
    case "$1" in
      --host)
        HOST="${2:-}"; shift 2 ;;
      --server-dir)
        SERVER_DIR="${2:-}"; shift 2 ;;
      --install-certbot)
        INSTALL_CERTBOT="true"; shift 1 ;;
      --domain)
        DOMAIN="${2:-}"; shift 2 ;;
      -h|--help)
        usage; exit 0 ;;
      *)
        echo "[error] Unknown arg: $1" >&2
        exit 1 ;;
    esac
  done
}

remote() {
  ssh "$HOST" "$@"
}

main() {
  parse_args "$@"

  echo "==> Bootstrap server: $HOST ($SERVER_DIR)"

  # Use a remote heredoc to avoid local `$var` expansion (nginx config contains `$http_upgrade`, `$host`, etc).
  remote "SERVER_DIR='$SERVER_DIR' INSTALL_CERTBOT='$INSTALL_CERTBOT' DOMAIN='$DOMAIN' bash -s" <<'REMOTE'
    set -euo pipefail
    : "${SERVER_DIR:?}"
    : "${INSTALL_CERTBOT:?}"
    : "${DOMAIN:=}"

    export DEBIAN_FRONTEND=noninteractive
    apt-get update -y
    apt-get install -y ca-certificates curl gnupg lsb-release

    # Docker Engine + Compose plugin
    if ! command -v docker >/dev/null 2>&1; then
      install -m 0755 -d /etc/apt/keyrings
      # Use Aliyun mirror for Docker GPG key and repo
      curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | gpg --dearmor --batch --yes -o /etc/apt/keyrings/docker.gpg
      chmod a+r /etc/apt/keyrings/docker.gpg
      echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list
      apt-get update -y
      apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
      systemctl enable --now docker
    fi

    # Nginx
    if ! command -v nginx >/dev/null 2>&1; then
      apt-get install -y nginx
      systemctl enable --now nginx
    fi

    # Basic HTTP reverse proxy (supports optional canonical domain + www redirect). HTTPS can be enabled later.
    #
    # - If DOMAIN is provided: canonical is https://DOMAIN, and www.DOMAIN will 301 -> DOMAIN
    # - If DOMAIN is empty: fallback to server_name _ (works for IP access)
    if [ -n "$DOMAIN" ]; then
      cat > /etc/nginx/sites-available/proj_unihome <<EOF
server {
    listen 80;
    server_name www.${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    return 301 http://${DOMAIN}\$request_uri;
}

server {
    listen 80;
    server_name ${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        client_max_body_size 100m;
        proxy_connect_timeout 60s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }
}
EOF
    else
      cat > /etc/nginx/sites-available/proj_unihome <<'EOF'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        client_max_body_size 100m;
        proxy_connect_timeout 60s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }
}
EOF
    fi

    ln -sf /etc/nginx/sites-available/proj_unihome /etc/nginx/sites-enabled/proj_unihome
    rm -f /etc/nginx/sites-enabled/default || true
    nginx -t
    systemctl reload nginx

    if [ "$INSTALL_CERTBOT" = "true" ]; then
      apt-get install -y certbot python3-certbot-nginx
    fi

    mkdir -p "$SERVER_DIR/deploy" "$SERVER_DIR/shared" "$SERVER_DIR/media" "$SERVER_DIR/postgres-data" "$SERVER_DIR/backups"
    echo "[ok] Directories prepared under $SERVER_DIR"

    docker version >/dev/null
    docker compose version >/dev/null
    nginx -t >/dev/null
    echo "[ok] Docker/Compose/Nginx ready"
REMOTE

  echo ""
  echo "Next steps:"
  echo "1) Run init deploy: npm run deploy:aliyun:init (or bash ops/deploy/remote/aliyun-deploy.sh --mode init)"
  if [ -n "$DOMAIN" ] && [ "$INSTALL_CERTBOT" = "true" ]; then
    echo "2) Configure DNS to point $DOMAIN to this ECS, then enable HTTPS via certbot (manual step or follow docs)."
  fi
}

main "$@"
