"use client";

import { useEffect, useState } from "react";

type UseVisibilityOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

/** IntersectionObserver hook; returns whether the target is intersecting. */
export function useVisibility(
  ref: React.RefObject<Element | null>,
  { root = null, rootMargin = "0px", threshold = 0.01 }: UseVisibilityOptions = {},
) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        setVisible(Boolean(entries[0]?.isIntersecting));
      },
      { root, rootMargin, threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, root, rootMargin, threshold]);

  return visible;
}
