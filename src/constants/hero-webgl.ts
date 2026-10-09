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
  // Headline word reveal waits this long after the canvas reports ready,
  // so the words land as the orb fades in rather than after it.
  headlineAfterCanvasMs: 600,
  // Safety net if the canvas never reports ready (WebGL off, slow GPU).
  headlineFallbackMs: 1600,
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
export const HERO_VARIANT: "orb" | "flowfield" | "glass" = "glass";

/**
 * Glass hero (monopo.vn register): a domain-warped field of olive and amber
 * pooling into near-black, a hero-size clear-glass DD refracting it, and a
 * device-pixel film grain over the lot. The glass carries no tint of its own;
 * every colour it shows is the field bent through it.
 *
 * Palette sampled from monopo.vn's hero frames. WebGL-only, like the orb ramp.
 */
export const HERO_GLASS_FIELD_PALETTE = {
  void: "#050504",
  olive: "#56694a",
  amber: "#c08d4e",
  highlight: "#e2c08a",
} as const;

export const HERO_GLASS_FIELD = {
  /** Field sits behind the glass so the plane never slices through the DD. */
  planeZ: -3,
  /** Noise space per unit of viewport height. Lower = larger, slower forms. */
  scale: 0.42,
  /** uTime advance per second. */
  timeSpeed: 0.11,
  /** smoothstep range on the warped noise that becomes black pools. Raise the
   *  low edge for more black. ~40% of the frame should read near-black. */
  poolLow: 0.44,
  poolHigh: 0.74,
  /** How far the pointer pushes the warp. */
  pointerWarp: 0.22,
  pointerLerp: 0.03,
  /** Load reveal: the field opens out of black over this many seconds. */
  revealSec: 2.6,
  /** Soft glow kept behind the DD so the glass always has colour to bend,
   *  even when a black pool drifts across it. Centre comes from
   *  HERO_GLASS_DD.offset; radius is in viewport heights. */
  focusLift: 0.38,
  focusInner: 0.08,
  focusOuter: 0.62,
} as const;

export const HERO_GLASS_DD = {
  /** Lockup height as a share of viewport height, capped by widthFrac of the
   *  viewport width. On portrait screens the width cap wins and the whole DD
   *  stays readable; cropping it there left only loose arcs. */
  heightFrac: 0.76,
  widthFrac: 1.02,
  /** Lockup centre, as a share of the viewport from the middle. */
  offset: [0.1, -0.03] as const,
  /** Distance between the two D centres, in glyph units (a D is 1.7 wide).
   *  The letters are unioned into one outline. At ~1.25 the strokes fuse
   *  where they cross and both counters stay open; at 0.92 the overlap chops
   *  the counters into slivers. */
  separationX: 1.25,
  /** Samples per curve segment when the outline is flattened for the union. */
  outlineDivisions: 96,
  /** Rounded bevel: the curved edge is where the glass bends the field and
   *  catches its rim. Kept moderate because the fused outline has tight
   *  inside corners where the strokes cross, and a wide bevel folds there. */
  extrude: {
    depth: 0.5,
    bevelSize: 0.12,
    bevelThickness: 0.3,
    bevelSegments: 16,
  },
  /** Vertex weld distance for smooth normals, in glyph units. */
  weldTolerance: 1e-4,
  material: {
    samples: 8,
    /** Refraction buffer size. undefined = match the canvas pixel for pixel.
     *  Any fixed square (even 2048) gets magnified onto a wide 2x canvas and
     *  the bevel rims step visibly. */
    resolution: undefined,
    thickness: 1.4,
    roughness: 0.06,
    ior: 1.32,
    chromaticAberration: 0.05,
    anisotropicBlur: 0.08,
    envMapIntensity: 0.55,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    /** Faint warm dimming through the body so the open counters read as
     *  holes against it. Lower distance = darker glass. */
    attenuationColor: "#bdb1a0",
    attenuationDistance: 4.5,
  },
  /** Soft studio lights baked into the environment map: they give the glass
   *  its thin bright rim. Warm key top-left, amber fill bottom-right, a faint
   *  olive bounce from behind. */
  lights: [
    { form: "rect", intensity: 2.4, color: "#fff3e0", position: [-5, 4, 4], scale: [8, 1.2, 1] },
    { form: "rect", intensity: 1.2, color: "#e3b072", position: [6, -3, 3], scale: [6, 1, 1] },
    { form: "circle", intensity: 0.8, color: "#b9c9a4", position: [0, 6, -4], scale: [4, 4, 1] },
  ],
  /** Rendered once. At 256 the thin rim highlight steps visibly. */
  envResolution: 1024,
  revealSec: 2.4,
  /** Starting yaw for the reveal turn, radians. */
  revealYaw: -0.45,
  idleYaw: 0.1,
  idleSpeed: 0.18,
  parallaxTilt: 0.14,
  pointerLerp: 0.04,
  /** Lighter refraction on small screens. */
  mobile: { samples: 4, resolution: undefined },
} as const;

