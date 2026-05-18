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

export function isNavItemActive(href: string, pathname: string, hash: string) {
  if (href === ROUTES.hash.work) {
    return pathname.startsWith("/work") || (pathname === "/" && hash === "#work");
  }
  if (href === ROUTES.archive) {
    return pathname === "/archive";
  }
  if (href === ROUTES.about) {
    return pathname === "/about";
  }
  if (href === ROUTES.contact) {
    return pathname === "/contact";
  }
  return false;
}
