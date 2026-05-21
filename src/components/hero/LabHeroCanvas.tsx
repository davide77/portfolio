"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { LabHeroOrb } from "@/components/hero/LabHeroOrb";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { LAB_HERO } from "@/constants/hero-webgl-lab";
import { useVisibility } from "@/hooks/useVisibility";

type LabHeroCanvasProps = {
  className?: string;
  onReady?: () => void;
};

function useMaxDpr(): number {
  const [maxDpr, setMaxDpr] = useState<number>(LAB_HERO.maxDevicePixelRatio);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setMaxDpr(mq.matches ? 2 : LAB_HERO.maxDevicePixelRatio);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return maxDpr;
}

/**
 * /lab variant of HeroCanvas. Same lifecycle (visibility + tab pause) plus
 * a reduced-motion early-return: when the user prefers reduced motion the
 * canvas does not mount at all. The lab page is the second-tier surface,
 * not the home hero - the green-refraction cluster is a treat, not a
 * requirement, and skipping it is the kindest fallback.
 */
export function LabHeroCanvas({ className, onReady }: LabHeroCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const visible = useVisibility(wrapRef, { threshold: 0.05 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tabVisible, setTabVisible] = useState(true);
  const maxDpr = useMaxDpr();

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

  if (reduceMotion) {
    return <div ref={wrapRef} className={className} aria-hidden />;
  }

  const frameLoop = visible && tabVisible ? "always" : "never";

  return (
    <div ref={wrapRef} className={className}>
      <Canvas
        dpr={[1, maxDpr]}
        frameloop={frameLoop}
        camera={{ position: [0, 0, LAB_HERO.cameraZ], fov: LAB_HERO.cameraFov }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          onReady?.();
        }}
      >
        <Suspense fallback={null}>
          <LabHeroOrb containerRef={wrapRef} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
