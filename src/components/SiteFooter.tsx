import Link from "next/link";
import { StatusPill } from "@/components/ui/StatusPill";
import { CV_PDF_PATH } from "@/constants/config";
import { FOOTER_SECTION } from "@/constants/content/footer";
import { PROFILE } from "@/constants/content/profile";
import { ROUTES } from "@/constants/routes";
import { SITE, SOCIAL_LINKS } from "@/constants/site";
import { cx } from "./cx";
import styles from "./SiteFooter.module.scss";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id={FOOTER_SECTION.id} className={styles.footer}>
      <div className={cx(styles.footerInner, "container-atmosphere is-flex is-flex-column has-gap-6")}>
        <div className={styles.farewell}>
          <p className={cx(styles.farewellEn, "has-m-0")}>{FOOTER_SECTION.farewellEn}</p>
          <p className={cx(styles.farewellIt, "has-m-0 text-lg")}>{FOOTER_SECTION.farewellIt}</p>
        </div>
        <StatusPill label={PROFILE.availabilityLabel} />
        <p>
          <a className={styles.link} href={`mailto:${SITE.email}`}>
            {SITE.emailDisplay}
          </a>
        </p>
        <ul className="is-flex is-flex-wrap has-gap-4">
          {SOCIAL_LINKS.map((item) => (
            <li key={item.href}>
              <a className={styles.link} href={item.href} rel="noopener noreferrer" target="_blank">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p>
          <a className={styles.link} href={CV_PDF_PATH} download>
            {FOOTER_SECTION.cvLabel}
          </a>
          {" · "}
          <Link className={styles.link} href={ROUTES.contact}>
            {FOOTER_SECTION.contactLinkLabel}
          </Link>
        </p>
        <div className={styles.rule} aria-hidden />
        <p className="text-sm is-cream">
          © {year} {SITE.name}. {FOOTER_SECTION.locationLine}
        </p>
      </div>
    </footer>
  );
}
