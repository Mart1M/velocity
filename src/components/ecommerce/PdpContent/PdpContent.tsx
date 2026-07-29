import * as React from "react";
import { Card, CardContent } from "../../Card/Card";

// ── Types ──────────────────────────────────────────────────────────────────

export interface PdpContentProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

export interface PdpContentBreadcrumbProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

export interface PdpContentGalleryColumnProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

export interface PdpContentBuyBoxProps extends React.ComponentPropsWithoutRef<"aside"> {
  children?: React.ReactNode;
}

export interface PdpContentBelowProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

/** Wraps gallery + buy box + details — sticky buy box releases at this region's bottom. */
export interface PdpContentStickyRegionProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

/** Full-width details row (tabs, description) — defines the sticky buy-box boundary. */
export interface PdpContentDetailsProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

/** Full-width region below details (related listings, recommendations). */
export interface PdpContentSuggestionsProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

export interface PdpContentSectionProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "title"
> {
  /** Section heading */
  title?: React.ReactNode;
  /** Element id for the heading (`aria-labelledby`) */
  titleId?: string;
  children?: React.ReactNode;
}

export interface PdpContentGalleryImage {
  /** Image URL */
  src: string;
  /** Accessible description */
  alt: string;
}

export interface PdpContentGalleryProps {
  /** Product photos — first image is selected by default */
  images: PdpContentGalleryImage[];
  /** Controlled selected index */
  selectedIndex?: number;
  /** Uncontrolled initial index */
  defaultSelectedIndex?: number;
  /** Called when the user picks another thumbnail */
  onSelectedIndexChange?: (index: number) => void;
  /** Overlay action (e.g. favorite `IconButton`) — top-right of the main image */
  favoriteAction?: React.ReactNode;
  /** Extra classes on the gallery root */
  className?: string;
}

export interface PdpContentBuyPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export interface PdpContentTitleProps extends React.ComponentPropsWithoutRef<"h1"> {
  children?: React.ReactNode;
}

export interface PdpContentAttributeProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Attribute label (e.g. "État", "Taille") */
  label: React.ReactNode;
  /** Attribute value */
  value: React.ReactNode;
}

export interface PdpContentTrustItemProps extends React.ComponentPropsWithoutRef<"li"> {
  /** Leading icon */
  icon: React.ReactNode;
  /** Short trust message */
  children: React.ReactNode;
}

export interface PdpContentSellerCardProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "title"
> {
  /** Seller display name */
  name: React.ReactNode;
  /** Optional subtitle (location, member since, …) */
  subtitle?: React.ReactNode;
  /** Avatar / profile visual */
  avatar?: React.ReactNode;
  /** Rating row (e.g. `Rating` + review count) */
  meta?: React.ReactNode;
  /** Trailing action (e.g. "Voir le profil" link button) */
  action?: React.ReactNode;
  className?: string;
}

export interface PdpContentMobileBarProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Price block — usually `Price` */
  price: React.ReactNode;
  /** Primary CTA — usually `Button` */
  action: React.ReactNode;
  className?: string;
}

// ── Layout ───────────────────────────────────────────────────────────────────

const pdpRootClass =
  "mx-auto flex w-full max-w-7xl flex-col gap-8 px-3 pb-24 sm:px-4 lg:gap-10 lg:px-6 lg:pb-12";

const pdpStickyRegionClass = "relative flex flex-col gap-8 lg:gap-10";

/** Left column width — gallery and details share the same track (~7/12 on large screens). */
const pdpMainColumnClass = "min-w-0 w-full lg:w-7/12";

/** Gallery column — buy box is absolutely positioned on the right. */
const pdpGalleryGridClass = pdpMainColumnClass;

/** Buy box track — in flow on mobile; absolute + sticky on large screens (sticky boundary = sticky region). */
const pdpBuyBoxGridClass =
  "min-w-0 w-full lg:absolute lg:inset-y-0 lg:right-0 lg:z-10 lg:w-5/12 lg:pl-10";

