# Liquid-glass section blobs ("monopo-glass") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a recurring liquid-glass decorative motif sitting below the title of every major section on the single-page portfolio, with three selectable behaviours (`follow` / `float` / `static`), driven by one shared WebGL overlay.

**Architecture:** A single `<GlassStage>` (`position: fixed`, full-viewport, transparent, `pointer-events: none`) mounted once in `SiteShell` renders one procedural noise-displaced glass blob per registered anchor. Anchors are invisible left-aligned `<span>` placeholders dropped beneath each section's title; a context provider tracks their viewport rects via rAF-throttled scroll / resize listeners. Blobs sample one shared FBO that paints the monopo grainient palette, so refraction is real and performant without DOM rasterisation.

**Tech Stack:** Next.js 16 App Router (React 19), `three` 0.170, `@react-three/fiber` 9, `@react-three/drei` 10 (`MeshTransmissionMaterial`, `useFBO`), `maath` (`easing.damp3`), token-driven SCSS, Playwright for smoke.

**Spec:** [docs/superpowers/specs/2026-05-19-monopo-glass-section-blobs-design.md](../specs/2026-05-19-monopo-glass-section-blobs-design.md)

**Branch:** `feat/monopo-glass-blobs` (already checked out).

---

## File layout (reference)

Create:

- `src/constants/glass.ts` - typed constants (geometry, material, behaviour, backdrop palette, perf, anchor sizing, section ids, defaults).
- `src/components/glass/useGlassGeometry.ts` - memoised noise-displaced icosahedron.
- `src/components/glass/GlassAnchorContext.tsx` - context, provider, `useGlassAnchors()` hook, rAF-throttled registry.
- `src/components/glass/GlassAnchor.tsx` - invisible left-aligned placeholder; registers itself.
- `src/components/glass/GlassBlob.tsx` - one blob (geometry + `MeshTransmissionMaterial` + per-frame behaviour).
- `src/components/glass/GlassStage.tsx` - the shared `<Canvas>` + backdrop FBO + anchor-to-blob mapping.
- `src/components/glass/glass-projection.ts` - pure helper: project a DOM rect to three.js world coords given camera + viewport.
- `src/styles/components/_glass-stage.scss` - fixed canvas wrapper + anchor utility class.
- `tests/glass.spec.ts` - Playwright smoke.

Modify:

- `package.json` / `package-lock.json` - add `maath`.
- `src/styles/abstracts/_variables.scss` - add `glass-overlay: 50` to `$z-index`.
- `src/styles/components/_index.scss` - register `_glass-stage`.
- `src/components/layout/SiteShell.tsx` - wrap children in `<GlassAnchorProvider>`, mount `<GlassStage />` once.
- `src/components/motion/StickyScene.tsx` - accept optional `glassId` prop; render `<GlassAnchor>` under headline.
- `src/components/sections/home/PositioningSection.tsx` - pass `glassId="positioning"` to `StickyScene`.
- `src/components/sections/home/SelectedWorkSection.tsx` - drop `<GlassAnchor id="selected-work">` under title.
- `src/components/LegacyWorkGallery.tsx` - drop `<GlassAnchor id="legacy-work">` under archive title.
- `src/components/sections/home/CapabilitiesSection.tsx` - drop `<GlassAnchor id="capabilities">` under title.
- `src/components/sections/about/AboutPageContent.tsx` - drop `<GlassAnchor id="about">` under the about `<h2>`.
- `src/components/sections/home/ContactSection.tsx` - drop `<GlassAnchor id="contact-zone">` under its `<h2>` (one anchor covers Contact + ClosingCta zone per spec).
- `src/app/styleguide/page.tsx` - add "Glass blob" compare surface.

---

## Task 1: Add `maath` dependency

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install**

Run:
```bash
npm install maath
```

- [ ] **Step 2: Verify**

