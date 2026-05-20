import { ContactForm } from "@/components/contact/ContactForm";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatusPill } from "@/components/ui/StatusPill";
import { BOOKING_URL } from "@/constants/config";
import { CONTACT_PAGE } from "@/constants/content/contact-page";
import { PROFILE } from "@/constants/content/profile";

/**
 * Contact, inlined as a home-page section (replaces the old /contact page).
 * Reuses the existing .contact-page__* styles so the layout is unchanged;
 * only the page chrome (its own <main>/<h1>) is dropped.
 */
export function ContactSection() {
  return (
    <section
      className="container-atmosphere has-py-8"
      aria-labelledby="contact-section-title"
    >
      <header className="is-flex is-flex-column has-gap-3 has-mb-8">
        <h2 id="contact-section-title" className={"contact-page__headline"}>
          {CONTACT_PAGE.headline}
        </h2>
        <StatusPill label={PROFILE.availabilityLabel} tone="ink" />
        <p className="text-sm is-text-muted">{CONTACT_PAGE.responseTime}</p>
      </header>

      <div className={"contact-page__grid"}>
        <div id="book" className={"contact-page__card"}>
          <h3 className="text-xl has-font-semibold">
            {CONTACT_PAGE.cards.book.title}
          </h3>
          <p className="text-md is-text-muted">{CONTACT_PAGE.cards.book.body}</p>
          <div className="has-mt-4">
            <MagneticButton
              href={BOOKING_URL}
              cursorText={CONTACT_PAGE.cards.book.cursorText}
              external
            >
              {CONTACT_PAGE.cards.book.title}
            </MagneticButton>
          </div>
          <iframe
            title={CONTACT_PAGE.cards.book.embedTitle}
            src={BOOKING_URL}
            className={"contact-page__cal-embed"}
            loading="lazy"
          />
        </div>

        <div className={"contact-page__card"}>
          <h3 className="text-xl has-font-semibold">
            {CONTACT_PAGE.cards.brief.title}
          </h3>
          <p className="text-md is-text-muted">{CONTACT_PAGE.cards.brief.body}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
