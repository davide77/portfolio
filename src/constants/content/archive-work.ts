/**
 * /lab long-form archive. 29 frames pulled from twenty years of shipped work,
 * grouped by era. Each tile keeps `src` / `alt` / `layout` (consumed by the
 * current LegacyWorkGallery) and adds `client` / `label` / `blurb` / `group`
 * for the grouped archive treatment on /lab.
 *
 * Source images live at /public/images/archive/a-NN.png. Some client names
 * and labels are inferred from the captures and marked TODO; correct them
 * in place. Copy follows brand.md voice: British spelling, sentence case,
 * no long dashes.
 */

export type ArchiveGroup =
  | "enterprise-sap"
  | "sky-media"
  | "automotive"
  | "public-charity"
  | "luxury-retail"
  | "agency-other";

export type ArchiveTile = {
  src: string;
  /** Accessible description, derived from client + label. */
  alt: string;
  client: string;
  /** Short title, sentence case. */
  label: string;
  /** One line, brand voice. */
  blurb: string;
  group: ArchiveGroup;
  /** Bento rhythm. The styling task may re-derive this per group. */
  layout: "wide" | "tall" | "default";
};

export const ARCHIVE_SECTION = {
  id: "archive",
  kicker: "Archive",
  title: "Archive of earlier shipped work",
  intro:
    "Frames pulled from my long-form archive: agency builds, brand campaigns, and product skins from the pre-React era through to today. Not every property is still live, but the craft is visible in the pixels.",
} as const;

/** Dark hero for the legacy /work archive route (now retired in favour of /lab). */
export const WORK_ARCHIVE_HERO = {
  eyebrow: "10 · Long-form archive",
  headline: "Earlier shipped work, agency builds to brand campaigns.",
  intro:
    "Frames from twenty years of client work: enterprise SaaS, broadcast, automotive, retail, and agency builds. Not every property is still live, but the craft is visible in the pixels.",
  edge: "ARCHIVE · 2006 ONWARD",
  metaDescription:
    "An archive of earlier shipped work by Davide Domenghini: SAP enterprise campaigns, Sky broadcast, automotive, retail, and agency builds from 2006 onward.",
} as const;

export const ARCHIVE_GROUPS = [
  {
    id: "enterprise-sap",
    title: "Enterprise · SAP marketing platforms",
    intro: "Marketing surfaces, microsites and editorial product pages built across SAP and SAP Concur for B2B decision makers.",
  },
  {
    id: "sky-media",
    title: "Sky + media · Sky Store, Sky Sports, History",
    intro: "Sky Store browsing UI, Sky Sports promo modules, and editorial documentary surfaces for A+E Networks.",
  },
  {
    id: "automotive",
    title: "Automotive · Toyota, Renault, Honda",
    intro: "Campaign sites, dashboard work, and pitch creative for Toyota, Renault and Honda.",
  },
  {
    id: "public-charity",
    title: "Public + charity · Sunday Times, Driving.co.uk",
    intro: "Public-facing surfaces with a real reader behind them: Sunday Times Driving classifieds and friends.",
  },
  {
    id: "luxury-retail",
    title: "Luxury + retail · Estée Lauder, Boux Avenue",
    intro: "Beauty proofing flows and retail campaign frames where the type and the photography have to land in lockstep.",
  },
  {
    id: "agency-other",
    title: "Agency + other · iCLP, Momentum, Paymentsense, Parrot",
    intro: "Loyalty and account-based marketing agency sites, fintech product pages, and consumer hardware product sites.",
  },
] as const satisfies readonly { id: ArchiveGroup; title: string; intro: string }[];

const tile = (
  n: number,
  client: string,
  label: string,
  blurb: string,
  group: ArchiveGroup,
  layout: ArchiveTile["layout"],
): ArchiveTile => ({
  src: `/images/archive/a-${String(n).padStart(2, "0")}.png`,
  alt: `${client}: ${label}.`,
  client,
  label,
  blurb,
  group,
  layout,
});

