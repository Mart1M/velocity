"use client";

import * as React from "react";
import { RiSideBarLine } from "react-icons/ri";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
import { Separator } from "../Separator";
import { Skeleton } from "../Skeleton";
import {
  Drawer,
  DrawerBackdrop,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
} from "../Drawer";
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "../Tooltip";
import { useIsMobile } from "./use-is-mobile";

// ── Constants ──────────────────────────────────────────────────────────────

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// ── Context ─────────────────────────────────────────────────────────────────

export type SidebarState = "expanded" | "collapsed";

export type SidebarContextValue = {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean | ((open: boolean) => boolean)) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

function useCollapsedIconMode(): boolean {
  const { state, isMobile } = useSidebar();
  return state === "collapsed" && !isMobile;
}

// ── Types ───────────────────────────────────────────────────────────────────

export type SidebarSide = "left" | "right";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";
export type SidebarMenuButtonVariant = "default" | "outline";
export type SidebarMenuButtonSize = "default" | "sm" | "lg";
export type SidebarMenuSubButtonSize = "sm" | "md";

export interface SidebarProviderProps extends React.ComponentPropsWithoutRef<"div"> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface SidebarProps extends React.ComponentPropsWithoutRef<"div"> {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  dir?: React.HTMLAttributes<HTMLElement>["dir"];
}

export interface SidebarTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof IconButton>,
  "label" | "children"
> {
  children?: React.ReactNode;
  /** Accessible name — defaults to French copy for the toggle control. */
  label?: string;
}

export interface SidebarMenuButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isActive?: boolean;
  variant?: SidebarMenuButtonVariant;
  size?: SidebarMenuButtonSize;
  tooltip?: string | { children?: React.ReactNode };
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
}

export interface SidebarMenuActionProps extends React.ComponentPropsWithoutRef<"button"> {
  showOnHover?: boolean;
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
}

export interface SidebarMenuSubButtonProps extends React.ComponentPropsWithoutRef<"a"> {
  size?: SidebarMenuSubButtonSize;
  isActive?: boolean;
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"a">) => React.ReactElement);
}

export interface SidebarGroupLabelProps extends React.ComponentPropsWithoutRef<"div"> {
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"div">) => React.ReactElement);
}

export interface SidebarGroupActionProps extends React.ComponentPropsWithoutRef<"button"> {
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
}

export interface SidebarMenuSkeletonProps extends React.ComponentPropsWithoutRef<"div"> {
  showIcon?: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

type MergeRenderOptions = {
  className?: string;
  children?: React.ReactNode;
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: Record<string, unknown>) => React.ReactElement);
} & Record<string, unknown>;

function mergeRenderProps(
  defaultTag: keyof React.JSX.IntrinsicElements,
  { className, render, ...props }: MergeRenderOptions,
): React.ReactElement {
  const mergedClassName = className;

  if (typeof render === "function") {
    return render({ ...props, className: mergedClassName });
  }

  if (render) {
    return React.cloneElement(render, {
      ...props,
      className: cx(
        mergedClassName,
        (render.props as { className?: string }).className,
      ),
    });
  }

  return React.createElement(defaultTag, {
    ...props,
    className: mergedClassName,
  });
}

const menuButtonVariantClasses: Record<SidebarMenuButtonVariant, string> = {
  default: "hover:bg-surface-hover hover:text-content-primary",
  outline:
    "bg-surface-primary shadow-sm border border-border-default hover:bg-surface-hover hover:text-content-primary",
};

const menuButtonSizeClasses: Record<SidebarMenuButtonSize, string> = {
  default: "h-8 text-sm",
  sm: "h-7 text-xs",
  lg: "h-12 text-sm",
};

const menuButtonIconModeClasses =
  "!h-8 !w-8 !min-w-8 !max-w-8 shrink-0 !p-0 justify-center gap-0 [&>span]:hidden [&_svg]:mx-auto";

const menuSubButtonSizeClasses: Record<SidebarMenuSubButtonSize, string> = {
  sm: "h-7 text-xs",
  md: "h-8 text-sm",
};

