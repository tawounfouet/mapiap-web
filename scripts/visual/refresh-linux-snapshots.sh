#!/usr/bin/env bash
# Rebuild Playwright screenshot baselines in a reproducible Linux container.
# Run only after reviewing the intentional content/layout changes.
set -Eeuo pipefail

if [[ "${1:-}" != "--update" || $# -ne 1 ]]; then
  echo "Usage: bash scripts/visual/refresh-linux-snapshots.sh --update" >&2
  echo "This command regenerates nine visual baselines and does not commit them." >&2
  exit 2
fi

for binary in docker git; do
  command -v "$binary" >/dev/null 2>&1 || {
    echo "Missing required command: $binary" >&2
    exit 2
  }
done

root="$(git rev-parse --show-toplevel)"
cd "$root"

branch="$(git branch --show-current)"
if [[ "$branch" != "feat/rem-03-visual-consolidation" ]]; then
  echo "Refusing to modify snapshots outside feat/rem-03-visual-consolidation." >&2
  exit 3
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes before updating snapshots." >&2
  exit 3
fi

echo "Refreshing Playwright Chromium snapshots using Node.js 24 on Linux."
docker run --rm \
  -v "$root:/workspace" \
  -v mapiap-playwright-node_modules:/workspace/node_modules \
  -w /workspace \
  node:24-bookworm \
  bash -lc 'set -Eeuo pipefail
    npm install -g pnpm@12.5.1
    pnpm install --frozen-lockfile
    pnpm exec playwright install --with-deps chromium
    CI=1 pnpm exec playwright test \
      tests/e2e/home-visual.spec.ts \
      tests/e2e/cabinet-visual.spec.ts \
      --project=chromium --update-snapshots
  '

echo "Updated snapshot files (not yet committed):"
git status --short -- tests/e2e
echo "Review the nine PNG diffs visually before adding or committing them."
