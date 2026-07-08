import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Marquee } from "@/components/ui/Marquee";
import { BRANDS_MARQUEE, TRUSTED_BY_CLIENTS } from "@/constants/content/profile";
import { MotionReveal } from "@/components/motion/MotionReveal";

/** Brand wall - eyebrow row + auto-scrolling marquee of client names. */
export function BrandsMarquee() {
  return (
    <section className="brands-marquee" aria-labelledby="brands-marquee-title">
      <div className="container-atmosphere">
        <MotionReveal className="brands-marquee__row" lift={16}>
          <EyebrowLabel className="brands-marquee__eyebrow">
            {BRANDS_MARQUEE.eyebrow}
          </EyebrowLabel>
          <p
            id="brands-marquee-title"
            className="brands-marquee__meta mono text-xs is-cream"
          >
            {BRANDS_MARQUEE.meta}
          </p>
        </MotionReveal>
      </div>
      <Marquee
        items={TRUSTED_BY_CLIENTS}
        separator="·"
        ariaLabel={BRANDS_MARQUEE.ariaLabel}
      />
    </section>
  );
}
