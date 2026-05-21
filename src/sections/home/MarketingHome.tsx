import { ClosingCtaSection } from "@/components/sections/home/ClosingCtaSection";
import { CapabilitiesSection } from "@/components/sections/home/CapabilitiesSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { BrandsMarquee } from "@/components/sections/home/BrandsMarquee";
import { StatsBand } from "@/components/sections/home/StatsBand";
import { WorkBento } from "@/components/sections/home/WorkBento";
import { AISection } from "@/components/sections/home/AISection";
import { ReceiptsSection } from "@/components/sections/home/ReceiptsSection";
import { AboutStrip } from "@/components/sections/home/AboutStrip";
import { SectionDivider } from "@/components/motion/SectionDivider";

// Single-page portfolio. Each former external route (/about, /contact)
// is a section here; old URLs 301 to anchors (see next.config.ts).
// /work/[slug] stays as real routes. Long-form archive lives at /lab,
// not here - the home page is the first 90 seconds for a hiring lead,
// the archive is for the reader who wants range.
export function MarketingHome() {
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
      <div id="ai">
        <AISection />
      </div>
      <SectionDivider />
      <div id="receipts">
        <ReceiptsSection />
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
