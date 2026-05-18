"use client";

import { useEffect, useRef, useState } from "react";
import { EXPERIMENTS } from "@/constants/content/experiments";
import { cx } from "@/components/cx";
import styles from "./LabGrid.module.scss";

export function LabGrid() {
  return (
    <ul className={styles.grid}>
      {EXPERIMENTS.map((exp) => (
        <li key={exp.id}>
          <LabTile experiment={exp} />
        </li>
      ))}
    </ul>
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
    <article className={styles.tile} ref={ref}>
      <div
        className={cx(styles.canvas, styles[`canvas--${experiment.id}`], active && styles.canvasActive)}
        aria-hidden
      />
      <h2 className="text-lg has-font-semibold has-mt-3">{experiment.title}</h2>
      <p className="text-sm is-text-muted">{experiment.caption}</p>
      <p className={styles.attr}>{experiment.attribution}</p>
    </article>
  );
}
