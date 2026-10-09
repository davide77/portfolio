"use client";

import { forwardRef, useMemo } from "react";
import { BlendFunction, Effect } from "postprocessing";
import { Uniform, type WebGLRenderer, type WebGLRenderTarget } from "three";

// Single-colour grain, one device pixel per grain. The input arrives linear,
// so the noise is added after a gamma-2.2 round trip: in linear space the same
// amount would roar in the blacks and vanish in the highlights. A fresh seed
// lands at a film frame rate, not every display frame, so it reads as film
// rather than TV static.
const fragmentShader = /* glsl */ `
uniform float uAmount;
uniform float uSeed;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float n = hash(gl_FragCoord.xy + uSeed) - 0.5;
  vec3 display = pow(max(inputColor.rgb, 0.0), vec3(1.0 / 2.2));
  display += n * uAmount;
  outputColor = vec4(pow(max(display, 0.0), vec3(2.2)), inputColor.a);
}
`;

class FilmGrainEffect extends Effect {
  private elapsed = 0;
  private readonly frameSec: number;

  constructor(amount: number, fps: number) {
    super("FilmGrainEffect", fragmentShader, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map<string, Uniform>([
        ["uAmount", new Uniform(amount)],
        ["uSeed", new Uniform(0)],
      ]),
    });
    this.frameSec = 1 / fps;
  }

  override update(_renderer: WebGLRenderer, _input: WebGLRenderTarget, deltaTime = 0) {
    this.elapsed += deltaTime;
    if (this.elapsed < this.frameSec) return;
    this.elapsed = 0;
    this.uniforms.get("uSeed")!.value = Math.random() * 1000;
  }
}

type FilmGrainProps = {
  amount: number;
  fps: number;
};

/** Film grain effect for an r3f <EffectComposer>. */
export const FilmGrain = forwardRef<FilmGrainEffect, FilmGrainProps>(function FilmGrain(
  { amount, fps },
  ref,
) {
  const effect = useMemo(() => new FilmGrainEffect(amount, fps), [amount, fps]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
