import { BOOKING_URL } from "./config";
import { ROUTES } from "./routes";
import { SITE } from "./site";

export const PRIMARY_NAV = [
  { label: "Work", href: ROUTES.workIndex },
  { label: "About", href: ROUTES.about },
  { label: "Lab", href: ROUTES.lab },
  { label: "Contact", href: ROUTES.contact },
] as const;

export const HEADER_CTA = {
  label: "Book a call",
  href: BOOKING_URL,
  cursorText: "Book",
} as const;

export const NAV_WORDMARK = {
  prefix: "dd",
  separator: "·",
  suffix: "domenghini",
  homeAriaLabel: `${SITE.name} home`,
} as const;

export const MOBILE_NAV = {
  openLabel: "Open menu",
  closeLabel: "Close menu",
} as const;
