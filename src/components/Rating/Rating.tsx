import * as React from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";

// ── Types ──────────────────────────────────────────────────────────────────

export type RatingSize = "sm" | "md" | "lg";

export type RatingLabelPosition = "top" | "bottom" | "left" | "right";

export interface RatingProps {
  /** Current value (0…`max`, 0 = none) — controlled when set */
  value?: number;
  /** Initial value (uncontrolled) */
  defaultValue?: number;
  /** Called when the rating changes */
  onChange?: (value: number) => void;
  /** Number of stars */
  max?: number;
  /** Display only (no interaction) */
  readOnly?: boolean;
  disabled?: boolean;
  size?: RatingSize;
  /** Accessible label for the group (recommended) */
  label?: string;
  /** Show the label next to the stars (see `labelPosition`) */
  showLabel?: boolean;
  /** Visible label position when `showLabel` is `true` */
  labelPosition?: RatingLabelPosition;
  /** Field name — renders a hidden `<input type="hidden" />` for forms */
  name?: string;
  className?: string;
}

// ── Styles ─────────────────────────────────────────────────────────────────

const iconSize: Record<RatingSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

const gapSize: Record<RatingSize, string> = {
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1.5",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary rounded-sm";

const labelPositionLayout: Record<
  RatingLabelPosition,
  { root: string; labelFirst: boolean }
> = {
  top: { root: "inline-flex flex-col gap-1.5", labelFirst: true },
  bottom: { root: "inline-flex flex-col gap-1.5", labelFirst: false },
  left: { root: "inline-flex flex-row items-center gap-2", labelFirst: true },
  right: { root: "inline-flex flex-row items-center gap-2", labelFirst: false },
};

// ── Rating ─────────────────────────────────────────────────────────────────

/**
 * **Star** rating (1…`max`). **Base UI** does not ship a Rating primitive —
 * native buttons + Velocity tokens + [Remix Icon](https://remixicon.com/) (`RiStarFill` / `RiStarLine`).
 */
export function Rating({
  value: valueProp,
  defaultValue = 0,
  onChange,
  max = 5,
  readOnly = false,
  disabled = false,
  size = "md",
  label = "Rating",
  showLabel = false,
  labelPosition = "top",
  name,
  className,
}: RatingProps) {
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const value = isControlled ? (valueProp ?? 0) : uncontrolled;

  const [hover, setHover] = React.useState<number | null>(null);
  const preview = readOnly ? value : hover ?? value;

  const setRating = (next: number) => {
    if (readOnly || disabled) {
      return;
    }
    if (!isControlled) {
      setUncontrolled(next);
    }
    onChange?.(next);
  };

  const ic = iconSize[size];
  const gap = gapSize[size];

  const stars = React.useMemo(
    () => Array.from({ length: max }, (_, i) => i + 1),
    [max],
  );

  const starElements = stars.map((star) => {
    const filled = star <= preview;
    const Icon = filled ? RiStarFill : RiStarLine;
    const starClass = filled ? "text-state-warning" : "text-content-tertiary";

    if (readOnly) {
      return <Icon key={star} className={[ic, starClass].join(" ")} aria-hidden />;
    }

    return (
      <button
        key={star}
        type="button"
        disabled={disabled}
        aria-label={`${label} : ${star} sur ${max}`}
        onClick={() => setRating(star)}
        onMouseEnter={() => setHover(star)}
        onMouseLeave={() => setHover(null)}
        className={[
          "inline-flex shrink-0 items-center justify-center border-0 bg-transparent p-0",
          "cursor-pointer transition-colors duration-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          focusRing,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Icon className={[ic, starClass].join(" ")} aria-hidden />
      </button>
    );
  });

  const row = (
    <div
      className={["inline-flex items-center", gap].filter(Boolean).join(" ")}
      {...(readOnly
        ? { role: "img" as const, "aria-label": `${label}: ${value} of ${max}` }
        : { role: "group" as const })}
    >
      {starElements}
      {name !== undefined && !readOnly && <input type="hidden" name={name} value={value} readOnly />}
    </div>
  );

  const interactiveShell = !readOnly ? (
    <div role="group" aria-label={label} className="inline-flex flex-col gap-1">
      {row}
    </div>
  ) : (
    row
  );

  if (showLabel) {
    const { root: layoutRoot, labelFirst } = labelPositionLayout[labelPosition];
    const labelEl = (
      <span className="shrink-0 text-sm font-medium text-content-primary">{label}</span>
    );

    return (
      <div className={[layoutRoot, className].filter(Boolean).join(" ")}>
        {labelFirst ? (
          <>
            {labelEl}
            {interactiveShell}
          </>
        ) : (
          <>
            {interactiveShell}
            {labelEl}
          </>
        )}
      </div>
    );
  }

  return <div className={className}>{interactiveShell}</div>;
}

Rating.displayName = "Rating";
