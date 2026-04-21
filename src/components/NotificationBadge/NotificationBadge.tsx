import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type NotificationBadgeVariant =
  | "default"
  | "brand"
  | "danger"
  | "neutral";

export type NotificationBadgeSize = "sm" | "md";

export interface NotificationBadgeProps extends Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> {
  /**
   * Unread / notification count. When `0` and `showZero` is false, nothing is rendered
   * (unless `dot` is true).
   */
  count?: number;
  /** Values above `max` render as `${max}+` (default 99). */
  max?: number;
  /** When true, still show the badge for `count === 0`. */
  showZero?: boolean;
  /**
   * Indicator only (no number). Use with `aria-label` describing what has updates,
   * e.g. "New notifications".
   */
  dot?: boolean;
  /** Visual emphasis */
  variant?: NotificationBadgeVariant;
  /** Compact footprint — pair with `absolute -right-1 -top-1` on icon wrappers. */
  size?: NotificationBadgeSize;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const variantClasses: Record<NotificationBadgeVariant, string> = {
  default: "bg-state-error text-white",
  brand: "bg-accent-primary text-content-primary",
  danger: "bg-state-error text-white",
  neutral: "bg-surface-tertiary text-content-primary",
};

const numericSizeClasses: Record<NotificationBadgeSize, string> = {
  sm: "min-h-4 min-w-4 px-1 text-[10px] leading-none",
  md: "min-h-5 min-w-5 px-1 text-xs leading-none",
};

const dotSizeClasses: Record<NotificationBadgeSize, string> = {
  sm: "h-2 min-h-2 w-2 min-w-2 p-0",
  md: "h-2.5 min-h-2.5 w-2.5 min-w-2.5 p-0",
};

// ── Component ───────────────────────────────────────────────────────────────

/**
 * Compact **notification** indicator: numeric count (with optional cap) or a **dot**.
 * Typically positioned on an icon or tab — wrap the anchor in `relative` and place
 * the badge with `className="absolute -right-1 -top-1"` (adjust to your layout).
 */
export const NotificationBadge = React.forwardRef<
  HTMLSpanElement,
  NotificationBadgeProps
>(function NotificationBadge(
  {
    count,
    max = 99,
    showZero = false,
    dot = false,
    variant = "danger",
    size = "sm",
    className,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const showNumeric = !dot && count !== undefined && (showZero || count > 0);

  if (!dot && !showNumeric) {
    return null;
  }

  const label =
    dot || count === undefined
      ? undefined
      : count > max
        ? `${max}+`
        : String(count);

  const base = [
    "inline-flex shrink-0 items-center justify-center rounded-full font-semibold tabular-nums",
    "ring-2 ring-surface-primary",
    variantClasses[variant],
    className,
  ];

  if (dot) {
    return (
      <span
        ref={ref}
        className={[...base, dotSizeClasses[size]].filter(Boolean).join(" ")}
        {...rest}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
      />
    );
  }

  return (
    <span
      ref={ref}
      className={[...base, numericSizeClasses[size]].filter(Boolean).join(" ")}
      {...rest}
      aria-label={ariaLabel}
    >
      {label}
    </span>
  );
});

NotificationBadge.displayName = "NotificationBadge";
