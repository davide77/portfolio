"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { EASE_EDITORIAL } from "@/lib/motion";
import Link from "next/link";
import { cx } from "@/components/cx";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  HEADER_CTA,
  MOBILE_NAV,
  PRIMARY_NAV,
} from "@/constants/nav";
import { isNavItemActive, useNavHash } from "@/components/nav/useNavHash";

type MobileNavMenuProps = {
  open: boolean;
  onClose: () => void;
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 24 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.45, ease: EASE_EDITORIAL },
  }),
};

export function MobileNavMenu({ open, onClose }: MobileNavMenuProps) {
  const { pathname, hash } = useNavHash();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="mobile-nav-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="mobile-nav-menu__backdrop" onClick={onClose} aria-hidden />
          <nav className="mobile-nav-menu__panel" aria-label="Mobile">
            <button
              type="button"
              className="mobile-nav-menu__close text-sm"
              onClick={onClose}
              aria-label={MOBILE_NAV.closeLabel}
            >
              {MOBILE_NAV.closeLabel}
            </button>
            <ul className="mobile-nav-menu__list">
              {PRIMARY_NAV.map((item, i) => {
                const active = isNavItemActive(item.href, pathname, hash);
                return (
                  <motion.li
                    key={item.href}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
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
            <MagneticButton
              href={HEADER_CTA.href}
              variant="primary"
              cursorText={HEADER_CTA.cursorText}
              external
              className="mobile-nav-menu__cta"
            >
              {HEADER_CTA.label}
            </MagneticButton>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
