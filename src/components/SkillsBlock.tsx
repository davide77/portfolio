"use client";

import { SKILLS_SECTION } from "@/constants/content/home";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";

export function SkillsBlock() {
  return (
    <section className={"skills-block__section"} aria-labelledby="skills-heading">
      <div className="container-atmosphere is-flex is-flex-column has-gap-6">
        <ScrollReveal>
          <h2 id="skills-heading" className="text-3xl is-paper">
            {SKILLS_SECTION.title}
          </h2>
        </ScrollReveal>
        <div className={cx("skills-block__grid", "is-grid has-gap-6")}>
          {SKILLS_SECTION.groups.map((group, index) => (
            <div key={group.title}>
              <ScrollReveal delay={index * 0.12} y={20}>
                <h3 className={cx("text-sm has-font-semibold uppercase has-mb-3", "skills-block__group-title")}>
                  {group.title}
                </h3>
                <ul className="is-flex is-flex-column">
                  {group.items.map((item) => (
                    <li key={item} className={cx("text-sm has-py-1", "skills-block__item")}>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
