import { LabHero } from "@/components/sections/lab/LabHero";
import { LegacyWorkGallery } from "@/components/LegacyWorkGallery";
import { SectionDivider } from "@/components/motion/SectionDivider";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lab",
  description:
    "Twenty years of receipts plus the experiments behind the production work. Long-form archive grouped by era.",
  path: ROUTES.lab,
});

/**
 * /lab - lab hero + long-form archive. Mirrors the Figma source of truth
 * (⑤ Lab / Desktop): hero + archive only, no closer band (the home owns
 * the closing band). Different audience to the home: the reader who
 * scrolled long enough to want range. brand.md sanctions the green
 * --orb-glow accent on this surface only.
 */
export default function LabPage() {
  return (
    <main id="main" className="lab-page bg-ink">
      <LabHero />
      <SectionDivider />
      <div id="lab-archive" className="has-pt-12">
        <LegacyWorkGallery />
      </div>
    </main>
  );
}
