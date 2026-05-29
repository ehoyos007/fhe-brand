/**
 * @fhe/brand · token exports
 * Programmatic access to FHE design tokens for component logic, charts, etc.
 * For visual styling, prefer importing tokens.css and using CSS variables.
 */

export const fheBrand = {
  navy: "#0B1D3A",
  navy700: "#122A52",
  navy600: "#1A3A6E",
  blue: "#2563EB",
  blue600: "#1D4FCB",
  blue400: "#4D7DF0",
  lightBlue: "#9EC5FF",
  softBlue: "#E8F1FF",
  offWhite: "#F6F8FA",
} as const;

export const fheNeutrals = {
  n0: "#FFFFFF",
  n25: "#FAFBFC",
  n50: "#F4F6F8",
  n100: "#E7EBF0",
  n200: "#D4DAE2",
  n300: "#B6BFCC",
  n400: "#8C97A8",
  n500: "#69748A",
  n600: "#4D5870",
  n700: "#353F55",
  n800: "#1F2940",
  n900: "#0F172E",
} as const;

export const fheSemantic = {
  success: { 50: "#ECFDF3", 100: "#D1FADF", 500: "#12B76A", 700: "#027A48" },
  warning: { 50: "#FFFAEB", 100: "#FEF0C7", 500: "#F79009", 700: "#B54708" },
  error: { 50: "#FEF3F2", 100: "#FEE4E2", 500: "#EF4444", 700: "#B42318" },
  info: { 50: "#EFF6FF", 100: "#DBEAFE", 500: "#2563EB", 700: "#1849A9" },
} as const;

export const fheRadii = {
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  pill: "999px",
} as const;

export const fheSpacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export const fheShadows = {
  xs: "0 1px 2px rgba(11, 29, 58, 0.06)",
  sm: "0 1px 3px rgba(11, 29, 58, 0.08), 0 1px 2px rgba(11, 29, 58, 0.04)",
  md: "0 4px 12px rgba(11, 29, 58, 0.08), 0 2px 4px rgba(11, 29, 58, 0.04)",
  lg: "0 12px 28px rgba(11, 29, 58, 0.12), 0 4px 8px rgba(11, 29, 58, 0.05)",
  xl: "0 24px 48px rgba(11, 29, 58, 0.16)",
  focus: "0 0 0 4px rgba(37, 99, 235, 0.18)",
} as const;

export const fheFonts = {
  head: '"Poppins", "Helvetica Neue", Arial, sans-serif',
  body: '"Inter", "Helvetica Neue", Arial, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
} as const;
