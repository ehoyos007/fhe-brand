/**
 * @fhe/brand · Badge
 * Sourced from _bundle-source/components-core.jsx.
 *
 * Rules (DESIGN.md §5):
 * - Tones split into state (info/success/warning/error) and voice (neutral/navy/soft).
 * - Pill shape, 11.5px text, weight 600.
 * - Optional leading icon at 12px.
 * - State badges should never be used as decoration. Voice badges should never communicate state.
 */
import * as React from "react";
import { cn } from "../lib/cn";
import { Icon, type IconName } from "../icons";

export type BadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "navy"
  | "soft";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Leading icon name (rendered at 12px). */
  icon?: IconName;
}

const TONE: Record<BadgeTone, string> = {
  neutral:
    "bg-[var(--n-50)] text-[var(--n-700)] border-[var(--n-200)]",
  info:
    "bg-[var(--info-50)] text-[var(--info-700)] border-[#C7DBFB]",
  success:
    "bg-[var(--success-50)] text-[var(--success-700)] border-[#A6F4C5]",
  warning:
    "bg-[var(--warning-50)] text-[var(--warning-700)] border-[#FEDF89]",
  error:
    "bg-[var(--error-50)] text-[var(--error-700)] border-[#FECDCA]",
  navy:
    "bg-[var(--fhe-navy)] text-white border-[var(--fhe-navy)]",
  soft:
    "bg-[var(--fhe-soft-blue)] text-[var(--fhe-navy)] border-[#C7DBFB]",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", icon, children, className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5",
        "px-2.5 py-0.5 rounded-full border",
        "text-[11.5px] font-semibold tracking-[0.01em]",
        "font-[family-name:var(--font-body)]",
        TONE[tone],
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
});
