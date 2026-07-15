---
name: website-task-lifecycle
description: >-
  End-to-end workflow for professional_website tasks: Linear ticket setup under
  the Personal Website project, feature branch from main, PR using the repo
  template, and mandatory post-merge cleanup. Use when starting website work,
  shipping changes, opening PRs, the user says a PR was merged, or when asked
  to set up a Linear ticket and PR for this repo.
---

# Website Task Lifecycle

Full workflow for changes to `professional_website`. Follow all three phases in order.

## Phase 1 — Ticket & branch setup

### 1. Check Linear first

- Search the **Natan-personal** team (`NAT-*`) for an existing ticket before creating a duplicate.
- If a related ticket exists but is **Done**, create a new ticket (do not reopen unless the user asks).

### 2. Create or update the Linear issue

Use the Linear MCP `save_issue` tool:

| Field | Value |
|-------|-------|
| `team` | `Natan-personal` |
| `project` | `Personal Website` |
| `assignee` | `me` |
| `labels` | `Improvement` (default), `Bug`, or `Maintenance` as appropriate |
| `state` | `Backlog` or `Todo` when planning; `In Progress` when work starts |
| `priority` | `3` (Medium) unless user specifies otherwise |

Include in the description: current behaviour, desired behaviour, acceptance criteria, and affected files.

### 3. Branch from `main`

```powershell
git fetch origin main
git checkout main
git pull origin main
git checkout -b natanakt/nat-XX-short-description
```

Use the branch name from the Linear issue (`gitBranchName`) when available.

**Before switching branches:** stash or commit any unrelated WIP so checkout does not fail.

---

## Phase 2 — Implement, push, open PR

### 1. Commit & push

- Commit only files relevant to the ticket.
- Push with `git push -u origin HEAD`.

### 2. Open PR using the repo template

Read `.github/pull_request_template.md` and fill every section:

```markdown
## What Changed?
- 

## Why


## Files Changed
- 

## Testing
- [ ] 
- [ ] 
- [ ] 

## Linear
Closes [NAT-XX](https://linear.app/natan-personal/issue/NAT-XX/slug)
```

PR title format: `feat(NAT-XX): short description` (use `fix` for bugs).

```powershell
gh pr create --title "feat(NAT-XX): ..." --body "..."
```

### 3. Link Linear to PR

Update the Linear issue via `save_issue`:

- `state`: `In Progress`
- `links`: `[{ "url": "<pr-url>", "title": "PR #N: ..." }]`
- Add an **Implementation** section to the description noting the PR is ready for manual review.

**Do not merge** unless the user explicitly asks. The user reviews and merges manually.

---

## Phase 3 — Post-merge cleanup (required)

**Trigger:** user says the PR is merged, or confirms merge.

Run immediately — do not skip.

### 1. Verify merge

```powershell
gh pr view <number> --json state,mergedAt
```

### 2. Mark Linear Done

```powershell
# save_issue: id=NAT-XX, state=Done
# Update description with "What Was Shipped" and PR link
```

### 3. Sync local `main`

```powershell
git checkout main
git pull origin main
```

### 4. Delete merged local branches

```powershell
git branch -d natanakt/nat-XX-...
```

If git refuses because of a merge commit on the feature branch (not an indicator of unmerged work), use `-D` after confirming the PR is merged on GitHub.

### 5. Prune stale remote-tracking refs

```powershell
git fetch --prune origin
```

Remote branches are usually auto-deleted on merge; pruning cleans local refs.

### 6. Confirm clean state

```powershell
git branch --show-current   # must be: main
git status -sb              # must be clean (or only intentional untracked drafts)
```

**End state:** on `main`, up to date with `origin/main`, no merged feature branches locally.

### Optional asset cleanup

If the ticket replaced an asset and the old file is unreferenced, mention it to the user or open a separate small PR — do not push directly to `main` without explicit approval.

---

## Do not

- Merge PRs unless explicitly asked
- Push directly to `main` without explicit approval
- Skip post-merge cleanup after the user confirms a merge
- Create duplicate Linear tickets without searching first
- Leave the agent on a merged feature branch
