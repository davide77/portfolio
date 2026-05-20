"use client";

import dynamic from "next/dynamic";
import { DISC_LENS_LAB_PAGE } from "@/constants/content/disc-lens-lab";

/**
 * Client-only wrapper for the disc lens previews. The canvas needs a
 * real DOM so we lazy-import `BlobAccent` with `ssr: false`.
 */
const BlobAccent = dynamic(
  () => import("@/components/blobs/BlobAccent.client").then((m) => m.BlobAccent),
  { ssr: false },
);

export function DiscLensPreview() {
  const { hero } = DISC_LENS_LAB_PAGE;

  return (
    <section className="disc-lens-lab has-mt-8" aria-label="Disc lens compositions">
      <div className="disc-lens-lab__hero">
        <div className="disc-lens-lab__hero-frame">
          <BlobAccent composition={hero.composition} />
        </div>
        <div className="is-flex is-flex-column has-gap-1">
          <p className="text-xs has-font-semibold uppercase is-stone-gray">
            {hero.label}
          </p>
          <p className="text-base leading-relaxed is-cream">{hero.caption}</p>
        </div>
      </div>

      <ul className="disc-lens-lab__grid has-mt-8" role="list">
        {DISC_LENS_LAB_PAGE.panels.map((panel) => (
          <li key={panel.key} className="disc-lens-lab__panel">
            <div className="disc-lens-lab__canvas-frame">
              <BlobAccent composition={panel.key} />
            </div>
            <div className="is-flex is-flex-column has-gap-1">
              <p className="text-xs has-font-semibold uppercase is-stone-gray">
                {panel.label} - {panel.loopSec}s loop
              </p>
              <p className="text-base leading-relaxed is-cream">{panel.caption}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
