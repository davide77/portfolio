"use client";

import { useEffect, useState } from "react";
import { HeroGrainient } from "@/components/hero/HeroGrainient";
import { HeroWebGLLayer } from "@/components/hero/HeroWebGLLayer";
import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { HeroHeadline } from "@/components/sections/home/HeroHeadline";
import { FloatingAccentDot } from "@/components/ui/FloatingAccentDot";
import { ScrollBadge } from "@/components/ui/ScrollBadge";
import { VerticalText } from "@/components/ui/VerticalText";
import { HERO_DISPLAY } from "@/constants/content/hero-section";
import { HERO_ORB } from "@/constants/hero-webgl";
import { cx } from "@/components/cx";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [headlineReady, setHeadlineReady] = useState(reduceMotion);

  const handleCanvasReady = () => {
    window.setTimeout(() => setHeadlineReady(true), HERO_ORB.canvasFadeMs);
  };

  useEffect(() => {
    if (reduceMotion) return;
    const fallback = window.setTimeout(() => setHeadlineReady(true), HERO_ORB.canvasFadeMs + 400);
    return () => window.clearTimeout(fallback);
  }, [reduceMotion]);

  return (
    <section id="hero" className={cx("hero-section", "bg-ink")} aria-labelledby="hero-heading">
      <HeroGrainient className="hero-section__backdrop" />
      <HeroWebGLLayer className="hero-section__canvas" onCanvasReady={handleCanvasReady} />
      <div className={cx("hero-section__inner", "container-atmosphere")}>
        <p className="hero-section__eyebrow">{HERO_DISPLAY.eyebrow}</p>
        <HeroHeadline ready={headlineReady} />
      </div>
      <VerticalText className="hero-section__edge">{HERO_DISPLAY.verticalEdge}</VerticalText>
      <ScrollBadge />
      <FloatingAccentDot />
    </section>
  );
}