/** Film grain over the whole WebGL hero: one device pixel, single-colour,
 *  added in display space so blacks carry it as much as highlights.
 *  amount 0.08 measures ~8 neighbour-diff sd at 2x, matching monopo.vn. */
export const HERO_GRAIN = {
  amount: 0.08,
  fps: 24,
} as const;

/** DPR cap for the glass hero. Full-screen transmission at 3x is too heavy. */
export const HERO_GLASS_MAX_DPR = 2;

/** DPR the glass hero falls back to when PerformanceMonitor reports the
 *  device cannot hold the frame rate. */
export const HERO_GLASS_MIN_DPR = 1.25;

/**
 * Flow-field plane palette. Reuses the sanctioned WebGL-orb carve-out tokens
 * (never type/UI/CSS): sage ridges + amber accents over near-black valleys.
 * Sampled to echo monopo.vn's marbling without importing its olive/amber.
 */
export const HERO_FLOWFIELD_PALETTE = {
  // Monopo hero exact palette: olive + amber marbling (screenshot 1 target).
  baseFirst: "#789E71", // olive - monopo uBaseFirstColor
  baseSecond: "#E09442", // amber flowing band - monopo uBaseSecondColor
  accent: "#000000", // black ridge accents - monopo uAccentColor
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
  // Monopo hero exact dials (screenshot 1): full-colour vivid marbling, not the
  // crushed-dark filmic wash. accentOpacity/opacityBackground match the original.
  accentOpacity: 1,
  noiseIntensity: 0,
  opacityBackground: 0.8,
  /** Crush the marbling toward black (0 = full colour, 1 = fully squared). */
  darkness: 0,
  /** Radial vignette strength - sinks the centre so glow lives at the edges. */
  vignette: 0,
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
  /** Group base position, in world units. The camera has a fixed vertical fov
   *  (35 at z 8), so it always shows 5.04 world units of height whatever the
   *  viewport: world y = (0.5 - screenFraction) * 5.04, and the mark's height
   *  as a share of the viewport is constant. That is what makes one value
   *  safe across breakpoints.
   *
   *  The mark crowns the text block instead of sitting behind it. At
   *  lower-right it fell through the last two headline lines and the brand
   *  band, so it read as a smudge behind the type rather than a mark.
   *
   *  The band it has to fit is measured from the topbar's CENTRE column, not
   *  the topbar's full height: only the "Product Engineer · London" tagline is
   *  centred (bottom ~5%), while the wordmark and nav links sit hard left and
   *  right, so a centred mark never meets them. Clear band by viewport:
   *  1440x900 5.3-34.4%, 1280x720 5.3-30.5%, 390x844 4.1-37.3%. Centring the
   *  mark at 18.5% clears every one, tightest being 720px-tall laptops. */
  groupPosition: [0, 1.59, 0] as const,
  /** The two D's interlock rather than sitting apart. The glyph is 1.7 world
   *  units wide before scale and the meshes sit at +/-0.46, so the front D
   *  overlaps the back one's bowl by ~0.39 either side. That is the intended
   *  lockup, not a gap: push separationX past 1.7 and they separate into two
   *  loose letters. separationZ keeps the front D reading as the nearer form. */
  separationX: 0.92,
  separationZ: 0.22,
  /** Geometry is 2.4 world units tall before scale, so the mark takes
   *  2.4 * scale / 5.04 of the viewport height. 0.36 puts it at 17.1%, which
   *  fits the 25.2% band on the tightest viewport with room either side.
   *  Raising this past ~0.45 starts clipping the eyebrow at 1280x720. */
  scale: 0.36,
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
