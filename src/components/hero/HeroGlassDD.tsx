"use client";

import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { BufferGeometry, Float32BufferAttribute, Vector3, type Group } from "three";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { createFusedDDGeometry } from "@/components/hero/createHollowDGeometry";
import { HERO_GLASS_DD } from "@/constants/hero-webgl";

type HeroGlassDDProps = {
  containerRef: RefObject<HTMLElement | null>;
  reduceMotion?: boolean;
  isMobile?: boolean;
};

/** Copy one ExtrudeGeometry group (0 = front/back caps, 1 = bevels + sides)
 *  into its own geometry, position + normal only. */
function extractGroup(source: BufferGeometry, materialIndex: number): BufferGeometry {
  const parts = source.groups
    .filter((g) => g.materialIndex === materialIndex)
    .map((g) => {
      const part = new BufferGeometry();
      for (const name of ["position", "normal"] as const) {
        const attr = source.getAttribute(name);
        const array = attr.array.slice(g.start * 3, (g.start + g.count) * 3);
        part.setAttribute(name, new Float32BufferAttribute(array, 3));
      }
      return part;
    });
  const merged = mergeGeometries(parts);
  parts.forEach((part) => part.dispose());
  return merged;
}

/**
 * The glass DD: both letters fused into one outline and extruded as a single
 * solid, so they read as one integrated mark with both counters open, not two
 * slabs stacked in depth. ExtrudeGeometry is non-indexed, so every triangle
 * carries a flat normal and the curves refract in visible steps. The bevels and sides are
 * welded and re-normalled so they bend the field smoothly. The caps stay flat
 * on purpose: smoothing them too tilts the whole face into one big lens that
 * magnifies a single patch of the field into a flat wash of colour.
 */
function createGlassDD(): BufferGeometry {
  const source = createFusedDDGeometry(
    HERO_GLASS_DD.separationX,
    HERO_GLASS_DD.outlineDivisions,
    HERO_GLASS_DD.extrude,
  );
  const caps = extractGroup(source, 0);
  const rawSides = extractGroup(source, 1);
  source.dispose();

  rawSides.deleteAttribute("normal");
  const welded = mergeVertices(rawSides, HERO_GLASS_DD.weldTolerance);
  rawSides.dispose();
  welded.computeVertexNormals();
  const sides = welded.toNonIndexed();
  welded.dispose();

  const glyph = mergeGeometries([caps, sides]);
  caps.dispose();
  sides.dispose();
  return glyph;
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Hero-size glass DD. One mesh, so the transmission material renders the
 * scene into its refraction buffer once per frame. A faint warm attenuation
 * dims the glass body slightly against the open counters, so the holes read
 * as holes; everything else it shows is the field, bent through the bevels. A couple of soft
 * Lightformers give it the thin bright rim without loading an HDR file.
 *
 * No `backside` pass: it renders the back faces over the field in the
 * refraction buffer and the glass comes out solid black.
 */
export function HeroGlassDD({ containerRef, reduceMotion = false, isMobile = false }: HeroGlassDDProps) {
  const groupRef = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const startRef = useRef(-1);
  const { viewport } = useThree();

  const { geometry, width, height } = useMemo(() => {
    const merged = createGlassDD();
    merged.computeBoundingBox();
    const box = merged.boundingBox!;
    return {
      geometry: merged,
      width: box.max.x - box.min.x,
      height: box.max.y - box.min.y,
    };
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  // Fit by height, capped by width so portrait screens crop the sides.
  const vw = viewport.width;
  const vh = viewport.height;
  const scale = Math.min(
    (HERO_GLASS_DD.heightFrac * vh) / height,
    (HERO_GLASS_DD.widthFrac * vw) / width,
  );
  const base = useMemo(
    () => new Vector3(HERO_GLASS_DD.offset[0] * vw, HERO_GLASS_DD.offset[1] * vh, 0),
    [vw, vh],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerTarget.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const onLeave = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };
    window.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, reduceMotion]);

  // Transform mutation in useFrame is the r3f frame-loop pattern; the React
  // Compiler immutability rule does not model it.
  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    group.position.copy(base);

    if (reduceMotion) {
      group.scale.setScalar(scale);
      return;
    }

    if (startRef.current < 0) startRef.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startRef.current;
    const reveal = easeOutExpo(Math.min(elapsed / HERO_GLASS_DD.revealSec, 1));

    const p = pointer.current;
    p.x += (pointerTarget.current.x - p.x) * HERO_GLASS_DD.pointerLerp;
    p.y += (pointerTarget.current.y - p.y) * HERO_GLASS_DD.pointerLerp;

    const idle = Math.sin(elapsed * HERO_GLASS_DD.idleSpeed) * HERO_GLASS_DD.idleYaw;
    group.scale.setScalar(scale * (0.9 + 0.1 * reveal));
    group.rotation.y =
      HERO_GLASS_DD.revealYaw * (1 - reveal) + idle + p.x * HERO_GLASS_DD.parallaxTilt;
    group.rotation.x = p.y * HERO_GLASS_DD.parallaxTilt * 0.6;
  });

  const m = HERO_GLASS_DD.material;
  const quality = isMobile ? HERO_GLASS_DD.mobile : m;

  return (
    <>
      <Environment resolution={HERO_GLASS_DD.envResolution} frames={1}>
        {HERO_GLASS_DD.lights.map((light) => (
          <Lightformer
            key={light.color}
            form={light.form}
            intensity={light.intensity}
            color={light.color}
            position={[...light.position]}
            scale={[...light.scale]}
          />
        ))}
      </Environment>
      <group ref={groupRef} scale={scale}>
        <mesh geometry={geometry}>
          <MeshTransmissionMaterial
            samples={quality.samples}
            resolution={quality.resolution}
            transmission={1}
            thickness={m.thickness}
            roughness={m.roughness}
            ior={m.ior}
            chromaticAberration={m.chromaticAberration}
            anisotropicBlur={m.anisotropicBlur}
            distortion={0}
            envMapIntensity={m.envMapIntensity}
            clearcoat={m.clearcoat}
            clearcoatRoughness={m.clearcoatRoughness}
            attenuationColor={m.attenuationColor}
            attenuationDistance={m.attenuationDistance}
          />
        </mesh>
      </group>
    </>
  );
}
