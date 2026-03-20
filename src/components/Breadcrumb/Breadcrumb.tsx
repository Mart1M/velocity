import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type BreadcrumbSize = "sm" | "md" | "lg";

export interface BreadcrumbProps {
  /** Text size of the breadcrumb trail */
  size?: BreadcrumbSize;
  /** Custom separator rendered between items (defaults to chevron ›) */
  separator?: React.ReactNode;
  /** Breadcrumb items */
  children?: React.ReactNode;
  /** Additional CSS classes applied to the `<nav>` element */
  className?: string;
}

export interface BreadcrumbItemProps {
  /** Marks this item as the current page (renders non-interactive text with aria-current) */
  isCurrent?: boolean;
  /** Content — typically a BreadcrumbLink or plain text */
  children?: React.ReactNode;
  /** Additional CSS classes applied to the `<li>` element */
  className?: string;
}

export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Additional CSS classes */
  className?: string;
}

export interface BreadcrumbSeparatorProps {
  /** Custom separator content (overrides the context default) */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ── Context ────────────────────────────────────────────────────────────────

interface BreadcrumbContextValue {
  size: BreadcrumbSize;
  separator: React.ReactNode;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  size: "md",
  separator: "›",
});

function useBreadcrumb() {
  return React.useContext(BreadcrumbContext);
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<BreadcrumbSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

// ── Breadcrumb (root) ──────────────────────────────────────────────────────

export function Breadcrumb({
  size = "md",
  separator = "›",
  children,
  className,
}: BreadcrumbProps) {
  const ctx = React.useMemo<BreadcrumbContextValue>(
    () => ({ size, separator }),
    [size, separator],
  );

  const items = React.Children.toArray(children);
  const withSeparators: React.ReactNode[] = [];

  items.forEach((child, index) => {
    withSeparators.push(child);
    if (index < items.length - 1) {
      withSeparators.push(
        <BreadcrumbSeparator key={`sep-${index}`} />,
      );
    }
  });

  return (
    <BreadcrumbContext.Provider value={ctx}>
      <nav
        aria-label="Breadcrumb"
        className={["inline-flex", className].filter(Boolean).join(" ")}
      >
        <ol
          className={[
            "flex items-center gap-1.5",
            "list-none m-0 p-0",
            sizeClasses[size],
          ].join(" ")}
        >
          {withSeparators}
        </ol>
      </nav>
    </BreadcrumbContext.Provider>
  );
}

Breadcrumb.displayName = "Breadcrumb";

// ── BreadcrumbItem ─────────────────────────────────────────────────────────

export function BreadcrumbItem({
  isCurrent = false,
  children,
  className,
}: BreadcrumbItemProps) {
  return (
    <li
      className={[
        "inline-flex items-center",
        isCurrent ? "text-content-primary font-medium" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...(isCurrent ? { "aria-current": "page" as const } : {})}
    >
      {children}
    </li>
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";

// ── BreadcrumbLink ─────────────────────────────────────────────────────────

export function BreadcrumbLink({
  className,
  children,
  ...props
}: BreadcrumbLinkProps) {
  return (
    <a
      className={[
        "text-content-secondary",
        "transition-colors duration-[200ms]",
        "hover:text-content-brand",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-border-focus focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background-primary",
        "rounded-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </a>
  );
}

BreadcrumbLink.displayName = "BreadcrumbLink";

// ── BreadcrumbSeparator ────────────────────────────────────────────────────

export function BreadcrumbSeparator({
  children,
  className,
}: BreadcrumbSeparatorProps) {
  const { separator } = useBreadcrumb();

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={[
        "inline-flex items-center select-none text-content-tertiary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children ?? separator}
    </li>
  );
}

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
