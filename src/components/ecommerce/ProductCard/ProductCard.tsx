import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type ProductCardSize = "sm" | "md" | "lg";

/** `vertical` = image on top (default). `horizontal` = thumbnail left, details right — for cart rows, search results, etc. */
export type ProductCardLayout = "vertical" | "horizontal";

export interface ProductCardProps {
  /** When provided, the card renders as a link to the product page */
  href?: string;
  /** Size of the card (affects image footprint and typography) */
  size?: ProductCardSize;
  /**
   * Layout direction.
   * - `vertical`: stacked image + content (catalog tiles).
   * - `horizontal`: image and content side by side (dense lists).
   */
  layout?: ProductCardLayout;
  /** Whether the product is out of stock (adds visual treatment) */
  disabled?: boolean;
  /** Card content — order: `ProductCardImage` then `ProductCardContent` */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface ProductCardImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional overlay content (e.g. ProductCardBadges) */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface ProductCardBadgesProps {
  /** Badges to display (e.g. Promo, Nouveau, En stock) */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Top-right overlay on **ProductCardImage** (e.g. icon-only favorite). Renders `null` without children.
 * Children that are (or contain) a `button` get a **semi-opaque surface** + blur for contrast on photos.
 */
export interface ProductCardFavoriteProps {
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface ProductCardBrandProps {
  /** Brand name (e.g. Nike, Asics, Saucony) */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface ProductCardTitleProps {
  /** Product name */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface ProductCardPriceProps {
  /** Current price (formatted string, e.g. "89,99 €") */
  price: string;
  /** Original price when on sale (formatted string) */
  originalPrice?: string;
  /** Additional CSS classes */
  className?: string;
}

export interface ProductCardActionsProps {
  /** Action buttons or links (e.g. Add to cart) */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ── Context ────────────────────────────────────────────────────────────────

interface ProductCardContextValue {
  size: ProductCardSize;
  disabled: boolean;
  layout: ProductCardLayout;
}

const ProductCardContext = React.createContext<ProductCardContextValue>({
  size: "md",
  disabled: false,
  layout: "vertical",
});

function useProductCard() {
  return React.useContext(ProductCardContext);
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<ProductCardSize, string> = {
  sm: "rounded-xl",
  md: "rounded-xl",
  lg: "rounded-2xl",
};

const imageAspectVerticalClasses: Record<ProductCardSize, string> = {
  sm: "aspect-[4/3]",
  md: "aspect-[4/3]",
  lg: "aspect-[4/3]",
};

/** Horizontal layout: fixed width, stretches to full card height; image is cover-filled */
const imageHorizontalClasses: Record<ProductCardSize, string> = {
  sm: "w-32 shrink-0 self-stretch min-h-0 rounded-l-xl",
  md: "w-40 shrink-0 self-stretch min-h-0 rounded-l-xl",
  lg: "w-48 shrink-0 self-stretch min-h-0 rounded-l-2xl",
};

// ── ProductCard (root) ────────────────────────────────────────────────────

export function ProductCard({
  href,
  size = "md",
  layout = "vertical",
  disabled = false,
  children,
  className,
}: ProductCardProps) {
  const ctx = React.useMemo<ProductCardContextValue>(
    () => ({ size, disabled, layout }),
    [size, disabled, layout],
  );

  const baseClasses = [
    "group w-full",
    // Vertical: grid so the text block gets a real 1fr row — flex-1 alone often
    // fails when the root’s height isn’t propagated from the grid cell.
    layout === "vertical" &&
      "grid min-h-0 h-full grid-rows-[auto_minmax(0,1fr)]",
    layout === "horizontal" && "flex flex-row items-stretch",
    "bg-surface-primary border border-border-default",
    "overflow-hidden transition-all duration-[200ms]",
    "hover:border-border-strong hover:shadow-md",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background-primary",
    disabled && "opacity-60 pointer-events-none",
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <ProductCardContext.Provider value={ctx}>
      {children}
    </ProductCardContext.Provider>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return <article className={baseClasses}>{content}</article>;
}

ProductCard.displayName = "ProductCard";

// ── ProductCardImage ──────────────────────────────────────────────────────

export function ProductCardImage({
  src,
  alt,
  children,
  className,
}: ProductCardImageProps) {
  const { size, layout } = useProductCard();

  return (
    <div
      className={[
        "relative overflow-hidden bg-surface-secondary",
        layout === "vertical" &&
          `shrink-0 ${imageAspectVerticalClasses[size]}`,
        layout === "horizontal" && imageHorizontalClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={src}
        alt={alt}
        className={[
          "object-cover transition-transform duration-[200ms] group-hover:scale-105",
          layout === "horizontal"
            ? "absolute inset-0 h-full w-full"
            : "h-full w-full",
        ].join(" ")}
      />
      {children}
    </div>
  );
}

ProductCardImage.displayName = "ProductCardImage";

// ── ProductCardBadges ──────────────────────────────────────────────────────

export function ProductCardBadges({
  children,
  className,
}: ProductCardBadgesProps) {
  if (!children) return null;

  return (
    <div
      className={[
        "absolute top-2 left-2 flex flex-wrap gap-1.5 z-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

ProductCardBadges.displayName = "ProductCardBadges";

// ── ProductCardFavorite ───────────────────────────────────────────────────

export function ProductCardFavorite({
  children,
  className,
}: ProductCardFavoriteProps) {
  if (!children) return null;

  return (
    <div
      className={[
        "absolute top-2 right-2 z-20 flex items-center justify-end",
        // Frosted pill + light border; icon uses currentColor → force white
        "[&_button]:bg-white/40! [&_button]:hover:bg-white/50! [&_button]:backdrop-blur-md [&_button]:shadow-sm",
        "[&_button]:border-white/45! [&_button]:text-white! [&_button]:hover:text-white! [&_button]:active:text-white!",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

ProductCardFavorite.displayName = "ProductCardFavorite";

// ── ProductCardContent ────────────────────────────────────────────────────

export interface ProductCardContentProps {
  children?: React.ReactNode;
  className?: string;
}

export function ProductCardContent({
  children,
  className,
}: ProductCardContentProps) {
  const { layout } = useProductCard();

  return (
    <div
      className={[
        "flex min-h-0 flex-col gap-1.5 p-4",
        // Vertical: parent is grid row 1fr — fill that row so mt-auto on price works.
        layout === "vertical" && "h-full min-h-0",
        layout === "horizontal" &&
          "min-w-0 flex-1 flex flex-col justify-start py-3 sm:py-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

ProductCardContent.displayName = "ProductCardContent";

// ── ProductCardBrand ──────────────────────────────────────────────────────

export function ProductCardBrand({
  children,
  className,
}: ProductCardBrandProps) {
  return (
    <span
      className={[
        "text-xs font-medium uppercase tracking-wider text-content-tertiary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

ProductCardBrand.displayName = "ProductCardBrand";

// ── ProductCardTitle ──────────────────────────────────────────────────────

export function ProductCardTitle({
  children,
  className,
}: ProductCardTitleProps) {
  const { size } = useProductCard();

  const sizeClasses: Record<ProductCardSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <h3
      className={[
        "font-medium text-content-primary line-clamp-2",
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </h3>
  );
}

ProductCardTitle.displayName = "ProductCardTitle";

// ── ProductCardPrice ──────────────────────────────────────────────────────

export function ProductCardPrice({
  price,
  originalPrice,
  className,
}: ProductCardPriceProps) {
  return (
    <div
      className={[
        "mt-auto flex flex-wrap items-baseline gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="font-semibold text-content-primary">{price}</span>
      {originalPrice && (
        <span className="text-sm text-content-tertiary line-through">
          {originalPrice}
        </span>
      )}
    </div>
  );
}

ProductCardPrice.displayName = "ProductCardPrice";

// ── ProductCardActions ────────────────────────────────────────────────────

export function ProductCardActions({
  children,
  className,
}: ProductCardActionsProps) {
  if (!children) return null;

  const { layout } = useProductCard();

  return (
    <div
      className={[
        "mt-2 border-t border-border-subtle pt-2",
        layout === "horizontal" && "pt-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

ProductCardActions.displayName = "ProductCardActions";
