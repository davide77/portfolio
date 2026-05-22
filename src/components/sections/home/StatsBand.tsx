import { SectionHead } from "@/components/ui/SectionHead";
import { STATS, STATS_BAND } from "@/constants/content/stats-band";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";

/** By the numbers - Figma source of truth: ③ Patterns / Stats band · ink. */
export function StatsBand() {
  return (
    <section className="stats-band" aria-labelledby="stats-band-title">
      <div className="container-atmosphere">
        <SectionHead
          eyebrow={STATS_BAND.eyebrow}
          headline={STATS_BAND.headline}
          surface="ink"
          size="display"
          headingId="stats-band-title"
        />
        <StaggerList as="ul" className="stats-band__grid" stagger={0.08}>
          {STATS.map((stat) => (
            <StaggerItem as="li" key={stat.label} className="stats-band__tile" lift={22}>
              <span className="stats-band__num">
                {stat.value}
                {stat.suffix && (
                  <span className="stats-band__suffix">{stat.suffix}</span>
                )}
              </span>
              <p className="stats-band__label">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
