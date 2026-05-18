"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { cx } from "@/components/cx";
import { SCROLL_BADGE } from "@/constants/content/hero-section";

const R = 36;

export function ScrollBadge() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight || 1;
      const t = Math.min(1, window.scrollY / (vh * SCROLL_BADGE.fadeScrollVh));
      setOpacity(1 - t);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className={cx("scroll-badge")}
      style={{ "--scroll-badge-opacity": opacity } as CSSProperties}
      aria-hidden
    >
      <svg className="scroll-badge__ring" viewBox="0 0 96 96" width={96} height={96}>
        <defs>
          <path
            id="scroll-badge-path"
            d={`M 48,48 m -${R},0 a ${R},${R} 0 1,1 ${R * 2},0 a ${R},${R} 0 1,1 -${R * 2},0`}
          />
        </defs>
        <text className="scroll-badge__text" fontSize={7} letterSpacing="0.22em">
          <textPath href="#scroll-badge-path" startOffset="0%">
            {SCROLL_BADGE.label}
          </textPath>
        </text>
      </svg>
      <span className="scroll-badge__chevron" />
    </div>
  );
}

