/**
 * Stats band - by the numbers / 2006-2026.
 * 8 stat tiles, 4-up x 2 rows on desktop, 2-up on tablet, 1-up on mobile.
 * Numbers from the CV. Suffix renders in --signal on paper, --cream on ink.
 */

export const STATS_BAND = {
  eyebrow: "02 · By the numbers · 2006-2026",
  headline: "The shape of twenty years, on one line.",
} as const;

export const STATS = [
  {
    value: "20",
    suffix: "+yrs",
    label: "Senior front-end practice. Started 2006. Still in the IDE every day.",
  },
  {
    value: "500",
    suffix: "k+",
    label: "Bristol residents served by bristol.gov.uk. The design system I shipped is still live.",
  },
  {
    value: "12",
    suffix: "steps",
    label: "Regulated lending journey live at Liberty Blume. Real money, real compliance, every transition.",
  },
  {
    value: "40",
    suffix: "%",
    label: "Dev-time reduction across Squiz client engagements via standardised component libraries.",
  },
  {
    value: "7",
    suffix: "brands",
    label: "Modernised across Estée Lauder EMEA. Clinique, MAC, Bobbi Brown, Tom Ford, Jo Malone, La Mer, Origins.",
  },
  {
    value: "100",
    suffix: "+",
    label: "Families using the platform I built and ship solo for Cheam Sports FC.",
  },
  {
    value: "2.1",
    suffix: "AA",
    label: "WCAG conformance, full delivery. Keyboard, contrast, reduced motion in the definition of done.",
  },
  {
    value: "0",
    suffix: "",
    label: "Em-dashes, Americanisms or banned framings in shipped copy. The brand book audits itself.",
  },
] as const;
