/**
 * Selected work - uniform 3x2 grid. Each tile answers role / stack / scale /
 * status. All tiles carry equal weight: the screenshot stays clean (no scrim,
 * no overlay), a chip floats top-left with role + year, and the metadata sits
 * below the image. Hierarchy lives in the chip copy, not in tile size.
 *
 * Body + role copy mirrors the Figma source of truth (Project tile · pattern,
 * node 79:2). Short one-liners on purpose - the grid communicates breadth at
 * a glance.
 *
 * Links: every tile declares only its case-study `slug` and the href is
 * derived via `ROUTES.work(slug)`, so a tile can never drift out of sync with
 * the real /work/<slug> route the way a hand-typed href can. Never hard-code
 * `/work/...`.
 *
 * No tile links to a live client site. The screenshot is the work; the case
 * study is where it gets explained. Sending someone to a third-party domain
 * shows them whatever that site is today, which is not what I built and, for
 * the finished engagements, no longer mine to present. See the note at the top
 * of `projects.ts`. Do not add an `external` URL to a tile.
 */

import { ROUTES } from "@/constants/routes";

export const WORK_BENTO = {
  eyebrow: "04 · Selected work",
  headline: "Work I shipped. Work I would stand behind in the room.",
  archiveLabel: "Everything else lives at /lab · twenty years of receipts, no longer crowding the hero.",
  archiveCta: "Open the archive",
  archiveHref: "/lab",
} as const;

type WorkBentoSource = {
  /** Case-study slug; the href is derived via ROUTES.work(slug). */
  slug: string;
  role: string;
  title: string;
  body: string;
  stack: string;
  image: string;
  /**
   * Required, never empty. These screenshots are the evidence the section is
   * making its case with, so they are content, not decoration: an empty alt
   * hides the work from search and from anyone browsing with images off.
   */
  imageAlt: string;
};

/** A tile ready to render: href resolved to its case study. */
export type WorkBentoTile = WorkBentoSource & {
  href: string;
};

const WORK_BENTO_SOURCE: readonly WorkBentoSource[] = [
  {
    slug: "origin-social",
    role: "Product Engineer · 2026 - now",
    title: "Origin Social",
    body: "Idea to launch, across a portfolio.",
    stack: "STRATEGY · NEXT · TS",
    image: "/images/projects/origin-social.svg",
    imageAlt: "Origin Social studio logo mark on a dark cover",
  },
  {
    slug: "liberty-blume",
    role: "Senior FE lead · 2025 - now",
    title: "Liberty Blume",
    body: "12-step regulated lending journey. Live.",
    stack: "REACT · TS · SCSS · GCP",
    image: "/images/projects/liberty-blume.png",
    imageAlt: "Liberty Blume regulated lending journey, confirm your package step",
  },
  {
    slug: "striver-football",
    role: "Design + FE lead · 2026",
    title: "Striver.Football",
    body: "Brand to shipped site.",
    stack: "NEXT · WP",
    image: "/images/projects/striver-football-full.jpg",
    imageAlt: "Striver.Football marketing site homepage",
  },
  {
    slug: "estee-lauder-emea",
    role: "Senior FE · 2022 - 25",
    title: "Estée Lauder",
    body: "7 brands, FR + DE rollouts.",
    stack: "REACT · DRUPAL",
    image: "/images/projects/estee-lauder-full.jpg",
    imageAlt: "Estée Lauder EMEA ecommerce homepage",
  },
  {
    slug: "bristol-city-council",
    role: "Senior FE · 2021 - 22",
    title: "bristol.gov.uk",
    body: "500k+ residents.",
    stack: "REACT · DOCUSAURUS",
    image: "/images/projects/bristol.jpg",
    imageAlt: "bristol.gov.uk council website homepage",
  },
  {
    slug: "cheam-sports-fc",
    role: "Founder · 2024 - 26",
    title: "Cheam Sports FC",
    body: "Full-stack solo build.",
    stack: "NEXT · DRIZZLE · STRIPE",
    image: "/images/projects/cheam-sports-fc-full.jpg",
    imageAlt: "Cheam Sports FC club website homepage",
  },
  {
    slug: "nannynow",
    role: "Currently building",
    title: "Nannynow",
    body: "Concept to MVP, solo.",
    stack: "NEXT · TS",
    image: "/images/projects/nannynow-full.jpg",
    imageAlt: "Nannynow childcare marketplace homepage",
  },
];

export const WORK_BENTO_TILES: readonly WorkBentoTile[] = WORK_BENTO_SOURCE.map(
  (tile) => ({ ...tile, href: ROUTES.work(tile.slug) }),
);
