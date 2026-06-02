"use client";

/**
 * @fhe/brand · Command palette (cmdk)
 * Brand-styled command menu primitives + a ready-made CommandDialog (⌘K palette).
 */
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";
import { Dialog, DialogContent } from "../primitives/dialog";

export const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(function Command({ className, ...rest }, ref) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[var(--r-lg)] bg-white text-[var(--n-800)]",
        "font-[family-name:var(--font-body)]",
        className,
      )}
      {...rest}
    />
  );
});

export const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(function CommandInput({ className, ...rest }, ref) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--n-200)] px-3">
      <Icon name="search" size={16} className="shrink-0 text-[var(--n-400)]" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "h-11 w-full bg-transparent text-sm text-[var(--n-800)] outline-none placeholder:text-[var(--n-400)]",
          className,
        )}
        {...rest}
      />
    </div>
  );
});

export const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(function CommandList({ className, ...rest }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-[320px] overflow-y-auto overflow-x-hidden p-1.5", className)}
      {...rest}
    />
  );
});

export const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(function CommandEmpty({ className, ...rest }, ref) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn("py-6 text-center text-sm text-[var(--n-500)]", className)}
      {...rest}
    />
  );
});

export const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(function CommandGroup({ className, ...rest }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden p-1 text-[var(--n-800)]",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-[var(--n-500)]",
        className,
      )}
      {...rest}
    />
  );
});

export const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(function CommandItem({ className, ...rest }, ref) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--r-sm)] px-2.5 py-2 text-sm text-[var(--n-700)] outline-none",
        "data-[selected=true]:bg-[var(--fhe-soft-blue)] data-[selected=true]:text-[var(--fhe-navy)]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...rest}
    />
  );
});

export const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(function CommandSeparator({ className, ...rest }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-[var(--n-100)]", className)}
      {...rest}
    />
  );
});

export interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  /** cmdk label for a11y. */
  label?: string;
}

/** Ready-made ⌘K palette: Dialog + Command. Mount once; drive `open` from a keybind. */
export function CommandDialog({ open, onOpenChange, children, label = "Command palette" }: CommandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideClose
        className="top-[20%] max-w-xl translate-y-0 overflow-hidden border-t-2 border-t-[var(--fhe-navy)] p-0"
      >
        <Command label={label}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}
