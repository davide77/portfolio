/**
 * Brand hex values for JS-only surfaces (OG images, WebGL). Mirror brand.md / _colors.scss.
 */
export const BRAND_COLORS = {
  black: "#101214",
  ink2: "#1a1d20",
  white: "#ffffff",
  primary: "#2a6b5e",
  cream: "#f5f1ea",
  stoneGray: "#6f6a63",
  accent: "#c45c3e",
  // Hero orb WebGL shader ramp only - never type/UI/washes. See brand.md.
  orbVoid: "#000000",
  orbShadow: "#2c1505",
  orbAmber: "#d07a25",
  orbFlare: "#ffc080",
  // Approved WebGL-only deviation (2026-05-19), /lab brand-orb cluster. See brand.md.
  orbGlow: "#a8d66a",
  text: "#101214",
  textMuted: "#6f6a63",
  border: "#e0dbd4",
} as const;
