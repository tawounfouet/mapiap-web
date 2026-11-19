#!/usr/bin/env bash
# REM-02: Manage the MAPIAP GitHub ruleset for main using gh CLI.
# Safe by default: --plan does not change GitHub settings.
# Intended for a solo maintainer: PRs and CI required, 0 external approvals.
set -Eeuo pipefail
umask 077

readonly REPO="tawounfouet/mapiap-web"
readonly BRANCH="main"
readonly RULESET_NAME="MAPIAP_MAIN_PR_AND_CI"
readonly REQUIRED_CHECK="qualify"
readonly CHECK_APP_ID=15368  # GitHub Actions app, observed on main on 2026-11-19.
MODE="${1:---plan}"

usage() {
  cat <<'USAGE'
Usage: bash scripts/github/configure_main_ruleset.sh [--plan|--apply|--verify]

  --plan     Read GitHub, print proposed ruleset; do not change settings (default)
  --apply    Create ruleset, then verify by reading GitHub again
  --verify   Check the live ruleset without making changes

This script refuses to overwrite any existing ruleset or legacy branch protection.
Requires: gh (authenticated as repository administrator), jq and bash.
USAGE
}

if (( $# > 1 )); then usage >&2; exit 2; fi
case "$MODE" in
  --plan|--apply|--verify) ;;
  -h|--help) usage; exit 0 ;;
  *) usage >&2; exit 2 ;;
esac
for command in gh jq; do
  command -v "$command" >/dev/null 2>&1 || { echo "Missing command: $command" >&2; exit 2; }
done
gh auth status --hostname github.com >/dev/null 2>&1 || {
  echo "Authenticate with 'gh auth login' (repository Administration:write needed for --apply)." >&2
  exit 2
}

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
readonly API="repos/$REPO"
readonly BRANCH_API="$API/branches/$BRANCH"
readonly RULESETS_API="$API/rulesets"

# Inspect the exact repository and ref. Never silently target another repo.
gh api "$API" > "$TMP/repo.json"
jq -e --arg repo "$REPO" --arg branch "$BRANCH" '
  .full_name == $repo and .default_branch == $branch
' "$TMP/repo.json" >/dev/null || {
  echo "Repository identity/default-branch mismatch. Refusing to proceed." >&2; exit 3;
}
gh api "$BRANCH_API" > "$TMP/branch.json"
BASE_SHA="$(jq -er '.commit.sha' "$TMP/branch.json")"
gh api "$RULESETS_API?includes_parents=true&per_page=100" > "$TMP/rulesets.json"
jq -e 'type == "array"' "$TMP/rulesets.json" >/dev/null || {
  echo "Invalid GitHub ruleset list response" >&2; exit 3;
}

# Build the documented REST payload. No implicit organization/admin bypass.
jq -n --arg name "$RULESET_NAME" --arg branch "refs/heads/$BRANCH" \
  --arg check "$REQUIRED_CHECK" --argjson app "$CHECK_APP_ID" '{
    name: $name,
    target: "branch",
    enforcement: "active",
    bypass_actors: [],
    conditions: {ref_name: {include: [$branch], exclude: []}},
    rules: [
      {type: "deletion"},
      {type: "non_fast_forward"},
      {type: "pull_request", parameters: {
        dismiss_stale_reviews_on_push: false,
        require_code_owner_review: false,
        require_last_push_approval: false,
        required_approving_review_count: 0,
        required_review_thread_resolution: true
      }},
      {type: "required_status_checks", parameters: {
        do_not_enforce_on_create: false,
        required_status_checks: [{context: $check, integration_id: $app}],
        strict_required_status_checks_policy: true
      }}
    ]
  }' > "$TMP/policy.json"

# API readback may contain additional informational fields and rule defaults.
# Verify all the security-relevant invariants without editing those defaults.
verify_ruleset() {
  local file="$1"
  jq -e --arg repo "$REPO" --arg name "$RULESET_NAME" \
    --arg branch "refs/heads/$BRANCH" --arg check "$REQUIRED_CHECK" \
    --argjson app "$CHECK_APP_ID" '
    .source == $repo and .source_type == "Repository"
    and .name == $name and .target == "branch" and .enforcement == "active"
    and .conditions.ref_name.include == [$branch]
    and .conditions.ref_name.exclude == []
    and .bypass_actors == []
    and (([.rules[].type] | sort) == (["deletion", "non_fast_forward", "pull_request", "required_status_checks"] | sort))
    and ([.rules[] | select(.type == "pull_request")] | length) == 1
    and ([.rules[] | select(.type == "required_status_checks")] | length) == 1
    and ([.rules[] | select(.type == "pull_request") | .parameters] | all(.[];
      .required_approving_review_count == 0
      and .require_last_push_approval == false
      and .require_code_owner_review == false
      and .required_review_thread_resolution == true))
    and ([.rules[] | select(.type == "required_status_checks") | .parameters] | all(.[];
      .strict_required_status_checks_policy == true
      and .do_not_enforce_on_create == false
      and (.required_status_checks | length == 1)
      and .required_status_checks[0].context == $check
      and .required_status_checks[0].integration_id == $app))
  ' "$file" >/dev/null
}

