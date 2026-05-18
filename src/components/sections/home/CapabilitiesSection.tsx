import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { CAPABILITIES } from "@/constants/content/profile";
import { HOME_SECTIONS } from "@/constants/content/home";
import styles from "./CapabilitiesSection.module.scss";

export function CapabilitiesSection() {
  return (
    <section className={styles.root} aria-labelledby="capabilities-title">
      <div className="container-atmosphere">
        <EyebrowLabel>{HOME_SECTIONS.capabilities.eyebrow}</EyebrowLabel>
        <h2 id="capabilities-title" className="text-3xl has-mt-3">
          {HOME_SECTIONS.capabilities.title}
        </h2>
        <ul className={styles.grid}>
          {CAPABILITIES.map((item) => (
            <li key={item.title} className={styles.tile}>
              <h3 className="text-lg has-font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed is-text-muted has-m-0">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
