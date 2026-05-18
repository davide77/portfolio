import { AboutPageContent } from "@/components/sections/about/AboutPageContent";
import { ABOUT_PAGE } from "@/constants/content/about-page";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: `${ABOUT_PAGE.headline} Twenty years of React, Next.js, and TypeScript across enterprise, luxury retail, and founder-led products.`,
  path: ROUTES.about,
});

export default function AboutPage() {
  return (
    <main id="main">
      <AboutPageContent />
    </main>
  );
}
