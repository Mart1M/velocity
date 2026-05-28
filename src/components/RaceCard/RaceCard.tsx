import * as React from "react";
import {
  RiCalendarLine,
  RiFlagLine,
  RiMapPin2Line,
  RiRunLine,
  RiRulerLine,
} from "react-icons/ri";

// ── Types ──────────────────────────────────────────────────────────────────

export type RaceCardSize = "sm" | "md" | "lg";

export interface RaceCardProps {
  /** When set, the whole card renders as a link */
  href?: string;
  size?: RaceCardSize;
  disabled?: boolean;
  /** Show Remix icons next to date, type, title, location, distances (default: true) */
  showIcons?: boolean;
  /** Typical order: `RaceCardImage` then `RaceCardContent` */
  children?: React.ReactNode;
  className?: string;
}

export interface RaceCardImageProps {
  src: string;
  alt: string;
  /** Overlays (e.g. `RaceCardBadges`) */
  children?: React.ReactNode;
  className?: string;
}

export interface RaceCardBadgesProps {
  children?: React.ReactNode;
  className?: string;
}

export interface RaceCardContentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface RaceCardDateProps {
  children?: React.ReactNode;
  className?: string;
}

/** Type de course (trail, route, semi-marathon, etc.) */
export interface RaceCardRaceTypeProps {
  children?: React.ReactNode;
  className?: string;
}

export interface RaceCardTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export interface RaceCardLocationProps {
  children?: React.ReactNode;
  className?: string;
}

export interface RaceCardDistancesProps {
  /**
   * Single line (e.g. `"5 km · 10 km · Semi"`) or list rendered as compact pills.
   */
  distances: string | readonly string[];
  className?: string;
}

// ── Context ────────────────────────────────────────────────────────────────

interface RaceCardContextValue {
  size: RaceCardSize;
  disabled: boolean;
  showIcons: boolean;
}

const RaceCardContext = React.createContext<RaceCardContextValue>({
  size: "md",
  disabled: false,
  showIcons: true,
});

function useRaceCard() {
  return React.useContext(RaceCardContext);
}

// ── Style maps (aligned with ProductCard shell) ─────────────────────────────

const rootSizeClasses: Record<RaceCardSize, string> = {
  sm: "rounded-xl",
  md: "rounded-xl",
  lg: "rounded-2xl",
};

const imageAspectClasses: Record<RaceCardSize, string> = {
  sm: "aspect-[16/10]",
  md: "aspect-[16/10]",
  lg: "aspect-[16/10]",
};

const titleSizeClasses: Record<RaceCardSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const iconBoxClasses: Record<RaceCardSize, string> = {
  sm: "h-3.5 w-3.5 shrink-0 [&>svg]:h-full [&>svg]:w-full",
  md: "h-4 w-4 shrink-0 [&>svg]:h-full [&>svg]:w-full",
  lg: "h-[18px] w-[18px] shrink-0 [&>svg]:h-full [&>svg]:w-full",
};

