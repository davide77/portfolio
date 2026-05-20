"use client";

import { useEffect, useRef, useState } from "react";
import { EXPERIMENTS } from "@/constants/content/experiments";
import { cx } from "@/components/cx";

export function LabGrid() {
  return (
    <div className={"lab-grid"}>
      <ul className={"lab-grid__grid"}>
        {EXPERIMENTS.map((exp) => (
          <li key={exp.id}>
            <LabTile experiment={exp} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LabTile({ experiment }: { experiment: (typeof EXPERIMENTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article className={"lab-grid__tile"} ref={ref}>
      <div
        className={cx("lab-grid__canvas", `canvas--${experiment.id}`, active && "lab-grid__canvas--active")}
        aria-hidden
      />
      <h2 className="text-lg has-font-semibold has-mt-3">{experiment.title}</h2>
      <p className="text-sm is-stone">{experiment.caption}</p>
      <p className="has-mt-2 text-xs is-stone">{experiment.attribution}</p>
    </article>
  );
}
