"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cx } from "@/components/cx";

type RevealImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/**
 * Scroll-linked image reveal. The frame fades and scales up as it
 * enters the viewport and gently fades, sinks, and scales back down as
 * it leaves - so the motion is reversible on scroll-up rather than a
 * one-shot wipe. Progress is spring-smoothed to feel fluid instead of
 * mechanical. Honours reduced-motion (renders static).
 */
export function RevealImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
}: RevealImageProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth the raw progress so the fade + scale read as one fluid glide.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // The hero (priority) image sits above the fold, so on load its scroll
  // progress is already partway up the enter ramp - fading it in there
  // would leave it half-visible on arrival. Priority images therefore
  // start fully resolved and only animate on the way out. Everything
  // below the fold gets the full enter + exit pass.
  const enterHold = priority ? 0 : 0.32;
  const opacity = useTransform(progress, [0, enterHold, 0.72, 1], [priority ? 1 : 0, 1, 1, 0]);
  const scale = useTransform(progress, [0, enterHold, 0.72, 1], [priority ? 1 : 1.06, 1, 1, 0.98]);
  const y = useTransform(progress, [0, enterHold, 0.72, 1], [priority ? 0 : 48, 0, 0, -32]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={cx("reveal-image__frame", className)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={"reveal-image__img"}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cx("reveal-image__frame", className)}
      style={{ opacity, scale, y }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={"reveal-image__img"}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
    </motion.div>
  );
}
