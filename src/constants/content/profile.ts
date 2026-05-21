export const PROFILE = {
  eyebrow: "01 · Senior front-end · Founder",
  headline: "Twenty years shipping the front end of products people use.",
  subhead:
    "London-based. Twenty years in high-traffic web work for Sky, Estée Lauder and Liberty Global. Now leading frontend at Liberty Blume and building Nannynow with the same rigour as enterprise lending and luxury retail.",
  verticalStrip: "EST · 2006 · BASED IN LONDON",
  primaryCta: "Email Davide",
  secondaryCta: "See selected work",
  closingHeadline: "Got a brief that needs a senior owner? Send it.",
  closingEmphasisWord: "senior owner",
  statusLabel: "Open to senior roles · London / Remote",
  availabilityLabel: "Replies within 48h · London · GMT",
} as const;

export const BRANDS_MARQUEE = {
  eyebrow: "02 · Brands shipped for",
  meta: "23 of 60+ · 2006-2026",
  ariaLabel: "Brands shipped for",
} as const;

export const TRUSTED_BY_CLIENTS = [
  "Sky",
  "Estée Lauder Companies",
  "Liberty Global",
  "Bristol City Council",
  "EE",
  "A+E Networks",
  "SAP",
  "MAC Cosmetics",
  "Tom Ford Beauty",
  "Jo Malone London",
  "La Mer",
  "Clinique",
  "Origins",
  "Boring Money",
  "Squiz",
  "Toyota",
  "Honda",
  "Renault",
  "Comic Relief",
  "Sunday Times",
  "History Channel",
  "Inmarsat",
  "Le Bon Marché",
] as const;

export const POSITIONING = {
  headline: "Twenty years shipping the front end of products people actually use.",
  paragraphs: [
    "I can architect a 12-step regulated lending platform and prototype an experimental WebGL interface in the same week when the brief demands it.",
    "The through-line is judgement: knowing when to optimise, when to ship, and when a calm interface is worth more than another feature.",
  ],
} as const;

export const CAPABILITIES = [
  {
    title: "Front-end architecture",
    body: "Type-safe component systems with tokens, container-query layouts and a generated utility layer. The structure that lets a team ship without re-litigating every spacing decision.",
    stack: "NEXT.JS · REACT · TYPESCRIPT · SCSS",
  },
  {
    title: "Accessibility",
    body: "WCAG 2.1 AA on every shipped flow. Keyboard pass, contrast checks and reduced motion in the definition of done. 500,000+ residents on bristol.gov.uk.",
    stack: "AXE · NVDA · VOICEOVER · LIGHTHOUSE",
  },
  {
    title: "Performance",
    body: "Lighthouse 90+ on production hero pages, mobile, throttled. Set a perf budget; measure on every PR; refuse the regression. Boring, repeatable, evidence-led.",
    stack: "LIGHTHOUSE · WEBPAGETEST · CWV",
  },
  {
    title: "Design systems",
    body: "Tokens mirrored across brand book, Figma library, and SCSS. The same name in three places. The library is a product, with versioning and a changelog.",
    stack: "FIGMA · STYLE-DICTIONARY · SCSS",
  },
  {
    title: "WebGL and motion",
    body: "GLSL shaders for the celestial DD orbs on the home hero. Sharp, defined, high-contrast. Render loop paused on visibility change. No bloom, no blur.",
    stack: "THREE.JS · GLSL · INTERSECTION-OBSERVER",
  },
  {
    title: "End-to-end delivery",
    body: "From technical discovery to live deploy. Comfortable owning the API contract, the build pipeline and the analytics that prove the thing worked.",
    stack: "VERCEL · GH ACTIONS · STRIPE",
  },
] as const;