// ── SidebarProvider ───────────────────────────────────────────────────────────

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      if (typeof document !== "undefined") {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      }
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((current) => !current)
      : setOpen((current) => !current);
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state: SidebarState = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cx(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-surface-secondary",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

SidebarProvider.displayName = "SidebarProvider";

// ── Sidebar ───────────────────────────────────────────────────────────────────

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cx(
          "flex h-full w-(--sidebar-width) flex-col bg-surface-secondary text-content-primary",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile}>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerPopup
            side={side}
            className={cx(
              "w-[min(18rem,80vw)] border-border-default bg-surface-secondary p-0 text-content-primary",
            )}
            contentClassName="p-0"
          >
            <div
              dir={dir}
              data-sidebar="sidebar"
              data-slot="sidebar"
              data-mobile="true"
              className="flex h-full w-full flex-col"
            >
              <div className="sr-only">
                <DrawerTitle>Sidebar</DrawerTitle>
                <DrawerDescription>
                  Displays the mobile sidebar.
                </DrawerDescription>
              </div>
              {children}
            </div>
          </DrawerPopup>
        </DrawerPortal>
      </Drawer>
    );
  }

  return (
    <div
      className="group peer hidden text-content-primary md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cx(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cx(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          "data-[side=left]:left-0 data-[side=right]:right-0",
          "data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
          "data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l group-data-[side=left]:border-border-default group-data-[side=right]:border-border-default",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cx(
            "flex size-full flex-col bg-surface-secondary text-content-primary",
            variant === "floating" &&
              "rounded-lg border border-border-default shadow-sm",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

Sidebar.displayName = "Sidebar";

// ── SidebarTrigger ────────────────────────────────────────────────────────────

export function SidebarTrigger({
  className,
  onClick,
  children,
  label = "Afficher ou masquer la barre latérale",
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <IconButton
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="sm"
      colorScheme="neutral"
      label={label}
      className={cx("shrink-0 !gap-0", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {children ?? (
        <RiSideBarLine className="size-4 rtl:rotate-180" aria-hidden />
      )}
    </IconButton>
  );
}

SidebarTrigger.displayName = "SidebarTrigger";

// ── SidebarRail ───────────────────────────────────────────────────────────────

export function SidebarRail({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cx(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear sm:flex",
        "ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
        "after:absolute after:inset-y-0 after:inset-s-1/2 after:w-0.5 after:bg-border-default",
        "hover:after:bg-border-strong",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:hover:bg-surface-secondary",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

SidebarRail.displayName = "SidebarRail";

// ── Layout parts ──────────────────────────────────────────────────────────────

export function SidebarInset({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cx(
        "relative flex w-full flex-1 flex-col bg-surface-primary",
        className,
      )}
      {...props}
    />
  );
}

SidebarInset.displayName = "SidebarInset";

export function SidebarInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      size="sm"
      className={cx("bg-surface-primary", className)}
      {...props}
    />
  );
}

SidebarInput.displayName = "SidebarInput";

export function SidebarHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cx(
        "flex flex-col gap-2 p-2",
        collapsedIconMode && "items-center px-1",
        className,
      )}
      {...props}
    />
  );
}

SidebarHeader.displayName = "SidebarHeader";

export function SidebarFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cx(
        "flex flex-col gap-2 p-2",
        collapsedIconMode && "items-center px-1",
        className,
      )}
      {...props}
    />
  );
}

SidebarFooter.displayName = "SidebarFooter";

export function SidebarSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cx("mx-2 w-auto", className)}
      {...props}
    />
  );
}

SidebarSeparator.displayName = "SidebarSeparator";

export function SidebarContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cx(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

SidebarContent.displayName = "SidebarContent";

// ── Groups & menu ─────────────────────────────────────────────────────────────

export function SidebarGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cx(
        "relative flex w-full min-w-0 flex-col p-2",
        collapsedIconMode && "items-center px-1",
        className,
      )}
      {...props}
    />
  );
}

SidebarGroup.displayName = "SidebarGroup";

export function SidebarGroupLabel({
  className,
  render,
  ...props
}: SidebarGroupLabelProps) {
  const collapsedIconMode = useCollapsedIconMode();

  return mergeRenderProps("div", {
    ...props,
    render,
    className: cx(
      "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-content-secondary outline-none [&>svg]:size-4 [&>svg]:shrink-0",
      collapsedIconMode && "hidden",
      className,
    ),
    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
  });
}

SidebarGroupLabel.displayName = "SidebarGroupLabel";

export function SidebarGroupAction({
  className,
  render,
  ...props
}: SidebarGroupActionProps) {
  return mergeRenderProps("button", {
    ...props,
    render,
    type: "button",
    className: cx(
      "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-content-secondary outline-none transition-transform hover:bg-surface-hover hover:text-content-primary group-data-[collapsible=icon]:hidden [&>svg]:size-4 [&>svg]:shrink-0",
      className,
    ),
    "data-slot": "sidebar-group-action",
    "data-sidebar": "group-action",
  });
}

SidebarGroupAction.displayName = "SidebarGroupAction";

