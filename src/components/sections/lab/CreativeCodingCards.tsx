import Link from "next/link";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import {
  CREATIVE_CODING_CARDS,
  LAB_CREATIVE_CODING_SECTION,
} from "@/constants/content/lab-page";

/** Section 12 - three cards introducing the experimental work behind /lab/[slug]. */
export function CreativeCodingCards() {
  return (
    <section className="creative-coding-cards" aria-labelledby="creative-coding-title">
      <div className="container-atmosphere">
        <EyebrowLabel className="is-orb-glow">{LAB_CREATIVE_CODING_SECTION.eyebrow}</EyebrowLabel>
        <h2 id="creative-coding-title" className="section-title is-paper has-mt-3">
          {LAB_CREATIVE_CODING_SECTION.headline}
        </h2>
        <p className="creative-coding-cards__intro is-cream has-mt-3">
          {LAB_CREATIVE_CODING_SECTION.intro}
        </p>
        <ul className="creative-coding-cards__grid has-mt-6">
          {CREATIVE_CODING_CARDS.map((card) => (
            <li key={card.href} className="creative-coding-cards__cell">
              <Link href={card.href} className="creative-coding-cards__link">
                <p className="creative-coding-cards__tag mono is-orb-glow">{card.tag}</p>
                <p className="creative-coding-cards__head is-paper has-mt-2">{card.head}</p>
                <p className="creative-coding-cards__body is-cream has-mt-3">{card.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
