import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { RiArrowDownSLine } from "react-icons/ri";

// ── Types ──────────────────────────────────────────────────────────────────

export interface AccordionProps {
  /** The controlled value of the expanded item(s) */
  value?: (string | number)[];
  /** The initially expanded item(s) (uncontrolled) */
  defaultValue?: (string | number)[];
  /** Callback when an item is expanded or collapsed */
  onValueChange?: (value: (string | number)[]) => void;
  /** Allow multiple items open simultaneously */
  multiple?: boolean;
  /** Disable all items */
  disabled?: boolean;
  /** Keep closed panels in the DOM */
  keepMounted?: boolean;
  /** Orientation of the accordion */
  orientation?: "vertical" | "horizontal";
  children?: React.ReactNode;
  className?: string;
}

export interface AccordionItemProps {
  /** Unique value identifying this item */
  value: string | number;
  /** Disable this individual item */
  disabled?: boolean;
  /** Callback when this item is opened or closed */
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

export interface AccordionTriggerProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AccordionPanelProps {
  children?: React.ReactNode;
  className?: string;
}

// ── Accordion (Root) ───────────────────────────────────────────────────────

export function Accordion({
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  disabled = false,
  keepMounted = false,
  orientation = "vertical",
  children,
  className,
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      multiple={multiple}
      disabled={disabled}
      keepMounted={keepMounted}
      orientation={orientation}
      className={[
        "w-full divide-y divide-border-default border-y border-border-default",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
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
  onOpenChange,
  children,
  className,
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      value={value}
      disabled={disabled}
      onOpenChange={onOpenChange}
      className={[
        "group/item",
        "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
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

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="flex">
      <BaseAccordion.Trigger
        className={[
          "group/trigger",
          "flex flex-1 items-center justify-between gap-2",
          "py-4 text-left font-medium",
          "text-content-primary bg-transparent",
          "cursor-pointer transition-colors duration-[200ms]",
          "hover:text-content-secondary",
          // focus ring
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background-primary",
          "rounded-sm",
          // disabled
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
        <RiArrowDownSLine
          className={[
            "size-4 shrink-0 text-content-secondary",
            "transition-transform duration-[200ms] ease-out",
            "group-data-[panel-open]/trigger:rotate-180",
          ].join(" ")}
          aria-hidden
        />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

AccordionTrigger.displayName = "AccordionTrigger";

// ── AccordionPanel ─────────────────────────────────────────────────────────

export function AccordionPanel({ children, className }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={[
        "overflow-hidden text-sm text-content-secondary",
        "transition-[height] duration-[200ms] ease-out",
        "h-[var(--accordion-panel-height)]",
        "data-[starting-style]:h-0",
        "data-[ending-style]:h-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="pb-4">{children}</div>
    </BaseAccordion.Panel>
  );
}

AccordionPanel.displayName = "AccordionPanel";
