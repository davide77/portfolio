import { BRAND_COLORS } from "@/constants/brand-colors";

/**
 * /lab hero - 5-orb constellation. Two palettes:
 * - warm: same liquid-metal ramp as the home hero (orb-amber / orb-flare).
 * - glow: brand.md-sanctioned green refraction (orb-glow). Carved out for
 *   the lab cluster only, never for the home hero, type, UI, or washes.
 *
 * Orbs are spread across the canvas with varied z-offset for parallax depth.
 * Two of the five render with the glow palette; the other three keep warm.
 */

export const LAB_HERO_PALETTE_WARM = {
  core: BRAND_COLORS.orbVoid,
  mid: BRAND_COLORS.orbShadow,
  bright: BRAND_COLORS.orbAmber,
  rim: BRAND_COLORS.orbFlare,
} as const;

export const LAB_HERO_PALETTE_GLOW = {
  core: BRAND_COLORS.orbVoid,
  mid: BRAND_COLORS.orbShadow,
  bright: BRAND_COLORS.orbGlow,
  rim: BRAND_COLORS.orbGlow,
} as const;

export type LabOrbPalette = "warm" | "glow";

export type LabOrbInstance = {
  position: readonly [number, number, number];
  rotationZ: number;
  scale: number;
  palette: LabOrbPalette;
  wobbleSeed: number;
};

export const LAB_HERO = {
  cameraFov: 38,
  cameraZ: 9,
  scrollScaleEnd: 0.9,
  maxDevicePixelRatio: 3,
  canvasFadeMs: 1000,
  orbs: [
    {
      position: [-2.4, 0.8, 0.4] as const,
      rotationZ: 0.22,
      scale: 1.4,
      palette: "warm",
      wobbleSeed: 0.0,
    },
    {
      position: [-0.6, -0.9, -0.6] as const,
      rotationZ: -0.32,
      scale: 1.1,
      palette: "glow",
      wobbleSeed: 1.7,
    },
    {
      position: [0.9, 1.1, 0.2] as const,
      rotationZ: 0.08,
      scale: 0.9,
      palette: "warm",
      wobbleSeed: 3.1,
    },
    {
      position: [2.2, -0.3, -0.3] as const,
      rotationZ: -0.18,
      scale: 1.25,
      palette: "glow",
      wobbleSeed: 4.6,
    },
    {
      position: [0.2, 0.1, -1.2] as const,
      rotationZ: 0.4,
      scale: 0.7,
      palette: "warm",
      wobbleSeed: 6.2,
    },
  ] as const satisfies readonly LabOrbInstance[],
} as const;
