"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { type CSSProperties, useRef, useState } from "react";
import { cx } from "@/components/cx";
import { EASE_EDITORIAL } from "@/lib/motion";

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

  // Headline reveal is driven by the section's *entry* progress, not
  // whileInView. The headline sits in a position: sticky column, where
  // framer-motion's viewport intersection is unreliable and can leave it
  // stuck at opacity 0. Scroll progress is deterministic here.
  const { scrollYProgress: entryProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const headlineOpacity = useTransform(entryProgress, [0.05, 0.4], [0, 1]);
  const headlineY = useTransform(entryProgress, [0.05, 0.4], [24, 0]);

  const indexProgress = useTransform(scrollYProgress, (v) =>
    Math.min(paragraphs.length - 1, Math.floor(v * paragraphs.length)),
  );

  useMotionValueEvent(indexProgress, "change", (latest) => {
    setActiveIndex(latest);
  });

  const stepStyle = { "--sticky-scene-steps": paragraphs.length } as CSSProperties;

  if (reduceMotion) {
    return (
      <section ref={sectionRef} className={cx("sticky-scene", "sticky-scene--reduced", className)}>
        <div className={"sticky-scene__inner"}>
          <h2 className="section-title is-paper">{headline}</h2>
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
    <section ref={sectionRef} className={cx("sticky-scene", className)} style={stepStyle}>
      <div className={"sticky-scene__pin"}>
        <div className={"sticky-scene__inner"}>
          <div className={"sticky-scene__headline"}>
            <motion.h2
              className="section-title is-paper"
              style={{ opacity: headlineOpacity, y: headlineY }}
            >
              {headline}
            </motion.h2>
          </div>
          <div className={"sticky-scene__body"}>
            {paragraphs.map((p, i) => (
              <motion.p
                key={p}
                className={cx("sticky-scene__paragraph", "text-lg leading-relaxed")}
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
      </div>
    </section>
  );
}
