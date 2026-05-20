/**
 * Copy for the isolated /lab/disc-lens preview page.
 */

export const DISC_LENS_LAB_PAGE = {
  eyebrow: "Lab / disc lens",
  headline: "Static magnifying glass over a glowing letterform.",
  description:
    "Adapted from react-bits fluid glass: the letter renders into an off-screen buffer, a fixed tinted disc samples it, and only the type drifts (monopo integrate, collaborate, and challenge loops). No orbiting lens, pure black field.",
  hero: {
    composition: "B" as const,
    label: "Collaborate reference",
    caption:
      "Large amber disc plus forest satellite. Letter drifts behind both static lenses.",
  },
  panels: [
    {
      key: "A" as const,
      label: "A / integrate",
      caption:
        "Forest lens with amber and stone satellites. Warm green DD behind fixed discs.",
      loopSec: 8.04,
    },
    {
      key: "B" as const,
      label: "B / collaborate",
      caption:
        "Large amber lens plus forest satellite. Amber-cream DD, 8.04s loop.",
      loopSec: 8.04,
    },
    {
      key: "C" as const,
      label: "C / challenge",
      caption:
        "Single near-clear stone disc. Slow horizontal letter drift, 4.84s.",
      loopSec: 4.84,
    },
  ],
  checklist: [
    "Disc stays fixed in frame; only the emissive DD moves behind it.",
    "Magnified slice inverts and blooms like the monopo webm references.",
    "Disc body reads as thin glass, not a thick floating sphere.",
    "Disc tint mixes into the refracted letter (amber warm, stone subtle).",
    "Pure black background with no page bleed under the canvas.",
  ],
} as const;
