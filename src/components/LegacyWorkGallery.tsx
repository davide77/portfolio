"use client";

import Image from "next/image";
import { ARCHIVE_SECTION, ARCHIVE_TILES } from "@/constants/content/archive-work";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./LegacyWorkGallery.module.scss";

export function LegacyWorkGallery() {
  return (
    <section id={ARCHIVE_SECTION.id} className={styles.section} aria-labelledby="archive-heading">
      <div className={cx(styles.inner, "container-atmosphere")}>
        <ScrollReveal>
          <div className={styles.headerRow}>
            <p className={cx(styles.kicker, "is-inline-flex is-align-center has-gap-2 text-xs has-font-semibold uppercase has-mb-3")}>
              <span className={styles.kickerRule} aria-hidden />
              Archive
            </p>
            <h2 id="archive-heading" className="text-3xl is-cream has-mt-2">
              {ARCHIVE_SECTION.title}
            </h2>
            <p className={cx(styles.intro, "text-lg leading-relaxed has-mt-3 measure-62ch")}>
              {ARCHIVE_SECTION.intro}
            </p>
          </div>
        </ScrollReveal>

        <div className={cx(styles.bento, "is-grid has-gap-3")}>
          {ARCHIVE_TILES.map((tile, index) => (
            <ScrollReveal
              key={tile.src}
              className={cx(
                styles.tile,
                tile.layout === "wide" && styles.tileWide,
                tile.layout === "tall" && styles.tileTall,
              )}
              delay={Math.min(index * 0.04, 0.6)}
              y={18}
            >
              <div className={styles.frame}>
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  className={styles.image}
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
