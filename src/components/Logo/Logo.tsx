import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type LogoSize = "sm" | "md" | "lg";

/**
 * - `default` — `text-content-primary` (dark copy on light UI; white in `data-theme="dark"`).
 * - `inverse` — `text-content-inverse` (light copy on **dark / brand** surfaces in the **light** theme).
 * - `inherit` — no text color on the root; wordmark uses `currentColor` from an ancestor.
 */
export type LogoVariant = "default" | "inverse" | "inherit";

export interface LogoProps extends Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> {
  /**
   * Preset width (`266:60` viewBox). Height follows aspect ratio.
   * @default 'md'
   */
  size?: LogoSize;
  /**
   * Wordmark fill (`currentColor`). Prefer this over mixing `text-content-*` in `className`
   * — conflicting `text-*` utilities do not reliably override each other in Tailwind.
   * @default 'default'
   */
  variant?: LogoVariant;
  /** Accessible name for the brand mark. */
  "aria-label"?: string;
}

// ── Styles ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<LogoSize, string> = {
  sm: "w-24",
  md: "w-36",
  lg: "w-48",
};

const variantTextClass: Record<LogoVariant, string> = {
  default: "text-content-primary",
  inverse: "text-content-inverse",
  inherit: "",
};

/**
 * **Runswap** wordfill: main paths use **`currentColor`**, driven by **`variant`**
 * (or an ancestor when `variant="inherit"`). Marks use `--color-primary-*` from your last edit.
 */
