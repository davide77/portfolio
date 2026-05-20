"use client";

import Image from "next/image";
import { ARCHIVE_SECTION, ARCHIVE_TILES } from "@/constants/content/archive-work";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";

export function LegacyWorkGallery() {
  return (
    <section id={ARCHIVE_SECTION.id} className={"legacy-work-gallery__section"}>
      <div className={cx("legacy-work-gallery__inner", "container-atmosphere")}>
        <div className={cx("legacy-work-gallery__bento", "is-grid has-gap-3")}>
          {ARCHIVE_TILES.map((tile, index) => (
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
    </section>
  );
}
