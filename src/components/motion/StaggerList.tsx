"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_EDITORIAL, STAGGER_CHILD } from "@/lib/motion";

type ListTag = "ul" | "ol" | "dl" | "div";
type ItemTag = "li" | "div" | "dt" | "dd";

type StaggerListProps = HTMLAttributes<HTMLElement> & {
  as?: ListTag;
  /** Seconds between consecutive child reveals. Default 0.06. */
  stagger?: number;
  /** Margin passed to whileInView viewport. Default "-10% 0px". */
  margin?: `${number}% 0px` | `${number}px 0px`;
  children: ReactNode;
};

type StaggerItemProps = HTMLAttributes<HTMLElement> & {
  as?: ItemTag;
  /** Vertical lift in px before settle. Default 20. */
  lift?: number;
  /** Per-child duration in seconds. Default 0.55. */
  duration?: number;
  children: ReactNode;
};

/**
 * Scroll-reveal container whose `<StaggerItem>` children fade up one
 * after another. Use the matching `<StaggerItem>` for each child.
 * Honours reduced-motion (renders static markup).
 */
export function StaggerList({
  as = "ul",
  stagger = STAGGER_CHILD,
  margin = "-10% 0px",
  children,
  ...rest
}: StaggerListProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag {...(rest as HTMLAttributes<HTMLElement>)}>{children}</Tag>;
  }

  const Tag = motion[as];

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      transition={{ staggerChildren: stagger }}
      {...(rest as unknown as Record<string, unknown>)}
    >
      {children}
    </Tag>
  );
}

/** Item used inside `<StaggerList>`. Animates from y={lift} to y=0 on parent cue. */
export function StaggerItem({
  as = "li",
  lift = 20,
  duration = 0.55,
  children,
  ...rest
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag {...(rest as HTMLAttributes<HTMLElement>)}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: lift },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_EDITORIAL } },
  };

  const Tag = motion[as];

  return (
    <Tag variants={variants} {...(rest as unknown as Record<string, unknown>)}>
      {children}
    </Tag>
  );
}
