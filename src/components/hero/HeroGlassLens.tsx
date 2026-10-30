"use client";

import { useEffect, useRef, useState } from "react";
import {
  createGlassLensScene,
  type AvoidRect,
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
    // The Ds are laid out around the headline, so read where it actually sits.
    const heading = document.getElementById("hero-heading");
    const getAvoidRect = (): AvoidRect | null => {
      if (!heading) return null;
      const c = canvas.getBoundingClientRect();
      // The text itself, not the h1 box: the line is centred in a wider box.
      const range = document.createRange();
      range.selectNodeContents(heading);
      const h = range.getBoundingClientRect();
      if (!c.width || !c.height || !h.width) return null;
      return {
        left: (h.left - c.left) / c.width,
        right: (h.right - c.left) / c.width,
        top: (h.top - c.top) / c.height,
        bottom: (h.bottom - c.top) / c.height,
      };
    };
    let scene: GlassLensScene;
    try {
      scene = createGlassLensScene(canvas, {
        reduceMotion,
        isMobile,
        maxDpr: HERO_GLASS_MAX_DPR,
        onFirstFrame: () => onReadyRef.current?.(),
        getAvoidRect,
      });
    } catch {
      // No WebGL: the placeholder stays up and the headline falls back on its timer.
      return;
    }
    sceneRef.current = scene;
    // Web fonts and wrapping change the headline's box after first paint.
    const headingObserver = new ResizeObserver(() => scene.relayout());
    if (heading) headingObserver.observe(heading);
    return () => {
      headingObserver.disconnect();
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
