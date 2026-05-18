"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { LOADER_STORAGE_KEY } from "@/constants/config";
import { SITE } from "@/constants/site";
import { cx } from "@/components/cx";
import { DURATION_CURTAIN, EASE_EDITORIAL } from "@/lib/motion";

type LoaderProps = {
  onComplete: () => void;
};

export function Loader({ onComplete }: LoaderProps) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit">("loading");
  const done = useRef(false);

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

  useEffect(() => {
    if (reduceMotion) {
      finish();
      return;
    }

    let value = 0;
    const tick = window.setInterval(() => {
      value = Math.min(100, value + Math.floor(Math.random() * 12) + 4);
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(tick);
        window.setTimeout(() => setPhase("exit"), 200);
        window.setTimeout(finish, DURATION_CURTAIN * 1000 + 100);
      }
    }, 80);

    return () => window.clearInterval(tick);
  }, [reduceMotion, finish]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className={cx("loader__overlay", "bg-black is-flex is-flex-column is-align-center is-justify-center")}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
      role="presentation"
    >
      <motion.h1
        className={cx("loader__name", "is-cream has-m-0")}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
      >
        {SITE.name}
      </motion.h1>
      <p className={cx("loader__counter", "text-sm has-font-medium is-cream tabular-nums")} aria-live="polite">
        {String(progress).padStart(2, "0")}
      </p>
      <motion.div
        className={"loader__curtain"}
        initial={{ y: "100%" }}
        animate={phase === "exit" ? { y: "-100%" } : { y: "100%" }}
        transition={{ duration: DURATION_CURTAIN, ease: EASE_EDITORIAL }}
        aria-hidden
      />
    </motion.div>
  );
}
