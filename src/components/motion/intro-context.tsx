"use client";

import { createContext, useContext } from "react";

/**
 * True once the intro loader has finished (or was skipped / already seen
 * this session). Lets the hero hold its entrance until it is actually on
 * screen instead of playing it behind the loader.
 */
export const IntroContext = createContext(true);

export function useIntroDone() {
  return useContext(IntroContext);
}
