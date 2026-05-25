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
    rotationZ: 0.08,
    scale: 2.3,
  },
  meshSecondary: {
    position: [1.7, -0.5, -0.4] as const,
    rotationZ: -0.12,
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

/**
 * Grainient backdrop palette - the animated grainy gradient that sits BEHIND
 * the hero "DD" forms. Sampled from monopo.vn's own hero (a dark, filmic
 * gradient flowing sage-green -> warm-amber -> rust-red over near-black).
 *
 * NOTE: this is a deliberate departure from the brand.md "pure black hero"
 * rule, requested explicitly. Like HERO_LIQUID_METAL_PALETTE, these values
 * exist ONLY for this WebGL surface - never for type, UI, or CSS washes.
 *
 *  - highlight: the bright ridge tint (uColor1 / "lav" slot)
 *  - mid:       the dominant flowing band (uColor2 / "org" slot)
 *  - base:      the dark valleys, kept near-black so the metal Ds stay legible
 */
export const HERO_GRAINIENT_PALETTE = {
  highlight: "#1a241c",
  mid: "#2e1c08",
  base: "#050302",
} as const;

/**
 * Grainient shader dials. Tuned for monopo.vn's slow, dark, heavily-grained
 * mood (slower drift, lifted contrast + gamma to sink the valleys toward
 * black, slightly desaturated, visible film grain). See reactbits Grainient.
 */
export const HERO_GRAINIENT = {
  timeSpeed: 0.18,
  colorBalance: 0.0,
  warpStrength: 1.0,
  warpFrequency: 5.0,
  warpSpeed: 2.0,
  warpAmplitude: 50.0,
  blendAngle: 0.0,
  blendSoftness: 0.05,
  rotationAmount: 500.0,
  noiseScale: 2.0,
  grainAmount: 0.04,
  grainScale: 1.6,
  grainAnimated: true,
  contrast: 1.7,
  gamma: 2.6,
  saturation: 0.75,
  centerX: 0.0,
  centerY: 0.0,
  zoom: 0.9,
  maxDevicePixelRatio: 2,
} as const;
