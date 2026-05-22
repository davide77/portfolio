/**
 * Selected work - uniform 3x2 grid. Each tile answers role / stack / scale /
 * status. All tiles carry equal weight: the screenshot stays clean (no scrim,
 * no overlay), a chip floats top-left with role + year, and the metadata sits
 * below the image. Hierarchy lives in the chip copy, not in tile size.
 *
 * Body + role copy mirrors the Figma source of truth (Project tile · pattern,
 * node 79:2). Short one-liners on purpose - the grid communicates breadth at
 * a glance.
 */

export const WORK_BENTO = {
  eyebrow: "04 · Selected work",
  headline: "Six pieces. Each answers role, stack, scale, status.",
  archiveLabel: "Everything else lives at /lab · twenty years of receipts, no longer crowding the hero.",
  archiveCta: "Open the archive",
  archiveHref: "/lab",
} as const;

export const WORK_BENTO_TILES = [
  {
    slug: "liberty-blume",
    role: "Senior FE lead · 2025 - now",
    title: "Liberty Blume",
    body: "12-step regulated lending journey. Live.",
    stack: "REACT · TS · SCSS · GCP",
    image: "/images/projects/liberty-blume.png",
    href: "/work/liberty-blume",
  },
  {
    slug: "striver-football",
    role: "Design + FE lead · 2026",
    title: "Striver.Football",
    body: "Brand to shipped site.",
    stack: "NEXT · WP",
    image: "/images/projects/striver-football.jpg",
    href: "/work/striver-football",
  },
  {
    slug: "estee-lauder",
    role: "Senior FE · 2022 - 25",
    title: "Estée Lauder",
    body: "7 brands, FR + DE rollouts.",
    stack: "REACT · DRUPAL",
    image: "/images/projects/estee-lauder.jpg",
    href: "/work/estee-lauder",
  },
  {
    slug: "bristol-gov-uk",
    role: "Senior FE · 2021 - 22",
    title: "bristol.gov.uk",
    body: "500k+ residents.",
    stack: "REACT · DOCUSAURUS",
    image: "/images/projects/bristol.jpg",
    href: "/work/bristol-gov-uk",
  },
  {
    slug: "cheam-sports-fc",
    role: "Founder · 2024 - now",
    title: "Cheam Sports FC",
    body: "Full-stack solo build.",
    stack: "NEXT · DRIZZLE · STRIPE",
    image: "/images/projects/cheam-sports-fc.jpg",
    href: "/work/cheam-sports-fc",
  },
  {
    slug: "nannynow",
    role: "Currently building",
    title: "Nannynow",
    body: "Concept to MVP, solo.",
    stack: "NEXT · TS",
    image: "/images/projects/nannynow.jpg",
    href: "https://nannynow.co.uk",
  },
] as const;
