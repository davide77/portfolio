"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cx } from "../cx";

type SectionDividerProps = {
  className?: string;
};

/**
 * Decorative hairline between home sections. Starts as a point in the
 * centre and expands to full width when it scrolls into view. Honours
 * reduced-motion by rendering the line at full width with no animation.
 */
export function SectionDivider({ className }: SectionDividerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cx("section-divider", className)} aria-hidden="true" />;
  }

  return (
    <motion.div
      className={cx("section-divider", className)}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-48px 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    />
  );
}
