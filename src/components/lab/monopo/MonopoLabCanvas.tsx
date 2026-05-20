"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { MonopoBackgroundSphere } from "@/components/lab/monopo/MonopoBackgroundSphere";
import { MonopoEffects } from "@/components/lab/monopo/MonopoEffects";
import { MonopoRefractionLens } from "@/components/lab/monopo/MonopoRefractionLens";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { useVisibility } from "@/hooks/useVisibility";
import { MONOPO_SCENE } from "@/constants/monopo-lab";
import { cx } from "@/components/cx";

type MonopoLabCanvasProps = {
  className?: string;
  /** Replaces the default noise sphere. Pass null to render nothing. */
  backdrop?: ReactNode;
  /** Scale applied to the lens. 1 = original size. */
  lensScale?: number;
  /** Gentle idle drift on the lens. */
  idleFloat?: boolean;
  /** Drift amplitude multiplier when idleFloat is on. */
  floatStrength?: number;
  /** "dd" = back-to-back D monogram, "sphere" = round glass marble. */
  lensShape?: "dd" | "sphere";
  clearColor?: string;
  /** Transparent canvas - section background shows through. */
  transparent?: boolean;
  fresnelBias?: number;
  fresnelScale?: number;
  fresnelPower?: number;
};

export function MonopoLabCanvas({
  className,
  backdrop,
  lensScale = 1,
  idleFloat = false,
  floatStrength = 1,
  lensShape = "dd",
  clearColor,
  transparent = false,
  fresnelBias,
  fresnelScale,
  fresnelPower,
}: MonopoLabCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useVisibility(wrapRef, { threshold: 0.05 });
  const reduceMotion = useReducedMotion();
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const frameloop = visible && tabVisible && !reduceMotion ? "always" : "never";

  if (reduceMotion) {
    return (
      <div
        ref={wrapRef}
        className={cx("monopo-lab__canvas-fallback", className)}
        aria-hidden
      />
    );
  }

  const sceneClearColor = clearColor ?? MONOPO_SCENE.clearColor;

  return (
    <div ref={wrapRef} className={cx("monopo-lab__canvas-wrap", className)}>
      <Canvas
        dpr={[1, MONOPO_SCENE.maxDevicePixelRatio]}
        frameloop={frameloop}
        camera={{
          position: [0, 0, MONOPO_SCENE.cameraZ],
          fov: MONOPO_SCENE.cameraFov,
        }}
        gl={{
          antialias: false,
          alpha: transparent,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          if (transparent) {
            gl.setClearColor(0x000000, 0);
          } else {
            gl.setClearColor(sceneClearColor, 1);
          }
        }}
      >
        <Suspense fallback={null}>
          {backdrop !== undefined ? backdrop : <MonopoBackgroundSphere />}
          <MonopoRefractionLens
            scale={lensScale}
            idleFloat={idleFloat}
            floatStrength={floatStrength}
            shape={lensShape}
            fresnelBias={fresnelBias}
            fresnelScale={fresnelScale}
            fresnelPower={fresnelPower}
          />
          <MonopoEffects />
        </Suspense>
      </Canvas>
    </div>
  );
}
