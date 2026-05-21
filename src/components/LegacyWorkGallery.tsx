"use client";

import Image from "next/image";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import {
  ARCHIVE_GROUPS,
  ARCHIVE_SECTION,
  ARCHIVE_TILES,
} from "@/constants/content/archive-work";
import { LAB_ARCHIVE_SECTION } from "@/constants/content/lab-page";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";

export function LegacyWorkGallery() {
  return (
    <section id={ARCHIVE_SECTION.id} className={"legacy-work-gallery__section"} aria-labelledby="lab-archive-title">
      <div className={cx("legacy-work-gallery__inner", "container-atmosphere")}>
        <header className="legacy-work-gallery__header">
          <EyebrowLabel className="is-orb-glow">{LAB_ARCHIVE_SECTION.eyebrow}</EyebrowLabel>
          <h2 id="lab-archive-title" className="section-title is-paper has-mt-3">
            {LAB_ARCHIVE_SECTION.headline}
          </h2>
          <p className="legacy-work-gallery__lead is-cream has-mt-3">{LAB_ARCHIVE_SECTION.intro}</p>
        </header>
        {ARCHIVE_GROUPS.map((group) => {
          const tiles = ARCHIVE_TILES.filter((t) => t.group === group.id);
          if (tiles.length === 0) return null;
          return (
            <div key={group.id} className="legacy-work-gallery__group">
              <header className="legacy-work-gallery__group-head">
                <h3 className="legacy-work-gallery__group-title">{group.title}</h3>
                <p className="legacy-work-gallery__group-intro">{group.intro}</p>
              </header>
              <div className={cx("legacy-work-gallery__bento", "is-grid has-gap-3")}>
                {tiles.map((tile, index) => (
                  <ScrollReveal
                    key={tile.src}
                    className={cx(
                      "legacy-work-gallery__tile",
                      tile.layout === "wide" && "legacy-work-gallery__tile-wide",
                      tile.layout === "tall" && "legacy-work-gallery__tile-tall",
                    )}
                    delay={Math.min(index * 0.04, 0.6)}
                    y={18}
                  >
                    <figure className={"legacy-work-gallery__figure"}>
                      <div className={"legacy-work-gallery__frame"}>
                        <Image
                          src={tile.src}
                          alt={tile.alt}
                          fill
                          className={"legacy-work-gallery__image"}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <figcaption className={"legacy-work-gallery__caption"}>
                        <span className={"legacy-work-gallery__caption-label"}>{tile.label}</span>
                        <span className={"legacy-work-gallery__caption-client"}>{tile.client}</span>
                        <span className={"legacy-work-gallery__caption-blurb"}>{tile.blurb}</span>
                      </figcaption>
                    </figure>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
