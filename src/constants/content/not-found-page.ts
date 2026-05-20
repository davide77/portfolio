import { ROUTES } from "@/constants/routes";

export const NOT_FOUND_PAGE = {
  code: "404",
  eyebrow: "Lost the thread",
  title: "That page is not part of this portfolio.",
  body: "This is a single-page site. The URL you followed has either moved into the work archive or never existed. The links below cover everything that is here.",
  primaryLabel: "Back to home",
  links: [
    { label: "Selected work", href: ROUTES.hash.work },
    { label: "About", href: ROUTES.about },
    { label: "Contact", href: ROUTES.contact },
  ],
  metaDescription:
    "The page you requested is not part of this portfolio. Return to the homepage to explore selected work, background, and contact details.",
} as const;
