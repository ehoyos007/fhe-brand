"use client";

/**
 * @fhe/brand · Switch (Radix)
 * Off: n-300 track. On: navy track. White thumb. Blue focus ring.
 */
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/cn";

export const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(function Switch({ className, ...rest }, ref) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full p-0.5 transition-colors",
        "bg-[var(--n-300)] data-[state=checked]:bg-[var(--fhe-navy)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-[18px] w-[18px] rounded-full bg-white shadow-[var(--shadow-sm)]",
          "transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
});
