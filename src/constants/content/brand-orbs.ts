import { BRAND_COLORS } from "@/constants/brand-colors";

/**
 * Brand orb cluster - Monopo-style glass spheres. One persistent main orb
 * carries a soft glowing word. A pool of small satellites drifts in and out
 * around it with randomised lifecycles, so at any moment 1-2 are visible.
 *
 * Defers to the WebGL-only orb ramp in brand.md (Orb void / shadow / amber /
 * flare). No other surface uses these hexes.
 */

export const BRAND_ORB_MAIN = {
  /** Word whose letters live inside the main glass orb. Override per section. */
  defaultWord: "craft",
  radius: 1.0,
  /**
   * Near-white glass tint so the frosted body stays luminous and the
   * coloured emissive letters inside it read through, rather than being
   * absorbed by a tinted body.
   */
  glassTint: "#ffffff",
  /** drei <Float> drift settings - slow, gentle ambient float. */
  floatSpeed: 0.6,
  floatIntensity: 0.4,
} as const;

export const BRAND_ORB_SATELLITES = {
  /**
   * Two satellites, both always alive. Continuous orbital drift plus an
   * independent scale wave per slot - one is often dominant while the other
   * breathes down to ~40%, giving the "sometimes one, sometimes two" feel
   * without ever fully disappearing.
   */
  slotCount: 2,
  /** Base sphere radius range - the visible size oscillates between waxFloor x this and 1.0 x this. */
  baseRadiusRange: [0.28, 0.42] as const,
  /** Elliptical orbit radius around the main orb. */
  orbitRadiusRange: [0.95, 1.25] as const,
  /** Orbit angular speed in rad/s. Slow. */
  orbitSpeedRange: [0.07, 0.13] as const,
  /** Vertical squash on the orbit (1 = circle, <1 = wider than tall). */
  orbitYLagRange: [0.35, 0.7] as const,
  /** Slow z-bob amplitude so satellites swim in front of and behind the main orb. */
  zBobAmpRange: [0.3, 0.55] as const,
  zBobSpeedRange: [0.05, 0.1] as const,
  /** Scale wave speed in rad/s. Slower than the orbit so it reads as breathing. */
  waxSpeedRange: [0.1, 0.18] as const,
  /**
   * Each satellite spends part of its cycle fully scaled to zero (gone),
   * so the count visibly changes - sometimes both up, sometimes one,
   * sometimes briefly none. The wave is clamped: it sits at 0 for the
   * lower `hiddenCutoff` fraction of the sine, then ramps up. Slots are
   * anti-phased so they rarely vanish together.
   */
  hiddenCutoff: 0.45,
  /** Near-white glass tint so satellites stay bright on dark. */
  glassTint: "#ffffff",
} as const;

