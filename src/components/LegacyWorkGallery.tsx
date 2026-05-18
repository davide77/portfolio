"use client";

import Image from "next/image";
import { ARCHIVE_SECTION, ARCHIVE_TILES } from "@/constants/content/archive-work";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";

export function LegacyWorkGallery() {
  return (
    <section id={ARCHIVE_SECTION.id} className={"legacy-work-gallery__section"} aria-labelledby="archive-heading">
      <div className={cx("legacy-work-gallery__inner", "container-atmosphere")}>
        <ScrollReveal>
          <div className={"legacy-work-gallery__header-row"}>
            <p className={cx("legacy-work-gallery__kicker", "is-inline-flex is-align-center has-gap-2 text-xs has-font-semibold uppercase has-mb-3")}>
              <span className={"legacy-work-gallery__kicker-rule"} aria-hidden />
              Archive
            </p>
            <h2 id="archive-heading" className="text-3xl is-cream has-mt-2">
              {ARCHIVE_SECTION.title}
            </h2>
            <p className={cx("legacy-work-gallery__intro", "text-lg leading-relaxed has-mt-3 measure-62ch")}>
              {ARCHIVE_SECTION.intro}
            </p>
          </div>
        </ScrollReveal>

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
              <div className={"legacy-work-gallery__frame"}>
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  className={"legacy-work-gallery__image"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
