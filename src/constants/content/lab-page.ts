import { ROUTES } from "@/constants/routes";

/**
 * /lab page copy. Numbering picks up where the home leaves off (09..12)
 * so a reader walking from /#about into /lab feels one continuous arc,
 * even though they are technically two pages.
 */

export const LAB_HERO_COPY = {
  eyebrow: "09 · Lab · long-form archive",
  headlineLineOne: "Twenty years of",
  headlineEmphasis: "receipts.",
  headlineLineTwo: "And a place to keep experimenting.",
  subhead: "SAP · SKY · MEDIA · AUTOMOTIVE · CHARITY · AGENCY · CREATIVE CODING",
  verticalEdge: "EST · 2006 · CREATIVE CODING + GRASSROOTS",
} as const;

export const LAB_ARCHIVE_SECTION = {
  eyebrow: "10 · Long-form archive",
  headline: "Twenty years on one page. Grouped by era, not curated for the hero.",
  intro:
    "Every frame here was a real brief. Not every property is still live - the screenshot is the receipt.",
} as const;

export const LAB_MENTIONED_SECTION = {
  eyebrow: "11 · Mentioned, no screen kept",
  headline: "Honest provenance: shipped, no surviving capture.",
  intro:
    "Each line was a real engagement. The file was lost to a hard drive migration, a long-since-shuttered server, or a brief that never let me keep a copy.",
} as const;

export const LAB_CREATIVE_CODING_SECTION = {
  eyebrow: "12 · Creative coding experiments",
  headline: "The actual lab.",
  intro:
    "Prototypes that proved a pattern before it landed in production. Each one ships with the same lifecycle the home hero uses: paused off-screen, gated under reduced motion, no bloom.",
} as const;

export const CREATIVE_CODING_CARDS = [
  {
    tag: "WebGL · DD orb",
    head: "Two extruded D-shapes, custom GLSL shader.",
    body:
      "Sharp band transitions, no bloom, no chromatic dressing. The exact orb the home hero uses, lifted straight from this experiment.",
    href: `${ROUTES.lab}/monopo`,
  },
  {
    tag: "Procedural · banner generator",
    head: "Deterministic PRNG-driven SVG art.",
    body:
      "OpenType.js glyph rendering, sharp rasterised to 1080x1350. Generates Cheam Sports FC fixture banners from a single line of metadata.",
    href: `${ROUTES.lab}/disc-lens`,
  },
  {
    tag: "Motion · parallax drift",
    head: "Low-frequency wobble + parallax lerp.",
    body:
      "The trick that makes the orbs read as celestial bodies, not letters. Same dials as the home hero; here you can pull the values.",
    href: `${ROUTES.lab}/lenses`,
  },
] as const;
