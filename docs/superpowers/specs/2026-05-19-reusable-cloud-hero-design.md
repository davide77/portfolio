# Reusable cloud-animation Hero - design

Date: 2026-05-19
Status: approved (pending spec review)

## Problem

The hero with the WebGL "cloud" animation (the liquid-metal domain-warped
simplex shader rendered through two hollow-D meshes) only exists on the home
page via `HeroSection` in `src/sections/home/MarketingHome.tsx`. Internal
pages (about, work, work/[slug], contact, lab) each hand-roll their own
`EyebrowLabel + DisplayText h1 + intro` header inside `<main>` with no shared
hero and no cloud animation.

Goal: extract one reusable `<Hero>` component carrying the cloud animation and
use it at the top of every page, each page passing its own copy, so every
page is structurally and visually consistent.

Out of scope: the work-image glow treatment (considered and dropped earlier),
any change to the shader or the hollow-D geometry, the dev-only styleguide
page.

## Chosen approach

Approach 1 of three considered: a single `<Hero>` component with two named
variants (`full`, `compact`). Rejected alternatives:

- Fully prop-driven Hero with no named variants: verbose call sites, easy to
  produce inconsistent heroes, more configuration surface than the two real
  cases need.
- Shared `<HeroBackdrop>` only, each page keeps its own header: least reuse,
  does not deliver "the same hero on each page", duplicated header code.

Two variants map exactly to the two real cases (immersive home hero vs.
compact page header), keep configuration minimal, and leave the existing
working WebGL layer and SCSS untouched.

## Component and file layout

- New `src/components/hero/Hero.tsx` - the public component. Renders the
  `<section class="hero">` shell, the shared WebGL cloud
  (`HeroWebGLLayer` -> `HeroCanvas` -> `HeroOrb`, unchanged), an
  `EyebrowLabel`, a heading slot, an optional intro line, and (full variant
  only) the vertical edge text, `ScrollBadge`, and `FloatingAccentDot`.
- Move `HeroHeadline` into `src/components/hero/` so all hero code lives in
  one folder. Existing `HeroWebGLLayer` / `HeroCanvas` / `HeroOrb` /
  `HeroPlaceholder` stay where they are in `src/components/hero/`.
- Delete `HeroSection`; the home page renders `<Hero variant="full" ...>`
  directly from `MarketingHome`.

## Component API

```ts
type HeroProps = {
  variant?: "full" | "compact";        // default "compact"
  eyebrow?: string;
  /** full: rendered via HeroHeadline word stagger; compact: plain <h1> */
  title: string;
  words?: readonly string[];           // full only (word-stagger headline)
  emphasisWord?: string;               // full only
  intro?: string;                      // compact only
  edgeText?: string;                   // full only
  showScrollBadge?: boolean;           // full only, default true
};
```

- `variant="full"`: 100svh, `HeroHeadline` animated word stagger, edge text,
  scroll badge, accent dot. Byte-for-byte the current home hero.
- `variant="compact"`: shorter (~60svh), static `<h1>` using the existing
  `DisplayText as="h1"` look plus optional intro paragraph; no edge, badge,
  or accent dot. Heading keeps `id="hero-heading"` so each page's
  `aria-labelledby` stays valid.

## Per-page copy (constants only)

Per CLAUDE.md, no user-facing literals in JSX. Reuse existing constants, add
a small field only where missing:

- Home -> `HERO_DISPLAY` (words, emphasisWord, eyebrow, verticalEdge). Exists.
- About -> `ABOUT_PAGE.eyebrow / headline / intro`. Exists.
- Work index -> `WORK_INDEX.eyebrow / headline`. Exists.
- Lab -> `LAB_PAGE.eyebrow / headline / description`. Exists.
- Contact -> add `CONTACT_PAGE.eyebrow` (headline and responseTime already
  exist). `StatusPill` stays in the page body below the hero.

## Page migration

Each internal page drops its hand-rolled
`EyebrowLabel + DisplayText h1 + intro` header and renders
`<Hero variant="compact" ...>` as the first child of `<main>`. The rest of
each page (about portrait and timeline, work filters and grid, contact cards
and form, lab grid) is untouched and flows below the hero.

- about / work / lab / contact: header block replaced by the compact Hero.
- work/[slug]: `CaseStudyTemplate` has a bespoke hero (client eyebrow,
  project title, project hero image) worth keeping. The shared WebGL cloud
  mounts as the backdrop behind the existing case-study hero band by reusing
  `HeroWebGLLayer` only (not the full `<Hero>`). The case-study hero
  structure is not replaced, so the project hero image is preserved.

## SCSS

Extend the existing working global partial
`src/styles/components/_hero-section.scss`:

- Rename intent to `.hero` / `.hero__*` and add a `.hero--compact` modifier:
  shorter `min-height`, smaller headline clamp, left-aligned (to match the
  current internal-page header alignment) instead of centered, no edge.
- The compact `min-height` value comes from a token. If no suitable step
  exists in the scale, add one in `abstracts/` first, then reference it via
  the accessor. No raw literal in the component partial.
- WebGL layer SCSS (`_hero-webgl-layer.scss`) unchanged.
- Update the `@use` path in `src/styles/components/_index.scss` if the
  partial is renamed.

Note: the global component-style layer is largely absent from git history
(only `_hero-webgl-layer.scss` and `_hero-section.scss` exist and are
imported). Do not add a `@use` for a partial that does not exist on disk.

## Behaviour and accessibility

- Reduced motion: unchanged. `HeroWebGLLayer` already swaps to
  `HeroPlaceholder` under `prefers-reduced-motion: reduce`.
- One WebGL context per page, mounted and unmounted on navigation. No
  multi-context cost.
- The compact variant must not push all page content below the fold: target
  ~60svh with content immediately visible underneath. Verify per page after
  migration.

## Acceptance criteria

1. A single `<Hero>` component exists in `src/components/hero/` with `full`
   and `compact` variants and the API above.
2. The home page renders the hero via `<Hero variant="full">` and is visually
   identical to the current home hero (cloud, animated headline, edge text,
   scroll badge, accent dot).
3. about, work, lab, and contact each render `<Hero variant="compact">` as
   the first child of `<main>` with their own eyebrow, title, and (where
   applicable) intro sourced from constants; their existing below-hero
   content is unchanged and reachable.
4. work/[slug] shows the WebGL cloud as a backdrop behind the existing
   `CaseStudyTemplate` hero band; the project hero image and title structure
   are preserved.
5. No user-facing literal strings are introduced in JSX; all copy comes from
   `src/constants/content/*`.
6. `prefers-reduced-motion: reduce` still renders `HeroPlaceholder` and no
   animation.
7. No em-dashes or en-dashes in any new or edited file.
8. `npm run build` succeeds and all routes render without the missing
   stylesheet error.
