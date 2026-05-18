import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatusPill } from "@/components/ui/StatusPill";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { BOOKING_URL } from "@/constants/config";
import { HOME_SECTIONS } from "@/constants/content/home";
import { PROFILE } from "@/constants/content/profile";
import { SITE } from "@/constants/site";
import styles from "./ClosingCtaSection.module.scss";

export function ClosingCtaSection() {
  return (
    <section className={styles.root} aria-labelledby="closing-cta">
      <div className="container-atmosphere is-flex is-flex-column has-gap-5">
        <EyebrowLabel className="is-cream">{HOME_SECTIONS.closing.eyebrow}</EyebrowLabel>
        <h2 id="closing-cta" className={styles.headline}>
          {PROFILE.closingHeadline}
        </h2>
        <StatusPill label={PROFILE.statusLabel} />
        <div className="is-flex is-flex-wrap has-gap-3">
          <MagneticButton href={BOOKING_URL} variant="primary" cursorText="Book" external>
            {PROFILE.primaryCta}
          </MagneticButton>
          <MagneticButton href={`mailto:${SITE.email}`} variant="ghostOnInk" cursorText="Email">
            {SITE.emailDisplay}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
