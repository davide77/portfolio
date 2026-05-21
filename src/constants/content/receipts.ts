/**
 * Three proofs / from the CV. Ink surface, signal accents.
 * Real project evidence until named LinkedIn quotes land.
 */

export const RECEIPTS_BAND = {
  eyebrow: "07 · Three proofs · from the CV",
  headline: "Three projects. Three specific receipts. Pick any one to verify.",
  intro:
    "Final site will replace these with named LinkedIn quotes. Until then, the evidence is the work.",
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
