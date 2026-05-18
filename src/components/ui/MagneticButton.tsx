"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/components/cx";

type Variant = "primary" | "ghost" | "ghostOnInk";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  cursorText?: string;
  className?: string;
  external?: boolean;
};

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

/** CTA with magnetic cursor API. */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  cursorText,
  className,
  external,
}: MagneticButtonProps) {
  const cls = cx(
    "button",
    `button--${variant}`,
    "magnetic-button",
    className,
  );
  const data = {
    "data-magnetic": true,
    "data-cursor-text": cursorText,
  };

  if (external || isExternal(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...data}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...data}>
      {children}
    </Link>
  );
}
