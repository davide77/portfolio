"use client";

import { useEffect, useState } from "react";
import { cx } from "@/components/cx";
import {
  HOME_SECTION_ACTIVATION,
  HOME_SECTION_INDEX,
} from "@/constants/content/hero-section";

const SECTION_IDS = HOME_SECTION_INDEX.sections.map((s) => s.id);

function sectionDocumentTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

function resolveActiveSectionIndex(elements: HTMLElement[]): number {
  if (window.scrollY <= HOME_SECTION_ACTIVATION.topScrollMaxPx) {
    return 0;
  }

  const line =
    window.scrollY + window.innerHeight * HOME_SECTION_ACTIVATION.viewportFocusRatio;
  let active = 0;

  for (let i = 0; i < elements.length; i++) {
    if (sectionDocumentTop(elements[i]) <= line) {
      active = i;
    }
  }

  return active;
}

/** Ambient section counter (e.g. 01 / 07) driven by scroll. */
export function SectionNumerals({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!elements.length) return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setActive(resolveActiveSectionIndex(elements));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const current =
    HOME_SECTION_INDEX.sections[active]?.label ?? HOME_SECTION_INDEX.sections[0].label;
  const total = String(HOME_SECTION_INDEX.total).padStart(2, "0");

  return (
    <p className={cx("section-numerals", "text-xs", className)} aria-hidden>
      {current} / {total}
    </p>
  );
}
