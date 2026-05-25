import type { Metadata } from "next";
import { SITE } from "@/constants/site";

export const SITE_URL = "https://www.domenghini.com";

/** Stable last-modified dates for sitemap (ISO date strings). */
export const SITEMAP_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-05-15",
  "/work": "2026-05-10",
  "/about": "2026-04-20",
  "/lab": "2026-03-01",
  "/contact": "2026-05-01",
  "/work/liberty-blume": "2026-04-15",
  "/work/nannynow": "2026-03-20",
  "/work/striver-football": "2026-02-10",
  "/work/estee-lauder-emea": "2026-01-15",
  "/work/cheam-sports-fc": "2025-11-01",
  "/work/bristol-city-council": "2025-09-01",
};

export function siteUrl(path = ""): string {
  return new URL(path, SITE_URL).toString();
}

type OgImageInput =
  | string
  | {
      path: string;
      alt: string;
    };

type PageMetadataInput = {
  title?: string;
  description: string;
  path: string;
  ogImage?: OgImageInput;
  noIndex?: boolean;
};

function resolveOgImage(ogImage: OgImageInput | undefined, fallbackAlt: string) {
  if (!ogImage) {
    return {
      url: siteUrl("/opengraph-image"),
      alt: fallbackAlt,
    };
  }
  if (typeof ogImage === "string") {
    return { url: siteUrl(ogImage), alt: fallbackAlt };
  }
  return { url: siteUrl(ogImage.path), alt: ogImage.alt };
}

export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex,
}: PageMetadataInput): Metadata {
  const canonical = siteUrl(path);
  const displayTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} · ${SITE.role}`;
  const { url: imageUrl, alt: imageAlt } = resolveOgImage(ogImage, displayTitle);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: displayTitle,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: "en_GB",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ddomenghini",
      creator: "@ddomenghini",
      title: displayTitle,
      description,
      images: [imageUrl],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} · ${SITE.role}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.oneLineDescription,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} · ${SITE.role}`,
    description: SITE.oneLineDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ddomenghini",
    creator: "@ddomenghini",
    title: `${SITE.name} · ${SITE.role}`,
    description: SITE.oneLineDescription,
    images: ["/opengraph-image"],
  },
};
