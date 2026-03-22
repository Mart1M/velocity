import * as React from "react";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";

// ── Types ──────────────────────────────────────────────────────────────────

export type SelectBoxGroupMode = "radio" | "checkbox";

export interface SelectBoxGroupBaseProps {
  /** Disable all options */
  disabled?: boolean;
  /** Form field name (radio group name, or shared name for checkboxes) */
  name?: string;
  layout?: "vertical" | "horizontal";
  children: React.ReactNode;
  className?: string;
}

export interface SelectBoxGroupRadioProps extends SelectBoxGroupBaseProps {
  mode: "radio";
  /** Selected value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Require a value before submit */
  required?: boolean;
}

export interface SelectBoxGroupCheckboxProps extends SelectBoxGroupBaseProps {
  mode: "checkbox";
  /** Selected values (controlled) */
  value?: string[];
  /** Default values (uncontrolled) */
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type SelectBoxGroupProps = SelectBoxGroupRadioProps | SelectBoxGroupCheckboxProps;

// ── Context ────────────────────────────────────────────────────────────────

export interface SelectBoxGroupContextValue {
  mode: SelectBoxGroupMode;
  /** Checkbox mode: current selection */
  selectedValues: string[];
  toggleValue: (value: string) => void;
  disabled?: boolean;
  /** Checkbox mode: input name for forms */
  name?: string;
}

export const SelectBoxGroupContext =
  React.createContext<SelectBoxGroupContextValue | null>(null);

export function useSelectBoxGroupContext(): SelectBoxGroupContextValue | null {
  return React.useContext(SelectBoxGroupContext);
}

// ── Checkbox group ──────────────────────────────────────────────────────────

function SelectBoxCheckboxGroup({
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  name,
  layout = "vertical",
  children,
  className,
}: {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  name?: string;
  layout?: "vertical" | "horizontal";
  children: React.ReactNode;
  className?: string;
}) {
  const [uncontrolled, setUncontrolled] = React.useState<string[]>(defaultValue ?? []);
  const selectedValues = valueProp ?? uncontrolled;

  const setSelectedValues = React.useCallback(
    (next: string[]) => {
      if (valueProp === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [valueProp, onValueChange]
  );

  const toggleValue = React.useCallback(
    (v: string) => {
      const set = new Set(selectedValues);
      if (set.has(v)) set.delete(v);
      else set.add(v);
      setSelectedValues([...set]);
    },
    [selectedValues, setSelectedValues]
  );

  const ctx: SelectBoxGroupContextValue = React.useMemo(
    () => ({
      mode: "checkbox",
      selectedValues,
      toggleValue,
      disabled,
      name,
    }),
    [selectedValues, toggleValue, disabled, name]
  );

  return (
    <SelectBoxGroupContext.Provider value={ctx}>
      <div
        role="group"
        className={[
          "flex min-w-0",
          layout === "horizontal"
            ? "flex-row flex-wrap gap-4"
            : "flex-col gap-3",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </SelectBoxGroupContext.Provider>
  );
}

// ── SelectBoxGroup ────────────────────────────────────────────────────────

/**
 * Groups **`SelectBox`** items. Use `mode="radio"` for a single choice or `mode="checkbox"` for multiple.
 */
export function SelectBoxGroup(props: SelectBoxGroupProps) {
  const { mode, disabled, layout = "vertical", children, className } = props;

  if (mode === "radio") {
    const { value, defaultValue, onValueChange, name, required } = props;

    const ctx: SelectBoxGroupContextValue = React.useMemo(
      () => ({
        mode: "radio",
        selectedValues: [],
        toggleValue: () => {
          /* radio uses BaseRadioGroup */
        },
        disabled,
      }),
      [disabled]
    );

    return (
      <SelectBoxGroupContext.Provider value={ctx}>
        <BaseRadioGroup
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange ? (v: unknown) => onValueChange(v as string) : undefined}
          disabled={disabled}
          required={required}
          name={name}
          className={[
            "flex min-w-0",
            layout === "horizontal"
              ? "flex-row flex-wrap gap-4"
              : "flex-col gap-3",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </BaseRadioGroup>
      </SelectBoxGroupContext.Provider>
    );
  }

  const { value, defaultValue, onValueChange, name } = props;

  return (
    <SelectBoxCheckboxGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      layout={layout}
      className={className}
    >
      {children}
    </SelectBoxCheckboxGroup>
  );
}

SelectBoxGroup.displayName = "SelectBoxGroup";