managed_count="$(jq --arg name "$RULESET_NAME" '[.[] | select(.name == $name)] | length' "$TMP/rulesets.json")"
if (( managed_count > 1 )); then echo "Multiple identically named rulesets; manual reconciliation needed." >&2; exit 3; fi
managed_id="$(jq -r --arg name "$RULESET_NAME" '[.[] | select(.name == $name)] | .[0].id // empty' "$TMP/rulesets.json")"

read_existing() {
  [[ -n "$managed_id" ]] || { echo "No $RULESET_NAME ruleset is installed." >&2; return 1; }
  gh api "$RULESETS_API/$managed_id" > "$TMP/existing.json"
  if ! verify_ruleset "$TMP/existing.json"; then
    echo "Existing ruleset is not compliant. Manual reconciliation required (no overwrite)." >&2
    return 1
  fi
  gh api "$BRANCH_API" > "$TMP/protected-branch.json"
  if ! jq -e '.protected == true' "$TMP/protected-branch.json" >/dev/null; then
    echo "The ruleset exists but GitHub does not report main as protected." >&2
    return 1
  fi
  echo "PASS: active ruleset $managed_id verified on $REPO/$BRANCH."
  echo "Ruleset: https://github.com/$REPO/settings/rules/$managed_id"
}

if [[ "$MODE" == "--verify" ]]; then
  read_existing
  exit $?
fi

if [[ -n "$managed_id" ]]; then
  read_existing
  echo "No changes required (idempotent)."
  exit 0
fi

# Refuse to create an overlapping ruleset if GitHub already reports others.
if jq -e 'length > 0' "$TMP/rulesets.json" >/dev/null; then
  echo "Other repository/parent rulesets exist. Refusing to create another without reviewing overlaps." >&2
  jq -r '.[] | "- \(.id) \(.name) [\(.enforcement)]"' "$TMP/rulesets.json" >&2
  exit 3
fi
if jq -e '.protected == true' "$TMP/branch.json" >/dev/null; then
  echo "main is already protected by another mechanism. Refusing to create overlapping rules." >&2
  exit 3
fi

# Verify a real, completed check from the trusted GitHub Actions integration.
gh api "$API/commits/$BASE_SHA/check-runs?per_page=100" > "$TMP/checks.json"
if ! jq -e --arg check "$REQUIRED_CHECK" --argjson app "$CHECK_APP_ID" '
  any(.check_runs[]; .name == $check and .app.id == $app
    and .status == "completed" and .conclusion == "success")
' "$TMP/checks.json" >/dev/null; then
  echo "Missing successful $REQUIRED_CHECK check from GitHub Actions ($CHECK_APP_ID) on main $BASE_SHA." >&2
  exit 3
fi

printf 'Repository: %s\nBranch: %s (%s)\nRequired check: %s [GitHub Actions app %s]\n' \
  "$REPO" "$BRANCH" "$BASE_SHA" "$REQUIRED_CHECK" "$CHECK_APP_ID"
echo 'Desired ruleset:'
jq . "$TMP/policy.json"

if [[ "$MODE" == "--plan" ]]; then
  echo 'DRY RUN: no GitHub settings changed. Use --apply to create and verify.'
  exit 0
fi

# An admin check before a write. No credentials are stored on disk.
jq -e '.permissions.admin == true' "$TMP/repo.json" >/dev/null || {
  echo "Repository admin permission is missing. Need repository Administration:write." >&2
  exit 3
}

# Fail on concurrent configuration drift between planning and actual creation.
gh api "$RULESETS_API?includes_parents=true&per_page=100" > "$TMP/rulesets-before-write.json"
jq -e 'length == 0' "$TMP/rulesets-before-write.json" >/dev/null || {
  echo "Rulesets changed during execution. Re-run --plan." >&2; exit 3;
}
gh api "$BRANCH_API" > "$TMP/branch-before-write.json"
jq -e --arg sha "$BASE_SHA" '.commit.sha == $sha and .protected == false' \
  "$TMP/branch-before-write.json" >/dev/null || {
  echo "main changed while preparing rules; please re-run --plan." >&2; exit 3;
}

# The only write: create a new active ruleset. No overwrites, deletions or bypasses.
gh api --method POST "$RULESETS_API" --input "$TMP/policy.json" > "$TMP/created.json"
created_id="$(jq -er '.id' "$TMP/created.json")"
gh api "$RULESETS_API/$created_id" > "$TMP/verified.json"
if ! verify_ruleset "$TMP/verified.json"; then
  echo "WARNING: GitHub write succeeded, but readback did NOT match the intended policy." >&2
  echo "Inspect https://github.com/$REPO/settings/rules/$created_id before further changes." >&2
  exit 4
fi
printf 'SUCCESS: ruleset %s created and verified.\n' "$created_id"
echo "https://github.com/$REPO/settings/rules/$created_id"
