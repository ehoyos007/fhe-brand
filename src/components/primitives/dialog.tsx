"use client";

/**
 * @fhe/brand · Dialog / Modal (Radix)
 * DESIGN.md: navy-tinted shadow-lg, white surface. Brand cue: 2px navy top accent line.
 */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-[rgba(11,29,58,0.45)]", className)}
      {...rest}
    />
  );
});

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Hide the built-in top-right close button. */
  hideClose?: boolean;
}

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent({ className, children, hideClose, ...rest }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
          "rounded-[var(--r-lg)] border-t-2 border-t-[var(--fhe-navy)] bg-white",
          "p-6 shadow-[var(--shadow-lg)] font-[family-name:var(--font-body)]",
          "focus:outline-none",
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
    </DialogPortal>
  );
});

export function DialogHeader({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col gap-1 pr-8", className)} {...rest} />;
}

export function DialogFooter({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...rest}
    />
  );
}

export const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...rest }, ref) {
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

export const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm leading-relaxed text-[var(--n-600)]", className)}
      {...rest}
    />
  );
});
