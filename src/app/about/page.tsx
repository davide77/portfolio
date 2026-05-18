import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about/AboutPageContent";
import { ABOUT_PAGE } from "@/constants/content/about-page";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "About",
  description: `${ABOUT_PAGE.headline} · ${SITE.name}`,
};

export default function AboutPage() {
  return (
    <main id="main">
      <AboutPageContent />
    </main>
  );
}
