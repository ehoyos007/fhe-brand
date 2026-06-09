"use client";

/**
 * @fhe/brand · BandedDialog — the locked modal idiom
 * (see fhe-grid-stream/docs/rebuild-bundle/04-DESIGN-SYSTEM.md Part 3).
 *
 * A Radix Dialog whose header is a soft-blue band with a navy icon disc, instead of
 * the base Dialog's 2px navy top-accent. 16px radius, --shadow-xl, inset footer band.
 *
 * `inputRequired` makes the dialog non-dismissible by Esc / outside-click (the agent
 * must complete it, e.g. call disposition). Those gestures nudge the dialog instead.
 * An explicit Close / Cancel control is still the deliberate way out.
 */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../../icons";

export const BandedDialog = DialogPrimitive.Root;
export const BandedDialogTrigger = DialogPrimitive.Trigger;
export const BandedDialogClose = DialogPrimitive.Close;

/** Horizontal shake via WAAPI (no CSS keyframes dependency); skipped under reduced-motion. */
function useNudge() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const nudge = React.useCallback(() => {
    const el = ref.current;
    if (!el || typeof el.animate !== "function") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    el.animate(
      [
        { transform: "translate(-50%, -50%)" },
        { transform: "translate(calc(-50% - 6px), -50%)" },
        { transform: "translate(calc(-50% + 6px), -50%)" },
        { transform: "translate(calc(-50% - 4px), -50%)" },
        { transform: "translate(-50%, -50%)" },
      ],
      { duration: 360, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
  }, []);
  return { ref, nudge };
}

export interface BandedDialogContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, "title"> {
  /** Leading icon rendered in the navy disc (from the @fhe/brand registry). */
  icon?: IconName;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Footer node, rendered in the inset band (typically the action buttons). */
  footer?: React.ReactNode;
  /** Esc + outside-click do not close; they nudge. Pair with an explicit Close/Cancel. */
  inputRequired?: boolean;
  /** Hide the header close button (defaults to visible). */
  hideClose?: boolean;
  /** Width utility (default `max-w-[460px]`). */
  widthClass?: string;
}

export const BandedDialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  BandedDialogContentProps
>(function BandedDialogContent(
  {
    className,
    children,
    icon,
    title,
    subtitle,
    footer,
    inputRequired,
    hideClose,
    widthClass = "max-w-[460px]",
    ...rest
  },
  forwardedRef,
) {
  const { ref: nudgeRef, nudge } = useNudge();
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      nudgeRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [forwardedRef, nudgeRef],
  );

  const block = inputRequired
    ? (e: Event) => {
        e.preventDefault();
        nudge();
      }
    : undefined;

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-[rgba(11,29,58,0.45)]" />
      <DialogPrimitive.Content
        ref={setRef}
        onEscapeKeyDown={block}
        onPointerDownOutside={block}
        onInteractOutside={block}
        className={cn(
          "fixed left-1/2 top-1/2 z-[65] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2",
          "overflow-hidden rounded-[var(--r-xl)] border border-[var(--n-100)] bg-white",
          "shadow-[var(--shadow-xl)] font-[family-name:var(--font-body)] focus:outline-none",
          widthClass,
          className,
        )}
        {...rest}
      >
        <div className="relative flex items-center gap-[13px] bg-[var(--fhe-soft-blue)] px-5 py-[18px]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--r-md)] bg-[var(--fhe-navy)]">
            {icon ? <Icon name={icon} size={20} color="#fff" /> : null}
          </span>
          <div className="min-w-0">
            <DialogPrimitive.Title className="font-[family-name:var(--font-head)] text-base font-semibold text-[var(--fhe-navy)]">
              {title}
            </DialogPrimitive.Title>
            {subtitle ? (
              <DialogPrimitive.Description className="mt-px text-xs text-[var(--fhe-navy-600)]">
                {subtitle}
              </DialogPrimitive.Description>
            ) : null}
          </div>
          {!hideClose && (
            <DialogPrimitive.Close
              className={cn(
                "absolute right-3.5 top-3.5 inline-flex h-7 w-7 items-center justify-center rounded-[var(--r-sm)]",
                "text-[var(--n-500)] transition-colors hover:bg-black/[0.06] hover:text-[var(--n-800)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
              )}
              aria-label="Close"
            >
              <Icon name="x" size={18} />
            </DialogPrimitive.Close>
          )}
        </div>

        <div className="p-5">{children}</div>

        {footer ? (
          <div className="flex items-center justify-end gap-2.5 border-t border-[var(--n-100)] bg-[var(--n-25)] px-5 py-3.5">
            {footer}
          </div>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
