import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";

// ── Types ──────────────────────────────────────────────────────────────────

export interface TabsProps {
  /** The value of the currently active tab (controlled) */
  value?: any;
  /** The default active tab value (uncontrolled). Defaults to 0 (first tab). */
  defaultValue?: any;
  /** Callback when the active tab changes */
  onValueChange?: (value: any) => void;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
  className?: string;
}

export interface TabsListProps {
  /** Whether arrow-key focus immediately activates the tab */
  activateOnFocus?: boolean;
  /** Whether keyboard focus loops at the list boundaries */
  loopFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface TabsTabProps {
  /** Unique value identifying this tab — must match a TabsPanel value */
  value: any;
  /** Whether this tab is disabled */
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface TabsIndicatorProps {
  className?: string;
}

export interface TabsPanelProps {
  /** Value that associates this panel with its Tab */
  value: any;
  /** Keep the panel DOM node when hidden */
  keepMounted?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// ── Tabs (Root) ────────────────────────────────────────────────────────────

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  children,
  className,
}: TabsProps) {
  return (
    <BaseTabs.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      className={[
        orientation === "vertical" ? "flex" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseTabs.Root>
  );
}

Tabs.displayName = "Tabs";

// ── TabsList ───────────────────────────────────────────────────────────────

export function TabsList({
  activateOnFocus = true,
  loopFocus = true,
  children,
  className,
}: TabsListProps) {
  return (
    <BaseTabs.List
      activateOnFocus={activateOnFocus}
      loopFocus={loopFocus}
      className={[
        "relative flex items-stretch",
        "border-b border-border-default",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      <TabsIndicator />
    </BaseTabs.List>
  );
}

TabsList.displayName = "TabsList";

// ── TabsTab ────────────────────────────────────────────────────────────────

export function TabsTab({
  value,
  disabled,
  children,
  className,
}: TabsTabProps) {
  return (
    <BaseTabs.Tab
      value={value}
      disabled={disabled}
      className={[
        "relative px-4 py-2.5 text-sm font-medium",
        "cursor-pointer select-none",
        "text-content-secondary",
        "transition-colors duration-[200ms]",
        // hover
        "hover:text-content-primary hover:bg-surface-hover",
        // selected
        "data-[selected]:text-content-brand",
        // focus
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-border-focus focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background-primary",
        "focus-visible:rounded-sm",
        // disabled
        "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
        "data-[disabled]:hover:bg-transparent data-[disabled]:hover:text-content-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseTabs.Tab>
  );
}

TabsTab.displayName = "TabsTab";

// ── TabsIndicator ──────────────────────────────────────────────────────────

export function TabsIndicator({ className }: TabsIndicatorProps) {
  return (
    <BaseTabs.Indicator
      className={[
        "absolute bottom-0 h-0.5 bg-border-brand",
        "transition-all duration-[200ms]",
        "data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:right-0",
        "data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-0.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

TabsIndicator.displayName = "TabsIndicator";

// ── TabsPanel ──────────────────────────────────────────────────────────────

export function TabsPanel({
  value,
  keepMounted = false,
  children,
  className,
}: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      value={value}
      keepMounted={keepMounted}
      className={[
        "pt-4 text-sm text-content-primary",
        "focus-visible:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseTabs.Panel>
  );
}

TabsPanel.displayName = "TabsPanel";
