"use client";

import { useRouter } from "next/navigation";
import { cx } from "@/components/cx";
import { CASE_STUDY } from "@/constants/content/case-study";
import { ROUTES } from "@/constants/routes";
import { getPreviousPath } from "@/lib/page-transition";

/**
 * Closing / opening CTA on a case study page. A case study is its own
 * route (/work/<slug>), but reads to the visitor like an overlay opened
 * from the home page. So "Back to home" should feel like *closing* it:
 * when the visitor got here from the home page within this session we go
 * back in history, which restores home where they left it and lets
 * PageTransition collapse the page back into its tile.
 *
 * Otherwise (opened cold from a shared link, a new tab, a reload, or from
 * another in-site page) we push `/` instead. `document.referrer` is not
 * usable for this: it never changes on client-side navigation, so a
 * visitor who arrived from a search engine kept getting a push.
 */
export function BackToHomeButton() {
  const router = useRouter();

  const onClick = () => {
    if (getPreviousPath() === ROUTES.home) {
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
