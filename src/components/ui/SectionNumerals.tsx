"use client";

import { useEffect, useState } from "react";
import { cx } from "@/components/cx";
import { HOME_SECTION_INDEX } from "@/constants/content/hero-section";

const SECTION_IDS = HOME_SECTION_INDEX.sections.map((s) => s.id);

/** Ambient section counter (e.g. 01 / 06) driven by scroll. */
export function SectionNumerals({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top) return;
        const idx = SECTION_IDS.indexOf(top.target.id as (typeof SECTION_IDS)[number]);
        if (idx >= 0) setActive(idx);
      },
      { root: null, threshold: [0.2, 0.45, 0.6] },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = HOME_SECTION_INDEX.sections[active]?.label ?? HOME_SECTION_INDEX.sections[0].label;
  const total = String(HOME_SECTION_INDEX.total).padStart(2, "0");

  return (
    <p className={cx("section-numerals", "text-xs", className)} aria-hidden>
      {current} / {total}
    </p>
  );
}
