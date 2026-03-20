import * as React from "react";
import { Button as BaseButton } from "@base-ui-components/react/button";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColorScheme =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export interface ButtonProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Color scheme */
  colorScheme?: ButtonColorScheme;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Left icon element */
  startIcon?: React.ReactNode;
  /** Right icon element */
  endIcon?: React.ReactNode;
  /** Make button full width */
  fullWidth?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button remains focusable when disabled */
  focusableWhenDisabled?: boolean;
  /** Button type attribute */
  type?: "button" | "submit" | "reset";
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Button content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Render as a different element */
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
}

// Shared pseudo-element classes for the glass/gradient effect on solid buttons.
// before: gradient border (white top highlight → transparent)
// after:  inner white gloss overlay, brightens on hover
const solidGlassEffect = [
  "relative group",
  // border gradient via mask trick
  "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit]",
  "before:bg-gradient-to-b before:p-px before:from-white/[.12] before:to-transparent",
  "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude]",
  "before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
  // gloss overlay
  "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]",
  "after:bg-gradient-to-b after:from-white after:to-transparent",
  "after:opacity-[.16] after:transition after:duration-200 after:ease-out",
  "hover:after:opacity-[.24]",
  // hide pseudo-elements when disabled
  "disabled:before:hidden disabled:after:hidden data-[disabled]:before:hidden data-[disabled]:after:hidden",
].join(" ");

const variantColorClasses: Record<
  ButtonColorScheme,
  Record<ButtonVariant, string>
> = {
  primary: {
    solid: [
      solidGlassEffect,
      "bg-accent-primary text-content-primary shadow-button-primary",
      "hover:bg-primary-600 active:bg-primary-700",
    ].join(" "),
    outline:
      "bg-transparent text-content-brand hover:bg-surface-hover active:bg-surface-active border border-border-brand",
    ghost:
      "bg-transparent text-content-brand hover:bg-surface-hover active:bg-surface-active",
    link: "bg-transparent text-content-brand hover:text-accent-secondary underline-offset-4 hover:underline",
  },
  success: {
    solid: [
      solidGlassEffect,
      "bg-state-success text-content-primary shadow-button-success",
      "hover:bg-green-600 active:bg-green-700",
    ].join(" "),
    outline:
      "bg-transparent text-feedback-positive hover:bg-surface-hover active:bg-surface-active border border-state-success",
    ghost:
      "bg-transparent text-feedback-positive hover:bg-surface-hover active:bg-surface-active",
    link: "bg-transparent text-feedback-positive hover:text-green-400 underline-offset-4 hover:underline",
  },
  warning: {
    solid: [
      solidGlassEffect,
      "bg-state-warning text-content-primary shadow-button-warning",
      "hover:bg-orange-600 active:bg-orange-700",
    ].join(" "),
    outline:
      "bg-transparent text-feedback-caution hover:bg-surface-hover active:bg-surface-active border border-state-warning",
    ghost:
      "bg-transparent text-feedback-caution hover:bg-surface-hover active:bg-surface-active",
    link: "bg-transparent text-feedback-caution hover:text-orange-400 underline-offset-4 hover:underline",
  },
  danger: {
    solid: [
      solidGlassEffect,
      "bg-state-error text-content-primary shadow-button-danger",
      "hover:bg-red-600 active:bg-red-700",
    ].join(" "),
    outline:
      "bg-transparent text-feedback-negative hover:bg-surface-hover active:bg-surface-active border border-state-error",
    ghost:
      "bg-transparent text-feedback-negative hover:bg-surface-hover active:bg-surface-active",
    link: "bg-transparent text-feedback-negative hover:text-red-400 underline-offset-4 hover:underline",
  },
  neutral: {
    solid: [
      solidGlassEffect,
      "bg-surface-secondary text-content-primary shadow-button-neutral border border-border-default",
      "hover:bg-surface-tertiary active:bg-surface-active",
    ].join(" "),
    outline:
      "bg-transparent text-content-secondary hover:bg-surface-hover active:bg-surface-active border border-border-strong",
    ghost:
      "bg-transparent text-content-secondary hover:bg-surface-hover active:bg-surface-active",
    link: "bg-transparent text-content-secondary hover:text-content-primary underline-offset-4 hover:underline",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5 rounded-xl",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-2xl",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "h-4 w-4",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={["animate-spin", className].filter(Boolean).join(" ")}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  colorScheme = "primary",
  loading = false,
  startIcon,
  endIcon,
  fullWidth = false,
  disabled,
  focusableWhenDisabled,
  type = "button",
  onClick,
  children,
  className,
  render,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = [
    // Base styles
    "inline-flex items-center justify-center font-medium",
    "cursor-pointer transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
    // Size
    sizeClasses[size],
    // Variant + Color
    variantColorClasses[colorScheme][variant],
    // Full width
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <BaseButton
      className={classes}
      disabled={isDisabled}
      focusableWhenDisabled={focusableWhenDisabled}
      type={type}
      onClick={onClick}
      render={render}
    >
      {loading ? (
        <LoadingSpinner className={iconSizeClasses[size]} />
      ) : startIcon ? (
        <span className={iconSizeClasses[size]} aria-hidden="true">
          {startIcon}
        </span>
      ) : null}
      {children}
      {!loading && endIcon ? (
        <span className={iconSizeClasses[size]} aria-hidden="true">
          {endIcon}
        </span>
      ) : null}
    </BaseButton>
  );
}

Button.displayName = "Button";
