import * as React from "react";
import { Radio } from "@base-ui-components/react/radio";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { useSelectBoxGroupContext } from "./SelectBoxGroup";

// ── Types ──────────────────────────────────────────────────────────────────

export type SelectBoxSize = "sm" | "md" | "lg";

export interface SelectBoxProps {
  /** Unique value within the parent group */
  value: string;
  /** Leading icon (decorative — hide from AT via parent) */
  icon?: React.ReactNode;
  /** Primary label */
  title: React.ReactNode;
  /** Secondary line under the title */
  description?: React.ReactNode;
  /** Disable this option */
  disabled?: boolean;
  /** Visual density */
  size?: SelectBoxSize;
  className?: string;
}

// ── Styles ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<
  SelectBoxSize,
  { padding: string; gap: string; icon: string; title: string; desc: string }
> = {
  sm: {
    padding: "p-3",
    gap: "gap-2.5",
    icon: "size-8 [&_svg]:size-5",
    title: "text-sm font-semibold",
    desc: "text-xs",
  },
  md: {
    padding: "p-4",
    gap: "gap-3",
    icon: "size-10 [&_svg]:size-6",
    title: "text-body-sm font-semibold",
    desc: "text-body-sm",
  },
  lg: {
    padding: "p-5",
    gap: "gap-4",
    icon: "size-12 [&_svg]:size-7",
    title: "text-body font-semibold",
    desc: "text-body-sm",
  },
};

const cardBase = [
  "flex w-full min-w-0 rounded-xl border-2 bg-surface-primary text-left",
  "transition-[border-color,background-color,box-shadow] duration-200",
  "border-border-default",
  "hover:border-border-strong hover:bg-surface-secondary/80",
  // selected (peer = hidden radio/checkbox; Base UI uses data-checked)
  "peer-data-[checked]:border-border-brand peer-data-[checked]:bg-surface-secondary",
  "peer-data-[checked]:shadow-sm",
  // disabled
  "peer-data-[disabled]:pointer-events-none peer-data-[disabled]:opacity-50",
].join(" ");

// ── SelectBox ────────────────────────────────────────────────────────────

/**
 * Card-style option with icon, title, and description. Must be used inside **`SelectBoxGroup`**.
 * Selection styling (border + background) is driven by the hidden radio or checkbox.
 */
export function SelectBox({
  value,
  icon,
  title,
  description,
  disabled,
  size = "md",
  className,
}: SelectBoxProps) {
  const ctx = useSelectBoxGroupContext();

  if (ctx === null) {
    throw new Error("SelectBox must be used inside SelectBoxGroup.");
  }

  const s = sizeClasses[size];

  if (ctx.mode === "radio") {
    return (
      <label
        className={[
          "block w-full cursor-pointer rounded-xl",
          "outline-none focus-within:ring-2 focus-within:ring-border-focus focus-within:ring-offset-2 focus-within:ring-offset-background-primary",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Radio.Root value={value} disabled={disabled} className="peer sr-only">
          <Radio.Indicator className="sr-only" />
        </Radio.Root>
        <SelectBoxCardVisual
          icon={icon}
          title={title}
          description={description}
          s={s}
        />
      </label>
    );
  }

  const checked = ctx.selectedValues.includes(value);

  return (
    <label
      className={[
        "block w-full cursor-pointer rounded-xl",
        "outline-none focus-within:ring-2 focus-within:ring-border-focus focus-within:ring-offset-2 focus-within:ring-offset-background-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <BaseCheckbox.Root
        checked={checked}
        onCheckedChange={() => ctx.toggleValue(value)}
        disabled={disabled ?? ctx.disabled}
        name={ctx.name}
        value={value}
        className="peer sr-only"
      >
        <BaseCheckbox.Indicator className="sr-only" />
      </BaseCheckbox.Root>
      <SelectBoxCardVisual
        icon={icon}
        title={title}
        description={description}
        s={s}
      />
    </label>
  );
}

SelectBox.displayName = "SelectBox";

function SelectBoxCardVisual({
  icon,
  title,
  description,
  s,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  s: (typeof sizeClasses)[SelectBoxSize];
}) {
  return (
    <div
      className={[
        "pointer-events-none flex",
        s.gap,
        s.padding,
        cardBase,
      ].join(" ")}
    >
      {icon !== undefined && (
        <span
          className={["flex shrink-0 items-center justify-center text-content-brand", s.icon].join(" ")}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={[s.title, "text-content-primary"].join(" ")}>{title}</span>
        {description !== undefined && (
          <span className={[s.desc, "text-content-secondary"].join(" ")}>{description}</span>
        )}
      </span>
    </div>
  );
}

