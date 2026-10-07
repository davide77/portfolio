"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/components/cx";
import { SectionNumerals } from "@/components/ui/SectionNumerals";
import { MobileNavMenu, type MenuOrigin } from "@/components/nav/MobileNavMenu";
import { isLabRoute, isNavItemActive, useNavHash } from "@/components/nav/useNavHash";
import { SiteBreadcrumb } from "@/components/nav/SiteBreadcrumb";
import { NAV_AUTOHIDE } from "@/constants/config";
import { MOBILE_NAV, PRIMARY_NAV, resolveNavCenterMeta } from "@/constants/nav";
import { SPRING_UI } from "@/lib/motion";

type NavSurface = "paper" | "ink";

type AppStickyNavProps = {
  visible: boolean;
  surface?: NavSurface;
  showSectionNumerals?: boolean;
};

export function AppStickyNav({
  visible,
  surface = "paper",
  showSectionNumerals = false,
}: AppStickyNavProps) {
  const { pathname, hash } = useNavHash();
  const navCenterMeta = resolveNavCenterMeta(pathname);
  const onLab = isLabRoute(pathname);
  const ink = surface === "ink";
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState<MenuOrigin | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    const rect = burgerRef.current?.getBoundingClientRect();
    setMenuOrigin(
      rect ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height } : null,
    );
    setMenuOpen(true);
  };
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    // `anchorY` is where the current scroll direction started. The bar
    // only changes state once the scroll has travelled the threshold from
    // there, so smooth-scroll tails and trackpad jitter cannot flicker it.
    let anchorY = window.scrollY;
    let lastY = anchorY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= NAV_AUTOHIDE.revealTopPx) {
        setHidden(false);
        anchorY = y;
      } else {
        if (Math.sign(y - lastY) !== Math.sign(lastY - anchorY)) anchorY = lastY;
        const travelled = y - anchorY;
        if (travelled > NAV_AUTOHIDE.directionThresholdPx) setHidden(true);
        else if (travelled < -NAV_AUTOHIDE.directionThresholdPx) setHidden(false);
      }
      lastY = y;
    };
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
          onLab && "app-sticky-nav--lab",
          (!visible || hidden) && "app-sticky-nav--inactive",
        )}
        initial={false}
        animate={{
          opacity: visible && !hidden ? 1 : 0,
          y: visible && !hidden ? 0 : "-100%",
        }}
        // Spring, not a tween: a quick direction change re-targets from the
        // bar's current position and velocity instead of restarting.
        transition={SPRING_UI}
        // When the bar is hidden (scrolled away or not visible) `inert`
        // takes its links out of the tab order and hides them from
        // assistive tech, so focus can never land on an off-screen
        // control. Supersedes aria-hidden + pointer-events:none.
        inert={!visible || hidden}
      >
        <div className="app-sticky-nav__inner">
          <div className="app-sticky-nav__left is-flex is-flex-column has-gap-2">
            {showSectionNumerals ? <SectionNumerals className="app-sticky-nav__numerals" /> : null}
            <SiteBreadcrumb pathname={pathname} surface={surface} />
          </div>

          {navCenterMeta ? (
            <p className="app-sticky-nav__center mono" aria-hidden>
              {navCenterMeta}
            </p>
          ) : null}

          <div className="app-sticky-nav__right">
            <nav className="app-sticky-nav__nav is-flex is-align-center" aria-label="Primary">
              <ul className="app-sticky-nav__nav-list is-flex is-flex-column is-align-end has-gap-1">
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
                        aria-current={active ? "page" : undefined}
                      >
                        {active ? <span className="app-sticky-nav__active-dot" aria-hidden /> : null}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <button
              ref={burgerRef}
              type="button"
              className="app-sticky-nav__burger"
              onClick={openMenu}
              aria-expanded={menuOpen}
              aria-label={MOBILE_NAV.openLabel}
            />
          </div>
        </div>
      </motion.header>
      <MobileNavMenu
        open={menuOpen}
        onClose={closeMenu}
        origin={menuOrigin}
        returnFocusRef={burgerRef}
      />
    </>
  );
}
