"use client";

import { useReducedMotion } from "framer-motion";
import { createContext, useContext } from "react";

/**
 * True while the home page on screen is one the visitor is *returning*
 * to from a case study they opened from it. Closing a case study should
 * feel like closing an overlay: the page underneath is already there, so
 * its entrance animations must not replay.
 */
export const ReturnVisitContext = createContext(false);

/**
 * Whether entrance animations (scroll reveals, word reveals, wipes)
 * should be skipped and the content rendered in its final state: when
 * the visitor prefers reduced motion, or is returning to this page.
 * Only for entrances; scroll-linked and looping motion is unaffected.
 */
export function useSkipEntrance(): boolean {
  const reduce = useReducedMotion();
  const returning = useContext(ReturnVisitContext);
  return Boolean(reduce) || returning;
}