Run:
```bash
node -e "require.resolve('maath/easing'); console.log('ok')"
```
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore(deps): add maath for glass-blob easing"
```

---

## Task 2: Z-scale token

**Files:**
- Modify: `src/styles/abstracts/_variables.scss:4-12`

- [ ] **Step 1: Add `glass-overlay: 50` layer**

Replace the `$z-index` map with:

```scss
$z-index: (
  glass-overlay: 50,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  overlay: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
);
```

- [ ] **Step 2: Verify sass compiles**

Run:
```bash
npx sass --version > /dev/null && npm run lint
```
Expected: no SCSS errors; lint passes (lint does not type-check SCSS but ensures TS unchanged).

- [ ] **Step 3: Commit**

```bash
git add src/styles/abstracts/_variables.scss
git commit -m "feat(scss): add glass-overlay z layer (50, below dropdown)"
```

---

## Task 3: `src/constants/glass.ts`

**Files:**
- Create: `src/constants/glass.ts`

- [ ] **Step 1: Write the file**

```ts
import { HERO_GRAINIENT_PALETTE } from "@/constants/hero-webgl";

export type GlassBehavior = "follow" | "float" | "static";

export const GLASS_BLOB = {
  geometry: {
    radius: 0.55,
    detail: 4,
    noiseFrequency: 1.6,
    noiseAmplitude: 0.12,
    seed: 17,
  },
  material: {
    transmission: 1,
    ior: 1.18,
    thickness: 0.9,
    roughness: 0.05,
    chromaticAberration: 0.06,
    anisotropy: 0.02,
    attenuationColor: "#ffffff",
    attenuationDistance: 1.6,
  },
  follow: {
    damping: 0.18,
    clampInset: 0.08,
    idleRotationSpeed: 0.18,
  },
  float: {
    amplitude: 0.06,
    speed: 0.7,
    rotationSpeed: 0.22,
  },
  anchor: {
    minWidthPx: 72,
    minHeightPx: 72,
  },
  performance: {
    maxDevicePixelRatio: 2,
    mobileBreakpointPx: 768,
  },
} as const;

export const GLASS_DEFAULTS = {
  behavior: "follow" as GlassBehavior,
  mobileBehavior: "float" as GlassBehavior,
} as const;

export const GLASS_BACKDROP = {
  highlight: HERO_GRAINIENT_PALETTE.highlight,
  mid: HERO_GRAINIENT_PALETTE.mid,
  base: HERO_GRAINIENT_PALETTE.base,
} as const;

export const GLASS_SECTION_IDS = {
  positioning: "positioning",
  selectedWork: "selected-work",
  legacyWork: "legacy-work",
  capabilities: "capabilities",
  about: "about",
  contact: "contact-zone",
} as const;

export type GlassSectionId = (typeof GLASS_SECTION_IDS)[keyof typeof GLASS_SECTION_IDS];
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/constants/glass.ts
git commit -m "feat(glass): add token-driven glass constants module"
```

---

## Task 4: `useGlassGeometry` hook

**Files:**
- Create: `src/components/glass/useGlassGeometry.ts`

- [ ] **Step 1: Write the file**

```ts
"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { GLASS_BLOB } from "@/constants/glass";

function makeRng(seed: number) {
  let h = seed | 0;
  return () => {
    h = (h * 1664525 + 1013904223) | 0;
    return ((h >>> 0) % 10000) / 10000;
  };
}

/**
 * Procedural noise-displaced icosahedron used as the liquid-glass blob.
 * Tweak via GLASS_BLOB.geometry in src/constants/glass.ts.
 */
