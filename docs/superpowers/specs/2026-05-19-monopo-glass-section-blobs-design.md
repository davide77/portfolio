# Liquid-glass section blobs ("monopo-glass") - design

Date: 2026-05-19
Status: Approved (design), pending implementation plan

## Goal

Add a recurring liquid-glass decorative motif to the single-page portfolio:
a custom organic glass blob sitting below the title of every major section,
left-aligned. The blob refracts a controlled WebGL backdrop so it reads as
genuine liquid glass, matching the monopo.vn reference
(`https://monopo.vn/media/uploads/challenge_web3dasset.webm`). Behaviour is
selectable between three modes so the final look can be chosen on the
styleguide page.

This is adapted from the React Bits `FluidGlass` component. Only the lens /
`MeshTransmissionMaterial` idea is reused. The shipped React Bits scaffold
(`ScrollControls`, 3 scroll pages, demo image carousel, "React Bits" text,
nav bar, hardcoded `#5227ff` clear colour) is **not** used.

## Decisions (locked with user)

- **Placement:** below the title, left-aligned, on every major section.
- **Sections:** the six `MarketingHome` content blocks - `positioning`,
  `work` (Selected Work), `archive` (Legacy Work Gallery), `capabilities`,
  `about`, `contact` (Contact + Closing CTA zone, one anchor). Hero is
  excluded (it already runs its own WebGL). The `trusted` logo strip is
  excluded.
- **Shape:** custom organic blob, delivered as procedural noise-displaced
  geometry (no binary GLB asset to source/commit; tweakable in-repo).
- **Behaviour:** all three modes built and selectable -
  `follow | float | static`.
- **Architecture:** single shared overlay canvas, blobs anchored to section
  titles via a registry context (Approach A).
- **Refraction target:** a controlled WebGL backdrop we own (monopo
  grainient palette / per-section tint), not live DOM rasterisation.
- **Dependency:** add `maath` for `easing.damp3` (approved as-is).
- **Mount point:** `SiteShell` (survives `/work/[slug]` routes and soft
  anchor nav), not `MarketingHome`.

## Architecture

One fixed, full-viewport, transparent `<Canvas>` mounted once in
`SiteShell`. It is `pointer-events: none`, z-indexed above section
backgrounds but below the sticky nav and interactive content. The canvas
is `aria-hidden` and purely decorative.

Each participating section renders a lightweight invisible **anchor**
element below its title. A context provider tracks every anchor's viewport
rect (rAF-throttled `ResizeObserver` + passive scroll listener). The
overlay canvas projects one procedural glass blob onto each anchor's
position. Result: one WebGL context, N blobs.

### Why this architecture

"Every section gets one" with a `<Canvas>` + `MeshTransmissionMaterial`
FBO each would create 6+ live WebGL contexts (browsers cap ~16; each
transmission FBO is expensive). A single shared overlay is how real
site-wide WebGL overlays (monopo included) are built, and it keeps blob
look consistent across sections.

## Components and files

| File | Role |
|---|---|
| `src/components/glass/GlassStage.tsx` | `"use client"`. The single fixed `<Canvas>`. Reads the anchor registry, renders one `<GlassBlob>` per anchor plus the controlled backdrop FBO. Visibility- and reduced-motion-gated `frameloop`. |
| `src/components/glass/GlassBlob.tsx` | One blob: procedural noise-displaced icosahedron + `MeshTransmissionMaterial`. Props: `behavior`, target rect, shared backdrop buffer. Per-frame transform per mode. |
| `src/components/glass/useGlassGeometry.ts` | Memoised procedural blob geometry (noise-displaced sphere). Params from `glass.ts`. |
| `src/components/glass/GlassAnchorContext.tsx` | Provider + `useGlassAnchors()`. Registry of `{ id, ref, rect }`; rect updates via rAF-throttled `ResizeObserver` + scroll listener. |
| `src/components/glass/GlassAnchor.tsx` | The invisible left-aligned placeholder a section drops under its title. Registers/unregisters itself. Renders an `aria-hidden`, sized, zero-visual `span`. |
| `src/constants/glass.ts` | All tuning constants (see below). |
| `src/styles/components/_glass-stage.scss` | Only genuinely component-specific rules (fixed positioning, z-index, canvas wrapper). Layout/spacing via existing utility classes per CLAUDE.md. Registered in `_index.scss`. |

`maath` is added to `package.json` dependencies.

## Constants (`src/constants/glass.ts`)

