import * as React from "react";
import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";

// ── Types ──────────────────────────────────────────────────────────────────

export type RadioSize = "sm" | "md" | "lg";

export interface RadioGroupProps {
  /** Controlled selected value */
  value?: string;
  /** Default selected value for uncontrolled usage */
  defaultValue?: string;
  /** Called when the selected value changes */
  onValueChange?: (value: string) => void;
  /** Disable all radios in the group */
  disabled?: boolean;
  /** Makes all radios read-only */
  readOnly?: boolean;
  /** Require a selection before form submission */
  required?: boolean;
  /** Form field name */
  name?: string;
  /** Layout direction of radio items */
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface RadioItemProps {
  /** The unique value for this radio option */
  value: string;
  /** Size variant */
  size?: RadioSize;
  /** Disable this specific radio */
  disabled?: boolean;
  /** Makes this radio read-only */
  readOnly?: boolean;
  /** Primary label text */
  label?: React.ReactNode;
  /** Secondary description below the label */
  description?: React.ReactNode;
  /** Custom content rendered alongside the radio control */
  children?: React.ReactNode;
  /** Additional CSS classes applied to the wrapper */
  className?: string;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const rootSizeClasses: Record<RadioSize, string> = {
  sm: "size-4",
  md: "size-[18px]",
  lg: "size-5",
};

const indicatorSizeClasses: Record<RadioSize, string> = {
  sm: "size-[6px]",
  md: "size-2",
  lg: "size-[8px]",
};

const labelSizeClasses: Record<RadioSize, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

const descriptionSizeClasses: Record<RadioSize, string> = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
};

const gapClasses: Record<RadioSize, string> = {
  sm: "gap-2",
  md: "gap-2.5",
  lg: "gap-3",
};

// ── RadioGroup ─────────────────────────────────────────────────────────────

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  disabled,
  readOnly,
  required,
  name,
  orientation = "vertical",
  children,
  className,
}: RadioGroupProps) {
  return (
    <BaseRadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onValueChange ? (v: unknown) => onValueChange(v as string) : undefined
      }
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      className={[
        "flex",
        orientation === "horizontal"
          ? "flex-row flex-wrap gap-4"
          : "flex-col gap-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseRadioGroup>
  );
}

RadioGroup.displayName = "RadioGroup";

// ── RadioItem ──────────────────────────────────────────────────────────────

export function RadioItem({
  value,
  size = "md",
  disabled,
  readOnly,
  label,
  description,
  children,
  className,
}: RadioItemProps) {
  const hasContent =
    label !== undefined || description !== undefined || children !== undefined;

  return (
    <label
      className={[
        "inline-flex items-start select-none",
        "cursor-pointer",
        // when the inner radio root gets data-disabled from group or item prop
        "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50",
        gapClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Radio.Root
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        className={[
          // layout
          "relative flex shrink-0 items-center justify-center rounded-full border-2",
          // transition
          "cursor-pointer transition-colors duration-[200ms]",
          // unchecked default
          "border-border-strong bg-transparent",
          // hover (unchecked)
          "hover:border-border-brand",
          // checked
          "data-[checked]:border-accent-primary data-[checked]:bg-accent-primary",
          // focus ring
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background-primary",
          // disabled cursor (opacity handled by parent label via has-[])
          "data-[disabled]:cursor-not-allowed",
          // optical top-alignment with first line of text
          "mt-px",
          rootSizeClasses[size],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Radio.Indicator
          className={[
            "rounded-full bg-content-inverse",
            "transition-[transform,opacity] duration-[200ms]",
            // scale in/out animation
            "data-[starting-style]:scale-0 data-[ending-style]:scale-0",
            indicatorSizeClasses[size],
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </Radio.Root>

      {hasContent && (
        <div className="flex flex-col gap-0.5">
          {label !== undefined && (
            <span
              className={[
                "font-medium leading-snug text-content-primary",
                labelSizeClasses[size],
              ].join(" ")}
            >
              {label}
            </span>
          )}
          {description !== undefined && (
            <span
              className={[
                "leading-snug text-content-secondary",
                descriptionSizeClasses[size],
              ].join(" ")}
            >
              {description}
            </span>
          )}
          {children}
        </div>
      )}
    </label>
  );
}

RadioItem.displayName = "RadioItem";
