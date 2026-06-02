"use client";

/**
 * @fhe/brand · DataTable (TanStack Table)
 * Sortable, brand-styled table shell with loading + empty states. Generic over row type.
 * Virtualization for very large sets is deferred to a follow-up (A2.1).
 */
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";
import { EmptyState } from "./empty-state";
import { Skeleton } from "../primitives/skeleton";

export interface DataTableProps<TData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  isLoading?: boolean;
  loadingRows?: number;
  empty?: React.ReactNode;
  className?: string;
}

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
  isLoading,
  loadingRows = 6,
  empty,
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--r-lg)] border border-[var(--n-200)] bg-white font-[family-name:var(--font-body)]",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-[var(--n-200)] bg-[var(--n-25)]">
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <th key={header.id} className="px-3 py-2.5 text-left align-middle">
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wide text-[var(--n-600)] hover:text-[var(--n-800)]"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <Icon
                            name="chev-down"
                            size={13}
                            className={cn(
                              "text-[var(--n-400)] transition-transform",
                              sorted === "asc" && "rotate-180",
                              !sorted && "opacity-30",
                            )}
                          />
                        </button>
                      ) : (
                        <span className="text-[12px] font-semibold uppercase tracking-wide text-[var(--n-600)]">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: loadingRows }).map((_, i) => (
                  <tr key={`sk-${i}`} className="border-b border-[var(--n-100)]">
                    {table.getAllLeafColumns().map((col) => (
                      <td key={col.id} className="px-3 py-3">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                    className={cn(
                      "border-b border-[var(--n-100)] last:border-0",
                      onRowClick && "cursor-pointer hover:bg-[var(--n-25)]",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2.5 align-middle text-[var(--n-700)]">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {!isLoading && data.length === 0 && (
        <div className="p-6">{empty ?? <EmptyState icon="list" title="Nothing here yet" />}</div>
      )}
    </div>
  );
}
