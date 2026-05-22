import { SectionHead } from "@/components/ui/SectionHead";
import { CAPABILITIES } from "@/constants/content/profile";
import { HOME_SECTIONS } from "@/constants/content/home";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";

const TILE_NUMBERS = ["01", "02", "03", "04", "05", "06"] as const;

/** Capabilities grid - Figma source of truth: ③ Patterns / Capabilities · paper. */
export function CapabilitiesSection() {
  return (
    <section className="capabilities-section" aria-labelledby="capabilities-title">
      <div className="container-atmosphere">
        <SectionHead
          eyebrow={HOME_SECTIONS.capabilities.eyebrow}
          headline={HOME_SECTIONS.capabilities.title}
          surface="paper"
          headingId="capabilities-title"
        />
        <StaggerList as="ul" className="capabilities-section__grid" stagger={0.07}>
          {CAPABILITIES.map((item, i) => (
            <StaggerItem as="li" key={item.title} className="capabilities-section__tile" lift={22}>
              <p className="capabilities-section__num">{TILE_NUMBERS[i] ?? `0${i + 1}`}</p>
              <h3 className="capabilities-section__title">{item.title}</h3>
              <span className="capabilities-section__spacer" aria-hidden />
              <p className="capabilities-section__stack">{item.stack}</p>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
