"use client";

/**
 * @fhe/brand · Toast (Sonner, brand-themed)
 * DESIGN.md §5: navy-tinted card with a semantic-colored left border, ≥280px, shadow-md,
 * leading icon (Sonner supplies per-type icons), title + body.
 *
 *   import { Toaster, toast } from "@fhe/brand";
 *   // mount <Toaster /> once at app root; call toast.success("Saved") anywhere.
 */
import * as React from "react";
import { Toaster as SonnerToaster, toast, type ToasterProps } from "sonner";
import { cn } from "../../lib/cn";

export { toast };
export type { ToasterProps };

export function Toaster({ position = "bottom-right", toastOptions, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      gap={10}
      toastOptions={{
        classNames: {
          toast: cn(
            "min-w-[280px] gap-2 rounded-[var(--r-lg)] border border-[var(--n-200)]",
            "border-l-4 border-l-[var(--fhe-navy)] bg-white p-4 text-[var(--n-800)]",
            "shadow-[var(--shadow-md)] font-[family-name:var(--font-body)]",
            "data-[type=success]:border-l-[var(--success-500)]",
            "data-[type=error]:border-l-[var(--error-500)]",
            "data-[type=warning]:border-l-[var(--warning-500)]",
            "data-[type=info]:border-l-[var(--info-500)]",
          ),
          title: "text-sm font-semibold text-[var(--n-800)]",
          description: "text-[13px] leading-snug text-[var(--n-600)]",
          actionButton: "rounded-[var(--r-sm)] bg-[var(--fhe-navy)] px-2 py-1 text-xs text-white",
          cancelButton: "rounded-[var(--r-sm)] bg-[var(--n-100)] px-2 py-1 text-xs text-[var(--n-700)]",
          closeButton: "border-[var(--n-200)] text-[var(--n-500)]",
          icon: "shrink-0",
        },
        ...toastOptions,
      }}
      {...props}
    />
  );
}
