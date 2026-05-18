/**
 * Hero WebGL backdrop tuning. Colours mirror `brand.md` / `_colors.scss` (ink, forest, paper, signal).
 * Change visuals here, not in the shader strings, when the palette updates.
 */
export const HERO_WEBGL_PALETTE = {
  ink: "#101214",
  primary: "#2a6b5e",
  cream: "#f5f1ea",
  accent: "#c45c3e",
} as const;

export const HERO_WEBGL = {
  /** Caps GPU cost on retina displays */
  maxDevicePixelRatio: 1.75,
  /** Layer opacity scales with `--brand-atmosphere-strength` in SCSS */
  layerOpacityFactor: 0.4,
} as const;
