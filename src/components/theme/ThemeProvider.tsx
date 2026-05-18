"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type SiteTheme = "paper" | "ink";

const STORAGE_KEY = "dd-site-theme";

type ThemeContextValue = {
  theme: SiteTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<SiteTheme>("paper");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as SiteTheme | null;
      if (stored === "paper" || stored === "ink") {
        setTheme(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "paper" ? "ink" : "paper"));
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