export const BRAND_ORB_SCENE = {
  cameraPosition: [0, 0, 5] as const,
  cameraFov: 32,
  maxDevicePixelRatio: 2,
  // Near-invisible CLEAR lens, confirmed against monopo's source video:
  // the sphere is almost fully transparent, you barely see the body - just
  // a faint outline and a bright gold edge. High ior + thickness makes it
  // genuinely magnify AND invert the glowing word on the plane behind it
  // (real glass-ball optics). roughness ~0 keeps the lensed letter clean.
  // No `background` prop (opaque-square bug on transparent canvas).
  transmissionSamples: 16,
  transmissionResolution: 1024,
  glass: {
    transmission: 1,
    thickness: 1.6,
    roughness: 0.0,
    ior: 1.52,
    chromaticAberration: 0.05,
    anisotropy: 0.04,
    attenuationDistance: 60,
    distortion: 0.05,
    distortionScale: 0.1,
    temporalDistortion: 0.015,
  },
  satelliteGlass: {
    transmission: 1,
    thickness: 1.0,
    roughness: 0.0,
    ior: 1.5,
    chromaticAberration: 0.04,
    anisotropy: 0.04,
    attenuationDistance: 50,
    distortion: 0.04,
    distortionScale: 0.08,
    temporalDistortion: 0.015,
  },
  // The orb's warm internal atmosphere comes from the emissive letters +
  // bloom + the warm rim/fill lights, NOT a backing sphere (that occludes
  // the letters) and NOT the `background` prop (that paints an opaque
  // rectangle on the transparent canvas - the dark-square-halo bug).
  // The emissive letters inside the orb are the bright feature. Moderate
  // bloom blooms them into the soft glowing halo from the reference
  // without blowing the whole orb to white.
  bloom: {
    intensity: 0.9,
    luminanceThreshold: 0.5,
    luminanceSmoothing: 0.6,
    mipmapBlur: true,
  },
  // Strong warm rim light. In the reference the orb has a bright crisp gold
  // ring around its whole edge - that is a powerful warm source the clear
  // glass catches at the grazing edge.
  rimLight: {
    position: [-3.5, 3, 3.5] as const,
    color: BRAND_COLORS.orbFlare,
    intensity: 9,
  },
  // Warm counter from the lower-right so the gold rim wraps most of the
  // circumference (reference rim is nearly full, not a single arc).
  fillLight: {
    position: [3.5, -2, 2] as const,
    color: BRAND_COLORS.orbAmber,
    intensity: 3,
  },
  // Brighter environment so the clear glass body has a luminous gold sheen
  // and a strong edge highlight, not a dark transparent shell.
  environmentIntensity: 1.1,
  lightformers: [
    {
      // Bright amber wall, top-left - the dominant gold reflection / rim.
      form: "rect" as const,
      color: BRAND_COLORS.orbFlare,
      intensity: 5,
      position: [-2, 2, 3] as const,
      scale: [5, 5, 1] as const,
      rotation: [0, Math.PI / 6, 0] as const,
    },
    {
      // Amber ring-wrap on the opposite side so the gold rim continues
      // around most of the orb instead of dying on the dark side.
      form: "ring" as const,
      color: BRAND_COLORS.orbAmber,
      intensity: 3,
      position: [2.5, -1, 2.5] as const,
      scale: [4, 4, 1] as const,
      rotation: [0, -Math.PI / 4, 0] as const,
    },
  ],
  // The big glowing word fixed on the background plane BEHIND the lens
  // (NOT parented to the orb). It glows on its own (emissive + bloom),
  // slowly drifts, and the clear orb refracts it into a magnified +
  // inverted bright slice as it passes over - the real monopo lens effect
  // confirmed against collaborate_web3dasset.webm.
  backgroundWord: {
    // Glyphs shown at once. Two reads like the "op"/"no" pairs in the video.
    glyphCount: 2,
    // World units. Big - the word fills the frame and bleeds well past the
    // orb on all sides, exactly like the source video.
    fontSize: 2.8,
    // Set back behind the orb so the lens has depth to magnify/invert
    // across. The orb centre is z~0; this plane sits clearly behind it.
    zOffset: -1.2,
    letterSpacing: -0.05,
    // Raw emissive multiplier (toneMapped:false) so the word is the hot
    // feature bloom expands into the soft glow.
    emissiveIntensity: 5,
    // Slow independent drift so different letters sweep under the lens.
    driftSpeed: 0.18,
    driftX: 0.55,
    driftY: 0.22,
    // Colour ramp the word cross-fades through. All WebGL-orb-ramp
    // (brand.md) - green kept per request, monopo's other assets use it.
    colorCycle: [
      BRAND_COLORS.orbGlow,
      BRAND_COLORS.orbFlare,
      BRAND_COLORS.orbAmber,
    ] as const,
    // Seconds per full colour-cycle pass. Slow, ambient.
    cycleSeconds: 14,
  },
} as const;

export const BRAND_ORBS_SHOWCASE_COPY = {
  eyebrow: "Brand orbs",
  headline: "Words, refracted through clear glass.",
  description:
    "A clear glass orb with a bright gold rim and the words behind the work glowing inside, colour shifting as it drifts. Smaller bubbles float in and out around it. Built with react-three-fiber. Pauses off-screen and honours reduced motion.",
} as const;
