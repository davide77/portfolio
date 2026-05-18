/**
 * Screens migrated from `documents/portfolio/src/assets/images` (PNG exports of earlier shipped work).
 * Served from `/public/images/archive/` so Next can optimise and cache them.
 */
const ALT_CYCLE = [
  "Archive screen: earlier shipped campaign or product interface.",
  "Archive screen: layout, typography, and UI composition from past client work.",
  "Archive screen: responsive web UI and component work from the archive.",
] as const;

export const ARCHIVE_SECTION = {
  id: "archive",
  title: "Archive of earlier shipped work",
  intro:
    "Frames pulled from my long-form archive: agency builds, brand campaigns, and product skins from the pre-React era through to today. Not every property is still live, but the craft is visible in the pixels.",
} as const;

export const ARCHIVE_TILES = Array.from({ length: 29 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return {
    src: `/images/archive/a-${n}.png`,
    alt: ALT_CYCLE[index % ALT_CYCLE.length]!,
    /** Bento rhythm: wide / tall / default */
    layout: (index % 7 === 0 ? "wide" : index % 5 === 2 ? "tall" : "default") as "wide" | "tall" | "default",
  };
});
