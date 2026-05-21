import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Marquee } from "@/components/ui/Marquee";
import { BRANDS_MARQUEE, TRUSTED_BY_CLIENTS } from "@/constants/content/profile";

/** Brand wall - eyebrow row + auto-scrolling marquee of client names. */
export function BrandsMarquee() {
  return (
    <section className="brands-marquee" aria-labelledby="brands-marquee-title">
      <div className="container-atmosphere">
        <div className="brands-marquee__row">
          <EyebrowLabel className="brands-marquee__eyebrow">
            {BRANDS_MARQUEE.eyebrow}
          </EyebrowLabel>
          <p
            id="brands-marquee-title"
            className="brands-marquee__meta mono text-xs is-cream"
          >
            {BRANDS_MARQUEE.meta}
          </p>
        </div>
      </div>
      <Marquee items={TRUSTED_BY_CLIENTS} ariaLabel={BRANDS_MARQUEE.ariaLabel} />
    </section>
  );
}
