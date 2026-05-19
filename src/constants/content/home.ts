import { PROFILE, TRUSTED_BY_CLIENTS } from "./profile";
import { CONTACT_PAGE } from "./contact-page";

export const HOME_SECTIONS = {
  work: {
    eyebrow: "02 - Selected work",
    title: "Selected work",
    cta: "View all work",
  },
  capabilities: {
    eyebrow: "03 - What you get",
    title: "What you get when you hire me",
  },
  manifesto: {
    eyebrow: "04 - How I work",
    cta: PROFILE.manifestoCta,
  },
  closing: {
    eyebrow: "05 - Work with me",
  },
} as const;

export const FEATURED_WORK_SECTION = {
  kicker: HOME_SECTIONS.work.eyebrow,
  title: HOME_SECTIONS.work.title,
  intro: "Recent delivery across enterprise, founder-led products, and public sector.",
  viewAllLabel: "View all work",
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
