---
name: velocity-release
description: >-
  Release velocity-ds with Changesets (changeset → Version Packages PR → npm publish).
  Use when creating a new package version, adding a changeset, publishing to npm,
  or when the user mentions release, changelog, changeset, or bump version.
---

# Velocity release (Changesets)

Package: **`velocity-ds`**. Branch: **`master`**. CI: `.github/workflows/release.yml`.

## Flow (automated)

```
feature PR (+ .changeset/*.md) → merge to master
  → CI opens/updates "chore(release): version packages"
  → CI auto-merges that PR
  → CI publishes npm + GitHub Release
```

You only merge the feature PR. The Version Packages PR is merged by CI.

## Agent checklist

When the user asks for a release or a version bump after code changes:

1. **Confirm changes are committed** (or staged for a PR).
2. **Add a changeset** (do not edit `package.json` version by hand):

   ```bash
   pnpm changeset
   ```

   Or write `.changeset/<slug>.md` directly:

   ```md
   ---
   "velocity-ds": patch
   ---

   Short user-facing summary of the change.
   ```

   Bump types: `patch` (fix/tokens), `minor` (new component/API), `major` (breaking).

3. **Commit the changeset file** with the feature (or a follow-up commit).
4. Tell the user to **merge to `master`** — publish follows automatically.
5. Do **not** run `npm publish` / `pnpm release` locally unless they explicitly ask.

## Scripts

| Command | Role |
|---------|------|
| `pnpm changeset` | Interactive: create a changeset |
| `pnpm version-packages` | Apply changesets → bump version + CHANGELOG (CI) |
| `pnpm release` | `pnpm build && changeset publish` (CI) |

## Secrets / repo settings

| Item | Role |
|------|------|
| `NPM_TOKEN` | Publish to npm |
| `RELEASE_GITHUB_TOKEN` | PAT (repo) so auto-merge can re-trigger Release to publish. Without it, auto-merge may not start the publish job. |
| Repo → Settings → General → **Allow auto-merge** | Required for `gh pr merge --auto` |

Only `velocity-ds` is versioned; keep playground packages `private: true` if added later (or list them in `ignore` once they exist in the workspace).

## Do / don’t

- **Do** add a changeset for any user-facing or API change that should ship.
- **Do** keep the summary short and consumer-facing (goes into CHANGELOG).
- **Don’t** bump `"version"` in `package.json` manually.
- **Don’t** close the Version Packages PR manually — CI auto-merges it.
- **Don’t** publish without a changeset (CI will no-op or only refresh the empty release PR).
