import { ROUTES } from "@/constants/routes";

/** Featured lab previews linked from the main /lab index. */
export const LAB_FEATURED = [
  {
    href: `${ROUTES.lab}/monopo`,
    eyebrow: "WebGL",
    title: "Monopo noise + refraction",
    description:
      "nemutas/r3f-monopo sandbox: noise background, cube-camera Fresnel lens, film grain, FXAA. Play here without touching the hero.",
  },
  {
    href: `${ROUTES.lab}/disc-lens`,
    eyebrow: "WebGL",
    title: "Disc lens magnifier",
    description:
      "Static tinted glass disc over an emissive letterform. Monopo-style refraction, react-bits FBO sampling.",
  },
] as const;
