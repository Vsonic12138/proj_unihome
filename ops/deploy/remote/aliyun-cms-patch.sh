#!/usr/bin/env bash

set -euo pipefail

HOST="unibot_aliyun"
SERVER_DIR="/opt/proj_unihome"
APPLY="false"
BUNDLE_NAME="proj-unihome-cms-patch-bundle.tar.gz"
PKG_DIR="proj-unihome-cms-patch-bundle"

usage() {
  cat <<'EOF'
Usage:
  bash ops/deploy/remote/aliyun-cms-patch.sh [--host <ssh-host>] [--server-dir <dir>] [--apply]

Notes:
  - Without --apply, this script builds and uploads the CMS patch bundle only.
  - With --apply, it also runs bash run-production-cms-patch.sh apply on the server.
  - Run app deployment first when the CMS patch depends on new Payload schema.
EOF
}

parse_args() {
  while [ $# -gt 0 ]; do
    case "$1" in
      --host)
        HOST="${2:-}"; shift 2 ;;
      --server-dir)
        SERVER_DIR="${2:-}"; shift 2 ;;
      --apply)
        APPLY="true"; shift ;;
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

  local version patch_id remote_patch_dir
  version="$(node -p "require('./package.json').version")"
  patch_id="v${version}-$(date -u +"%Y%m%d%H%M%S")"
  remote_patch_dir="$SERVER_DIR/cms-patches/$patch_id"

  echo "==> Build CMS patch bundle"
  npm run cms:patch:bundle

  echo "==> Prepare remote patch dir: $HOST:$remote_patch_dir"
  remote "set -euo pipefail
    mkdir -p \"$remote_patch_dir\"
  "

  echo "==> Upload CMS patch bundle"
  scp "$BUNDLE_NAME" "$HOST:$remote_patch_dir/$BUNDLE_NAME"

  echo "==> Extract CMS patch bundle"
  remote "set -euo pipefail
    cd \"$remote_patch_dir\"
    rm -rf \"$PKG_DIR\"
    tar -xzf \"$BUNDLE_NAME\"
    chmod +x \"$PKG_DIR/run-production-cms-patch.sh\"
  "

  if [ "$APPLY" = "true" ]; then
    echo "==> Apply CMS patch on server"
    remote "set -euo pipefail
      cd \"$remote_patch_dir/$PKG_DIR\"
      SERVER_DIR=\"$SERVER_DIR\" bash run-production-cms-patch.sh apply
    "
  else
    echo ""
    echo "[ok] CMS patch uploaded but not applied."
    echo "Server path: $remote_patch_dir/$PKG_DIR"
    echo "Apply manually:"
    echo "  cd $remote_patch_dir/$PKG_DIR"
    echo "  SERVER_DIR=$SERVER_DIR bash run-production-cms-patch.sh apply"
  fi
}

main "$@"
