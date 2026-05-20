"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import { CASE_STUDY } from "@/constants/content/case-study";
import { ButtonLink } from "./ButtonLink";
import { cx } from "./cx";
import { ScrollReveal } from "./ScrollReveal";

type CaseStudyBodyProps = {
  project: CaseStudy;
};

export function CaseStudyBody({ project }: CaseStudyBodyProps) {
  return (
    <article>
      <div className={"case-study-body__hero-media"}>
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          priority
          sizes="100vw"
          className={"case-study-body__hero-image"}
          decoding="async"
        />
      </div>

      <ScrollReveal y={20}>
        <div className="container-sm has-py-8 is-flex is-flex-column has-gap-6">
          <Link href={ROUTES.home} className={cx("case-study-body__back", "text-sm has-font-semibold is-forest")}>
            {CASE_STUDY.backToHomeLabel}
          </Link>

          <header className="is-flex is-flex-column has-gap-3">
            <p className="text-sm is-stone">
              {project.role} - {project.period}
            </p>
            <h1 className="text-4xl leading-snug">{project.title}</h1>
            <p className="text-xl leading-relaxed is-stone">{project.tagline}</p>
            <ul className="is-flex is-flex-wrap has-gap-2" aria-label={CASE_STUDY.technologiesAriaLabel}>
              {project.tags.map((tag) => (
                <li key={tag} className={cx("case-study-body__tag", "text-xs has-font-medium has-py-1 has-px-2 is-stone")}>
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          <p className="text-lg leading-relaxed">{project.summary}</p>

          <ul className={"case-study-body__list"}>
            {project.highlights.map((item) => (
              <li key={item} className="text-md leading-relaxed is-stone has-mb-2">
                {item}
              </li>
            ))}
          </ul>

          {project.sections.map((block, index) => (
            <ScrollReveal key={block.heading} delay={index * 0.1} y={18}>
              <section className={"case-study-body__section"}>
                <h2 className="text-2xl has-mb-3">{block.heading}</h2>
                <p className="text-md leading-relaxed is-stone">{block.body}</p>
              </section>
            </ScrollReveal>
          ))}

          <div className={cx("case-study-body__actions", "is-flex has-gap-3 has-pt-4")}>
            <ButtonLink href={project.liveUrl} variant="primary">
              {project.liveLabel}
            </ButtonLink>
            <ButtonLink href={ROUTES.hash.work} variant="secondary">
              {CASE_STUDY.moreWorkLabel}
            </ButtonLink>
          </div>
        </div>
      </ScrollReveal>
    </article>
  );
}
