"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Color, ShaderMaterial, Vector2 } from "three";
import noiseGlsl from "@/components/hero/shaders/noise.glsl";
import fieldFrag from "@/components/hero/shaders/glassfield.frag.glsl";
import flowVert from "@/components/hero/shaders/flowfield.vert.glsl";
import { HERO_GLASS_DD, HERO_GLASS_FIELD, HERO_GLASS_FIELD_PALETTE } from "@/constants/hero-webgl";

type HeroGlassFieldProps = {
  containerRef: RefObject<HTMLElement | null>;
  reduceMotion?: boolean;
  isMobile?: boolean;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The field behind the glass DD. A full-frustum plane pushed back to planeZ so
 * the glass sits wholly in front of it, running a domain-warped fbm shader.
 * Opens out of black on load, drifts slowly, and leans toward the pointer.
 */
export function HeroGlassField({
  containerRef,
  reduceMotion = false,
  isMobile = false,
}: HeroGlassFieldProps) {
  const { size, camera } = useThree();
  const startRef = useRef(-1);
  const pointerTarget = useRef(new Vector2());

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: flowVert,
        fragmentShader: `${noiseGlsl}\n${fieldFrag}`,
        uniforms: {
          uVoid: { value: new Color(HERO_GLASS_FIELD_PALETTE.void) },
          uOlive: { value: new Color(HERO_GLASS_FIELD_PALETTE.olive) },
          uAmber: { value: new Color(HERO_GLASS_FIELD_PALETTE.amber) },
          uHighlight: { value: new Color(HERO_GLASS_FIELD_PALETTE.highlight) },
          uTime: { value: 0 },
          uAspect: { value: 1 },
          uScale: { value: HERO_GLASS_FIELD.scale },
          uPoolLow: { value: HERO_GLASS_FIELD.poolLow },
          uPoolHigh: { value: HERO_GLASS_FIELD.poolHigh },
          uReveal: { value: reduceMotion ? 1 : 0 },
          uPointer: { value: new Vector2() },
          uFocus: { value: new Vector2() },
          uFocusLift: { value: HERO_GLASS_FIELD.focusLift },
          uFocusInner: { value: HERO_GLASS_FIELD.focusInner },
          uFocusOuter: { value: HERO_GLASS_FIELD.focusOuter },
        },
      }),
    [reduceMotion],
  );

  useEffect(() => () => material.dispose(), [material]);

  // Scale the unit plane to fill the frustum at planeZ.
  const { scaleX, scaleY, aspect } = useMemo(() => {
    const persp = camera as typeof camera & { fov: number; position: { z: number } };
    const dist = persp.position.z - HERO_GLASS_FIELD.planeZ;
    const h = 2 * dist * Math.tan((persp.fov * Math.PI) / 360);
    const a = size.width / Math.max(size.height, 1);
    return { scaleX: h * a, scaleY: h, aspect: a };
  }, [camera, size.width, size.height]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerTarget.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      );
    };
    const onLeave = () => pointerTarget.current.set(0, 0);
    window.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, reduceMotion]);

  // Uniform mutation in useFrame is the r3f frame-loop pattern; the React
  // Compiler immutability rule does not model it.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((state, delta) => {
    const u = material.uniforms;
    // eslint-disable-next-line react-hooks/immutability
    u.uAspect.value = aspect;
    // DD offset is a share of viewport width / height; the shader works in
    // viewport-height units, so x scales by aspect.
    const [fx, fy] = isMobile ? HERO_GLASS_DD.mobileOffset : HERO_GLASS_DD.offset;
    (u.uFocus.value as Vector2).set(fx * aspect, fy);
    if (reduceMotion) return;
    if (startRef.current < 0) startRef.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startRef.current;
    u.uTime.value += Math.min(delta, 0.1) * HERO_GLASS_FIELD.timeSpeed;
    u.uReveal.value = easeOutCubic(Math.min(elapsed / HERO_GLASS_FIELD.revealSec, 1));
    (u.uPointer.value as Vector2).lerp(
      pointerTarget.current.clone().multiplyScalar(HERO_GLASS_FIELD.pointerWarp),
      HERO_GLASS_FIELD.pointerLerp,
    );
  });

  return (
    <mesh material={material} scale={[scaleX, scaleY, 1]} position={[0, 0, HERO_GLASS_FIELD.planeZ]}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}
