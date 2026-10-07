"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { type CSSProperties, type RefObject, useEffect, useRef } from "react";
import { cx } from "@/components/cx";
import { MOBILE_NAV, PRIMARY_NAV } from "@/constants/nav";
import { isLabRoute, isNavItemActive, useNavHash } from "@/components/nav/useNavHash";
import { EASE_EDITORIAL, MOBILE_MENU_MOTION } from "@/lib/motion";

/** Viewport rect of the burger that opened the menu. */
export type MenuOrigin = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type MobileNavMenuProps = {
  open: boolean;
  onClose: () => void;
  origin: MenuOrigin | null;
  /** Focus goes back here when the menu closes (the burger). */
  returnFocusRef: RefObject<HTMLElement | null>;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const itemVariants: Variants = {
  closed: { opacity: 0, y: 24 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * MOBILE_MENU_MOTION.linkStagger,
      duration: MOBILE_MENU_MOTION.revealSeconds,
      ease: EASE_EDITORIAL,
    },
  }),
};

/**
 * Full-screen mobile menu, built as a modal dialog. It grows out of the
 * burger as a circle and collapses back into it on close, and its close
 * control sits exactly where the burger was, so open and close happen in
 * the same place. Escape closes it, focus is trapped inside while open
 * and handed back to the burger afterwards.
 */
export function MobileNavMenu({ open, onClose, origin, returnFocusRef }: MobileNavMenuProps) {
  const { pathname, hash } = useNavHash();
  const onLab = isLabRoute(pathname);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const returnTo = returnFocusRef.current;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>(".mobile-nav-menu__link")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnTo?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  // Circle centre = burger centre; the open radius reaches the farthest
  // viewport corner. Falls back to the top-right corner without an origin.
  const vw = typeof window === "undefined" ? 0 : window.innerWidth;
  const vh = typeof window === "undefined" ? 0 : window.innerHeight;
  const centreX = origin ? origin.left + origin.width / 2 : vw;
  const centreY = origin ? origin.top + origin.height / 2 : 0;
  const radius = Math.hypot(Math.max(centreX, vw - centreX), Math.max(centreY, vh - centreY));
  const collapsed = `circle(0px at ${centreX}px ${centreY}px)`;
  const expanded = `circle(${radius}px at ${centreX}px ${centreY}px)`;

  const reveal = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { clipPath: collapsed },
        animate: { clipPath: expanded },
        exit: { clipPath: collapsed },
      };

  // Per-instance position for the close control so it lands on the burger
  // (allowed exception: per-instance CSS custom properties read by SCSS).
  const originVars = (
    origin
      ? {
          "--menu-close-top": `${origin.top}px`,
          "--menu-close-left": `${origin.left}px`,
          "--menu-close-size": `${origin.width}px`,
        }
      : {}
  ) as CSSProperties;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          className={cx("mobile-nav-menu", onLab && "mobile-nav-menu--lab")}
          role="dialog"
          aria-modal="true"
          aria-label={MOBILE_NAV.dialogLabel}
          style={originVars}
          {...reveal}
          transition={{ duration: MOBILE_MENU_MOTION.revealSeconds, ease: EASE_EDITORIAL }}
        >
          <button
            type="button"
            className="mobile-nav-menu__close"
            onClick={onClose}
            aria-label={MOBILE_NAV.closeLabel}
          />
          <nav className="mobile-nav-menu__panel" aria-label={MOBILE_NAV.listLabel}>
            <ul className="mobile-nav-menu__list">
              {PRIMARY_NAV.map((item, i) => {
                const active = isNavItemActive(item.href, pathname, hash);
                return (
                  <motion.li
                    key={item.href}
                    custom={i}
                    variants={reduceMotion ? undefined : itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={item.href}
                      className={cx(
                        "mobile-nav-menu__link",
                        "display-text",
                        active && "mobile-nav-menu__link--active",
                      )}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
