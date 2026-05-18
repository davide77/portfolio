"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cx } from "@/components/cx";
import { useLenisRef } from "@/components/motion/lenis-context";

type HorizontalScrollSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const DESKTOP_MQ = "(min-width: 768px)";

function readIsDesktop() {
  return typeof window !== "undefined" && window.matchMedia(DESKTOP_MQ).matches;
}

/** Pin section and map vertical scroll to horizontal movement on desktop (framer-motion). */
export function HorizontalScrollSection({ children, className, id }: HorizontalScrollSectionProps) {
  const reduceMotion = useReducedMotion();
  const lenisRef = useLenisRef();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [pinHeight, setPinHeight] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(readIsDesktop);

  useLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const track = trackRef.current;

    const measure = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);

      if (!track || !desktop) {
        setScrollRange(0);
        setPinHeight(null);
        return;
      }

      const range = Math.max(0, track.scrollWidth - window.innerWidth);
      setScrollRange(range);
      setPinHeight(range > 0 ? range + window.innerHeight : null);
      lenisRef?.current?.resize();
    };

    measure();

    let resizeObserver: ResizeObserver | null = null;
    if (track && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        measure();
      });
      resizeObserver.observe(track);
    }

    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    window.addEventListener("load", measure, true);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      window.removeEventListener("load", measure, true);
    };
  }, [children, lenisRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const usePinnedScroll = !reduceMotion && isDesktop && scrollRange > 0 && pinHeight !== null;

  if (!usePinnedScroll) {
    return (
      <section ref={containerRef} id={id} className={cx("horizontal-scroll-section", className)}>
        <motion.div ref={trackRef} className={"horizontal-scroll-section__track"}>
          {children}
        </motion.div>
      </section>
    );
  }

  const pinHeightStyle = {
    "--horizontal-scroll-pin-height": `${pinHeight}px`,
  } as CSSProperties;

  return (
    <section
      ref={containerRef}
      id={id}
      className={cx("horizontal-scroll-section", "horizontal-scroll-section--pinned", className)}
      style={pinHeightStyle}
    >
      <motion.div className={"horizontal-scroll-section__sticky"}>
        <motion.div ref={trackRef} className={"horizontal-scroll-section__track"} style={{ x }}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
