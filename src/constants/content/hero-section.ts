import { PROFILE } from "./profile";

export const HERO_DISPLAY = {
  eyebrow: PROFILE.eyebrow,
  /** Word-level hero line; "shipping" is emphasised in JSX */
  words: ["Senior", "engineer", "shipping", "whole", "products,", "end", "to", "end."] as const,
  emphasisWord: "shipping",
  verticalEdge: "EST · 2006 · LONDON · ROME",
} as const;

export const SCROLL_BADGE = {
  label: "SCROLL DOWN · SCROLL DOWN ·",
  rotationDurationSec: 18,
  fadeScrollVh: 0.3,
} as const;

export const HOME_SECTION_INDEX = {
  total: 6,
  sections: [
    { id: "hero", label: "01" },
    { id: "trusted", label: "02" },
    { id: "positioning", label: "03" },
    { id: "work", label: "04" },
    { id: "capabilities", label: "05" },
    { id: "contact", label: "06" },
  ],
} as const;
