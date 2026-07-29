import * as React from "react";
import {
  type BrandId,
  getBrandCatalogEntry,
} from "./brand-catalog";
import { BRAND_SVGS } from "./brand-svgs.generated";

// ── Types ──────────────────────────────────────────────────────────────────

export type BrandLogoSize = "xs" | "sm" | "md" | "lg";

export interface BrandLogoProps {
  /** Brand slug from `brand-catalog` (e.g. `nike`, `garmin`) */
  brand: BrandId;
  /** Visual height — width scales with the logo aspect ratio */
  size?: BrandLogoSize;
  /** Render logo in grayscale (no brand colors) */
  monochrome?: boolean;
  /** Accessible label — defaults to the catalog display name */
  label?: string;
  className?: string;
}

export type { BrandId, BrandCategory, BrandCatalogEntry } from "./brand-catalog";
export { BRAND_CATALOG, BRAND_IDS, getBrandCatalogEntry } from "./brand-catalog";

// ── Styles ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<BrandLogoSize, string> = {
  xs: "h-3",
  sm: "h-4",
  md: "h-6",
  lg: "h-8",
};

const fallbackSizeClasses: Record<BrandLogoSize, string> = {
  xs: "size-3 text-[8px]",
  sm: "size-4 text-[9px]",
  md: "size-6 text-[10px]",
  lg: "size-8 text-xs",
};

function toDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function BrandLogoFallback({
  label,
  size,
  monochrome,
  className,
}: {
  label: string;
  size: BrandLogoSize;
  monochrome?: boolean;
  className?: string;
}) {
  const initial = label.trim().charAt(0).toUpperCase() || "?";

  return (
    <span
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-md font-semibold uppercase",
        monochrome
          ? "bg-transparent text-content-primary"
          : "bg-surface-tertiary text-content-secondary",
        fallbackSizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="img"
      aria-label={label}
    >
      {initial}
    </span>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

/** Brand logo from committed local SVG assets (`src/components/BrandLogo/svg/`). */
export function BrandLogo({
  brand,
  size = "md",
  monochrome = false,
  label,
  className,
}: BrandLogoProps) {
  const meta = getBrandCatalogEntry(brand);
  const accessibleName = label ?? meta.name;
  const localSvg = BRAND_SVGS[brand];

  const imgClassName = [
    "inline-block w-auto max-w-full object-contain object-left",
    sizeClasses[size],
    monochrome ? "grayscale brightness-0" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!localSvg) {
    return (
      <BrandLogoFallback
        label={accessibleName}
        size={size}
        monochrome={monochrome}
        className={className}
      />
    );
  }

  return (
    <img
      src={toDataUri(localSvg)}
      alt={accessibleName}
      className={imgClassName}
      loading="lazy"
      decoding="async"
    />
  );
}

BrandLogo.displayName = "BrandLogo";

/** Whether a local SVG asset exists for this brand */
export function hasBrandLogo(brand: BrandId): boolean {
  return Boolean(BRAND_SVGS[brand]);
}
