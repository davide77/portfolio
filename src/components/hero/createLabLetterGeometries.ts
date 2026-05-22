import { ExtrudeGeometry, Path, Shape, type BufferGeometry } from "three";

/**
 * Letter geometries for the /lab hero constellation. Same extrude settings as
 * the home-hero hollow-D so all the lab letters share the liquid-metal feel.
 * Each letter is centred so position + scale in the orb config are honest.
 */
const EXTRUDE = {
  depth: 0.5,
  bevelEnabled: true,
  bevelSegments: 6,
  bevelSize: 0.06,
  bevelThickness: 0.06,
  curveSegments: 40,
} as const;

function makeLShape(): Shape {
  const shape = new Shape();
  shape.moveTo(-0.55, 1.2);
  shape.lineTo(-0.15, 1.2);
  shape.lineTo(-0.15, -0.85);
  shape.lineTo(0.7, -0.85);
  shape.lineTo(0.7, -1.2);
  shape.lineTo(-0.55, -1.2);
  shape.lineTo(-0.55, 1.2);
  return shape;
}

function makeAShape(): Shape {
  const shape = new Shape();
  shape.moveTo(-0.85, -1.2);
  shape.lineTo(-0.25, 1.2);
  shape.lineTo(0.25, 1.2);
  shape.lineTo(0.85, -1.2);
  shape.lineTo(0.5, -1.2);
  shape.lineTo(0.32, -0.55);
  shape.lineTo(-0.32, -0.55);
  shape.lineTo(-0.5, -1.2);
  shape.lineTo(-0.85, -1.2);

  const counter = new Path();
  counter.moveTo(-0.22, -0.2);
  counter.lineTo(0.22, -0.2);
  counter.lineTo(0.04, 0.78);
  counter.lineTo(-0.04, 0.78);
  counter.lineTo(-0.22, -0.2);
  shape.holes.push(counter);

  return shape;
}

function makeBShape(): Shape {
  const shape = new Shape();
  shape.moveTo(-0.7, 1.2);
  shape.lineTo(-0.1, 1.2);
  shape.bezierCurveTo(0.45, 1.2, 0.82, 0.85, 0.82, 0.55);
  shape.bezierCurveTo(0.82, 0.28, 0.55, 0.1, 0.18, 0.06);
  shape.bezierCurveTo(0.6, 0.04, 0.92, -0.22, 0.92, -0.6);
  shape.bezierCurveTo(0.92, -0.95, 0.55, -1.2, -0.1, -1.2);
  shape.lineTo(-0.7, -1.2);
  shape.lineTo(-0.7, 1.2);

  const topCounter = new Path();
  topCounter.moveTo(-0.35, 0.85);
  topCounter.lineTo(-0.1, 0.85);
  topCounter.bezierCurveTo(0.2, 0.85, 0.45, 0.7, 0.45, 0.5);
  topCounter.bezierCurveTo(0.45, 0.32, 0.2, 0.22, -0.1, 0.22);
  topCounter.lineTo(-0.35, 0.22);
  topCounter.lineTo(-0.35, 0.85);
  shape.holes.push(topCounter);

  const bottomCounter = new Path();
  bottomCounter.moveTo(-0.35, -0.15);
  bottomCounter.lineTo(-0.1, -0.15);
  bottomCounter.bezierCurveTo(0.25, -0.15, 0.55, -0.4, 0.55, -0.65);
  bottomCounter.bezierCurveTo(0.55, -0.92, 0.25, -1.05, -0.1, -1.05);
  bottomCounter.lineTo(-0.35, -1.05);
  bottomCounter.lineTo(-0.35, -0.15);
  shape.holes.push(bottomCounter);

  return shape;
}

function buildGeometry(shape: Shape): BufferGeometry {
  const geometry = new ExtrudeGeometry(shape, EXTRUDE);
  geometry.center();
  return geometry;
}

export function createLetterLGeometry(): BufferGeometry {
  return buildGeometry(makeLShape());
}

export function createLetterAGeometry(): BufferGeometry {
  return buildGeometry(makeAShape());
}

export function createLetterBGeometry(): BufferGeometry {
  return buildGeometry(makeBShape());
}

export type LabLetter = "L" | "A" | "B";
