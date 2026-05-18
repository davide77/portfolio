import { BRAND_COLORS } from "@/constants/brand-colors";

/**
 * Hero orb palette - verbatim from documents/davide-hero-final.html, sourced
 * from the WebGL-only orb ramp in brand.md / BRAND_COLORS. Core stays pure
 * black by design regardless of any other token.
 */
export const HERO_LIQUID_METAL_PALETTE = {
  core: BRAND_COLORS.orbVoid,
  mid: BRAND_COLORS.orbShadow,
  bright: BRAND_COLORS.orbAmber,
  rim: BRAND_COLORS.orbFlare,
} as const;

/** @deprecated Use HERO_LIQUID_METAL_PALETTE */
export const HERO_ORB_PALETTE = HERO_LIQUID_METAL_PALETTE;

export const HERO_ORB = {
  // Bumped to 3 for sharpness - DO NOT lower (see davide-hero-final.html)
  maxDevicePixelRatio: 3,
  canvasFadeMs: 1200,
  scrollScaleEnd: 0.85,
  mobileBreakpoint: 768,
  cameraFov: 35,
  cameraZ: 8,
  meshPrimary: {
    position: [-1.3, 0.4, 0.3] as const,
    rotationZ: 0.18,
    scale: 2.3,
  },
  meshSecondary: {
    position: [1.7, -0.5, -0.4] as const,
    rotationZ: -0.28,
    scale: 1.8,
  },
} as const;

/** @deprecated Use HERO_ORB */
export const HERO_WEBGL = {
  maxDevicePixelRatio: HERO_ORB.maxDevicePixelRatio,
  layerOpacityFactor: 0.4,
} as const;

/** @deprecated Use HERO_LIQUID_METAL_PALETTE */
export const HERO_WEBGL_PALETTE = {
  ink: BRAND_COLORS.black,
  primary: BRAND_COLORS.primary,
  cream: BRAND_COLORS.cream,
  accent: BRAND_COLORS.accent,
} as const;
