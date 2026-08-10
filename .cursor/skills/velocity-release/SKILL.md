---
name: velocity-release
description: >-
  Release velocity-ds with Changesets (changeset → Version Packages PR → npm publish).
  Use when creating a new package version, adding a changeset, publishing to npm,
  or when the user mentions release, changelog, changeset, or bump version.
---

# Velocity release (Changesets)

Package: **`velocity-ds`**. Branch: **`master`**. CI: `.github/workflows/release.yml`.

## Flow

```
feature PR (+ .changeset/*.md) → merge to master
  → CI opens/updates "chore(release): version packages"
  → merge that PR → build + npm publish + git tag
```

Publishing only happens when that release PR is merged — **not** on every push to `master`.

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
4. Tell the user to **merge to `master`**, then **merge the Version Packages PR** CI creates.
5. Do **not** run `npm publish` / `pnpm release` locally unless they explicitly ask.

## Scripts

| Command | Role |
|---------|------|
| `pnpm changeset` | Interactive: create a changeset |
| `pnpm version-packages` | Apply changesets → bump version + CHANGELOG (CI) |
| `pnpm release` | `pnpm build && changeset publish` (CI) |

## Config facts

- `.changeset/config.json`: `access: public`, `baseBranch: master`
- Secret required: GitHub **`NPM_TOKEN`** (npm publish token)
- Only `velocity-ds` is versioned; keep playground packages `private: true` if added later (or list them in `ignore` once they exist in the workspace)

## Do / don’t

- **Do** add a changeset for any user-facing or API change that should ship.
- **Do** keep the summary short and consumer-facing (goes into CHANGELOG).
- **Don’t** bump `"version"` in `package.json` manually.
- **Don’t** delete the Version Packages PR — merge it to publish.
- **Don’t** publish without a changeset (CI will no-op or only refresh the empty release PR).