/** Details — same width as the gallery column. */
const pdpDetailsGridClass = pdpMainColumnClass;

/**
 * **Product detail page** layout shell: breadcrumb, sticky region (gallery + buy box + details), then suggestions.
 * Wrap gallery, buy box, and details in `PdpContentStickyRegion` so the buy panel unsticks before suggestions.
 */
export const PdpContent = React.forwardRef<HTMLDivElement, PdpContentProps>(
  function PdpContent({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={[pdpRootClass, className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  },
);

PdpContent.displayName = "PdpContent";

/** Inner grid for gallery / sticky buy box / details — place **outside** `PdpContentSuggestions`. */
export const PdpContentStickyRegion = React.forwardRef<
  HTMLDivElement,
  PdpContentStickyRegionProps
>(function PdpContentStickyRegion({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={[pdpStickyRegionClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

PdpContentStickyRegion.displayName = "PdpContentStickyRegion";

/** Full-width breadcrumb row above the hero. */
export const PdpContentBreadcrumb = React.forwardRef<
  HTMLDivElement,
  PdpContentBreadcrumbProps
>(function PdpContentBreadcrumb({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={["min-w-0 w-full", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

PdpContentBreadcrumb.displayName = "PdpContentBreadcrumb";

/** Left hero column — product gallery (7/12 on large screens). */
export const PdpContentGalleryColumn = React.forwardRef<
  HTMLDivElement,
  PdpContentGalleryColumnProps
>(function PdpContentGalleryColumn({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={[pdpGalleryGridClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

PdpContentGalleryColumn.displayName = "PdpContentGalleryColumn";

/**
 * Right column — price, CTAs, seller.
 * On large screens the panel is absolutely positioned on the right and stays `sticky` until
 * `PdpContentSuggestions` (outside this region).
 */
export const PdpContentBuyBox = React.forwardRef<
  HTMLElement,
  PdpContentBuyBoxProps
>(function PdpContentBuyBox({ className, children, ...props }, ref) {
  return (
    <div className={[pdpBuyBoxGridClass, className].filter(Boolean).join(" ")}>
      <aside
        ref={ref}
        className="relative z-10 lg:sticky lg:top-24 lg:self-start"
        {...props}
      >
        {children}
      </aside>
    </div>
  );
});

PdpContentBuyBox.displayName = "PdpContentBuyBox";

/**
 * Details block (description, specs, tabs).
 * Aligns with the gallery column on `lg+`; buy box stays sticky on the right until this region ends.
 */
export const PdpContentDetails = React.forwardRef<
  HTMLDivElement,
  PdpContentDetailsProps
>(function PdpContentDetails({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={[pdpDetailsGridClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

PdpContentDetails.displayName = "PdpContentDetails";

/**
 * Full-width suggestions / related listings — starts a new row so the buy box unsticks above it.
 */
export const PdpContentSuggestions = React.forwardRef<
  HTMLDivElement,
  PdpContentSuggestionsProps
>(function PdpContentSuggestions({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={["min-w-0 w-full", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

PdpContentSuggestions.displayName = "PdpContentSuggestions";

/**
 * @deprecated Prefer `PdpContentDetails` + `PdpContentSuggestions` for sticky buy-box behaviour.
 */
export const PdpContentBelow = React.forwardRef<
  HTMLDivElement,
  PdpContentBelowProps
>(function PdpContentBelow({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={["min-w-0 space-y-10 lg:col-span-12 lg:space-y-12", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

PdpContentBelow.displayName = "PdpContentBelow";

/** Titled block inside `PdpContentBelow`. */
export const PdpContentSection = React.forwardRef<
  HTMLElement,
  PdpContentSectionProps
>(function PdpContentSection(
  { title, titleId: titleIdProp, className, children, ...props },
  ref,
) {
  const generatedId = React.useId();
  const titleId = titleIdProp ?? generatedId;

  return (
    <section
      ref={ref}
      aria-labelledby={title ? titleId : undefined}
      className={className}
      {...props}
    >
      {title ? (
        <h2
          id={titleId}
          className="mb-4 text-lg font-semibold tracking-tight text-content-primary sm:mb-6 sm:text-xl"
        >
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
});

PdpContentSection.displayName = "PdpContentSection";

// ── Gallery ────────────────────────────────────────────────────────────────

function useControllableIndex(
  controlled: number | undefined,
  defaultValue: number,
  onChange?: (index: number) => void,
) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const index = controlled ?? uncontrolled;

  const setIndex = React.useCallback(
    (next: number) => {
      if (controlled === undefined) {
        setUncontrolled(next);
      }
      onChange?.(next);
    },
    [controlled, onChange],
  );

  return [index, setIndex] as const;
}

/**
 * Storefront **image gallery** with vertical thumbnails on desktop and a horizontal strip on mobile.
 */
export function PdpContentGallery({
  images,
  selectedIndex: selectedIndexProp,
  defaultSelectedIndex = 0,
  onSelectedIndexChange,
  favoriteAction,
  className,
}: PdpContentGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useControllableIndex(
    selectedIndexProp,
    defaultSelectedIndex,
    onSelectedIndexChange,
  );

  const safeIndex =
    images.length === 0
      ? 0
      : Math.min(Math.max(selectedIndex, 0), images.length - 1);

  const active = images[safeIndex];

  if (images.length === 0) {
    return (
      <div
        className={[
          "flex aspect-[4/5] w-full items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-sm text-content-tertiary",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Aucune image
      </div>
    );
  }

  const thumbnailButtonClass = (isSelected: boolean) =>
    [
      "relative shrink-0 overflow-hidden rounded-xl border bg-surface-primary transition-[box-shadow,border-color,opacity] duration-[200ms]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
      isSelected
        ? "border-border-brand ring-2 ring-border-brand ring-offset-2 ring-offset-background-primary"
        : "border-border-default opacity-80 hover:border-border-strong hover:opacity-100",
    ].join(" ");

  const thumbnails = images.map((image, index) => {
    const isSelected = index === safeIndex;
    return (
      <button
        key={`${image.src}-${index}`}
        type="button"
        aria-label={`Afficher l'image ${index + 1} sur ${images.length}`}
        aria-current={isSelected ? "true" : undefined}
        onClick={() => setSelectedIndex(index)}
        className={[
          thumbnailButtonClass(isSelected),
          "size-[4.5rem] sm:size-20",
          "lg:size-[4.75rem]",
        ].join(" ")}
      >
        <img
          src={image.src}
          alt=""
          aria-hidden
          className="size-full object-cover"
          loading="lazy"
        />
      </button>
    );
  });

  return (
    <div
      className={["flex flex-col gap-3 lg:flex-row lg:gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:w-[5.25rem] lg:shrink-0 lg:flex-col lg:overflow-visible lg:pb-0 xl:w-[5.5rem]"
        role="tablist"
        aria-label="Photos du produit"
      >
        {thumbnails}
      </div>

      <div className="relative order-1 min-w-0 flex-1 lg:order-2">
        <div className="relative overflow-hidden rounded-2xl border border-border-default bg-surface-secondary shadow-sm">
          <div className="aspect-[4/5] w-full sm:aspect-square lg:aspect-[4/5]">
            <img
              key={active.src}
              src={active.src}
              alt={active.alt}
              className="size-full object-cover object-center"
            />
          </div>
          {favoriteAction ? (
            <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
              {favoriteAction}
            </div>
          ) : null}
        </div>
        <p className="mt-2 text-center text-xs text-content-tertiary lg:text-left">
          {safeIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

PdpContentGallery.displayName = "PdpContentGallery";

// ── Buy panel & metadata ───────────────────────────────────────────────────

/** Elevated card wrapper for the purchase column (price, CTAs, seller). */
export function PdpContentBuyPanel({
  children,
  className,
}: PdpContentBuyPanelProps) {
  return (
    <Card variant="elevated" size="lg" className={className}>
      <CardContent className="gap-5 pt-6 sm:gap-6 sm:pt-6">
        {children}
      </CardContent>
    </Card>
  );
}

PdpContentBuyPanel.displayName = "PdpContentBuyPanel";

const pdpTitleClass =
  "font-stack text-2xl font-semibold leading-tight tracking-tight text-content-primary sm:text-3xl";

/** Product title in the buy panel — uses `font-stack` (Stack Sans Headline). */
export const PdpContentTitle = React.forwardRef<
  HTMLHeadingElement,
  PdpContentTitleProps
>(function PdpContentTitle({ className, children, ...props }, ref) {
  return (
    <h1
      ref={ref}
      className={[pdpTitleClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </h1>
  );
});

PdpContentTitle.displayName = "PdpContentTitle";

/** Single label / value row for product attributes (condition, size, …). */
export const PdpContentAttribute = React.forwardRef<
  HTMLDivElement,
  PdpContentAttributeProps
>(function PdpContentAttribute({ label, value, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={[
        "flex items-baseline justify-between gap-4 border-b border-border-subtle py-3 text-sm last:border-b-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="text-content-secondary">{label}</span>
      <span className="text-right font-medium text-content-primary">
        {value}
      </span>
    </div>
  );
});

PdpContentAttribute.displayName = "PdpContentAttribute";

/** Grid of attribute rows (condition, size, …). */
export const PdpContentAttributes = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function PdpContentAttributes({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={[
        "divide-y divide-border-subtle rounded-xl border border-border-default bg-surface-primary px-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

PdpContentAttributes.displayName = "PdpContentAttributes";

/** Trust signal row (shipping, buyer protection, …). */
export const PdpContentTrustList = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul">
>(function PdpContentTrustList({ className, children, ...props }, ref) {
  return (
    <ul
      ref={ref}
      role="list"
      className={["m-0 flex list-none flex-col gap-3 p-0", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </ul>
  );
});

PdpContentTrustList.displayName = "PdpContentTrustList";

export const PdpContentTrustItem = React.forwardRef<
  HTMLLIElement,
  PdpContentTrustItemProps
>(function PdpContentTrustItem({ icon, children, className, ...props }, ref) {
  return (
    <li
      ref={ref}
      className={[
        "flex items-center gap-2 text-sm text-content-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span
        className="mt-0.5 flex size-10 shrink-0 items-center justify-center text-content-primary [&_svg]:size-6"
        aria-hidden
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 leading-snug">{children}</span>
    </li>
  );
});

PdpContentTrustItem.displayName = "PdpContentTrustItem";

/** Seller summary block with avatar, rating meta, and optional action. */
export const PdpContentSellerCard = React.forwardRef<
  HTMLDivElement,
  PdpContentSellerCardProps
>(function PdpContentSellerCard(
  { name, subtitle, avatar, meta, action, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={[
        "flex items-center gap-4 rounded-xl border border-border-default bg-surface-secondary p-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {avatar ? <div className="shrink-0">{avatar}</div> : null}
      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate text-sm font-semibold text-content-primary">
          {name}
        </p>
        {subtitle ? (
          <p className="truncate text-xs text-content-tertiary">{subtitle}</p>
        ) : null}
        {meta ? <div className="pt-0.5">{meta}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
});

PdpContentSellerCard.displayName = "PdpContentSellerCard";

/** Sticky purchase bar for narrow viewports — hidden from `lg` up. */
export const PdpContentMobileBar = React.forwardRef<
  HTMLDivElement,
  PdpContentMobileBarProps
>(function PdpContentMobileBar({ price, action, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={[
        "fixed inset-x-0 bottom-0 z-40 border-t border-border-default bg-surface-primary/95 px-3 py-3 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-surface-primary/80 sm:px-4 lg:hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <div className="min-w-0 shrink-0">{price}</div>
        <div className="min-w-0 flex-1">{action}</div>
      </div>
    </div>
  );
});

PdpContentMobileBar.displayName = "PdpContentMobileBar";
