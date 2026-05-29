/**
 * @fhe/brand · Icon
 * Sourced from _bundle-source/icons.jsx (FHE Brand Design System v1.0).
 * Outline family, 24x24 viewBox, 1.6px stroke, rounded caps + joins.
 */
import * as React from "react";
import { iconPaths, type IconName } from "./paths";

export type { IconName };

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name" | "color"> {
  name: IconName;
  /** px size, applied to width and height. Default 20. */
  size?: number;
  /** Stroke / fill color, defaults to currentColor so the icon inherits text color. */
  color?: string;
  /** Stroke width override. Default 1.6 — the canonical FHE line weight. */
  strokeWidth?: number;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 20, color = "currentColor", strokeWidth = 1.6, ...rest },
  ref,
) {
  const node = iconPaths[name] ?? iconPaths.info;
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={rest["aria-label"] ? undefined : true}
      focusable={false}
      {...rest}
    >
      {node}
    </svg>
  );
});
