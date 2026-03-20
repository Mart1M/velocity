import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "brand";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  /** Visual color variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Render as outline instead of filled */
  outline?: boolean;
  /** Render with full pill shape instead of default rounded corners */
  rounded?: boolean;
  /** Badge content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const filledVariantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-secondary text-content-secondary",
  success: "bg-state-success text-content-primary",
  warning: "bg-state-warning text-content-primary",
  error: "bg-state-error text-content-primary",
  info: "bg-state-info text-content-primary",
  brand: "bg-accent-primary text-content-primary",
};

const outlineVariantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-transparent text-content-secondary border border-border-strong",
  success:
    "bg-transparent text-feedback-positive border border-state-success",
  warning:
    "bg-transparent text-feedback-caution border border-state-warning",
  error:
    "bg-transparent text-feedback-negative border border-state-error",
  info: "bg-transparent text-feedback-neutral border border-state-info",
  brand: "bg-transparent text-content-brand border border-border-brand",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

// ── Component ──────────────────────────────────────────────────────────────

export function Badge({
  variant = "default",
  size = "md",
  outline = false,
  rounded = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center font-medium leading-none whitespace-nowrap",
        "transition-colors duration-[200ms]",
        rounded ? "rounded-full" : "rounded-md",
        sizeClasses[size],
        outline ? outlineVariantClasses[variant] : filledVariantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

Badge.displayName = "Badge";