export const Logo = React.forwardRef<HTMLSpanElement, LogoProps>(function Logo(
  {
    size = "md",
    variant = "default",
    className,
    "aria-label": ariaLabel = "Runswap",
    ...props
  },
  ref,
) {
  const clipPathId = React.useId().replace(/:/g, "");

  return (
    <span
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className={[
        "inline-flex shrink-0 items-center leading-none",
        variantTextClass[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 266 60"
        className="block h-auto w-full"
        aria-hidden
      >
        <g clipPath={`url(#${clipPathId})`}>
          <path
            d="M201.437 46.08L208.093 0H218.637L211.981 46.08H201.437Z"
            fill="currentColor"
          />
          <path
            d="M184.985 46.7383C180.724 46.7383 177.275 45.4656 174.639 42.9202C172.003 40.331 170.685 36.9298 170.685 32.7168C170.685 27.2311 172.552 22.5573 176.286 18.6953C180.065 14.7895 184.612 12.8366 189.928 12.8366C193.662 12.8366 196.825 13.8021 199.417 15.733C202.053 17.664 203.459 20.4507 203.635 24.0933L194.013 26.7264C193.925 25.3659 193.442 24.2907 192.564 23.5008C191.685 22.667 190.521 22.2501 189.071 22.2501C187.006 22.2501 185.249 23.1278 183.799 24.8832C182.349 26.6386 181.624 28.789 181.624 31.3344C181.624 33.1776 182.108 34.6478 183.074 35.7449C184.084 36.7982 185.381 37.3248 186.962 37.3248C188.368 37.3248 189.642 36.9298 190.784 36.1399C191.97 35.3499 192.761 34.2309 193.157 32.7826L202.053 35.4816C200.823 39.0802 198.604 41.867 195.397 43.8418C192.19 45.7728 188.719 46.7383 184.985 46.7383Z"
            fill="currentColor"
          />
          <path
            d="M164.687 13.4949H175.758L150.453 59.2457H140.502L148.015 46.08L138.855 13.4949H149.992L154.539 33.3751L164.687 13.4949Z"
            fill="currentColor"
          />
          <path
            d="M120.689 46.7383C116.428 46.7383 112.979 45.4656 110.343 42.9202C107.707 40.331 106.389 36.9298 106.389 32.7168C106.389 27.2311 108.256 22.5573 111.991 18.6953C115.769 14.7895 120.316 12.8366 125.632 12.8366C129.366 12.8366 132.529 13.8021 135.121 15.733C137.757 17.664 139.163 20.4507 139.339 24.0933L129.718 26.7264C129.63 25.3659 129.147 24.2907 128.268 23.5008C127.389 22.667 126.225 22.2501 124.775 22.2501C122.71 22.2501 120.953 23.1278 119.503 24.8832C118.054 26.6386 117.329 28.789 117.329 31.3344C117.329 33.1776 117.812 34.6478 118.778 35.7449C119.789 36.7982 121.085 37.3248 122.666 37.3248C124.072 37.3248 125.346 36.9298 126.489 36.1399C127.675 35.3499 128.466 34.2309 128.861 32.7826L137.757 35.4816C136.527 39.0802 134.309 41.867 131.102 43.8418C127.894 45.7728 124.424 46.7383 120.689 46.7383Z"
            fill="currentColor"
          />
          <path
            d="M95.414 12.8366C98.9726 12.8366 101.718 13.9118 103.651 16.0622C105.628 18.2126 106.353 21.2187 105.826 25.0807L102.795 46.08H92.2508L94.8209 28.3063C95.0845 26.3314 94.8209 24.8613 94.0301 23.8958C93.2393 22.8864 92.0971 22.3817 90.6033 22.3817C89.0218 22.3817 87.7038 22.9083 86.6494 23.9616C85.595 24.971 84.914 26.507 84.6065 28.5696L82.1023 46.08H71.5584L76.2373 13.4949H86.7812L86.3858 16.0622C88.9339 13.9118 91.9433 12.8366 95.414 12.8366Z"
            fill="currentColor"
          />
          <path
            d="M62.557 13.4949H73.1009L68.422 46.08H57.8781L58.2735 43.4469C55.8133 45.6411 52.8039 46.7383 49.2453 46.7383C45.9064 46.7383 43.2045 45.6192 41.1397 43.381C39.0749 41.099 38.328 37.9173 38.8991 33.8359L41.8646 13.4949H52.4085L49.7725 31.5319C49.5089 33.419 49.7725 34.8453 50.5633 35.8107C51.398 36.7323 52.5623 37.1931 54.056 37.1931C55.6376 37.1931 56.9555 36.6885 58.0099 35.6791C59.0643 34.6258 59.7453 33.0679 60.0528 31.0053L62.557 13.4949Z"
            fill="currentColor"
          />
          <path
            d="M-3.24249e-05 46.08L6.6558 0H24.3827C29.5229 0 33.3231 1.09714 35.7833 3.29143C38.2875 5.44183 39.5396 8.42606 39.5396 12.2441C39.5396 16.1499 38.5072 19.595 36.4423 22.5792C34.4214 25.5195 31.6536 27.6261 28.139 28.8987L35.5856 46.08H24.185L17.5951 30.2811H13.1139L10.8075 46.08H-3.24249e-05ZM14.4978 20.6043H22.2739C24.0313 20.6043 25.4811 20.0119 26.6233 18.827C27.8095 17.5982 28.4026 16.0402 28.4026 14.1531C28.4026 12.8366 28.0072 11.7833 27.2164 10.9934C26.4256 10.1595 25.2614 9.74263 23.7237 9.74263H16.0135L14.4978 20.6043Z"
            fill="currentColor"
          />
          <path
            d="M223.461 36.002L221.976 46.2877H216.826L218.313 36.002H223.461Z"
            fill="var(--color-yellow-200)"
          />
          <path
            d="M232.075 36.002L230.591 46.2877H225.655L227.14 36.002H232.075Z"
            fill="var(--color-yellow-200)"
          />
          <path
            d="M240.673 36.002L239.188 46.2877H234.269L235.754 36.002H240.673Z"
            fill="var(--color-yellow-200)"
          />
          <path
            d="M249.567 36.0019C252.884 36.0019 255.573 33.3156 255.573 30.0018C255.573 26.6881 252.884 24.0018 249.567 24.0018H219.119L241.637 1.50854L248.917 8.78087L243.976 13.7161H249.567C258.571 13.7161 265.87 21.0075 265.87 30.0018C265.87 38.7087 259.03 45.8184 250.425 46.2641V46.2876H242.867L244.351 36.0019H249.567Z"
            fill="var(--color-yellow-200)"
          />
        </g>
        <defs>
          <clipPath id={clipPathId}>
            <rect width="266" height="60" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
});

Logo.displayName = "Logo";
