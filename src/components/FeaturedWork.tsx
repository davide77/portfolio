"use client";

import { getFeaturedCaseStudies } from "@/constants/content/projects";
import { FEATURED_WORK_SECTION } from "@/constants/content/home";
import { cx } from "./cx";
import { ProjectCard } from "./ProjectCard";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./FeaturedWork.module.scss";

export function FeaturedWork() {
  const projects = getFeaturedCaseStudies();

  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={cx("container-atmosphere", styles.stack, "is-flex is-flex-column has-gap-11")}>
        <ScrollReveal>
          <div className="is-flex is-flex-column has-gap-3">
            <p className={cx(styles.kicker, "is-inline-flex is-align-center has-gap-2 text-xs has-font-semibold uppercase")}>
              <span className={styles.kickerRule} aria-hidden />
              {FEATURED_WORK_SECTION.kicker}
            </p>
            <h2 id="work-heading" className="text-3xl is-cream">
              {FEATURED_WORK_SECTION.title}
            </h2>
            <p className={cx(styles.intro, "text-lg leading-relaxed measure-62ch")}>{FEATURED_WORK_SECTION.intro}</p>
          </div>
        </ScrollReveal>
        <div className={cx(styles.grid, "is-grid has-gap-11")}>
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.slug}
              className={cx(styles.revealStretch, "is-flex is-flex-column")}
              delay={index * 0.1}
              y={20}
            >
              <ProjectCard project={project} tone="ink" />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
