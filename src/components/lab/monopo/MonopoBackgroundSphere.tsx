"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { Color, DoubleSide, ShaderMaterial } from "three";
import backgroundFrag from "@/components/lab/monopo/shaders/background.frag.glsl";
import backgroundVert from "@/components/lab/monopo/shaders/background.vert.glsl";
import { buildMonopoShader, NOISE31_GLSL } from "@/components/lab/monopo/shader-lib";
import { MONOPO_BACKGROUND, MONOPO_SCENE } from "@/constants/monopo-lab";

/** Large icosahedron with animated noise line patterns (monopo background). */
export function MonopoBackgroundSphere() {
  const material = useMemo(() => {
    const cfg = MONOPO_BACKGROUND;
    return new ShaderMaterial({
      side: DoubleSide,
      uniforms: {
        u_time: { value: 0 },
        u_patternScale: { value: cfg.patternScale },
        u_patternBias1: { value: cfg.patternBias1 },
        u_patternBias2: { value: cfg.patternBias2 },
        u_firstColor: { value: new Color(cfg.firstColor) },
        u_secondColor: { value: new Color(cfg.secondColor) },
        u_accentColor: { value: new Color(cfg.accentColor) },
      },
      vertexShader: backgroundVert,
      fragmentShader: buildMonopoShader(backgroundFrag, NOISE31_GLSL),
    });
  }, []);

  useFrame((_, delta) => {
    // eslint-disable-next-line react-hooks/immutability
    material.uniforms.u_time.value += delta * 60 * MONOPO_BACKGROUND.timeStep;
  });

  return (
    <mesh material={material}>
      <icosahedronGeometry
        args={[MONOPO_SCENE.backgroundRadius, MONOPO_SCENE.backgroundDetail]}
      />
    </mesh>
  );
}
