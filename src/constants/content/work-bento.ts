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
 * Links: an internal tile declares only its case-study `slug` and the href is
 * derived via `ROUTES.work(slug)`, so a tile can never drift out of sync with
 * the real /work/<slug> route the way a hand-typed href can. An external tile
 * declares an absolute `external` URL instead. Never hard-code `/work/...`.
 */

import { ROUTES } from "@/constants/routes";

export const WORK_BENTO = {
  eyebrow: "04 · Selected work",
  headline: "Work I shipped. Work I would stand behind in the room.",
  archiveLabel: "Everything else lives at /lab · twenty years of receipts, no longer crowding the hero.",
  archiveCta: "Open the archive",
  archiveHref: "/lab",
} as const;

type InternalTile = {
  /** Case-study slug; the href is derived via ROUTES.work(slug). */
  slug: string;
  role: string;
  title: string;
  body: string;
  stack: string;
  image: string;
};

type ExternalTile = InternalTile & {
  /** Absolute URL; opens in a new tab. Set for off-site work only. */
  external: string;
};

type WorkBentoSource = InternalTile | ExternalTile;

/** A tile ready to render: href resolved, external flag decided. */
export type WorkBentoTile = InternalTile & {
  href: string;
  isExternal: boolean;
};

const WORK_BENTO_SOURCE: readonly WorkBentoSource[] = [
  {
    slug: "origin-social",
    role: "Product Engineer · 2026 - now",
    title: "Origin Social",
    body: "Idea to launch, across a portfolio.",
    stack: "STRATEGY · NEXT · TS",
    image: "/images/projects/origin-social.svg",
  },
  {
    slug: "liberty-blume",
    role: "Senior FE lead · 2025 - now",
    title: "Liberty Blume",
    body: "12-step regulated lending journey. Live.",
    stack: "REACT · TS · SCSS · GCP",
    image: "/images/projects/liberty-blume.png",
  },
  {
    slug: "striver-football",
    role: "Design + FE lead · 2026",
    title: "Striver.Football",
    body: "Brand to shipped site.",
    stack: "NEXT · WP",
    image: "/images/projects/striver-football.jpg",
  },
  {
    slug: "estee-lauder-emea",
    role: "Senior FE · 2022 - 25",
    title: "Estée Lauder",
    body: "7 brands, FR + DE rollouts.",
    stack: "REACT · DRUPAL",
    image: "/images/projects/estee-lauder.jpg",
  },
  {
    slug: "bristol-city-council",
    role: "Senior FE · 2021 - 22",
    title: "bristol.gov.uk",
    body: "500k+ residents.",
    stack: "REACT · DOCUSAURUS",
    image: "/images/projects/bristol.jpg",
  },
  {
    slug: "cheam-sports-fc",
    role: "Founder · 2024 - now",
    title: "Cheam Sports FC",
    body: "Full-stack solo build.",
    stack: "NEXT · DRIZZLE · STRIPE",
    image: "/images/projects/cheam-sports-fc.jpg",
  },
  {
    slug: "nannynow",
    role: "Currently building",
    title: "Nannynow",
    body: "Concept to MVP, solo.",
    stack: "NEXT · TS",
    image: "/images/projects/nannynow.jpg",
    external: "https://nannynow.co.uk",
  },
];

export const WORK_BENTO_TILES: readonly WorkBentoTile[] = WORK_BENTO_SOURCE.map(
  (tile) =>
    "external" in tile
      ? { ...tile, href: tile.external, isExternal: true }
      : { ...tile, href: ROUTES.work(tile.slug), isExternal: false },
);
