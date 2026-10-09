import { STATS_BAND, STATS_STATEMENT } from "@/constants/content/stats-band";
import { MotionReveal } from "@/components/motion/MotionReveal";

/** Twenty years in one sentence. The facts carry full brightness, the connective text sits back. */
export function StatsBand() {
  return (
    <section className="stats-band" aria-label={STATS_BAND.ariaLabel}>
      <div className="container-atmosphere">
        <MotionReveal lift={28} duration={0.9}>
          <p className="stats-band__statement">
            {STATS_STATEMENT.map((segment) =>
              segment.strong ? (
                <strong key={segment.text} className="stats-band__fact">
                  {segment.text}
                </strong>
              ) : (
                segment.text
              ),
            )}
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
