/**
 * Selected work - 6-cell bento. Each card answers role / stack / scale / status.
 * Liberty Blume features 4x2 to anchor the eye. Layout values feed CSS grid
 * spans via data-attributes on the component.
 *
 * Body + role copy mirrors the Figma source of truth (③ Home / Desktop).
 * Short one-liners on purpose - the bento communicates breadth at a glance.
 */

export const WORK_BENTO = {
  eyebrow: "04 · Selected work",
  headline: "Six pieces. Each answers role, stack, scale, status.",
  intro:
    "Same template, every time. The bento is sized so one project always anchors the eye.",
  archiveLabel: "Everything else lives at /lab · twenty years of receipts, no longer crowding the hero.",
  archiveCta: "Open the archive",
  archiveHref: "/lab",
  pendingLabel: "Screen pending",
} as const;

export const WORK_BENTO_TILES = [
  {
    slug: "liberty-blume",
    role: "Senior FE lead · 2025 - now",
    title: "Liberty Blume",
    body: "12-step regulated lending journey. Live.",
    stack: "REACT · TS · SCSS · GCP",
    image: "/images/projects/liberty-blume.jpg",
    span: "feat", // 4x2
    href: "/work/liberty-blume",
  },
  {
    slug: "striver-football",
    role: "Design + FE lead · 2026",
    title: "Striver.Football",
    body: "Brand to shipped site.",
    stack: "NEXT · WP",
    pending: true, // real Striver screen not yet captured; see PR 11
    span: "tall", // 2x2
    href: "/work/striver-football",
  },
  {
    slug: "estee-lauder",
    role: "Senior FE · 2022 - 25",
    title: "Estée Lauder",
    body: "7 brands, FR + DE rollouts.",
    stack: "REACT · DRUPAL",
    image: "/images/projects/estee-lauder.jpg",
    span: "reg", // 2x1
    href: "/work/estee-lauder",
  },
  {
    slug: "bristol-gov-uk",
    role: "Senior FE · 2021 - 22",
    title: "bristol.gov.uk",
    body: "500k+ residents.",
    stack: "REACT · DOCUSAURUS",
    image: "/images/projects/bristol.jpg",
    span: "reg", // 2x1
    href: "/work/bristol-gov-uk",
  },
  {
    slug: "cheam-sports-fc",
    role: "Founder · 2024 - now",
    title: "Cheam Sports FC",
    body: "Full-stack solo build.",
    stack: "NEXT · DRIZZLE · STRIPE",
    pending: true, // current asset is a placeholder, not a real Cheam screen
    span: "wide", // 3x1
    href: "/work/cheam-sports-fc",
  },
  {
    slug: "nannynow",
    role: "Currently building",
    title: "Nannynow",
    body: "Concept to MVP, solo.",
    stack: "NEXT · TS",
    span: "text", // text-only cell
    href: "https://nannynow.co.uk",
  },
] as const;
