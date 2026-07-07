export const PROFILE = {
  eyebrow: "01 · Product Engineer · Origin Social",
  headline: "Twenty years turning hard briefs into products people use.",
  subhead:
    "I lead product, engineering and design end to end, now through my own studio, Origin Social. Discovery to deploy, the whole path, answering to no one but the work.",
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
  meta: "22 of 60+ · 2006-2026",
  ariaLabel: "Brands shipped for",
} as const;

export const TRUSTED_BY_CLIENTS = [
  "Sky",
  "Estée Lauder",
  "Liberty Global",
  "Bristol City Council",
  "EE",
  "A+E Networks",
  "Home Office",
  "News UK",
  "SAP",
  "Boring Money",
  "Toyota",
  "HSBC",
  "GSK",
  "Philips",
  "Honda",
  "Renault",
  "Comic Relief",
  "Sunday Times",
  "History Channel",
  "Inmarsat",
  "Squiz",
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
    stack: "THREE.JS · GLSL · IO",
  },
  {
    title: "Ecommerce and delivery",
    body: "Shopify DTC storefronts and end-to-end product, from technical discovery to live deploy. Comfortable owning the API contract, the build pipeline, and the conversion metrics that prove the thing worked.",
    stack: "SHOPIFY · VERCEL · STRIPE",
  },
] as const;
