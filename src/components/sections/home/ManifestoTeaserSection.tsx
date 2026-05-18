import Link from "next/link";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { HOME_SECTIONS } from "@/constants/content/home";
import { PROFILE } from "@/constants/content/profile";
import { ROUTES } from "@/constants/routes";
import styles from "./ManifestoTeaserSection.module.scss";

export function ManifestoTeaserSection() {
  return (
    <section className={styles.root} aria-labelledby="manifesto-quote">
      <div className="container-atmosphere">
        <EyebrowLabel>{HOME_SECTIONS.manifesto.eyebrow}</EyebrowLabel>
        <blockquote id="manifesto-quote" className={styles.quote}>
          {PROFILE.manifestoQuote}
        </blockquote>
        <p className="has-mt-4">
          <Link href={ROUTES.hash.ai} className="has-font-semibold is-primary">
            {HOME_SECTIONS.manifesto.cta}
          </Link>
        </p>
      </div>
    </section>
  );
}
