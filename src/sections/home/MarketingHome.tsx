import { ClosingCtaSection } from "@/components/sections/home/ClosingCtaSection";
import { CapabilitiesSection } from "@/components/sections/home/CapabilitiesSection";
import { SelectedWorkSection } from "@/components/sections/home/SelectedWorkSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { PositioningSection } from "@/components/sections/home/PositioningSection";
import { TrustedBySection } from "@/components/sections/home/TrustedBySection";
import { WorkArchiveHero } from "@/components/sections/work/WorkArchiveHero";
import { LegacyWorkGallery } from "@/components/LegacyWorkGallery";
import { AboutPageContent } from "@/components/sections/about/AboutPageContent";
import { SectionDivider } from "@/components/motion/SectionDivider";

// Single-page portfolio: every former external page (/about, /work,
// /work/[slug], /contact) is now a section here. Old URLs 301 to these
// anchors (see next.config.ts). /lab is gone entirely.
export function MarketingHome() {
  return (
    <main id="main" className="home-main">
      <HeroSection />
      <div id="trusted">
        <TrustedBySection />
      </div>
      <SectionDivider />
      <div id="positioning">
        <PositioningSection />
      </div>
      <SectionDivider />
      <div id="work">
        <SelectedWorkSection />
      </div>
      <SectionDivider />
      <div id="archive">
        <WorkArchiveHero />
        <LegacyWorkGallery />
      </div>
      <SectionDivider />
      <div id="capabilities">
        <CapabilitiesSection />
      </div>
      <SectionDivider />
      <div id="about">
        <AboutPageContent />
      </div>
      <SectionDivider />
      <div id="contact" className="footer-wash-zone">
        <ContactSection />
        <ClosingCtaSection />
      </div>
    </main>
  );
}
