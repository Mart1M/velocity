import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type AlertBannerVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "brand";

export interface AlertBannerAction {
  /** Label text for the action button */
  label: string;
  /** Click handler */
  onClick: () => void;
}

export interface AlertBannerProps {
  /** Color variant controlling accent border, icon, and background tint */
  variant?: AlertBannerVariant;
  /** Bold heading text */
  title?: string;
  /** Supporting body text */
  description?: string;
  /** Whether the banner can be dismissed via close button */
  dismissible?: boolean;
  /** Callback fired when the close button is clicked */
  onDismiss?: () => void;
  /** Custom icon override; replaces the default variant icon */
  icon?: React.ReactNode;
  /** Optional action rendered as a button inside the banner */
  action?: AlertBannerAction;
  /** Additional CSS classes */
  className?: string;
  /** Banner content (used instead of title/description when more control is needed) */
  children?: React.ReactNode;
}

// ── Default icons (inline SVGs) ────────────────────────────────────────────

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BrandIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}

// ── Style maps ─────────────────────────────────────────────────────────────

const variantBgClasses: Record<AlertBannerVariant, string> = {
  info: "bg-blue-500/10",
  success: "bg-green-500/10",
  warning: "bg-orange-500/10",
  error: "bg-red-500/10",
  brand: "bg-primary-500/10",
};

const variantIconClasses: Record<AlertBannerVariant, string> = {
  info: "text-feedback-neutral",
  success: "text-feedback-positive",
  warning: "text-feedback-caution",
  error: "text-feedback-negative",
  brand: "text-content-brand",
};

const variantActionClasses: Record<AlertBannerVariant, string> = {
  info: "bg-state-info/15 text-content-primary hover:bg-state-info/25 active:bg-state-info/30",
  success:
    "bg-state-success/15 text-content-primary hover:bg-state-success/25 active:bg-state-success/30",
  warning:
    "bg-state-warning/15 text-content-primary hover:bg-state-warning/25 active:bg-state-warning/30",
  error:
    "bg-state-error/15 text-content-primary hover:bg-state-error/25 active:bg-state-error/30",
  brand:
    "bg-accent-primary/20 text-content-primary hover:bg-accent-primary/30 active:bg-accent-primary/35",
};

const defaultIcons: Record<
  AlertBannerVariant,
  React.FC<{ className?: string }>
> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  brand: BrandIcon,
};

// ── Component ──────────────────────────────────────────────────────────────

export function AlertBanner({
  variant = "info",
  title,
  description,
  dismissible = false,
  onDismiss,
  icon,
  action,
  className,
  children,
}: AlertBannerProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const DefaultIcon = defaultIcons[variant];
  const iconElement =
    icon !== undefined ? (
      <span
        className={["h-5 w-5 shrink-0", variantIconClasses[variant]].join(" ")}
      >
        {icon}
      </span>
    ) : (
      <DefaultIcon
        className={["h-5 w-5 shrink-0", variantIconClasses[variant]].join(" ")}
      />
    );

  return (
    <div
      role="alert"
      className={[
        "w-full px-4 py-3 rounded-xl",
        "flex items-start gap-3",
        "transition-colors duration-[200ms]",
        variantBgClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {iconElement}

      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-content-primary">{title}</p>
        )}
        {description && (
          <p
            className={["text-sm text-content-secondary", title ? "mt-1" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {description}
          </p>
        )}
        {children}
      </div>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={[
            "shrink-0 text-sm font-medium px-3 py-1 rounded-lg",
            "cursor-pointer transition-colors duration-[200ms]",
            variantActionClasses[variant],
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-border-focus focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background-primary",
          ].join(" ")}
        >
          {action.label}
        </button>
      )}

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className={[
            "shrink-0 p-1 rounded-lg",
            "cursor-pointer transition-colors duration-[200ms]",
            "text-content-secondary hover:text-content-primary",
            "hover:bg-black/5 active:bg-black/10",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-border-focus focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background-primary",
          ].join(" ")}
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

AlertBanner.displayName = "AlertBanner";
