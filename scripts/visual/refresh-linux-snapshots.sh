#!/usr/bin/env bash
# Rebuild Playwright snapshots from the current commit in an isolated Linux x86-64
# production build. Never reuse the developer's .next directory or node_modules.
set -Eeuo pipefail

if [[ "${1:-}" != "--update" || $# -ne 1 ]]; then
  echo "Usage: bash scripts/visual/refresh-linux-snapshots.sh --update" >&2
  echo "Builds a fresh, isolated Linux x86-64 candidate and regenerates nine screenshots." >&2
  echo "Does not commit or push generated files." >&2
  exit 2
fi

for binary in docker git tar; do
  command -v "$binary" >/dev/null 2>&1 || {
    echo "Missing required command: $binary" >&2
    exit 2
  }
done

root="$(git rev-parse --show-toplevel)"
cd "$root"

if [[ "$(git branch --show-current)" != "feat/rem-03-visual-consolidation" ]]; then
  echo "Refusing to change snapshots outside feat/rem-03-visual-consolidation." >&2
  exit 3
fi
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes first." >&2
  exit 3
fi

# Every screenshot must correspond to a specific, committed source tree.
source_sha="$(git rev-parse HEAD)"
printf 'Source commit: %s\n' "$source_sha"
echo "Verifying Docker is available..."
docker info >/dev/null 2>&1 || {
  echo "Docker daemon unavailable. Start Docker Desktop and retry." >&2
  exit 3
}

# Create the workspace under the repository to allow Docker Desktop file sharing
# on macOS. It is deleted on exit, leaving only the nine approved PNG paths.
workspace="$(mktemp -d "$root/.mapiap-visual-work.XXXXXXXX")"
cleanup() { rm -rf -- "$workspace"; }
trap cleanup EXIT

# Archive precisely the tracked commit; ignored .next, local caches, and .env
# files are intentionally excluded from screenshot generation.
git archive --format=tar "$source_sha" | tar -xf - -C "$workspace"

echo "Building from source under Linux amd64 (same architecture as ubuntu-latest)."
docker run --rm --platform linux/amd64 \
  -v "$workspace:/workspace" \
  -v mapiap-playwright-amd64-dependencies:/workspace/node_modules \
  -w /workspace \
  node:24-bookworm \
  bash -lc 'set -Eeuo pipefail
    npm install -g pnpm@12.5.1
    pnpm install --frozen-lockfile
    rm -rf .next
    CI=1 pnpm build
    pnpm exec playwright install --with-deps chromium
    CI=1 pnpm exec playwright test \
      tests/e2e/home-visual.spec.ts \
      tests/e2e/cabinet-visual.spec.ts \
      --project=chromium --update-snapshots
  '

# No files have been written to the working tree until the build and all nine
# tests succeeded. Copy only the known screenshot output paths.
snapshots=(
  tests/e2e/cabinet-visual.spec.ts-snapshots/cabinet-mobile-390-chromium-linux.png
  tests/e2e/cabinet-visual.spec.ts-snapshots/cabinet-desktop-1440-chromium-linux.png
  tests/e2e/home-visual.spec.ts-snapshots/homepage-mobile-320-chromium-linux.png
  tests/e2e/home-visual.spec.ts-snapshots/homepage-mobile-390-chromium-linux.png
  tests/e2e/home-visual.spec.ts-snapshots/homepage-mobile-480-chromium-linux.png
  tests/e2e/home-visual.spec.ts-snapshots/homepage-tablet-768-chromium-linux.png
  tests/e2e/home-visual.spec.ts-snapshots/homepage-desktop-1024-chromium-linux.png
  tests/e2e/home-visual.spec.ts-snapshots/homepage-desktop-1440-chromium-linux.png
  tests/e2e/home-visual.spec.ts-snapshots/homepage-desktop-1536-chromium-linux.png
)
for snapshot in "${snapshots[@]}"; do
  if [[ ! -s "$workspace/$snapshot" ]]; then
    echo "Missing/empty screenshot: $snapshot. Nothing copied." >&2
    exit 4
  fi
done
if [[ "$(git rev-parse HEAD)" != "$source_sha" ]]; then
  echo "HEAD changed during generation. Refusing to copy outdated snapshots." >&2
  exit 4
fi
for snapshot in "${snapshots[@]}"; do
  cp "$workspace/$snapshot" "$root/$snapshot"
done

echo "PASS: nine fresh snapshots built from $source_sha and copied."
git status --short -- tests/e2e
echo "Inspect the PNGs before committing. No automatic git add, commit or push."
