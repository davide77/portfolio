import {
  ExtrudeGeometry,
  Path,
  Shape,
  type BufferGeometry,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

type DGeometryOptions = {
  /** Total height of the D outline in scene units. */
  height: number;
  /** Stroke thickness of the vertical spine. */
  stroke: number;
  /** Extrusion depth (front-to-back thickness). */
  depth: number;
  /**
   * Multiplier applied to the bowl's stroke thickness. 1 = uniform with the
   * spine, >1 thickens the curve so it visually matches the straight spine.
   */
  bowlWeight?: number;
};

function dExtrudeOptions(depth: number) {
  return {
    depth,
    bevelEnabled: true,
    bevelThickness: depth * 0.12,
    bevelSize: depth * 0.08,
    bevelOffset: 0,
    bevelSegments: 4,
    curveSegments: 96,
    steps: 1,
  } as const;
}

/**
 * Capital "D" as a closed Shape with a hollow bowl.
 *
 * Outer path is counter-clockwise so ExtrudeGeometry treats it as a filled
 * region; the inner hole is wound clockwise via THREE.Path so it gets cut.
 *
 * The spine sits at x = 0; the bowl bulges into positive x. The Y range is
 * [-halfH, halfH]; X range is [0, halfH].
 */
function dShape({
  height,
  stroke,
  bowlWeight = 1,
}: {
  height: number;
  stroke: number;
  bowlWeight?: number;
}): Shape {
  const halfH = height / 2;
  const bowlStroke = stroke * bowlWeight;
  // Inner cavity: spine width stays = `stroke` (gap from x=0 to x=stroke),
  // but the bowl's curved part is thickened by shrinking the hole's radius
  // and the top/bottom inner extent by `bowlStroke` instead of `stroke`.
  const innerHalfH = halfH - bowlStroke;
  const innerR = halfH - bowlStroke;

  const outer = new Shape();
  outer.moveTo(0, -halfH);
  outer.lineTo(0, halfH);
  outer.absarc(0, 0, halfH, Math.PI / 2, -Math.PI / 2, true);

  // Hole: traced clockwise (the opposite winding) so ExtrudeGeometry cuts it.
  const hole = new Path();
  hole.moveTo(stroke, -innerHalfH);
  hole.absarc(stroke, 0, innerR, -Math.PI / 2, Math.PI / 2, false);
  hole.lineTo(stroke, -innerHalfH);
  outer.holes.push(hole);

  return outer;
}

/**
 * "DD": two D's facing the same way, set side by side. Each glyph's spine sits
 * on the left, bowl bulges right, reading as "DD".
 */
export function createDoubleDGeometry({
  height,
  stroke,
  depth,
  bowlWeight,
}: DGeometryOptions): BufferGeometry {
  const width = height / 2;
  const gap = stroke * 0.6;

  const first = new ExtrudeGeometry(
    dShape({ height, stroke, bowlWeight }),
    dExtrudeOptions(depth),
  );
  const second = new ExtrudeGeometry(
    dShape({ height, stroke, bowlWeight }),
    dExtrudeOptions(depth),
  );

  first.translate(-(width + gap / 2), 0, 0);
  second.translate(gap / 2, 0, 0);

  const merged = mergeGeometries([first, second], false);
  if (!merged) {
    first.dispose();
    second.dispose();
    throw new Error("Failed to merge DD geometries");
  }
  merged.center();
  merged.computeVertexNormals();
  first.dispose();
  second.dispose();
  return merged;
}
