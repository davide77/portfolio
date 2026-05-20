/**
 * Screens migrated from `documents/portfolio/src/assets/images` (PNG exports of earlier shipped work).
 * Served from `/public/images/archive/` so Next can optimise and cache them.
 *
 * Each tile keeps `src` / `alt` / `layout` (consumed by the current LegacyWorkGallery)
 * and adds `client` / `label` / `blurb` / `group` for the grouped archive treatment.
 *
 * Some client names and labels are inferred from the captures and marked TODO; correct
 * them in place. Copy follows brand.md voice: British spelling, sentence case, no long dashes.
 */

export type ArchiveGroup =
  | "enterprise-saas"
  | "broadcast-streaming"
  | "automotive"
  | "retail-consumer"
  | "agency-loyalty";

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

/** Dark hero for the /work archive. Echoes the home hero band, without the DD orb. */
export const WORK_ARCHIVE_HERO = {
  eyebrow: "03 - Archive",
  headline: "Earlier shipped work, agency builds to brand campaigns.",
  intro:
    "Frames from twenty years of client work: enterprise SaaS, broadcast, automotive, retail, and agency builds. Not every property is still live, but the craft is visible in the pixels.",
  edge: "ARCHIVE · 2006 ONWARD",
  metaDescription:
    "An archive of earlier shipped work by Davide Domenghini: SAP enterprise campaigns, Sky broadcast, automotive, retail, and agency builds from 2006 onward.",
} as const;

export const ARCHIVE_GROUPS = [
  {
    id: "enterprise-saas",
    title: "Enterprise SaaS campaigns",
    intro: "Marketing and product surfaces for SAP and SAP Concur, built for B2B decision makers.",
  },
  {
    id: "broadcast-streaming",
    title: "Broadcast and streaming",
    intro: "Sky Sports modules, a video-on-demand store, and editorial documentary promotion.",
  },
  {
    id: "automotive",
    title: "Automotive",
    intro: "Campaign and partnership work for Toyota, Renault, and Honda.",
  },
  {
    id: "retail-consumer",
    title: "Retail and consumer",
    intro: "Retail campaigns, consumer payments, and an early mobile product prototype.",
  },
  {
    id: "agency-loyalty",
    title: "Agency, loyalty and marketplaces",
    intro: "Loyalty and B2B agency sites, a directory build, and a classifieds marketplace.",
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
  tile(1, "SAP", "Oil and gas industry programme", "Animated infinity-loop hero for an SAP industry innovation campaign.", "enterprise-saas", "wide"),
  tile(2, "SAP", "Marketing Cloud editorial", "Long-form dark article page for SAP Marketing Cloud, aimed at consumer-goods leaders.", "enterprise-saas", "default"),
  tile(3, "SAP", "Customer experience campaign", "Bright editorial landing with a dual call to action.", "enterprise-saas", "default"),
  tile(4, "SAP", "Intelligent simplicity", "Professional Services landing with brain illustration for B2B engagement teams.", "enterprise-saas", "default"),
  tile(5, "SAP", "Digital future of banking", "Portrait-led campaign hero with a brand hashtag overlay.", "enterprise-saas", "default"),
  tile(6, "SAP", "Time to transform", "Particle-field hero for a digital transformation campaign.", "enterprise-saas", "default"),
  tile(7, "SAP", "Identify the big opportunities", "Cinematic scroll-through campaign page.", "enterprise-saas", "default"),
  tile(8, "SAP", "Cloud expedition kit", "SAP and AWS scroll-through microsite.", "enterprise-saas", "wide"),
  // TODO: confirm client (beauty product app, 2012 prototype).
  tile(9, "Beauty client (TODO)", "Beauty app prototype", "Annotated greyscale mobile UI wireframes for a beauty product app, 2012.", "retail-consumer", "tall"),
  tile(10, "ICLP", "Customer devotion", "Loyalty and engagement agency site, \"we drive customer devotion\".", "agency-loyalty", "default"),
  // TODO: confirm Sky vs other VOD platform.
  tile(11, "Sky (TODO)", "Video-on-demand store front", "Film detail and new-releases rail for a video-on-demand store.", "broadcast-streaming", "wide"),
  tile(12, "Sky (TODO)", "A to Z film catalogue", "Full A to Z film grid for the same video-on-demand platform.", "broadcast-streaming", "wide"),
  tile(13, "Sky Sports", "Sky Bet news module", "Responsive red news tile.", "broadcast-streaming", "default"),
  tile(14, "Renault", "Guest host panel", "Editorial \"today's guest host\" site module.", "automotive", "default"),
  // TODO: confirm client/title for the dark cinematic tile.
  tile(15, "TODO", "Cinematic promo tile", "Dark editorial content tile.", "broadcast-streaming", "default"),
  tile(16, "Toyota", "Goodwood Festival of Speed", "GT86 campaign tile.", "automotive", "default"),
  // TODO: confirm payments client.
  tile(17, "Payments client (TODO)", "Simple card payments", "Phone-led marketing page for a card-payments product.", "retail-consumer", "default"),
  // TODO: confirm directory client.
  tile(18, "TODO", "Local listings directory", "\"Set foot in our\" directory page with an embedded map.", "agency-loyalty", "default"),
  tile(19, "Sky Sports", "Sky Sports news tile", "Red news tile variant.", "broadcast-streaming", "default"),
  // TODO: confirm client/title for the dark cinematic tile variant.
  tile(20, "TODO", "Cinematic promo tile", "Dark editorial content tile, variant.", "broadcast-streaming", "default"),
  tile(21, "Toyota", "MyToyota and WWF", "Environmental partnership panel.", "automotive", "default"),
  // TODO: confirm A+E Networks.
  tile(22, "A+E Networks (TODO)", "The best of the ancient world", "History documentary promo tile.", "broadcast-streaming", "default"),
  // TODO: confirm Parrot.
  tile(23, "Parrot (TODO)", "Audio device showcase", "Product page for a Parrot audio device.", "retail-consumer", "default"),
  tile(24, "Boux Avenue", "Lingerie campaign", "Retail campaign visual.", "retail-consumer", "default"),
  tile(25, "SAP Concur", "Global case-study globe", "Interactive night-earth map, \"explore our global case studies\".", "enterprise-saas", "wide"),
  tile(26, "Momentum", "ABM consultancy", "\"The account based marketing consultancy\" agency site.", "agency-loyalty", "default"),
  tile(27, "Honda", "Civic: delivering the dream", "Civic campaign and pitch creative.", "automotive", "default"),
  tile(28, "Driving.co.uk", "Sell your car", "Sunday Times Driving classifieds landing.", "agency-loyalty", "wide"),
  tile(29, "ICLP", "Customer devotion, navigation open", "ICLP site with the expanded side navigation.", "agency-loyalty", "default"),
];
