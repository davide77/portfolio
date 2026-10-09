"use client";

import { useEffect, useState } from "react";
import { HeroGrainient } from "@/components/hero/HeroGrainient";
import { HeroWebGLLayer } from "@/components/hero/HeroWebGLLayer";
import { useIntroDone } from "@/components/motion/intro-context";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { HeroHeadline } from "@/components/sections/home/HeroHeadline";
import { FloatingAccentDot } from "@/components/ui/FloatingAccentDot";
import { ScrollBadge } from "@/components/ui/ScrollBadge";
import { VerticalText } from "@/components/ui/VerticalText";
import { HERO_DISPLAY } from "@/constants/content/hero-section";
import { HERO_ORB, HERO_VARIANT } from "@/constants/hero-webgl";
import { cx } from "@/components/cx";

// The glass hero brings its own field, and wants the glass to carry the frame:
// no Grainient underneath, and only the headline over it.
const IS_GLASS = HERO_VARIANT === "glass";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const introDone = useIntroDone();
  const [canvasSettled, setCanvasSettled] = useState(false);
  // The word reveal needs both: the loader gone (otherwise it plays out of
  // sight on a first visit) and the orb far enough into its fade-in.
  const headlineReady = reduceMotion || (introDone && canvasSettled);

  const handleCanvasReady = () => {
    window.setTimeout(() => setCanvasSettled(true), HERO_ORB.headlineAfterCanvasMs);
  };

  useEffect(() => {
    if (reduceMotion) return;
    const fallback = window.setTimeout(() => setCanvasSettled(true), HERO_ORB.headlineFallbackMs);
    return () => window.clearTimeout(fallback);
  }, [reduceMotion]);

  return (
    <section id="hero" className={cx("hero-section", "bg-ink")} aria-labelledby="hero-heading">
      {!IS_GLASS && <HeroGrainient className="hero-section__backdrop" />}
      <HeroWebGLLayer className="hero-section__canvas" onCanvasReady={handleCanvasReady} />
      <div className={cx("hero-section__inner", "container-atmosphere")}>
        {!IS_GLASS && <p className="hero-section__eyebrow">{HERO_DISPLAY.eyebrow}</p>}
        <HeroHeadline ready={headlineReady} />
        {!IS_GLASS && <p className="hero-section__brand-band mono">{HERO_DISPLAY.brandBand}</p>}
      </div>
      <VerticalText className="hero-section__edge">{HERO_DISPLAY.verticalEdge}</VerticalText>
      <ScrollBadge />
      <FloatingAccentDot />
    </section>
  );
}
