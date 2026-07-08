"use client";

import { useRouter } from "next/navigation";
import { cx } from "@/components/cx";
import { CASE_STUDY } from "@/constants/content/case-study";
import { ROUTES } from "@/constants/routes";

/**
 * Closing / opening CTA on a case study page. A case study is its own
 * route (/work/<slug>), but reads to the visitor like an overlay opened
 * from the home page. So "Back to home" should feel like *closing* it:
 * when the visitor arrived from within the site we go back in history,
 * which restores the home page exactly as they left it (scroll position
 * kept, sections already revealed, no reveal animations replaying).
 *
 * When there is no in-app history to return to (the case study was
 * opened directly, e.g. from a shared link or a new tab) we fall back to
 * a normal push to `/`. The leading arrow signals the "back" direction.
 */
export function BackToHomeButton() {
  const router = useRouter();

  const onClick = () => {
    // Decide back-vs-push at click time (client only). history.length is
    // unreliable (it counts entries from before our site, so it can be > 1
    // even on a cold open and send router.back() off-site). The referrer
    // is the trustworthy signal: a same-origin referrer means the visitor
    // reached this case study from within the site, so going back restores
    // that page as they left it. Otherwise they opened it cold (shared
    // link, new tab, direct URL), so push home instead.
    let cameFromSite = false;
    try {
      cameFromSite =
        !!document.referrer &&
        new URL(document.referrer).origin === window.location.origin;
    } catch {
      cameFromSite = false;
    }

    if (cameFromSite) {
      router.back();
    } else {
      router.push(ROUTES.home);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx("button", "button--primary", "magnetic-button")}
    >
      <span aria-hidden className="button__glyph">
        ←
      </span>
      <span>{CASE_STUDY.backToHomeLabel}</span>
    </button>
  );
}
