import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { ABOUT_STRIP } from "@/constants/content/about-strip";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { MotionMask } from "@/components/motion/MotionMask";
import { Parallax } from "@/components/motion/Parallax";
import { StaggerList, StaggerItem } from "@/components/motion/StaggerList";

/** About strip - Figma source of truth: ③ Patterns / About strip · ink. */
export function AboutStrip() {
  return (
    <section className="about-strip" id="about" aria-labelledby="about-strip-title">
      <div className="container-atmosphere about-strip__row">
        <Parallax range={32}>
          <MotionMask className="about-strip__portrait">
            <Image
              src={ABOUT_STRIP.portraitSrc}
              alt={ABOUT_STRIP.portraitAlt}
              width={1200}
              height={1500}
              sizes="(max-width: 720px) 100vw, 320px"
              className="about-strip__portrait-img"
            />
          </MotionMask>
        </Parallax>
        <div className="about-strip__copy">
          <SectionHead
            eyebrow={ABOUT_STRIP.eyebrow}
            headline={ABOUT_STRIP.headline}
            surface="ink"
            size="display"
            headingId="about-strip-title"
          />
          <StaggerList as="div" className="is-flex is-flex-column has-gap-6" stagger={0.08}>
            {ABOUT_STRIP.paragraphs.map((p, i) => (
              <StaggerItem as="div" key={i}>
                <p className="about-strip__paragraph">{p}</p>
              </StaggerItem>
            ))}
          </StaggerList>
          <StaggerList as="ul" className="about-strip__chips" stagger={0.05}>
            {ABOUT_STRIP.chips.map((chip) => (
              <StaggerItem as="li" key={chip.label} lift={12}>
                <a
                  href={chip.href}
                  className="about-strip__chip"
                  {...(chip.href.startsWith("http")
                    ? { rel: "noopener noreferrer", target: "_blank" }
                    : {})}
                >
                  {chip.label}
                </a>
              </StaggerItem>
            ))}
          </StaggerList>
          <MotionReveal lift={16}>
            <dl className="about-strip__meta">
              {ABOUT_STRIP.metaStrip.map((item) => (
                <div key={item.label} className="about-strip__meta-item">
                  <dt className="about-strip__meta-label">{item.label}</dt>
                  <dd className="about-strip__meta-body">{item.body}</dd>
                </div>
              ))}
            </dl>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
