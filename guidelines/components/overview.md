# Components — catalog

All components are exported from the top-level `velocity-ds` entry point and built on **Base UI** primitives + Tailwind v4 semantic tokens.

```ts
import { Button, Card, Dialog, Form } from "velocity-ds";
```

NEVER import from `velocity-ds/dist/...` or `velocity-ds/src/...`.

## Catalog

### Actions
| Component | Alt names | Purpose | File |
| --- | --- | --- | --- |
| `Button` | CTA, action button | Solid / soft / ghost / outline / link button | [button.md](./button.md) |
| `IconButton` | Icon action, icon-only button | Icon-only button with required `aria-label` | [button.md](./button.md) |

### Inputs & forms
| Component | Alt names | Purpose | File |
| --- | --- | --- | --- |
| `Input` | Text input, text field | Single-line text entry | [inputs.md](./inputs.md) |
| `Textarea` | Multi-line input, text area | Multi-line text entry | [inputs.md](./inputs.md) |
| `NumberField` | Numeric input, stepper | Number input with +/- controls | [inputs.md](./inputs.md) |
| `Checkbox` | Check, boolean input | Boolean selection | [inputs.md](./inputs.md) |
| `RadioGroup` + `RadioItem` | Radio buttons, single select | Mutually exclusive choices | [inputs.md](./inputs.md) |
| `Switch` | Toggle, boolean switch | On/off setting toggle | [inputs.md](./inputs.md) |
| `Label` | Form label | Accessible label for custom controls | [inputs.md](./inputs.md) |
| `Select` | Dropdown, picker | Dropdown selection | [inputs.md](./inputs.md) |
| `Combobox` | Autocomplete, searchable select | Searchable dropdown | [inputs.md](./inputs.md) |
| `SelectBox` + `SelectBoxGroup` | Card selection, tile picker | Large tappable card-style selection (radio or checkbox) | [inputs.md](./inputs.md) |
| `DatePicker` | Calendar, date range | Single date or range picker | [inputs.md](./inputs.md) |
| `Form` | Form shell | Opinionated form layout with sections & fields | [form.md](./form.md) |
| `FileUpload` | File picker, dropzone | Drag-and-drop file uploader | [form.md](./form.md) |
| `Rating` | Stars, review rating | Star rating control | [form.md](./form.md) |

### Data display
| Component | Alt names | Purpose | File |
| --- | --- | --- | --- |
| `Badge` | Label, pill, status pill | Status or category pill | [data-display.md](./data-display.md) |
| `NotificationBadge` | Count badge, dot | Numeric/dot badge anchored to icons | [data-display.md](./data-display.md) |
| `Chip` | Tag, filter chip | Removable/selectable tag | [data-display.md](./data-display.md) |
| `Avatar` | Profile picture, user photo | User profile image with fallback | [data-display.md](./data-display.md) |
| `Separator` | Divider, hr | Horizontal or vertical divider | [data-display.md](./data-display.md) |
| `Spinner` | Loader, progress indicator | Loading spinner | [data-display.md](./data-display.md) |
| `Skeleton` | Shimmer, placeholder | Content loading placeholder | [data-display.md](./data-display.md) |
| `Card` | Panel, tile | Card compound (header / content / footer) | [data-display.md](./data-display.md) |
| `Table` | Data table, grid | Compound table | [data-display.md](./data-display.md) |

### Navigation
| Component | Alt names | Purpose | File |
| --- | --- | --- | --- |
| `Tabs` | Tab bar, tab switcher | Content switching between panels | [navigation.md](./navigation.md) |
| `Accordion` | Collapsible, expander, FAQ | Collapsible content sections | [navigation.md](./navigation.md) |
| `Breadcrumb` | Path, trail | Hierarchical page path | [navigation.md](./navigation.md) |
| `Pagination` | Pager, page controls | Page navigation for lists/tables | [navigation.md](./navigation.md) |
| `Logo` | Brand mark, wordmark | Runswap / Velocity brand mark | [navigation.md](./navigation.md) |

### Overlays
| Component | Alt names | Purpose | File |
| --- | --- | --- | --- |
| `Dialog` | Modal, popup | Modal dialog with backdrop | [overlays.md](./overlays.md) |
| `Drawer` | Sheet, side panel, flyout | Side panel (left/right/top/bottom) | [overlays.md](./overlays.md) |
| `Tooltip` | Hint, info tip | Contextual hint on hover/focus | [overlays.md](./overlays.md) |
| `Popover` | Floating panel, dropdown | Anchored floating panel | [overlays.md](./overlays.md) |
| `Toast` | Notification, snackbar | Brief notification with optional action | [overlays.md](./overlays.md) |

