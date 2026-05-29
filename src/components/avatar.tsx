/**
 * @fhe/brand · Avatar
 * Sourced from _bundle-source/components-operational.jsx.
 *
 * Rules (DESIGN.md §5):
 * - Initials disc, round, family Poppins, weight 600.
 * - 4 tones: soft (default), blue, navy, light.
 * - Sizes: sm (28), md (36), lg (44). Custom px size supported.
 */
import * as React from "react";
import { cn } from "../lib/cn";

export type AvatarTone = "soft" | "blue" | "navy" | "light";
export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Initials, max ~3 chars. */
  name: string;
  /** Named size or custom pixel size. Default 'md' (36px). */
  size?: AvatarSize | number;
  tone?: AvatarTone;
}

const TONE: Record<AvatarTone, string> = {
  soft: "bg-[var(--fhe-soft-blue)] text-[var(--fhe-navy)]",
  blue: "bg-[var(--fhe-blue)] text-white",
  navy: "bg-[var(--fhe-navy)] text-white",
  light: "bg-[var(--fhe-light-blue)] text-[var(--fhe-navy)]",
};

const NAMED_SIZE: Record<AvatarSize, number> = { sm: 28, md: 36, lg: 44 };

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, size = "md", tone = "soft", className, style, ...rest },
  ref,
) {
  const px = typeof size === "number" ? size : NAMED_SIZE[size];
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center shrink-0 rounded-full",
        "font-[family-name:var(--font-head)] font-semibold leading-none select-none",
        TONE[tone],
        className,
      )}
      style={{ width: px, height: px, fontSize: px * 0.36, ...style }}
      aria-label={rest["aria-label"] ?? name}
      {...rest}
    >
      {name}
    </span>
  );
});
