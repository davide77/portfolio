"use client";

import { animate, type AnimationPlaybackControls } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLenisRef } from "@/components/motion/lenis-context";
import { ReturnVisitContext } from "@/components/motion/return-context";
import { ROUTES } from "@/constants/routes";
import { EASE_EDITORIAL, PAGE_TRANSITION } from "@/lib/motion";
import {
  TRANSITION_SLUG_ATTR,
  getReturnScroll,
  getTransitionSource,
  recordNavigation,
  setTransitionSource,
  workSlugFromPath,
  type ViewportRect,
} from "@/lib/page-transition";

type PageTransitionProps = {
  children: ReactNode;
};

const MORPH = { duration: PAGE_TRANSITION.morphSeconds, ease: EASE_EDITORIAL };
const CURTAIN = { duration: PAGE_TRANSITION.curtainSeconds, ease: EASE_EDITORIAL };

function inset(top: number, right: number, bottom: number, left: number, radius: number) {
  const px = (n: number) => `${Math.max(0, Math.round(n))}px`;
  return `inset(${px(top)} ${px(right)} ${px(bottom)} ${px(left)} round ${radius}px)`;
}

function isOnScreen(rect: ViewportRect) {
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
}

/**
 * Route transitions with spatial continuity:
 *
 * - Work tile -> case study: the new page grows out of the tile that was
 *   clicked (an ink frame whose window widens from the tile rect to the
 *   viewport).
 * - Case study -> home: an ink layer collapses back into that same tile,
 *   so the page leaves along the path it arrived on.
 * - Anything else: a short curtain, lifting up going forward and dropping
 *   down when returning home from a case study.
 * - Reduced motion: a plain cross-fade, no movement.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenisRef();

  // Is this route a return to home from a case study opened from it?
  // Derived during render (React's "adjust state on prop change"
  // pattern) so the remounted page reads the answer on its very first
  // render, before any reveal has set its hidden starting state.
  const [route, setRoute] = useState({ path: pathname, returning: false });
  if (route.path !== pathname) {
    const fromSlug = workSlugFromPath(route.path);
    setRoute({
      path: pathname,
      returning:
        pathname === ROUTES.home && fromSlug !== null && getReturnScroll(fromSlug) !== null,
    });
  }

  // Remember which work tile was clicked, before the route changes.
  // Capture phase so it runs ahead of next/link's own click handler.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = (e.target as Element | null)?.closest?.(`[${TRANSITION_SLUG_ATTR}]`);
      const slug = el?.getAttribute(TRANSITION_SLUG_ATTR);
      if (!el || !slug) return;
      const { top, left, right, bottom } = el.getBoundingClientRect();
      setTransitionSource(slug, { top, left, right, bottom }, window.scrollY);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Layout effect: runs after the new route mounts but before it paints,
  // so the starting frame of every transition is set without a flash.
  useLayoutEffect(() => {
    const from = recordNavigation(pathname);
    const curtain = curtainRef.current;
    const frame = windowRef.current;
    if (!curtain || !frame) return;

    const running: AnimationPlaybackControls[] = [];
    let cancelled = false;
    const play = (controls: AnimationPlaybackControls) => {
      running.push(controls);
      return controls;
    };
    const endOpening = () => {
      delete frame.dataset.active;
    };

    curtain.style.opacity = "1";
    curtain.style.clipPath = "none";
    curtain.style.transform = "none";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const toSlug = workSlugFromPath(pathname);
    const fromSlug = workSlugFromPath(from);
    const sourceRect = toSlug && from !== null ? getTransitionSource(toSlug) : null;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const radius = PAGE_TRANSITION.tileRadiusPx;
    // Jump (never smooth-scroll) to a position before the first frame.
    const jumpTo = (y: number) => {
      const lenis = lenisRef?.current;
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo({ top: y, behavior: "instant" });
    };

    if (reduceMotion) {
      play(animate(curtain, { opacity: [1, 0] }, { duration: PAGE_TRANSITION.reducedFadeSeconds }));
    } else if (sourceRect) {
      // Open: grow the case study out of the clicked tile. A fixed ink
      // frame with a rounded hole (the window) starts on the tile and
      // widens to the viewport; the new page shows through the hole. All
      // viewport coordinates, so it does not matter when Next.js resets
      // the scroll position of the new route.
      // Start the case study at its top now; Next.js would otherwise
      // reset the scroll a beat later, mid-morph.
      jumpTo(0);
      curtain.style.opacity = "0";
      frame.dataset.active = "true";
      play(
        animate(
          frame,
          {
            top: [sourceRect.top, 0],
            left: [sourceRect.left, 0],
            width: [sourceRect.right - sourceRect.left, vw],
            height: [sourceRect.bottom - sourceRect.top, vh],
            borderRadius: [radius, 0],
          },
          MORPH,
        ),
      ).finished.then(() => {
        if (!cancelled) endOpening();
      });
    } else if (fromSlug && pathname === ROUTES.home) {
      // Close: collapse an ink layer back into the tile it came from. If
      // that tile is not on screen, drop the curtain down instead (the
      // reverse of the forward lift). Restore the home scroll position
      // first, instantly, so the tile is where the visitor left it.
      const returnY = getReturnScroll(fromSlug);
      if (returnY !== null) jumpTo(returnY);
      const tile = document.querySelector(
        `[${TRANSITION_SLUG_ATTR}="${CSS.escape(fromSlug)}"]`,
      );
      const rect = tile?.getBoundingClientRect();
      if (rect && isOnScreen(rect)) {
        const full = inset(0, 0, 0, 0, 0);
        const target = inset(rect.top, vw - rect.right, vh - rect.bottom, rect.left, radius);
        play(animate(curtain, { clipPath: [full, target] }, MORPH)).finished.then(() => {
          if (cancelled) return;
          play(
            animate(curtain, { opacity: [1, 0] }, { duration: PAGE_TRANSITION.settleFadeSeconds }),
          );
        });
      } else {
        play(animate(curtain, { y: ["0%", "100%"] }, CURTAIN));
      }
    } else {
      play(animate(curtain, { y: ["0%", "-100%"] }, CURTAIN));
    }

    return () => {
      cancelled = true;
      running.forEach((controls) => controls.stop());
      endOpening();
    };
  }, [pathname, lenisRef]);

  return (
    <>
      <ReturnVisitContext.Provider value={route.returning}>
        <div key={pathname} className="page-transition__content">
          {children}
        </div>
      </ReturnVisitContext.Provider>
      <div ref={curtainRef} className="page-transition__curtain" aria-hidden />
      <div ref={windowRef} className="page-transition__window" aria-hidden />
    </>
  );
}
