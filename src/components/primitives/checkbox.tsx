"use client";

/**
 * @fhe/brand · Checkbox (Radix)
 * Unchecked: white, n-300 border. Checked: navy fill, white check. Blue focus ring.
 */
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(function Checkbox({ className, ...rest }, ref) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[var(--r-xs)]",
        "border border-[var(--n-300)] bg-white transition-colors",
        "data-[state=checked]:border-[var(--fhe-navy)] data-[state=checked]:bg-[var(--fhe-navy)] data-[state=checked]:text-white",
        "data-[state=indeterminate]:border-[var(--fhe-navy)] data-[state=indeterminate]:bg-[var(--fhe-navy)] data-[state=indeterminate]:text-white",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator className="inline-flex items-center justify-center">
        {rest.checked === "indeterminate" ? <Icon name="minus" size={13} /> : <Icon name="check" size={13} />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
