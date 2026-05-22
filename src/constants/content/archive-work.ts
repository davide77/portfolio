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
    eyebrow: "01 · SAP",
    title: "Enterprise marketing platforms",
  },
  {
    id: "sky-media",
    eyebrow: "02 · Sky",
    title: "Broadcast and streaming",
  },
  {
    id: "automotive",
    eyebrow: "03 · Automotive",
    title: "Automotive campaign sites",
  },
  {
    id: "public-charity",
    eyebrow: "04 · Public",
    title: "Public sector and charity",
  },
  {
    id: "agency-other",
    eyebrow: "05 · Agency",
    title: "Agency and retail builds",
  },
] as const satisfies readonly { id: ArchiveGroup; eyebrow: string; title: string }[];

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
  // tile 9 (ELC CK Beauty) removed - not in Figma archive.
  tile(10, "iCLP", "Customer devotion", "Loyalty and engagement agency site, 'we drive customer devotion'.", "agency-other", "default"),
  tile(11, "Sky", "Sky Store · hero", "Film detail and new-releases rail for the Sky Store video-on-demand front end.", "sky-media", "wide"),
  tile(12, "Sky", "Sky Store · grid", "Full A to Z film grid for the Sky Store browsing UI.", "sky-media", "wide"),
  tile(13, "Sky Sports", "Sky Sports promo", "Responsive red news tile for Sky Sports.", "sky-media", "default"),
  tile(14, "Renault", "Renault ZE", "Renault ZE campaign panel.", "automotive", "default"),
  // tile 15 (cinematic TODO) removed - unidentified.
  tile(16, "Toyota", "Goodwood GT86", "GT86 campaign tile for the Goodwood Festival of Speed.", "automotive", "default"),
  tile(17, "Paymentsense", "Paymentsense", "Phone-led marketing page for the Paymentsense card-payments product.", "agency-other", "default"),
  // tile 18 (local listings TODO) removed - unidentified.
  tile(19, "Sky Sports", "Sky Sports news tile", "Red news tile variant for Sky Sports.", "sky-media", "default"),
  // tile 20 (cinematic TODO variant) removed - unidentified.
  tile(21, "Toyota", "MyToyota dash", "MyToyota dashboard, environmental partnership panel.", "automotive", "default"),
  tile(22, "A+E Networks", "HISTORY · ancient", "History Channel documentary promo tile for 'the best of the ancient world'.", "sky-media", "default"),
  // tile 23 (Parrot) removed - not in Figma archive.
  tile(24, "Boux Avenue", "Boux Avenue", "Boux Avenue lingerie campaign visual.", "agency-other", "default"),
  tile(25, "SAP Concur", "Concur globals", "Interactive night-earth map, 'explore our global case studies'.", "enterprise-sap", "wide"),
  tile(26, "MomentumABM", "MomentumABM", "'The account based marketing consultancy' agency site.", "agency-other", "default"),
  tile(27, "Honda", "Honda Civic", "Civic campaign and pitch creative.", "automotive", "default"),
  tile(28, "Driving.co.uk", "Driving.co.uk", "Sunday Times Driving classifieds landing.", "public-charity", "wide"),
  // tile 29 (iCLP variant) removed - duplicate of tile 10.
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