export function useGlassGeometry() {
  return useMemo(() => {
    const { radius, detail, noiseFrequency, noiseAmplitude, seed } = GLASS_BLOB.geometry;
    const geom = new THREE.IcosahedronGeometry(radius, detail);
    const pos = geom.attributes.position;
    const rng = makeRng(seed);
    const offsets = Array.from({ length: 6 }, () => ({
      x: rng() * 10 - 5,
      y: rng() * 10 - 5,
      z: rng() * 10 - 5,
    }));
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = v.clone().normalize();
      let s = 0;
      for (const o of offsets) {
        s += Math.sin((n.x + o.x) * noiseFrequency)
           * Math.cos((n.y + o.y) * noiseFrequency)
           * Math.sin((n.z + o.z) * noiseFrequency);
      }
      const d = (s / offsets.length) * noiseAmplitude;
      v.multiplyScalar(1 + d);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);
}
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/glass/useGlassGeometry.ts
git commit -m "feat(glass): add procedural noise-displaced blob geometry hook"
```

---

## Task 5: `GlassAnchorContext` provider + hook

**Files:**
- Create: `src/components/glass/GlassAnchorContext.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { GlassBehavior } from "@/constants/glass";

export type GlassAnchorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GlassAnchorEntry = GlassAnchorRect & {
  behavior?: GlassBehavior;
};

type Registration = {
  id: string;
  el: HTMLElement;
  behavior?: GlassBehavior;
};

type Ctx = {
  register: (reg: Registration) => () => void;
  anchors: ReadonlyMap<string, GlassAnchorEntry>;
};

const GlassAnchorCtx = createContext<Ctx | null>(null);

export function GlassAnchorProvider({ children }: { children: ReactNode }) {
  const regsRef = useRef<Map<string, Registration>>(new Map());
  const [anchors, setAnchors] = useState<Map<string, GlassAnchorEntry>>(new Map());
  const rafRef = useRef<number | null>(null);

  const measureAll = useCallback(() => {
    rafRef.current = null;
    const next = new Map<string, GlassAnchorEntry>();
    regsRef.current.forEach((r, id) => {
      const rect = r.el.getBoundingClientRect();
      next.set(id, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        behavior: r.behavior,
      });
    });
    setAnchors(next);
  }, []);

  const scheduleMeasure = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(measureAll);
  }, [measureAll]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => scheduleMeasure();
    const onResize = () => scheduleMeasure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [scheduleMeasure]);

  const register = useCallback(
    (reg: Registration) => {
      regsRef.current.set(reg.id, reg);
      scheduleMeasure();
      return () => {
        regsRef.current.delete(reg.id);
        scheduleMeasure();
      };
    },
    [scheduleMeasure],
  );

  const value = useMemo<Ctx>(() => ({ register, anchors }), [register, anchors]);
  return <GlassAnchorCtx.Provider value={value}>{children}</GlassAnchorCtx.Provider>;
}

export function useGlassAnchors(): Ctx {
  const ctx = useContext(GlassAnchorCtx);
  if (!ctx) throw new Error("useGlassAnchors must be used inside GlassAnchorProvider");
  return ctx;
}
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/glass/GlassAnchorContext.tsx
git commit -m "feat(glass): add anchor registry context with rAF-throttled measure"
```

---

## Task 6: `GlassAnchor` placeholder component

**Files:**
- Create: `src/components/glass/GlassAnchor.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useGlassAnchors } from "@/components/glass/GlassAnchorContext";
import { GLASS_BLOB, type GlassBehavior } from "@/constants/glass";

type GlassAnchorProps = {
  id: string;
  behavior?: GlassBehavior;
  className?: string;
};

/**
 * Invisible left-aligned placeholder. The shared <GlassStage> reads its
 * viewport rect and projects a glass blob onto it. Renders nothing
 * visible; layout footprint comes from CSS variables so removal does not
 * shift the page.
 */
export function GlassAnchor({ id, behavior, className }: GlassAnchorProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { register } = useGlassAnchors();

  useEffect(() => {
    if (!ref.current) return;
    return register({ id, el: ref.current, behavior });
  }, [id, behavior, register]);

  const cssVars: CSSProperties = {
    "--glass-anchor-w": `${GLASS_BLOB.anchor.minWidthPx}px`,
    "--glass-anchor-h": `${GLASS_BLOB.anchor.minHeightPx}px`,
  } as CSSProperties;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-glass-anchor={id}
      className={`glass-anchor ${className ?? ""}`}
      style={cssVars}
    />
  );
}
```

Note: `style` here only sets per-instance CSS custom properties read by `_glass-stage.scss`, which is the sanctioned inline-style exception in CLAUDE.md.

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/glass/GlassAnchor.tsx
git commit -m "feat(glass): add GlassAnchor placeholder element"
```

---

## Task 7: Projection helper

**Files:**
- Create: `src/components/glass/glass-projection.ts`

- [ ] **Step 1: Write the file**

