export const SITE = {
  name: "Davide Domenghini",
  monogram: "DD",
  role: "Senior front-end engineer",
  founderLine: "Founder, Nannynow.co.uk",
  location: "London, UK",
  oneLineDescription:
    "Front-end engineer who designs and ships, end to end. 20 years for Sky, Estée Lauder and Liberty Global, now Liberty Blume. React, Next.js, TypeScript.",
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
  "React",
  "Next.js",
  "TypeScript",
  "User experience design",
  "Web accessibility (WCAG 2.1 AA)",
  "Web performance and Core Web Vitals",
  "Design systems",
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

export const SOCIAL_LINKS = [
  ...SOCIAL_PROFILES,
  {
    label: "Nannynow",
    href: "https://nannynow.co.uk",
  },
] as const;
