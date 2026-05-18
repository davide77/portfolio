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
