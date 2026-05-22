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
  // Vertical rhythm comes from each section's own padding-block. The
  // wrapper divs only carry the anchor id (and the footer-wash class for
  // the closer). Do not add has-pt-* here - it stacks on top of the
  // section's internal padding and opens a 200px+ void above the head.
  return (
    <main id="main" className="home-main">
      <HeroSection />
      <div id="brands">
        <BrandsMarquee />
      </div>
      <SectionDivider />
      <div id="stats">
        <StatsBand />
      </div>
      <SectionDivider />
      <div id="work">
        <WorkBento />
      </div>
      <SectionDivider />
      <div id="capabilities">
        <CapabilitiesSection />
      </div>
      <SectionDivider />
      <div id="about">
        <AboutStrip />
      </div>
      <SectionDivider />
      <div id="contact" className="footer-wash-zone">
        <ClosingCtaSection />
      </div>
    </main>
  );
}
