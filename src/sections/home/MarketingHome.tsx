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
  // Vertical rhythm: compact (spacer 8 = 48px) vs statement (spacer 12 =
  // 128px) top-padding on each wrapper, layered on top of the section's
  // own internal block padding. Audit calls for a swing between the
  // brands/stats trio (compact, they read as a setup), work and
  // capabilities (statement, the meat), the AI/receipts trio (compact,
  // a single argument in three voices), and about + closer (statement,
  // the resolution).
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
      <div id="ai" className="has-pt-8">
        <AISection />
      </div>
      <SectionDivider />
      <div id="receipts" className="has-pt-8">
        <ReceiptsSection />
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
