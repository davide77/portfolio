import { ClosingCtaSection } from "@/components/sections/home/ClosingCtaSection";
import { CapabilitiesSection } from "@/components/sections/home/CapabilitiesSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { BrandsMarquee } from "@/components/sections/home/BrandsMarquee";
import { StatsBand } from "@/components/sections/home/StatsBand";
import { WorkBento } from "@/components/sections/home/WorkBento";
import { AboutStrip } from "@/components/sections/home/AboutStrip";
import { SectionDivider } from "@/components/motion/SectionDivider";

// Single-page portfolio. Seven numbered sections + closer, mirroring the
// Figma source of truth (bCjl4LmfZrxceEzNOfWH6J · ③ Home / Desktop).
// /work/[slug] stays as real routes. Long-form archive lives at /lab.
// AISection + ReceiptsSection components stay in the tree (unhooked) in
// case they return.
export function MarketingHome() {
  // Vertical rhythm: compact (spacer 8 = 48px) for the brands/stats setup,
  // statement (spacer 12 = 128px) for the work / capabilities / about /
  // closer band.
  return (
    <main id="main" className="home-main">
      <HeroSection />
      <div id="brands" className="has-pt-8">
        <BrandsMarquee />
      </div>
      <SectionDivider />
      <div id="stats" className="has-pt-8">
        <StatsBand />
      </div>
      <SectionDivider />
      <div id="work" className="has-pt-12">
        <WorkBento />
      </div>
      <SectionDivider />
      <div id="capabilities" className="has-pt-12">
        <CapabilitiesSection />
      </div>
      <SectionDivider />
      <div id="about" className="has-pt-12">
        <AboutStrip />
      </div>
      <SectionDivider />
      <div id="contact" className="footer-wash-zone has-pt-12">
        <ClosingCtaSection />
      </div>
    </main>
  );
}