```ts
import * as THREE from "three";

/**
 * Given an anchor's viewport rect (px), return its world-space (x, y) at
 * the given depth z, in the camera's coordinate space. Assumes a
 * full-viewport canvas anchored to the window.
 */
export function projectRectToWorld(
  rect: { x: number; y: number; width: number; height: number },
  viewport: { width: number; height: number },
  camera: THREE.Camera,
  z: number,
): { x: number; y: number } {
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  // NDC
  const ndcX = (cx / viewport.width) * 2 - 1;
  const ndcY = -((cy / viewport.height) * 2 - 1);
  const ndc = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera);
  const dir = ndc.sub(camera.position).normalize();
  const distance = (z - camera.position.z) / dir.z;
  const world = camera.position.clone().add(dir.multiplyScalar(distance));
  return { x: world.x, y: world.y };
}
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/glass/glass-projection.ts
git commit -m "feat(glass): add DOM-rect-to-world projection helper"
```

---

## Task 8: `GlassBlob` component

**Files:**
- Create: `src/components/glass/GlassBlob.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { easing } from "maath";
import { useGlassGeometry } from "@/components/glass/useGlassGeometry";
import { projectRectToWorld } from "@/components/glass/glass-projection";
import { GLASS_BLOB, type GlassBehavior } from "@/constants/glass";
import type { GlassAnchorEntry } from "@/components/glass/GlassAnchorContext";

type GlassBlobProps = {
  entry: GlassAnchorEntry;
  behavior: GlassBehavior;
  backdrop: THREE.Texture;
  worldZ: number;
};

export function GlassBlob({ entry, behavior, backdrop, worldZ }: GlassBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTimeRef = useRef<number | null>(null);
  const geometry = useGlassGeometry();
  const { size, camera, pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (startTimeRef.current == null) startTimeRef.current = performance.now() / 1000;
    const t = performance.now() / 1000 - startTimeRef.current;

    const target = projectRectToWorld(entry, { width: size.width, height: size.height }, camera, worldZ);

    if (behavior === "static") {
      meshRef.current.position.set(target.x, target.y, worldZ);
      return;
    }

    if (behavior === "float") {
      const dx = Math.sin(t * GLASS_BLOB.float.speed) * GLASS_BLOB.float.amplitude;
      const dy = Math.cos(t * GLASS_BLOB.float.speed * 0.9) * GLASS_BLOB.float.amplitude;
      meshRef.current.position.set(target.x + dx, target.y + dy, worldZ);
      meshRef.current.rotation.y += GLASS_BLOB.float.rotationSpeed * delta;
      meshRef.current.rotation.x += GLASS_BLOB.float.rotationSpeed * 0.5 * delta;
      return;
    }

    // follow
    const ax = (entry.width / size.width) * 0.5 - GLASS_BLOB.follow.clampInset;
    const ay = (entry.height / size.height) * 0.5 - GLASS_BLOB.follow.clampInset;
    const cursorWorld = projectRectToWorld(
      { x: pointer.x * size.width * 0.5 + size.width / 2, y: -pointer.y * size.height * 0.5 + size.height / 2, width: 0, height: 0 },
      { width: size.width, height: size.height },
      camera,
      worldZ,
    );
    const dx = THREE.MathUtils.clamp(cursorWorld.x - target.x, -ax * 4, ax * 4);
    const dy = THREE.MathUtils.clamp(cursorWorld.y - target.y, -ay * 4, ay * 4);
    easing.damp3(
      meshRef.current.position,
      [target.x + dx, target.y + dy, worldZ],
      GLASS_BLOB.follow.damping,
      delta,
    );
    meshRef.current.rotation.y += GLASS_BLOB.follow.idleRotationSpeed * delta;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial
        buffer={backdrop}
        transmission={GLASS_BLOB.material.transmission}
        ior={GLASS_BLOB.material.ior}
        thickness={GLASS_BLOB.material.thickness}
        roughness={GLASS_BLOB.material.roughness}
        chromaticAberration={GLASS_BLOB.material.chromaticAberration}
        anisotropy={GLASS_BLOB.material.anisotropy}
        attenuationColor={GLASS_BLOB.material.attenuationColor}
        attenuationDistance={GLASS_BLOB.material.attenuationDistance}
      />
    </mesh>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean (note: `MeshTransmissionMaterial` is untyped in some drei versions; if a type error surfaces on the `buffer` prop, add `// @ts-expect-error drei typing` directly above the offending JSX prop line and re-run).

- [ ] **Step 3: Commit**

