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

/**
 * Flow-field hero variant (monopo.vn technique, re-skinned to this brand).
 * Set HERO_VARIANT to "flowfield" to render the marbling plane + glass-D
 * monogram + film grain instead of the liquid-metal orb. The orb stays the
 * default and fully reachable; this is an in-repo A/B, not a replacement.
 */
export const HERO_VARIANT: "orb" | "flowfield" = "flowfield";

/**
 * Flow-field plane palette. Reuses the sanctioned WebGL-orb carve-out tokens
 * (never type/UI/CSS): sage ridges + amber accents over near-black valleys.
 * Sampled to echo monopo.vn's marbling without importing its olive/amber.
 */
export const HERO_FLOWFIELD_PALETTE = {
  baseFirst: BRAND_COLORS.orbVoid, // dark valleys, keeps the Ds legible
  baseSecond: BRAND_COLORS.orbGlow, // sage flowing band
  accent: BRAND_COLORS.orbAmber, // amber ridge accents
} as const;

/**
 * Flow-field shader dials - restrained, dark, filmic register (matches the
 * real monopo.vn hero: amber/sage glow bleeding out of near-black, mostly at
 * the edges, centre nearly black). accentOpacity is pulled well below 1 and
 * opacityBackground kept low so the marbling reads as a subtle wash over
 * hero-void, not a full-bleed lava lamp.
 */
export const HERO_FLOWFIELD = {
  baseFrequency: 2.6,
  accentOpacity: 0.55,
  noiseIntensity: 0,
  opacityBackground: 0.6,
  /** Crush the marbling toward black (0 = full colour, 1 = fully squared). */
  darkness: 0.72,
  /** Radial vignette strength - sinks the centre so glow lives at the edges. */
  vignette: 0.85,
  zoom: 0.2,
  /** uTime advance per second (frame-rate independent). */
  timeSpeed: 0.42,
  /** On-load bloom timeline (seconds): 0->0.25 then 0.25->1. */
  bloomStageSec: 2,
  /** Film-grain opacity for the postprocessing Noise pass. */
  grainOpacity: 0.06,
} as const;

/** Glass-D monogram (refraction letters) transform + material dials. */
export const HERO_GLASS_MONOGRAM = {
  /** MeshTransmissionMaterial dials - frosted warm glass. */
  transmission: 0.92,
  thickness: 1.6,
  roughness: 0.28,
  ior: 1.45,
  chromaticAberration: 0.06,
  /** Refraction quality + distortion (frosted-glass depth). */
  samples: 6,
  resolution: 512,
  anisotropy: 0.4,
  distortion: 0.35,
  distortionScale: 0.4,
  temporalDistortion: 0.15,
  /** Dark backdrop the glass samples where the flow-field is not behind it. */
  background: BRAND_COLORS.orbVoid,
  /** Group base position. Offset down + right so both D's clear the headline
   *  and read as a distinct "DD", echoing monopo's off-text glass mark while
   *  staying subtle. */
  groupPosition: [0.95, -1.05, 0] as const,
  /** Two D's as a clear "DD": separation must EXCEED the glyph width (~0.71 at
   *  this scale) so they sit side-by-side with a small gap, not occluding each
   *  other. Small z-offset so the front D still overlaps the back one's edge. */
  separationX: 0.92,
  separationZ: 0.22,
  scale: 0.42,
  revealSec: 1.5,
  idleYaw: 0.07,
  idleFloat: 0.012,
  parallaxTilt: 0.12,
  parallaxShift: 0.05,
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
