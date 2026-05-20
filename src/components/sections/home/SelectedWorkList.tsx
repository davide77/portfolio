"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cx } from "@/components/cx";
import { CASE_STUDY } from "@/constants/content/case-study";
import { SELECTED_WORK_SECTION } from "@/constants/content/home";
import type { CaseStudy } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import { DURATION_HERO, DURATION_UI, EASE_EDITORIAL } from "@/lib/motion";

type SelectedWorkListProps = {
  projects: readonly CaseStudy[];
};

export function SelectedWorkList({ projects }: SelectedWorkListProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const toggle = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
  };

  return (
    <ul className={"selected-work__list is-flex is-flex-column has-gap-10"}>
      {projects.map((project, index) => {
        const isOpen = openSlug === project.slug;
        const isMirror = index % 2 === 1;
        const panelId = `selected-work-panel-${project.slug}`;

        return (
          <li
            key={project.slug}
            className={cx(
              "selected-work__row",
              isMirror && "selected-work__row--mirror",
              isOpen && "selected-work__row--open",
            )}
          >
            <p className={"selected-work__role text-xs uppercase has-font-semibold"}>
              {project.role}
            </p>

            <div className={"selected-work__body"}>
              <div className={"selected-work__media is-flex is-flex-column has-gap-3"}>
                <motion.div
                  className={"selected-work__frame"}
                  initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: DURATION_HERO, ease: EASE_EDITORIAL }}
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 700px) 100vw, 440px"
                    className={"selected-work__image"}
                    decoding="async"
                  />
                </motion.div>

                <p className={"selected-work__index text-sm"}>
                  {SELECTED_WORK_SECTION.formatIndex(project.order)}
                </p>
              </div>

              <div className={"selected-work__detail"}>
                <h3 className={"selected-work__name"}>{project.title}</h3>

                <motion.button
                  type="button"
                  className={cx(
                    "selected-work__toggle",
                    isOpen && "selected-work__toggle--open",
                  )}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={`${
                    isOpen
                      ? SELECTED_WORK_SECTION.collapseAriaPrefix
                      : SELECTED_WORK_SECTION.expandAriaPrefix
                  } ${project.title}`}
                  onClick={() => toggle(project.slug)}
                  animate={reduceMotion ? { y: 0 } : { y: [0, -5, 0] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 5, ease: "easeInOut", repeat: Infinity }
                  }
                >
                  <span className={"selected-work__toggle-icon"} aria-hidden="true">
                    <span
                      className={"selected-work__toggle-bar selected-work__toggle-bar--h"}
                    />
                    {reduceMotion ? (
                      !isOpen && (
                        <span
                          className={
                            "selected-work__toggle-bar selected-work__toggle-bar--v"
                          }
                        />
                      )
                    ) : (
                      <motion.span
                        className={
                          "selected-work__toggle-bar selected-work__toggle-bar--v"
                        }
                        animate={{ scaleY: isOpen ? 0 : 1 }}
                        transition={{ duration: DURATION_UI, ease: EASE_EDITORIAL }}
                      />
                    )}
                  </span>
                </motion.button>

                {reduceMotion
                  ? isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-label={`${SELECTED_WORK_SECTION.panelAriaPrefix} ${project.title}`}
                        className={"selected-work__panel"}
                      >
                        <PanelInner project={project} />
                      </div>
                    )
                  : (
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-label={`${SELECTED_WORK_SECTION.panelAriaPrefix} ${project.title}`}
                            className={"selected-work__panel"}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: DURATION_UI, ease: EASE_EDITORIAL }}
                          >
                            <PanelInner project={project} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function PanelInner({ project }: { project: CaseStudy }) {
  return (
    <div className={"selected-work__panel-inner"}>
      <p className={"selected-work__summary text-base leading-relaxed"}>
        {project.summary}
      </p>
      <div
        className={
          "selected-work__links is-flex is-flex-wrap is-align-center has-gap-5 has-mt-4"
        }
      >
        <Link
          href={ROUTES.work(project.slug)}
          className={"selected-work__link selected-work__link--primary has-font-semibold"}
          aria-label={`${CASE_STUDY.viewCaseStudyAriaPrefix} ${project.title}`}
        >
          {CASE_STUDY.viewCaseStudyLabel}
        </Link>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={"selected-work__link selected-work__link--secondary"}
        >
          {project.liveLabel}
        </a>
      </div>
    </div>
  );
}