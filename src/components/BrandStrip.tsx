"use client";

import { BRAND_STRIP } from "@/constants/content/home";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./BrandStrip.module.scss";

export function BrandStrip() {
  return (
    <section className={styles.section} aria-label={BRAND_STRIP.title}>
      <div className="container-lg is-flex is-flex-column has-gap-6">
        <ScrollReveal>
          <div className={styles.headerBlock}>
            <p className={cx(styles.kicker, "is-inline-flex is-align-center has-gap-2 text-xs has-font-semibold uppercase is-primary")}>
              <span className={styles.kickerRule} aria-hidden />
              {BRAND_STRIP.kicker}
            </p>
            <h2 className={cx(styles.title, "text-2xl has-mt-2")}>{BRAND_STRIP.title}</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08} y={14}>
          <ul className="is-flex is-flex-wrap has-gap-3">
            {BRAND_STRIP.names.map((name) => (
              <li key={name} className={styles.pillWrap}>
                <span className={cx(styles.pill, "is-inline-flex is-align-center text-sm has-font-medium has-px-4 has-py-2 is-text")}>
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
