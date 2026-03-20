import * as React from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual size of the input */
  size?: InputSize;
  /** Shows a red error border and styles the helper text as error */
  error?: boolean;
  /** Helper text shown below the input (neutral or error) */
  helperText?: string;
  /** Icon/element rendered inside the input on the left */
  leadingIcon?: React.ReactNode;
  /** Icon/element rendered inside the input on the right */
  trailingIcon?: React.ReactNode;
  /** Text/element rendered outside the input text area on the left, inside the border (e.g. "https://") */
  leadingAddon?: React.ReactNode;
  /** Text/element rendered outside the input text area on the right, inside the border (e.g. ".com") */
  trailingAddon?: React.ReactNode;
  /** Accessible label rendered above the input when provided */
  label?: string;
}

const sizeClasses: Record<
  InputSize,
  {
    wrapper: string;
    textSize: string;
    paddingLeft: string;
    paddingRight: string;
    iconWrapper: string;
    iconSize: string;
    addon: string;
    label: string;
  }
> = {
  sm: {
    wrapper: 'h-8',
    textSize: 'text-sm',
    paddingLeft: 'pl-2.5',
    paddingRight: 'pr-2.5',
    iconWrapper: 'flex items-center justify-center w-8 h-full shrink-0',
    iconSize: 'h-4 w-4',
    addon: 'px-2.5 text-sm',
    label: 'text-xs',
  },
  md: {
    wrapper: 'h-10',
    textSize: 'text-sm',
    paddingLeft: 'pl-3',
    paddingRight: 'pr-3',
    iconWrapper: 'flex items-center justify-center w-10 h-full shrink-0',
    iconSize: 'h-4 w-4',
    addon: 'px-3 text-sm',
    label: 'text-sm',
  },
  lg: {
    wrapper: 'h-12',
    textSize: 'text-base',
    paddingLeft: 'pl-4',
    paddingRight: 'pr-4',
    iconWrapper: 'flex items-center justify-center w-12 h-full shrink-0',
    iconSize: 'h-5 w-5',
    addon: 'px-3.5 text-base',
    label: 'text-sm',
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    error = false,
    helperText,
    leadingIcon,
    trailingIcon,
    leadingAddon,
    trailingAddon,
    label,
    disabled,
    id,
    className,
    ...props
  },
  ref,
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const sc = sizeClasses[size];

  const wrapperClasses = [
    'flex items-center overflow-hidden',
    'bg-surface-primary',
    'border',
    error ? 'border-state-error' : 'border-border-default',
    'rounded-xl',
    'transition-[border-color,box-shadow] duration-[200ms]',
    error
      ? 'focus-within:ring-2 focus-within:ring-state-error/40 focus-within:border-state-error'
      : 'focus-within:ring-2 focus-within:ring-border-focus focus-within:border-border-brand',
    sc.wrapper,
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'flex-1 h-full bg-transparent outline-none',
    'text-content-primary placeholder:text-content-tertiary',
    'disabled:cursor-not-allowed',
    sc.textSize,
    leadingIcon ? '' : sc.paddingLeft,
    trailingIcon ? '' : sc.paddingRight,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const addonClasses = [
    'flex items-center self-stretch',
    'bg-surface-secondary text-content-secondary font-medium',
    sc.addon,
  ].join(' ');

  const iconWrapperClasses = [
    'text-content-tertiary',
    sc.iconWrapper,
  ].join(' ');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className={['font-medium text-content-primary', sc.label].join(' ')}
        >
          {label}
        </label>
      )}
      <div className={wrapperClasses}>
        {leadingAddon && (
          <div className={[addonClasses, 'border-r border-border-default'].join(' ')}>
            {leadingAddon}
          </div>
        )}
        {leadingIcon && (
          <span className={iconWrapperClasses} aria-hidden="true">
            <span className={sc.iconSize}>{leadingIcon}</span>
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        {trailingIcon && (
          <span className={iconWrapperClasses} aria-hidden="true">
            <span className={sc.iconSize}>{trailingIcon}</span>
          </span>
        )}
        {trailingAddon && (
          <div className={[addonClasses, 'border-l border-border-default'].join(' ')}>
            {trailingAddon}
          </div>
        )}
      </div>
      {helperText && (
        <p className={['text-xs', error ? 'text-feedback-negative' : 'text-content-tertiary'].join(' ')}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
