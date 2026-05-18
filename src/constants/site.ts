export const SITE = {
  name: "Davide Domenghini",
  monogram: "DD",
  role: "Senior Front-End Engineer",
  founderLine: "Founder, Nannynow.co.uk",
  location: "London, UK",
  oneLineDescription:
    "Senior front-end engineer and founder. React, Next.js, TypeScript. Enterprise lending, luxury retail, public sector, and consumer products.",
  email: "davide@domenghini.com",
  emailDisplay: "davide@domenghini.com",
  phoneDisplay: "07752 829119",
  phoneTel: "tel:+447752829119",
} as const;

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
