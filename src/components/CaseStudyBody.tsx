"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import { ButtonLink } from "./ButtonLink";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./CaseStudyBody.module.scss";

type CaseStudyBodyProps = {
  project: CaseStudy;
};

export function CaseStudyBody({ project }: CaseStudyBodyProps) {
  return (
    <article>
      <div className={styles.heroMedia}>
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          decoding="async"
        />
      </div>

      <ScrollReveal y={20}>
        <div className="container-sm has-py-8 is-flex is-flex-column has-gap-6">
          <Link href={ROUTES.home} className={cx(styles.back, "text-sm has-font-semibold is-primary")}>
            Back to home
          </Link>

          <header className="is-flex is-flex-column has-gap-3">
            <p className="text-sm is-text-muted">
              {project.role} - {project.period}
            </p>
            <h1 className="text-4xl leading-snug">{project.title}</h1>
            <p className="text-xl leading-relaxed is-text-muted">{project.tagline}</p>
            <ul className="is-flex is-flex-wrap has-gap-2" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} className={cx(styles.tag, "text-xs has-font-medium has-py-1 has-px-2 is-text-muted")}>
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          <p className="text-lg leading-relaxed">{project.summary}</p>

          <ul className={styles.list}>
            {project.highlights.map((item) => (
              <li key={item} className="text-md leading-relaxed is-text-muted has-mb-2">
                {item}
              </li>
            ))}
          </ul>

          {project.sections.map((block, index) => (
            <ScrollReveal key={block.heading} delay={index * 0.1} y={18}>
              <section className={styles.section}>
                <h2 className="text-2xl has-mb-3">{block.heading}</h2>
                <p className="text-md leading-relaxed is-text-muted">{block.body}</p>
              </section>
            </ScrollReveal>
          ))}

          <div className={cx(styles.actions, "is-flex has-gap-3 has-pt-4")}>
            <ButtonLink href={project.liveUrl} variant="primary">
              {project.liveLabel}
            </ButtonLink>
            <ButtonLink href={ROUTES.hash.work} variant="secondary">
              More work
            </ButtonLink>
          </div>
        </div>
      </ScrollReveal>
    </article>
  );
}
