# AGENTS.md

## Cursor Cloud specific instructions

This is a Tailwind v4 + Base UI design system library (no standalone app — Storybook is the development UI).

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Type-check | `npm run type-check` |
| Storybook | `npm run storybook` (port 6006) |
| Build library | `npm run build` |
| Build tokens | `npm run build:tokens` |

### Gotchas

- **Port 6006 may be occupied** by a previous Storybook session. Pass `--port 6008` or kill the stale process first.
- **No lint config shipped yet** — `npm run lint` requires ESLint config files that are not in the repo. Type-check (`npm run type-check`) is the primary static analysis tool.
- **tokens.css is auto-generated** — never edit it directly; run `npm run build:tokens` instead.
- Component skill file at `.claude/agents/component-creator.md` has the full creation workflow and templates.
- **Storybook `--ci` flag** — use `npm run storybook -- --ci` to avoid interactive port prompts in non-TTY contexts.
- **Trigger render prop** — When composing `Dialog.Trigger` or `Drawer.Trigger` with `<Button />`, use the `render` prop (e.g. `render={<Button />}`) to avoid nested `<button>` elements. See the Dialog and Drawer stories for the pattern.
