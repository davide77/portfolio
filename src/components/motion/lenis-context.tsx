"use client";

import { createContext, useContext, type ReactNode, type RefObject } from "react";
import type Lenis from "lenis";

export type LenisRef = RefObject<Lenis | null>;

const LenisContext = createContext<LenisRef | null>(null);

export function LenisProvider({
  lenisRef,
  children,
}: {
  lenisRef: LenisRef;
  children: ReactNode;
}) {
  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

export function useLenisRef() {
  return useContext(LenisContext);
}
