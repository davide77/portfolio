"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/constants/routes";

export function useNavHash() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      queueMicrotask(() => {
        setHash(typeof window !== "undefined" ? window.location.hash : "");
      });
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  return { pathname, hash };
}

// All nav items are home-page anchors now (e.g. "/#work"). An item is
// active when we are on the home page and the current hash matches it.
export function isNavItemActive(href: string, pathname: string, hash: string) {
  if (pathname !== ROUTES.home) {
    return false;
  }
  const target = href.includes("#") ? `#${href.split("#")[1]}` : "";
  return target !== "" && hash === target;
}
