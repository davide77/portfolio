import { ROUTES } from "@/constants/routes";

export type LensSection = {
  /** The word printed on the backdrop, refracted by the DD lens. */
  word: string;
  /** One-line caption shown beside the lens. */
  caption: string;
  /** Background colour behind the word (the "page" colour the lens refracts). */
  background: string;
  /** Word colour on the backdrop. */
  textColor: string;
  /** Three-canvas accent rendered as the clearColor of each canvas. */
  clearColor: string;
};

export const LENSES_LAB_PAGE = {
  eyebrow: "WebGL lab",
  headline: "Three lenses, one monogram",
  description:
    "Each DD lens refracts a different word through the same Fresnel + cube-camera technique from the monopo reference. Move your cursor to track the lens.",
  referenceUrl: "https://monopo.vn/",
  referenceLabel: "Inspired by monopo.vn",
  path: `${ROUTES.lab}/lenses`,
} as const;

export const LENS_SECTIONS: readonly LensSection[] = [
  {
    word: "DESIGN",
    caption: "Decisions you can defend, written down.",
    background: "#101214",
    textColor: "#f5f1ea",
    clearColor: "#101214",
  },
  {
    word: "BUILD",
    caption: "Production code, not a slide.",
    background: "#101214",
    textColor: "#7fcab8",
    clearColor: "#101214",
  },
  {
    word: "SHIP",
    caption: "Out the door, in someone's hands.",
    background: "#101214",
    textColor: "#f29371",
    clearColor: "#101214",
  },
] as const;
