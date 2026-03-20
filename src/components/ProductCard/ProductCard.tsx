import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type ProductCardSize = "sm" | "md" | "lg";

export interface ProductCardProps {
  /** When provided, the card renders as a link to the product page */
  href?: string;
  /** Size of the card (affects image ratio and typography) */
  size?: ProductCardSize;
  /** Whether the product is out of stock (adds visual treatment) */
  disabled?: boolean;
  /** Card content */
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
}

const ProductCardContext = React.createContext<ProductCardContextValue>({
  size: "md",
  disabled: false,
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

const imageAspectClasses: Record<ProductCardSize, string> = {
  sm: "aspect-[4/3]",
  md: "aspect-[4/3]",
  lg: "aspect-[4/3]",
};

// ── ProductCard (root) ────────────────────────────────────────────────────

export function ProductCard({
  href,
  size = "md",
  disabled = false,
  children,
  className,
}: ProductCardProps) {
  const ctx = React.useMemo<ProductCardContextValue>(
    () => ({ size, disabled }),
    [size, disabled],
  );

  const baseClasses = [
    "group block w-full",
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
  const { size } = useProductCard();

  return (
    <div
      className={[
        "relative overflow-hidden bg-surface-secondary",
        imageAspectClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-[200ms] group-hover:scale-105"
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

// ── ProductCardContent ────────────────────────────────────────────────────

export interface ProductCardContentProps {
  children?: React.ReactNode;
  className?: string;
}

export function ProductCardContent({
  children,
  className,
}: ProductCardContentProps) {
  return (
    <div
      className={[
        "flex flex-col gap-1.5 p-4",
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
        "flex items-baseline gap-2 flex-wrap",
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

  return (
    <div
      className={[
        "mt-2 pt-2 border-t border-border-subtle",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-[200ms]",
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
