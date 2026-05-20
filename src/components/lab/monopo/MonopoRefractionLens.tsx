"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  CubeCamera,
  DoubleSide,
  IcosahedronGeometry,
  LinearMipMapLinearFilter,
  RGBAFormat,
  ShaderMaterial,
  Vector3,
  WebGLCubeRenderTarget,
  type Group,
  type Mesh,
} from "three";
import { createDoubleDGeometry } from "@/components/lab/monopo/dGeometry";
import { LENS_ONLY_LAYER } from "@/components/lab/monopo/lensLayers";
import refractionFrag from "@/components/lab/monopo/shaders/refraction.frag.glsl";
import refractionVert from "@/components/lab/monopo/shaders/refraction.vert.glsl";
import { buildMonopoShader, CNOISE31_GLSL } from "@/components/lab/monopo/shader-lib";
import { MONOPO_LENS } from "@/constants/monopo-lab";

type MonopoRefractionLensProps = {
  scale?: number;
  /** Gentle bob in Y + slow spin in Z. */
  idleFloat?: boolean;
  /** "dd" = back-to-back D monogram, "sphere" = round glass marble. */
  shape?: "dd" | "sphere";
  /** Drift amplitude (multiplied with the baseline). 1 = default. */
  floatStrength?: number;
  /** Per-instance overrides for the Fresnel uniforms. Higher bias / scale =
   * more visible glass shell; higher power = thinner rim. */
  fresnelBias?: number;
  fresnelScale?: number;
  fresnelPower?: number;
};

/**
 * Refracting lens. Samples the scene via CubeCamera + Fresnel shader, follows
 * the cursor with a soft lag, optionally drifts on idle. Defaults to the DD
 * monogram; `shape="sphere"` renders a round glass marble.
 */
export function MonopoRefractionLens({
  scale = 1,
  idleFloat = false,
  shape = "dd",
  floatStrength = 1,
  fresnelBias,
  fresnelScale,
  fresnelPower,
}: MonopoRefractionLensProps = {}) {
  const fBias = fresnelBias ?? MONOPO_LENS.fresnelBias;
  const fScale = fresnelScale ?? MONOPO_LENS.fresnelScale;
  const fPower = fresnelPower ?? MONOPO_LENS.fresnelPower;
  const outerRef = useRef<Group>(null);
  const parentRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const cubeTargetRef = useRef<WebGLCubeRenderTarget | null>(null);
  const cubeCameraRef = useRef<CubeCamera | null>(null);

  const geometry = useMemo(() => {
    if (shape === "sphere") {
      return new IcosahedronGeometry(MONOPO_LENS.radius, MONOPO_LENS.detail);
    }
    const height = MONOPO_LENS.radius * 2;
    return createDoubleDGeometry({
      height,
      stroke: height * MONOPO_LENS.dStroke,
      depth: MONOPO_LENS.dDepth,
      bowlWeight: MONOPO_LENS.dBowlWeight,
    });
  }, [shape]);

  const material = useMemo(() => {
    const cfg = MONOPO_LENS;
    return new ShaderMaterial({
      side: DoubleSide,
      uniforms: {
        t_cube: { value: null },
        u_refractionRatio: { value: cfg.refractionRatio },
        u_fresnelBias: { value: cfg.fresnelBias },
        u_fresnelScale: { value: cfg.fresnelScale },
        u_fresnelPower: { value: cfg.fresnelPower },
        u_time: { value: 0 },
      },
      vertexShader: buildMonopoShader(refractionVert, CNOISE31_GLSL),
      fragmentShader: refractionFrag,
    });
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      cubeTargetRef.current?.dispose();
    },
    [geometry, material],
  );

  const lookTarget = useMemo(() => new Vector3(), []);

  useFrame(({ mouse, viewport, gl, scene, clock }) => {
    const parent = parentRef.current;
    const mesh = meshRef.current;
    const mat = materialRef.current;
    if (!parent || !mesh || !mat) return;

    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    lookTarget.lerp(new Vector3(x, y, 1), MONOPO_LENS.lookAtLerp);
    parent.lookAt(lookTarget);

    const outer = outerRef.current;
    if (outer && idleFloat) {
      const t = clock.elapsedTime;
      outer.position.y = Math.sin(t * 0.6) * 0.04 * floatStrength;
      outer.position.x = Math.cos(t * 0.4) * 0.025 * floatStrength;
    }

    if (!cubeTargetRef.current) {
      cubeTargetRef.current = new WebGLCubeRenderTarget(256, {
        format: RGBAFormat,
        generateMipmaps: true,
        minFilter: LinearMipMapLinearFilter,
      });
      cubeCameraRef.current = new CubeCamera(0.1, 10, cubeTargetRef.current);
      cubeCameraRef.current.layers.enable(LENS_ONLY_LAYER);
    }

    mesh.visible = false;
    cubeCameraRef.current!.update(gl, scene);
    mesh.visible = true;

    mat.uniforms.t_cube.value = cubeTargetRef.current!.texture;
    mat.uniforms.u_refractionRatio.value = MONOPO_LENS.refractionRatio;
    mat.uniforms.u_fresnelBias.value = fBias;
    mat.uniforms.u_fresnelScale.value = fScale;
    mat.uniforms.u_fresnelPower.value = fPower;
    mat.uniforms.u_time.value = clock.elapsedTime;
  });

  return (
    <group ref={outerRef} scale={scale}>
      <group ref={parentRef}>
        <mesh ref={meshRef} geometry={geometry}>
          <primitive ref={materialRef} object={material} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
