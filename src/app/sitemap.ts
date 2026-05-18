import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";

const BASE = "https://domenghini.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [ROUTES.home, ROUTES.workIndex, ROUTES.about, ROUTES.lab, ROUTES.contact];
  const workRoutes = CASE_STUDIES.map((p) => ROUTES.work(p.slug));

  return [...staticRoutes, ...workRoutes].map((url) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
  }));
}
