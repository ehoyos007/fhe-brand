"use client";

/**
 * @fhe/brand · Drawer / Sheet (Radix Dialog, edge-anchored)
 * Slides in from an edge. White surface, navy-tinted shadow-lg. Right side by default.
 */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;
export const DrawerPortal = DialogPrimitive.Portal;

export type DrawerSide = "top" | "right" | "bottom" | "left";

const SIDE: Record<DrawerSide, string> = {
  right: "inset-y-0 right-0 h-full w-full max-w-md border-l",
  left: "inset-y-0 left-0 h-full w-full max-w-md border-r",
  top: "inset-x-0 top-0 w-full max-h-[85vh] border-b",
  bottom: "inset-x-0 bottom-0 w-full max-h-[85vh] border-t",
};

export const DrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DrawerOverlay({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-[rgba(11,29,58,0.45)]", className)}
      {...rest}
    />
  );
});

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: DrawerSide;
  hideClose?: boolean;
}

export const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(function DrawerContent({ className, children, side = "right", hideClose, ...rest }, ref) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 flex flex-col gap-4 overflow-y-auto bg-white p-6",
          "border-[var(--n-200)] shadow-[var(--shadow-lg)] font-[family-name:var(--font-body)]",
          "focus:outline-none",
          SIDE[side],
          className,
        )}
        {...rest}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-[var(--r-sm)]",
              "text-[var(--n-500)] transition-colors hover:bg-[var(--n-50)] hover:text-[var(--n-800)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
            )}
            aria-label="Close"
          >
            <Icon name="x" size={18} />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DrawerPortal>
  );
});

export function DrawerHeader({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 pr-8", className)} {...rest} />;
}

export function DrawerFooter({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto flex flex-col gap-2", className)} {...rest} />;
}

export const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DrawerTitle({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold text-[var(--fhe-navy)] font-[family-name:var(--font-head)]",
        className,
      )}
      {...rest}
    />
  );
});

export const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DrawerDescription({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm leading-relaxed text-[var(--n-600)]", className)}
      {...rest}
    />
  );
});
