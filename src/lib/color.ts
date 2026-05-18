import { Vector3 } from "three";

/** Brand hex string to linear-ish 0-1 RGB for WebGL uniforms. */
export function hexToUnitRgb(hex: string): Vector3 {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

/** Blend two brand hex colours; returns 0-1 RGB for shaders. */
export function mixHexRgb(a: string, b: string, t: number): Vector3 {
  const va = hexToUnitRgb(a);
  const vb = hexToUnitRgb(b);
  return new Vector3(
    va.x + (vb.x - va.x) * t,
    va.y + (vb.y - va.y) * t,
    va.z + (vb.z - va.z) * t,
  );
}

/** Blend two hex colours; returns `#rrggbb` for THREE.Color. */
export function mixHex(a: string, b: string, t: number): string {
  const v = mixHexRgb(a, b, t);
  const r = Math.round(v.x * 255);
  const g = Math.round(v.y * 255);
  const bl = Math.round(v.z * 255);
  return `#${[r, g, bl].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
