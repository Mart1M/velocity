---
date: 2026-04-16
user: martinm
category: decision
tags: [design-system, tokens, figma, brand]
---

## Figma est la source de vérité pour les tokens · brand = yellow

Le fichier Figma Velocity (`FuvsFLuBl3HjgR9Ql3iw2x`) fait autorité sur les variables sémantiques. En cas d'écart entre Figma et les JSON (`packages/velocity/src/tokens/semantic/*`), aligner le code sur Figma puis regénérer `tokens.css` via `npm run build:tokens`.

**Couleur brand = `yellow` dans les deux modes** (jamais `primary`/orange). En mode Dark : `background.brand`, `border.brand`, `border.focus`, `accent.*`, `brand.primary`, `surface.brand-tint/emphasis` pointent tous sur `yellow.*` (400 en dark, 300 en light). L'orange `primary` reste disponible comme palette core mais n'est plus utilisé comme couleur brand sémantique.
