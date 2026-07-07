/**
 * Stats band - by the numbers / 2006-2026.
 * 4 stat tiles, 4-up on desktop, 2-up on mobile.
 * Numbers from the CV. Suffix renders in --signal on paper, --cream on ink.
 * Mirrors the Figma source of truth (③ Home / Desktop).
 */

export const STATS_BAND = {
  eyebrow: "03 · The count · 2006-2026",
  headline: "Twenty years, and I have the receipts.",
} as const;

export const STATS = [
  {
    value: "20",
    suffix: "+yrs",
    label: "Front-end I have led since 2006. No gaps.",
  },
  {
    value: "60",
    suffix: "+brands",
    label: "Shipped for, from Sky to grassroots clubs.",
  },
  {
    value: "1",
    suffix: "studio",
    label: "Origin Social. Every product shipped through it.",
  },
  {
    value: "1",
    suffix: "owner",
    label: "Me. Discovery to deploy, no hand-offs.",
  },
] as const;