function RaceCardIconSlot({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { size } = useRaceCard();
  return (
    <span
      className={["inline-flex text-current", iconBoxClasses[size], className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      {children}
    </span>
  );
}

// ── RaceCard (root) ───────────────────────────────────────────────────────

export function RaceCard({
  href,
  size = "md",
  disabled = false,
  showIcons = true,
  children,
  className,
}: RaceCardProps) {
  const ctx = React.useMemo<RaceCardContextValue>(
    () => ({ size, disabled, showIcons }),
    [size, disabled, showIcons],
  );

  const baseClasses = [
    "group block w-full",
    "bg-surface-primary border border-border-default",
    "overflow-hidden transition-all duration-200",
    "hover:border-border-strong hover:shadow-md",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background-primary",
    disabled && "pointer-events-none opacity-60",
    rootSizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <RaceCardContext.Provider value={ctx}>{children}</RaceCardContext.Provider>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={baseClasses}>
        {inner}
      </a>
    );
  }

  return <article className={baseClasses}>{inner}</article>;
}

RaceCard.displayName = "RaceCard";

// ── RaceCardImage ───────────────────────────────────────────────────────────

export function RaceCardImage({
  src,
  alt,
  children,
  className,
}: RaceCardImageProps) {
  const { size } = useRaceCard();

  return (
    <div
      className={[
        "relative overflow-hidden bg-surface-secondary",
        imageAspectClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      {children}
    </div>
  );
}

RaceCardImage.displayName = "RaceCardImage";

// ── RaceCardBadges (top-left on image, same slot as ProductCardBadges) ───────

export function RaceCardBadges({ children, className }: RaceCardBadgesProps) {
  if (!children) return null;

  return (
    <div
      className={[
        "absolute left-2 top-2 z-10 flex flex-wrap gap-1.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

RaceCardBadges.displayName = "RaceCardBadges";

// ── RaceCardContent ────────────────────────────────────────────────────────

export function RaceCardContent({ children, className }: RaceCardContentProps) {
  return (
    <div
      className={["flex flex-col gap-1.5 p-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

RaceCardContent.displayName = "RaceCardContent";

// ── RaceCardDate ────────────────────────────────────────────────────────────

export function RaceCardDate({ children, className }: RaceCardDateProps) {
  const { showIcons } = useRaceCard();

  return (
    <p
      className={[
        "m-0 flex items-center gap-1.5 text-xs font-medium text-content-tertiary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIcons ? (
        <RaceCardIconSlot className="text-content-tertiary">
          <RiCalendarLine />
        </RaceCardIconSlot>
      ) : null}
      <span className="min-w-0">{children}</span>
    </p>
  );
}

RaceCardDate.displayName = "RaceCardDate";

// ── RaceCardRaceType ────────────────────────────────────────────────────────

export function RaceCardRaceType({
  children,
  className,
}: RaceCardRaceTypeProps) {
  const { showIcons } = useRaceCard();

  return (
    <span
      className={[
        "inline-flex min-w-0 items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-content-brand",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIcons ? (
        <RaceCardIconSlot className="text-content-brand">
          <RiRunLine />
        </RaceCardIconSlot>
      ) : null}
      <span className="min-w-0">{children}</span>
    </span>
  );
}

RaceCardRaceType.displayName = "RaceCardRaceType";

// ── RaceCardTitle (nom de la course) ────────────────────────────────────────

export function RaceCardTitle({ children, className }: RaceCardTitleProps) {
  const { size, showIcons } = useRaceCard();

  return (
    <h3
      className={[
        "flex items-start gap-2 font-bold text-content-primary font-heading",
        titleSizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="line-clamp-2 min-w-0 flex-1">{children}</span>
    </h3>
  );
}

RaceCardTitle.displayName = "RaceCardTitle";

// ── RaceCardLocation ────────────────────────────────────────────────────────

export function RaceCardLocation({
  children,
  className,
}: RaceCardLocationProps) {
  const { showIcons } = useRaceCard();

  return (
    <p
      className={[
        "m-0 flex items-center gap-1.5 text-sm text-content-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIcons ? (
        <RaceCardIconSlot className="text-content-secondary">
          <RiMapPin2Line />
        </RaceCardIconSlot>
      ) : null}
      <span className="min-w-0">{children}</span>
    </p>
  );
}

RaceCardLocation.displayName = "RaceCardLocation";

// ── RaceCardDistances ───────────────────────────────────────────────────────

const distancePillClass =
  "inline-flex items-center rounded-full border border-border-subtle bg-surface-secondary px-2.5 py-0.5 text-xs font-medium text-content-secondary";

export function RaceCardDistances({
  distances,
  className,
}: RaceCardDistancesProps) {
  const { showIcons } = useRaceCard();

  const items =
    typeof distances === "string"
      ? [distances]
      : distances.length > 0
        ? [...distances]
        : [];

  if (items.length === 0) return null;

  return (
    <div
      className={["flex flex-wrap items-center gap-1.5", className]
        .filter(Boolean)
        .join(" ")}
      aria-label="Distances"
    >
      {showIcons ? (
        <RaceCardIconSlot className="text-content-tertiary">
          <RiRulerLine />
        </RaceCardIconSlot>
      ) : null}
      {items.map((d) => (
        <span key={d} className={distancePillClass}>
          {d}
        </span>
      ))}
    </div>
  );
}

RaceCardDistances.displayName = "RaceCardDistances";
