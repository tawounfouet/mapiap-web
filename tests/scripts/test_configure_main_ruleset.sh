#!/usr/bin/env bash
# Offline contract tests with a fake GitHub CLI. No network or GitHub writes.
set -Eeuo pipefail

SCRIPT="${1:-$(cd "$(dirname "$0")/../.." && pwd)/scripts/github/configure_main_ruleset.sh}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
export MOCK_DIR="$TMP/state"
mkdir -p "$MOCK_DIR" "$TMP/bin"

cat > "$TMP/bin/gh" <<'MOCK'
#!/usr/bin/env bash
set -Eeuo pipefail
case "$1" in
  auth) exit 0 ;;
  api) shift ;;
  *) echo "Unexpected gh subcommand" >&2; exit 97 ;;
esac
if [[ "${1:-}" == "--method" ]]; then
  method="$2"; shift 2
else
  method="GET"
fi
url="${1:-}"; shift || true
if [[ "$method" == "POST" ]]; then
  [[ "$url" == "repos/tawounfouet/mapiap-web/rulesets" ]] || exit 98
  [[ "$1" == "--input" ]] || exit 99
  [[ ! -e "$MOCK_DIR/ruleset.json" ]] || exit 96
  jq -c '. + {id: 42, source: "tawounfouet/mapiap-web", source_type: "Repository"}' "$2" > "$MOCK_DIR/ruleset.json"
  echo post >> "$MOCK_DIR/writes"
  cat "$MOCK_DIR/ruleset.json"
  exit 0
fi
[[ "$method" == "GET" ]] || exit 95
case "$url" in
  repos/tawounfouet/mapiap-web)
    if [[ -e "$MOCK_DIR/no_admin" ]]; then
      echo '{"full_name":"tawounfouet/mapiap-web","default_branch":"main","permissions":{"admin":false}}'
    else
      echo '{"full_name":"tawounfouet/mapiap-web","default_branch":"main","permissions":{"admin":true}}'
    fi
    ;;
  repos/tawounfouet/mapiap-web/branches/main)
    if [[ -e "$MOCK_DIR/ruleset.json" ]]; then
      echo '{"protected":true,"commit":{"sha":"0123456789abcdef0123456789abcdef01234567"}}'
    else
      echo '{"protected":false,"commit":{"sha":"0123456789abcdef0123456789abcdef01234567"}}'
    fi
    ;;
  'repos/tawounfouet/mapiap-web/rulesets?includes_parents=true&per_page=100')
    if [[ -e "$MOCK_DIR/ruleset.json" ]]; then jq -s '.' "$MOCK_DIR/ruleset.json"
    elif [[ -e "$MOCK_DIR/foreign.json" ]]; then cat "$MOCK_DIR/foreign.json"
    else echo '[]'; fi
    ;;
  repos/tawounfouet/mapiap-web/rulesets/42) cat "$MOCK_DIR/ruleset.json" ;;
  'repos/tawounfouet/mapiap-web/commits/0123456789abcdef0123456789abcdef01234567/check-runs?per_page=100')
    echo '{"check_runs":[{"name":"qualify","app":{"id":15368},"status":"completed","conclusion":"success"}]}'
    ;;
  *) echo "Unexpected API path $url" >&2; exit 94 ;;
esac
MOCK
chmod +x "$TMP/bin/gh"
export PATH="$TMP/bin:$PATH"

run() { bash "$SCRIPT" "$@"; }
run --plan > "$TMP/plan.txt"
grep -q 'DRY RUN' "$TMP/plan.txt"
[[ ! -e "$MOCK_DIR/writes" ]] || { echo "Plan caused writes" >&2; exit 1; }
if run --verify > "$TMP/verify-before.txt" 2>&1; then
  echo "Verify unexpectedly passed without ruleset" >&2; exit 1
fi
run --apply > "$TMP/apply.txt"
grep -q 'SUCCESS: ruleset 42 created and verified' "$TMP/apply.txt"
[[ $(wc -l < "$MOCK_DIR/writes") -eq 1 ]]
run --verify > "$TMP/verify.txt"
grep -q 'PASS: active ruleset 42' "$TMP/verify.txt"
run --apply > "$TMP/reapply.txt"
grep -q 'No changes required' "$TMP/reapply.txt"
[[ $(wc -l < "$MOCK_DIR/writes") -eq 1 ]]

# Drift must fail closed and must never overwrite the existing ruleset.
cp "$MOCK_DIR/ruleset.json" "$TMP/ruleset-original.json"
jq '.rules |= map(if .type == "required_status_checks" then .parameters.strict_required_status_checks_policy = false else . end)' \
  "$TMP/ruleset-original.json" > "$MOCK_DIR/ruleset.json"
if run --verify > "$TMP/drift.txt" 2>&1; then
  echo "Verify unexpectedly passed with disabled strict checks" >&2; exit 1
fi
if run --apply > "$TMP/overwrite.txt" 2>&1; then
  echo "Apply unexpectedly overwrote drifted ruleset" >&2; exit 1
fi
[[ $(wc -l < "$MOCK_DIR/writes") -eq 1 ]]

# Existing foreign rulesets must not be overwritten or silently added to.
rm "$MOCK_DIR/ruleset.json"
echo '[{"id":7,"name":"Other protection","enforcement":"active","target":"branch"}]' > "$MOCK_DIR/foreign.json"
if run --apply > "$TMP/foreign.txt" 2>&1; then
  echo "Apply unexpectedly passed with foreign ruleset" >&2; exit 1
fi
rm "$MOCK_DIR/foreign.json"
touch "$MOCK_DIR/no_admin"
if run --apply > "$TMP/admin.txt" 2>&1; then
  echo "Apply unexpectedly passed without admin" >&2; exit 1
fi
[[ $(wc -l < "$MOCK_DIR/writes") -eq 1 ]]

echo "PASS: plan is read-only, create/readback, verify, idempotency, drift refusal, foreign-rule refusal, admin refusal"
