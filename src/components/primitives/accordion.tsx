"use client";

/**
 * @fhe/brand · Accordion (Radix)
 * DESIGN.md §5: disclosure with chevron that rotates 180° on expand, 200ms transition.
 */
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...rest }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b border-[var(--n-200)]", className)}
      {...rest}
    />
  );
});

export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...rest }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-3.5 text-left",
          "text-sm font-medium text-[var(--fhe-navy)] font-[family-name:var(--font-body)]",
          "transition-colors hover:text-[var(--fhe-blue)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] rounded-[var(--r-xs)]",
          className,
        )}
        {...rest}
      >
        {children}
        <Icon
          name="chev-down"
          size={16}
          className="shrink-0 text-[var(--n-400)] transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...rest }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn("overflow-hidden text-sm text-[var(--n-600)] leading-relaxed", className)}
      {...rest}
    >
      <div className="pb-3.5 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  );
});
