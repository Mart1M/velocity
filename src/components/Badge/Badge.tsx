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
  warning: "bg-state-warning text-white",
  error: "bg-state-error text-white",
  info: "bg-state-info text-white",
  brand: "bg-accent-primary text-white",
};

const outlineVariantClasses: Record<BadgeVariant, string> = {
  default: "bg-transparent text-content-secondary border border-border-strong",
  success: "bg-transparent text-state-success border border-state-success",
  warning: "bg-transparent text-state-warning border border-state-warning",
  error: "bg-transparent text-state-error border border-state-error",
  info: "bg-transparent text-state-info border border-state-info",
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
        "inline-flex items-center font-medium leading-none whitespace-nowrap py-1 px-0.5 font-semibold",
        "transition-colors duration-[200ms]",
        rounded ? "rounded-full" : "rounded-md",
        sizeClasses[size],
        outline
          ? outlineVariantClasses[variant]
          : filledVariantClasses[variant],
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
