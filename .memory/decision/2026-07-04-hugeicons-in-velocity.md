---
date: 2026-07-04
user: Martin
category: decision
tags: [icons, hugeicons, velocity-ds]
---

## Hugeicons replaces Remix Icon in Velocity

Velocity uses `@hugeicons/react` + `@hugeicons/core-free-icons` (bundled dependency). Curated named icons live in `src/icons/`; consumers import `velocity-ds/icons`. `react-icons` is no longer a peer dependency.
