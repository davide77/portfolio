/** JS motion presets mirrored from SCSS tokens in abstracts/_variables.scss */

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASE_SNAPPY = [0.33, 1, 0.68, 1] as const;

export const DURATION_UI = 0.28;
export const DURATION_HERO = 0.9;
export const DURATION_CURTAIN = 1.1;

export const STAGGER_CHILD = 0.06;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Critically damped springs (no overshoot) for UI that can be redirected
 * mid-flight. A spring re-targets from its current value and velocity, so
 * a reversal never hard-cuts the way a fixed-duration tween does.
 */
export const SPRING_UI = { type: "spring", bounce: 0, duration: 0.35 } as const;

/** Page-level transitions: tile -> case study and back, menu reveal. */
export const PAGE_TRANSITION = {
  /** Seconds for the tile <-> page clip morph. */
  morphSeconds: 0.55,
  /** Seconds for the fallback curtain slide (was 1.1s). */
  curtainSeconds: 0.55,
  /** Seconds for the final fade once a collapse lands on its tile. */
  settleFadeSeconds: 0.2,
  /** Seconds for the reduced-motion cross-fade. */
  reducedFadeSeconds: 0.2,
  /** Corner radius of a work tile, mirrors $radius-card-glass. */
  tileRadiusPx: 10,
  /** A captured tile rect older than this is ignored (e.g. cmd-click). */
  sourceMaxAgeMs: 2000,
} as const;

export const MOBILE_MENU_MOTION = {
  /** Seconds for the circular reveal from (and back into) the burger. */
  revealSeconds: 0.45,
  /** Per-link stagger once the panel is open. */
  linkStagger: 0.05,
} as const;
