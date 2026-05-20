import { CV_PDF_PATH } from "@/constants/config";
import { FOOTER_SECTION } from "@/constants/content/footer";
import { SITE, SOCIAL_LINKS } from "@/constants/site";
import { cx } from "./cx";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id={FOOTER_SECTION.id} className={"site-footer__footer"}>
      <div className={cx("site-footer__footer-inner", "container-atmosphere is-flex is-flex-column has-gap-6")}>
        <p className={cx("site-footer__farewell", "has-m-0")}>{FOOTER_SECTION.farewell}</p>
        <ul className="is-flex is-flex-wrap has-gap-4 text-sm">
          <li>
            <a className={"site-footer__link"} href={`mailto:${SITE.email}`}>
              {FOOTER_SECTION.briefLabel}
            </a>
          </li>
          <li>
            <a className={"site-footer__link"} href={CV_PDF_PATH} download>
              {FOOTER_SECTION.cvLabel}
            </a>
          </li>
        </ul>
        <ul className="is-flex is-flex-wrap has-gap-4 text-sm">
          {SOCIAL_LINKS.map((item) => (
            <li key={item.href}>
              <a className={"site-footer__link"} href={item.href} rel="noopener noreferrer" target="_blank">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={"site-footer__rule"} aria-hidden />
        <p className="text-sm is-paper">
          © {year} {SITE.name}. {FOOTER_SECTION.locationLine}
        </p>
      </div>
    </footer>
  );
}
