"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/components/cx";
import styles from "./HorizontalScrollSection.module.scss";

type HorizontalScrollSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/** Pin section and map vertical scroll to horizontal movement on desktop (framer-motion). */
export function HorizontalScrollSection({ children, className, id }: HorizontalScrollSectionProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [pinHeight, setPinHeight] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const measure = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      if (!trackRef.current || !desktop) {
        setScrollRange(0);
        setPinHeight(null);
        return;
      }
      const range = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      setScrollRange(range);
      setPinHeight(range + window.innerHeight);
    };

    measure();
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const usePinnedScroll = !reduceMotion && isDesktop && scrollRange > 0 && pinHeight !== null;

  if (!usePinnedScroll) {
    return (
      <section ref={containerRef} id={id} className={cx(styles.root, className)}>
        <div ref={trackRef} className={styles.track}>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={id}
      className={cx(styles.root, styles.rootPinned, className)}
      style={{ height: pinHeight }}
    >
      <div className={styles.sticky}>
        <motion.div ref={trackRef} className={styles.track} style={{ x }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
