import { ContactForm } from "@/components/contact/ContactForm";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatusPill } from "@/components/ui/StatusPill";
import { BOOKING_URL } from "@/constants/config";
import { CONTACT_PAGE } from "@/constants/content/contact-page";
import { PROFILE } from "@/constants/content/profile";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/lib/seo";
import { SITE, SOCIAL_LINKS } from "@/constants/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Book a call, send a project brief, or email Davide Domenghini directly. Senior front-end engineer in London - replies within 24 hours on weekdays.",
  path: ROUTES.contact,
});

export default function ContactPage() {
  return (
    <main id="main" className="container-atmosphere has-py-8">
      <header className="is-flex is-flex-column has-gap-3 has-mb-8">
        <h1 className={"contact-page__headline"}>{CONTACT_PAGE.headline}</h1>
        <StatusPill label={PROFILE.availabilityLabel} tone="paper" />
        <p className="text-sm is-text-muted">{CONTACT_PAGE.responseTime}</p>
      </header>

      <div className={"contact-page__grid"}>
        <section id="book" className={"contact-page__card"}>
          <h2 className="text-xl has-font-semibold">{CONTACT_PAGE.cards.book.title}</h2>
          <p className="text-md is-text-muted">{CONTACT_PAGE.cards.book.body}</p>
          <div className="has-mt-4">
            <MagneticButton href={BOOKING_URL} cursorText="Book" external>
              Book a call
            </MagneticButton>
          </div>
          <iframe
            title="Book a call with Davide Domenghini"
            src={BOOKING_URL}
            className={"contact-page__cal-embed"}
            loading="lazy"
          />
        </section>

        <section className={"contact-page__card"}>
          <h2 className="text-xl has-font-semibold">{CONTACT_PAGE.cards.brief.title}</h2>
          <p className="text-md is-text-muted">{CONTACT_PAGE.cards.brief.body}</p>
          <ContactForm />
        </section>

        <section className={"contact-page__card"}>
          <h2 className="text-xl has-font-semibold">{CONTACT_PAGE.cards.dm.title}</h2>
          <p className="text-md is-text-muted">{CONTACT_PAGE.cards.dm.body}</p>
          <ul className="is-flex is-flex-column has-gap-3 has-mt-4">
            <li>
              <a href={`mailto:${SITE.email}`} className="has-font-semibold is-primary">
                {SITE.emailDisplay}
              </a>
            </li>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="noopener noreferrer" target="_blank">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
