import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { HOME_CLOSER } from "@/constants/content/contact-page";
import { HOME_SECTIONS } from "@/constants/content/home";
import { PROFILE } from "@/constants/content/profile";
import { SITE } from "@/constants/site";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";

/** Closer block - Figma source of truth: ③ Patterns / Closer · ink. */
export function ClosingCtaSection() {
  return (
    <section className="closing-cta-section" aria-labelledby="closing-cta">
      <div className="closing-cta-section__inner container-atmosphere">
        <SectionHead
          eyebrow={HOME_SECTIONS.closing.eyebrow}
          headline={PROFILE.closingHeadline}
          intro={HOME_CLOSER.body}
          emphasisWord={PROFILE.closingEmphasisWord}
          surface="ink"
          size="mega"
          as="h2"
          headingId="closing-cta"
          className="closing-cta-section__head"
        />
        <MotionReveal className="closing-cta-section__cta-row" lift={18}>
          <MagneticButton href={`mailto:${SITE.email}`} variant="secondaryInk" cursorText="Email">
            <span>{PROFILE.primaryCta}</span>
            <span aria-hidden className="button__glyph">↗</span>
          </MagneticButton>
          <p className="closing-cta-section__meta">{HOME_CLOSER.meta}</p>
        </MotionReveal>
        <StaggerList as="dl" className="closing-cta-section__contact" stagger={0.07}>
          <StaggerItem as="div" className="closing-cta-section__contact-item" lift={16}>
            <dt className="closing-cta-section__contact-label">{HOME_CLOSER.emailLabel}</dt>
            <dd className="closing-cta-section__contact-value">
              <a className="closing-cta-section__link" href={`mailto:${SITE.email}`}>
                {SITE.emailDisplay}
              </a>
            </dd>
          </StaggerItem>
          <StaggerItem as="div" className="closing-cta-section__contact-item" lift={16}>
            <dt className="closing-cta-section__contact-label">{HOME_CLOSER.linkedinLabel}</dt>
            <dd className="closing-cta-section__contact-value">
              <a
                className="closing-cta-section__link"
                href={HOME_CLOSER.linkedinHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {HOME_CLOSER.linkedinDisplay}
              </a>
            </dd>
          </StaggerItem>
          <StaggerItem as="div" className="closing-cta-section__contact-item" lift={16}>
            <dt className="closing-cta-section__contact-label">{HOME_CLOSER.githubLabel}</dt>
            <dd className="closing-cta-section__contact-value">
              <a
                className="closing-cta-section__link"
                href={HOME_CLOSER.githubHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {HOME_CLOSER.githubDisplay}
              </a>
            </dd>
          </StaggerItem>
        </StaggerList>
        <MotionReveal className="closing-cta-section__footer" lift={12}>
          <span>{HOME_CLOSER.footerLeft}</span>
          <span>{HOME_CLOSER.footerRight}</span>
        </MotionReveal>
      </div>
    </section>
  );
}
