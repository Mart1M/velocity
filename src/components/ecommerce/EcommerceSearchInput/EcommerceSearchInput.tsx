import * as React from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, type InputProps } from "../../Input/Input";

// ── Types ──────────────────────────────────────────────────────────────────

export interface EcommerceSearchInputProps
  extends Omit<InputProps, "type" | "leadingIcon"> {
  /** Icon inside the field on the left — defaults to a search glyph */
  leadingIcon?: React.ReactNode;
}

// ── Component ──────────────────────────────────────────────────────────────

/**
 * Storefront search field built on **`Input`**: `type="search"`, magnifier by default,
 * marketplace-oriented placeholder and accessible name unless you pass `label` / overrides.
 */
export const EcommerceSearchInput = React.forwardRef<
  HTMLInputElement,
  EcommerceSearchInputProps
>(function EcommerceSearchInput(
  {
    leadingIcon,
    placeholder = "Search products…",
    label,
    className,
    "aria-label": ariaLabel,
    ...props
  },
  ref,
) {
  const icon =
    leadingIcon ?? (
      <RiSearchLine className="size-full" aria-hidden />
    );

  return (
    <Input
      ref={ref}
      type="search"
      label={label}
      leadingIcon={icon}
      placeholder={placeholder}
      aria-label={label ? undefined : ariaLabel ?? "Search products"}
      className={className}
      {...props}
    />
  );
});

EcommerceSearchInput.displayName = "EcommerceSearchInput";
