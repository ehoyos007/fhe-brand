#!/usr/bin/env bash
# wait-for-ci.sh — block until the latest GitHub Actions run for a SHA
# completes, then exit with that run's conclusion.
#
# Used by the /push skill when promoting a feature/worktree branch to main
# under a required-status-checks ruleset. Generic — takes repo + sha and
# polls. Doesn't know anything about the calling skill.
#
# Usage:   wait-for-ci.sh <owner/repo> <sha> [timeout_seconds]
# Default timeout: 600s (10 min). CI typically lands in 2-3 min.
#
# Exits:
#   0     CI completed successfully for the SHA
#   1     CI completed with failure (any job failed) — failed job names printed
#   2     Timeout reached before CI completed — last status printed
#   3     gh CLI missing or repo argument malformed
#   4     No workflow run ever appeared for the SHA (push didn't trigger one
#         OR the workflow doesn't run on the source branch's push event)
#
# stdout: progress lines suitable for tailing in a parent skill.

set -euo pipefail

REPO="${1:-}"
SHA="${2:-}"
TIMEOUT_SECONDS="${3:-600}"
POLL_INTERVAL=15

if [ -z "$REPO" ] || [ -z "$SHA" ]; then
  echo "usage: wait-for-ci.sh <owner/repo> <sha> [timeout_seconds]" >&2
  exit 3
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI not found in PATH" >&2
  exit 3
fi

DEADLINE=$(( $(date +%s) + TIMEOUT_SECONDS ))
RUN_ID=""
SAW_RUN=false

echo "wait-for-ci: $REPO @ ${SHA:0:7} (timeout ${TIMEOUT_SECONDS}s, poll ${POLL_INTERVAL}s)"

while [ "$(date +%s)" -lt "$DEADLINE" ]; do
  # Find a run for this SHA. GitHub may take a few seconds after a push to
  # register the run, so this initially returns empty.
  if [ -z "$RUN_ID" ]; then
    RUN_ID=$(gh run list \
      --repo "$REPO" \
      --limit 10 \
      --json databaseId,headSha \
      --jq ".[] | select(.headSha == \"$SHA\") | .databaseId" \
      2>/dev/null | head -1)
    if [ -n "$RUN_ID" ]; then
      SAW_RUN=true
      echo "run: $RUN_ID"
    fi
  fi

  if [ -n "$RUN_ID" ]; then
    STATUS=$(gh run view "$RUN_ID" --repo "$REPO" --json status --jq .status 2>/dev/null || echo "")
    if [ "$STATUS" = "completed" ]; then
      CONCLUSION=$(gh run view "$RUN_ID" --repo "$REPO" --json conclusion --jq .conclusion)
      if [ "$CONCLUSION" = "success" ]; then
        echo "conclusion: success"
        exit 0
      else
        echo "conclusion: $CONCLUSION"
        gh run view "$RUN_ID" --repo "$REPO" --json jobs \
          --jq '.jobs[] | select(.conclusion != "success") | "  failed: \(.name) (\(.conclusion))"'
        exit 1
      fi
    fi
    echo "status: $STATUS (elapsed $(( $(date +%s) - DEADLINE + TIMEOUT_SECONDS ))s)"
  else
    echo "no run yet for $SHA, waiting..."
  fi

  sleep "$POLL_INTERVAL"
done

if [ "$SAW_RUN" = "true" ]; then
  echo "timeout: run $RUN_ID still in progress after ${TIMEOUT_SECONDS}s"
  exit 2
else
  echo "timeout: no workflow run ever appeared for $SHA"
  exit 4
fi
