"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { DURATION_CURTAIN, EASE_EDITORIAL } from "@/lib/motion";
import styles from "./PageTransition.module.scss";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div key={pathname} className={styles.content}>
        {children}
      </motion.div>
      <motion.div
        key={`curtain-${pathname}`}
        className={styles.curtain}
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: DURATION_CURTAIN, ease: EASE_EDITORIAL }}
        aria-hidden
      />
    </>
  );
}
