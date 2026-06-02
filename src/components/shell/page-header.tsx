/**
 * @fhe/brand · PageHeader
 * Page title bar: optional breadcrumb + title + description + right-aligned actions.
 */
import * as React from "react";
import { cn } from "../../lib/cn";

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  className,
  ...rest
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-1 border-b border-[var(--n-200)] bg-white px-6 py-4 font-[family-name:var(--font-body)]",
        className,
      )}
      {...rest}
    >
      {breadcrumb && <div className="mb-1">{breadcrumb}</div>}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold text-[var(--fhe-navy)] font-[family-name:var(--font-head)]">
            {title}
          </h1>
          {description && <p className="mt-0.5 text-sm text-[var(--n-500)]">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
