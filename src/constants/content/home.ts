import { PROFILE, TRUSTED_BY_CLIENTS } from "./profile";
import { CONTACT_PAGE } from "./contact-page";

export const HOME_SECTIONS = {
  work: {
    eyebrow: "01 - Selected work",
    title: "Selected work",
    cta: "Read the case studies",
  },
  caseStudies: {
    eyebrow: "02 - Case studies",
    title: "Case studies in depth",
    intro:
      "The full story behind the work above: the brief, what I did, and what it delivered.",
  },
  capabilities: {
    eyebrow: "05 · Capabilities with receipts",
    title: "Capabilities with receipts",
  },
  closing: {
    eyebrow: "07 · Closing",
  },
} as const;

export const FEATURED_WORK_SECTION = {
  kicker: HOME_SECTIONS.work.eyebrow,
  title: HOME_SECTIONS.work.title,
  intro: "Recent delivery across enterprise, founder-led products, and public sector.",
  viewAllLabel: "View all work",
} as const;

export const SELECTED_WORK_SECTION = {
  kicker: HOME_SECTIONS.work.eyebrow,
  title: HOME_SECTIONS.work.title,
  intro: FEATURED_WORK_SECTION.intro,
  viewAllLabel: HOME_SECTIONS.work.cta,
  expandAriaPrefix: "Show details for",
  collapseAriaPrefix: "Hide details for",
  panelAriaPrefix: "Details for",
  formatIndex: (order: number) => `( ${order} )`,
} as const;

/** Legacy exports for unused components kept for reference. */
export const BRAND_STRIP = { title: "", kicker: "", names: TRUSTED_BY_CLIENTS } as const;
export const ABOUT_SECTION = { title: "About", paragraphs: [PROFILE.subhead] as const };
export const EXPERIENCE_SECTION = {
  title: "Where I have shipped",
  ariaLabel: "About and experience",
  intro: "",
  items: [] as readonly { period: string; title: string; org: string; summary: string }[],
};
export const SKILLS_SECTION = {
  title: "The tools behind the results",
  groups: [] as readonly { title: string; items: readonly string[] }[],
};
export const CONTACT_SECTION = {
  title: "Contact",
  body: CONTACT_PAGE.pageIntro,
  ctaEmail: "Email",
};
