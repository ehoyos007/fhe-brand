"use client";

/**
 * @fhe/brand · Calendar
 * Month-grid date picker surface. Single-date selection. Navy selected day, blue "today" ring.
 * Controlled or uncontrolled visible month. Built on date-fns (no extra UI deps).
 */
import * as React from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isToday,
  isAfter,
  isBefore,
  format,
} from "date-fns";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";

export interface CalendarProps {
  /** Currently selected date. */
  selected?: Date;
  onSelect?: (date: Date) => void;
  /** Controlled visible month. */
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  /** 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: 0 | 1;
  className?: string;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Calendar({
  selected,
  onSelect,
  month,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  weekStartsOn = 0,
  className,
}: CalendarProps) {
  const [uncontrolled, setUncontrolled] = React.useState(() =>
    startOfMonth(month ?? selected ?? defaultMonth ?? new Date()),
  );
  const viewMonth = month ?? uncontrolled;

  const goTo = (next: Date) => {
    onMonthChange?.(next);
    if (!month) setUncontrolled(next);
  };

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewMonth), { weekStartsOn }),
    end: endOfWeek(endOfMonth(viewMonth), { weekStartsOn }),
  });

  const weekdays = [...WEEKDAY_LABELS.slice(weekStartsOn), ...WEEKDAY_LABELS.slice(0, weekStartsOn)];

  const isDisabled = (day: Date) =>
    (minDate ? isBefore(day, startOfDay(minDate)) : false) ||
    (maxDate ? isAfter(day, startOfDay(maxDate)) : false);

  const navBtn =
    "inline-flex h-7 w-7 items-center justify-center rounded-[var(--r-sm)] text-[var(--n-500)] " +
    "transition-colors hover:bg-[var(--n-100)] hover:text-[var(--n-800)] " +
    "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]";

  return (
    <div className={cn("w-[268px] p-3 font-[family-name:var(--font-body)]", className)}>
      <div className="mb-2 flex items-center justify-between">
        <button type="button" className={navBtn} onClick={() => goTo(subMonths(viewMonth, 1))} aria-label="Previous month">
          <Icon name="chevron" size={15} className="rotate-180" />
        </button>
        <div className="text-sm font-semibold text-[var(--fhe-navy)] font-[family-name:var(--font-head)]">
          {format(viewMonth, "MMMM yyyy")}
        </div>
        <button type="button" className={navBtn} onClick={() => goTo(addMonths(viewMonth, 1))} aria-label="Next month">
          <Icon name="chevron" size={15} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {weekdays.map((w) => (
          <div key={w} className="py-1 text-center text-[11px] font-medium text-[var(--n-400)]">
            {w}
          </div>
        ))}

        {days.map((day) => {
          const selectedDay = selected ? isSameDay(day, selected) : false;
          const outside = !isSameMonth(day, viewMonth);
          const disabled = isDisabled(day);
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect?.(day)}
              aria-pressed={selectedDay}
              aria-current={isToday(day) ? "date" : undefined}
              className={cn(
                "flex h-9 items-center justify-center rounded-[var(--r-sm)] text-[13px] tabular-nums transition-colors",
                "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
                selectedDay
                  ? "bg-[var(--fhe-navy)] font-semibold text-white"
                  : "text-[var(--n-700)] hover:bg-[var(--n-100)]",
                outside && !selectedDay && "text-[var(--n-300)]",
                !selectedDay && isToday(day) && "ring-1 ring-inset ring-[var(--fhe-blue)] text-[var(--fhe-blue)]",
                disabled && "pointer-events-none opacity-40",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
