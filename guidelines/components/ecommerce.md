# E-commerce

Storefront-specific compounds. Use these for product grids, storefront search & navigation, cart pages, and footers. NEVER re-implement these flows with raw markup.

```ts
import {
  ProductCard, ProductCardImage, ProductCardBadges, ProductCardFavorite,
    ProductCardContent, ProductCardBrand, ProductCardTitle, ProductCardPrice,
    ProductCardActions,
  EcommerceSearchInput,
  EcommerceNavigation, EcommerceNavigationMenu, EcommerceNavigationMenuList,
    EcommerceNavigationMenuItem, EcommerceNavigationMenuTrigger,
    EcommerceNavigationMenuContent, EcommerceNavigationMenuLink,
    EcommerceNavigationMenuIcon, EcommerceNavigationMegaViewport,
  CartContent, CartContentMain, CartContentAside, CartContentSection,
    CartContentItems, CartContentItem, CartContentRow, CartContentTotalRow,
    CartContentOrderSummary,
  Footer, FooterContent, FooterSection, FooterSectionTitle, FooterLink,
    FooterBottom,
} from "velocity-ds";
```

---

# ProductCard compound

Product grid tile with image, badges, title, price, favorite and actions.

## Parts

| Part | Purpose |
| --- | --- |
| `ProductCard` | Root — `layout` + `size` |
| `ProductCardImage` | Product photo (absolute positioned background for badges) |
| `ProductCardBadges` | Badge container (top-left) — for "New", "Sale", sizes |
| `ProductCardFavorite` | Heart toggle (top-right) |
| `ProductCardContent` | Wrapper for text area below image |
| `ProductCardBrand` | Brand / manufacturer name |
| `ProductCardTitle` | Product name (link) |
| `ProductCardPrice` | Price block (`value`, `originalValue`, `currency`) |
| `ProductCardActions` | Row of action buttons (Add to cart, Quick view) |

## Props

### `ProductCard`
| Prop | Type | Default |
| --- | --- | --- |
| `layout` | `"vertical" \| "horizontal"` | `"vertical"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |

### `ProductCardPrice`
| Prop | Type |
| --- | --- |
| `value` | `number` |
| `originalValue` | `number` (strikethrough if present) |
| `currency` | `string` (ISO code, default EUR) |

## Example — product grid tile

```tsx
<ProductCard layout="vertical" size="md">
  <ProductCardImage src="/images/aero-jersey.jpg" alt="Aero Jersey" />
  <ProductCardBadges>
    <Badge colorScheme="success">New</Badge>
    <Badge colorScheme="danger">-20%</Badge>
  </ProductCardBadges>
  <ProductCardFavorite />

  <ProductCardContent>
    <ProductCardBrand>Runswap</ProductCardBrand>
    <ProductCardTitle>Aero Jersey</ProductCardTitle>
    <ProductCardPrice value={103} originalValue={129} currency="EUR" />
    <ProductCardActions>
      <Button variant="solid" fullWidth leftIcon={<RiShoppingCart2Line />}>
        Add to cart
      </Button>
    </ProductCardActions>
  </ProductCardContent>
</ProductCard>
```

## Example — cart line (horizontal layout)

```tsx
<ProductCard layout="horizontal" size="sm">
  <ProductCardImage src={item.image} alt={item.title} />
  <ProductCardContent>
    <ProductCardBrand>{item.brand}</ProductCardBrand>
    <ProductCardTitle>{item.title}</ProductCardTitle>
    <ProductCardPrice value={item.price} currency={item.currency} />
  </ProductCardContent>
