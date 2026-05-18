"use client";

import { HERO_WEBGL, HERO_WEBGL_PALETTE } from "@/constants/hero-webgl";
import { useEffect, useRef } from "react";
import {
  Clock,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";

function hexToUnitRgb(hex: string): Vector3 {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec3 uPrimary;
uniform vec3 uAccent;
uniform vec3 uCream;
uniform vec3 uInk;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.1;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 flow = vec2(uv.x * 2.1 - 0.5, uv.y * 2.0 - 0.45) + uTime * 0.012;
  float n = fbm(flow + fbm(vec2(flow.y, flow.x) * 1.25 + uTime * 0.008));
  float band = smoothstep(0.2, 0.9, n);
  vec3 col = mix(uInk, uPrimary, band * 0.28);
  col = mix(col, uAccent, smoothstep(0.5, 1.0, n) * 0.22);
  float fog = 1.0 - 0.5 * length(uv - vec2(0.42, 0.38));
  fog = clamp(fog, 0.65, 1.0);
  col = mix(col, uCream, smoothstep(0.15, 0.55, 1.0 - n) * 0.07 * fog);
  float vig = 1.0 - 0.42 * length(uv - 0.5);
  col *= vig;
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Full-bleed organic gradient field (brand palette only). Sits under `.mesh` in the hero.
 * Skipped when `prefers-reduced-motion: reduce` (parent should not mount).
 */
export function HeroWebGLBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const win = wrap.ownerDocument.defaultView;
    if (!win) return;

    if (win.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let renderer: WebGLRenderer | null = null;
    let rafId = 0;
    let disposed = false;
    let intersecting = true;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uInk: { value: hexToUnitRgb(HERO_WEBGL_PALETTE.ink) },
        uPrimary: { value: hexToUnitRgb(HERO_WEBGL_PALETTE.primary) },
        uCream: { value: hexToUnitRgb(HERO_WEBGL_PALETTE.cream) },
        uAccent: { value: hexToUnitRgb(HERO_WEBGL_PALETTE.accent) },
      },
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new Mesh(new PlaneGeometry(2, 2), material);
    scene.add(mesh);

    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      material.dispose();
      mesh.geometry.dispose();
      return;
    }

    const glCtx = renderer.getContext() as WebGLRenderingContext | null;
    if (!glCtx) {
      renderer.dispose();
      material.dispose();
      mesh.geometry.dispose();
      return;
    }

    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.setAttribute("role", "presentation");
    wrap.appendChild(canvas);

    const clock = new Clock();

    const resize = () => {
      if (!renderer || !wrap) return;
      const w = Math.max(1, wrap.clientWidth);
      const h = Math.max(1, wrap.clientHeight);
      const pr = Math.min(win.devicePixelRatio ?? 1, HERO_WEBGL.maxDevicePixelRatio);
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
    };

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(wrap);
    resize();

    const renderFrame = () => {
      if (!renderer || disposed) return;
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    const loop = () => {
      if (disposed) return;
      if (!intersecting || win.document.visibilityState === "hidden") {
        rafId = 0;
        return;
      }
      renderFrame();
      rafId = win.requestAnimationFrame(loop);
    };

    const kick = () => {
      if (rafId !== 0 || disposed) return;
      if (!intersecting || win.document.visibilityState === "hidden") return;
      rafId = win.requestAnimationFrame(loop);
    };

    const stopRaf = () => {
      if (rafId !== 0) {
        win.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        intersecting = Boolean(e?.isIntersecting);
        if (intersecting && win.document.visibilityState === "visible") {
          kick();
        } else {
          stopRaf();
        }
      },
      { root: null, threshold: 0.01 },
    );
    io.observe(wrap);
    kick();

    const onVis = () => {
      if (win.document.visibilityState === "visible" && intersecting) {
        kick();
      } else {
        stopRaf();
      }
    };
    win.document.addEventListener("visibilitychange", onVis);

    const onLost = (event: Event) => {
      event.preventDefault();
      disposed = true;
      stopRaf();
      ro.disconnect();
      io.disconnect();
      win.document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      if (renderer) {
        renderer.dispose();
        renderer = null;
      }
      mesh.geometry.dispose();
      material.dispose();
      canvas.remove();
    };
    canvas.addEventListener("webglcontextlost", onLost, false);

    return () => {
      disposed = true;
      stopRaf();
      ro.disconnect();
      io.disconnect();
      win.document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      if (renderer) {
        renderer.dispose();
      }
      mesh.geometry.dispose();
      material.dispose();
      if (canvas.parentNode === wrap) {
        wrap.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={wrapRef} className={"hero__web-gl-layer"} />;
}
