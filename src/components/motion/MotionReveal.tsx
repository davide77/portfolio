"use client";

import { type HTMLAttributes, type ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { EASE_EDITORIAL } from "@/lib/motion";

type MotionRevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode;
  /** Vertical lift distance in px before settle. Default 24. */
  lift?: number;
  /** Seconds to wait before the reveal kicks in. Default 0. */
  delay?: number;
  /** Tweak the entry distance / duration for hero copy. Default 0.7. */
  duration?: number;
  /** Re-trigger every time the block enters the viewport. Default false. */
  repeat?: boolean;
  /** Margin passed to whileInView viewport. Default "-12% 0px". */
  margin?: `${number}% 0px` | `${number}px 0px`;
};

/**
 * Scroll-reveal wrapper. Children fade up from `lift` px when the block
 * scrolls into view. Honours reduced-motion (renders static).
 */
export function MotionReveal({
  lift = 24,
  delay = 0,
  duration = 0.7,
  repeat = false,
  margin = "-12% 0px",
  children,
  ...rest
}: MotionRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div {...(rest as unknown as HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: lift }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: !repeat, margin }}
      transition={{ duration, ease: EASE_EDITORIAL, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
