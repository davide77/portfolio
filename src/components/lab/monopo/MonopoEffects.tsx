"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import noisePassFrag from "@/components/lab/monopo/shaders/noise-pass.frag.glsl";
import noisePassVert from "@/components/lab/monopo/shaders/noise-pass.vert.glsl";
import { MONOPO_POST } from "@/constants/monopo-lab";

const ConstantNoiseShader = {
  uniforms: {
    tDiffuse: { value: null },
    u_scale: { value: MONOPO_POST.noiseScale },
  },
  vertexShader: noisePassVert,
  fragmentShader: noisePassFrag,
};

/** RenderPass + constant noise grain + FXAA, matching nemutas/r3f-monopo. */
export function MonopoEffects() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);
  const fxaaPassRef = useRef<ShaderPass | null>(null);

  useEffect(() => {
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new ShaderPass(ConstantNoiseShader));
    const fxaaPass = new ShaderPass(FXAAShader);
    composer.addPass(fxaaPass);

    composerRef.current = composer;
    fxaaPassRef.current = fxaaPass;

    return () => {
      composer.dispose();
      composerRef.current = null;
      fxaaPassRef.current = null;
    };
  }, [gl, scene, camera]);

  useEffect(() => {
    const composer = composerRef.current;
    const fxaaPass = fxaaPassRef.current;
    if (!composer) return;

    composer.setSize(size.width, size.height);
    if (fxaaPass) {
      fxaaPass.material.uniforms.resolution.value.set(
        1 / size.width,
        1 / size.height,
      );
    }
  }, [size]);

  useFrame(() => {
    composerRef.current?.render();
  }, 1);

  return null;
}
