"use client";

import Lenis from "lenis";
import { cancelFrame, frame } from "motion-dom";
import { useEffect, useRef, type ReactNode } from "react";
import { LenisProvider } from "@/components/motion/lenis-context";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reduceMotion || coarsePointer) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    const onFrame = (data: { timestamp: number }) => {
      lenis.raf(data.timestamp);
    };

    frame.update(onFrame, true);

    return () => {
      cancelFrame(onFrame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisProvider lenisRef={lenisRef}>{children}</LenisProvider>;
}