```bash
git add src/components/glass/GlassBlob.tsx
git commit -m "feat(glass): add GlassBlob with follow/float/static behaviours"
```

---

## Task 9: `GlassStage` (shared canvas + backdrop FBO)

**Files:**
- Create: `src/components/glass/GlassStage.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import { useGlassAnchors } from "@/components/glass/GlassAnchorContext";
import { GlassBlob } from "@/components/glass/GlassBlob";
import {
  GLASS_BACKDROP,
  GLASS_BLOB,
  GLASS_DEFAULTS,
  type GlassBehavior,
} from "@/constants/glass";

type GlassStageProps = {
  behavior?: GlassBehavior;
};

const WORLD_Z = 0;
const BACKDROP_Z = -3;

function BackdropScene({ scene }: { scene: THREE.Scene }) {
  const { viewport } = useThree();
  return createPortal(
    <mesh position={[0, 0, BACKDROP_Z]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        args={[
          {
            uniforms: {
              uHighlight: { value: new THREE.Color(GLASS_BACKDROP.highlight) },
              uMid: { value: new THREE.Color(GLASS_BACKDROP.mid) },
              uBase: { value: new THREE.Color(GLASS_BACKDROP.base) },
            },
            vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying vec2 vUv;
              uniform vec3 uHighlight;
              uniform vec3 uMid;
              uniform vec3 uBase;
              void main() {
                float t = vUv.y;
                vec3 a = mix(uBase, uMid, smoothstep(0.0, 0.6, t));
                vec3 c = mix(a, uHighlight, smoothstep(0.55, 1.0, t));
                gl_FragColor = vec4(c, 1.0);
              }
            `,
          },
        ]}
      />
    </mesh>,
    scene,
  );
}

