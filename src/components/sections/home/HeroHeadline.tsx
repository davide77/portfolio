"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cx } from "@/components/cx";
import { HERO_DISPLAY } from "@/constants/content/hero-section";
import { STAGGER_CHILD } from "@/lib/motion";

const WORD_DELAY_MS = 60;

type HeroHeadlineProps = {
  className?: string;
  ready?: boolean;
};

export function HeroHeadline({ className, ready = true }: HeroHeadlineProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <h1 id="hero-heading" className={cx("hero-section__headline", className)}>
        {HERO_DISPLAY.words.join(" ")}
      </h1>
    );
  }

  return (
    <h1 id="hero-heading" className={cx("hero-section__headline", className)}>
      {HERO_DISPLAY.words.map((word, i) => (
        <motion.span
          key={word}
          className={cx(
            "hero-section__word",
            word === HERO_DISPLAY.emphasisWord && "hero-section__word--emphasis",
          )}
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{
            duration: 0.75,
            delay: ready ? (i * WORD_DELAY_MS) / 1000 + STAGGER_CHILD : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {i < HERO_DISPLAY.words.length - 1 && (
            <span className="hero-section__word-space"> </span>
          )}
        </motion.span>
      ))}
    </h1>
  );
}
