"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import { motion, useReducedMotion } from "framer-motion";
import { cx } from "./cx";
import styles from "./ProjectCard.module.scss";

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
      className={cx(styles.card, "is-flex is-flex-column is-flex-1", ink && styles.cardInk)}
      whileHover={reduceMotion ? undefined : { scale: ink ? 1.008 : 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link href={studyHref} className={styles.imageLink} aria-label={`View case study: ${project.title}`}>
        <div className={styles.media}>
          <Image
            src={project.imageSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={project.slug === "nannynow"}
            decoding="async"
          />
        </div>
      </Link>
      <div className="is-flex is-flex-column has-gap-3 has-p-5 is-flex-1">
        <div>
          <h3 className="text-xl">
            <Link href={studyHref} className={cx(styles.titleLink, !ink && "is-text")}>
              {project.title}
            </Link>
          </h3>
          <p className={cx(styles.meta, "text-sm is-text-muted has-mt-2")}>{project.tagline}</p>
        </div>
        <p className={cx(styles.summary, "text-sm leading-relaxed is-text-muted has-m-0")}>{project.summary}</p>
        <ul className="is-flex is-flex-wrap has-gap-2" aria-label="Technologies">
          {project.tags.slice(0, 5).map((tag) => (
            <li key={tag} className={cx(styles.tag, "text-xs has-font-medium has-py-1 has-px-2 is-text-muted")}>
              {tag}
            </li>
          ))}
        </ul>
        <div className={cx(styles.links, "is-flex is-align-center is-flex-wrap has-gap-4 has-pt-3")}>
          <Link href={studyHref} className={cx(styles.linkPrimary, "has-font-semibold text-sm is-primary")}>
            View case study
          </Link>
          <a
            href={project.liveUrl}
            className={cx(styles.linkSecondary, "text-sm is-text-muted")}
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
