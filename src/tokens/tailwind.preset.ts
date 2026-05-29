/**
 * @fhe/brand · Tailwind 4 preset
 * Use in apps/hq/tailwind.config.* via:
 *
 *   import fhePreset from "@fhe/brand/tailwind.preset";
 *   export default { presets: [fhePreset] };
 *
 * Tailwind 4 prefers CSS-based theme tokens via @theme blocks; this preset
 * stays minimal and lets tokens.css carry the source of truth.
 */
import type { Config } from "tailwindcss";
import {
  fheBrand,
  fheNeutrals,
  fheSemantic,
  fheRadii,
  fheShadows,
  fheFonts,
} from "./index";

const fhePreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        navy: fheBrand.navy,
        "navy-700": fheBrand.navy700,
        "navy-600": fheBrand.navy600,
        blue: fheBrand.blue,
        "blue-600": fheBrand.blue600,
        "blue-400": fheBrand.blue400,
        "light-blue": fheBrand.lightBlue,
        "soft-blue": fheBrand.softBlue,
        "off-white": fheBrand.offWhite,
        n: fheNeutrals,
        success: fheSemantic.success,
        warning: fheSemantic.warning,
        error: fheSemantic.error,
        info: fheSemantic.info,
      },
      fontFamily: {
        head: fheFonts.head.split(", "),
        body: fheFonts.body.split(", "),
        mono: fheFonts.mono.split(", "),
      },
      borderRadius: fheRadii,
      boxShadow: fheShadows,
    },
  },
};

export default fhePreset;
