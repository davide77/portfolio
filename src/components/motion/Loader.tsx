"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { INTRO, LOADER_STORAGE_KEY } from "@/constants/config";
import { HERO_GRAINIENT_PALETTE } from "@/constants/hero-webgl";
import { SITE } from "@/constants/site";
import { cx } from "@/components/cx";
import { EASE_EDITORIAL } from "@/lib/motion";

type LoaderProps = {
  onComplete: () => void;
};

const MONOGRAM_LETTERS = SITE.monogram.split("");

export function Loader({ onComplete }: LoaderProps) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit">("loading");
  const done = useRef(false);
  const rafRef = useRef(0);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem(LOADER_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    onComplete();
  }, [onComplete]);

  // Time-based progress meter: deterministic, always reaches 100 (the old
  // random-step counter could stall and never trigger the exit).
  useEffect(() => {
    if (reduceMotion) {
      finish();
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / INTRO.loadDurationMs) * 100);
      setProgress(pct);
      if (pct >= 100) {
        window.setTimeout(() => setPhase("exit"), INTRO.dwellAfterFullMs);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, finish]);

  const skip = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setProgress(100);
    setPhase("exit");
  }, []);

  if (reduceMotion) return null;

  const exiting = phase === "exit";
  const rounded = Math.round(progress);

  // Per-instance palette + fill scale, read by the SCSS (allowed exception to
  // the no-inline-style rule: per-instance CSS custom properties).
  const styleVars = {
    "--intro-hi": HERO_GRAINIENT_PALETTE.highlight,
    "--intro-mid": HERO_GRAINIENT_PALETTE.mid,
    "--intro-base": HERO_GRAINIENT_PALETTE.base,
  } as CSSProperties;

  return (
    <motion.div
      className={cx("loader__overlay", "is-flex is-flex-column is-align-center is-justify-center")}
      style={styleVars}
      initial={{ y: 0 }}
      animate={{ y: exiting ? "-100%" : 0 }}
      transition={{ duration: INTRO.exitSeconds, ease: EASE_EDITORIAL }}
      onAnimationComplete={() => {
        if (exiting) finish();
      }}
      role="presentation"
    >
      <motion.div
        className={"loader__grainient"}
        aria-hidden
        animate={{ scale: [1, 1.12], rotate: [-1.5, 1.5] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
      <div className={"loader__grain"} aria-hidden />
      <div className={"loader__vignette"} aria-hidden />

      <motion.div
        className={cx("loader__stage", "is-flex is-flex-column is-align-center text-center has-gap-4 has-px-4")}
        aria-hidden
        animate={{ y: exiting ? -48 : 0, opacity: exiting ? 0 : 1 }}
        transition={{ duration: exiting ? 0.5 : 0.6, ease: EASE_EDITORIAL }}
      >
        <motion.p
          className={cx("loader__kicker", "has-m-0 text-xs has-font-semibold uppercase is-signal")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_EDITORIAL }}
        >
          {SITE.role}
        </motion.p>

        <div className={cx("loader__monogram", "is-flex is-paper has-font-regular")}>
          {MONOGRAM_LETTERS.map((char, i) => (
            <span key={i} className={"loader__letter-mask"}>
              <motion.span
                className={"loader__letter"}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.18 + i * INTRO.letterStagger, ease: EASE_EDITORIAL }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </div>

        <motion.p
          className={cx("loader__meta", "has-m-0 text-sm has-font-medium is-cream")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE_EDITORIAL }}
        >
          {SITE.name} <span className={"loader__sep"}>/</span> {SITE.location}
        </motion.p>
      </motion.div>

      <motion.div
        className={cx("loader__progress", "is-flex is-align-center is-justify-between has-gap-3")}
        aria-hidden
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
      >
        <span className={"loader__progress-track"}>
          <span
            className={"loader__progress-fill"}
            style={{ "--loader-progress": progress / 100 } as CSSProperties}
          />
        </span>
        <span className={cx("loader__progress-num", "text-xs has-font-medium is-cream")}>
          {String(rounded).padStart(3, "0")}
        </span>
      </motion.div>

      <button
        type="button"
        className={cx("loader__skip", "text-xs has-font-medium uppercase")}
        onClick={skip}
      >
        {INTRO.skipLabel}
      </button>
    </motion.div>
  );
}
