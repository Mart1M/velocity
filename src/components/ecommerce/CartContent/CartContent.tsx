import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Card/Card";

// ── Types ──────────────────────────────────────────────────────────────────

export interface CartContentProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

export interface CartContentMainProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

export interface CartContentAsideProps
  extends React.ComponentPropsWithoutRef<"aside"> {
  children?: React.ReactNode;
}

export interface CartContentSectionProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "title"> {
  /** Section heading (e.g. cart count) */
  title?: React.ReactNode;
  /** Element id for the heading (used in `aria-labelledby`) */
  titleId?: string;
  children?: React.ReactNode;
}

export interface CartContentItemsProps
  extends React.ComponentPropsWithoutRef<"ul"> {
  children?: React.ReactNode;
}

export interface CartContentItemProps
  extends React.ComponentPropsWithoutRef<"li"> {
  children?: React.ReactNode;
}

export interface CartContentRowProps
  extends React.ComponentPropsWithoutRef<"div"> {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface CartContentTotalRowProps
  extends React.ComponentPropsWithoutRef<"div"> {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface CartContentOrderSummaryProps {
  /** Summary card title — omit for a flush body (only rows + footer). */
  title?: React.ReactNode;
  /** Line items: use `CartContentRow`, `CartContentTotalRow`, promos, etc. */
  children?: React.ReactNode;
  /** Primary CTA area — e.g. checkout `Button` */
  footer?: React.ReactNode;
  /** Extra classes on the wrapping `Card` */
  className?: string;
}

// ── Layout ───────────────────────────────────────────────────────────────────

const cartGridClass =
  "mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8";

/**
 * Two-column **cart page** shell: **main** (line items) + **aside** (order summary).
 * Use `CartContentMain` + `CartContentAside` as direct children.
 */
export const CartContent = React.forwardRef<HTMLDivElement, CartContentProps>(
  function CartContent({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={[cartGridClass, className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CartContent.displayName = "CartContent";

/** Primary column — product / cart lines (7/12 on large screens). */
export const CartContentMain = React.forwardRef<
  HTMLDivElement,
  CartContentMainProps
>(function CartContentMain({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={["min-w-0 lg:col-span-7 xl:col-span-8", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

CartContentMain.displayName = "CartContentMain";

/** Summary column — sticky on large viewports (5/12 on large screens). */
export const CartContentAside = React.forwardRef<
  HTMLElement,
  CartContentAsideProps
>(function CartContentAside({ className, children, ...props }, ref) {
  return (
    <aside
      ref={ref}
      className={[
        "min-w-0 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 lg:self-start",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </aside>
  );
});

CartContentAside.displayName = "CartContentAside";

// ── List region ────────────────────────────────────────────────────────────

/**
 * Optional titled region wrapping the cart list (`CartContentItems`).
 */
export const CartContentSection = React.forwardRef<
  HTMLElement,
  CartContentSectionProps
>(function CartContentSection(
  {
    title,
    titleId = "cart-content-section-title",
    className,
    children,
    ...props
  },
  ref,
) {
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

CartContentSection.displayName = "CartContentSection";

export const CartContentItems = React.forwardRef<
  HTMLUListElement,
  CartContentItemsProps
>(function CartContentItems({ className, children, ...props }, ref) {
  return (
    <ul
      ref={ref}
      role="list"
      className={["m-0 flex list-none flex-col gap-4 p-0 sm:gap-5", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </ul>
  );
});

CartContentItems.displayName = "CartContentItems";

export const CartContentItem = React.forwardRef<
  HTMLLIElement,
  CartContentItemProps
>(function CartContentItem({ className, children, ...props }, ref) {
  return (
    <li
      ref={ref}
      className={["m-0 list-none p-0", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </li>
  );
});

CartContentItem.displayName = "CartContentItem";

// ── Summary rows ───────────────────────────────────────────────────────────

/** Single label / value row (subtotal, shipping, tax, discount, …). */
export const CartContentRow = React.forwardRef<
  HTMLDivElement,
  CartContentRowProps
>(function CartContentRow({ label, value, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={[
        "flex items-baseline justify-between gap-4 text-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="text-content-secondary">{label}</span>
      <span className="tabular-nums text-content-primary">{value}</span>
    </div>
  );
});

CartContentRow.displayName = "CartContentRow";

/** Emphasized total row with top border. */
export const CartContentTotalRow = React.forwardRef<
  HTMLDivElement,
  CartContentTotalRowProps
>(function CartContentTotalRow({ label, value, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={[
        "flex items-baseline justify-between gap-4 border-t border-border-default pt-4 text-base font-semibold",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="text-content-primary">{label}</span>
      <span className="tabular-nums text-content-primary">{value}</span>
    </div>
  );
});

CartContentTotalRow.displayName = "CartContentTotalRow";

/**
 * Opinionated **order summary** card: title, stacked rows, footer (checkout).
 * Compose with `CartContentRow` and `CartContentTotalRow`.
 */
export function CartContentOrderSummary({
  title = "Order summary",
  children,
  footer,
  className,
}: CartContentOrderSummaryProps) {
  return (
    <Card variant="elevated" size="md" className={className}>
      {title ? (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className={!title ? "gap-3 pt-5 sm:pt-5" : "gap-3"}>
        {children}
      </CardContent>
      {footer ? <CardFooter separator>{footer}</CardFooter> : null}
    </Card>
  );
}

CartContentOrderSummary.displayName = "CartContentOrderSummary";
