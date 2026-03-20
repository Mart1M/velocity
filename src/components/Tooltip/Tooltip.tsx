import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip';

// ── Types ──────────────────────────────────────────────────────────────────

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  /** Whether the tooltip is currently open (controlled) */
  open?: boolean;
  /** Whether the tooltip is initially open (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback fired when the tooltip opens or closes */
  onOpenChange?: (
    open: boolean,
    eventDetails: BaseTooltip.Root.ChangeEventDetails,
  ) => void;
  /** Callback fired after open/close animations complete */
  onOpenChangeComplete?: (open: boolean) => void;
  /** Whether the tooltip contents can be hovered without closing */
  disableHoverablePopup?: boolean;
  /** Which axis the tooltip should track the cursor on */
  trackCursorAxis?: 'none' | 'x' | 'y' | 'both';
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Tooltip content — typically TooltipTrigger + TooltipPortal */
  children?: React.ReactNode;
}

export interface TooltipTriggerProps {
  /** Trigger content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** How long to wait before opening the tooltip (ms) */
  delay?: number;
  /** How long to wait before closing the tooltip (ms) */
  closeDelay?: number;
  /** Render as a custom element */
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<'button'>) => React.ReactElement);
}

export interface TooltipPortalProps {
  /** Keep portal mounted while hidden */
  keepMounted?: boolean;
  /** Content rendered inside the portal */
  children?: React.ReactNode;
}

export interface TooltipPositionerProps {
  /** Which side of the trigger to align the tooltip against */
  side?: TooltipSide;
  /** Offset between the tooltip and the trigger (px) */
  sideOffset?: number;
  /** Alignment along the opposite axis */
  align?: 'start' | 'center' | 'end';
  /** Offset for alignment (px) */
  alignOffset?: number;
  /** Additional CSS classes */
  className?: string;
  /** Content — typically TooltipPopup */
  children?: React.ReactNode;
}

export interface TooltipPopupProps {
  /** Additional CSS classes */
  className?: string;
  /** Popup content */
  children?: React.ReactNode;
}

export interface TooltipArrowProps {
  /** Additional CSS classes */
  className?: string;
}

export interface TooltipProviderProps {
  /** How long to wait before opening a tooltip (ms) */
  delay?: number;
  /** How long to wait before closing a tooltip (ms) */
  closeDelay?: number;
  /** Adjacent tooltip opens instantly if previous closed within this timeout (ms) */
  timeout?: number;
  children?: React.ReactNode;
}

// ── Tooltip (Root) ─────────────────────────────────────────────────────────

export function Tooltip({
  open,
  defaultOpen,
  onOpenChange,
  onOpenChangeComplete,
  disableHoverablePopup,
  trackCursorAxis,
  disabled,
  children,
}: TooltipProps) {
  return (
    <BaseTooltip.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      disableHoverablePopup={disableHoverablePopup}
      trackCursorAxis={trackCursorAxis}
      disabled={disabled}
    >
      {children}
    </BaseTooltip.Root>
  );
}

Tooltip.displayName = 'Tooltip';

// ── TooltipTrigger ─────────────────────────────────────────────────────────

export function TooltipTrigger({
  children,
  className,
  delay,
  closeDelay,
  render,
}: TooltipTriggerProps) {
  return (
    <BaseTooltip.Trigger
      className={className}
      delay={delay}
      closeDelay={closeDelay}
      render={render}
    >
      {children}
    </BaseTooltip.Trigger>
  );
}

TooltipTrigger.displayName = 'TooltipTrigger';

// ── TooltipPortal ──────────────────────────────────────────────────────────

export function TooltipPortal({ keepMounted, children }: TooltipPortalProps) {
  return (
    <BaseTooltip.Portal keepMounted={keepMounted}>
      {children}
    </BaseTooltip.Portal>
  );
}

TooltipPortal.displayName = 'TooltipPortal';

// ── TooltipPositioner ──────────────────────────────────────────────────────

export function TooltipPositioner({
  side = 'top',
  sideOffset = 8,
  align = 'center',
  alignOffset,
  className,
  children,
}: TooltipPositionerProps) {
  return (
    <BaseTooltip.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      className={className}
    >
      {children}
    </BaseTooltip.Positioner>
  );
}

TooltipPositioner.displayName = 'TooltipPositioner';

// ── TooltipPopup ───────────────────────────────────────────────────────────

export function TooltipPopup({ className, children }: TooltipPopupProps) {
  return (
    <BaseTooltip.Popup
      className={[
        'bg-surface-secondary text-content-primary text-sm',
        'px-3 py-1.5',
        'rounded-lg shadow-md',
        'origin-[var(--transform-origin)]',
        'transition-[transform,opacity] duration-[200ms]',
        'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BaseTooltip.Popup>
  );
}

TooltipPopup.displayName = 'TooltipPopup';

// ── TooltipArrow ───────────────────────────────────────────────────────────

export function TooltipArrow({ className }: TooltipArrowProps) {
  return (
    <BaseTooltip.Arrow
      className={[
        'fill-surface-secondary',
        'data-[side=top]:bottom-0 data-[side=top]:translate-y-full',
        'data-[side=bottom]:top-0 data-[side=bottom]:-translate-y-full',
        'data-[side=left]:right-0 data-[side=left]:translate-x-full',
        'data-[side=right]:left-0 data-[side=right]:-translate-x-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}

TooltipArrow.displayName = 'TooltipArrow';

// ── TooltipProvider ────────────────────────────────────────────────────────

export function TooltipProvider({
  delay,
  closeDelay,
  timeout,
  children,
}: TooltipProviderProps) {
  return (
    <BaseTooltip.Provider delay={delay} closeDelay={closeDelay} timeout={timeout}>
      {children}
    </BaseTooltip.Provider>
  );
}

TooltipProvider.displayName = 'TooltipProvider';
