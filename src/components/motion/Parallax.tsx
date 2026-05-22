"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cx } from "@/components/cx";

type ParallaxProps = {
  /** Total px the block drifts across its viewport pass. Default 48. */
  range?: number;
  /** Drift direction. "up" = block rises faster than scroll. Default "up". */
  direction?: "up" | "down";
  className?: string;
  children: ReactNode;
};

/**
 * Scroll-linked vertical drift. Wrap a media block (portrait, hero
 * art) and it translates by ±`range` px across its viewport pass.
 * Cheap because it relies on `useScroll` with an offset window rather
 * than scroll events. Honours reduced-motion (renders static).
 */
export function Parallax({
  range = 48,
  direction = "up",
  className,
  children,
}: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [from, to] = direction === "up" ? [range, -range] : [-range, range];
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={cx(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}
