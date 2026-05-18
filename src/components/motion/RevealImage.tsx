"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cx } from "@/components/cx";
import { DURATION_HERO, EASE_EDITORIAL } from "@/lib/motion";
import styles from "./RevealImage.module.scss";

type RevealImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/** Mask-clip image reveal on scroll. */
export function RevealImage({ src, alt, width, height, className, priority }: RevealImageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cx(styles.frame, className)}
      initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
      whileInView={reduceMotion ? undefined : { clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: DURATION_HERO, ease: EASE_EDITORIAL }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={styles.img}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
    </motion.div>
  );
}
