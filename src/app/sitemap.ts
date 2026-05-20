import type { MetadataRoute } from "next";
import { ROUTES } from "@/constants/routes";
import { CASE_STUDIES } from "@/constants/content/projects";
import { SITE_URL, SITEMAP_LAST_MODIFIED } from "@/lib/seo";

function lastModified(path: string): Date {
  const iso = SITEMAP_LAST_MODIFIED[path];
  return iso ? new Date(iso) : new Date("2026-01-01");
}

// Single-page site plus one real page per case study. The home page and
// every /work/<slug> are indexable documents. Section anchors are not
// separate documents, so they stay out of the sitemap. Old page URLs 301
// to anchors (see next.config.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ROUTES.home,
    ...CASE_STUDIES.map((project) => ROUTES.work(project.slug)),
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified(path),
  }));
}
