/**
 * @fhe/brand · Alert
 * Sourced from _bundle-source/components-core.jsx.
 *
 * Rules (DESIGN.md §5, §6):
 * - 4 tones: info / success / warning / error.
 * - Required: leading icon, title, body. Optional: trailing action (a Btn).
 * - Use only when there's a real next step or compliance signal — must be
 *   actionable or dismissable. Never as decoration.
 * - Color alone never communicates state — leading icon is mandatory.
 */
import * as React from "react";
import { cn } from "../lib/cn";
import { Icon, type IconName } from "../icons";

export type AlertTone = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  title: React.ReactNode;
  /** Trailing action (typically a Btn). */
  action?: React.ReactNode;
}

const PALETTE: Record<AlertTone, { bg: string; border: string; fg: string; icon: IconName }> = {
  info: {
    bg: "bg-[var(--info-50)]",
    border: "border-[#C7DBFB]",
    fg: "text-[var(--info-700)]",
    icon: "info",
  },
  success: {
    bg: "bg-[var(--success-50)]",
    border: "border-[#A6F4C5]",
    fg: "text-[var(--success-700)]",
    icon: "check-circle",
  },
  warning: {
    bg: "bg-[var(--warning-50)]",
    border: "border-[#FEDF89]",
    fg: "text-[var(--warning-700)]",
    icon: "alert",
  },
  error: {
    bg: "bg-[var(--error-50)]",
    border: "border-[#FECDCA]",
    fg: "text-[var(--error-700)]",
    icon: "x-circle",
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone = "info", title, action, children, className, role, ...rest },
  ref,
) {
  const p = PALETTE[tone];
  // assertive for errors, polite for everything else
  const ariaRole = role ?? (tone === "error" ? "alert" : "status");
  return (
    <div
      ref={ref}
      role={ariaRole}
      className={cn(
        "flex items-start gap-3 rounded-[var(--r-lg)] border p-4",
        p.bg,
        p.border,
        className,
      )}
      {...rest}
    >
      <Icon name={p.icon} size={20} className={cn("shrink-0 mt-0.5", p.fg)} />
      <div className="flex-1 min-w-0">
        <div className={cn("text-sm font-semibold", p.fg)}>{title}</div>
        {children && (
          <div className="mt-1 text-[13.5px] text-[var(--n-700)] leading-[1.5]">{children}</div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
});
