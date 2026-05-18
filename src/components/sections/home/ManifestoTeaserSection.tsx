import Link from "next/link";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { HOME_SECTIONS } from "@/constants/content/home";
import { PROFILE } from "@/constants/content/profile";
import { ROUTES } from "@/constants/routes";

export function ManifestoTeaserSection() {
  return (
    <section className={"manifesto-teaser-section"} aria-labelledby="manifesto-quote">
      <div className="container-atmosphere">
        <EyebrowLabel>{HOME_SECTIONS.manifesto.eyebrow}</EyebrowLabel>
        <blockquote id="manifesto-quote" className={"manifesto-teaser-section__quote"}>
          {PROFILE.manifestoQuote}
        </blockquote>
        <p className="has-mt-4">
          <Link href={ROUTES.hash.approach} className="has-font-semibold is-primary">
            {HOME_SECTIONS.manifesto.cta}
          </Link>
        </p>
      </div>
    </section>
  );
}
