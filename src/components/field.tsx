/**
 * @fhe/brand · Field + Input + Textarea + Select
 * Sourced from _bundle-source/components-core.jsx.
 *
 * Rules (DESIGN.md §5, §6):
 * - Always pair labels with inputs. No placeholder-as-label.
 * - Required field marker is a red asterisk on the label.
 * - Errors get a leading icon ("x-circle") in the helper line — never red text alone.
 * - Hit targets: 40px desktop, 48px on mobile.
 * - Focus ring uses --shadow-focus.
 */
import * as React from "react";
import { cn } from "../lib/cn";
import { Icon } from "../icons";

/* ============================================================
 * Field — label + slot + hint/error helper
 * ============================================================ */

export interface FieldProps {
  label: React.ReactNode;
  /** Helper text shown below the input when there's no error. */
  hint?: React.ReactNode;
  /** Renders a red asterisk after the label. */
  required?: boolean;
  /** When set, hides hint and shows the error message with a leading x-circle icon. */
  error?: React.ReactNode;
  /** Optional id forwarded as `htmlFor`. */
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export function Field({ label, hint, required, error, htmlFor, className, children }: FieldProps) {
  const helperId = htmlFor ? `${htmlFor}-helper` : undefined;
  return (
    <div className={cn("block", className)}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[13px] font-medium text-[var(--n-700)] font-[family-name:var(--font-body)]"
      >
        {label}
        {required && (
          <span className="text-[var(--error-500)] ml-0.5" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error ? (
        <p
          id={helperId}
          className="mt-1.5 flex items-start gap-1.5 text-xs text-[var(--error-700)]"
        >
          <Icon name="x-circle" size={14} className="mt-px shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={helperId} className="mt-1.5 text-xs text-[var(--n-500)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* ============================================================
 * Input — base styled input
 * ============================================================ */

const baseInputClass = cn(
  "w-full px-3 bg-white text-sm text-[var(--n-800)] outline-none",
  "font-[family-name:var(--font-body)]",
  "border border-[var(--n-200)] rounded-[var(--r-sm)]",
  "transition-[border-color,box-shadow] duration-150",
  "placeholder:text-[var(--n-400)]",
  "focus:border-[var(--fhe-blue)] focus:shadow-[var(--shadow-focus)]",
  "disabled:bg-[var(--n-25)] disabled:text-[var(--n-500)] disabled:cursor-not-allowed",
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error state — applies red border + focus ring tinted red. */
  error?: boolean;
  /** Optional leading icon inside the input (rendered as an absolute-positioned glyph). */
  leadingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, leadingIcon, className, ...rest },
  ref,
) {
  if (leadingIcon) {
    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--n-400)]">
          {leadingIcon}
        </span>
        <input
          ref={ref}
          className={cn(
            baseInputClass,
            "h-10 pl-10",
            error && "border-[var(--error-500)] focus:border-[var(--error-500)]",
            className,
          )}
          aria-invalid={error || undefined}
          {...rest}
        />
      </div>
    );
  }

  return (
    <input
      ref={ref}
      className={cn(
        baseInputClass,
        "h-10",
        error && "border-[var(--error-500)] focus:border-[var(--error-500)]",
        className,
      )}
      aria-invalid={error || undefined}
      {...rest}
    />
  );
});

/* ============================================================
 * Textarea
 * ============================================================ */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { error, className, rows = 4, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        baseInputClass,
        "py-2.5 leading-relaxed resize-y min-h-[88px]",
        error && "border-[var(--error-500)] focus:border-[var(--error-500)]",
        className,
      )}
      aria-invalid={error || undefined}
      {...rest}
    />
  );
});

/* ============================================================
 * Select
 * ============================================================ */

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { error, className, children, ...rest },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        baseInputClass,
        "h-10 pr-9 appearance-none",
        // chevron — encoded SVG so we don't depend on the icon registry here
        "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2369748A' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")]",
        "bg-[length:12px_12px] bg-[position:right_12px_center] bg-no-repeat",
        error && "border-[var(--error-500)] focus:border-[var(--error-500)]",
        className,
      )}
      aria-invalid={error || undefined}
      {...rest}
    >
      {children}
    </select>
  );
});
