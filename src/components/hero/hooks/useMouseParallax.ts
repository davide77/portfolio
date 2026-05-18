"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";

const IDLE_MS = 1500;
const IDLE_SPEED = 0.04;
const LERP = 0.02;
const ROT_Y = 0.1;
const ROT_X = 0.06;

type UseMouseParallaxOptions = {
  enabled?: boolean;
  onImpulse?: () => void;
};

/** Gentle cursor parallax + idle Y spin on a Three.js group. */
export function useMouseParallax(
  groupRef: React.RefObject<Group | null>,
  { enabled = true, onImpulse }: UseMouseParallaxOptions = {},
) {
  const target = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const lastMove = useRef(performance.now());
  const idle = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mouse.current.x = (e.clientX / w) * 2 - 1;
      mouse.current.y = -(e.clientY / h) * 2 + 1;
      lastMove.current = performance.now();
      idle.current = false;
    };

    const onClick = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      onImpulse?.();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, [enabled, onImpulse]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || !enabled) return;

    const now = performance.now();
    if (now - lastMove.current > IDLE_MS) {
      idle.current = true;
    }

    if (idle.current) {
      group.rotation.y += IDLE_SPEED * delta;
    } else {
      target.current.x = mouse.current.y * ROT_X;
      target.current.y = mouse.current.x * ROT_Y;
    }

    group.rotation.x += (target.current.x - group.rotation.x) * LERP;
    group.rotation.y += (target.current.y - group.rotation.y) * LERP;
  });
}
