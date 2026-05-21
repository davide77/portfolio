import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { AI_CARDS, AI_SECTION } from "@/constants/content/ai-engineering";

/** AI-assisted engineering - 3 cards on a paper surface. */
export function AISection() {
  return (
    <section className="ai-section" aria-labelledby="ai-section-title">
      <div className="container-atmosphere">
        <EyebrowLabel>{AI_SECTION.eyebrow}</EyebrowLabel>
        <h2 id="ai-section-title" className="section-title is-ink has-mt-3">
          {AI_SECTION.headline}
        </h2>
        <p className="ai-section__intro is-stone has-mt-3">{AI_SECTION.intro}</p>
        <ul className="ai-section__grid has-mt-6">
          {AI_CARDS.map((card, i) => (
            <li key={card.tag} className="ai-section__card">
              <div className="ai-section__top">
                <span className="ai-section__num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="ai-section__tag">{card.tag}</p>
              </div>
              <h3 className="ai-section__head">{card.head}</h3>
              <p className="ai-section__body is-stone">{card.body}</p>
              <p className="ai-section__stack mono">{card.stack}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
