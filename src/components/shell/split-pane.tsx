/**
 * @fhe/brand · SplitPane
 * Two-column master/detail layout, each pane independently scrollable.
 * v1 is fixed-width (no drag handle) — drag-resize is a follow-up.
 */
import * as React from "react";
import { cn } from "../../lib/cn";

export interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  /** Left pane width (number = px, or any CSS width string). Default 320. */
  leftWidth?: number | string;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
}

export function SplitPane({
  left,
  right,
  leftWidth = 320,
  className,
  leftClassName,
  rightClassName,
}: SplitPaneProps) {
  return (
    <div className={cn("flex h-full min-h-0", className)}>
      <div
        style={{ width: leftWidth }}
        className={cn("shrink-0 overflow-y-auto border-r border-[var(--n-200)]", leftClassName)}
      >
        {left}
      </div>
      <div className={cn("min-w-0 flex-1 overflow-y-auto", rightClassName)}>{right}</div>
    </div>
  );
}
