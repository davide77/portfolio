"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { cx } from "@/components/cx";
import { DisplayText } from "@/components/ui/DisplayText";
import { EASE_EDITORIAL } from "@/lib/motion";
import styles from "./StickyScene.module.scss";

type StickySceneProps = {
  headline: string;
  paragraphs: readonly string[];
  className?: string;
};

/** Pinned headline with swapping body copy on scroll (framer-motion). */
export function StickyScene({ headline, paragraphs, className }: StickySceneProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const indexProgress = useTransform(scrollYProgress, (v) =>
    Math.min(paragraphs.length - 1, Math.floor(v * paragraphs.length)),
  );

  useMotionValueEvent(indexProgress, "change", (latest) => {
    setActiveIndex(latest);
  });

  if (reduceMotion) {
    return (
      <section ref={sectionRef} className={cx(styles.root, styles.rootReduced, className)}>
        <div className={styles.inner}>
          <DisplayText as="h2">{headline}</DisplayText>
          <div className="is-flex is-flex-column has-gap-4 has-mt-4">
            {paragraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={cx(styles.root, className)}>
      <div className={styles.inner}>
        <div className={styles.headline}>
          <DisplayText as="h2">{headline}</DisplayText>
        </div>
        <div className={styles.body}>
          {paragraphs.map((p, i) => (
            <motion.p
              key={p}
              className={cx(styles.paragraph, "text-lg leading-relaxed")}
              initial={false}
              animate={{
                opacity: i === activeIndex ? 1 : 0,
                y: i === activeIndex ? 0 : 12,
              }}
              transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
              aria-hidden={i !== activeIndex}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