export const ARCHIVE_TILES: readonly ArchiveTile[] = [
  tile(1, "SAP", "Oil and gas industry programme", "Animated infinity-loop hero for an SAP industry innovation campaign.", "enterprise-sap", "wide"),
  tile(2, "SAP", "Marketing Cloud editorial", "Long-form dark article page for SAP Marketing Cloud, aimed at consumer-goods leaders.", "enterprise-sap", "default"),
  tile(3, "SAP", "Customer experience campaign", "Bright editorial landing with a dual call to action.", "enterprise-sap", "default"),
  tile(4, "SAP", "Intelligent simplicity", "Professional Services landing with brain illustration for B2B engagement teams.", "enterprise-sap", "default"),
  tile(5, "SAP", "Digital future of banking", "Portrait-led campaign hero with a brand hashtag overlay.", "enterprise-sap", "default"),
  tile(6, "SAP", "Time to transform", "Particle-field hero for a digital transformation campaign.", "enterprise-sap", "default"),
  tile(7, "SAP", "Identify the big opportunities", "Cinematic scroll-through campaign page.", "enterprise-sap", "default"),
  tile(8, "SAP", "Cloud expedition kit", "SAP and AWS scroll-through microsite.", "enterprise-sap", "wide"),
  tile(9, "Estée Lauder", "CK Beauty creative proofing", "Mobile UI proofing flow for the Calvin Klein Beauty launch under the ELC EMEA programme.", "luxury-retail", "tall"),
  tile(10, "iCLP", "Customer devotion", "Loyalty and engagement agency site, 'we drive customer devotion'.", "agency-other", "default"),
  tile(11, "Sky", "Sky Store home hero", "Film detail and new-releases rail for the Sky Store video-on-demand front end.", "sky-media", "wide"),
  tile(12, "Sky", "Sky Store a-z grid", "Full A to Z film grid for the Sky Store browsing UI.", "sky-media", "wide"),
  tile(13, "Sky Sports", "Sky Sports promo module", "Responsive red news tile for Sky Sports.", "sky-media", "default"),
  tile(14, "Renault", "Guest host panel", "Editorial 'today's guest host' site module.", "automotive", "default"),
  // TODO: confirm client/title for the dark cinematic tile.
  tile(15, "Media (TODO)", "Cinematic promo tile", "Dark editorial content tile.", "sky-media", "default"),
  tile(16, "Toyota", "Goodwood Festival of Speed", "GT86 campaign tile.", "automotive", "default"),
  tile(17, "Paymentsense", "Simple card payments", "Phone-led marketing page for the Paymentsense card-payments product.", "agency-other", "default"),
  // TODO: confirm directory client.
  tile(18, "Directory (TODO)", "Local listings directory", "'Set foot in our' directory page with an embedded map.", "agency-other", "default"),
  tile(19, "Sky Sports", "Sky Sports news tile", "Red news tile variant.", "sky-media", "default"),
  // TODO: confirm client/title for the dark cinematic tile variant.
  tile(20, "Media (TODO)", "Cinematic promo tile", "Dark editorial content tile, variant.", "sky-media", "default"),
  tile(21, "Toyota", "MyToyota and WWF", "Environmental partnership panel.", "automotive", "default"),
  tile(22, "A+E Networks", "HISTORY · ancient world", "History Channel documentary promo tile for 'the best of the ancient world'.", "sky-media", "default"),
  tile(23, "Parrot", "Audio device showcase", "Product page for a Parrot audio device.", "agency-other", "default"),
  tile(24, "Boux Avenue", "Lingerie campaign", "Retail campaign visual.", "luxury-retail", "default"),
  tile(25, "SAP Concur", "Global case-study globe", "Interactive night-earth map, 'explore our global case studies'.", "enterprise-sap", "wide"),
  tile(26, "Momentum ABM", "ABM consultancy", "'The account based marketing consultancy' agency site.", "agency-other", "default"),
  tile(27, "Honda", "Civic: delivering the dream", "Civic campaign and pitch creative.", "automotive", "default"),
  tile(28, "Driving.co.uk", "Sell your car", "Sunday Times Driving classifieds landing.", "public-charity", "wide"),
  tile(29, "iCLP", "Customer devotion, navigation open", "iCLP site with the expanded side navigation.", "agency-other", "default"),
];

/**
 * Projects I shipped but for which no surviving capture exists. Real briefs,
 * lost files. Listed for completeness so the breadth of past clients is
 * visible even where the visual record is gone.
 */
export const MENTIONED_NO_SCREEN = {
  eyebrow: "11 · Mentioned, no screen kept",
  headline: "Honest provenance: shipped, no surviving capture.",
  intro:
    "Each line was a real engagement. The file was lost to a hard drive migration, a long-since-shuttered server, or a brief that never let me keep a copy.",
  items: [
    "01 · HSBC · application UI · 2012-13 · Hogarth + Ogilvy",
    "02 · EE · Apple product launch campaigns · 2017",
    "03 · GSK + Philips · brand sites + Facebook apps · 2011-12",
    "04 · Inmarsat · corporate site, microsites, emails · 2007-10",
    "05 · Le Bon Marché · ecommerce listings · 2016 · Spring Studios",
    "06 · Home Office · style guide rebuild in Angular · 2016",
    "07 · News UK Driving.co.uk · brand build from scratch · 2013",
    "08 · TUI Ski · Java front-end · 2006-07",
  ],
} as const;
