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
  const isLab = pathname === "/lab";
  // Every route renders on the same ink stack now, so the nav is always
  // ink. Section numerals stay the home section index only.
  // ClosingCtaSection carries its own footer rule + contact metadata, so
  // routes that render it (home, /lab) skip the global SiteFooter.
  const showSiteFooter = !isHome && !isLab;

  return (
    <>
      <AppStickyNav
        visible
        surface="ink"
        showSectionNumerals={isHome}
      />
      {children}
      {showSiteFooter && <SiteFooter />}
      <FooterWash />
    </>
  );
}
