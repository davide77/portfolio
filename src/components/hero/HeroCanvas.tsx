"use client";

import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import { HeroFlowField } from "@/components/hero/HeroFlowField";
import { HeroGlassMonogram } from "@/components/hero/HeroGlassMonogram";
import { HeroOrb } from "@/components/hero/HeroOrb";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { HERO_FLOWFIELD, HERO_ORB, HERO_VARIANT } from "@/constants/hero-webgl";
import { useVisibility } from "@/hooks/useVisibility";

type HeroCanvasProps = {
  className?: string;
  onReady?: () => void;
};

// Brief: setPixelRatio(Math.min(devicePixelRatio, 3)); mobile (<640px) caps DPR at 2.
// matchMedia so the cap reacts to viewport changes (rotate, resize).
function useMaxDpr(): number {
  const [maxDpr, setMaxDpr] = useState<number>(HERO_ORB.maxDevicePixelRatio);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setMaxDpr(mq.matches ? 2 : HERO_ORB.maxDevicePixelRatio);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return maxDpr;
}

export function HeroCanvas({ className, onReady }: HeroCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useVisibility(wrapRef, { threshold: 0.05 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tabVisible, setTabVisible] = useState(true);
  const maxDpr = useMaxDpr();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight || 1;
      setScrollProgress(Math.min(1, window.scrollY / vh));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const frameLoop = visible && tabVisible ? "always" : "never";

  return (
    <div ref={wrapRef} className={className}>
      <Canvas
        dpr={[1, maxDpr]}
        frameloop={frameLoop}
        camera={{ position: [0, 0, HERO_ORB.cameraZ], fov: HERO_ORB.cameraFov }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          onReady?.();
        }}
      >
        <Suspense fallback={null}>
          {HERO_VARIANT === "flowfield" ? (
            <>
              <HeroFlowField reduceMotion={reduceMotion} />
              <HeroGlassMonogram containerRef={wrapRef} reduceMotion={reduceMotion} />
              {!reduceMotion && (
                <EffectComposer>
                  <Noise
                    premultiply
                    blendFunction={BlendFunction.SCREEN}
                    opacity={HERO_FLOWFIELD.grainOpacity}
                  />
                </EffectComposer>
              )}
            </>
          ) : (
            <HeroOrb containerRef={wrapRef} scrollProgress={scrollProgress} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
