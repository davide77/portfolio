"use client";

import { BRAND_STRIP } from "@/constants/content/home";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";

export function BrandStrip() {
  return (
    <section className={"brand-strip__section"} aria-label={BRAND_STRIP.title}>
      <div className="container-lg is-flex is-flex-column has-gap-6">
        <ScrollReveal>
          <div className={"brand-strip__header-block"}>
            <p className={cx("brand-strip__kicker", "is-inline-flex is-align-center has-gap-2 text-xs has-font-semibold uppercase is-forest")}>
              <span className={"brand-strip__kicker-rule"} aria-hidden />
              {BRAND_STRIP.kicker}
            </p>
            <h2 className={cx("brand-strip__title", "text-2xl has-mt-2")}>{BRAND_STRIP.title}</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08} y={14}>
          <ul className="is-flex is-flex-wrap has-gap-3">
            {BRAND_STRIP.names.map((name) => (
              <li key={name} className={"brand-strip__pill-wrap"}>
                <span className={cx("brand-strip__pill", "is-inline-flex is-align-center text-sm has-font-medium has-px-4 has-py-2 is-ink")}>
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
