import * as React from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type LabelSize = 'sm' | 'md' | 'lg';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Visual size of the label (affects font size) */
  size?: LabelSize;
  /** Whether the associated field is disabled (dims the label) */
  disabled?: boolean;
  /** Whether the associated field is required (shows an asterisk) */
  required?: boolean;
  /** Label content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<LabelSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

// ── Component ──────────────────────────────────────────────────────────────

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  {
    size = 'md',
    disabled = false,
    required = false,
    children,
    className,
    ...props
  },
  ref,
) {
  return (
    <label
      ref={ref}
      className={[
        'font-medium',
        disabled ? 'text-content-disabled opacity-50 cursor-not-allowed' : 'text-content-primary',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
      {required && (
        <span className="text-feedback-negative ml-0.5" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
});

Label.displayName = 'Label';
