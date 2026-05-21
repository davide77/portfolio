import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { STATS, STATS_BAND } from "@/constants/content/stats-band";

/** By the numbers - 8-stat grid. 4-up x 2 rows on desktop, 2-up tablet, 1-up mobile. */
export function StatsBand() {
  return (
    <section className="stats-band" aria-labelledby="stats-band-title">
      <div className="container-atmosphere">
        <EyebrowLabel>{STATS_BAND.eyebrow}</EyebrowLabel>
        <h2 id="stats-band-title" className="section-title is-paper has-mt-3">
          {STATS_BAND.headline}
        </h2>
        <ul className="stats-band__grid">
          {STATS.map((stat) => (
            <li key={stat.label} className="stats-band__tile">
              <span className="stats-band__num">
                {stat.value}
                {stat.suffix && (
                  <span className="stats-band__suffix">{stat.suffix}</span>
                )}
              </span>
              <p className="stats-band__label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
