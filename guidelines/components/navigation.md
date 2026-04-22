# Navigation

Tabs, Accordion, Breadcrumb, Pagination, Logo.

```ts
import {
  Tabs, TabsList, TabsTab, TabsIndicator, TabsPanel,
  Accordion, AccordionItem, AccordionTrigger, AccordionPanel,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator,
  Pagination, PaginationContent, PaginationItem,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
  Logo,
} from "velocity-ds";
```

---

# Tabs compound

Content switching between panels within the same page.

## Parts

- `Tabs` — root (`value` / `defaultValue` / `onValueChange`)
- `TabsList` — list of triggers
- `TabsTab` — single trigger (`value` prop)
- `TabsIndicator` — animated active-state indicator
- `TabsPanel` — content (`value` prop, matched to `TabsTab`)

## Example

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="reviews">Reviews</TabsTab>
    <TabsTab value="shipping">Shipping</TabsTab>
    <TabsIndicator />
  </TabsList>

  <TabsPanel value="overview">Product overview…</TabsPanel>
  <TabsPanel value="reviews">Reviews list…</TabsPanel>
  <TabsPanel value="shipping">Shipping info…</TabsPanel>
</Tabs>
```

## Rules
- Every `TabsPanel.value` MUST match a `TabsTab.value`.
- Include `TabsIndicator` inside `TabsList` (it tracks the active tab visually).
- Prefer Tabs over replicating content behind disclosures.
- Tabs are for **peer content** (different views of the same subject). For step-by-step flows use a stepper / multi-page navigation, not Tabs.

---

# Accordion compound

Collapsible content sections.

## Parts

- `Accordion` — root (`type="single" | "multiple"`, `collapsible`, `defaultValue`, `onValueChange`)
- `AccordionItem` — one collapsible block (`value` prop)
- `AccordionTrigger` — the clickable header
- `AccordionPanel` — the expanded content

## Example

```tsx
<Accordion type="single" collapsible defaultValue="shipping">
  <AccordionItem value="shipping">
    <AccordionTrigger>Shipping & returns</AccordionTrigger>
    <AccordionPanel>Free shipping over 50 €…</AccordionPanel>
  </AccordionItem>

  <AccordionItem value="sizing">
    <AccordionTrigger>Sizing guide</AccordionTrigger>
    <AccordionPanel>S fits chests 88–96 cm…</AccordionPanel>
  </AccordionItem>
</Accordion>
```

## Rules
- Use `type="single"` (one open at a time) for FAQ; `type="multiple"` when sections are independent.
- Every `AccordionItem` MUST have a unique `value`.
- Do NOT nest a full `Accordion` inside another `AccordionPanel`. Nest an `AccordionItem` directly if you really need hierarchy.

---

# Breadcrumb compound

Hierarchical page path.

## Parts

- `Breadcrumb` — root (`size`)
- `BreadcrumbItem` — wrapper for each entry
- `BreadcrumbLink` — navigable entry
- `BreadcrumbSeparator` — visual separator between items

## Example

```tsx
<Breadcrumb size="md" aria-label="Breadcrumb">
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/men">Men</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem aria-current="page">Running jersey</BreadcrumbItem>
</Breadcrumb>
```

## Rules
- The last item is the current page — set `aria-current="page"` and DO NOT wrap it in a `BreadcrumbLink`.
- Always include `aria-label="Breadcrumb"` on the root.
- Never truncate to fewer than 2 levels.

---

# Pagination compound

Page controls for long lists and tables.

## Parts

- `Pagination` — root (`size`)
- `PaginationContent` — horizontal list wrapper
- `PaginationItem` — single page number (`page`, `active`)
- `PaginationPrevious` / `PaginationNext` — prev/next buttons
- `PaginationEllipsis` — `...` truncation

## Example

```tsx
<Pagination size="md">
  <PaginationContent>
    <PaginationPrevious href="?page=1" />
    <PaginationItem page={1} href="?page=1" />
    <PaginationItem page={2} href="?page=2" active />
    <PaginationItem page={3} href="?page=3" />
    <PaginationEllipsis />
    <PaginationItem page={10} href="?page=10" />
    <PaginationNext href="?page=3" />
  </PaginationContent>
</Pagination>
```

## Rules
- Mark the current page with `active`. Only one `PaginationItem` can be `active` at a time.
- Use `PaginationEllipsis` when page count > 7; keep first and last page visible.
- Do NOT paginate lists with fewer than ~20 items — use infinite scroll or a plain list.

---

# Logo

Runswap / Velocity brand mark.

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `variant` | `"full" \| "mark" \| "wordmark"` | `"full"` |

```tsx
<Logo size="md" variant="full" />
<Logo size="sm" variant="mark" aria-label="Runswap" />
```

## Rules
- Use `variant="mark"` when space is tight (mobile header, favicon-like contexts).
- Use `variant="wordmark"` when the brand mark would look unbalanced alone.
- NEVER substitute the logo with a generic icon. Always use the `Logo` component.

---

## Rules (global)

- Tabs / Accordion / Breadcrumb / Pagination are ALL compounds — never flatten into a single element.
- Navigation components do NOT carry theming concerns; they inherit from semantic tokens automatically (light/dark works out of the box).
- For storefront top-level navigation (mega menu), use `EcommerceNavigation` ([ecommerce.md](./ecommerce.md)) — NOT a `Tabs` component repurposed.
