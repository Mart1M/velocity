# Velocity — Components missing or to sync in Figma

This file is a **working checklist**: components that exist in code (`@runswap/velocity`) and still need to be **created or aligned** in the Runswap Figma library.

**How to use it**

- After each Figma audit, tick a row (`[x]`) when the component (or an equivalent set of variants) exists in design.
- Remove a row or move it to a “Covered” section if you only want **remaining work** listed here.
- Add the **Figma link** and **last review date** at the top of the file to avoid drift.

**Last Figma review:** _TBD (date)_  
**File / link:** _TBD_

---

## Foundations & tokens

Foundations (colour, type, spacing, radii, elevation) should exist in Figma as **variables / styles** aligned with `src/tokens/` and `src/styles/tokens.css`.

- [ ] Semantic color (surface, content, border, feedback, state…)
- [ ] Type scale (headings, body, labels…)
- [ ] Spacing & radii
- [ ] Dark mode (if applicable in the same file or a dedicated branch)

---

## Forms & fields

- [x] `Button`
- [ ] `IconButton`
- [ ] `Input`
- [ ] `NumberField`
- [ ] `Textarea`
- [ ] `Select` (+ options / groups)
- [ ] `Checkbox`
- [ ] `Radio` / `RadioGroup`
- [ ] `Switch`
- [ ] `Label`
- [ ] `SelectBox` (+ group)
- [ ] `Combobox`
- [ ] `DatePicker`
- [ ] `FileUpload`
- [ ] `Form` (`FormSection`, `FormField`, `FormLabel`, `FormDescription`, `FormMessage`, `FormActions`)

---

## Navigation & page structure

- [ ] `Logo`
- [ ] `Breadcrumb`
- [ ] `Pagination` (+ sub-parts)
- [ ] `Tabs` (`TabsList`, `TabsTab`, `TabsIndicator`, `TabsPanels`, `TabsPanel`)
- [x] `Accordion`
- [ ] `Separator`
- [ ] `Footer` (compound: sections, links, bottom bar)

---

## Feedback & overlays

- [ ] `Badge`
- [ ] `NotificationBadge`
- [ ] `Chip`
- [ ] `Spinner`
- [ ] `Skeleton`
- [ ] `Avatar`
- [ ] `Rating`
- [ ] `AlertBanner`
- [ ] `MarketingBanner`
- [ ] `Toast` (+ provider / viewport if modeled)
- [ ] `Dialog` (+ backdrop, title, actions)
- [ ] `Drawer`
- [ ] `Tooltip`
- [ ] `Popover`

---

## Data & content

- [ ] `Card` (+ header, title, content, footer…)
- [ ] `Table` (header, rows, cells, footer)

---

## E-commerce

- [ ] `ProductCard` (image, badges, favorite, title, price, actions…)
- [ ] `EcommerceSearchInput`
- [ ] `EcommerceNavigation` (menu, mega menu, links…)
- [ ] `CartContent` (cart layout, rows, totals, order summary)

---

## Outside atomic component scope

These are often **page-level patterns** rather than isolated Figma components; align with design (PLP, PDP, checkout sections, etc.).

- Listing grids / filters
- Detailed product gallery (if not covered by `ProductCard` + local rules)
- Multi-step checkout (wireframes or separate templates)

---

## Code reference

- Public exports: `src/index.ts`
- Narrative inventory (may lag behind code): `COMPONENTS.md`

When every item is ticked and foundations are up to date, this file can shrink to a short **Figma link + date** note at the top, or be archived.
