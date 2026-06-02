"use client";

/**
 * @fhe/brand · DatePicker
 * Input-style trigger + Calendar in a Popover. Closes on select.
 */
import * as React from "react";
import { format } from "date-fns";
import { Popover, PopoverTrigger, PopoverContent } from "../primitives/popover";
import { Calendar } from "./calendar";
import { cn } from "../../lib/cn";
import { Icon } from "../../icons";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  /** date-fns format string for the trigger label. */
  dateFormat?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  minDate,
  maxDate,
  disabled,
  dateFormat = "MMM d, yyyy",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "inline-flex h-10 w-full items-center justify-between gap-2 rounded-[var(--r-sm)] px-3 text-sm",
            "border border-[var(--n-200)] bg-white font-[family-name:var(--font-body)] transition-[border-color,box-shadow]",
            "hover:border-[var(--n-300)] focus-visible:outline-none focus-visible:border-[var(--fhe-blue)] focus-visible:shadow-[var(--shadow-focus)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--n-25)] disabled:text-[var(--n-500)]",
            value ? "text-[var(--n-800)]" : "text-[var(--n-400)]",
            className,
          )}
        >
          <span>{value ? format(value, dateFormat) : placeholder}</span>
          <Icon name="calendar" size={16} className="text-[var(--n-400)]" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          selected={value}
          minDate={minDate}
          maxDate={maxDate}
          onSelect={(d) => {
            onChange?.(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
