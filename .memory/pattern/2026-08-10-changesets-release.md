---
date: 2026-08-10
category: pattern
tags: [ci, npm, changesets, release]
---

Releases use Changesets with auto-merge: add a changeset (`pnpm changeset`), merge to `master`; CI opens the Version Packages PR, auto-merges it, then publishes npm + GitHub Release. Secrets: `NPM_TOKEN`, `RELEASE_GITHUB_TOKEN` (PAT so merge re-triggers publish). Enable repo “Allow auto-merge”.