</ProductCard>
```

## Rules

- ALWAYS render a `ProductCardImage` with `alt`.
- Use `ProductCardBadges` for status tags, `ProductCardFavorite` for the heart — don't replicate these with custom markup.
- For the main action, prefer a solid `Button` with `fullWidth` in `ProductCardActions`.
- NEVER wrap the whole `ProductCard` in an `<a>`. Let `ProductCardTitle` and `ProductCardImage` handle navigation via their own `href`/`onClick` props.

---

# EcommerceSearchInput

Storefront-optimized search input (larger, with icon, animated placeholder).

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `placeholder` | `string` | — |
| `suggestions` | `string[]` (animated rotating placeholder) | — |
| `value` / `onChange` | controlled | — |
| `onSubmit` | `(query: string) => void` | — |

```tsx
<EcommerceSearchInput
  placeholder="Search"
  suggestions={["trail shoes", "road jersey", "cycling bibs"]}
  onSubmit={runSearch}
/>
```

## Rules
- Use this component in the storefront header, NEVER a plain `Input` with a `RiSearchLine` icon.
- Provide `suggestions` for animated placeholder rotation when the input is empty.

---

# EcommerceNavigation compound

Storefront top navigation with mega menu.

## Parts

| Part | Purpose |
| --- | --- |
| `EcommerceNavigation` | Root |
| `EcommerceNavigationMenu` | Root menu (replaces native `<nav>`) |
| `EcommerceNavigationMenuList` | Horizontal list of top-level categories |
| `EcommerceNavigationMenuItem` | Single top-level entry |
| `EcommerceNavigationMenuTrigger` | Button that opens a mega menu |
| `EcommerceNavigationMenuContent` | Mega menu content panel |
| `EcommerceNavigationMenuLink` | Link inside the mega menu |
| `EcommerceNavigationMenuIcon` | Icon slot inside menu items |
| `EcommerceNavigationMegaViewport` | The animated mega panel viewport |

## Example

```tsx
<EcommerceNavigation>
  <EcommerceNavigationMenu>
    <EcommerceNavigationMenuList>
      <EcommerceNavigationMenuItem>
        <EcommerceNavigationMenuTrigger>Running</EcommerceNavigationMenuTrigger>
        <EcommerceNavigationMenuContent>
          <EcommerceNavigationMenuLink href="/running/road">Road</EcommerceNavigationMenuLink>
          <EcommerceNavigationMenuLink href="/running/trail">Trail</EcommerceNavigationMenuLink>
          <EcommerceNavigationMenuLink href="/running/track">Track</EcommerceNavigationMenuLink>
        </EcommerceNavigationMenuContent>
      </EcommerceNavigationMenuItem>

      <EcommerceNavigationMenuItem>
        <EcommerceNavigationMenuTrigger>Cycling</EcommerceNavigationMenuTrigger>
        <EcommerceNavigationMenuContent>
          <EcommerceNavigationMenuLink href="/cycling/road">Road</EcommerceNavigationMenuLink>
          <EcommerceNavigationMenuLink href="/cycling/gravel">Gravel</EcommerceNavigationMenuLink>
        </EcommerceNavigationMenuContent>
      </EcommerceNavigationMenuItem>
    </EcommerceNavigationMenuList>

    <EcommerceNavigationMegaViewport />
  </EcommerceNavigationMenu>
</EcommerceNavigation>
```

## Rules
- ALWAYS include `EcommerceNavigationMegaViewport` inside the `EcommerceNavigationMenu`, after the list.
- DO NOT nest two mega menus. Each top-level trigger opens its own content panel.
- For mobile, collapse this into a `Drawer` with a simple link list — do NOT render mega viewports on small screens.

---

# CartContent compound

Layout primitives for a cart page / drawer.

## Parts

| Part | Purpose |
| --- | --- |
| `CartContent` | Root (grid wrapper) |
| `CartContentMain` | Main column — line items |
| `CartContentAside` | Aside column — order summary |
| `CartContentSection` | Visual grouping (e.g. "Items", "Promo code") |
| `CartContentItems` | List container for cart rows |
| `CartContentItem` | One cart line (usually a `ProductCard` horizontal) |
| `CartContentRow` | Generic label/value row (shipping, discount) |
| `CartContentTotalRow` | Emphasized total row |
| `CartContentOrderSummary` | Pre-composed summary panel |

## Example

```tsx
<CartContent>
  <CartContentMain>
    <CartContentSection title="Your items">
      <CartContentItems>
        {lines.map((line) => (
          <CartContentItem key={line.id}>
            <ProductCard layout="horizontal" size="sm">
              <ProductCardImage src={line.image} alt={line.title} />
              <ProductCardContent>
                <ProductCardTitle>{line.title}</ProductCardTitle>
                <ProductCardPrice value={line.price} />
              </ProductCardContent>
            </ProductCard>
          </CartContentItem>
        ))}
      </CartContentItems>
    </CartContentSection>
  </CartContentMain>

  <CartContentAside>
    <CartContentOrderSummary>
      <CartContentRow label="Subtotal" value="129 €" />
      <CartContentRow label="Shipping" value="Free" />
      <CartContentRow label="Discount" value="-20 €" />
      <CartContentTotalRow label="Total" value="109 €" />
      <Button variant="solid" fullWidth>Checkout</Button>
    </CartContentOrderSummary>
  </CartContentAside>
