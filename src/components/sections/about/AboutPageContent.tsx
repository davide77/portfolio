import Image from "next/image";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { DisplayText } from "@/components/ui/DisplayText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ABOUT_PAGE } from "@/constants/content/about-page";
import { TIMELINE } from "@/constants/content/timeline";
import { CV_PDF_PATH } from "@/constants/config";
import { ROUTES } from "@/constants/routes";

export function AboutPageContent() {
  return (
    <div className="about-page-content container-atmosphere has-py-8 is-flex is-flex-column has-gap-10">
      <section className={"about-page-content__hero"}>
        <div className={"about-page-content__portrait"}>
          <Image
            src={ABOUT_PAGE.portraitSrc}
            alt={ABOUT_PAGE.portraitAlt}
            width={480}
            height={600}
            className={"about-page-content__portrait-img"}
            priority
          />
        </div>
        <div>
          <EyebrowLabel>{ABOUT_PAGE.eyebrow}</EyebrowLabel>
          <DisplayText as="h2" className="has-mt-4">
            {ABOUT_PAGE.headline}
          </DisplayText>
          <p className="text-lg leading-relaxed measure-62ch has-mt-4">{ABOUT_PAGE.intro}</p>
          <p className="has-mt-4">
            <a href={CV_PDF_PATH} className="has-font-semibold is-primary" download>
              {ABOUT_PAGE.cvLabel}
            </a>
          </p>
        </div>
      </section>

      <section
        aria-label={ABOUT_PAGE.principlesLabel}
        className="is-flex is-flex-column has-gap-7"
      >
        {ABOUT_PAGE.principles.map((principle) => (
          <article key={principle.id} id={principle.id}>
            <h2 className="section-title">{principle.title}</h2>
            <p className="text-lg leading-relaxed measure-62ch has-mt-3">{principle.body}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="timeline-title">
        <h2 id="timeline-title" className="text-3xl">
          {ABOUT_PAGE.timelineTitle}
        </h2>
        <ol className={"about-page-content__timeline"}>
          {TIMELINE.map((entry) => (
            <li key={`${entry.year}-${entry.company}`} className={"about-page-content__timeline-item"}>
              <span className={"about-page-content__timeline-year"}>{entry.year}</span>
              <div>
                <h3 className="text-lg has-font-semibold">{entry.company}</h3>
                <p className="text-sm is-text-muted">{entry.role}</p>
                <p className="text-md has-mt-2">{entry.outcome}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl">{ABOUT_PAGE.beyond.title}</h2>
        <p className="text-lg leading-relaxed measure-62ch has-mt-3">{ABOUT_PAGE.beyond.body}</p>
      </section>

      <section>
        <h2 className="text-2xl">{ABOUT_PAGE.tools.title}</h2>
        <ul className={"about-page-content__tools"}>
          {ABOUT_PAGE.tools.groups.map((group) => (
            <li key={group.label}>
              <h3 className="text-sm has-font-semibold uppercase">{group.label}</h3>
              <p className="text-sm is-text-muted">{group.items.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <MagneticButton href={ROUTES.contact} cursorText="Talk">
        {ABOUT_PAGE.cta}
      </MagneticButton>
    </div>
  );
}
