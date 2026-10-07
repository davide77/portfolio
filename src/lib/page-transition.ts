/**
 * In-memory record of client-side navigation, shared by PageTransition
 * (which route did we come from, which tile was clicked) and the case
 * study "Back to home" button (is there an in-site page to go back to).
 *
 * Module state survives client navigations but resets on a full reload,
 * which is exactly the boundary we want: after a reload there is no
 * in-app history we can trust.
 */
import { ROUTES } from "@/constants/routes";
import { PAGE_TRANSITION } from "@/lib/motion";

export type ViewportRect = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

type TransitionSource = {
  slug: string;
  rect: ViewportRect;
  at: number;
};

type ReturnPoint = {
  slug: string;
  scrollY: number;
};

/** Attribute that marks a work tile as the origin of a case study open. */
export const TRANSITION_SLUG_ATTR = "data-transition-slug";

let currentPath: string | null = null;
let previousPath: string | null = null;
let source: TransitionSource | null = null;
let returnPoint: ReturnPoint | null = null;

/**
 * Record that `pathname` is now on screen and return the route it
 * replaced (null on first load). Idempotent for the same pathname, so
 * StrictMode's double-invoked effects do not erase the previous route.
 */
export function recordNavigation(pathname: string): string | null {
  if (pathname !== currentPath) {
    previousPath = currentPath;
    currentPath = pathname;
  }
  return previousPath;
}

/** The in-site route the visitor was on before this one, if any. */
export function getPreviousPath(): string | null {
  return previousPath;
}

/**
 * Record the tile that was clicked and where the page was scrolled to, so
 * the open can grow from the tile and the close can land back on it.
 */
export function setTransitionSource(slug: string, rect: ViewportRect, scrollY: number) {
  source = { slug, rect, at: performance.now() };
  returnPoint = { slug, scrollY };
}

/**
 * Scroll position to restore when closing case study `slug`. The browser
 * restores scroll on Back only after the home page has grown tall enough
 * (and smooth scroll then animates the jump), which is too late to find
 * the tile for the close transition, so we restore it ourselves.
 */
export function getReturnScroll(slug: string): number | null {
  return returnPoint && returnPoint.slug === slug ? returnPoint.scrollY : null;
}

/**
 * The captured tile rect if it belongs to `slug` and is fresh. Not cleared
 * on read, so StrictMode's second effect pass still finds it; the age
 * check retires it instead.
 */
export function getTransitionSource(slug: string): ViewportRect | null {
  const s = source;
  if (!s || s.slug !== slug) return null;
  if (performance.now() - s.at > PAGE_TRANSITION.sourceMaxAgeMs) return null;
  return s.rect;
}

const WORK_PREFIX = ROUTES.work("");

/** `/work/<slug>` -> `<slug>`, anything else -> null. */
export function workSlugFromPath(path: string | null): string | null {
  if (!path || !path.startsWith(WORK_PREFIX)) return null;
  const slug = path.slice(WORK_PREFIX.length).replace(/\/$/, "");
  return slug || null;
}
