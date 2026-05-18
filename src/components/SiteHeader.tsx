"use client";

import Link from "next/link";
import { PRIMARY_NAV } from "@/constants/nav";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { isNavItemActive, useNavHash } from "@/components/nav/useNavHash";
import { cx } from "./cx";

export function SiteHeader() {
  const { pathname, hash } = useNavHash();

  return (
    <header className={"site-header"}>
      <div
        className={cx(
          "site-header__inner",
          "is-flex is-justify-between is-align-center is-flex-wrap has-gap-3",
        )}
      >
        <Link
          href={ROUTES.home}
          className={cx("site-header__brand", "is-text is-flex is-align-center has-gap-3 has-font-semibold text-lg")}
        >
          {SITE.name}
        </Link>
        <nav aria-label="Primary" className={cx("site-header__nav", "is-flex is-align-center has-gap-5")}>
          {PRIMARY_NAV.map((item) => {
            const active = isNavItemActive(item.href, pathname, hash);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "site-header__nav-link",
                  "is-inline-flex is-align-center text-sm has-font-medium is-text-muted has-px-2",
                  active && cx("site-header__nav-link-active", "is-primary has-font-semibold"),
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
