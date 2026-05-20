"use client";

import { useEffect } from "react";
import { FOOTER_WASH_RAMP_VH } from "@/constants/config";

/**
 * Scroll-linked cream wash. As the viewport nears the bottom of the
 * document, a single 0 -> 1 progress value is written to the
 * `--footer-wash` custom property on <html>. SCSS reads it to fade in a
 * fixed cream veil and color-mix the footer + sticky nav from their dark
 * theme toward ink, so the whole layout washes to cream and the
 * contrast flips in lockstep with scroll. Scrolling back up reverses it.
 *
 * One rAF read + one style write per frame, no React re-render. The
 * loop is frame-synced so it tracks Lenis smooth scrolling exactly.
 * `prefers-reduced-motion` opts out entirely (no veil, calm dark footer).
 */
export function FooterWash() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const root = document.documentElement;
    let frameId = 0;
    let last = -1;

    const tick = () => {
      const ramp = window.innerHeight * FOOTER_WASH_RAMP_VH;
      const distanceToBottom =
        root.scrollHeight - (window.scrollY + window.innerHeight);
      const raw = ramp <= 0 ? 1 : 1 - distanceToBottom / ramp;
      const linear = Math.min(1, Math.max(0, raw));
      // Ease-in (quadratic): the page holds its dark theme through most
      // of the ramp, then flips to cream late and fast. This keeps the
      // grey mid-tone window short instead of a long muddy crossfade.
      const progress = linear * linear;
      // Quantise so we only touch the DOM when the value visibly moves.
      const next = Math.round(progress * 1000) / 1000;
      if (next !== last) {
        last = next;
        root.style.setProperty("--footer-wash", String(next));
      }
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      root.style.removeProperty("--footer-wash");
    };
  }, []);

  return <div className="footer-wash__veil" aria-hidden="true" />;
}
