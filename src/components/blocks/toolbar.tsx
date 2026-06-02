/**
 * @fhe/brand · Toolbar / FilterBar
 * Horizontal container for search, filters, and actions above a table or board.
 */
import * as React from "react";
import { cn } from "../../lib/cn";

export function Toolbar({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2 font-[family-name:var(--font-body)]", className)}
      {...rest}
    />
  );
}

/** Pushes everything after it to the right edge of the Toolbar. */
export function ToolbarSpacer() {
  return <div className="flex-1" aria-hidden="true" />;
}

/** Thin vertical divider between Toolbar groups. */
export function ToolbarSeparator({ className }: { className?: string }) {
  return <div className={cn("mx-1 h-5 w-px self-center bg-[var(--n-200)]", className)} aria-hidden="true" />;
}
