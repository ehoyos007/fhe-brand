"use client";

/**
 * @fhe/brand · Panel — the locked right-side detail panel + scrim-nest stacking
 * (see fhe-grid-stream/docs/rebuild-bundle/04-DESIGN-SYSTEM.md Part 3).
 *
 * Edge-anchored, full-height, banded soft-blue header + navy icon disc (matches BandedDialog).
 *
 *   level 1 (default) — primary panel: 540px, soft left-cast --shadow-panel, transparent
 *     overlay (the surface behind stays visible; the lone parent is not dimmed).
 *   level 2 — nested panel: 480px, --shadow-panel-nested, 1px navy hairline (NOT a side-stripe),
 *     and the brand scrim raises above the parent so the nested panel dims canvas AND parent.
 *
 * Built on Radix Dialog, so each level focus-traps and Esc closes the top level only.
 * For "Shift+Esc reopens the last-closed overlay", wrap the app in <OverlayHistoryProvider>
 * and call recordClosed() from onOpenChange — see overlay-history.tsx.
 */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../../icons";

export const Panel = DialogPrimitive.Root;
export const PanelTrigger = DialogPrimitive.Trigger;
export const PanelClose = DialogPrimitive.Close;

export interface PanelContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, "title"> {
  /** Nesting depth. 1 = primary (no dim); 2 = nested (brand scrim dims the parent). */
  level?: 1 | 2;
  icon?: IconName;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Rendered flush under the banded header (e.g. brand <Tabs> or a toolbar). */
  toolbar?: React.ReactNode;
  hideClose?: boolean;
  /** Width utility; defaults to 540px (level 1) / 480px (level 2). */
  widthClass?: string;
}

export const PanelContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  PanelContentProps
>(function PanelContent(
  { className, children, level = 1, icon, title, subtitle, toolbar, hideClose, widthClass, ...rest },
  ref,
) {
  const nested = level === 2;
  const overlay = nested
    ? "z-[40] bg-[rgba(11,29,58,0.45)]" // scrim-nest: dims canvas + parent panel
    : "z-[25] bg-transparent"; // lone parent: surface behind stays visible
  const width = widthClass ?? (nested ? "w-[480px] max-w-[88vw]" : "w-[540px] max-w-[92vw]");

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={cn("fixed inset-0", overlay)} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed inset-y-0 right-0 flex h-full flex-col bg-white focus:outline-none",
          "font-[family-name:var(--font-body)]",
          nested
            ? "z-[45] border-l border-[rgba(11,29,58,0.08)] shadow-[var(--shadow-panel-nested)]"
            : "z-30 shadow-[var(--shadow-panel)]",
          width,
          className,
        )}
        {...rest}
      >
        <div className="relative flex shrink-0 items-center gap-3 bg-[var(--fhe-soft-blue)] px-5 py-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--r-md)] bg-[var(--fhe-navy)]">
            {icon ? <Icon name={icon} size={18} color="#fff" /> : null}
          </span>
          <div className="min-w-0">
            <DialogPrimitive.Title className="font-[family-name:var(--font-head)] text-base font-semibold text-[var(--fhe-navy)]">
              {title}
            </DialogPrimitive.Title>
            {subtitle ? (
              <DialogPrimitive.Description className="mt-px truncate text-xs text-[var(--fhe-navy-600)]">
                {subtitle}
              </DialogPrimitive.Description>
            ) : null}
          </div>
          {!hideClose && (
            <DialogPrimitive.Close
              className={cn(
                "absolute right-4 top-3.5 inline-flex h-7 w-7 items-center justify-center rounded-[var(--r-sm)]",
                "text-[var(--n-500)] transition-colors hover:bg-black/[0.06] hover:text-[var(--n-800)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
              )}
              aria-label="Close"
            >
              <Icon name="x" size={18} />
            </DialogPrimitive.Close>
          )}
        </div>

        {toolbar ? <div className="shrink-0 px-5">{toolbar}</div> : null}

        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
