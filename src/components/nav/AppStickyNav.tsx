"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cx } from "@/components/cx";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSiteTheme } from "@/components/theme/ThemeProvider";
import { BOOKING_URL } from "@/constants/config";
import { HEADER_CTA, PRIMARY_NAV } from "@/constants/nav";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { isNavItemActive, useNavHash } from "./useNavHash";
import styles from "./AppStickyNav.module.scss";

type NavSurface = "paper" | "ink";

type AppStickyNavProps = {
  visible: boolean;
  surface?: NavSurface;
};

export function AppStickyNav({ visible, surface = "paper" }: AppStickyNavProps) {
  const { pathname, hash } = useNavHash();
  const { theme, toggleTheme } = useSiteTheme();
  const ink = surface === "ink";

  return (
    <motion.header
      className={cx(styles.root, ink ? styles.rootInk : styles.rootPaper)}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <div
        className={cx(
          styles.inner,
          "is-flex is-justify-between is-align-center is-flex-wrap has-gap-3",
        )}
      >
        <Link
          href={ROUTES.home}
          className={cx(styles.brand, "is-flex is-align-center has-gap-3", ink ? styles.brandInk : styles.brandPaper)}
          aria-label={`${SITE.name} home`}
        >
          <span className={cx(styles.mark, ink ? styles.markInk : styles.markPaper)}>{SITE.monogram}</span>
          <span className={cx(styles.wordmark, "text-lg has-font-semibold")}>{SITE.name}</span>
        </Link>
        <nav aria-label="Primary" className={cx(styles.nav, "is-flex is-align-center has-gap-2")}>
          {PRIMARY_NAV.map((item) => {
            const active = isNavItemActive(item.href, pathname, hash);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  styles.navLink,
                  "is-inline-flex is-align-center text-sm has-font-medium has-px-2",
                  ink ? styles.navLinkInk : styles.navLinkPaper,
                  active &&
                    (ink
                      ? cx(styles.navLinkActiveInk, "is-cream has-font-semibold")
                      : cx(styles.navLinkActivePaper, "is-primary has-font-semibold")),
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            className={cx(styles.themeToggle, "text-sm has-font-medium")}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "paper" ? "ink" : "paper"} theme`}
          >
            {theme === "paper" ? "Ink" : "Paper"}
          </button>
          <MagneticButton
            href={BOOKING_URL}
            variant={ink ? "ghostOnInk" : "primary"}
            cursorText={HEADER_CTA.cursorText}
            external
            className={styles.bookCta}
          >
            {HEADER_CTA.label}
          </MagneticButton>
        </nav>
      </div>
    </motion.header>
  );
}
