import { MagneticButton } from "@/components/ui/MagneticButton";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
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
    <section className={"closing-cta-section"} aria-labelledby="closing-cta">
      <div className="container-atmosphere is-flex is-flex-column has-gap-5">
        <EyebrowLabel className="is-paper">{HOME_SECTIONS.closing.eyebrow}</EyebrowLabel>
        <h2 id="closing-cta" className="closing-cta-section__headline section-title is-paper">
          {before}
          {idx >= 0 && <em>{emphasis}</em>}
          {after}
        </h2>
        <div className="is-flex is-flex-wrap has-gap-3">
          <MagneticButton href={`mailto:${SITE.email}`} variant="primary" cursorText="Email">
            {PROFILE.primaryCta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
