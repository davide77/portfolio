"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/components/cx";

type Variant = "primary" | "secondary" | "secondaryInk" | "ghost" | "ghostOnInk";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

/** Styled CTA link with primary/secondary/ghost variants. */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: MagneticButtonProps) {
  const cls = cx(
    "button",
    `button--${variant}`,
    "magnetic-button",
    className,
  );

  if (external || isExternal(href)) {
    return (
      <a
        href={href}
        className={cls}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
