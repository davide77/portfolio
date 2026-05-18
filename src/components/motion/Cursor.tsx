"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/components/cx";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [magnetic, setMagnetic] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const tick = () => {
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(tick);
    };
    const frame = requestAnimationFrame(tick);

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-magnetic]");
      if (!el) {
        setMagnetic(false);
        setLabel("");
        return;
      }
      setMagnetic(true);
      setLabel(el.dataset.cursorText ?? "");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className={"cursor__dot"} aria-hidden />
      <div ref={ringRef} className={cx("cursor__ring", magnetic && "cursor__ring--magnetic")} aria-hidden>
        {label ? <span className={"cursor__ring-label"}>{label}</span> : null}
      </div>
    </>
  );
}
