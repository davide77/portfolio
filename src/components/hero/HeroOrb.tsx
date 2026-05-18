"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Color, ShaderMaterial, type Group, type Mesh } from "three";
import { createHollowDGeometry } from "@/components/hero/createHollowDGeometry";
import noiseGlsl from "@/components/hero/shaders/noise.glsl";
import orbFrag from "@/components/hero/shaders/orb.frag.glsl";
import orbVert from "@/components/hero/shaders/orb.vert.glsl";
import { HERO_LIQUID_METAL_PALETTE, HERO_ORB } from "@/constants/hero-webgl";

type HeroOrbProps = {
  containerRef: RefObject<HTMLElement | null>;
  scrollProgress: number;
  isMobile?: boolean;
};

function buildShaderSource(body: string) {
  return `${noiseGlsl}\n${body}`;
}

// Motion dials - verbatim from the CONFIG block in davide-hero-final.html.
const PARALLAX_STRENGTH = 0.06;
const PARALLAX_LERP = 0.02;
const WOBBLE_AMP = 0.15;

/**
 * Faithful port of the WebGL block in documents/davide-hero-final.html.
 */
export function HeroOrb({ containerRef, scrollProgress }: HeroOrbProps) {
  const groupRef = useRef<Group>(null);
  const primaryRef = useRef<Mesh>(null);
  const secondaryRef = useRef<Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => createHollowDGeometry(), []);

  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorCore: { value: new Color(HERO_LIQUID_METAL_PALETTE.core) },
        uColorMid: { value: new Color(HERO_LIQUID_METAL_PALETTE.mid) },
        uColorBright: { value: new Color(HERO_LIQUID_METAL_PALETTE.bright) },
        uColorRim: { value: new Color(HERO_LIQUID_METAL_PALETTE.rim) },
      },
      vertexShader: buildShaderSource(orbVert),
      fragmentShader: buildShaderSource(orbFrag),
    });
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
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

  // Mutating uniforms / refs / object3D transforms inside useFrame is the
  // canonical react-three-fiber per-frame pattern (the verbatim port of the
  // HTML animate() loop). The React Compiler immutability rule does not model
  // r3f's frame loop, so it is a false positive here.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // eslint-disable-next-line react-hooks/immutability
    material.uniforms.uTime.value = t;

    // Parallax + wobble verbatim from davide-hero-final.html animate()
    target.current.x += (mouse.current.y * PARALLAX_STRENGTH - target.current.x) * PARALLAX_LERP;
    target.current.y +=
      (mouse.current.x * PARALLAX_STRENGTH * 1.6 - target.current.y) * PARALLAX_LERP;

    const group = groupRef.current;
    if (group) {
      group.rotation.x = target.current.x;
      group.rotation.y = target.current.y;
      const scale = 1 - (1 - HERO_ORB.scrollScaleEnd) * scrollProgress;
      group.scale.setScalar(scale);
    }

    const d1 = primaryRef.current;
    const d2 = secondaryRef.current;
    if (d1) {
      d1.rotation.z = HERO_ORB.meshPrimary.rotationZ + Math.sin(t * 0.11) * 0.04;
      d1.rotation.y = Math.sin(t * 0.07) * WOBBLE_AMP;
      d1.rotation.x = Math.cos(t * 0.05) * WOBBLE_AMP * 0.65;
    }
    if (d2) {
      d2.rotation.z = HERO_ORB.meshSecondary.rotationZ + Math.cos(t * 0.09) * 0.05;
      d2.rotation.y = Math.cos(t * 0.1) * WOBBLE_AMP * 1.2;
      d2.rotation.x = Math.sin(t * 0.06) * WOBBLE_AMP * 0.65;
    }
  });

  const p = HERO_ORB.meshPrimary;
  const s = HERO_ORB.meshSecondary;

  return (
    <group ref={groupRef}>
      <mesh
        ref={primaryRef}
        geometry={geometry}
        material={material}
        position={p.position}
        rotation={[0, 0, p.rotationZ]}
        scale={p.scale}
      />
      <mesh
        ref={secondaryRef}
        geometry={geometry}
        material={material}
        position={s.position}
        rotation={[0, 0, s.rotationZ]}
        scale={s.scale}
      />
    </group>
  );
}
