import * as React from 'react';
import { Field } from '@base-ui-components/react/field';

// ── Types ──────────────────────────────────────────────────────────────────

export type FormSize = 'sm' | 'md' | 'lg';
export type FormLayout = 'vertical' | 'horizontal';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Layout direction for form fields */
  layout?: FormLayout;
  children?: React.ReactNode;
  className?: string;
}

export interface FormSectionProps {
  /** Optional section heading */
  title?: string;
  /** Optional section subtitle */
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface FormFieldProps {
  /** Field name — passed to Field.Root for native form integration */
  name?: string;
  /** Mark the field as invalid (shows FormMessage, styles label/control) */
  invalid?: boolean;
  /** Disable the entire field */
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface FormLabelProps {
  /** Show a required asterisk */
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface FormDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export interface FormMessageProps {
  /** Explicit error text — rendered as children of Field.Error */
  children?: React.ReactNode;
  className?: string;
}

export interface FormActionsProps {
  children?: React.ReactNode;
  className?: string;
}

// ── Form ───────────────────────────────────────────────────────────────────

export function Form({ layout = 'vertical', children, className, ...props }: FormProps) {
  return (
    <form
      className={[
        'flex w-full',
        layout === 'vertical' ? 'flex-col gap-6' : 'flex-row flex-wrap items-start gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </form>
  );
}

Form.displayName = 'Form';

// ── FormSection ────────────────────────────────────────────────────────────

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={['flex flex-col gap-4', className].filter(Boolean).join(' ')}>
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && (
            <h3 className="text-sm font-semibold text-content-primary">{title}</h3>
          )}
          {description && (
            <p className="text-xs text-content-tertiary">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

FormSection.displayName = 'FormSection';

// ── FormField ──────────────────────────────────────────────────────────────

export function FormField({ name, invalid, disabled, children, className }: FormFieldProps) {
  return (
    <Field.Root
      name={name}
      invalid={invalid}
      disabled={disabled}
      className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}
    >
      {children}
    </Field.Root>
  );
}

FormField.displayName = 'FormField';

// ── FormLabel ──────────────────────────────────────────────────────────────

export function FormLabel({ required, children, className }: FormLabelProps) {
  return (
    <Field.Label
      className={[
        'text-sm font-medium text-content-primary',
        'data-disabled:opacity-50 data-disabled:cursor-not-allowed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-feedback-negative" aria-hidden="true">
          *
        </span>
      )}
    </Field.Label>
  );
}

FormLabel.displayName = 'FormLabel';

// ── FormDescription ────────────────────────────────────────────────────────

export function FormDescription({ children, className }: FormDescriptionProps) {
  return (
    <Field.Description
      className={['text-xs text-content-tertiary', className].filter(Boolean).join(' ')}
    >
      {children}
    </Field.Description>
  );
}

FormDescription.displayName = 'FormDescription';

// ── FormMessage ────────────────────────────────────────────────────────────

export function FormMessage({ children, className }: FormMessageProps) {
  return (
    <Field.Error
      className={['text-xs text-feedback-negative', className].filter(Boolean).join(' ')}
    >
      {children}
    </Field.Error>
  );
}

FormMessage.displayName = 'FormMessage';

// ── FormActions ────────────────────────────────────────────────────────────

export function FormActions({ children, className }: FormActionsProps) {
  return (
    <div
      className={['flex items-center gap-3 pt-2', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}

FormActions.displayName = 'FormActions';
