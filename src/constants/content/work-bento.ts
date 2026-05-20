/**
 * Selected work - 6-cell bento. Each card answers role / stack / scale / status.
 * Liberty Blume features 4x2 to anchor the eye. Layout values feed CSS grid
 * spans via data-attributes on the component.
 */

export const WORK_BENTO = {
  eyebrow: "03 · Selected work",
  headline: "Six pieces. Each one answers role, stack, scale, status.",
  intro:
    "Same template, every time. The bento is sized so one project always anchors the eye.",
  archiveLabel: "Everything else lives at /#archive · twenty years of receipts, no longer crowding the hero.",
  archiveCta: "Open the archive",
} as const;

export const WORK_BENTO_TILES = [
  {
    slug: "liberty-blume",
    role: "Senior FE lead · Liberty Global · 2025 - now",
    title: "Liberty Blume",
    body:
      "12-step regulated consumer-lending journey. React + Context, SCSS 7-1, GCP, Docker. Live.",
    stack: "REACT · TS · SCSS · GCP · DOCKER",
    image: "/images/projects/liberty-blume.jpg",
    span: "feat", // 4x2
    href: "/work/liberty-blume",
  },
  {
    slug: "striver-football",
    role: "Design + FE lead · 2026",
    title: "Striver.Football",
    body: "Brand guidelines to shipped site. Token-driven SCSS, headless WP, IMAGO.",
    stack: "NEXT · TS · WP",
    image: "/images/projects/striver-football.jpg",
    span: "tall", // 2x2
    href: "/work/striver-football",
  },
  {
    slug: "estee-lauder",
    role: "Senior FE · EMEA · 2022 - 25",
    title: "Estée Lauder Companies",
    body: "7 brands, FR + DE rollouts, multi-million euro revenue.",
    stack: "REACT · DRUPAL · SCSS",
    image: "/images/projects/estee-lauder.jpg",
    span: "reg", // 2x1
    href: "/work/estee-lauder",
  },
  {
    slug: "bristol-gov-uk",
    role: "Senior FE · 2021 - 22",
    title: "bristol.gov.uk",
    body: "GOV.UK-aligned design system. 500k+ residents. Mentored 2 associates. Live.",
    stack: "REACT · DOCUSAURUS",
    image: "/images/projects/bristol-gov-uk.jpg",
    span: "reg", // 2x1
    href: "/work/bristol-gov-uk",
  },
  {
    slug: "cheam-sports-fc",
    role: "Founder + sole engineer · 2024 - now",
    title: "Cheam Sports FC · full-stack",
    body:
      "Member portal, Stripe + webhook reconciliation, FA scraper, PWA cron. 100+ families.",
    stack: "NEXT · DRIZZLE · STRIPE · BETTER-AUTH",
    image: "/images/projects/cheam-sports-fc.jpg",
    span: "wide", // 3x1
    href: "/work/cheam-sports-fc",
  },
  {
    slug: "nannynow",
    role: "Currently building",
    title: "Nannynow",
    body:
      "Two-sided childcare marketplace. Architecture, UX, delivery. AI in the loop, senior judgement at the helm.",
    stack: "NEXT · TS · MOBILE-FIRST",
    span: "text", // text-only cell
    href: "https://nannynow.co.uk",
  },
] as const;
