"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cx } from "@/components/cx";
import { DURATION_HERO, EASE_EDITORIAL } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right";

type MotionMaskProps = {
  /** Direction the mask sweeps from. Default "up". */
  from?: Direction;
  /** Seconds for the mask to fully open. Default 0.9. */
  duration?: number;
  /** Margin passed to whileInView viewport. Default "-8%". */
  margin?: `${number}%` | `${number}px`;
  className?: string;
  children: ReactNode;
};

const INITIAL: Record<Direction, string> = {
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
};

/**
 * Mask-clip reveal on scroll. Wrap any block (image, card, embed) and
 * the inner contents sweep into view as the mask retracts. Honours
 * reduced-motion (renders static).
 */
export function MotionMask({
  from = "up",
  duration = DURATION_HERO,
  margin = "-8%",
  className,
  children,
}: MotionMaskProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cx(className)}
      initial={{ clipPath: INITIAL[from] }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin }}
      transition={{ duration, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  );
}
