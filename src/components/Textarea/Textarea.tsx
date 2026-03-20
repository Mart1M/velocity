import * as React from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Visual size of the textarea */
  size?: TextareaSize;
  /** Shows a red error border and styles the helper text as error */
  error?: boolean;
  /** Helper text shown below the textarea (neutral or error) */
  helperText?: string;
  /** Accessible label rendered above the textarea when provided */
  label?: string;
  /** Number of visible text rows */
  rows?: number;
  /** Controls the resize behaviour of the textarea */
  resize?: TextareaResize;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<
  TextareaSize,
  { textSize: string; padding: string; label: string }
> = {
  sm: {
    textSize: 'text-sm',
    padding: 'px-2.5 py-1.5',
    label: 'text-xs',
  },
  md: {
    textSize: 'text-sm',
    padding: 'px-3 py-2',
    label: 'text-sm',
  },
  lg: {
    textSize: 'text-base',
    padding: 'px-4 py-3',
    label: 'text-sm',
  },
};

const resizeClasses: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

// ── Component ──────────────────────────────────────────────────────────────

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      size = 'md',
      error = false,
      helperText,
      label,
      rows = 4,
      resize = 'vertical',
      disabled,
      id,
      className,
      ...props
    },
    ref,
  ) {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const sc = sizeClasses[size];

    const textareaClasses = [
      'w-full bg-surface-primary',
      'border',
      error ? 'border-state-error' : 'border-border-default',
      'rounded-xl',
      'transition-[border-color,box-shadow] duration-[200ms]',
      error
        ? 'focus:ring-2 focus:ring-state-error/40 focus:border-state-error'
        : 'focus:ring-2 focus:ring-border-focus focus:border-border-brand',
      'outline-none',
      'text-content-primary placeholder:text-content-tertiary',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      sc.textSize,
      sc.padding,
      resizeClasses[resize],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className={['font-medium text-content-primary', sc.label].join(' ')}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          rows={rows}
          className={textareaClasses}
          {...props}
        />
        {helperText && (
          <p
            className={[
              'text-xs',
              error ? 'text-feedback-negative' : 'text-content-tertiary',
            ].join(' ')}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
