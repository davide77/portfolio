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
 * "DD": two D's stacked so the front one sits over the back one in
 * perspective. Both face the camera; the front D is pushed toward the camera
 * along Z and nudged up + sideways so the back D's outline reads beneath it.
 */
export function createDoubleDGeometry({
  height,
  stroke,
  depth,
  bowlWeight,
}: DGeometryOptions): BufferGeometry {
  const back = new ExtrudeGeometry(
    dShape({ height, stroke, bowlWeight }),
    dExtrudeOptions(depth),
  );
  const front = new ExtrudeGeometry(
    dShape({ height, stroke, bowlWeight }),
    dExtrudeOptions(depth),
  );

  // Back D sits centred on the origin, raised + nudged right. Front D stays
  // forward of it on Z but lower + further left, so it reads as resting in
  // front of the back D in perspective.
  const offsetX = stroke * 1.2;
  const offsetY = height * 0.18;
  const offsetZ = depth * 1.6;
  back.translate(offsetX, offsetY, 0);
  front.translate(0, 0, offsetZ);

  const merged = mergeGeometries([back, front], false);
  if (!merged) {
    back.dispose();
    front.dispose();
    throw new Error("Failed to merge DD geometries");
  }
  merged.center();
  merged.computeVertexNormals();
  back.dispose();
  front.dispose();
  return merged;
}
