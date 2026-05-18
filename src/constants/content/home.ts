import { PROFILE, TRUSTED_BY_CLIENTS } from "./profile";
import { CONTACT_PAGE } from "./contact-page";

export const HOME_SECTIONS = {
  work: {
    eyebrow: "02 — Lavori selezionati / Selected work",
    title: "Selected work",
    cta: "View all work",
  },
  capabilities: {
    eyebrow: "03 — Capabilities",
    title: "What I bring to the table",
  },
  manifesto: {
    eyebrow: "04 — Approach",
    cta: PROFILE.manifestoCta,
  },
  closing: {
    eyebrow: "05 — Contact",
  },
} as const;

export const FEATURED_WORK_SECTION = {
  kicker: HOME_SECTIONS.work.eyebrow,
  title: HOME_SECTIONS.work.title,
  intro: "Recent delivery across enterprise, founder-led products, and public sector.",
} as const;

/** Legacy exports for unused components kept for reference. */
export const HERO = {
  badge: PROFILE.eyebrow,
  headlineLine1: "Frontend that ships",
  headlineLine2: "product, not just code.",
  subhead: PROFILE.subhead,
  primaryCta: PROFILE.secondaryCta,
  primaryCtaHref: "/work",
  secondaryCta: "Email me",
  secondaryCtaHref: "mailto:davide@domenghini.com",
} as const;

export const HERO_STATS = [] as readonly { value: string; label: string }[];
export const HERO_VISUAL = { title: "", strapline: "" } as const;
export const HERO_FOCUS_AREAS = [] as const;
export const BRAND_STRIP = { title: "", kicker: "", names: TRUSTED_BY_CLIENTS } as const;
export const ABOUT_SECTION = { title: "About", paragraphs: [PROFILE.subhead] as const };
export const EXPERIENCE_SECTION = {
  title: "Experience",
  intro: "",
  items: [] as readonly { period: string; title: string; org: string; summary: string }[],
};
export const SKILLS_SECTION = {
  title: "Skills",
  groups: [] as readonly { title: string; items: readonly string[] }[],
};
export const CONTACT_SECTION = {
  title: "Contact",
  body: CONTACT_PAGE.pageIntro,
  ctaEmail: "Email",
};
