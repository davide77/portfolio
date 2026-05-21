export type ProjectIndustry =
  | "enterprise"
  | "founder"
  | "public"
  | "luxury"
  | "fintech"
  | "sports";

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  tagline: string;
  outcome: string;
  period: string;
  role: string;
  industry: ProjectIndustry;
  order: number;
  liveUrl: string;
  liveLabel: string;
  imageSrc: string;
  imageAlt: string;
  tags: readonly string[];
  summary: string;
  brief: string;
  workPoints: readonly { title: string; body: string }[];
  highlights: readonly string[];
  sections: readonly { heading: string; body: string }[];
  artefacts: readonly { src: string; alt: string; caption: string }[];
  featured: boolean;
};

// `featured` = appears on the home page. Keep it to 3-4 (the latest by recency).
// `/work` shows all case studies via getSortedCaseStudies() regardless of this flag.
export const CASE_STUDIES = [
  {
    slug: "liberty-blume",
    client: "Liberty Global",
    title: "Liberty Blume",
    tagline: "Multi-step lending platform for Liberty Global.",
    outcome: "Supported multi-million-euro revenue across a regulated lending journey.",
    period: "03/2025 - present",
    role: "Senior front-end engineer",
    industry: "fintech",
    order: 1,
    liveUrl: "https://www.libertyglobal.com",
    liveLabel: "Open live site",
    imageSrc: "/images/projects/liberty-blume/confirm-your-package.png",
    imageAlt: "Liberty Blume lending journey confirm your package step",
    tags: ["React", "Context API", "SCSS", "GCP", "Docker"],
    summary:
      "A 12+ step financial lending journey with digital signatures, scalable SCSS architecture, and a GCP/Docker delivery pipeline.",
    brief:
      "I lead frontend architecture on a large-scale financial lending platform: package building, credit assessment, customer data capture and digital agreement completion. Every transition handles real money and real compliance.",
    workPoints: [
      {
        title: "12+ step journey architecture",
        body: "Architected a React application with context-based state across interconnected steps, supporting complex loan workflows.",
      },
      {
        title: "7-1 SCSS and BEM",
        body: "Designed a 7-1 SCSS architecture with BEM, delivering responsive, accessible UI components the wider team now uses as the standard.",
      },
      {
        title: "Performance and DevOps",
        body: "Optimised asset strategy, font loading and state management. Established Git workflows, GCP deployment pipelines and Docker-based environments.",
      },
    ],
    highlights: [
      "12+ step regulated lending journey with digital signatures.",
      "Scalable 7-1 SCSS and Context API architecture.",
      "GCP/Docker pipeline supporting multi-million-euro revenue platform.",
    ],
    sections: [
      {
        heading: "Constraints",
        body: "FCA-regulated journey, twelve steps, every transition logged for audit. Lending decisions and digital agreement on screen, behind a public marketing site. Team is distributed across three time zones; the front end has to be self-explanatory enough that the back-end and content teams can extend it without re-litigating component design.",
      },
      {
        heading: "Stack and architecture",
        body: "React + Context API for shared state across steps so the journey can pause, branch and resume without prop drilling. SCSS 7-1 with BEM, generated utility classes from a token map, container queries on the form components so the steps work at every viewport. Build deploys via GCP and Docker on a trunk-based workflow with required reviews and type checks. No CSS-in-JS, no global state library; the journey is intentionally legible.",
      },
      {
        heading: "Outcome and next steps",
        body: "The platform is live in production, supporting multi-million-euro revenue with full WCAG 2.1 AA conformance. The team now extends the journey by composing existing tokens and components rather than authoring new SCSS. Next: lift the same architecture into Liberty Global's adjacent regulated products.",
      },
    ],
    artefacts: [
      {
        src: "/images/projects/liberty-blume/address-details.png",
        alt: "Address details step in the lending journey",
        caption: "Address details capture in the multi-step flow.",
      },
      {
        src: "/images/projects/liberty-blume/affordability.png",
        alt: "Affordability assessment screen",
        caption: "Affordability step with clear validation states.",
      },
      {
        src: "/images/projects/liberty-blume/agreement.png",
        alt: "Digital agreement completion screen",
        caption: "Agreement and signature completion.",
      },
    ],
    featured: true,
  },
  {
    slug: "nannynow",
    client: "Nannynow",
    title: "Nannynow.co.uk",
    tagline: "Founder-led consumer product for trusted childcare.",
    outcome: "End-to-end product from data model to deployment, mobile-first.",
    period: "2026 - present",
    role: "Founder and front-end lead",
    industry: "founder",
    order: 2,
    liveUrl: "https://nannynow.co.uk",
    liveLabel: "Open nannynow.co.uk",
    imageSrc: "/images/projects/nannynow.jpg",
    imageAlt: "Screenshot of the Nannynow website homepage",
    tags: ["Next.js", "React", "TypeScript", "Product"],
    summary:
      "Founder build: product direction, UX, API integration, and full front-end delivery from data model to deployment.",
    brief:
      "Families need a calm, trustworthy way to find childcare. Nannynow reduces cognitive load and surfaces verification clearly on mid-range phones.",
    workPoints: [
      {
        title: "Full vertical ownership",
        body: "Data model, API contracts, frontend, and deployment owned in one coherent stack.",
      },
      {
        title: "Rapid iteration",
        body: "Short feedback loops from prototype to production, with accessibility and performance treated as gates, not afterthoughts.",
      },
    ],
    highlights: [
      "Next.js and TypeScript product architecture.",
      "Tight iteration cycles from first wireframe to live deployment.",
      "Mobile-first journeys with verification at the centre.",
    ],
    sections: [
      {
        heading: "Problem space",
        body: "Finding childcare is high stress and high trust. The interface has to reduce cognitive load and stay fast on mid-range phones.",
      },
    ],
    artefacts: [
      {
        src: "/images/projects/nannynow.jpg",
        alt: "Nannynow homepage",
        caption: "Consumer homepage with calm hierarchy.",
      },
    ],
    featured: true,
  },
  {
    slug: "striver-football",
    client: "Striver.Football",
    title: "Striver.Football",
    tagline: "Brand-as-code site with codified design system.",
    outcome: "Live brand site with tokens, motion, and headless editorial workflow.",
    period: "2026 - present",
    role: "Design and front-end lead",
    industry: "sports",
    order: 3,
    liveUrl: "https://striver.football",
    liveLabel: "Open striver.football",
    imageSrc: "/images/projects/striver-football.jpg",
    imageAlt: "Screenshot of the Striver.Football marketing site",
    tags: ["Next.js", "SCSS tokens", "WordPress", "Motion"],
    summary:
      "Translated brand strategy into tokens, typography, motion, and a shipped Next.js App Router site the team can extend.",
    brief:
      "Striver needed a site that matched an existing brand strategy without drift between design files and production CSS.",
    workPoints: [
      {
        title: "Design system in code",
        body: "Token-driven SCSS with BEM components and container-query-first layout.",
      },
      {
        title: "Headless editorial",
        body: "WordPress for content, IMAGO for imagery, Mailchimp upsert for growth.",
      },
    ],
    highlights: [
      "Brand-as-code workflow with living design-system reference.",
      "Server components first with disciplined image handling.",
    ],
    sections: [
      {
        heading: "Brand as code",
        body: "Guidelines mirrored in the repo so drift is visible in review, not only in design files.",
      },
    ],
    artefacts: [
      {
        src: "/images/projects/striver-football.jpg",
        alt: "Striver marketing page",
        caption: "Editorial marketing layout with tokenised type.",
      },
    ],
    featured: true,
  },
  {
    slug: "estee-lauder-emea",
    client: "Estée Lauder Companies",
    title: "EMEA frontend modernisation",
    tagline: "Luxury retail frontend across seven brands.",
    outcome: "40% reduction in dev time on pilot markets; blueprint for global rollout.",
    period: "05/2022 - 02/2025",
    role: "Senior front-end engineer, EMEA",
    industry: "luxury",
    order: 4,
    liveUrl: "https://www.esteelauder.co.uk",
    liveLabel: "Open live site",
    imageSrc: "/images/projects/estee-lauder-emea/estee-lauder-uk.jpg",
    imageAlt: "Estée Lauder UK ecommerce homepage",
    tags: ["React", "Luxury retail", "i18n", "Design systems"],
    summary:
      "Led frontend modernisation across Clinique, MAC, Tom Ford Beauty, Jo Malone London, La Mer, Origins, and Bobbi Brown for French and German pilot markets.",
    brief:
      "Seven luxury brands needed a shared technical approach without losing distinct brand expression in the UI.",
    workPoints: [
      {
        title: "Proof of concept",
        body: "French and German market modernisation validated patterns before wider rollout.",
      },
      {
        title: "Shared patterns",
        body: "Component and styling conventions that teams could adopt without homogenising brand voice.",
      },
    ],
    highlights: [
      "Seven luxury brands under one EMEA frontend strategy.",
      "Pilot markets proved 40% dev time reduction on repeatable patterns.",
    ],
    sections: [
      {
        heading: "Outcome",
        body: "Blueprint adopted for global rollout with WCAG-conscious component libraries per brand constraints.",
      },
    ],
    artefacts: [
      {
        src: "/images/projects/estee-lauder-emea/estee-lauder-uk.jpg",
        alt: "Estée Lauder UK storefront homepage",
        caption: "Estée Lauder UK storefront.",
      },
      {
        src: "/images/projects/estee-lauder-emea/jo-malone-london.jpg",
        alt: "Jo Malone London storefront homepage",
        caption: "Jo Malone London storefront.",
      },
      {
        src: "/images/projects/estee-lauder-emea/la-mer.jpg",
        alt: "La Mer UK storefront homepage",
        caption: "La Mer UK storefront.",
      },
      {
        src: "/images/projects/estee-lauder-emea/clinique.jpg",
        alt: "Clinique UK storefront homepage",
        caption: "Clinique UK storefront.",
      },
      {
        src: "/images/projects/estee-lauder-emea/mac.jpg",
        alt: "MAC Cosmetics UK storefront homepage",
        caption: "MAC Cosmetics UK storefront.",
      },
      {
        src: "/images/projects/estee-lauder-emea/tom-ford-beauty.jpg",
        alt: "Tom Ford Beauty UK storefront homepage",
        caption: "Tom Ford Beauty UK storefront.",
      },
      {
        src: "/images/projects/estee-lauder-emea/origins.jpg",
        alt: "Origins UK storefront homepage",
        caption: "Origins UK storefront.",
      },
      {
        src: "/images/projects/estee-lauder-emea/bobbi-brown.jpg",
        alt: "Bobbi Brown UK storefront homepage",
        caption: "Bobbi Brown UK storefront.",
      },
    ],
    featured: false,
  },
  {
    slug: "cheam-sports-fc",
    client: "Cheam Sports FC",
    title: "Cheam Sports FC",
    tagline: "Production platform for 100+ families.",
    outcome: "Single config file makes the codebase forkable for other grassroots clubs.",
    period: "2024 - present",
    role: "Founder engineer",
    industry: "sports",
    order: 5,
    liveUrl: "https://cheamsportsfc.com",
    liveLabel: "Open cheamsportsfc.com",
    imageSrc: "/images/projects/cheam-sports-fc.jpg",
    imageAlt: "Screenshot of the Cheam Sports FC club website",
    tags: ["Next.js", "Stripe", "Drizzle", "PWA"],
    summary:
      "Solo full-stack build: portal, payments, admin, procedural social graphics, and defensive data ingestion.",
    brief:
      "Grassroots clubs need software that respects volunteer time and survives real payment edge cases.",
    workPoints: [
      {
        title: "Payments reconciliation",
        body: "Stripe webhooks into Google Apps Script so treasurers keep familiar spreadsheets.",
      },
      {
        title: "Social automation",
        body: "SVG match graphics rasterised with Sharp and OpenType.js per team colours.",
      },
    ],
    highlights: [
      "100+ families on production portal with web push.",
      "Forkable via club.config.ts for other clubs.",
    ],
    sections: [
      {
        heading: "Reliability",
        body: "Cron jobs, payment reminders, and defensive scraping where hosting limits required proxies.",
      },
    ],
    artefacts: [
      {
        src: "/images/projects/cheam-sports-fc.jpg",
        alt: "Club website",
        caption: "Member portal and public marketing surfaces.",
      },
    ],
    featured: true,
  },
  {
    slug: "bristol-city-council",
    client: "Bristol City Council",
    title: "Bristol design system",
    tagline: "GOV.UK-aligned React design system.",
    outcome: "WCAG 2.1 AA across components; 500,000+ residents served.",
    period: "12/2021 - 05/2022",
    role: "Senior front-end engineer",
    industry: "public",
    order: 6,
    liveUrl: "https://www.bristol.gov.uk",
    liveLabel: "Open live site",
    imageSrc: "/images/projects/bristol.jpg",
    imageAlt: "Bristol City Council website homepage",
    tags: ["React", "Docusaurus", "GOV.UK", "Accessibility"],
    summary:
      "Modern design system in React + Docusaurus, GOV.UK Design System aligned, mentoring two frontend associates.",
    brief:
      "Council digital services needed accessible, consistent components engineers and content designers could trust.",
    workPoints: [
      {
        title: "Accessibility floor",
        body: "WCAG 2.1 AA across all documented components with test guidance.",
      },
      {
        title: "Mentorship",
        body: "Mentored two frontend associates on React patterns and review discipline.",
      },
    ],
    highlights: [
      "500,000+ residents served through consistent digital services.",
      "Full WCAG 2.1 AA component library with Docusaurus docs.",
    ],
    sections: [
      {
        heading: "Public sector constraints",
        body: "Clarity and accessibility outweighed visual novelty; every component shipped with usage guidance.",
      },
    ],
    artefacts: [
      {
        src: "/images/projects/bristol.jpg",
        alt: "Bristol City Council public website",
        caption: "bristol.gov.uk homepage (interim hero until design-system capture is added).",
      },
    ],
    featured: false,
  },
] as const satisfies readonly CaseStudy[];

export type CaseStudySlug = (typeof CASE_STUDIES)[number]["slug"];

export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "enterprise", label: "Enterprise" },
  { id: "founder", label: "Founder" },
  { id: "public", label: "Public sector" },
  { id: "luxury", label: "Luxury" },
  { id: "fintech", label: "Fintech" },
  { id: "sports", label: "Sports" },
] as const;

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((p) => p.slug === slug);
}

export function getFeaturedCaseStudies(): readonly CaseStudy[] {
  return CASE_STUDIES.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getSortedCaseStudies(): readonly CaseStudy[] {
  return [...CASE_STUDIES].sort((a, b) => a.order - b.order);
}

export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const sorted = getSortedCaseStudies();
  const idx = sorted.findIndex((p) => p.slug === slug);
  if (idx < 0) return sorted[0];
  return sorted[(idx + 1) % sorted.length];
}
