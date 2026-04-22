# Banners

Inline banners for messages and promotions.

```ts
import { AlertBanner, MarketingBanner } from "velocity-ds";
```

---

# AlertBanner

Inline page-level alert (info / success / warning / error). NOT a toast — the alert stays visible until dismissed or resolved.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` |
| `title` | `string` | — |
| `description` | `ReactNode` | — |
| `action` | `{ label: string; onClick: () => void }` | — |
| `onDismiss` | `() => void` | — |

## Examples

```tsx
<AlertBanner
  variant="info"
  title="Free shipping on orders above 50 €"
  description="Auto-applied at checkout."
/>

<AlertBanner
  variant="warning"
  title="Low stock"
  description="Only 2 items left in your size."
/>

<AlertBanner
  variant="error"
  title="Payment failed"
  description="Your card was declined."
  action={{ label: "Try again", onClick: retryPayment }}
  onDismiss={close}
/>

<AlertBanner
  variant="success"
  title="Order confirmed"
  description="We'll send you a tracking email shortly."
/>
```

## AlertBanner vs Toast

- **AlertBanner** → persistent, inline in the layout (top of a page, top of a form), user-dismissible. For conditions the user should keep in mind while on the page.
- **Toast** → transient, floating viewport, auto-dismissed. For brief "it happened" feedback.

## Rules

- Place `AlertBanner` at the top of the relevant section (page, form, card), NOT at the very top of the app.
- Use `variant="error"` only for blocking problems. For non-blocking field errors, use `FormMessage`.
- Do NOT stack more than ONE `AlertBanner` of the same variant in a section.
- Always include `title`. `description` is optional but recommended.
- If the alert needs the user to act, provide `action`.

---

# MarketingBanner

Promotional storefront strip — site-wide announcements, seasonal campaigns, shipping promos, featured product highlights.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"solid" \| "soft" \| "outline"` | `"solid"` |
| `layout` | `"inline" \| "stacked"` | `"inline"` |
| `title` | `string` | — |
| `description` | `ReactNode` | — |
| `cta` | `MarketingBannerCta` (`{ label; onClick? ; href? }`) | — |
| `onDismiss` | `() => void` | — |

## Examples

```tsx
<MarketingBanner
  variant="solid"
  title="Summer sale — up to 40% off"
  cta={{ label: "Shop the sale", href: "/sale" }}
/>

<MarketingBanner
  variant="soft"
  layout="stacked"
  title="New collection: Trail 2026"
  description="Built for mountain ultras."
  cta={{ label: "Discover", href: "/collections/trail-2026" }}
/>

<MarketingBanner
  variant="outline"
  title="Free shipping over 50 €"
  onDismiss={hide}
/>
```

## Variants

- `"solid"` — brand background (yellow), high-attention. For limited-time offers.
- `"soft"` — tinted background, secondary emphasis. For informational promos.
- `"outline"` — bordered only, lightest. For persistent shipping/returns info.

## Layout

- `"inline"` — title + CTA on one line. Use in a sticky header / site-wide strip.
- `"stacked"` — title over CTA. Use as a section separator in storefront pages.

## Rules

- Place one `MarketingBanner` above the `EcommerceNavigation` for site-wide promos.
- Do NOT stack multiple `MarketingBanner`s back-to-back — pick the most important message.
- For brand (`variant="solid"`) banners, text color is auto-contrasted (`text-content-on-brand`). Do NOT override.
- Always include a CTA when the banner promotes action (sale, collection drop). Omit it for passive info (shipping notice).
- Reserve `MarketingBanner` for storefront context. For inline in-app messages, use `AlertBanner`.

---

## Decision tree — which banner to pick

```
┌─ "Which banner / alert should I use?"
│
├─ Transient "it happened" feedback?
│  └─ Toast (see overlays.md)
│
├─ Persistent page-level alert (user should notice)?
│  └─ AlertBanner
│
├─ Storefront promo / campaign strip?
│  └─ MarketingBanner
│
└─ Inline field error in a form?
   └─ FormMessage (see form.md)
```
