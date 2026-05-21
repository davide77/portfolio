import { ClosingCtaSection } from "@/components/sections/home/ClosingCtaSection";
import { CreativeCodingCards } from "@/components/sections/lab/CreativeCodingCards";
import { LabHero } from "@/components/sections/lab/LabHero";
import { LegacyWorkGallery } from "@/components/LegacyWorkGallery";
import { SectionDivider } from "@/components/motion/SectionDivider";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lab",
  description:
    "Twenty years of receipts plus the experiments behind the production work. Long-form archive grouped by era, mentioned-no-screen list, and WebGL prototypes.",
  path: ROUTES.lab,
});

/**
 * /lab - long-form archive + creative coding hub. Different audience to the
 * home: the reader who scrolled long enough to want range. Same brand voice;
 * brand.md sanctions the green --orb-glow accent on this surface only.
 */
export default function LabPage() {
  return (
    <main id="main" className="lab-page bg-ink">
      <LabHero />
      <SectionDivider />
      <div id="lab-archive" className="has-pt-12">
        <LegacyWorkGallery />
      </div>
      <SectionDivider />
      <div id="lab-experiments" className="has-pt-12">
        <CreativeCodingCards />
      </div>
      <SectionDivider />
      <div id="lab-contact" className="footer-wash-zone has-pt-12">
        <ClosingCtaSection />
      </div>
    </main>
  );
}
