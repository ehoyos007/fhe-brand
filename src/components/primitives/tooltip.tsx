"use client";

/**
 * @fhe/brand · Tooltip (Radix)
 * DESIGN.md §5: navy bg, white text, 12px, ~8/10 padding, 6px radius, 220px max, side arrow.
 */
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;

export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(function TooltipContent({ className, sideOffset = 6, children, ...rest }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-[220px] rounded-[var(--r-sm)] px-2.5 py-2",
          "bg-[var(--fhe-navy)] text-white text-[12px] leading-snug",
          "font-[family-name:var(--font-body)] shadow-[var(--shadow-md)]",
          className,
        )}
        {...rest}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-[var(--fhe-navy)]" width={11} height={6} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});
