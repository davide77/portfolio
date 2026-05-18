"use client";

import Link from "next/link";
import { PRIMARY_NAV } from "@/constants/nav";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { isNavItemActive, useNavHash } from "@/components/nav/useNavHash";
import { cx } from "./cx";
import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  const { pathname, hash } = useNavHash();

  return (
    <header className={styles.root}>
      <div
        className={cx(
          styles.inner,
          "is-flex is-justify-between is-align-center is-flex-wrap has-gap-3",
        )}
      >
        <Link
          href={ROUTES.home}
          className={cx(styles.brand, "is-text is-flex is-align-center has-gap-3 has-font-semibold text-lg")}
        >
          {SITE.name}
        </Link>
        <nav aria-label="Primary" className={cx(styles.nav, "is-flex is-align-center has-gap-5")}>
          {PRIMARY_NAV.map((item) => {
            const active = isNavItemActive(item.href, pathname, hash);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  styles.navLink,
                  "is-inline-flex is-align-center text-sm has-font-medium is-text-muted has-px-2",
                  active && cx(styles.navLinkActive, "is-primary has-font-semibold"),
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
