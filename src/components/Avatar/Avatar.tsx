import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import { RiUser3Line } from "react-icons/ri";

// ── Types ──────────────────────────────────────────────────────────────────

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  /** Image URL — omit with `fallback` only for initials / icon */
  src?: string;
  /** Accessible description of the photo (required if `src` is set) */
  alt?: string;
  /**
   * Shown when there is no `src` or when the image fails to load.
   * Defaults to **initials** from `alt`, or a generic user icon.
   */
  fallback?: React.ReactNode;
  /** Visual size */
  size?: AvatarSize;
  /** Root element */
  className?: string;
  /** Extra classes on `Avatar.Image` */
  imageClassName?: string;
  /** Extra classes on `Avatar.Fallback` */
  fallbackClassName?: string;
  /** Passed to Base UI `Fallback` — delay before showing fallback (ms) */
  fallbackDelay?: number;
  /** `img` loading attribute */
  loading?: "eager" | "lazy";
  /** Image load status callback */
  onLoadingStatusChange?: React.ComponentProps<
    typeof BaseAvatar.Image
  >["onLoadingStatusChange"];
}

// ── Primitives (composition) ───────────────────────────────────────────────

/** Re-export [Base UI Avatar](https://base-ui.com/react/components/avatar) parts for custom layouts. */
export const AvatarParts = {
  Root: BaseAvatar.Root,
  Image: BaseAvatar.Image,
  Fallback: BaseAvatar.Fallback,
} as const;

// ── Styles ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<AvatarSize, string> = {
  sm: "size-8 min-h-8 min-w-8 text-xs",
  md: "size-10 min-h-10 min-w-10 text-sm",
  lg: "size-12 min-h-12 min-w-12 text-base",
  xl: "size-16 min-h-16 min-w-16 text-lg",
};

const fallbackIconClasses: Record<AvatarSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary";

function initialsFromLabel(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return `${first}${last}`.toUpperCase();
}

// ── Avatar ─────────────────────────────────────────────────────────────────

/**
 * User **avatar** (photo, initials, or fallback), built on
 * [Base UI Avatar](https://base-ui.com/react/components/avatar).
 */
export function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  className,
  imageClassName,
  fallbackClassName,
  fallbackDelay,
  loading = "lazy",
  onLoadingStatusChange,
}: AvatarProps) {
  const sc = sizeClasses[size];

  const fallbackContent =
    fallback !== undefined && fallback !== null ? (
      fallback
    ) : alt.trim().length > 0 ? (
      initialsFromLabel(alt)
    ) : (
      <RiUser3Line
        className={[fallbackIconClasses[size], "shrink-0 opacity-90"].join(" ")}
        aria-hidden
      />
    );

  return (
    <BaseAvatar.Root
      className={[
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        "bg-surface-secondary text-content-secondary font-medium tabular-nums",
        "ring-1 ring-border-default ring-inset",
        sc,
        focusRing,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {src !== undefined && src.length > 0 && (
        <BaseAvatar.Image
          src={src}
          alt={alt}
          loading={loading}
          onLoadingStatusChange={onLoadingStatusChange}
          className={["h-full w-full object-cover", imageClassName].filter(Boolean).join(" ")}
        />
      )}
      <BaseAvatar.Fallback
        delay={fallbackDelay}
        className={[
          "flex h-full w-full items-center justify-center",
          fallbackClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {fallbackContent}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}

Avatar.displayName = "Avatar";
