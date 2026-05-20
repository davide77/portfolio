import { ROUTES } from "@/constants/routes";

export const MONOPO_LAB_PAGE = {
  eyebrow: "WebGL lab",
  headline: "Monopo noise + refraction",
  description:
    "Faithful sandbox of nemutas/r3f-monopo: animated noise background sphere, cube-camera Fresnel lens, constant-noise grain, and FXAA. Click the progress bar or wait ten seconds to morph the lens shape. Isolated here so the hero stays untouched.",
  referenceUrl: "https://github.com/nemutas/r3f-monopo",
  referenceLabel: "nemutas/r3f-monopo on GitHub",
  path: `${ROUTES.lab}/monopo`,
  checklist: [
    "Background shows rotating noise line patterns in green, amber, and black.",
    "DD monogram refracts the background with chromatic Fresnel edges.",
    "Lens follows the cursor with a soft lag.",
    "Film grain is visible on the full frame.",
  ],
} as const;