export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cx(
        "w-full text-sm",
        collapsedIconMode && "flex flex-col items-center",
        className,
      )}
      {...props}
    />
  );
}

SidebarGroupContent.displayName = "SidebarGroupContent";

export function SidebarMenu({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cx(
        "flex w-full min-w-0 flex-col gap-1",
        collapsedIconMode && "items-center",
        className,
      )}
      {...props}
    />
  );
}

SidebarMenu.displayName = "SidebarMenu";

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cx(
        "group/menu-item relative w-full",
        collapsedIconMode && "flex justify-center",
        className,
      )}
      {...props}
    />
  );
}

SidebarMenuItem.displayName = "SidebarMenuItem";

export function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const collapsedIconMode = useCollapsedIconMode();

  const buttonClasses = cx(
    "peer/menu-button group/menu-button flex items-center overflow-hidden rounded-lg font-medium outline-none transition-[width,height,padding,colors]",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    collapsedIconMode
      ? menuButtonIconModeClasses
      : "w-full min-w-0 max-w-full gap-2 p-2 text-left [&>span:last-child]:truncate",
    !collapsedIconMode && menuButtonSizeClasses[size],
    menuButtonVariantClasses[variant],
    isActive && "bg-surface-hover text-content-brand",
    className,
  );

  const comp = mergeRenderProps("button", {
    ...props,
    render,
    type: props.type ?? "button",
    className: buttonClasses,
    "data-slot": "sidebar-menu-button",
    "data-sidebar": "menu-button",
    "data-active": isActive ? true : undefined,
    "data-size": size,
    children,
  });

  if (!tooltip) {
    return comp;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  const showTooltip = state === "collapsed" && !isMobile;

  return (
    <div className={cx("w-full", collapsedIconMode && "flex justify-center")}>
      <Tooltip>
        <TooltipTrigger
          className={cx(
            "flex min-w-0",
            collapsedIconMode ? "w-8 justify-center" : "w-full",
          )}
          render={comp as React.ReactElement<Record<string, unknown>>}
        />
        {showTooltip ? (
          <TooltipPortal>
            <TooltipPositioner side="right" align="center">
              <TooltipPopup {...tooltipProps} />
            </TooltipPositioner>
          </TooltipPortal>
        ) : null}
      </Tooltip>
    </div>
  );
}

SidebarMenuButton.displayName = "SidebarMenuButton";

export function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: SidebarMenuActionProps) {
  return mergeRenderProps("button", {
    ...props,
    render,
    type: "button",
    className: cx(
      "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-content-secondary outline-none transition-transform hover:bg-surface-hover hover:text-content-primary group-data-[collapsible=icon]:hidden [&>svg]:size-4 [&>svg]:shrink-0",
      showOnHover &&
        "md:opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:opacity-100",
      className,
    ),
    "data-slot": "sidebar-menu-action",
    "data-sidebar": "menu-action",
  });
}

SidebarMenuAction.displayName = "SidebarMenuAction";

export function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cx(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-content-secondary tabular-nums select-none group-data-[collapsible=icon]:hidden",
        "peer-hover/menu-button:text-content-primary peer-data-[active=true]/menu-button:text-content-brand",
        className,
      )}
      {...props}
    />
  );
}

SidebarMenuBadge.displayName = "SidebarMenuBadge";

export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: SidebarMenuSkeletonProps) {
  const [width] = React.useState(
    () => `${Math.floor(Math.random() * 40) + 50}%`,
  );

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cx("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton variant="circular" className="size-4 rounded-md" />
      )}
      <Skeleton
        variant="text"
        className="h-4 max-w-(--skeleton-width) flex-1"
        style={{ "--skeleton-width": width } as React.CSSProperties}
      />
    </div>
  );
}

SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

export function SidebarMenuSub({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cx(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-border-default px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

SidebarMenuSub.displayName = "SidebarMenuSub";

export function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cx("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  children,
  ...props
}: SidebarMenuSubButtonProps) {
  return mergeRenderProps("a", {
    ...props,
    render,
    className: cx(
      "flex min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none transition-colors hover:bg-surface-hover hover:text-content-primary",
      "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
      "[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
      menuSubButtonSizeClasses[size],
      isActive && "bg-surface-hover text-content-brand font-medium",
      "group-data-[collapsible=icon]:hidden",
      className,
    ),
    "data-slot": "sidebar-menu-sub-button",
    "data-sidebar": "menu-sub-button",
    "data-active": isActive ? true : undefined,
    "data-size": size,
    children,
  });
}

SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
