"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cx } from "@/components/cx";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { EASE_EDITORIAL, STAGGER_CHILD } from "@/lib/motion";

type SectionHeadSurface = "ink" | "paper";
type SectionHeadSize = "default" | "display" | "mega" | "hero";

type SectionHeadProps = {
  eyebrow: string;
  headline: string;
  intro?: string;
  surface?: SectionHeadSurface;
  size?: SectionHeadSize;
  /** Italic + orb-flare colour for a single emphasis word inside the headline. */
  emphasisWord?: string;
  /** Override the rendered heading id (defaults to none, parent must set aria-labelledby). */
  headingId?: string;
  /** Override the heading tag. */
  as?: "h1" | "h2";
  className?: string;
  /** Disable the scroll-in stagger animation (e.g. for hero where motion lives elsewhere). */
  disableMotion?: boolean;
};

function renderHeadline(headline: string, emphasisWord?: string) {
  if (!emphasisWord) return headline;
  const idx = headline.indexOf(emphasisWord);
  if (idx < 0) return headline;
  const before = headline.slice(0, idx);
  const after = headline.slice(idx + emphasisWord.length);
  return (
    <>
      {before}
      <em className="section-head__emphasis">{emphasisWord}</em>
      {after}
    </>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EDITORIAL } },
};

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE_EDITORIAL } },
};

/**
 * Section head atom (Figma source of truth: ③ Patterns / Section head).
 * Eyebrow + H2 + optional intro. Reused by Stats, Capabilities, About,
 * Closer and Hero sections to keep the typography identical. Reveals on
 * scroll with a staggered editorial cadence (eyebrow slides in from the
 * left, headline + intro fade up behind it).
 */
export function SectionHead({
  eyebrow,
  headline,
  intro,
  surface = "ink",
  size = "default",
  emphasisWord,
  headingId,
  as = "h2",
  className,
  disableMotion = false,
}: SectionHeadProps) {
  const Tag = as;
  const reduce = useReducedMotion();
  const animate = !disableMotion && !reduce;

  const titleClass = cx(
    "section-head__title",
    "section-title",
    size === "display" && "section-title--display",
    size === "mega" && "section-title--mega",
    size === "hero" && "section-title--hero",
  );

  if (!animate) {
    return (
      <div className={cx("section-head", `section-head--${surface}`, className)}>
        <EyebrowLabel surface={surface}>{eyebrow}</EyebrowLabel>
        <Tag id={headingId} className={titleClass}>
          {renderHeadline(headline, emphasisWord)}
        </Tag>
        {intro && <p className="section-head__intro">{intro}</p>}
      </div>
    );
  }

  const MotionHeading = as === "h1" ? motion.h1 : motion.h2;

  return (
    <motion.div
      className={cx("section-head", `section-head--${surface}`, className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ staggerChildren: STAGGER_CHILD }}
    >
      <motion.div variants={eyebrowVariants}>
        <EyebrowLabel surface={surface}>{eyebrow}</EyebrowLabel>
      </motion.div>
      <MotionHeading id={headingId} className={titleClass} variants={itemVariants}>
        {renderHeadline(headline, emphasisWord)}
      </MotionHeading>
      {intro && (
        <motion.p className="section-head__intro" variants={itemVariants}>
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
