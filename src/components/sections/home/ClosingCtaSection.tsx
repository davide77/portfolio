import { MagneticButton } from "@/components/ui/MagneticButton";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { HOME_CLOSER } from "@/constants/content/contact-page";
import { HOME_SECTIONS } from "@/constants/content/home";
import { PROFILE } from "@/constants/content/profile";
import { SITE } from "@/constants/site";

export function ClosingCtaSection() {
  const emphasis = PROFILE.closingEmphasisWord;
  const headline = PROFILE.closingHeadline;
  const idx = headline.indexOf(emphasis);
  const before = idx >= 0 ? headline.slice(0, idx) : headline;
  const after = idx >= 0 ? headline.slice(idx + emphasis.length) : "";

  return (
    <section className="closing-cta-section" aria-labelledby="closing-cta">
      <div className="closing-cta-section__inner container-atmosphere is-flex is-flex-column has-gap-6">
        <EyebrowLabel className="is-paper">{HOME_SECTIONS.closing.eyebrow}</EyebrowLabel>
        <h2 id="closing-cta" className="closing-cta-section__headline section-title is-paper">
          {before}
          {idx >= 0 && <em>{emphasis}</em>}
          {after}
        </h2>
        <p className="closing-cta-section__body text-lg leading-relaxed is-paper has-m-0">
          {HOME_CLOSER.body}
        </p>
        <div className="closing-cta-section__cta-row is-flex is-flex-wrap has-gap-4 is-align-center">
          <MagneticButton href={`mailto:${SITE.email}`} variant="primary" cursorText="Email">
            {PROFILE.primaryCta}
          </MagneticButton>
          <p className="closing-cta-section__meta mono text-xs is-cream has-m-0">
            {HOME_CLOSER.meta}
          </p>
        </div>
        <dl className="closing-cta-section__contact">
          <div className="closing-cta-section__contact-item">
            <dt className="mono text-xs is-cream">{HOME_CLOSER.emailLabel}</dt>
            <dd className="has-m-0">
              <a className="closing-cta-section__link" href={`mailto:${SITE.email}`}>
                {SITE.emailDisplay}
              </a>
            </dd>
          </div>
          <div className="closing-cta-section__contact-item">
            <dt className="mono text-xs is-cream">{HOME_CLOSER.linkedinLabel}</dt>
            <dd className="has-m-0">
              <a
                className="closing-cta-section__link"
                href={HOME_CLOSER.linkedinHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {HOME_CLOSER.linkedinDisplay}
              </a>
            </dd>
          </div>
          <div className="closing-cta-section__contact-item">
            <dt className="mono text-xs is-cream">{HOME_CLOSER.githubLabel}</dt>
            <dd className="has-m-0">
              <a
                className="closing-cta-section__link"
                href={HOME_CLOSER.githubHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {HOME_CLOSER.githubDisplay}
              </a>
            </dd>
          </div>
        </dl>
        <hr className="closing-cta-section__rule" aria-hidden />
        <div className="closing-cta-section__footer mono text-xs">
          <span>{HOME_CLOSER.footerLeft}</span>
          <span>{HOME_CLOSER.footerRight}</span>
        </div>
      </div>
    </section>
  );
}
