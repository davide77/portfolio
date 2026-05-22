import { BRAND_COLORS } from "@/constants/brand-colors";
import type { LabLetter } from "@/components/hero/createLabLetterGeometries";

/**
 * /lab hero - L A B constellation. Three extruded letters in different sizes,
 * arranged left-to-right with parallax z-offset. Two palettes:
 * - warm: same liquid-metal ramp as the home hero (orb-amber / orb-flare).
 * - glow: brand.md-sanctioned green refraction (orb-glow). Carved out for
 *   the lab cluster only, never for the home hero, type, UI, or washes.
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
  letter: LabLetter;
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
      letter: "L",
      position: [-2.6, 0.4, 0.3] as const,
      rotationZ: 0.12,
      scale: 1.55,
      palette: "warm",
      wobbleSeed: 0.0,
    },
    {
      letter: "A",
      position: [-0.1, -0.5, -0.4] as const,
      rotationZ: -0.08,
      scale: 1.0,
      palette: "glow",
      wobbleSeed: 2.3,
    },
    {
      letter: "B",
      position: [2.3, 0.7, -0.1] as const,
      rotationZ: 0.18,
      scale: 1.3,
      palette: "warm",
      wobbleSeed: 4.6,
    },
  ] as const satisfies readonly LabOrbInstance[],
} as const;
