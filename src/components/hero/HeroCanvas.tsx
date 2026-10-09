"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import { FilmGrain } from "@/components/hero/FilmGrain";
import { HeroFlowField } from "@/components/hero/HeroFlowField";
import { HeroGlassDD } from "@/components/hero/HeroGlassDD";
import { HeroGlassField } from "@/components/hero/HeroGlassField";
import { HeroGlassMonogram } from "@/components/hero/HeroGlassMonogram";
import { HeroOrb } from "@/components/hero/HeroOrb";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import {
  HERO_FLOWFIELD,
  HERO_GLASS_MAX_DPR,
  HERO_GLASS_MIN_DPR,
  HERO_GRAIN,
  HERO_ORB,
  HERO_VARIANT,
} from "@/constants/hero-webgl";
import { useVisibility } from "@/hooks/useVisibility";

type HeroCanvasProps = {
  className?: string;
  onReady?: () => void;
};

// Brief: setPixelRatio(Math.min(devicePixelRatio, 3)); mobile (<640px) caps DPR at 2.
// matchMedia so the cap reacts to viewport changes (rotate, resize).
// The glass hero caps lower: full-screen transmission at 3x is too heavy.
function useViewportProfile(): { maxDpr: number; isMobile: boolean } {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const desktopDpr = HERO_VARIANT === "glass" ? HERO_GLASS_MAX_DPR : HERO_ORB.maxDevicePixelRatio;
  return { maxDpr: isMobile ? 2 : desktopDpr, isMobile };
}

export function HeroCanvas({ className, onReady }: HeroCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useVisibility(wrapRef, { threshold: 0.05 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tabVisible, setTabVisible] = useState(true);
  const { maxDpr, isMobile } = useViewportProfile();
  // Glass hero only: if the device cannot hold the frame rate, drop pixel
  // density rather than stutter. Never climbs back, so it cannot oscillate.
  const [degraded, setDegraded] = useState(false);
  const dprCap = degraded ? HERO_GLASS_MIN_DPR : maxDpr;
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
        dpr={[1, dprCap]}
        frameloop={frameLoop}
        camera={{ position: [0, 0, HERO_ORB.cameraZ], fov: HERO_ORB.cameraFov }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          onReady?.();
        }}
      >
        <Suspense fallback={null}>
          {HERO_VARIANT === "glass" ? (
            <>
              <PerformanceMonitor onDecline={() => setDegraded(true)} />
              <HeroGlassField containerRef={wrapRef} reduceMotion={reduceMotion} />
              <HeroGlassDD containerRef={wrapRef} reduceMotion={reduceMotion} isMobile={isMobile} />
              <EffectComposer>
                <FilmGrain amount={HERO_GRAIN.amount} fps={HERO_GRAIN.fps} />
              </EffectComposer>
            </>
          ) : HERO_VARIANT === "flowfield" ? (
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
