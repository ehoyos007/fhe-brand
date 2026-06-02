"use client";

/**
 * @fhe/brand · DropdownMenu (Radix)
 * White menu surface, navy-tinted shadow-lg. Items: n-700 → navy on highlight (soft-blue bg).
 */
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const itemBase = cn(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--r-sm)] px-2.5 py-1.5",
  "text-sm text-[var(--n-700)] outline-none transition-colors",
  "data-[highlighted]:bg-[var(--fhe-soft-blue)] data-[highlighted]:text-[var(--fhe-navy)]",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
);

export const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(function DropdownMenuContent({ className, sideOffset = 6, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[10rem] rounded-[var(--r-md)] border border-[var(--n-200)] bg-white p-1.5",
          "shadow-[var(--shadow-lg)] font-[family-name:var(--font-body)]",
          className,
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

export const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(function DropdownMenuItem({ className, ...rest }, ref) {
  return <DropdownMenuPrimitive.Item ref={ref} className={cn(itemBase, className)} {...rest} />;
});

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.CheckboxItem ref={ref} className={cn(itemBase, "pl-7", className)} {...rest}>
      <span className="absolute left-2 inline-flex items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon name="check" size={14} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

export const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem ref={ref} className={cn(itemBase, "pl-7", className)} {...rest}>
      <span className="absolute left-2.5 inline-flex">
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--fhe-navy)]" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});

export const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(function DropdownMenuLabel({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--n-500)]",
        className,
      )}
      {...rest}
    />
  );
});

export const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1.5 my-1 h-px bg-[var(--n-100)]", className)}
      {...rest}
    />
  );
});
