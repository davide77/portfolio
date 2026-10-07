"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Color, Vector3, type Group } from "three";
import { createHollowDGeometry } from "@/components/hero/createHollowDGeometry";
import { HERO_GLASS_MONOGRAM } from "@/constants/hero-webgl";

type HeroGlassMonogramProps = {
  containerRef: RefObject<HTMLElement | null>;
  reduceMotion?: boolean;
};

const BASE_POS = new Vector3(...HERO_GLASS_MONOGRAM.groupPosition);

/**
 * LAYER 2 - the refraction-glass monogram, ported from the monopo.vn hero and
 * re-skinned to this project's own mark: two frosted-glass hollow-D's (D + D)
 * built from the shared createHollowDGeometry, refracting the flow-field
 * background behind them. Idle drift + cursor parallax + on-load reveal are a
 * faithful port of the original's motion.
 */
export function HeroGlassMonogram({ containerRef, reduceMotion = false }: HeroGlassMonogramProps) {
  const groupRef = useRef<Group>(null);
  const materialRefs = useRef<Array<{ opacity: number } | null>>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const startRef = useRef(-1);

  const geometry = useMemo(() => createHollowDGeometry(), []);
  // Monopo glass material (screenshot 1): warm amber tint through the glass +
  // faint warm cream body, so the DD reads orange regardless of the field hue.
  const attenuation = useMemo(() => new Color(0xd98f3c), []);
  const bodyColor = useMemo(() => new Color(0xf2e6d2), []);
  const background = useMemo(() => new Color(HERO_GLASS_MONOGRAM.background), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

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

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    if (startRef.current < 0) startRef.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startRef.current;

    // On-load reveal fade (ease-out cubic), applied to both glass D's.
    const p = reduceMotion
      ? 1
      : 1 - Math.pow(1 - Math.min(elapsed / HERO_GLASS_MONOGRAM.revealSec, 1), 3);
    for (const mat of materialRefs.current) {
      if (mat) mat.opacity = p;
    }

    if (reduceMotion) return;

    pointer.current.x += (pointerTarget.current.x - pointer.current.x) * 0.05;
    pointer.current.y += (pointerTarget.current.y - pointer.current.y) * 0.05;

    const yaw = Math.sin(elapsed * 0.5) * HERO_GLASS_MONOGRAM.idleYaw;
    const float = Math.sin(elapsed * 0.8) * HERO_GLASS_MONOGRAM.idleFloat;

    group.rotation.y = yaw + pointer.current.x * HERO_GLASS_MONOGRAM.parallaxTilt;
    group.rotation.x = -pointer.current.y * HERO_GLASS_MONOGRAM.parallaxTilt * 0.6;
    group.position.set(
      BASE_POS.x + pointer.current.x * HERO_GLASS_MONOGRAM.parallaxShift,
      BASE_POS.y + float - pointer.current.y * HERO_GLASS_MONOGRAM.parallaxShift * 0.6,
      BASE_POS.z,
    );
  });

  const sepX = HERO_GLASS_MONOGRAM.separationX;
  const sepZ = HERO_GLASS_MONOGRAM.separationZ;
  const s = HERO_GLASS_MONOGRAM.scale;

  return (
    <group ref={groupRef} position={HERO_GLASS_MONOGRAM.groupPosition} scale={s}>
      <directionalLight position={[-2, 3, 8]} intensity={1.4} color="#fff2df" />
      <directionalLight position={[3, -1, 7]} intensity={0.9} color="#e0a45a" />
      <ambientLight intensity={0.3} />
      {[
        { pos: [sepX / 2, 0, -sepZ / 2] as const, key: "back" },
        { pos: [-sepX / 2, 0, sepZ / 2] as const, key: "front" },
      ].map((d, i) => (
        <mesh key={d.key} geometry={geometry} position={d.pos}>
          <MeshTransmissionMaterial
            ref={(m) => {
              materialRefs.current[i] = m as unknown as { opacity: number } | null;
            }}
            samples={HERO_GLASS_MONOGRAM.samples}
            resolution={HERO_GLASS_MONOGRAM.resolution}
            transmission={HERO_GLASS_MONOGRAM.transmission}
            thickness={HERO_GLASS_MONOGRAM.thickness}
            roughness={HERO_GLASS_MONOGRAM.roughness}
            ior={HERO_GLASS_MONOGRAM.ior}
            chromaticAberration={HERO_GLASS_MONOGRAM.chromaticAberration}
            anisotropy={HERO_GLASS_MONOGRAM.anisotropy}
            distortion={HERO_GLASS_MONOGRAM.distortion}
            distortionScale={HERO_GLASS_MONOGRAM.distortionScale}
            temporalDistortion={HERO_GLASS_MONOGRAM.temporalDistortion}
            attenuationColor={attenuation}
            attenuationDistance={1.4}
            color={bodyColor}
            background={background}
            transparent
            opacity={reduceMotion ? 1 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}
