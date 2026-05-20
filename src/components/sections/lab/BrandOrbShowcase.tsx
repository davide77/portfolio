"use client";

import dynamic from "next/dynamic";
import { BRAND_ORBS_SHOWCASE_COPY } from "@/constants/content/brand-orbs";

/**
 * Lazy-loaded so the R3F + drei + postprocessing bundle stays out of the
 * initial JS payload. `ssr: false` because <Canvas> needs a real DOM.
 */
const BrandOrbCluster = dynamic(
  () => import("@/components/spectacular/BrandOrbCluster").then((m) => m.BrandOrbCluster),
  { ssr: false },
);

/**
 * Two-column manifesto band - small ~320px glass-orb cluster on the left,
 * body copy on the right. Mirrors the layout of Monopo's "INTEGRATE" band.
 */
export function BrandOrbShowcase() {
  return (
    <section
      className="brand-orb-showcase has-mt-8"
      aria-labelledby="brand-orb-showcase-heading"
    >
      <div className="brand-orb-showcase__grid">
        <div className="brand-orb-showcase__canvas-frame">
          <BrandOrbCluster className="brand-orb-showcase__canvas" />
        </div>
        <div className="brand-orb-showcase__copy">
          <p className="text-xs has-font-semibold uppercase is-stone">
            {BRAND_ORBS_SHOWCASE_COPY.eyebrow}
          </p>
          <h2
            id="brand-orb-showcase-heading"
            className="text-xl has-font-medium leading-tight is-white"
          >
            {BRAND_ORBS_SHOWCASE_COPY.headline}
          </h2>
          <p className="text-lg leading-relaxed is-paper">
            {BRAND_ORBS_SHOWCASE_COPY.description}
          </p>
        </div>
      </div>
    </section>
  );
}
