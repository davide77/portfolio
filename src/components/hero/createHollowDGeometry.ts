import polygonClipping, { type Polygon, type Ring } from "polygon-clipping";
import { ExtrudeGeometry, Path, Shape, ShapePath, Vector2, type BufferGeometry } from "three";
import { DM_SANS_D_GLYPH } from "@/constants/dm-sans-d-glyph";

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
};

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

export type HollowDExtrude = Partial<Omit<typeof EXTRUDE, "bevelEnabled">>;

/** `overrides` exists for the glass hero, whose refraction needs a rounder,
 *  deeper bevel than the metal D. The metal D keeps the default. */
export function createHollowDGeometry(overrides: HollowDExtrude = {}): BufferGeometry {
  const geometry = new ExtrudeGeometry(makeDShape(), { ...EXTRUDE, ...overrides });
  geometry.center();
  return geometry;
}

function toRing(points: Vector2[], dx: number): Ring {
  const ring: Ring = points.map((p) => [p.x + dx, p.y]);
  const [fx, fy] = ring[0];
  const [lx, ly] = ring[ring.length - 1];
  if (fx !== lx || fy !== ly) ring.push([fx, fy]);
  return ring;
}

function fromRing(ring: Ring): Vector2[] {
  // polygon-clipping closes each ring by repeating the first point; three
  // closes shapes itself and a duplicate end point leaves a zero-length edge.
  return ring.slice(0, -1).map(([x, y]) => new Vector2(x, y));
}

/**
 * The DD as one fused outline: both D's (outline minus counter) unioned in 2D,
 * so the lockup extrudes as a single solid where the strokes cross instead of
 * two slabs stacked in depth. `separationX` is the distance between the two
 * letters' centres; around 1.25 leaves both counters open as clean holes,
 * tighter spacing chops them into slivers. `divisions` is the sample count
 * per curve segment.
 */
export function createFusedDDShapes(
  separationX: number,
  divisions: number,
  makeShape: () => Shape = makeDShape,
): Shape[] {
  const d = makeShape();
  const outer = d.getPoints(divisions);
  const counter = d.holes[0].getPoints(divisions);
  const letter = (dx: number): Polygon => [toRing(outer, dx), toRing(counter, dx)];

  const fused = polygonClipping.union(letter(-separationX / 2), letter(separationX / 2));
  return fused.map(([ring, ...holes]) => {
    const shape = new Shape(fromRing(ring));
    shape.holes = holes.map((hole) => new Path(fromRing(hole)));
    return shape;
  });
}

/** The fused DD extruded as one solid, centred like createHollowDGeometry. */
export function createFusedDDGeometry(
  separationX: number,
  divisions: number,
  overrides: HollowDExtrude = {},
  makeShape: () => Shape = makeDShape,
): BufferGeometry {
  const shapes = createFusedDDShapes(separationX, divisions, makeShape);
  const geometry = new ExtrudeGeometry(shapes, { ...EXTRUDE, ...overrides });
  geometry.center();
  return geometry;
}

/** Glyph height in world units before scale, matching the hand-drawn D so
 *  spacing values carry over between the two. */
const GLYPH_HEIGHT = 2.4;

/**
 * The DM Sans "D" (see DM_SANS_D_GLYPH) as a three Shape, centred on the
 * origin and scaled to GLYPH_HEIGHT. Parses the absolute M / H / V / L / Q / Z
 * commands the extractor emits; anything else throws, so a re-extraction with
 * a different pen cannot fail silently.
 */
export function makeDMSansDShape(): Shape {
  const { path, capHeight, xMin, xMax } = DM_SANS_D_GLYPH;
  const k = GLYPH_HEIGHT / capHeight;
  const cx = (xMin + xMax) / 2;
  const cy = capHeight / 2;
  const X = (x: number) => (x - cx) * k;
  const Y = (y: number) => (y - cy) * k;

  const shapePath = new ShapePath();
  const tokens = path.match(/[A-Za-z]|-?\d*\.?\d+/g) ?? [];
  let i = 0;
  let x = 0;
  let y = 0;
  const num = () => Number(tokens[i++]);
  while (i < tokens.length) {
    const cmd = tokens[i++];
    switch (cmd) {
      case "M":
        x = num();
        y = num();
        shapePath.moveTo(X(x), Y(y));
        break;
      case "L":
        x = num();
        y = num();
        shapePath.lineTo(X(x), Y(y));
        break;
      case "H":
        x = num();
        shapePath.lineTo(X(x), Y(y));
        break;
      case "V":
        y = num();
        shapePath.lineTo(X(x), Y(y));
        break;
      case "Q": {
        const qx = num();
        const qy = num();
        x = num();
        y = num();
        shapePath.quadraticCurveTo(X(qx), Y(qy), X(x), Y(y));
        break;
      }
      case "Z":
        break;
      default:
        throw new Error(`Unsupported glyph path command: ${cmd}`);
    }
  }

  // TrueType draws outer contours clockwise, which toShapes(false) reads as
  // solid, with the counter as a hole.
  const [shape] = shapePath.toShapes(false);
  return shape;
}

/** The DM Sans D extruded, centred like createHollowDGeometry. */
export function createDMSansDGeometry(overrides: HollowDExtrude = {}): BufferGeometry {
  const geometry = new ExtrudeGeometry(makeDMSansDShape(), { ...EXTRUDE, ...overrides });
  geometry.center();
  return geometry;
}
