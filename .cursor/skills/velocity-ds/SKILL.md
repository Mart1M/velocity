---
name: velocity-ds
description: Guides developers consuming the Velocity Design System (@runswap/velocity) to implement UIs using the correct components, semantic tokens, and composition patterns. Use when building any feature with Velocity DS, selecting components (Button, Input, Form, Card, Dialog, Tabs, Accordion, Table, Toast, etc.), applying color/spacing/typography tokens, composing accessible form layouts, using overlays (Dialog/Drawer/Tooltip/Popover), or reviewing code for DS compliance. Prevents raw hex usage, component reinvention, and broken accessibility patterns.
---

# Velocity Design System

**Stack**: React + [Base UI](https://base-ui.com) primitives + Tailwind v4 + semantic tokens  
**Package**: `@runswap/velocity`  
**Figma**: [Velocity DS file](https://www.figma.com/design/FuvsFLuBl3HjgR9Ql3iw2x/Untitled)

```ts
import { Button, Input, Form, FormField, ... } from '@runswap/velocity';
```

---

## Component Map

### Actions
| Component | Key props |
|-----------|-----------|
| `Button` | `variant` solid\|outline\|ghost\|link · `colorScheme` primary\|success\|warning\|danger\|neutral · `size` sm\|md\|lg · `loading` · `fullWidth` · `startIcon` · `endIcon` |
| `IconButton` | Same variants as Button, icon-only with accessible `aria-label` |

### Inputs & Selection
| Component | Key props |
|-----------|-----------|
| `Input` | `size` · `error` · `leadingIcon` · `trailingIcon` · `leadingAddon` · `trailingAddon` |
| `Textarea` | `size` · `error` · `resize` none\|vertical\|horizontal\|both |
| `NumberField` | `size` · `min` · `max` · `step` · `error` |
| `Select` | `size` · `placeholder` · `disabled` + `SelectOption` / `SelectGroup` |
| `Combobox` | `size` · `placeholder` · `multiple` + `ComboboxOption` / `ComboboxGroup` |
| `DatePicker` | `size` · `mode` single\|range · `value` · `onChange` |
| `Checkbox` | `size` sm\|md\|lg · `checked` · `defaultChecked` · `onCheckedChange` · `disabled` |
| `RadioGroup` + `RadioItem` | `value` · `defaultValue` · `onValueChange` · `disabled` |
| `Switch` | `size` · `checked` · `defaultChecked` · `onCheckedChange` |
| `SelectBox` + `SelectBoxGroup` | Visual radio/checkbox-style selectors |
| `FileUpload` | `size` · `accept` · `maxSize` · `multiple` · `orientation` |

### Form Composition
```tsx
<Form layout="vertical">
  <FormField name="email" invalid={!!errors.email}>
    <FormLabel required>Email</FormLabel>
    <FormDescription>We'll never share your email.</FormDescription>
    <Input type="email" size="md" error={!!errors.email} />
    <FormMessage>Please enter a valid email address.</FormMessage>
  </FormField>
  <FormActions>
    <Button variant="solid" colorScheme="primary" type="submit" fullWidth>
      Submit
    </Button>
  </FormActions>
</Form>
```
> See [patterns.md](patterns.md) for complete form recipes.

### Layout & Content
| Component | Key props |
|-----------|-----------|
| `Card` | `variant` default\|elevated\|outline\|muted · `size` sm\|md\|lg + `CardHeader(separator)` · `CardTitle` · `CardDescription` · `CardContent` · `CardFooter(separator)` |
| `Tabs` | `value` · `defaultValue` · `orientation` horizontal\|vertical + `TabsList` · `TabsTab` · `TabsIndicator` · `TabsPanels` · `TabsPanel` |
| `Accordion` | `multiple` · `disabled` + `AccordionItem(value)` · `AccordionTrigger(hideIcon)` · `AccordionPanel(keepMounted)` |
| `Table` | `size` sm\|md\|lg + `TableHeader` · `TableBody` · `TableFooter` · `TableRow` · `TableHead` · `TableCell` |
| `Separator` | `orientation` horizontal\|vertical |

### Display & Feedback
| Component | Key props |
|-----------|-----------|
| `Badge` | `variant` solid\|soft\|outline · `size` |
| `Chip` | `variant` · `size` · `onDismiss` |
| `Avatar` | `src` · `fallback` · `size` |
| `Rating` | `value` · `max` · `readOnly` · `size` |
| `NotificationBadge` | `count` · `variant` · `size` |
| `Spinner` | `size` · `colorScheme` |
| `Skeleton` | `variant` text\|circular\|rectangular · `animation` |
| `AlertBanner` | `variant` info\|success\|warning\|error · `action` |
| `MarketingBanner` | `variant` · `layout` · `cta` |
| `Label` | `size` sm\|md\|lg · `required` · `disabled` |

### Overlays
| Component | Notes |
|-----------|-------|
| `Dialog` | `size` sm\|md\|lg\|xl\|full + `DialogTrigger` · `DialogBackdrop` · `DialogPopup` · `DialogTitle` · `DialogDescription` · `DialogClose` |
| `Drawer` | `side` top\|right\|bottom\|left + same parts as Dialog |
| `Tooltip` | `TooltipProvider` at root + `TooltipTrigger` · `TooltipPositioner` · `TooltipPopup` |
| `Popover` | `side` · `PopoverTrigger` · `PopoverPositioner` · `PopoverPopup` |

### Navigation
| Component | Notes |
|-----------|-------|
| `Breadcrumb` | `size` + `BreadcrumbItem` · `BreadcrumbLink` · `BreadcrumbSeparator` |
| `Pagination` | `size` · `count` · `page` · `onPageChange` + content parts |
| `Footer` | `variant` + `FooterContent` · `FooterSection` · `FooterLink` · `FooterBottom` |

### Notifications
```tsx
// 1. Mount provider at app root
<ToastProvider>
  <App />
  <ToastViewport />
</ToastProvider>

// 2. Trigger from anywhere
const { toast } = useToast();
toast({ title: 'Saved', variant: 'success' });
```

---

## Non-Negotiable Rules

1. **Semantic tokens only** — no raw hex, no `text-[#abc]`, no `bg-[rgba(...)]`
2. **No component reinvention** — log a gap if something is missing; compose existing ones
3. **FormField wraps every form input** — enables Base UI label-control binding + error display
4. **Never use `<Label>` inside `<FormField>`** — use `<FormLabel>` (proper `Field.Label` binding)
5. **Accessibility is built in** — Base UI handles ARIA; don't override unless intentional
6. **Loading/disabled via props** — `Button loading` disables interaction; no manual `disabled` duplication
7. **`render` prop for links** — use `<Button render={<Link href="..." />}>` instead of `<a>`

---

## Token Quick Reference

```tsx
// Text
"text-content-primary"      // headings, body
"text-content-secondary"    // supporting text
"text-content-tertiary"     // placeholders, meta
"text-content-brand"        // brand accent text
"text-content-disabled"     // disabled labels

// Background
"bg-background-primary"     // page background
"bg-surface-primary"        // card / panel
"bg-surface-secondary"      // subtle section
"bg-surface-hover"          // hover state

// Border
"border-border-default"     // standard border
"border-border-subtle"      // dividers
"border-border-brand"       // focused/branded
"border-border-focus"       // focus ring

// Feedback
"text-feedback-negative"    // error text
"bg-state-success"          // success fill
"text-state-error"          // error fill text

// Shadow
"shadow-sm" / "shadow-md" / "shadow-lg"
```

> Complete token list + dark mode overrides: [tokens.md](tokens.md)

---

## References

- [components.md](components.md) — Full prop tables for every component
- [tokens.md](tokens.md) — Complete semantic token reference with CSS variables
- [patterns.md](patterns.md) — Composition cookbook: forms, cards, overlays, data tables
