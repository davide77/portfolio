"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Color, ShaderMaterial, type BufferGeometry, type Group, type Mesh } from "three";
import {
  createLetterAGeometry,
  createLetterBGeometry,
  createLetterLGeometry,
  type LabLetter,
} from "@/components/hero/createLabLetterGeometries";
import noiseGlsl from "@/components/hero/shaders/noise.glsl";
import orbFrag from "@/components/hero/shaders/orb.frag.glsl";
import orbVert from "@/components/hero/shaders/orb.vert.glsl";
import {
  LAB_HERO,
  LAB_HERO_PALETTE_GLOW,
  LAB_HERO_PALETTE_WARM,
  type LabOrbPalette,
} from "@/constants/hero-webgl-lab";

type LabHeroOrbProps = {
  containerRef: RefObject<HTMLElement | null>;
  scrollProgress: number;
};

const PARALLAX_STRENGTH = 0.05;
const PARALLAX_LERP = 0.02;
const WOBBLE_AMP = 0.13;

function buildShaderSource(body: string) {
  return `${noiseGlsl}\n${body}`;
}

function makeMaterial(palette: "warm" | "glow") {
  const colors = palette === "glow" ? LAB_HERO_PALETTE_GLOW : LAB_HERO_PALETTE_WARM;
  return new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorCore: { value: new Color(colors.core) },
      uColorMid: { value: new Color(colors.mid) },
      uColorBright: { value: new Color(colors.bright) },
      uColorRim: { value: new Color(colors.rim) },
    },
    vertexShader: buildShaderSource(orbVert),
    fragmentShader: buildShaderSource(orbFrag),
  });
}

/**
 * /lab variant of HeroOrb. Three extruded letters - L, A, B - in different
 * sizes, one rendered with the brand-sanctioned green-refraction palette and
 * the other two with the warm liquid-metal ramp. Same shader as the home
 * hero; only the geometry and instance count change.
 */
export function LabHeroOrb({ containerRef, scrollProgress }: LabHeroOrbProps) {
  const groupRef = useRef<Group>(null);
  const meshRefs = useRef<Array<Mesh | null>>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const geometries = useMemo<Record<LabLetter, BufferGeometry>>(
    () => ({
      L: createLetterLGeometry(),
      A: createLetterAGeometry(),
      B: createLetterBGeometry(),
    }),
    [],
  );

  // One material per palette, shared across letters that use it. Keeps
  // GPU state low - three meshes, two shader programs.
  const materials = useMemo(
    () => ({
      warm: makeMaterial("warm"),
      glow: makeMaterial("glow"),
    }),
    [],
  );

  useEffect(
    () => () => {
      geometries.L.dispose();
      geometries.A.dispose();
      geometries.B.dispose();
      materials.warm.dispose();
      materials.glow.dispose();
    },
    [geometries, materials],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeave = () => {
      mouse.current.x = 0;
      mouse.current.y = 0;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef]);

  // eslint-disable-next-line react-hooks/immutability
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // eslint-disable-next-line react-hooks/immutability
    materials.warm.uniforms.uTime.value = t;
    // eslint-disable-next-line react-hooks/immutability
    materials.glow.uniforms.uTime.value = t;

    target.current.x +=
      (mouse.current.y * PARALLAX_STRENGTH - target.current.x) * PARALLAX_LERP;
    target.current.y +=
      (mouse.current.x * PARALLAX_STRENGTH * 1.6 - target.current.y) * PARALLAX_LERP;

    const group = groupRef.current;
    if (group) {
      group.rotation.x = target.current.x;
      group.rotation.y = target.current.y;
      const scale = 1 - (1 - LAB_HERO.scrollScaleEnd) * scrollProgress;
      group.scale.setScalar(scale);
    }

    LAB_HERO.orbs.forEach((orb, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      mesh.rotation.z = orb.rotationZ + Math.sin(t * 0.09 + orb.wobbleSeed) * 0.04;
      mesh.rotation.y = Math.sin(t * 0.07 + orb.wobbleSeed) * WOBBLE_AMP;
      mesh.rotation.x = Math.cos(t * 0.05 + orb.wobbleSeed) * WOBBLE_AMP * 0.65;
    });
  });

  return (
    <group ref={groupRef}>
      {LAB_HERO.orbs.map((orb, i) => (
        <mesh
          key={orb.letter}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          geometry={geometries[orb.letter]}
          material={materials[orb.palette as LabOrbPalette]}
          position={orb.position}
          rotation={[0, 0, orb.rotationZ]}
          scale={orb.scale}
        />
      ))}
    </group>
  );
}
