---
date: 2026-08-10
category: pattern
tags: [ci, npm, changesets, release]
---

Releases use Changesets: add a changeset with `pnpm changeset`, merge to `master`, then CI opens a Version Packages PR; merging that PR runs `pnpm release` (build + publish). Requires GitHub secret `NPM_TOKEN`. Playground `velocity-native` is ignored.
