import Image from "next/image";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { ABOUT_STRIP } from "@/constants/content/about-strip";

/** About strip - 4:5 portrait left, two-paragraph bio right, three CTA chips. */
export function AboutStrip() {
  return (
    <section className="about-strip" id="about" aria-labelledby="about-strip-title">
      <div className="container-atmosphere about-strip__row">
        <div className="about-strip__portrait">
          <Image
            src="/images/about/davide-domenghini-portrait.jpg"
            alt={ABOUT_STRIP.portraitAlt}
            width={1200}
            height={1500}
            sizes="(max-width: 720px) 100vw, 360px"
            className="about-strip__portrait-img"
          />
        </div>
        <div className="about-strip__copy">
          <EyebrowLabel>{ABOUT_STRIP.eyebrow}</EyebrowLabel>
          <h2 id="about-strip-title" className="section-title is-paper has-mt-3">
            {ABOUT_STRIP.headline}
          </h2>
          {ABOUT_STRIP.paragraphs.map((p, i) => (
            <p key={i} className="about-strip__paragraph is-cream has-mt-4">
              {p}
            </p>
          ))}
          <ul className="about-strip__chips has-mt-5">
            {ABOUT_STRIP.chips.map((chip) => (
              <li key={chip.label}>
                <a
                  href={chip.href}
                  className="about-strip__chip"
                  {...(chip.href.startsWith("http")
                    ? { rel: "noopener noreferrer", target: "_blank" }
                    : {})}
                >
                  {chip.label}
                </a>
              </li>
            ))}
          </ul>
          <dl className="about-strip__meta has-mt-9">
            {ABOUT_STRIP.metaStrip.map((item) => (
              <div key={item.label} className="about-strip__meta-item">
                <dt className="about-strip__meta-label mono text-xs is-cream">
                  {item.label}
                </dt>
                <dd className="about-strip__meta-body is-paper has-m-0 has-mt-2">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