function StageScene({ behaviorDefault }: { behaviorDefault: GlassBehavior }) {
  const { gl, camera } = useThree();
  const backdropScene = useRef(new THREE.Scene()).current;
  const fbo = useFBO();
  const { anchors } = useGlassAnchors();

  useFrame(() => {
    gl.setRenderTarget(fbo);
    gl.render(backdropScene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      <BackdropScene scene={backdropScene} />
      {Array.from(anchors.entries()).map(([id, entry]) => (
        <GlassBlob
          key={id}
          entry={entry}
          behavior={entry.behavior ?? behaviorDefault}
          backdrop={fbo.texture}
          worldZ={WORLD_Z}
        />
      ))}
    </>
  );
}

export function GlassStage({ behavior = GLASS_DEFAULTS.behavior }: GlassStageProps) {
  const [visible, setVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mq = window.matchMedia(`(max-width: ${GLASS_BLOB.performance.mobileBreakpointPx - 1}px)`);
    const onRM = () => setReduceMotion(rmq.matches);
    const onMQ = () => setIsMobile(mq.matches);
    const onVis = () => setVisible(document.visibilityState === "visible");
    onRM(); onMQ(); onVis();
    rmq.addEventListener("change", onRM);
    mq.addEventListener("change", onMQ);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      rmq.removeEventListener("change", onRM);
      mq.removeEventListener("change", onMQ);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const effective: GlassBehavior = reduceMotion
    ? "static"
    : isMobile && behavior === "follow"
      ? GLASS_DEFAULTS.mobileBehavior
      : behavior;

  return (
    <div className="glass-stage" aria-hidden="true">
      <Canvas
        dpr={[1, GLASS_BLOB.performance.maxDevicePixelRatio]}
        frameloop={visible && !reduceMotion ? "always" : "demand"}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Suspense fallback={null}>
          <StageScene behaviorDefault={effective} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/glass/GlassStage.tsx
git commit -m "feat(glass): add shared GlassStage canvas with backdrop FBO"
```

---

## Task 10: SCSS for the stage and anchor

**Files:**
- Create: `src/styles/components/_glass-stage.scss`
- Modify: `src/styles/components/_index.scss`

- [ ] **Step 1: Write `_glass-stage.scss`**

```scss
@use '../abstracts' as *;

.glass-stage {
  position: fixed;
  inset: 0;
  z-index: z(glass-overlay);
  pointer-events: none;

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.glass-anchor {
  display: inline-block;
  min-width: var(--glass-anchor-w);
  min-height: var(--glass-anchor-h);
  pointer-events: none;
}
```

- [ ] **Step 2: Register the partial**

Add to `src/styles/components/_index.scss` (alphabetical-ish slot near other `_g*` / generic partials; just append at the end of the existing list):

```scss
@use '_glass-stage';
```

- [ ] **Step 3: Verify SCSS compiles via build**

Run:
```bash
npm run lint
```
Expected: clean. (Full SCSS errors surface in `npm run build` later.)

- [ ] **Step 4: Commit**

```bash
git add src/styles/components/_glass-stage.scss src/styles/components/_index.scss
git commit -m "feat(scss): register _glass-stage partial"
```

---

## Task 11: Wire provider + stage into `SiteShell`

**Files:**
- Modify: `src/components/layout/SiteShell.tsx`

- [ ] **Step 1: Replace the file content**

```tsx
"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { AppStickyNav } from "@/components/nav/AppStickyNav";
import { FooterWash } from "@/components/motion/FooterWash";
import { SiteFooter } from "@/components/SiteFooter";
import { GlassAnchorProvider } from "@/components/glass/GlassAnchorContext";
import { GlassStage } from "@/components/glass/GlassStage";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <GlassAnchorProvider>
      <AppStickyNav
        visible
        surface="ink"
        showSectionNumerals={isHome}
      />
      {children}
      <SiteFooter />
      <FooterWash />
      <GlassStage />
    </GlassAnchorProvider>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/SiteShell.tsx
git commit -m "feat(glass): mount GlassStage + provider in SiteShell"
```

---

## Task 12: Anchor on Positioning via `StickyScene`

**Files:**
- Modify: `src/components/motion/StickyScene.tsx`
- Modify: `src/components/sections/home/PositioningSection.tsx`

- [ ] **Step 1: Add `glassId` prop to `StickyScene`**

In `src/components/motion/StickyScene.tsx`, update imports:

```tsx
import { GlassAnchor } from "@/components/glass/GlassAnchor";
```

Update the props type:

```tsx
type StickySceneProps = {
  headline: string;
  paragraphs: readonly string[];
  className?: string;
  glassId?: string;
};
```

Update the destructure:

```tsx
export function StickyScene({ headline, paragraphs, className, glassId }: StickySceneProps) {
```

In the reduced-motion branch, place the anchor under `<h2>`:

Replace
```tsx
        <div className={"sticky-scene__inner"}>
          <h2 className="section-title is-cream">{headline}</h2>
```
with
```tsx
        <div className={"sticky-scene__inner"}>
          <h2 className="section-title is-cream">{headline}</h2>
          {glassId ? <GlassAnchor id={glassId} /> : null}
```

In the animated branch, place the anchor directly after the `<motion.h2>`:

Replace
```tsx
          <div className={"sticky-scene__headline"}>
            <motion.h2
              className="section-title is-cream"
              style={{ opacity: headlineOpacity, y: headlineY }}
            >
              {headline}
            </motion.h2>
          </div>
```
with
```tsx
          <div className={"sticky-scene__headline"}>
            <motion.h2
              className="section-title is-cream"
              style={{ opacity: headlineOpacity, y: headlineY }}
            >
              {headline}
            </motion.h2>
            {glassId ? <GlassAnchor id={glassId} /> : null}
          </div>
```

- [ ] **Step 2: Wire `PositioningSection`**

Replace `src/components/sections/home/PositioningSection.tsx` content with:

```tsx
import { StickyScene } from "@/components/motion/StickyScene";
import { POSITIONING } from "@/constants/content/profile";
import { GLASS_SECTION_IDS } from "@/constants/glass";

export function PositioningSection() {
  return (
    <StickyScene
      headline={POSITIONING.headline}
      paragraphs={POSITIONING.paragraphs}
      glassId={GLASS_SECTION_IDS.positioning}
    />
  );
}
```

- [ ] **Step 3: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/StickyScene.tsx src/components/sections/home/PositioningSection.tsx
git commit -m "feat(glass): anchor on positioning section via StickyScene"
```

---

## Task 13: Anchor on SelectedWorkSection

**Files:**
- Modify: `src/components/sections/home/SelectedWorkSection.tsx`

- [ ] **Step 1: Add the anchor**

In imports, add:
```tsx
import { GlassAnchor } from "@/components/glass/GlassAnchor";
import { GLASS_SECTION_IDS } from "@/constants/glass";
```

Inside `<header className="selected-work__header">`, immediately after the `<h2 id="selected-work-title" ...>{title}</h2>`, insert:

```tsx
<GlassAnchor id={GLASS_SECTION_IDS.selectedWork} />
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/SelectedWorkSection.tsx
git commit -m "feat(glass): anchor on selected work section"
```

---

## Task 14: Anchor on LegacyWorkGallery

**Files:**
- Modify: `src/components/LegacyWorkGallery.tsx`

- [ ] **Step 1: Locate the archive heading**

Read [src/components/LegacyWorkGallery.tsx](src/components/LegacyWorkGallery.tsx) and find the archive title element rendered inside `.legacy-work-gallery__inner` (the section's leading `<h2>` or equivalent heading). Insert `<GlassAnchor id={GLASS_SECTION_IDS.legacyWork} />` immediately after it.

If no `<h2>` exists in this file (the archive title may render via `WorkArchiveHero`), modify [src/components/sections/work/WorkArchiveHero.tsx](src/components/sections/work/WorkArchiveHero.tsx) instead, placing the anchor immediately after its top-level heading.

- [ ] **Step 2: Add imports to the file you modified**

```tsx
import { GlassAnchor } from "@/components/glass/GlassAnchor";
import { GLASS_SECTION_IDS } from "@/constants/glass";
```

- [ ] **Step 3: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add -u src/components
git commit -m "feat(glass): anchor on legacy work / archive section"
```

---

## Task 15: Anchor on CapabilitiesSection

**Files:**
- Modify: `src/components/sections/home/CapabilitiesSection.tsx`

- [ ] **Step 1: Add the anchor**

In imports, add:
```tsx
import { GlassAnchor } from "@/components/glass/GlassAnchor";
import { GLASS_SECTION_IDS } from "@/constants/glass";
```

Immediately after the `<h2 id="capabilities-title" ...>{title}</h2>`, insert:

```tsx
<GlassAnchor id={GLASS_SECTION_IDS.capabilities} />
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/CapabilitiesSection.tsx
git commit -m "feat(glass): anchor on capabilities section"
```

---

## Task 16: Anchor on AboutPageContent

**Files:**
- Modify: `src/components/sections/about/AboutPageContent.tsx`

- [ ] **Step 1: Add the anchor**

In imports, add:
```tsx
import { GlassAnchor } from "@/components/glass/GlassAnchor";
import { GLASS_SECTION_IDS } from "@/constants/glass";
```

Immediately after the `<DisplayText as="h2" className="has-mt-4">{...}</DisplayText>` inside `about-page-content__hero`, insert:

```tsx
<GlassAnchor id={GLASS_SECTION_IDS.about} />
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/about/AboutPageContent.tsx
git commit -m "feat(glass): anchor on about section"
```

---

## Task 17: Anchor on ContactSection

**Files:**
- Modify: `src/components/sections/home/ContactSection.tsx`

- [ ] **Step 1: Add the anchor**

In imports, add:
```tsx
import { GlassAnchor } from "@/components/glass/GlassAnchor";
import { GLASS_SECTION_IDS } from "@/constants/glass";
```

Immediately after `<h2 id="contact-section-title" className={"contact-page__headline"}>...</h2>`, insert:

```tsx
<GlassAnchor id={GLASS_SECTION_IDS.contact} />
```

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/ContactSection.tsx
git commit -m "feat(glass): anchor on contact zone"
```

---

## Task 18: Styleguide compare surface

**Files:**
- Modify: `src/app/styleguide/page.tsx`

- [ ] **Step 1: Add a "Glass blob" section**

Add to imports:

```tsx
import { GlassAnchorProvider } from "@/components/glass/GlassAnchorContext";
import { GlassStage } from "@/components/glass/GlassStage";
import { GlassAnchor } from "@/components/glass/GlassAnchor";
```

At the bottom of the existing `<main>` content (inside the outer `<div className="container-atmosphere ...">`), insert:

```tsx
<section className="is-flex is-flex-column has-gap-5 has-mt-8">
  <EyebrowLabel>0X - Glass blob</EyebrowLabel>
  <h2 className="text-2xl">Glass blob behaviours</h2>
  <p className="text-sm is-text-muted">
    Three modes rendered in isolated provider trees so each blob behaves
    independently. Use this to choose the default in
    src/constants/glass.ts.
  </p>
  <div className="is-grid has-gap-5" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
    {(["follow", "float", "static"] as const).map((mode) => (
      <GlassAnchorProvider key={mode}>
        <div className="is-flex is-flex-column has-gap-3" style={{ height: "320px", position: "relative" }}>
          <strong className="text-lg">{mode}</strong>
          <GlassAnchor id={`styleguide-${mode}`} />
          <GlassStage behavior={mode} />
        </div>
      </GlassAnchorProvider>
    ))}
  </div>
</section>
```

Note: the `style` props here are styleguide-page-only literals on a dev-only route (`process.env.NODE_ENV !== "development"` returns 404). The project's no-inline-style rule still applies in real components; this dev-tool exception is the narrowest possible scope.

- [ ] **Step 2: Verify TypeScript**

Run:
```bash
npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/app/styleguide/page.tsx
git commit -m "feat(glass): add styleguide compare surface for blob behaviours"
```

---

## Task 19: Playwright smoke

**Files:**
- Create: `tests/glass.spec.ts`

- [ ] **Step 1: Write the smoke test**

```ts
import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

test.describe("liquid-glass section blobs", () => {
  test("home renders exactly one glass-stage canvas, no WebGL errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto(BASE);
    await page.waitForSelector(".glass-stage canvas", { timeout: 10_000 });
    const canvases = await page.$$(".glass-stage canvas");
    expect(canvases).toHaveLength(1);
    expect(errors.filter((e) => /webgl|context lost/i.test(e))).toEqual([]);
  });

  test("at least one anchor is registered on the home page", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector("[data-glass-anchor]");
    const anchors = await page.$$("[data-glass-anchor]");
    expect(anchors.length).toBeGreaterThanOrEqual(1);
  });

  test("reduced-motion users see no rAF-driven loop errors", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(BASE);
    await page.waitForSelector(".glass-stage canvas");
    expect(errors).toEqual([]);
    await ctx.close();
  });
});
```

- [ ] **Step 2: Run dev server, run the smoke**

In one shell:
```bash
npm run dev
```

In another:
```bash
npx playwright test tests/glass.spec.ts
```
Expected: all three tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/glass.spec.ts
git commit -m "test(glass): playwright smoke for stage canvas + anchors + reduced motion"
```

---

## Task 20: Final lint + build

**Files:** none (verification)

- [ ] **Step 1: Lint**

Run:
```bash
npm run lint
```
Expected: clean.

- [ ] **Step 2: Production build**

Run:
```bash
npm run build
```
Expected: clean build, no TypeScript or SCSS errors.

- [ ] **Step 3: If anything fails**

Fix the failure, re-run, and create a new commit (per CLAUDE.md: new commit, never amend).

- [ ] **Step 4: Tag the feature complete**

```bash
git log --oneline -25
```

Confirm the commit chain matches tasks 1 through 19.

---

## Self-review notes

- **Spec coverage:** every spec section maps to a task: arch + mount (T9, T11), constants (T3), geometry (T4), context (T5), anchor (T6), projection (T7), blob (T8), backdrop FBO (T9), SCSS + z layer (T2, T10), placement in 6 sections (T12-T17), compare surface (T18), perf / a11y (built into T6, T8, T9), tests (T19), build (T20), dep (T1).
- **Placeholders:** none. Task 14 has a conditional (file-location dependent) but contains the exact change to make in either branch.
- **Type consistency:** `GlassAnchorEntry`, `GlassBehavior`, `GLASS_SECTION_IDS`, `GlassAnchorProvider`, `useGlassAnchors`, `GlassStage`, `GlassBlob`, `GlassAnchor`, `useGlassGeometry`, `projectRectToWorld` - all names used consistently across tasks.
- **Conventions:** CSS variables for per-instance literals (sanctioned exception); token-driven SCSS (`z(glass-overlay)`); constants module for all numeric values; no AI co-author trailer in commits; no em/en dashes.
