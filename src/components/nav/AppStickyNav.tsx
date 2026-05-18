"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cx } from "@/components/cx";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionNumerals } from "@/components/ui/SectionNumerals";
import { MobileNavMenu } from "@/components/nav/MobileNavMenu";
import { isNavItemActive, useNavHash } from "@/components/nav/useNavHash";
import { BOOKING_URL } from "@/constants/config";
import {
  HEADER_CTA,
  MOBILE_NAV,
  NAV_WORDMARK,
  PRIMARY_NAV,
} from "@/constants/nav";
import { ROUTES } from "@/constants/routes";

type NavSurface = "paper" | "ink";

type AppStickyNavProps = {
  visible: boolean;
  surface?: NavSurface;
  showSectionNumerals?: boolean;
};

const SCROLL_BLUR_PX = 80;

export function AppStickyNav({
  visible,
  surface = "paper",
  showSectionNumerals = false,
}: AppStickyNavProps) {
  const { pathname, hash } = useNavHash();
  const ink = surface === "ink";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_BLUR_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-mobile-nav-open", menuOpen);
    return () => document.body.classList.remove("has-mobile-nav-open");
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={cx(
          "app-sticky-nav",
          ink && "app-sticky-nav--ink",
          scrolled && "app-sticky-nav--scrolled",
          !visible && "app-sticky-nav--inactive",
        )}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!visible}
      >
        <div className="app-sticky-nav__inner is-flex is-justify-between is-align-start has-gap-3">
          <div className="app-sticky-nav__left is-flex is-flex-column has-gap-2">
            {showSectionNumerals ? <SectionNumerals className="app-sticky-nav__numerals" /> : null}
            <Link
              href={ROUTES.home}
              className="app-sticky-nav__wordmark"
              aria-label="Davide Domenghini home"
            >
              <span className="app-sticky-nav__wordmark-prefix is-accent">{NAV_WORDMARK.prefix}</span>
              <span className="app-sticky-nav__wordmark-sep"> {NAV_WORDMARK.separator} </span>
              <span className={ink ? "is-white" : "is-text"}>{NAV_WORDMARK.suffix}</span>
            </Link>
          </div>

          <div className="app-sticky-nav__right">
            <nav className="app-sticky-nav__nav is-flex is-align-center" aria-label="Primary">
              <ul className="app-sticky-nav__nav-list is-flex is-flex-column has-gap-1">
                {PRIMARY_NAV.map((item) => {
                  const active = isNavItemActive(item.href, pathname, hash);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cx(
                          "app-sticky-nav__nav-link",
                          "uppercase",
                          active && "app-sticky-nav__nav-link--active",
                          ink ? "app-sticky-nav__nav-link--ink" : "app-sticky-nav__nav-link--paper",
                        )}
                        data-magnetic
                        aria-current={active ? "page" : undefined}
                      >
                        {active ? <span className="app-sticky-nav__active-dot" aria-hidden /> : null}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <MagneticButton
                href={BOOKING_URL}
                variant={ink ? "ghostOnInk" : "primary"}
                cursorText={HEADER_CTA.cursorText}
                external
                className="app-sticky-nav__book-cta"
              >
                {HEADER_CTA.label}
              </MagneticButton>
            </nav>
            <button
              type="button"
              className="app-sticky-nav__burger"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label={MOBILE_NAV.openLabel}
            />
          </div>
        </div>
      </motion.header>
      <MobileNavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
