"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { HeroOrb } from "@/components/hero/HeroOrb";
import { HERO_ORB } from "@/constants/hero-webgl";
import { useVisibility } from "@/hooks/useVisibility";

type HeroCanvasProps = {
  className?: string;
  onReady?: () => void;
};

export function HeroCanvas({ className, onReady }: HeroCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useVisibility(wrapRef, { threshold: 0.05 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tabVisible, setTabVisible] = useState(true);

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
        dpr={[1, HERO_ORB.maxDevicePixelRatio]}
        frameloop={frameLoop}
        camera={{ position: [0, 0, HERO_ORB.cameraZ], fov: HERO_ORB.cameraFov }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          onReady?.();
        }}
      >
        <Suspense fallback={null}>
          <HeroOrb containerRef={wrapRef} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
