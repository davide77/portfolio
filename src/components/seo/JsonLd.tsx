import { SITE } from "@/constants/site";

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
            email: SITE.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "London",
              addressCountry: "UK",
            },
          },
          {
            "@type": "WebSite",
            name: SITE.name,
            url: "https://domenghini.com",
          },
        ],
      }}
    />
  );
}
