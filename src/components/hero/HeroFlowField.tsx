"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, DoubleSide, ShaderMaterial, Vector2, type Mesh } from "three";
import flowFrag from "@/components/hero/shaders/flowfield.frag.glsl";
import flowVert from "@/components/hero/shaders/flowfield.vert.glsl";
import { HERO_FLOWFIELD, HERO_FLOWFIELD_PALETTE } from "@/constants/hero-webgl";

type HeroFlowFieldProps = {
  reduceMotion?: boolean;
};

/** Two-stage easeInOut bloom: 0 -> 0.25, then 0.25 -> 1, over 2 * stage sec. */
function bloomProgress(elapsed: number, stage: number): number {
  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  if (elapsed <= stage) return 0.25 * easeInOut(elapsed / stage);
  if (elapsed <= stage * 2) return 0.25 + 0.75 * easeInOut((elapsed - stage) / stage);
  return 1;
}

/**
 * LAYER 1 - the flow-field marbling background, ported from the monopo.vn hero
 * into R3F. A full-screen plane scaled to the camera frustum runs the shader;
 * the plane blooms open on load and the flow field drifts frame-rate
 * independently.
 */
export function HeroFlowField({ reduceMotion = false }: HeroFlowFieldProps) {
  const meshRef = useRef<Mesh>(null);
  const { size, camera } = useThree();
  const startRef = useRef(-1);

  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: flowVert,
      fragmentShader: flowFrag,
      transparent: true,
      side: DoubleSide,
      uniforms: {
        uBaseFirstColor: { value: new Color(HERO_FLOWFIELD_PALETTE.baseFirst) },
        uBaseSecondColor: { value: new Color(HERO_FLOWFIELD_PALETTE.baseSecond) },
        uAccentColor: { value: new Color(HERO_FLOWFIELD_PALETTE.accent) },
        uBgProgress: { value: reduceMotion ? 1 : 0 },
        uAccentOpacity: { value: HERO_FLOWFIELD.accentOpacity },
        uBaseFrequency: { value: HERO_FLOWFIELD.baseFrequency },
        uNoiseIntensity: { value: HERO_FLOWFIELD.noiseIntensity },
        uOpacityBackground: { value: HERO_FLOWFIELD.opacityBackground },
        uTime: { value: 0 },
        uZoom: { value: HERO_FLOWFIELD.zoom },
        uDarkness: { value: HERO_FLOWFIELD.darkness },
        uVignette: { value: HERO_FLOWFIELD.vignette },
        u_res: { value: new Vector2(size.width, size.height) },
      },
    });
  }, [reduceMotion, size.width, size.height]);

  useEffect(() => () => material.dispose(), [material]);

  // Scale the unit plane to fill the perspective frustum at z=0.
  const { scaleX, scaleY } = useMemo(() => {
    const persp = camera as typeof camera & { fov: number; position: { z: number } };
    const fovY = Math.abs(persp.position.z) * Math.tan((persp.fov * Math.PI) / 180 / 2) * 2;
    const aspect = size.width / Math.max(size.height, 1);
    return { scaleX: fovY * aspect, scaleY: fovY };
  }, [camera, size.width, size.height]);

  useEffect(() => {
    (material.uniforms.u_res.value as Vector2).set(size.width, size.height);
  }, [material, size.width, size.height]);

  // eslint-disable-next-line react-hooks/immutability
  useFrame((state, delta) => {
    if (reduceMotion) return;
    if (startRef.current < 0) startRef.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startRef.current;
    const clamped = Math.min(delta, 0.1);
    // eslint-disable-next-line react-hooks/immutability
    material.uniforms.uTime.value += clamped * HERO_FLOWFIELD.timeSpeed;
    material.uniforms.uBgProgress.value = bloomProgress(elapsed, HERO_FLOWFIELD.bloomStageSec);
  });

  return (
    <mesh ref={meshRef} material={material} scale={[scaleX, scaleY, 1]} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}