</CartContent>
```

## Rules
- ALWAYS use `ProductCard layout="horizontal"` for cart items — don't render custom row markup.
- `CartContentTotalRow` should appear LAST in the summary.
- For checkout sub-flows (shipping, payment), place a `Stepper` / multi-section `Form` inside `CartContentMain`, keep `CartContentAside` pinned.

---

# Footer compound

Marketing / e-commerce footer.

## Parts

| Part | Purpose |
| --- | --- |
| `Footer` | Root — `variant` |
| `FooterContent` | Main multi-column area |
| `FooterSection` | One column |
| `FooterSectionTitle` | Column heading |
| `FooterLink` | Link inside a section |
| `FooterBottom` | Bottom strip (legal, copyright, social) |

## Props

### `Footer`
| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"light" \| "dark"` | `"dark"` |

## Example

```tsx
<Footer variant="dark">
  <FooterContent>
    <FooterSection>
      <FooterSectionTitle>Shop</FooterSectionTitle>
      <FooterLink href="/running">Running</FooterLink>
      <FooterLink href="/cycling">Cycling</FooterLink>
      <FooterLink href="/sale">Sale</FooterLink>
    </FooterSection>

    <FooterSection>
      <FooterSectionTitle>Support</FooterSectionTitle>
      <FooterLink href="/help">Help center</FooterLink>
      <FooterLink href="/returns">Returns</FooterLink>
      <FooterLink href="/contact">Contact</FooterLink>
    </FooterSection>

    <FooterSection>
      <FooterSectionTitle>Company</FooterSectionTitle>
      <FooterLink href="/about">About</FooterLink>
      <FooterLink href="/careers">Careers</FooterLink>
      <FooterLink href="/press">Press</FooterLink>
    </FooterSection>
  </FooterContent>

  <FooterBottom>
    <Logo variant="wordmark" size="sm" />
    <p className="text-caption text-content-tertiary">
      © 2026 Runswap. All rights reserved.
    </p>
  </FooterBottom>
</Footer>
```

## Rules
- Always place the `Footer` as the last element of a page.
- Use `variant="dark"` for consumer storefronts (default) to anchor the page end.
- Limit `FooterContent` to 3–5 `FooterSection`s to avoid visual clutter.
- `Logo` in `FooterBottom` should be `variant="wordmark"` or `variant="mark"`, not `"full"`.

---

## Global rules (e-commerce)

- E-commerce compounds are OPINIONATED. If your mock doesn't match, adjust props/layout — do NOT rebuild the compound from scratch.
- Pricing: ALWAYS use `ProductCardPrice` — it handles discount strikethrough, currency, and accessibility.
- Favorite icon: ALWAYS use `ProductCardFavorite`. Do not create heart toggles with `IconButton` + custom state.
- For promotional strips above the nav, pair with `MarketingBanner` ([banners.md](./banners.md)).
- For the cart drawer (not page), use `Drawer side="right"` ([overlays.md](./overlays.md)) and nest `CartContent` inside.
