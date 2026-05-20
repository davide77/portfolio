/**
 * Scene + shader defaults for the monopo lab reproduction.
 * Technique ported from nemutas/r3f-monopo (personal learning / lab use).
 */

export const MONOPO_SCENE = {
  maxDevicePixelRatio: 2,
  cameraFov: 50,
  cameraZ: 1.3,
  clearColor: "#eeeeee",
  backgroundRadius: 1.5,
  backgroundDetail: 20,
} as const;

export const MONOPO_BACKGROUND = {
  patternScale: 0.1,
  patternBias1: 0.5,
  patternBias2: 0.1,
  firstColor: "#789e71",
  secondColor: "#e09442",
  accentColor: "#000000",
  timeStep: 0.01,
} as const;

export const MONOPO_LENS = {
  refractionRatio: 1.02,
  fresnelBias: 0.1,
  fresnelScale: 2,
  fresnelPower: 1,
  radius: 0.4,
  detail: 20,
  timeStep: 0.01,
  lookAtLerp: 0.2,
  /** D-letter spine thickness as a fraction of the bowl radius. */
  dStroke: 0.18,
  /** Extrusion depth for the D / DD glyphs. */
  dDepth: 0.18,
  /** How much heavier the curved bowl stroke is than the spine. */
  dBowlWeight: 1.6,
} as const;

export const MONOPO_POST = {
  /** Film-grain strength. 0.05 matches the reference; lower = subtler. */
  noiseScale: 0.025,
} as const;