Typed exports, no magic numbers in components (per CLAUDE.md):

- Geometry: blob base radius, icosahedron detail, noise frequency,
  noise amplitude, seed.
- Material: `transmission`, `ior`, `thickness`, `roughness`,
  `chromaticAberration`, `anisotropy`, `attenuationColor`,
  `attenuationDistance`.
- Behaviour: follow damping factor, follow clamp inset, float amplitude,
  float speed, idle rotation speed.
- Backdrop: grainient palette keys / per-section tint map (reuse
  `HERO_GRAINIENT_PALETTE` values where sensible).
- Performance: `dpr` cap (<= 2), mobile breakpoint px, default
  `behavior`.

## Anchor placement

- `StickyScene`-based sections (e.g. Positioning) get an optional
  `glassId` (and implicit show) prop that renders `<GlassAnchor>` directly
  under the rendered headline.
- Bespoke sections (`LegacyWorkGallery`, `AboutPageContent`,
  `ContactSection`, `CapabilitiesSection`, `SelectedWorkSection`) place
  `<GlassAnchor id="...">` inline beneath their heading element.
- `GlassAnchor` is left-aligned, occupies a `min-width` / `min-height`
  box whose dimensions come from `glass.ts` (the blob's render footprint),
  so the registry has a stable rect and removing the blob does not shift
  layout. It renders nothing visible and is `aria-hidden`.

## Refraction backdrop

A single offscreen scene (FBO) renders the monopo grainient palette
(reuse `HERO_GRAINIENT_PALETTE` / per-section tint from `glass.ts`) as a
soft gradient plane. Every blob samples this shared buffer via
`MeshTransmissionMaterial`'s `buffer`. No DOM rasterisation. Canvas clear
colour stays transparent (explicitly not React Bits' `#5227ff`).

## Behaviour modes

`behavior: "follow" | "float" | "static"` - a `GlassStage` prop (global
default), overridable per anchor.

- **follow** - blob eases toward pointer (`easing.damp3`) clamped within
  its section rect, with gentle idle rotation.
- **float** - sinusoidal bob + slow rotation about the anchor, no pointer.
- **static** - fixed at anchor, no per-frame transform; FBO rendered once.
  Also the forced `prefers-reduced-motion` fallback and the mobile
  (no-pointer) downgrade from `follow`.

## Compare surface

`src/app/styleguide/page.tsx` gains a "Glass blob" section rendering the
three behaviours side by side over a representative backdrop, so the final
default can be chosen visually. Choosing a default = setting the
`behavior` constant default in `glass.ts`.

## Performance and accessibility

- One WebGL context. `dpr` capped via constant (<= 2).
- `frameloop="never"` unless >= 1 anchor is in viewport
  (IntersectionObserver) and the tab is visible - mirrors the existing
  `HeroCanvas` visibility pattern.
- `prefers-reduced-motion` -> all blobs `static`, FBO rendered once.
- Canvas `aria-hidden` + `pointer-events: none`; zero impact on DOM
  semantics, keyboard order, or screen readers.
- Mobile: `follow` auto-downgrades to `float`/`static` below the
  breakpoint constant (no pointer to track).
- `static` mode performs no FBO update after the first frame.

## Testing / verification

Playwright smoke test (playwright-skill available):

- Home page renders; exactly one `<canvas>` originates from `GlassStage`.
- Rendered blob count == registered anchor count for the home page.
- No WebGL context-creation errors in console.
- `prefers-reduced-motion` emulation -> static path renders, no rAF loop.
- `npm run build` and `npm run lint` pass clean.

## Out of scope

- Refracting live DOM/body text (rejected: per-frame page rasterisation
  is heavy and janky on scroll).
- Hero section changes (keeps its existing WebGL monogram).
- A blob on the `trusted` logo strip.
- Sourcing/committing binary `.glb` models.

## Conventions to honour (from CLAUDE.md)

- No inline `style` props (framer-motion / CSS-var exceptions only).
- No hardcoded user-facing or numeric values in JSX - everything via
  `src/constants/glass.ts`.
- Token-driven SCSS only (`color()`, `spacer()`, `z()`, etc.); utility
  classes over component SCSS; `_glass-stage.scss` for genuinely
  component-specific rules only; register in `_index.scss`.
- No em/en dashes anywhere.
- No AI co-author trailer in commits.
- `cx(...)` for conditional class composition; Server Components by
  default, `"use client"` only where required (canvas + hooks).
