---
date: 2026-04-16
user: martinm
category: pattern
tags: [figma, design-system, template]
---

## Pattern · Documenter un composant Figma avec `Component Template`

Sur le fichier Figma Velocity (`FuvsFLuBl3HjgR9Ql3iw2x`), chaque page de composant (Badge, Button, Accordion, etc.) doit utiliser le composant `Component Template` (page `Template`, id `168:3`) qui expose deux TEXT props : `Title` et `Description`.

**Workflow** : créer une instance du template sur la page du composant, renseigner Title/Description, puis **détacher l'instance** (`detachInstance()`) pour pouvoir déplacer le component set du composant à l'intérieur du frame `Component slot`. Le détachement est volontaire et systématique — si le Template change ensuite, les pages déjà documentées ne se mettent pas à jour automatiquement (compromis accepté).
