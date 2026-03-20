# Agents

## Cursor Cloud specific instructions

This is a Tailwind v4 + Base UI design system library (`@runswap/velocity`). Uses `npm` as package manager (see `package-lock.json`).

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Type-check | `npm run type-check` |
| Build (tokens + TS) | `npm run build` |
| Storybook (dev) | `npm run storybook` |
| Lint | `npm run lint` |

### Caveats

- Storybook may start on port **6007** instead of 6006 if another process occupies 6006. Check the startup output for the actual port.
- `npm run build` regenerates `src/styles/tokens.css` via `build:tokens` before TS compilation. Never hand-edit `tokens.css`.
- Components live under `src/components/<Name>/`. Each needs a barrel `index.ts` and an export line in `src/index.ts`.
- Native components (Input, Textarea) use `React.forwardRef`; Base UI-backed components (Button, Checkbox, Radio, Switch) do not.
