"use client";

import { type ReactNode, useCallback, useLayoutEffect, useState } from "react";
import { Cursor } from "@/components/motion/Cursor";
import { Loader } from "@/components/motion/Loader";
import { PageTransition } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LOADER_STORAGE_KEY } from "@/constants/config";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [loaderDone, setLoaderDone] = useState(false);
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(LOADER_STORAGE_KEY) === "1") {
        setLoaderDone(true);
      }
    } catch {
      setLoaderDone(true);
    }
    setChecked(true);
  }, []);

  const onLoaderComplete = useCallback(() => setLoaderDone(true), []);

  return (
    <ThemeProvider>
      <SmoothScroll>
        {!loaderDone && checked ? <Loader onComplete={onLoaderComplete} /> : null}
        <PageTransition>{children}</PageTransition>
        <Cursor />
      </SmoothScroll>
    </ThemeProvider>
  );
}
