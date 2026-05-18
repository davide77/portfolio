"use client";

import { useReducedMotion } from "@/components/hero/hooks/useReducedMotion";
import { cx } from "@/components/cx";

/** Decorative fixed dot; hidden on mobile and when motion is reduced. */
export function FloatingAccentDot() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return null;
  }

  return <div className={cx("floating-accent-dot")} aria-hidden />;
}
