import { DisplayText } from "@/components/ui/DisplayText";
import { VerticalText } from "@/components/ui/VerticalText";
import { WORK_ARCHIVE_HERO } from "@/constants/content/archive-work";
import { cx } from "@/components/cx";

/**
 * Dark archive hero. Echoes the home hero band (ink atmosphere from the
 * site-chrome backdrop, cream/white type) without the home-only DD orb.
 */
export function WorkArchiveHero() {
  return (
    <section className="work-archive-hero">
      <div className={cx("work-archive-hero__inner", "container-atmosphere")}>
        <p className="work-archive-hero__eyebrow">{WORK_ARCHIVE_HERO.eyebrow}</p>
        <DisplayText as="h1" className="work-archive-hero__headline">
          {WORK_ARCHIVE_HERO.headline}
        </DisplayText>
        <p className="work-archive-hero__intro">{WORK_ARCHIVE_HERO.intro}</p>
      </div>
      <VerticalText className="work-archive-hero__edge">{WORK_ARCHIVE_HERO.edge}</VerticalText>
    </section>
  );
}
