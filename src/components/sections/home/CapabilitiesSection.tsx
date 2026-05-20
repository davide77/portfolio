import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { CAPABILITIES } from "@/constants/content/profile";
import { HOME_SECTIONS } from "@/constants/content/home";

export function CapabilitiesSection() {
  return (
    <section className={"capabilities-section"} aria-labelledby="capabilities-title">
      <div className="container-atmosphere">
        <EyebrowLabel>{HOME_SECTIONS.capabilities.eyebrow}</EyebrowLabel>
        <h2 id="capabilities-title" className="section-title is-paper has-mt-3">
          {HOME_SECTIONS.capabilities.title}
        </h2>
        <ul className={"capabilities-section__grid"}>
          {CAPABILITIES.map((item) => (
            <li key={item.title} className={"capabilities-section__tile"}>
              <h3 className="text-lg has-font-semibold">{item.title}</h3>
              <p className="text-base leading-relaxed is-stone has-m-0">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
