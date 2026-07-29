import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";

export type TabsVariant = "line" | "pill";

const TabsChromeContext = React.createContext<{
  orientation: "horizontal" | "vertical";
  variant: TabsVariant;
}>({
  orientation: "horizontal",
  variant: "line",
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
  /** Visual style for the tab list */
  variant?: TabsVariant;
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
  const chrome = React.useMemo(
    () => ({ orientation, variant: "line" as const }),
    [orientation],
  );
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
      <TabsChromeContext.Provider value={chrome}>
        {children}
      </TabsChromeContext.Provider>
    </BaseTabs.Root>
  );
}

Tabs.displayName = "Tabs";

// ── TabsList ───────────────────────────────────────────────────────────────

export function TabsList({
  variant = "line",
  activateOnFocus = true,
  loopFocus = true,
  children,
  className,
}: TabsListProps) {
  const { orientation } = useTabsChromeContext();
  const chrome = React.useMemo(
    () => ({ orientation, variant }),
    [orientation, variant],
  );

  return (
    <BaseTabs.List
      activateOnFocus={activateOnFocus}
      loopFocus={loopFocus}
      className={[
        "relative isolate flex items-stretch",
        variant === "line"
          ? "border-b border-border-default data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r"
          : "gap-1 rounded-full bg-surface-secondary p-1 data-[orientation=vertical]:rounded-2xl",
        "data-[orientation=vertical]:flex-col",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <TabsChromeContext.Provider value={chrome}>
        {children}
        <TabsIndicator />
      </TabsChromeContext.Provider>
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
  const { variant } = useTabsChromeContext();

  return (
    <BaseTabs.Tab
      value={value}
      disabled={disabled}
      className={[
        "relative z-10 cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium",
        variant === "line"
          ? "mb-2 data-[orientation=vertical]:mb-0 data-[orientation=vertical]:mr-2"
          : "",
        "cursor-pointer select-none",
        "text-content-secondary",
        "transition-all duration-[200ms]",
        // hover
        "hover:text-content-primary",
        // selected
        variant === "line"
          ? "data-active:bg-surface-secondary data-active:text-content-primary"
          : "data-active:text-content-primary",
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
  const { variant, orientation } = useTabsChromeContext();

  const transition =
    "[transition:left_250ms_cubic-bezier(0.4,0,0.2,1),width_250ms_cubic-bezier(0.4,0,0.2,1),top_250ms_cubic-bezier(0.4,0,0.2,1),height_250ms_cubic-bezier(0.4,0,0.2,1)]";

  if (variant === "line") {
    return (
      <BaseTabs.Indicator
        className={[
          "absolute pointer-events-none",
          transition,
          orientation === "vertical"
            ? "top-[var(--active-tab-top)] right-0 left-auto h-[var(--active-tab-height)] w-[3px] rounded-tl-sm rounded-bl-sm bg-accent-primary"
            : "bottom-0 left-[var(--active-tab-left)] w-[var(--active-tab-width)] h-[3px] rounded-t-sm bg-accent-primary",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  return (
    <BaseTabs.Indicator
      className={[
        "absolute pointer-events-none z-0",
        "left-[var(--active-tab-left)] top-[var(--active-tab-top)]",
        "h-[var(--active-tab-height)] w-[var(--active-tab-width)]",
        transition,
        "rounded-full bg-surface-primary shadow-sm",
        orientation === "vertical" ? "rounded-xl" : "",
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
