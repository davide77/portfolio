"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type SiteTheme = "paper" | "ink";

const STORAGE_KEY = "dd-site-theme";
const DEFAULT_THEME: SiteTheme = "paper";

type ThemeContextValue = {
  theme: SiteTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// The stored theme is an external store (localStorage), read through
// useSyncExternalStore rather than copied into state from an effect.
// `memoryTheme` keeps toggling working when storage is unavailable.
const listeners = new Set<() => void>();
let memoryTheme: SiteTheme = DEFAULT_THEME;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readTheme(): SiteTheme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "paper" || stored === "ink") return stored;
  } catch {
    /* storage blocked: fall through to memory */
  }
  return memoryTheme;
}

function writeTheme(theme: SiteTheme) {
  memoryTheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  listeners.forEach((notify) => notify());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    writeTheme(readTheme() === "paper" ? "ink" : "paper");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useSiteTheme must be used within ThemeProvider");
  return ctx;
}
