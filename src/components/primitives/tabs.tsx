"use client";

/**
 * @fhe/brand · Tabs (Radix)
 * DESIGN.md §5 underline pattern: active = navy text weight 600 + 2px navy underline;
 * inactive = n-500. List sits on an n-200 baseline.
 */
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/cn";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...rest }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex items-center gap-1 border-b border-[var(--n-200)] font-[family-name:var(--font-body)]",
        className,
      )}
      {...rest}
    />
  );
});

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...rest }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "-mb-px inline-flex items-center gap-2 border-b-2 border-transparent px-3 py-2",
        "text-sm font-medium text-[var(--n-500)] transition-colors",
        "hover:text-[var(--n-700)]",
        "data-[state=active]:border-[var(--fhe-navy)] data-[state=active]:font-semibold data-[state=active]:text-[var(--fhe-navy)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] rounded-[var(--r-xs)]",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...rest}
    />
  );
});

export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...rest }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-4 focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] rounded-[var(--r-sm)]",
        className,
      )}
      {...rest}
    />
  );
});
