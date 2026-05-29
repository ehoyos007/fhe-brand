/**
 * Minimal class-name joiner. Filters falsy values, joins with spaces.
 * Inlined to avoid pulling clsx as a runtime dep on @fhe/brand consumers.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
