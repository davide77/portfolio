export const SITE = {
  name: "Davide Domenghini",
  monogram: "DD",
  role: "Product Engineer",
  founderLine: "Product Engineer, Origin Social",
  location: "London, UK",
  /**
   * SERP + social snippet. Held to 150-160 characters: Google truncates the
   * meta description around 155 on desktop and shorter on mobile, so anything
   * past that is written for nobody. Fuller entity context lives in
   * `longDescription`, which only feeds JSON-LD (no length limit there).
   */
  oneLineDescription:
    "Product engineer in London building digital products end to end. Twenty years across product, engineering and design. React, Next.js, TypeScript, Shopify.",
  /** Person schema `description`. Longer on purpose: names the studio so search and AI engines can pin the entity. */
  longDescription:
    "Product engineer building digital products from idea to launch. Twenty years leading product, engineering and design end to end, now through my own studio, Origin Social. React, Next.js, TypeScript, Shopify.",
  email: "davide@domenghini.com",
  emailDisplay: "davide@domenghini.com",
  phoneDisplay: "07752 829119",
  phoneTel: "tel:+447752829119",
} as const;

/**
 * Areas of expertise for the Person JSON-LD `knowsAbout` field. Helps search
 * and AI engines understand the entity. Mirrors the capabilities on home.
 */
export const SITE_EXPERTISE = [
  "Front-end architecture",
  "Product engineering",
  "React",
  "Next.js",
  "TypeScript",
  "User experience design",
  "Web accessibility (WCAG 2.1 AA)",
  "Web performance and Core Web Vitals",
  "Design systems",
  "Ecommerce and Shopify",
  "WebGL and GLSL",
  "End-to-end product delivery",
] as const;

/** Personal profiles (used in JSON-LD sameAs and footer/contact links). */
export const SOCIAL_PROFILES = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/davidedomenghini",
  },
  {
    label: "X",
    href: "https://x.com/ddomenghini",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/domenghini",
  },
  {
    label: "GitHub",
    href: "https://github.com/davide77",
  },
] as const;

/**
 * Footer links. Personal profiles only - no project or client domains.
 *
 * A link to a project's live site sends people to whatever that site is today
 * rather than to the work, and for a finished engagement it is not mine to
 * present as current. Work is shown through its case study instead. See the
 * note at the top of `constants/content/projects.ts`.
 */
export const SOCIAL_LINKS = SOCIAL_PROFILES;
