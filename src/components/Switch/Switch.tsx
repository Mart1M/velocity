import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui-components/react/switch";

// ── Types ──────────────────────────────────────────────────────────────────

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Visual size */
  size?: SwitchSize;
  disabled?: boolean;
  /** Optional label rendered next to the switch */
  children?: React.ReactNode;
  className?: string;
  name?: string;
  required?: boolean;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<
  SwitchSize,
  { track: string; thumb: string; thumbChecked: string; label: string; gap: string }
> = {
  sm: {
    track: "w-8 h-4",
    thumb: "size-3",
    thumbChecked: "data-checked:translate-x-4",
    label: "text-sm",
    gap: "gap-2",
  },
  md: {
    track: "w-10 h-5",
    thumb: "size-4",
    thumbChecked: "data-checked:translate-x-5",
    label: "text-sm",
    gap: "gap-2.5",
  },
  lg: {
    track: "w-12 h-6",
    thumb: "size-5",
    thumbChecked: "data-checked:translate-x-6",
    label: "text-base",
    gap: "gap-3",
  },
};

// ── Component ──────────────────────────────────────────────────────────────

export function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  size = "md",
  disabled,
  children,
  className,
  name,
  required,
}: SwitchProps) {
  const sizes = sizeClasses[size];

  return (
    <label
      className={[
        "inline-flex items-center select-none",
        "cursor-pointer",
        "has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50",
        children ? sizes.gap : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <BaseSwitch.Root
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        required={required}
        className={[
          // Layout — track is the pill-shaped container
          "relative inline-flex shrink-0 items-center rounded-full",
          sizes.track,
          // Colors — unchecked default, checked brand
          "bg-border-strong",
          "data-checked:bg-accent-primary",
          // Transition
          "transition-colors duration-[200ms]",
          // Focus ring
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background-primary",
          // Cursor
          "cursor-pointer data-disabled:cursor-not-allowed",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <BaseSwitch.Thumb
          className={[
            // Thumb — circle that slides inside the track
            "absolute top-1/2 left-0.5 -translate-y-1/2 translate-x-0",
            "rounded-full bg-background-primary shadow-sm",
            sizes.thumb,
            sizes.thumbChecked,
            // Bounce slide animation
            "transition-transform duration-slow ease-spring",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </BaseSwitch.Root>

      {children && (
        <span
          className={[
            "font-medium leading-snug text-content-primary",
            sizes.label,
          ].join(" ")}
        >
          {children}
        </span>
      )}
    </label>
  );
}

Switch.displayName = "Switch";
