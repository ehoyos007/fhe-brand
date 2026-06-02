/**
 * @fhe/brand · Spinner
 * Indeterminate loader. Brand blue by default; inherits currentColor via `text-*`.
 * Pure / server-compatible.
 */
import * as React from "react";
import { cn } from "../../lib/cn";

export interface SpinnerProps extends React.ComponentPropsWithoutRef<"svg"> {
  /** Pixel size (default 20). */
  size?: number;
  /** Accessible label; defaults to "Loading". */
  label?: string;
}

export function Spinner({ size = 20, label = "Loading", className, ...rest }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label={label}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("animate-spin text-[var(--fhe-blue)]", className)}
      {...rest}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
