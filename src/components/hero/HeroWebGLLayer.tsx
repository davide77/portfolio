"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { HeroPlaceholder } from "@/components/hero/HeroPlaceholder";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { cx } from "@/components/cx";

const HeroCanvas = dynamic(
  () => import("@/components/hero/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

type HeroWebGLLayerProps = {
  className?: string;
  onCanvasReady?: () => void;
};

/** Lazy WebGL monogram with static placeholder and fade-in. */
export function HeroWebGLLayer({ className, onCanvasReady }: HeroWebGLLayerProps) {
  const reduceMotion = useReducedMotion();
  const [canvasReady, setCanvasReady] = useState(false);

  if (reduceMotion) {
    return <HeroPlaceholder className={className} visible />;
  }

  return (
    <div className={cx("hero-webgl-layer", className)}>
      <HeroPlaceholder visible={!canvasReady} />
      <HeroCanvas
        className={cx("hero-webgl-layer__canvas", canvasReady && "hero-webgl-layer__canvas--ready")}
        onReady={() => {
          window.setTimeout(() => {
            setCanvasReady(true);
            onCanvasReady?.();
          }, 32);
        }}
      />
    </div>
  );
}

