"use client";

/**
 * @fhe/brand · Pagination
 * DESIGN.md §5: active = navy fill / white text; others = white bg, n-200 border, n-700 text.
 * Min button 32×32, 6px radius. Prev/next chevrons. Collapses long ranges with ellipsis.
 */
import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";

export interface PaginationProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown either side of the current page (default 1). */
  siblingCount?: number;
}

const btn = cn(
  "inline-flex h-8 min-w-8 items-center justify-center rounded-[var(--r-sm)] px-2 text-sm",
  "border transition-colors focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
);

function range(start: number, end: number): number[] {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => start + i);
}

/** Build the page list with ellipsis markers (-1 = ellipsis). */
function buildPages(page: number, pageCount: number, sibling: number): number[] {
  const total = sibling * 2 + 5; // first, last, current, 2 ellipses, siblings
  if (pageCount <= total) return range(1, pageCount);

  const left = Math.max(page - sibling, 1);
  const right = Math.min(page + sibling, pageCount);
  const showLeftDots = left > 2;
  const showRightDots = right < pageCount - 1;

  if (!showLeftDots && showRightDots) return [...range(1, 3 + sibling * 2), -1, pageCount];
  if (showLeftDots && !showRightDots) return [1, -1, ...range(pageCount - (2 + sibling * 2), pageCount)];
  return [1, -1, ...range(left, right), -1, pageCount];
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  className,
  ...rest
}: PaginationProps) {
  if (pageCount <= 1) return null;
  const pages = buildPages(page, pageCount, siblingCount);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1.5 font-[family-name:var(--font-body)]", className)}
      {...rest}
    >
      <button
        type="button"
        className={cn(btn, "border-[var(--n-200)] bg-white text-[var(--n-700)] hover:bg-[var(--n-50)] disabled:opacity-40 disabled:pointer-events-none")}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <Icon name="chevron" size={14} className="rotate-180" />
      </button>

      {pages.map((p, i) =>
        p === -1 ? (
          <span key={`dots-${i}`} className="px-1 text-[var(--n-400)]" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              btn,
              p === page
                ? "border-[var(--fhe-navy)] bg-[var(--fhe-navy)] font-semibold text-white"
                : "border-[var(--n-200)] bg-white text-[var(--n-700)] hover:bg-[var(--n-50)]",
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        className={cn(btn, "border-[var(--n-200)] bg-white text-[var(--n-700)] hover:bg-[var(--n-50)] disabled:opacity-40 disabled:pointer-events-none")}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        aria-label="Next page"
      >
        <Icon name="chevron" size={14} />
      </button>
    </nav>
  );
}
