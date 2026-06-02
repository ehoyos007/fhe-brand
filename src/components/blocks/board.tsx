"use client";

/**
 * @fhe/brand · Board (Kanban, dnd-kit)
 * Controlled board: parent owns `items`; Board emits onMove(itemId, toColumnId, toIndex).
 * Cards drag within and across columns. Generic over the card type.
 */
import * as React from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDroppable,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../../lib/cn";

export interface BoardColumn {
  id: string;
  title: React.ReactNode;
}

export interface BoardProps<T> {
  columns: BoardColumn[];
  items: T[];
  getId: (item: T) => string;
  getColumnId: (item: T) => string;
  renderCard: (item: T) => React.ReactNode;
  /** Fired on drop. Parent should move the item to `toColumnId` at `toIndex`. */
  onMove?: (itemId: string, toColumnId: string, toIndex: number) => void;
  className?: string;
  columnClassName?: string;
}

function SortableCard({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="touch-none"
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

function Column({
  id,
  title,
  count,
  cardIds,
  className,
  children,
}: {
  id: string;
  title: React.ReactNode;
  count: number;
  cardIds: string[];
  className?: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-[var(--r-lg)] border border-[var(--n-200)] bg-[var(--n-25)]",
        className,
      )}
    >
      <header className="flex items-center justify-between px-3 py-2.5">
        <span className="text-[13px] font-semibold text-[var(--fhe-navy)] font-[family-name:var(--font-head)]">
          {title}
        </span>
        <span className="rounded-full bg-[var(--n-100)] px-2 py-0.5 text-[11px] font-semibold text-[var(--n-600)] tabular-nums">
          {count}
        </span>
      </header>
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            "flex min-h-16 flex-1 flex-col gap-2 rounded-b-[var(--r-lg)] p-2 transition-colors",
            isOver && "bg-[var(--fhe-soft-blue)]",
          )}
        >
          {children}
        </div>
      </SortableContext>
    </div>
  );
}

export function Board<T>({
  columns,
  items,
  getId,
  getColumnId,
  renderCard,
  onMove,
  className,
  columnClassName,
}: BoardProps<T>) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const itemsByColumn = React.useMemo(() => {
    const map: Record<string, T[]> = {};
    for (const c of columns) map[c.id] = [];
    for (const it of items) {
      const col = getColumnId(it);
      (map[col] ??= []).push(it);
    }
    return map;
  }, [columns, items, getColumnId]);

  const activeItem = activeId ? items.find((it) => getId(it) === activeId) ?? null : null;

  const columnOf = (cardId: string): string | undefined => {
    const it = items.find((i) => getId(i) === cardId);
    return it ? getColumnId(it) : undefined;
  };

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    const activeCardId = String(active.id);
    const overId = String(over.id);

    const sourceCol = columnOf(activeCardId);
    if (!sourceCol) return;

    const isColumn = columns.some((c) => c.id === overId);
    const targetCol = isColumn ? overId : columnOf(overId);
    if (!targetCol) return;

    const targetIds = (itemsByColumn[targetCol] ?? []).map(getId);
    let targetIndex = isColumn ? targetIds.length : targetIds.indexOf(overId);
    if (targetIndex < 0) targetIndex = targetIds.length;

    const sourceIndex = (itemsByColumn[sourceCol] ?? []).map(getId).indexOf(activeCardId);
    if (sourceCol === targetCol && sourceIndex === targetIndex) return;

    onMove?.(activeCardId, targetCol, targetIndex);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={(e: DragStartEvent) => setActiveId(String(e.active.id))}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className={cn("flex gap-4 overflow-x-auto pb-2 font-[family-name:var(--font-body)]", className)}>
        {columns.map((col) => {
          const colItems = itemsByColumn[col.id] ?? [];
          return (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              count={colItems.length}
              cardIds={colItems.map(getId)}
              className={columnClassName}
            >
              {colItems.map((it) => (
                <SortableCard key={getId(it)} id={getId(it)}>
                  {renderCard(it)}
                </SortableCard>
              ))}
            </Column>
          );
        })}
      </div>
      <DragOverlay>{activeItem ? <div className="cursor-grabbing">{renderCard(activeItem)}</div> : null}</DragOverlay>
    </DndContext>
  );
}
