import Link from "next/link";
import { StatusPill } from "@/components/ui/StatusPill";
import { CV_PDF_PATH } from "@/constants/config";
import { FOOTER_SECTION } from "@/constants/content/footer";
import { PROFILE } from "@/constants/content/profile";
import { ROUTES } from "@/constants/routes";
import { SITE, SOCIAL_LINKS } from "@/constants/site";
import { cx } from "./cx";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id={FOOTER_SECTION.id} className={"site-footer__footer"}>
      <div className={cx("site-footer__footer-inner", "container-atmosphere is-flex is-flex-column has-gap-6")}>
        <p className={cx("site-footer__farewell", "has-m-0")}>{FOOTER_SECTION.farewell}</p>
        <StatusPill label={PROFILE.availabilityLabel} />
        <p>
          <a className={"site-footer__link"} href={`mailto:${SITE.email}`}>
            {SITE.emailDisplay}
          </a>
        </p>
        <ul className="is-flex is-flex-wrap has-gap-4">
          {SOCIAL_LINKS.map((item) => (
            <li key={item.href}>
              <a className={"site-footer__link"} href={item.href} rel="noopener noreferrer" target="_blank">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p>
          <a className={"site-footer__link"} href={CV_PDF_PATH} download>
            {FOOTER_SECTION.cvLabel}
          </a>
          {" · "}
          <Link className={"site-footer__link"} href={ROUTES.contact}>
            {FOOTER_SECTION.contactLinkLabel}
          </Link>
        </p>
        <div className={"site-footer__rule"} aria-hidden />
        <p className="text-sm is-cream">
          © {year} {SITE.name}. {FOOTER_SECTION.locationLine}
        </p>
      </div>
    </footer>
  );
}
