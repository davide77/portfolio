import { PROFILE } from "./profile";

/**
 * Mono line under H1. Positioning, not a client list: the hero is about the
 * work I own, not the brands I passed through. Clients still appear lower down
 * in the brands marquee (section 02) as proof.
 */
export const HERO_BRAND_BAND = "BUILDING DIGITAL PRODUCTS FROM IDEA TO LAUNCH";

export const HERO_DISPLAY = {
  eyebrow: PROFILE.eyebrow,
  /** Word-level hero line; "briefs" is emphasised in JSX */
  words: ["Twenty", "years", "turning", "hard", "briefs", "into", "products", "people", "use."] as const,
  emphasisWord: "briefs",
  brandBand: HERO_BRAND_BAND,
  verticalEdge: "EST · 2006 · BASED IN LONDON",
} as const;

export const SCROLL_BADGE = {
  label: "SCROLL DOWN · SCROLL DOWN ·",
  rotationDurationSec: 18,
  fadeScrollVh: 0.3,
} as const;

/** Scroll thresholds for the ambient section counter in the sticky nav. */
export const HOME_SECTION_ACTIVATION = {
  /** While scrollY is at or below this, the counter stays on 01 (hero). */
  topScrollMaxPx: 80,
  /** Section becomes active once its top passes this fraction of the viewport. */
  viewportFocusRatio: 0.2,
} as const;

export const HOME_SECTION_INDEX = {
  total: 7,
  sections: [
    { id: "hero", label: "01" },
    { id: "brands", label: "02" },
    { id: "stats", label: "03" },
    { id: "work", label: "04" },
    { id: "capabilities", label: "05" },
    { id: "about", label: "06" },
    { id: "contact", label: "07" },
  ],
} as const;
