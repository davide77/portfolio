"use client";

import { LabHeroCanvas } from "@/components/hero/LabHeroCanvas";
import { VerticalText } from "@/components/ui/VerticalText";
import { LAB_HERO_COPY } from "@/constants/content/lab-page";
import { cx } from "@/components/cx";

/**
 * /lab hero - five-orb constellation with brand-sanctioned green refraction
 * on two of the orbs (--orb-glow, per brand.md). Same shader as the home
 * hero; different geometry placement and a glow palette on a subset.
 */
export function LabHero() {
  return (
    <section className={cx("lab-hero", "bg-ink")} aria-labelledby="lab-hero-title">
      <LabHeroCanvas className="lab-hero__canvas" />
      <div className={cx("lab-hero__inner", "container-atmosphere")}>
        <p className="lab-hero__eyebrow mono is-orb-glow">{LAB_HERO_COPY.eyebrow}</p>
        <h1 id="lab-hero-title" className="lab-hero__headline is-paper">
          {LAB_HERO_COPY.headlineBefore}{" "}
          <em className="lab-hero__emphasis">{LAB_HERO_COPY.headlineEmphasis}</em>
          {LAB_HERO_COPY.headlineAfter}
        </h1>
        <p className="lab-hero__subhead mono">{LAB_HERO_COPY.subhead}</p>
      </div>
      <VerticalText className="lab-hero__edge is-orb-glow">{LAB_HERO_COPY.verticalEdge}</VerticalText>
    </section>
  );
}
