# Button & IconButton

## When to use
Read this file any time you need an interactive action — form submission, navigation trigger, or command. NEVER use a raw `<button>`; always use the Velocity `Button` or `IconButton`.

```ts
import { Button, IconButton } from "velocity-ds";
```

---

# Button

## When to use
Use `Button` for any labeled action: primary CTAs, secondary actions, destructive actions, links styled as buttons.

## Props

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"solid" \| "soft" \| "ghost" \| "outline" \| "link"` | `"solid"` |
| `colorScheme` | `"primary" \| "neutral" \| "success" \| "warning" \| "danger"` | `"primary"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `leftIcon` | `ReactNode` | — |
| `rightIcon` | `ReactNode` | — |
| `loading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `fullWidth` | `boolean` | `false` |

Also accepts all native `<button>` HTML attributes.

## Variant decision tree

```
┌─ "What Button variant should I use?"
│
├─ Main CTA (one per section)?
│  └─ variant="solid"     ⭐ most common primary action
│
├─ Supporting action alongside a primary?
│  └─ variant="outline"   or variant="soft"
│
├─ Low-emphasis / tertiary action?
│  └─ variant="ghost"
│
└─ Should look like a text link (navigation)?
   └─ variant="link"
```

## colorScheme decision tree

```
┌─ "What colorScheme should I use?"
│
├─ Default brand action?
│  └─ colorScheme="primary"
│
├─ Neutral / secondary action (Cancel, Back)?
│  └─ colorScheme="neutral"
│
├─ Positive confirmation (Save published)?
│  └─ colorScheme="success"
│
├─ Destructive action (Delete, Remove)?
│  └─ colorScheme="danger"
│
└─ Warning-worthy action (Unpublish)?
   └─ colorScheme="warning"
```

## Size

| Size | Use |
| --- | --- |
| `"sm"` | Dense UI, inline actions, compact toolbars |
| `"md"` | **Default** — most actions |
| `"lg"` | Landing heroes, critical standalone CTAs |

## Examples

```tsx
{/* Primary CTA */}
<Button variant="solid" colorScheme="primary">Add to cart</Button>

{/* Supporting action */}
<Button variant="outline" colorScheme="neutral">Cancel</Button>

{/* Destructive action */}
<Button variant="solid" colorScheme="danger">Delete account</Button>

{/* With icons */}
<Button variant="solid" leftIcon={<RiShoppingCart2Line />}>Checkout</Button>
<Button variant="ghost" rightIcon={<RiArrowRightLine />}>Next</Button>

{/* Loading state */}
<Button variant="solid" loading>Saving…</Button>

{/* Full width */}
<Button variant="solid" fullWidth>Continue</Button>

{/* As a link (Base UI render pattern) */}
<Button variant="link" render={<a href="/orders" />}>View orders</Button>
```

## Rules

- ONLY one `variant="solid" colorScheme="primary"` per visible section.
- In a Cancel + Save pair, Save goes on the right. Use `colorScheme="neutral"` + `variant="outline"` on Cancel.
- DO NOT use variant names that don't exist (`"secondary"`, `"destructive"`, `"cta"`). Valid variants: `"solid"`, `"soft"`, `"ghost"`, `"outline"`, `"link"`.
- DO NOT use `colorScheme="danger"` as a regular action color. Reserve it for destructive.
- DO NOT stack a second `colorScheme="primary"` button next to a primary — use `neutral` for the secondary action.
- ALWAYS pair icons (`leftIcon` / `rightIcon`) with imports from `react-icons/ri` (Remix Icon family).

---

# IconButton

## When to use
Use `IconButton` when an action is best represented by an icon alone — close buttons, toolbar actions, like/favorite, compact nav. NEVER render an `IconButton` without `aria-label`.

## Props

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | same set as `Button` | `"ghost"` |
| `colorScheme` | same set as `Button` | `"neutral"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `aria-label` | `string` | **required** |
| `disabled` | `boolean` | `false` |

## Examples

```tsx
<IconButton aria-label="Close" variant="ghost" size="sm">
  <RiCloseLine />
</IconButton>

<IconButton aria-label="Open filters" variant="outline">
  <RiFilter3Line />
</IconButton>

<IconButton aria-label="Add to favorites" variant="soft" colorScheme="primary">
  <RiHeart3Line />
</IconButton>
```

## Rules

- `aria-label` is REQUIRED. No exceptions.
- Prefer `variant="ghost"` for compact toolbars.
- Pair with `Tooltip` so sighted users can discover the action on hover.
- If the action has a label in the UI (next to the icon), use `Button` with `leftIcon`/`rightIcon` instead.
