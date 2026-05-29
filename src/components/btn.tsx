/**
 * @fhe/brand · Btn
 * Sourced from _bundle-source/components-core.jsx.
 *
 * Rules (DESIGN.md §5, §6):
 * - One Btn `primary` per surface. Never stack two navy CTAs.
 * - Color is voice (brand) or state (semantic), never both.
 * - Focus ring must be visible on keyboard nav (`:focus-visible`).
 * - Hit targets: sm 32px, md 40px, lg 48px.
 */
import * as React from "react";
import { cn } from "../lib/cn";
import { Icon, type IconName } from "../icons";

export type BtnVariant =
  | "primary"
  | "secondary"
  | "blue"
  | "outline"
  | "ghost"
  | "danger"
  | "subtle";

export type BtnSize = "sm" | "md" | "lg";

export interface BtnProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: BtnVariant;
  size?: BtnSize;
  /** Leading icon name (from @fhe/brand icon registry). */
  icon?: IconName;
  /** Trailing icon name (from @fhe/brand icon registry). */
  iconRight?: IconName;
  /** Full-width inside its parent. */
  full?: boolean;
}

const SIZE: Record<BtnSize, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-[22px] text-[15px] gap-2",
};

const VARIANT: Record<BtnVariant, string> = {
  primary:
    "bg-[var(--fhe-navy)] text-white border border-transparent " +
    "hover:bg-[var(--fhe-navy-700)] active:bg-[var(--fhe-navy-600)]",
  secondary:
    "bg-[var(--fhe-light-blue)] text-[var(--fhe-navy)] border border-transparent " +
    "hover:bg-[#88B5EF]",
  blue:
    "bg-[var(--fhe-blue)] text-white border border-transparent " +
    "hover:bg-[var(--fhe-blue-600)]",
  outline:
    "bg-white text-[var(--fhe-blue)] border border-[var(--fhe-blue)] " +
    "hover:bg-[var(--fhe-soft-blue)]",
  ghost:
    "bg-transparent text-[var(--fhe-navy)] border border-transparent " +
    "hover:bg-[var(--n-50)]",
  danger:
    "bg-[var(--error-500)] text-white border border-transparent " +
    "hover:bg-[var(--error-700)]",
  subtle:
    "bg-[var(--fhe-soft-blue)] text-[var(--fhe-navy)] border border-transparent " +
    "hover:bg-[#D8E7FE]",
};

const ICON_SIZE: Record<BtnSize, number> = { sm: 14, md: 16, lg: 16 };

export const Btn = React.forwardRef<HTMLButtonElement, BtnProps>(function Btn(
  {
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    full,
    children,
    className,
    type = "button",
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        // base
        "inline-flex items-center justify-center whitespace-nowrap font-semibold",
        "rounded-[var(--r-md)] font-[family-name:var(--font-body)]",
        "transition-[background,color,border-color,box-shadow] duration-150",
        "focus-visible:outline-none focus-visible:ring-0",
        "focus-visible:shadow-[var(--shadow-focus)]",
        // size
        SIZE[size],
        // variant
        VARIANT[variant],
        // disabled
        disabled && "opacity-55 cursor-not-allowed pointer-events-none",
        // full
        full && "w-full",
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={ICON_SIZE[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} size={ICON_SIZE[size]} />}
    </button>
  );
});
