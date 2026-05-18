"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { cx } from "@/components/cx";
import { DURATION_HERO, EASE_EDITORIAL, STAGGER_CHILD } from "@/lib/motion";
import styles from "./DisplayText.module.scss";

type DisplayTextProps = {
  as?: "h1" | "h2" | "h3" | "p";
  children: string;
  className?: string;
};

/** Split-line display reveal using framer-motion. */
export function DisplayText({ as: Tag = "h1", children, className }: DisplayTextProps) {
  const reduceMotion = useReducedMotion();
  const lines = children.split("\n").filter(Boolean);

  if (reduceMotion) {
    return <Tag className={cx(styles.root, className)}>{children}</Tag>;
  }

  return (
    <Tag className={cx(styles.root, className)} aria-label={children.replace(/\n/g, " ")}>
      {lines.map((line, i) => (
        <motion.span
          key={`${line}-${i}`}
          className={styles.line}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: DURATION_HERO,
            delay: i * STAGGER_CHILD,
            ease: EASE_EDITORIAL,
          }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}

type DisplayTextBlockProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function DisplayTextBlock({ as: Tag = "div", children, className }: DisplayTextBlockProps) {
  return <Tag className={cx(styles.root, className)}>{children}</Tag>;
}
