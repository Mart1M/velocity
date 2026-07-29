import * as React from "react";
import { formatDiscountPercent, formatPrice } from "./format-price";

// ── Types ──────────────────────────────────────────────────────────────────

export type PriceSize = "sm" | "md" | "lg";

export type PriceLayout = "horizontal" | "vertical";

type PriceAmountProps =
  | { value: number; formattedValue?: never }
  | { value?: never; formattedValue: string };

export type PriceProps = PriceAmountProps & {
  /** Previous amount shown struck-through when on sale */
  originalValue?: number;
  /** Pre-formatted original amount (skips `Intl` formatting) */
  formattedOriginalValue?: string;
  /** ISO 4217 currency code when using numeric `value` / `originalValue` */
  currency?: string;
  /** BCP 47 locale for currency formatting */
  locale?: string;
  /** Visual size of the price text */
  size?: PriceSize;
  /** Stack prices vertically (`original` → `current` → badge) or inline */
  layout?: PriceLayout;
  /** Show a discount badge (e.g. `-20 %`) when an original price is present */
  showDiscountBadge?: boolean;
  /** Additional CSS classes on the root */
  className?: string;
};

// ── Style maps ─────────────────────────────────────────────────────────────

const currentSizeClasses: Record<PriceSize, string> = {
  sm: "rounded-md px-1.5 py-0.5 font-stack text-sm font-semibold tabular-nums",
  md: "rounded-md px-2 py-0.5 font-stack text-base font-semibold tabular-nums",
  lg: "rounded-lg px-2.5 py-1 font-stack text-lg font-semibold tabular-nums",
};

const originalSizeClasses: Record<PriceSize, string> = {
  sm: "font-stack text-xs tabular-nums",
  md: "font-stack text-sm tabular-nums",
  lg: "font-stack text-base tabular-nums",
};

const badgeSizeClasses: Record<PriceSize, string> = {
  sm: "px-1 py-0.5 text-[10px]",
  md: "px-1 py-0.5 text-xs",
  lg: "px-1.5 py-0.5 text-xs",
};

const layoutClasses: Record<PriceLayout, string> = {
  horizontal: "inline-flex flex-row flex-wrap items-center gap-x-2 gap-y-1",
  vertical: "inline-flex flex-col items-start gap-1",
};

// ── Component ──────────────────────────────────────────────────────────────

export function Price({
  value,
  formattedValue,
  originalValue,
  formattedOriginalValue,
  currency = "EUR",
  locale = "fr-FR",
  size = "md",
  layout = "horizontal",
  showDiscountBadge = false,
  className,
}: PriceProps) {
  const currentLabel =
    formattedValue ?? formatPrice(value as number, locale, currency);
  const originalLabel =
    formattedOriginalValue ??
    (originalValue != null
      ? formatPrice(originalValue, locale, currency)
      : undefined);

  const discountPercent =
    showDiscountBadge && value != null && originalValue != null
      ? formatDiscountPercent(value, originalValue)
      : null;

  const original = originalLabel ? (
    <s
      className={[
        "text-content-tertiary line-through decoration-content-tertiary",
        originalSizeClasses[size],
      ].join(" ")}
      aria-label={`Prix initial ${originalLabel}`}
    >
      {originalLabel}
    </s>
  ) : null;

  const current = (
    <span
      className={[
        "inline-flex w-fit items-center bg-accent-primary text-content-on-brand",
        currentSizeClasses[size],
      ].join(" ")}
    >
      {currentLabel}
    </span>
  );

  const badge =
    discountPercent != null ? (
      <span
        className={[
          "inline-flex w-fit items-center rounded-md bg-state-error font-semibold leading-none text-content-inverse",
          badgeSizeClasses[size],
        ].join(" ")}
        aria-hidden
      >
        -{discountPercent}&nbsp;%
      </span>
    ) : null;

  return (
    <div
      className={[layoutClasses[layout], className].filter(Boolean).join(" ")}
    >
      {layout === "vertical" ? (
        <>
          {original}
          {current}
          {badge}
        </>
      ) : (
        <>
          {current}
          {original}
          {badge}
        </>
      )}
    </div>
  );
}

Price.displayName = "Price";
