import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Marquee } from "@/components/ui/Marquee";
import { TRUSTED_BY_CLIENTS } from "@/constants/content/profile";

/** Brand wall - eyebrow row + auto-scrolling marquee of 23 client names. */
export function BrandsMarquee() {
  return (
    <section className="brands-marquee" aria-labelledby="brands-marquee-title">
      <div className="container-atmosphere">
        <div className="brands-marquee__row">
          <EyebrowLabel className="brands-marquee__eyebrow">
            02 - Brands shipped for
          </EyebrowLabel>
          <p
            id="brands-marquee-title"
            className="brands-marquee__meta mono text-xs is-cream"
          >
            23 of 60+ · 2006-2026
          </p>
        </div>
      </div>
      <Marquee items={TRUSTED_BY_CLIENTS} ariaLabel="Brands shipped for" />
    </section>
  );
}
