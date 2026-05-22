import Link from "next/link";
import { cx } from "@/components/cx";
import {
  resolveBreadcrumbLabel,
  SITE_BREADCRUMB,
} from "@/constants/nav";
import { ROUTES } from "@/constants/routes";

type SiteBreadcrumbSurface = "ink" | "paper";

type SiteBreadcrumbProps = {
  pathname: string;
  surface?: SiteBreadcrumbSurface;
  className?: string;
};

/**
 * Figma nav breadcrumb: orb-flare `dd`, white name on ink, optional
 * ` / {page}` for internal routes (/lab, /work/..., etc.).
 */
export function SiteBreadcrumb({
  pathname,
  surface = "ink",
  className,
}: SiteBreadcrumbProps) {
  const ink = surface === "ink";
  const segment = resolveBreadcrumbLabel(pathname);

  return (
    <nav
      className={cx("site-breadcrumb", `site-breadcrumb--${surface}`, className)}
      aria-label={SITE_BREADCRUMB.navAriaLabel}
    >
      <ol className={cx("site-breadcrumb__list", "is-inline-flex", "is-align-baseline", "is-flex-wrap")}>
        <li className="site-breadcrumb__item">
          <Link
            href={ROUTES.home}
            className={cx(
              "site-breadcrumb__home",
              "is-inline-flex",
              "is-align-baseline",
              "has-gap-2",
            )}
            aria-label={SITE_BREADCRUMB.homeAriaLabel}
          >
            <span
              className={cx(
                "site-breadcrumb__prefix",
                ink ? "site-breadcrumb__prefix--ink" : "site-breadcrumb__prefix--paper",
              )}
            >
              {SITE_BREADCRUMB.prefix}
            </span>
            <span className={cx("site-breadcrumb__name", ink ? "is-white" : "is-ink")}>
              {SITE_BREADCRUMB.name}
            </span>
          </Link>
        </li>
        {segment ? (
          <li className="site-breadcrumb__item site-breadcrumb__current" aria-current="page">
            <span className="site-breadcrumb__segment">{segment}</span>
          </li>
        ) : null}
      </ol>
    </nav>
  );
}
