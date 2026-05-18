import { ExtrudeGeometry, Path, Shape, type BufferGeometry } from "three";

/**
 * Exact extrude from documents/davide-hero-final.html.
 * SMALL bevel (0.06) - large bevels soften the edges. Do NOT increase.
 */
const EXTRUDE = {
  depth: 0.5,
  bevelEnabled: true,
  bevelSegments: 6,
  bevelSize: 0.06,
  bevelThickness: 0.06,
  curveSegments: 40,
} as const;

/** D outline + counter, verbatim from documents/davide-hero-final.html. */
function makeDShape(): Shape {
  const shape = new Shape();
  shape.moveTo(-0.7, 1.2);
  shape.lineTo(-0.1, 1.2);
  shape.bezierCurveTo(0.55, 1.2, 1.0, 0.65, 1.0, 0);
  shape.bezierCurveTo(1.0, -0.65, 0.55, -1.2, -0.1, -1.2);
  shape.lineTo(-0.7, -1.2);
  shape.lineTo(-0.7, 1.2);

  const hole = new Path();
  hole.moveTo(-0.35, 0.82);
  hole.lineTo(-0.1, 0.82);
  hole.bezierCurveTo(0.3, 0.82, 0.65, 0.45, 0.65, 0);
  hole.bezierCurveTo(0.65, -0.45, 0.3, -0.82, -0.1, -0.82);
  hole.lineTo(-0.35, -0.82);
  hole.lineTo(-0.35, 0.82);
  shape.holes.push(hole);

  return shape;
}

export function createHollowDGeometry(): BufferGeometry {
  const geometry = new ExtrudeGeometry(makeDShape(), EXTRUDE);
  geometry.center();
  return geometry;
}
