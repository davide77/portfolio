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

// Home anchors (/#work) match on / + hash. Route pages (/lab) match by path.
export function isNavItemActive(href: string, pathname: string, hash: string) {
  if (href.startsWith("/") && !href.includes("#")) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  if (pathname !== ROUTES.home) {
    return false;
  }
  const target = href.includes("#") ? `#${href.split("#")[1]}` : "";
  return target !== "" && hash === target;
}

export function isLabRoute(pathname: string): boolean {
  return pathname === ROUTES.lab || pathname.startsWith(`${ROUTES.lab}/`);
}
