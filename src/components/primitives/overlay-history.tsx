"use client";

/**
 * @fhe/brand · OverlayHistory — Shift+Esc reopens the most-recently-closed overlay
 * (see fhe-grid-stream/docs/rebuild-bundle/04-DESIGN-SYSTEM.md Part 3, interaction model).
 *
 * Wrap the app once in <OverlayHistoryProvider>. When an overlay (BandedDialog / Panel /
 * Drawer / Dialog) closes via a dismiss gesture, call recordClosed() with a thunk that
 * reopens it (and restores its context — tab, nested doc, in-progress form state). The
 * provider binds Shift+Esc globally to replay the most recent thunk, once.
 *
 *   const { recordClosed } = useOverlayHistory();
 *   <Panel open={open} onOpenChange={(o) => {
 *     if (!o) recordClosed(() => setOpen(true));
 *     setOpen(o);
 *   }}>…</Panel>
 *
 * Used outside a provider, the hook returns no-ops, so components stay safe to render anywhere.
 */
import * as React from "react";

type ReopenFn = () => void;

interface OverlayHistoryValue {
  /** Record how to reopen the overlay that just closed. The latest call wins. */
  recordClosed: (reopen: ReopenFn) => void;
  /** Replay the most recently recorded reopen thunk (consumes it). */
  reopenLast: () => void;
  /** Forget the recorded thunk (e.g. after a successful submit that shouldn't be reopened). */
  clear: () => void;
}

const OverlayHistoryContext = React.createContext<OverlayHistoryValue | null>(null);

export interface OverlayHistoryProviderProps {
  children: React.ReactNode;
  /** Disable the global Shift+Esc binding (keep the API, drop the shortcut). */
  disableShortcut?: boolean;
}

export function OverlayHistoryProvider({ children, disableShortcut }: OverlayHistoryProviderProps) {
  const lastRef = React.useRef<ReopenFn | null>(null);

  const recordClosed = React.useCallback((reopen: ReopenFn) => {
    lastRef.current = reopen;
  }, []);
  const reopenLast = React.useCallback(() => {
    const fn = lastRef.current;
    lastRef.current = null;
    fn?.();
  }, []);
  const clear = React.useCallback(() => {
    lastRef.current = null;
  }, []);

  React.useEffect(() => {
    if (disableShortcut) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && e.shiftKey) {
        e.preventDefault();
        reopenLast();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [disableShortcut, reopenLast]);

  const value = React.useMemo<OverlayHistoryValue>(
    () => ({ recordClosed, reopenLast, clear }),
    [recordClosed, reopenLast, clear],
  );

  return <OverlayHistoryContext.Provider value={value}>{children}</OverlayHistoryContext.Provider>;
}

const NOOP: OverlayHistoryValue = {
  recordClosed: () => {},
  reopenLast: () => {},
  clear: () => {},
};

export function useOverlayHistory(): OverlayHistoryValue {
  return React.useContext(OverlayHistoryContext) ?? NOOP;
}
