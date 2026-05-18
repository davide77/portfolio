"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { AppStickyNav } from "@/components/nav/AppStickyNav";
import { SiteFooter } from "@/components/SiteFooter";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const inkNav = pathname === "/";

  return (
    <>
      <AppStickyNav visible surface={inkNav ? "ink" : "paper"} />
      {children}
      <SiteFooter />
    </>
  );
}