### Banners
| Component | Alt names | Purpose | File |
| --- | --- | --- | --- |
| `AlertBanner` | Inline alert, notice | Inline alert banner (info / success / warning / error) | [banners.md](./banners.md) |
| `MarketingBanner` | Promo banner, hero strip | Promotional storefront banner with CTA | [banners.md](./banners.md) |

### E-commerce
| Component | Alt names | Purpose | File |
| --- | --- | --- | --- |
| `ProductCard` | Product tile, product item | Product card with image / badges / price / actions | [ecommerce.md](./ecommerce.md) |
| `EcommerceSearchInput` | Search bar, storefront search | Storefront-optimized search input | [ecommerce.md](./ecommerce.md) |
| `EcommerceNavigation` | Top nav, mega menu, storefront header | Mega-menu storefront navigation | [ecommerce.md](./ecommerce.md) |
| `CartContent` | Cart page, basket layout | Cart screen layout primitives | [ecommerce.md](./ecommerce.md) |
| `Footer` | Site footer | Marketing / e-commerce footer | [ecommerce.md](./ecommerce.md) |

## Decision tree — choosing a component for user input

```
┌─ "How should the user give input?"
│
├─ Single free-text (one line)?
│  └─ Input
│
├─ Multi-line free text?
│  └─ Textarea
│
├─ Numeric with steppers?
│  └─ NumberField
│
├─ Boolean (form field)?
│  └─ Checkbox
│
├─ Boolean (settings toggle)?
│  └─ Switch
│
├─ One choice from few (≤5) mutually exclusive?
│  └─ RadioGroup
│
├─ One choice from many predefined?
│  └─ Select
│
├─ One choice searchable in a long list?
│  └─ Combobox
│
├─ Visual card-style selection (rich options)?
│  └─ SelectBox (single) / SelectBoxGroup (multi)
│
├─ A date or date range?
│  └─ DatePicker
│
├─ A file upload (drag & drop)?
│  └─ FileUpload
│
└─ A star rating (1–5)?
   └─ Rating
```

## Decision tree — showing feedback / status

```
┌─ "How should I show status to the user?"
│
├─ Brief transient notification?
│  └─ Toast  (requires ToastProvider at app root)
│
├─ Inline page-level alert banner?
│  └─ AlertBanner
│
├─ Promotional strip (storefront)?
│  └─ MarketingBanner
│
├─ Static status label on content?
│  └─ Badge
│
├─ Counter anchored to an icon?
│  └─ NotificationBadge
│
├─ Removable filter tag?
│  └─ Chip
│
├─ Loading a button or small area?
│  └─ Spinner
│
├─ Loading a layout (content shape)?
│  └─ Skeleton
│
├─ Critical blocking confirmation/task?
│  └─ Dialog
│
└─ Contextual hint on hover?
   └─ Tooltip
```

## Decision tree — navigation

```
┌─ "What navigation level is this?"
│
├─ Switch between sections of a page?
│  └─ Tabs
│
├─ Expand/collapse FAQ-style content?
│  └─ Accordion
│
├─ Show hierarchical path?
│  └─ Breadcrumb
│
├─ Paginate a long list/table?
│  └─ Pagination
│
└─ Storefront top nav with mega menu?
   └─ EcommerceNavigation
```

## Common props across components

- `size`: `"sm" | "md" | "lg"` (most components)
- `disabled`: boolean
- `className`: additional Tailwind classes
- Compound parts use the `ComponentName + Part` naming: `CardHeader`, `DialogPopup`, `TabsPanel`, `ProductCardImage`, etc.

## Rules

- ALWAYS read the component's specific file before using it for the first time in a session.
- ALWAYS use the compound parts when the component is a compound (`Card`, `Form`, `Dialog`, `Drawer`, `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`, `Tooltip`, `Popover`, `Toast`, `Table`, `ProductCard`, `CartContent`, `EcommerceNavigation`, `Footer`).
- NEVER flatten a compound component into a single `<div>` tree.
- NEVER invent variant names. Only use the ones listed in each component's file.
- NEVER use native HTML replacements (`<button>`, `<input>`, `<select>`, `<textarea>`) when Velocity ships an equivalent.
- ALWAYS provide `aria-label` on icon-only triggers (`IconButton`, close buttons).
- ALWAYS wrap your app root in `ToastProvider` and `TooltipProvider`.
