"use client";

/**
 * @fhe/brand · Popover (Radix)
 * White floating card, n-200 border, navy-tinted shadow-md.
 */
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;

export const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent({ className, align = "center", sideOffset = 8, ...rest }, ref) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-[var(--r-md)] border border-[var(--n-200)] bg-white p-4",
          "text-[var(--n-800)] shadow-[var(--shadow-md)] font-[family-name:var(--font-body)]",
          "focus:outline-none",
          className,
        )}
        {...rest}
      />
    </PopoverPrimitive.Portal>
  );
});
