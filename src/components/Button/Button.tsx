import * as React from "react";
import { Button as BaseButton } from "@base-ui-components/react/button";
import { RiLoader4Line } from "react-icons/ri";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColorScheme =
  | "primary"
  | "success"
  | "warning"
  | "danger";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Color scheme */
  colorScheme?: ButtonColorScheme;
  /** Whether the button remains focusable when disabled (Base UI) */
  focusableWhenDisabled?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Left icon element */
  startIcon?: React.ReactNode;
  /** Right icon element */
  endIcon?: React.ReactNode;
  /** Make button full width */
  fullWidth?: boolean;
  /** Render as a different element */
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
};

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
      "bg-accent-primary text-content-on-brand shadow-sm",
      "hover:bg-yellow-500 active:bg-yellow-600",
    ].join(" "),
    outline:
      "bg-transparent text-content-primary hover:bg-yellow-100 active:bg-surface-active border border-border-brand",
    ghost:
      "bg-transparent text-content-brand hover:bg-yellow-100 active:bg-yellow-200",
    link: "bg-transparent text-content-brand hover:text-yellow-900 underline-offset-4 hover:underline",
  },
  success: {
    solid: [
      solidGlassEffect,
      "bg-state-success text-content-inverse shadow-sm",
      "hover:bg-green-600 active:bg-green-700",
    ].join(" "),
    outline:
      "bg-transparent text-feedback-positive hover:bg-green-100  active:bg-surface-active border border-state-success",
    ghost:
      "bg-transparent text-feedback-positive hover:bg-green-100  active:bg-surface-active",
    link: "bg-transparent text-feedback-positive hover:text-green-400 underline-offset-4 hover:underline",
  },
  warning: {
    solid: [
      solidGlassEffect,
      "bg-state-warning text-content-inverse shadow-sm",
      "hover:bg-orange-600 active:bg-orange-700",
    ].join(" "),
    outline:
      "bg-transparent text-feedback-caution hover:bg-orange-100 active:bg-surface-active border border-state-warning",
    ghost:
      "bg-transparent text-feedback-caution hover:bg-orange-100 active:bg-surface-active",
    link: "bg-transparent text-feedback-caution hover:text-orange-400 underline-offset-4 hover:underline",
  },
  danger: {
    solid: [
      solidGlassEffect,
      "bg-state-error text-content-inverse shadow-sm",
      "hover:bg-red-600 active:bg-red-700",
    ].join(" "),
    outline:
      "bg-transparent text-feedback-negative hover:bg-red-100 active:bg-surface-active border border-state-error",
    ghost:
      "bg-transparent text-feedback-negative hover:bg-red-100 active:bg-surface-active",
    link: "bg-transparent text-feedback-negative hover:text-red-400 underline-offset-4 hover:underline",
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

/** Centers SVG / icon components; avoids baseline offset from inline SVG. */
function iconSlotClass(size: ButtonSize): string {
  return [
    "inline-flex shrink-0 items-center justify-center self-center",
    iconSizeClasses[size],
    "[&_svg]:pointer-events-none [&_svg]:block [&_svg]:h-full [&_svg]:w-full [&_svg]:shrink-0",
  ].join(" ");
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <RiLoader4Line
      className={["animate-spin", className].filter(Boolean).join(" ")}
      aria-hidden
    />
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
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
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    const classes = [
      // Base styles — leading-none keeps icon + label vertically centered vs text metrics
      "inline-flex items-center justify-center font-medium leading-none",
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
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <BaseButton
        ref={ref}
        {...rest}
        className={[classes, className].filter(Boolean).join(" ")}
        disabled={isDisabled}
        focusableWhenDisabled={focusableWhenDisabled}
        type={type}
        onClick={onClick}
        render={render}
      >
        {loading ? (
          <span className={iconSlotClass(size)} aria-hidden="true">
            <LoadingSpinner className="size-full" />
          </span>
        ) : startIcon ? (
          <span className={iconSlotClass(size)} aria-hidden="true">
            {startIcon}
          </span>
        ) : null}
        {children ? (
          <span className="min-w-0 leading-normal">{children}</span>
        ) : null}
        {!loading && endIcon ? (
          <span className={iconSlotClass(size)} aria-hidden="true">
            {endIcon}
          </span>
        ) : null}
      </BaseButton>
    );
  },
);

Button.displayName = "Button";
