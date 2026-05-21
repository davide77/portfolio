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
  // The home page's ClosingCtaSection carries its own footer rule, so
  // home skips the global SiteFooter. Every other route (including /lab,
  // which per the Figma source of truth has no closer band) gets it.
  const showSiteFooter = !isHome;

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
