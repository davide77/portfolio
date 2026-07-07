/**
 * The receipts. Ink surface, signal accents.
 * Three live projects, each with a claim the reader can go and verify.
 */

export const RECEIPTS_BAND = {
  eyebrow: "07 · The receipts",
  headline: "Three projects. Three claims you can go and check.",
  intro:
    "No testimonials theatre. The work is live, the outcomes are real, and every one of them has my name on it.",
} as const;

export const RECEIPTS = [
  {
    tag: "Proof · Bristol City Council",
    body:
      "Architected a GOV.UK-aligned design system in React and Docusaurus. WCAG 2.1 AA across all components. Live for 500,000+ residents. Mentored two associates onto government accessibility practice.",
    avatarInitials: "BG",
    name: "bristol.gov.uk",
    role: "Public sector · 2021-22 · still live",
  },
  {
    tag: "Proof · Liberty Blume",
    body:
      "Led front-end on a 12-step regulated consumer-lending journey at Liberty Global. React with context-based state, financial validation, digital agreement, secure compliance flows. Established team DevOps standards.",
    avatarInitials: "LB",
    name: "Liberty Blume",
    role: "Regulated finance · 2025-now · in production",
  },
  {
    tag: "Proof · Estée Lauder EMEA",
    body:
      "Modernised seven luxury beauty brands (Clinique, MAC, Bobbi Brown, Tom Ford, Jo Malone, La Mer, Origins). French and German markets first, the blueprint for global rollout. Multi-million euro revenue platforms.",
    avatarInitials: "EL",
    name: "Estée Lauder Companies",
    role: "Luxury beauty · 2022-25 · live across EMEA",
  },
] as const;
