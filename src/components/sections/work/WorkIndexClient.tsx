"use client";

import { useState } from "react";
import Link from "next/link";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { DisplayText } from "@/components/ui/DisplayText";
import { RevealImage } from "@/components/motion/RevealImage";
import {
  PROJECT_FILTERS,
  getSortedCaseStudies,
  type ProjectIndustry,
} from "@/constants/content/projects";
import { WORK_INDEX } from "@/constants/content/work-index";
import { ROUTES } from "@/constants/routes";
import { cx } from "@/components/cx";
import styles from "./WorkIndexClient.module.scss";

export function WorkIndexClient() {
  const [filter, setFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const projects = getSortedCaseStudies().filter((p) =>
    filter === "all" ? true : p.industry === (filter as ProjectIndustry),
  );

  return (
    <div className="container-atmosphere has-py-8">
      <EyebrowLabel>{WORK_INDEX.eyebrow}</EyebrowLabel>
      <DisplayText as="h1" className="has-mt-4">
        {WORK_INDEX.headline}
      </DisplayText>
      <p className="has-mt-4">
        <button
          type="button"
          className={cx(styles.filterToggle, "text-sm has-font-medium")}
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
        >
          {WORK_INDEX.filterToggleLabel}
        </button>
      </p>
      {showFilters ? (
        <ul className={cx(styles.filters, "is-flex is-flex-wrap has-gap-2 has-mt-3")}>
          {PROJECT_FILTERS.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                className={cx(styles.chip, filter === f.id && styles.chipActive)}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className={cx(styles.card, index % 2 === 1 && styles.cardReverse)}
            data-magnetic
            data-cursor-text="View"
          >
            <Link href={ROUTES.work(project.slug)} className={styles.cardLink}>
              <span className={styles.index}>{String(project.order).padStart(2, "0")}</span>
              <div className={styles.copy}>
                <p className="text-xs is-text-muted">
                  {project.period} · {project.client}
                </p>
                <h2 className="text-2xl">{project.title}</h2>
                <p className="text-md is-text-muted">{project.outcome}</p>
                <ul className="is-flex is-flex-wrap has-gap-2 has-mt-3">
                  {project.tags.slice(0, 4).map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <RevealImage
                src={project.imageSrc}
                alt={project.imageAlt}
                width={800}
                height={600}
                className={styles.thumb}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
