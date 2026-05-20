import { BRAND_COLORS } from "@/constants/brand-colors";

/**
 * Glass-disc lens compositions aligned to monopo *_web3dasset loops
 * (challenge, collaborate, integrate). Each panel: emissive 3D letters
 * behind one or more static thin tinted discs that magnify and colour-bleed
 * the type. WebGL orb ramp only - see brand.md.
 */

export type DiscPaletteKey = "forest" | "amber" | "stone";

export const DISC_TINTS: Record<DiscPaletteKey, string> = {
  forest: "#7fc4b0",
  amber: BRAND_COLORS.orbFlare,
  stone: "#b4bac0",
};

/**
 * Per-palette attenuation distance. Challenge stone is almost clear
 * (rim only); collaborate amber carries a visible warm body tint.
 */
export const DISC_ATTENUATION: Record<DiscPaletteKey, number> = {
  stone: 5.5,
  amber: 1.55,
  forest: 2.1,
};

export type DiscRole = "primary" | "satellite";

export type DiscConfig = {
  /** Fixed world position. Lens does not orbit (monopo static magnifier). */
  position: readonly [number, number, number];
  radius: number;
  palette: DiscPaletteKey;
  role?: DiscRole;
};

export type LetterformConfig = {
  text: string;
  emissive: string;
  emissiveIntensity: number;
  fontSize: number;
  extrudeDepth: number;
  position: readonly [number, number, number];
  /** Slow drift so magnified slices sweep across the static lens. */
  driftSpeed: number;
  driftX: number;
  driftY: number;
};

export type BlobComposition = {
  loopPeriodSec: number;
  letterform: LetterformConfig;
  discs: readonly DiscConfig[];
};

export const DISC_TRANSMISSION = {
  primary: { samples: 16, resolution: 1024 },
  satellite: { samples: 12, resolution: 768 },
} as const;

/** FBO resolution for react-bits style buffer sampling on the disc. */
export const DISC_LENS_FBO = {
  width: 1024,
  height: 1024,
} as const;

/** Typeface JSON for extruded TextGeometry (prototype stand-in for DM Sans). */
export const BLOB_FONT_URL = "/fonts/helvetiker_regular.typeface.json";

/** Thin-lens squash on flattened sphere geometry (not a thick orb). */
export const DISC_FLAT_SCALE = 0.028;

const DD_LETTER_BASE = {
  text: "DD",
  fontSize: 1.15,
  extrudeDepth: 0.2,
  position: [0, 0, -0.55] as const,
  driftSpeed: 0.12,
  driftX: 0.22,
  driftY: 0.06,
};

/**
 * A = integrate (8.04s): forest + amber + stone satellites
 * B = collaborate (8.04s): large amber + forest satellite
 * C = challenge (4.84s): single stone disc, slow horizontal letter drift
 */
export const BLOB_COMPOSITIONS: Record<"A" | "B" | "C", BlobComposition> = {
  A: {
    loopPeriodSec: 8.04,
    letterform: {
      ...DD_LETTER_BASE,
      emissive: "#dff5b0",
      emissiveIntensity: 2.4,
    },
    discs: [
      {
        position: [-0.15, -0.05, 0.38],
        radius: 1.05,
        palette: "forest",
        role: "primary",
      },
      {
        position: [0.75, 0.5, 0.34],
        radius: 0.38,
        palette: "amber",
        role: "satellite",
      },
      {
        position: [0.45, -0.42, 0.3],
        radius: 0.58,
        palette: "stone",
        role: "satellite",
      },
    ],
  },

  B: {
    loopPeriodSec: 8.04,
    letterform: {
      ...DD_LETTER_BASE,
      emissive: "#ffe2a8",
      emissiveIntensity: 2.6,
      driftSpeed: 0.1,
      driftX: 0.18,
    },
    discs: [
      {
        position: [0.05, 0.0, 0.4],
        radius: 1.22,
        palette: "amber",
        role: "primary",
      },
      {
        position: [-0.48, -0.42, 0.3],
        radius: 0.48,
        palette: "forest",
        role: "satellite",
      },
    ],
  },

  C: {
    loopPeriodSec: 4.84,
    letterform: {
      ...DD_LETTER_BASE,
      emissive: "#dff5b0",
      emissiveIntensity: 2.3,
      driftSpeed: 0.08,
      driftX: 0.32,
      driftY: 0.02,
    },
    discs: [
      {
        position: [0.05, 0.0, 0.36],
        radius: 0.92,
        palette: "stone",
        role: "primary",
      },
    ],
  },
};

export const SCENE = {
  cameraZ: 4.5,
  cameraFov: 32,
  maxDevicePixelRatio: 2,
  toneMappingExposure: 1.05,
} as const;
