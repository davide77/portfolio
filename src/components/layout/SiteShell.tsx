"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { AppStickyNav } from "@/components/nav/AppStickyNav";
import { FooterWash } from "@/components/motion/FooterWash";
import { SiteFooter } from "@/components/SiteFooter";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Every route renders on the same ink stack now, so the nav is always
  // ink. Section numerals stay the home section index only.

  return (
    <>
      <AppStickyNav
        visible
        surface="ink"
        showSectionNumerals={isHome}
      />
      {children}
      {!isHome && <SiteFooter />}
      <FooterWash />
    </>
  );
}
