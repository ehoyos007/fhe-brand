/**
 * @fhe/brand · components barrel
 * Tree-shakable named exports for all v1 brand primitives.
 */
export { Btn, type BtnProps, type BtnVariant, type BtnSize } from "./btn";
export {
  Field,
  Input,
  Textarea,
  Select,
  type FieldProps,
  type InputProps,
  type TextareaProps,
  type SelectProps,
} from "./field";
export { Badge, type BadgeProps, type BadgeTone } from "./badge";
export { Alert, type AlertProps, type AlertTone } from "./alert";
export { Avatar, type AvatarProps, type AvatarTone, type AvatarSize } from "./avatar";
export { Logo, type LogoProps } from "./logo";

// CRM building blocks (Radix + brand tokens) — PLAN.md phases A1/A2/A3.
export * from "./primitives"; // A1 — foundational primitives
export * from "./blocks"; // A2 — DataTable, Board, Command, Calendar, DatePicker, EmptyState, Toolbar
export * from "./shell"; // A3 — AppShell, Sidebar, PageHeader, SplitPane
