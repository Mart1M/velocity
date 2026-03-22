import * as React from "react";
import { RiLoader4Line } from "react-icons/ri";

// ── Types ──────────────────────────────────────────────────────────────────

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerColorScheme = "primary" | "neutral" | "brand";

export interface SpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Color scheme mapped to semantic content tokens */
  colorScheme?: SpinnerColorScheme;
  /** Accessible label for screen readers (rendered as sr-only text) */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const colorClasses: Record<SpinnerColorScheme, string> = {
  primary: "text-content-primary",
  neutral: "text-content-secondary",
  brand: "text-content-brand",
};

// ── Component ──────────────────────────────────────────────────────────────

export function Spinner({
  size = "md",
  colorScheme = "brand",
  label = "Loading",
  className,
}: SpinnerProps) {
  return (
    <span
      role="status"
      className={[
        "inline-flex items-center justify-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <RiLoader4Line
        className={[
          "animate-spin",
          sizeClasses[size],
          colorClasses[colorScheme],
        ].join(" ")}
        aria-hidden
      />
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}

Spinner.displayName = "Spinner";
