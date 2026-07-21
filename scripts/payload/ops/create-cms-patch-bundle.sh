#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "$ROOT_DIR"

PKG_DIR="proj-unihome-cms-patch-bundle"
BUNDLE_NAME="proj-unihome-cms-patch-bundle.tar.gz"

log() {
  echo "==> $*"
}

die() {
  echo "[error] $*" >&2
  exit 1
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "未找到命令: $1"
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
  die "缺少 sha256sum/shasum，无法生成校验文件"
}

copy_path() {
  local src="$1"
  local dest="$PKG_DIR/$src"
  [ -e "$src" ] || die "缺少补丁包输入: $src"
  mkdir -p "$(dirname "$dest")"
  cp -a "$src" "$dest"
}

prepare_pkg_dir() {
  log "初始化 CMS 补丁包目录: $PKG_DIR"
  rm -rf "$PKG_DIR"
  mkdir -p "$PKG_DIR"
}

assemble_pkg() {
  log "复制 CMS 补丁运行所需文件"

  copy_path "package.json"
  copy_path "package-lock.json"
  copy_path "payload.config.ts"
  copy_path "tsconfig.json"
  copy_path "scripts/payload/ops/migrate-news-schema.ts"
  copy_path "scripts/payload/ops/migrate-case-studies-sort-order.ts"
  copy_path "scripts/payload/ops/apply-local-cms-patches.ts"
  copy_path "scripts/payload/seed/seed-news.ts"
  copy_path "scripts/payload/lib"
  copy_path "src/migrations"
  copy_path "src/payload"
  copy_path "src/lib"
  copy_path "src/i18n"
  copy_path "messages"
  copy_path "public/images/sponsors"

  cp "ops/deploy/run-production-cms-patch.sh" "$PKG_DIR/run-production-cms-patch.sh"
  chmod +x "$PKG_DIR/run-production-cms-patch.sh"

  local version git_commit built_at
  version="$(node -p "require('./package.json').version")"
  git_commit="$(git rev-parse HEAD 2>/dev/null || echo "unknown")"
  built_at="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

  cat > "$PKG_DIR/CMS_PATCH_RELEASE.json" <<EOF
{
  "version": "${version}",
  "gitCommit": "${git_commit}",
  "builtAtUtc": "${built_at}",
  "patches": [
    "news-schema-migration",
    "case-studies-sort-order",
    "home-sponsor-logos",
    "news-seed-and-home-showcase"
  ]
}
EOF
}

write_checksums() {
  log "生成 SHA256SUMS"
  : > "$PKG_DIR/SHA256SUMS"
  while IFS= read -r -d '' file; do
    local rel
    rel="${file#"$PKG_DIR/"}"
    printf "%s  %s\n" "$(sha256_file "$file")" "$rel" >> "$PKG_DIR/SHA256SUMS"
  done < <(find "$PKG_DIR" -type f -print0 | sort -z)
}

pack_bundle() {
  log "压缩 CMS 补丁包"
  rm -f "$BUNDLE_NAME"
  tar -czf "$BUNDLE_NAME" "$PKG_DIR"

  echo ""
  echo "=========================================================="
  echo "CMS 补丁包构建完成"
  echo "输出文件: $ROOT_DIR/$BUNDLE_NAME"
  echo ""
  echo "服务器端建议执行："
  echo "1) tar -xzf $BUNDLE_NAME -C /opt/proj_unihome/cms-patches/<version>/"
  echo "2) cd /opt/proj_unihome/cms-patches/<version>/$PKG_DIR"
  echo "3) bash run-production-cms-patch.sh apply"
  echo "=========================================================="
}

main() {
  need_cmd cp
  need_cmd find
  need_cmd git
  need_cmd node
  need_cmd tar

  prepare_pkg_dir
  assemble_pkg
  write_checksums
  pack_bundle
}

main "$@"
