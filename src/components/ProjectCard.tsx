"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import { CASE_STUDY } from "@/constants/content/case-study";
import { motion, useReducedMotion } from "framer-motion";
import { cx } from "./cx";

type ProjectCardProps = {
  project: CaseStudy;
  /** `ink` = monopo-style frosted glass on dark bands (featured work). */
  tone?: "paper" | "ink";
};

export function ProjectCard({ project, tone = "paper" }: ProjectCardProps) {
  const studyHref = ROUTES.work(project.slug);
  const reduceMotion = useReducedMotion();
  const ink = tone === "ink";

  return (
    <motion.article
      className={cx("project-card__card", "is-flex is-flex-column is-flex-1", ink && "project-card__card--ink")}
      whileHover={reduceMotion ? undefined : { scale: ink ? 1.008 : 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link href={studyHref} className={"project-card__image-link"} aria-label={`${CASE_STUDY.viewCaseStudyAriaPrefix} ${project.title}`}>
        <div className={"project-card__media"}>
          <Image
            src={project.imageSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={"project-card__image"}
            priority={project.slug === "nannynow"}
            decoding="async"
          />
        </div>
      </Link>
      <div className="is-flex is-flex-column has-gap-3 has-p-5 is-flex-1">
        <div>
          <h3 className="text-xl">
            <Link href={studyHref} className={cx("project-card__title-link", !ink && "is-ink")}>
              {project.title}
            </Link>
          </h3>
          <p className={cx("project-card__meta", "text-sm is-stone has-mt-2")}>{project.tagline}</p>
        </div>
        <p className={cx("project-card__summary", "text-sm leading-relaxed is-stone has-m-0")}>{project.summary}</p>
        <ul className="is-flex is-flex-wrap has-gap-2" aria-label={CASE_STUDY.technologiesAriaLabel}>
          {project.tags.slice(0, 5).map((tag) => (
            <li key={tag} className={cx("project-card__tag", "text-xs has-font-medium has-py-1 has-px-2 is-stone")}>
              {tag}
            </li>
          ))}
        </ul>
        <div className={cx("project-card__links", "is-flex is-align-center is-flex-wrap has-gap-4 has-pt-3")}>
          <Link href={studyHref} className={cx("project-card__link-primary", "has-font-semibold text-sm is-forest")}>
            {CASE_STUDY.viewCaseStudyLabel}
          </Link>
          <a
            href={project.liveUrl}
            className={cx("project-card__link-secondary", "text-sm is-stone")}
            rel="noopener noreferrer"
            target="_blank"
          >
            {project.liveLabel}
          </a>
        </div>
      </div>
    </motion.article>
  );
}
