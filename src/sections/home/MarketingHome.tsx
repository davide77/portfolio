import { ClosingCtaSection } from "@/components/sections/home/ClosingCtaSection";
import { CapabilitiesSection } from "@/components/sections/home/CapabilitiesSection";
import { FeaturedWorkSection } from "@/components/sections/home/FeaturedWorkSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ManifestoTeaserSection } from "@/components/sections/home/ManifestoTeaserSection";
import { PositioningSection } from "@/components/sections/home/PositioningSection";
import { TrustedBySection } from "@/components/sections/home/TrustedBySection";

export function MarketingHome() {
  return (
    <main id="main">
      <HeroSection />
      <div id="trusted">
        <TrustedBySection />
      </div>
      <div id="positioning">
        <PositioningSection />
      </div>
      <div id="work">
        <FeaturedWorkSection />
      </div>
      <div id="capabilities">
        <CapabilitiesSection />
      </div>
      <div id="contact">
        <ManifestoTeaserSection />
        <ClosingCtaSection />
      </div>
    </main>
  );
}
