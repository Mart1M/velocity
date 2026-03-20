import * as React from 'react';
import { Popover as BasePopover } from '@base-ui-components/react/popover';

// ── Types ──────────────────────────────────────────────────────────────────

export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** Whether the popover is currently open (controlled). */
  open?: boolean;
  /** Whether the popover is initially open (uncontrolled). */
  defaultOpen?: boolean;
  /** Callback fired when the popover opens or closes. */
  onOpenChange?: (
    open: boolean,
    eventDetails: BasePopover.Root.ChangeEventDetails,
  ) => void;
  /** Callback fired after open/close animations complete. */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * Modal behaviour.
   * - `true`: focus-trapped, scroll-locked, outside interactions disabled
   * - `false`: non-modal
   * - `'trap-focus'`: focus-trapped only
   * @default false
   */
  modal?: boolean | 'trap-focus';
  /** Popover content — typically `PopoverTrigger` + `PopoverPortal`. */
  children?: React.ReactNode;
}

export interface PopoverTriggerProps {
  /** Trigger content — usually a `Button`. */
  children?: React.ReactNode;
  /** Additional CSS classes. */
  className?: string;
  /**
   * Render as a custom element (e.g. `<Button />`).
   * Avoids nested `<button>` elements when composing with other button components.
   */
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<'button'>) => React.ReactElement);
  /** Whether the popover should also open when the trigger is hovered. */
  openOnHover?: boolean;
  /** How long to wait before opening on hover (ms). Requires `openOnHover`. */
  delay?: number;
  /** How long to wait before closing after hover ends (ms). Requires `openOnHover`. */
  closeDelay?: number;
}

export interface PopoverPortalProps {
  /** Keep portal mounted while hidden. */
  keepMounted?: boolean;
  /** Content rendered inside the portal. */
  children?: React.ReactNode;
}

export interface PopoverPositionerProps {
  /** Which side of the anchor to position the popover against. */
  side?: PopoverSide;
  /** Distance between the anchor and the popup in pixels. */
  sideOffset?: number;
  /** How to align the popup relative to the specified side. */
  align?: 'start' | 'center' | 'end';
  /** Additional offset along the alignment axis in pixels. */
  alignOffset?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Positioner content — typically `PopoverPopup`. */
  children?: React.ReactNode;
}

export interface PopoverPopupProps {
  /** Additional CSS classes. */
  className?: string;
  /** Popup content. */
  children?: React.ReactNode;
}

export interface PopoverArrowProps {
  /** Additional CSS classes. */
  className?: string;
}

export interface PopoverTitleProps {
  /** Additional CSS classes. */
  className?: string;
  /** Title content. */
  children?: React.ReactNode;
}

export interface PopoverDescriptionProps {
  /** Additional CSS classes. */
  className?: string;
  /** Description content. */
  children?: React.ReactNode;
}

export interface PopoverCloseProps {
  /** Additional CSS classes. */
  className?: string;
  /** Close button content (defaults to an X icon). */
  children?: React.ReactNode;
}

// ── Icons ──────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="size-4"
      aria-hidden="true"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Popover (Root) ─────────────────────────────────────────────────────────

export function Popover({
  open,
  defaultOpen,
  onOpenChange,
  onOpenChangeComplete,
  modal = false,
  children,
}: PopoverProps) {
  return (
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      modal={modal}
    >
      {children}
    </BasePopover.Root>
  );
}

Popover.displayName = 'Popover';

// ── PopoverTrigger ─────────────────────────────────────────────────────────

export function PopoverTrigger({
  children,
  className,
  render,
  openOnHover,
  delay,
  closeDelay,
}: PopoverTriggerProps) {
  return (
    <BasePopover.Trigger
      className={['cursor-pointer', className].filter(Boolean).join(' ')}
      render={render}
      openOnHover={openOnHover}
      delay={delay}
      closeDelay={closeDelay}
    >
      {children}
    </BasePopover.Trigger>
  );
}

PopoverTrigger.displayName = 'PopoverTrigger';

// ── PopoverPortal ──────────────────────────────────────────────────────────

export function PopoverPortal({ keepMounted, children }: PopoverPortalProps) {
  return (
    <BasePopover.Portal keepMounted={keepMounted}>
      {children}
    </BasePopover.Portal>
  );
}

PopoverPortal.displayName = 'PopoverPortal';

// ── PopoverPositioner ──────────────────────────────────────────────────────

export function PopoverPositioner({
  side = 'bottom',
  sideOffset = 8,
  align = 'center',
  alignOffset,
  className,
  children,
}: PopoverPositionerProps) {
  return (
    <BasePopover.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      className={className}
    >
      {children}
    </BasePopover.Positioner>
  );
}

PopoverPositioner.displayName = 'PopoverPositioner';

// ── PopoverPopup ───────────────────────────────────────────────────────────

export function PopoverPopup({ className, children }: PopoverPopupProps) {
  return (
    <BasePopover.Popup
      className={[
        'bg-surface-primary border border-border-default rounded-xl shadow-lg',
        'p-4 outline-none',
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
    </BasePopover.Popup>
  );
}

PopoverPopup.displayName = 'PopoverPopup';

// ── PopoverArrow ───────────────────────────────────────────────────────────

export function PopoverArrow({ className }: PopoverArrowProps) {
  return (
    <BasePopover.Arrow
      className={[
        'data-[side=top]:bottom-[-6px]',
        'data-[side=bottom]:top-[-6px]',
        'data-[side=left]:right-[-6px]',
        'data-[side=right]:left-[-6px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ArrowSvg />
    </BasePopover.Arrow>
  );
}

PopoverArrow.displayName = 'PopoverArrow';

function ArrowSvg() {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-surface-primary"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-border-default"
      />
    </svg>
  );
}

// ── PopoverTitle ───────────────────────────────────────────────────────────

export function PopoverTitle({ className, children }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      className={['text-base font-semibold text-content-primary', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BasePopover.Title>
  );
}

PopoverTitle.displayName = 'PopoverTitle';

// ── PopoverDescription ─────────────────────────────────────────────────────

export function PopoverDescription({
  className,
  children,
}: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      className={['mt-1 text-sm text-content-secondary', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BasePopover.Description>
  );
}

PopoverDescription.displayName = 'PopoverDescription';

// ── PopoverClose ───────────────────────────────────────────────────────────

export function PopoverClose({ className, children }: PopoverCloseProps) {
  return (
    <BasePopover.Close
      className={[
        'absolute top-3 right-3',
        'inline-flex items-center justify-center',
        'size-7 rounded-lg',
        'text-content-secondary',
        'cursor-pointer',
        'transition-colors duration-[200ms]',
        'hover:bg-surface-hover hover:text-content-primary',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-border-focus focus-visible:ring-offset-2',
        'focus-visible:ring-offset-surface-primary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children ?? <CloseIcon />}
    </BasePopover.Close>
  );
}

PopoverClose.displayName = 'PopoverClose';
