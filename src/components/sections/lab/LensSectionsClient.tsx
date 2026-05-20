"use client";

import { type CSSProperties } from "react";
import { FloatingLens } from "@/components/lab/monopo/FloatingLens";
import { LENS_SECTIONS } from "@/constants/content/lenses-lab";

export function LensSections() {
  return (
    <ul role="list" className="lens-sections">
      {LENS_SECTIONS.map((section, i) => {
        const position = LENS_POSITIONS[i % LENS_POSITIONS.length];
        return (
          <li
            key={section.word}
            className="lens-sections__item"
            style={
              {
                "--lens-bg": section.background,
              } as CSSProperties
            }
          >
            <div className="lens-sections__stage">
              <p className="text-xs has-font-semibold uppercase is-stone lens-sections__label">
                Section {i + 1}
              </p>
              <p className="text-base leading-relaxed is-paper lens-sections__caption has-mt-4">
                {section.caption}
              </p>
              <FloatingLens
                word={section.word}
                wordColor={section.textColor}
                wordBackground={section.background}
                size={220}
                {...position}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const LENS_POSITIONS = [
  { top: "12%", right: "8%" },
  { top: "30%", left: "10%" },
  { bottom: "12%", right: "12%" },
] as const;
