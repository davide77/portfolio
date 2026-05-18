"use client";

import dynamic from "next/dynamic";
import { HERO, HERO_FOCUS_AREAS, HERO_STATS, HERO_VISUAL } from "@/constants/content/home";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "./ButtonLink";
import { cx } from "./cx";
import styles from "./Hero.module.scss";

const HeroWebGLBackdrop = dynamic(
  () => import("@/components/hero/HeroWebGLBackdrop").then((m) => m.HeroWebGLBackdrop),
  { ssr: false, loading: () => null },
);

const ease = "easeOut" as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const off = reduceMotion ? { opacity: 1, y: 0 } : undefined;
  const from = (y: number) => (reduceMotion ? off : { opacity: 0, y });

  return (
    <motion.section
      className={styles.root}
      aria-labelledby="hero-heading"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease }}
    >
      <div className={styles.oceanBand} aria-hidden />
      {!reduceMotion ? <HeroWebGLBackdrop /> : null}
      <div className={styles.mesh} aria-hidden />
      <div className={styles.gridLines} aria-hidden />

      <div className={cx(styles.shell, "container-atmosphere")}>
        <div className="is-flex is-flex-column has-gap-5">
          <motion.span
            className={cx(styles.badge, "is-inline-flex is-align-center has-px-4 has-py-2 text-xs has-font-semibold uppercase is-cream")}
            initial={from(10)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease }}
          >
            {HERO.badge}
          </motion.span>

          <h1 id="hero-heading" className={cx(styles.headline, "has-m-0 has-font-bold leading-tight")}>
            <motion.span
              className={cx(styles.headlineLine, "is-cream")}
              initial={from(18)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease }}
            >
              {HERO.headlineLine1}
            </motion.span>
            <motion.span
              className={styles.headlineAccent}
              initial={from(18)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16, ease }}
            >
              {HERO.headlineLine2}
            </motion.span>
          </h1>

          <motion.p
            className={cx(styles.subhead, "text-lg leading-relaxed measure-52ch")}
            initial={from(14)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22, ease }}
          >
            {HERO.subhead}
          </motion.p>

          <motion.div
            className="is-flex is-flex-wrap has-gap-3"
            initial={from(12)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease }}
          >
            <motion.span
              className="is-inline-flex"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.18, ease }}
            >
              <ButtonLink href={HERO.primaryCtaHref} variant="primary">
                {HERO.primaryCta}
              </ButtonLink>
            </motion.span>
            <motion.span
              className="is-inline-flex"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.18, ease }}
            >
              <ButtonLink href={HERO.secondaryCtaHref} variant="ghostOnInk">
                {HERO.secondaryCta}
              </ButtonLink>
            </motion.span>
          </motion.div>

          <motion.ul
            className={cx(styles.stats, "is-grid has-gap-3 has-pt-2")}
            aria-label="Career highlights"
            initial={from(12)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.34, ease }}
          >
            {HERO_STATS.map((stat, index) => (
              <motion.li
                key={stat.label}
                className={cx(styles.stat, "has-p-3")}
                initial={from(8)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.38 + index * 0.06, ease }}
              >
                <p className={cx(styles.statValue, "text-2xl has-font-bold is-cream leading-tight")}>{stat.value}</p>
                <p className={cx(styles.statLabel, "text-xs has-font-medium uppercase has-mt-2")}>{stat.label}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.aside
          className={cx(styles.visual, "is-flex is-flex-column is-justify-center")}
          aria-label="Stack and delivery focus"
          initial={from(24)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease }}
        >
          <div className={styles.orb} aria-hidden />
          <div className={styles.preview}>
              <div className={cx(styles.previewChrome, "is-flex is-align-center has-gap-2 has-py-3 has-px-4")} aria-hidden>
              <span className={styles.chromeDot} />
              <span className={styles.chromeDot} />
              <span className={styles.chromeDot} />
            </div>
            <div className="has-p-5">
              <p className={cx(styles.previewTitle, "text-md has-font-semibold is-cream has-mb-1")}>{HERO_VISUAL.title}</p>
              <p className={cx(styles.previewStrap, "text-sm has-mb-5")}>{HERO_VISUAL.strapline}</p>
              <ul className="is-flex is-flex-column has-gap-3">
                {HERO_FOCUS_AREAS.map((item) => (
                  <li key={item} className={cx(styles.previewItem, "text-sm has-pl-3")}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.previewGlow} aria-hidden />
          </div>
        </motion.aside>
      </div>
    </motion.section>
  );
}
