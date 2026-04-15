import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { RiArrowDownSLine } from "react-icons/ri";

// ── Types ──────────────────────────────────────────────────────────────────

export interface AccordionProps {
  /** The uncontrolled value(s) of the expanded item(s) */
  defaultValue?: string[];
  /** The controlled value(s) of the expanded item(s) */
  value?: string[];
  /** Callback fired when an item is expanded or collapsed */
  onValueChange?: (value: string[]) => void;
  /** Allow multiple items to be open simultaneously */
  multiple?: boolean;
  /** Disable the entire accordion */
  disabled?: boolean;
  /** Loop keyboard focus at list boundaries */
  loopFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface AccordionItemProps {
  /** Unique value identifying this item */
  value: string;
  /** Disable interaction for this item */
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface AccordionTriggerProps {
  /** Hide the animated chevron icon */
  hideIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface AccordionPanelProps {
  /** Keep the panel in the DOM when closed */
  keepMounted?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// ── Accordion (Root) ───────────────────────────────────────────────────────

export function Accordion({
  defaultValue,
  value,
  onValueChange,
  multiple = false,
  disabled = false,
  loopFocus = true,
  children,
  className,
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      multiple={multiple}
      disabled={disabled}
      loopFocus={loopFocus}
      className={["w-full", className].filter(Boolean).join(" ")}
    >
      {children}
    </BaseAccordion.Root>
  );
}

Accordion.displayName = "Accordion";

// ── AccordionItem ──────────────────────────────────────────────────────────

export function AccordionItem({
  value,
  disabled,
  children,
  className,
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      value={value}
      disabled={disabled}
      className={[
        "border-b border-border-subtle",
        "data-disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseAccordion.Item>
  );
}

AccordionItem.displayName = "AccordionItem";

// ── AccordionTrigger ───────────────────────────────────────────────────────

export function AccordionTrigger({
  hideIcon = false,
  children,
  className,
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="flex">
      <BaseAccordion.Trigger
        className={[
          // layout
          "group flex flex-1 items-center justify-between",
          "py-4 px-0 gap-3",
          // typography
          "text-sm font-medium text-content-primary text-left",
          // interaction
          "cursor-pointer",
          "transition-colors duration-200",
          // hover
          "hover:text-content-brand",
          // focus
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background-primary",
          // disabled
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          "data-[disabled]:hover:text-content-primary",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
        {!hideIcon && (
          <RiArrowDownSLine
            className={[
              "shrink-0 h-4 w-4 text-content-secondary",
              "transition-transform duration-[200ms]",
              "group-data-[panel-open]:rotate-180",
            ].join(" ")}
            aria-hidden
          />
        )}
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

AccordionTrigger.displayName = "AccordionTrigger";

// ── AccordionPanel ─────────────────────────────────────────────────────────

export function AccordionPanel({
  keepMounted = false,
  children,
  className,
}: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      keepMounted={keepMounted}
      className={[
        // height animation using the CSS custom property Base UI provides
        "overflow-hidden",
        "h-(--accordion-panel-height)",
        "transition-[height] duration-[200ms] ease-in-out",
        // enter/exit animation states (Base UI sets these data attributes)
        "data-[starting-style]:h-0",
        "data-[ending-style]:h-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="pb-4 text-sm text-content-secondary">{children}</div>
    </BaseAccordion.Panel>
  );
}

AccordionPanel.displayName = "AccordionPanel";
