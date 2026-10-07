"use client";

import { type ReactNode, useCallback, useState, useSyncExternalStore } from "react";
import { IntroContext } from "@/components/motion/intro-context";
import { Loader } from "@/components/motion/Loader";
import { PageTransition } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LOADER_STORAGE_KEY } from "@/constants/config";

type ProvidersProps = {
  children: ReactNode;
};

// "Has the intro already played this tab session?" lives in
// sessionStorage, an external store. Read it with useSyncExternalStore:
// null on the server (unknown, so no loader is rendered yet), the real
// answer on the client. Blocked storage counts as seen, so the loader
// never traps a visitor it cannot remember.
const noSubscribe = () => () => {};

function readIntroSeen(): boolean {
  try {
    return sessionStorage.getItem(LOADER_STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

export function Providers({ children }: ProvidersProps) {
  const introSeen = useSyncExternalStore(noSubscribe, readIntroSeen, () => null);
  const [finished, setFinished] = useState(false);
  const checked = introSeen !== null;
  const loaderDone = introSeen === true || finished;

  const onLoaderComplete = useCallback(() => setFinished(true), []);

  return (
    <ThemeProvider>
      <IntroContext.Provider value={loaderDone}>
        <SmoothScroll>
          {!loaderDone && checked ? <Loader onComplete={onLoaderComplete} /> : null}
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </IntroContext.Provider>
    </ThemeProvider>
  );
}
