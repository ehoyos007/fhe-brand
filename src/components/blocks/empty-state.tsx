/**
 * @fhe/brand · EmptyState
 * Centered placeholder for empty tables/lists. Soft-blue icon disc, head-font title.
 */
import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../../icons";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: IconName;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional CTA (typically a Btn). */
  action?: React.ReactNode;
}

export function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-[var(--r-lg)] px-6 py-12 text-center",
        "border border-dashed border-[var(--n-200)] bg-[var(--n-25)] font-[family-name:var(--font-body)]",
        className,
      )}
      {...rest}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--fhe-soft-blue)] text-[var(--fhe-navy)]">
        <Icon name={icon} size={22} />
      </span>
      <div className="text-sm font-semibold text-[var(--n-800)] font-[family-name:var(--font-head)]">{title}</div>
      {description && <p className="max-w-sm text-[13px] leading-relaxed text-[var(--n-500)]">{description}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
