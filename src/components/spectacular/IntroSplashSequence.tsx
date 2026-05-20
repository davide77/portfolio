"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SPECTACULAR } from "@/constants/spectacular";
import { SITE } from "@/constants/site";
import { cx } from "@/components/cx";

type Phase = "in" | "out";

type IntroSplashSequenceProps = {
  onComplete: () => void;
};

export function IntroSplashSequence({ onComplete }: IntroSplashSequenceProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("in");
  const timers = useRef<number[]>([]);
  const done = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const complete = useCallback(
    (immediate: boolean) => {
      if (done.current) return;
      done.current = true;
      clearTimers();
      try {
        sessionStorage.setItem(SPECTACULAR.storageKey, "1");
      } catch {
        /* ignore */
      }
      if (immediate) {
        onComplete();
        return;
      }
      setPhase("out");
      timers.current.push(
        window.setTimeout(() => {
          onComplete();
        }, SPECTACULAR.timingMs.exitFade) as unknown as number,
      );
    },
    [onComplete],
  );

  useEffect(() => {
    if (reduceMotion) {
      queueMicrotask(() => complete(true));
      return;
    }

    const { dwellBeforeExit } = SPECTACULAR.timingMs;

    const id = window.setTimeout(() => {
      complete(false);
    }, dwellBeforeExit);
    timers.current.push(id);

    return () => clearTimers();
  }, [reduceMotion, complete]);

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      className={cx("intro-splash-sequence__overlay", "is-flex is-align-center is-justify-center bg-ink")}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="presentation"
    >
      <div className={"intro-splash-sequence__wash"} aria-hidden />

      <div className={cx("intro-splash-sequence__stage", "is-flex is-flex-column is-align-center has-gap-3 text-center has-px-4")}>
        <motion.p
          className={cx("intro-splash-sequence__kicker", "has-m-0 text-xs has-font-semibold uppercase")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {SITE.role}
        </motion.p>
        <motion.h1
          className={cx("intro-splash-sequence__name", "has-m-0 is-paper")}
          initial={{ opacity: 0, y: 22 }}
          animate={{
            opacity: phase === "out" ? 0 : 1,
            y: phase === "out" ? -8 : 0,
          }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE.name}
        </motion.h1>
        <motion.p
          className={cx("intro-splash-sequence__meta", "has-m-0 text-sm has-font-medium")}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "out" ? 0 : 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          {SITE.location}
        </motion.p>
      </div>

      <div className={"intro-splash-sequence__skip-wrap"}>
        <button type="button" className={cx("intro-splash-sequence__skip", "text-sm has-font-medium has-p-2")} onClick={() => complete(true)}>
          {SPECTACULAR.skipIntroCta}
        </button>
      </div>
    </motion.div>
  );
}
