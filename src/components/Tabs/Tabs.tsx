import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";

const TabsChromeContext = React.createContext<{ orientation: "horizontal" | "vertical" }>({
  orientation: "horizontal",
});

function useTabsChromeContext() {
  return React.useContext(TabsChromeContext);
}

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
  /**
   * Keep inactive panels mounted so they can participate in layout.
   * Defaults to `true` when using `TabsPanels` for a stable content height.
   */
  keepMounted?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface TabsPanelsProps {
  /** Tab panels only — place every `TabsPanel` inside this wrapper */
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
  const chrome = React.useMemo(() => ({ orientation }), [orientation]);
  return (
    <BaseTabs.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      className={[
        orientation === "vertical" ? "flex flex-row gap-4 items-start" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <TabsChromeContext.Provider value={chrome}>{children}</TabsChromeContext.Provider>
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
        "relative px-3 py-1.5 text-sm font-medium mb-1 rounded-xl cursor-pointer",
        "data-[orientation=vertical]:mb-0 data-[orientation=vertical]:mr-1",
        "cursor-pointer select-none",
        "text-content-secondary",
        "transition-all duration-[200ms]",
        // hover
        "hover:text-content-primary hover:bg-surface-hover",
        // selected
        "data-active:text-content-primary data-active:bg-surface-secondary",
        // focus
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-border-focus focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background-primary",
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
        "absolute -bottom-0.25 h-[3px] bg-accent-primary",
        "left-[var(--active-tab-left)] w-[var(--active-tab-width)]",
        "[transition:left_250ms_cubic-bezier(0.4,0,0.2,1),width_250ms_cubic-bezier(0.4,0,0.2,1),top_250ms_cubic-bezier(0.4,0,0.2,1),height_250ms_cubic-bezier(0.4,0,0.2,1)]",
        "data-[orientation=vertical]:top-[var(--active-tab-top)] data-[orientation=vertical]:h-[var(--active-tab-height)]",
        "data-[orientation=vertical]:left-auto data-[orientation=vertical]:right-0 data-[orientation=vertical]:w-[3px]",
        "data-[orientation=vertical]:rounded-tl-sm data-[orientation=vertical]:rounded-bl-sm",
        "data-[orientation=horizontal]:rounded-t-sm ",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

TabsIndicator.displayName = "TabsIndicator";

// ── TabsPanels ─────────────────────────────────────────────────────────────

/**
 * Wrap all `TabsPanel` siblings so the content area keeps a **stable height**
 * equal to the tallest panel (no layout jump when switching tabs).
 * Requires each `TabsPanel` to stay mounted (`keepMounted`, default `true`).
 */
export function TabsPanels({ children, className }: TabsPanelsProps) {
  const { orientation } = useTabsChromeContext();
  return (
    <div
      className={[
        "w-full min-h-0 min-w-0",
        // Stack every panel in the same grid cell; row height = max(child heights)
        "grid grid-cols-1 grid-rows-1 justify-items-stretch",
        "[&>*]:col-start-1 [&>*]:row-start-1 [&>*]:self-start",
        // Vertical root is flex row — let the panel region use remaining width
        orientation === "vertical" ? "min-w-0 flex-1" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-tabs-panels=""
    >
      {children}
    </div>
  );
}

TabsPanels.displayName = "TabsPanels";

// ── TabsPanel ──────────────────────────────────────────────────────────────

export function TabsPanel({
  value,
  keepMounted = true,
  children,
  className,
}: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      value={value}
      keepMounted={keepMounted}
      className={[
        "pt-3 text-sm text-content-primary",
        "focus-visible:outline-none",
        "min-w-0",
        // With keepMounted, Base sets `hidden` on inactive panels (display:none → height collapse).
        // Override so inactive panels still occupy layout; visibility hides them for users.
        "[&[hidden]]:!block [&[hidden]]:invisible [&[hidden]]:pointer-events-none [&[hidden]]:select-none",
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
