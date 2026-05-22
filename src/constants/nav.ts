import { ROUTES } from "./routes";
import { SITE } from "./site";

export const PRIMARY_NAV = [
  { label: "Work", href: ROUTES.workIndex },
  { label: "About", href: ROUTES.about },
  { label: "Lab", href: ROUTES.lab },
  { label: "Contact", href: ROUTES.contact },
] as const;

export const NAV_WORDMARK = {
  prefix: "dd",
  suffix: "domenghini",
  homeAriaLabel: `${SITE.name} home`,
} as const;

/** Figma nav breadcrumb: lowercase `dd` + name, optional ` / {page}` segment. */
export const SITE_BREADCRUMB = {
  prefix: NAV_WORDMARK.prefix,
  name: NAV_WORDMARK.suffix,
  homeAriaLabel: NAV_WORDMARK.homeAriaLabel,
  navAriaLabel: "Breadcrumb",
  separator: " / ",
} as const;

/** Pathname prefixes that append a crumb after the home link (longest match wins). */
export const BREADCRUMB_ROUTE_PREFIXES = [
  { prefix: ROUTES.lab, label: "lab" },
  { prefix: "/work", label: "work" },
  { prefix: ROUTES.styleguide, label: "styleguide" },
] as const;

export function resolveBreadcrumbLabel(pathname: string): string | null {
  if (pathname === ROUTES.home) return null;
  const match = BREADCRUMB_ROUTE_PREFIXES.find(
    ({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  return match?.label ?? null;
}

export const MOBILE_NAV = {
  openLabel: "Open menu",
  closeLabel: "Close menu",
} as const;

/** Figma nav centre meta (③ Home, ⑤ Lab). Hidden when no match. */
export const NAV_CENTER_META = {
  home: "Senior front-end · London",
  lab: "Experiments + archive",
} as const;

export function resolveNavCenterMeta(pathname: string): string | null {
  if (pathname === ROUTES.home) return NAV_CENTER_META.home;
  if (pathname === ROUTES.lab || pathname.startsWith(`${ROUTES.lab}/`)) {
    return NAV_CENTER_META.lab;
  }
  return null;
}
