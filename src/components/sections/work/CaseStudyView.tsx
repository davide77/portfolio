import Link from "next/link";
import { RevealImage } from "@/components/motion/RevealImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { cx } from "@/components/cx";
import { CASE_STUDY } from "@/constants/content/case-study";
import type { CaseStudy } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";

type CaseStudyViewProps = {
  project: CaseStudy;
  nextProject?: CaseStudy;
};

/**
 * A single case study as its own standalone page. Replaces the inline
 * #case-<slug> home section: this is a distinct place, so it leads and
 * closes with a prominent "Back to home" button and offers the next study.
 */
export function CaseStudyView({ project, nextProject }: CaseStudyViewProps) {
  return (
    <main id="main" className="case-study-page" aria-labelledby="case-study-title">
      <div className="container-atmosphere has-py-4">
        <MagneticButton href={ROUTES.home} variant="ghostOnInk">
          {CASE_STUDY.backToHomeLabel}
        </MagneticButton>
      </div>

      <div className="container-atmosphere">
        <header className="is-flex is-flex-column has-gap-3">
          <EyebrowLabel>{project.client}</EyebrowLabel>
          <h1 id="case-study-title" className="text-4xl leading-snug">
            {project.title}
          </h1>
          <p className="text-xl leading-relaxed is-stone">{project.tagline}</p>
          <p className="text-lg has-font-semibold is-forest">{project.outcome}</p>
          <p className="text-sm is-stone">
            {project.role} · {project.period}
          </p>
          <ul
            className="is-flex is-flex-wrap has-gap-2"
            aria-label={CASE_STUDY.technologiesAriaLabel}
          >
            {project.tags.map((tag) => (
              <li
                key={tag}
                className={cx(
                  "case-study-template__tag",
                  "text-xs has-font-medium has-py-1 has-px-2",
                )}
              >
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
          className={"case-study-template__hero-image"}
          priority
        />
      </div>

      <div className="container-sm is-flex is-flex-column has-gap-8">
        <section>
          <h2 className="text-2xl has-mb-3">{CASE_STUDY.sections.brief}</h2>
          <p className="text-lg leading-relaxed">{project.brief}</p>
        </section>
        <section>
          <h2 className="text-2xl has-mb-4">{CASE_STUDY.sections.work}</h2>
          <ol className={"case-study-template__work-list"}>
            {project.workPoints.map((point, i) => (
              <li key={point.title} className={"case-study-template__work-item"}>
                <span className={"case-study-template__work-index"}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg has-font-semibold">{point.title}</h3>
                  <p className="text-md leading-relaxed is-stone has-m-0">
                    {point.body}
                  </p>
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
            <p className="text-md leading-relaxed is-stone">{block.body}</p>
          </section>
        ))}
        <section aria-label={CASE_STUDY.artefactsAriaLabel}>
          <h2 className="text-2xl has-mb-4">{CASE_STUDY.sections.artefacts}</h2>
          <ul className={"case-study-template__artefacts"}>
            {project.artefacts.map((art) => (
              <li key={art.src} className="case-study-template__artefact">
                <RevealImage src={art.src} alt={art.alt} width={1200} height={800} />
                <p className="text-sm is-stone has-mt-2">{art.caption}</p>
              </li>
            ))}
          </ul>
        </section>
        <div className="is-flex is-flex-wrap has-gap-3">
          <MagneticButton
            href={project.liveUrl}
            variant="ghostOnInk"
            external
          >
            {project.liveLabel}
          </MagneticButton>
        </div>
      </div>

      <div className="container-sm case-study-page__footer is-flex is-flex-column has-gap-6 has-mt-9">
        {nextProject ? (
          <Link
            href={ROUTES.work(nextProject.slug)}
            className={"case-study-template__next-link"}
          >
            <span className="text-sm is-stone uppercase has-font-semibold">
              {CASE_STUDY.nextProjectLabel}
            </span>
            <span className="text-2xl has-font-semibold">{nextProject.title}</span>
          </Link>
        ) : null}
        <div>
          <MagneticButton href={ROUTES.home} variant="ghostOnInk">
            {CASE_STUDY.backToHomeLabel}
          </MagneticButton>
        </div>
      </div>
    </main>
  );
}
