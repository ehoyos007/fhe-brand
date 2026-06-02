/**
 * @fhe/brand · Skeleton
 * Neutral loading placeholder. Pulses (honors prefers-reduced-motion via Tailwind's animate util
 * + the global reduced-motion rule in tokens.css). Pure / server-compatible.
 */
import * as React from "react";
import { cn } from "../../lib/cn";

export function Skeleton({ className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-[var(--r-sm)] bg-[var(--n-100)]", className)}
      {...rest}
    />
  );
}
