"use client";

/**
 * @fhe/brand · RadioGroup + RadioGroupItem (Radix)
 * Unchecked: white, n-300 ring. Checked: navy ring + navy dot. Blue focus ring.
 */
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/cn";

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, ...rest }, ref) {
  return <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-2", className)} {...rest} />;
});

export const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(function RadioGroupItem({ className, ...rest }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full",
        "border border-[var(--n-300)] bg-white transition-colors",
        "data-[state=checked]:border-[var(--fhe-navy)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator className="inline-flex">
        <span className="h-2 w-2 rounded-full bg-[var(--fhe-navy)]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
