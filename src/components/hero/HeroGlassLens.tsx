"use client";

import { useEffect, useRef, useState } from "react";
import {
  createGlassLensScene,
  type GlassLensScene,
} from "@/components/hero/glass-lens/createGlassLensScene";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { HERO_GLASS_MAX_DPR } from "@/constants/hero-webgl";
import { useVisibility } from "@/hooks/useVisibility";

type HeroGlassLensProps = {
  className?: string;
  onReady?: () => void;
};

/**
 * Lens hero canvas: two glass Ds over the banded field. Plain three.js rather
 * than R3F, because the look depends on its own pass order (reflection cube,
 * screen copy for the glass, multisampled grain). Pauses offscreen and in
 * background tabs, like HeroCanvas.
 */
export function HeroGlassLens({ className, onReady }: HeroGlassLensProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<GlassLensScene | null>(null);
  const onReadyRef = useRef(onReady);
  const visible = useVisibility(wrapRef, { threshold: 0.05 });
  const [tabVisible, setTabVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    let scene: GlassLensScene;
    try {
      scene = createGlassLensScene(canvas, {
        reduceMotion,
        isMobile,
        maxDpr: HERO_GLASS_MAX_DPR,
        onFirstFrame: () => onReadyRef.current?.(),
      });
    } catch {
      // No WebGL: the placeholder stays up and the headline falls back on its timer.
      return;
    }
    sceneRef.current = scene;
    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, [reduceMotion]);

  useEffect(() => {
    sceneRef.current?.setRunning(visible && tabVisible);
  }, [visible, tabVisible, reduceMotion]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} aria-hidden />
    </div>
  );
}
