import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "./cx";

type Variant = "primary" | "secondary" | "ghost" | "ghostOnInk";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  const cls = cx("button", `button--${variant}`, className);

  if (isExternalHref(href) || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
        target={isExternalHref(href) ? "_blank" : undefined}
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
