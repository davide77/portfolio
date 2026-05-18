import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/constants/content/projects";
import { ROUTES } from "@/constants/routes";
import { SITE_URL, SITEMAP_LAST_MODIFIED } from "@/lib/seo";

function lastModified(path: string): Date {
  const iso = SITEMAP_LAST_MODIFIED[path];
  return iso ? new Date(iso) : new Date("2026-01-01");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [ROUTES.home, ROUTES.workIndex, ROUTES.about, ROUTES.lab, ROUTES.contact];
  const workRoutes = CASE_STUDIES.map((p) => ROUTES.work(p.slug));

  return [...staticRoutes, ...workRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified(path),
  }));
}
