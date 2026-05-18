"use client";

import { ABOUT_SECTION, EXPERIENCE_SECTION } from "@/constants/content/home";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";

export function ExperienceBlock() {
  return (
    <section className={"experience-block__section"} aria-label="About and experience">
      <div className="container-atmosphere is-flex is-flex-column has-gap-9">
        <ScrollReveal>
          <div className="is-flex is-flex-column has-gap-4">
            <h2 className="text-3xl is-cream">{ABOUT_SECTION.title}</h2>
            {ABOUT_SECTION.paragraphs.map((p) => (
              <p key={p} className={cx("text-lg leading-relaxed measure-72ch", "experience-block__body-muted")}>
                {p}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <div className="is-flex is-flex-column has-gap-6">
          <ScrollReveal y={20}>
            <div className="is-flex is-flex-column has-gap-3">
              <h2 className="text-3xl is-cream">{EXPERIENCE_SECTION.title}</h2>
              <p className={cx("text-lg leading-relaxed measure-72ch", "experience-block__body-muted")}>{EXPERIENCE_SECTION.intro}</p>
            </div>
          </ScrollReveal>
          <ul className="is-flex is-flex-column has-gap-6">
            {EXPERIENCE_SECTION.items.map((item, index) => (
              <li key={`${item.org}-${item.period}`} className={"experience-block__item"}>
                <ScrollReveal delay={index * 0.1} y={18}>
                  <div>
                    <p className={cx("text-sm has-font-medium", "experience-block__period")}>{item.period}</p>
                    <h3 className={cx("text-xl has-mt-2", "experience-block__heading")}>{item.title}</h3>
                    <p className={cx("text-md has-font-semibold has-mt-1", "experience-block__org")}>{item.org}</p>
                    <p className={cx("has-mt-3 text-base leading-relaxed", "experience-block__body-muted")}>{item.summary}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
