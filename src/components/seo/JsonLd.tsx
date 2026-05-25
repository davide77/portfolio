import type { CaseStudy } from "@/constants/content/projects";
import { SITE, SITE_EXPERTISE, SOCIAL_PROFILES } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { siteUrl } from "@/lib/seo";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function HomeJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            name: SITE.name,
            jobTitle: SITE.role,
            description: SITE.oneLineDescription,
            email: SITE.email,
            url: siteUrl(),
            knowsAbout: [...SITE_EXPERTISE],
            sameAs: SOCIAL_PROFILES.map((profile) => profile.href),
            address: {
              "@type": "PostalAddress",
              addressLocality: "London",
              addressCountry: "GB",
            },
          },
          {
            "@type": "WebSite",
            name: SITE.name,
            url: siteUrl(),
          },
        ],
      }}
    />
  );
}

export function caseStudyJsonLd(project: CaseStudy) {
  const pageUrl = siteUrl(ROUTES.work(project.slug));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        url: pageUrl,
        image: siteUrl(project.imageSrc),
        author: { "@type": "Person", name: SITE.name, url: siteUrl() },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
          { "@type": "ListItem", position: 2, name: "Work", item: siteUrl(ROUTES.workIndex) },
          { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
        ],
      },
    ],
  };
}
