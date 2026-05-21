import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { RECEIPTS, RECEIPTS_BAND } from "@/constants/content/receipts";

/** Three proofs / from the CV. Ink surface, three project receipt cards. */
export function ReceiptsSection() {
  return (
    <section className="receipts-section" aria-labelledby="receipts-section-title">
      <div className="container-atmosphere">
        <EyebrowLabel>{RECEIPTS_BAND.eyebrow}</EyebrowLabel>
        <h2 id="receipts-section-title" className="section-title is-paper has-mt-3">
          {RECEIPTS_BAND.headline}
        </h2>
        <p className="receipts-section__intro is-cream has-mt-3">
          {RECEIPTS_BAND.intro}
        </p>
        <ul className="receipts-section__grid has-mt-6">
          {RECEIPTS.map((receipt) => (
            <li key={receipt.name} className="receipts-section__card">
              <p className="receipts-section__tag mono is-cream">{receipt.tag}</p>
              <blockquote className="receipts-section__body is-paper">
                {receipt.body}
              </blockquote>
              <div className="receipts-section__who">
                <span className="receipts-section__avatar" aria-hidden>
                  {receipt.avatarInitials}
                </span>
                <div>
                  <p className="receipts-section__name is-paper">{receipt.name}</p>
                  <p className="receipts-section__role is-cream">{receipt.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
