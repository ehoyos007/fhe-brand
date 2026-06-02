/**
 * @fhe/brand · AppShell
 * Full-height app frame: sidebar slot + main column (optional header + scrollable content).
 * The content region owns scrolling (consumers typically pin <body> to overflow-hidden).
 */
import * as React from "react";
import { cn } from "../../lib/cn";

export interface AppShellProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** className for the scrollable content region. */
  contentClassName?: string;
}

export function AppShell({ sidebar, header, children, className, contentClassName }: AppShellProps) {
  return (
    <div
      className={cn(
        "flex h-screen w-full overflow-hidden bg-[var(--fhe-off-white)] text-[var(--n-800)]",
        "font-[family-name:var(--font-body)]",
        className,
      )}
    >
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {header}
        <main className={cn("flex-1 overflow-y-auto", contentClassName)}>{children}</main>
      </div>
    </div>
  );
}
