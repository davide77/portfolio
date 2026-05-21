/**
 * Stats band - by the numbers / 2006-2026.
 * 4 stat tiles, 4-up on desktop, 2-up on mobile.
 * Numbers from the CV. Suffix renders in --signal on paper, --cream on ink.
 * Mirrors the Figma source of truth (③ Home / Desktop).
 */

export const STATS_BAND = {
  eyebrow: "03 · By the numbers · 2006-2026",
  headline: "The shape of twenty years, on one line.",
} as const;

export const STATS = [
  {
    value: "20",
    suffix: "+yrs",
    label: "Senior front-end practice. Started 2006.",
  },
  {
    value: "500",
    suffix: "k+",
    label: "Bristol residents on bristol.gov.uk.",
  },
  {
    value: "12",
    suffix: "steps",
    label: "Regulated lending journey live at Liberty Blume.",
  },
  {
    value: "40",
    suffix: "%",
    label: "Dev-time reduction across Squiz engagements.",
  },
] as const;
