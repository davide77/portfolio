import Link from "next/link";
import type { CaseStudy } from "@/constants/content/projects";
import { getNextCaseStudy } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import { RevealImage } from "@/components/motion/RevealImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { CASE_STUDY } from "@/constants/content/case-study";
import { cx } from "@/components/cx";

type CaseStudyTemplateProps = {
  project: CaseStudy;
};

export function CaseStudyTemplate({ project }: CaseStudyTemplateProps) {
  const next = getNextCaseStudy(project.slug);

  return (
    <article>
      <main id="main">
        <div className="container-atmosphere has-py-8">
          <Link href={ROUTES.workIndex} className={cx("case-study-template__back", "text-sm has-font-semibold is-primary")}>
            {CASE_STUDY.backToWorkLabel}
          </Link>
          <header className="is-flex is-flex-column has-gap-3 has-mt-5">
            <EyebrowLabel>{project.client}</EyebrowLabel>
            <h1 className="text-4xl leading-snug">{project.title}</h1>
            <p className="text-xl leading-relaxed is-text-muted">{project.tagline}</p>
            <p className="text-lg has-font-semibold is-primary">{project.outcome}</p>
            <p className="text-sm is-text-muted">
              {project.role} · {project.period}
            </p>
            <ul className="is-flex is-flex-wrap has-gap-2" aria-label={CASE_STUDY.technologiesAriaLabel}>
              {project.tags.map((tag) => (
                <li key={tag} className={cx("case-study-template__tag", "text-xs has-font-medium has-py-1 has-px-2")}>
                  {tag}
                </li>
              ))}
            </ul>
          </header>
        </div>
        <div className="container-atmosphere has-py-6">
          <RevealImage
            src={project.imageSrc}
            alt={project.imageAlt}
            width={1400}
            height={900}
            priority
            className={"case-study-template__hero-image"}
          />
        </div>
        <div className="container-sm has-py-8 is-flex is-flex-column has-gap-8">
          <section>
            <h2 className="text-2xl has-mb-3">{CASE_STUDY.sections.brief}</h2>
            <p className="text-lg leading-relaxed">{project.brief}</p>
          </section>
          <section>
            <h2 className="text-2xl has-mb-4">{CASE_STUDY.sections.work}</h2>
            <ol className={"case-study-template__work-list"}>
              {project.workPoints.map((point, i) => (
                <li key={point.title} className={"case-study-template__work-item"}>
                  <span className={"case-study-template__work-index"}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg has-font-semibold">{point.title}</h3>
                    <p className="text-md leading-relaxed is-text-muted has-m-0">{point.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className="text-2xl has-mb-3">{CASE_STUDY.sections.outcome}</h2>
            <p className="text-lg leading-relaxed">{project.outcome}</p>
          </section>
          {project.sections.map((block) => (
            <section key={block.heading}>
              <h2 className="text-2xl has-mb-3">{block.heading}</h2>
              <p className="text-md leading-relaxed is-text-muted">{block.body}</p>
            </section>
          ))}
          <section aria-label={CASE_STUDY.artefactsAriaLabel}>
            <h2 className="text-2xl has-mb-4">{CASE_STUDY.sections.artefacts}</h2>
            <ul className={"case-study-template__artefacts"}>
              {project.artefacts.map((art) => (
                <li key={art.src} className="case-study-template__artefact">
                  <RevealImage src={art.src} alt={art.alt} width={1200} height={800} />
                  <p className="text-sm is-text-muted has-mt-2">{art.caption}</p>
                </li>
              ))}
            </ul>
          </section>
          <div className="is-flex is-flex-wrap has-gap-3">
            <MagneticButton href={project.liveUrl} cursorText={CASE_STUDY.liveCursorText} external>
              {project.liveLabel}
            </MagneticButton>
          </div>
          {next ? (
            <section className={"case-study-template__next"}>
              <EyebrowLabel>{CASE_STUDY.nextProjectLabel}</EyebrowLabel>
              <Link href={ROUTES.work(next.slug)} className={"case-study-template__next-link"}>
                <span className="text-2xl">{next.title}</span>
                <span className="text-sm is-text-muted">{next.outcome}</span>
              </Link>
            </section>
          ) : null}
        </div>
      </main>
    </article>
  );
}
