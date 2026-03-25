import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type SkeletonVariant = "text" | "circular" | "rectangular";

export type SkeletonAnimation = "pulse" | "none";

export type SkeletonProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * Shape preset — `text` is a single line, `circular` for avatars/icons,
   * `rectangular` for blocks and media areas.
   */
  variant?: SkeletonVariant;
  /** Motion — `pulse` uses Tailwind `animate-pulse`; `none` is static. */
  animation?: SkeletonAnimation;
};

// ── Style maps ─────────────────────────────────────────────────────────────

const variantClasses: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded-md",
  circular: "size-10 shrink-0 rounded-full",
  rectangular: "min-h-24 w-full rounded-xl",
};

const animationClasses: Record<SkeletonAnimation, string> = {
  pulse: "animate-pulse",
  none: "",
};

// ── Component ──────────────────────────────────────────────────────────────

/**
 * Loading placeholder with a muted surface and optional pulse animation.
 * Not a Base UI primitive — purely presentational. Defaults to `aria-hidden`
 * (override when the skeleton communicates loading to assistive tech via a parent).
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      variant = "rectangular",
      animation = "pulse",
      className,
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={[
          "bg-surface-secondary",
          animationClasses[animation],
          variantClasses[variant],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
