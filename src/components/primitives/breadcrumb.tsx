/**
 * @fhe/brand · Breadcrumb
 * DESIGN.md §5: chevron separators (12px, n-300). Trail: n-500. Leaf: navy, weight 600.
 * Pure / server-compatible — pass your own <a> or framework Link into BreadcrumbLink via asChild-style children.
 */
import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";

export function Breadcrumb({ className, ...rest }: React.ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="Breadcrumb" className={cn("font-[family-name:var(--font-body)]", className)} {...rest} />;
}

export function BreadcrumbList({ className, ...rest }: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", className)} {...rest} />
  );
}

export function BreadcrumbItem({ className, ...rest }: React.ComponentPropsWithoutRef<"li">) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...rest} />;
}

export function BreadcrumbLink({ className, ...rest }: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "text-[var(--n-500)] transition-colors hover:text-[var(--fhe-navy)]",
        "focus-visible:outline-none focus-visible:underline",
        className,
      )}
      {...rest}
    />
  );
}

export function BreadcrumbPage({ className, ...rest }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-current="page"
      className={cn("font-semibold text-[var(--fhe-navy)]", className)}
      {...rest}
    />
  );
}

export function BreadcrumbSeparator({ className, ...rest }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span role="presentation" aria-hidden="true" className={cn("text-[var(--n-300)]", className)} {...rest}>
      <Icon name="chevron" size={12} />
    </span>
  );
}
