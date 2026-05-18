"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cx } from "./cx";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds (skill: index * 0.1) */
  delay?: number;
  /** Subtle vertical offset in px (skill: 16-24) */
  y?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 16,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cx(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px 0px" }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
