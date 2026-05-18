# Claude Code prompt - Port the Davide Domenghini hero into Next.js

Paste this into Claude Code in VS Code. The authoritative visual reference is `documents/davide-hero-final.html` (already in the repo). Read it first, then build.

## CONTEXT

This is Davide Domenghini's portfolio in Next.js 16 (App Router), React 19, TypeScript strict.

`documents/davide-hero-final.html` is a working standalone build of the home hero - Three.js + custom GLSL shader producing two abstract "DD" forms rendered as glowing celestial bodies, with the monopo.vn nav/scroll-badge/edge-text treatment layered on top.

Your one job: port this HTML into a clean, production-ready Next.js component. Do NOT redesign. Do NOT improve. Do NOT reinterpret. The HTML's shader, geometry, composition, colour palette and animation timings are the result of many iterations and they are the design. You're the engineer making it production-ready.

## REPO REALITY - VERIFY, DO NOT REINVENT

Before writing anything, confirm the following (all already true in this repo):

- **Dependencies are already installed**: `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`, `raw-loader`. Do NOT install or add dependencies. If you believe you genuinely need a new one, stop and flag it in the PR description first - do not add it.
- **The `.glsl` raw-string loader is already configured** in `next.config.ts` for both Turbopack (`raw-loader`) and webpack (`asset/source`). Do NOT add or rewrite this config. Just `import frag from "./orb.frag.glsl"` and it works.
- **An earlier hero attempt already exists** under `src/components/hero/` (`HeroCanvas.tsx`, `HeroOrb.tsx`, `HeroWebGLBackdrop.tsx`, `createHollowDGeometry.ts`, `shaders/`, `hooks/`) and `src/constants/hero-webgl.ts`. Audit these first. Replace or refactor them **in place**. Do NOT create parallel `HeroCanvas2`-style duplicates. Reconcile to one implementation.
- **Default branch is `master`.** Each PR branches off `master`. Do not commit directly to `master`.

## CRITICAL VISUAL DIRECTION - READ BEFORE TOUCHING THE SHADER

The look is sharp, defined, high-contrast. It is NOT blurred, hazy, soft, or uniformly glowing. Specifically:

- Deep pure-black wells (0x000000) interrupt the warm areas
- Bright amber ridges with hot rim peaks (0xffc080)
- Defined dark-bright-dark band transitions, via three narrow smoothstep zones
- Sharp geometric edges on the extruded form (small bevel, 0.06)
- Tight fresnel rim - defined edge, no soft halo bleed
- Pure black background, no ambient warm wash gradients behind the canvas

Hard "do nots" we already burned cycles on:

- Do NOT add `filter: blur()` to the canvas. The dreamy quality is from the shader, not from a uniform blur.
- Do NOT replace the three-zone smoothstep band pattern with smoother `pow()` ramps. The defined zones are what give it structure.
- Do NOT add ambient radial-gradient warm washes behind the canvas. They make the background hazy.
- Do NOT increase the bevel size beyond 0.06 to "soften" the edges. We want sharp.
- Do NOT reduce `setPixelRatio` below `Math.min(devicePixelRatio, 3)`. The sharpness comes from high DPR.
- Do NOT change the fresnel from `smoothstep(0.3, 0.95, ...)` to a softer `pow()` curve. Tight rim, not glow.

If anything still reads as too soft after porting, increase contrast in the shader, never blur the output.

## TECH STACK & CONSTRAINTS

- Framework: Next.js 16 (App Router), React 19, TypeScript strict.
- 3D: Raw Three.js for this component (not r3f - lifecycle is straightforward, one canvas, r3f adds complexity without benefit here). Use the already-installed `three` / `@types/three`.
- No post-processing (EffectComposer/Bloom). The HTML deliberately doesn't use it - the shader handles everything.
- No new dependencies. No `next.config.ts` changes.

## STYLING - THIS REPO'S RULES ARE NON-NEGOTIABLE

This project does NOT use CSS Modules. Before any style work, **invoke the `scss-utility-architecture` skill** (mandated by CLAUDE.md) and read `brand.md`.

- **No `.module.scss`.** Component styles are global BEM partials under `src/styles/components/`, registered in `src/styles/components/_index.scss`. Use kebab-case BEM class strings in JSX (e.g. `hero__headline`).
- **Tokens live in `src/styles/abstracts/`** (`_colors.scss`, `_typography.scss`, `_spacers.scss`, `_breakpoints.scss`, etc.) and are consumed **only via accessor functions**: `color()`, `spacer()`, `font-size()`, `font-weight()`, `line-height()`, `bp()`, `z()`. No raw hex, no raw px outside the scale. `abstracts/` emits zero CSS.
- **Utility classes over component SCSS.** Anything that's only layout/spacing/alignment/text-size/colour goes in JSX as existing utility classes (`is-flex`, `has-gap-N`, `text-X`, `is-{colour}`, etc. - see CLAUDE.md mapping table), NOT as new component SCSS. Component SCSS is only for genuinely component-specific concerns (the rotated edge text, the SVG textPath badge, pseudo-elements, the canvas container positioning, keyframes).
- **No inline `style={{}}`** except the CLAUDE.md-allowed exceptions (framer-motion MotionValues, per-instance CSS custom properties as `CSSProperties`). The Three.js canvas sizing should be driven by class + ref, not an inline style object.
- If a design value isn't in the scale, extend the map in `abstracts/` first (and confirm it's in `brand.md`'s palette), then reference via the accessor. If a token genuinely doesn't exist, surface it as a question in the PR description rather than inventing values.

## CONTENT & CONFIG - MUST LIVE IN `src/constants/`

CLAUDE.md forbids hardcoded user-facing literals and magic numbers in JSX. So:

- The HTML's `CONFIG` object (positions, scales, colours, motion timings, DPR caps) -> extend `src/constants/hero-webgl.ts` (or add `src/constants/content/hero.ts` for copy). Import it into the component. Do NOT keep an in-component `CONFIG` literal and do NOT inline the tunables in the `useEffect`.
- All hero copy (wordmark, language toggle, eyebrow, headline, nav items, vertical edge text, scroll badge text, booking URL) -> `src/constants/` (extend `content/`, `nav.ts`, `site.ts`, `routes.ts` as appropriate), imported and rendered. No literal user-facing strings in JSX.
- `BOOKING_URL` is a constant placeholder in `src/constants/` (Cal.com flow, real URL TBD).

## FILE / COMPONENT STRUCTURE

Work within `src/components/hero/` and reconcile with what's there.

**`<Hero />` - server component** (default; no `"use client"`)
Renders the static shell: nav, headline, scroll badge, vertical text, floating dot. Lazy-loads `<HeroCanvas />` for the WebGL layer.

**`<HeroCanvas />` - client component** (`"use client"`)
Mounts the Three.js scene as a `useEffect`-based lifecycle:
- Set up scene/camera/renderer in `useEffect`.
- Cleanup on unmount: cancel `requestAnimationFrame`, dispose geometries/materials, remove event listeners, dispose renderer.
- Refs for canvas + container. No inline style objects for sizing.
- All tunables read from the imported constants, not local literals.

**The static parts** (server components unless they need interaction):
- `<TopNav />`: wordmark + language toggle + right-stack nav + Book a call CTA. Real Next.js `<Link>` for nav items (routes from `src/constants/routes.ts`). CTA -> `BOOKING_URL`.
- `<HeroText />`: eyebrow + display headline with "ships" italicised.
- `<ScrollBadge />`: keep the SVG `textPath` approach from the HTML. Don't reinvent.
- `<VerticalText />`: rotated 90 degrees on the right edge.
- `<FloatingDot />`: position + animation per HTML.

## SHADER PORTING - LIFT VERBATIM

The fragment shader is the load-bearing element. Copy it from the HTML into `src/components/hero/shaders/orb.frag.glsl` exactly as written. Preserve:

- **Domain warping** - `warpX`/`warpY` samples that shift position before band sampling. This is the liquid-flow recipe.
- **Three-zone band pattern** - the narrow `smoothstep` ranges that create the defined dark-bright-dark structure. Do not widen them.
- **Layered colour mixing** - three separate `mix()` calls building dark -> mid -> bright -> rim. Don't collapse into a single gradient.
- **Tight fresnel** - `smoothstep(0.3, 0.95, ...)`, not `pow(fresnelRaw, 1.4)`.
- **Simplex noise** (Ashima Arts / Stefan Gustavson, public domain) -> `src/components/hero/shaders/noise.glsl`, concatenated into both vertex and fragment shaders.

Pass the token-mapped colours into the shader uniforms from the React side via `new THREE.Color(token)`. Keep `uColorCore` at pure `0x000000` regardless of the token system - pure black is the design.

## GEOMETRY - PRESERVE

Lift `makeDShape()` and the `THREE.Shape` + `THREE.ExtrudeGeometry` build verbatim (reconcile with the existing `createHollowDGeometry.ts` - one implementation). Critical settings from the HTML's CONFIG (move into the constants file):

- `d1`: position `[-1.3, 0.4, 0.3]`, `rotation.z 0.18`, scale `2.3`
- `d2`: position `[1.7, -0.5, -0.4]`, `rotation.z -0.28`, scale `1.8`

This asymmetric off-frame placement is what makes them read as planets, not letters. Don't re-centre.

## RENDERER - PRESERVE THE SHARPNESS

`setPixelRatio(Math.min(devicePixelRatio, 3))` is deliberate. Lower values soften the render on high-res displays. Mobile (< 640px) caps dpr at 2 (value in constants).

## ANIMATION LOOP - PRESERVE TIMINGS

Lift `animate()` verbatim - wobble amplitudes, parallax lerp factors, per-axis sine frequencies are tuned for "celestial drift, not letter rotation".

Add to the HTML version:
- Pause render loop when the container is offscreen (`IntersectionObserver`, `frameloop` boolean checked before `requestAnimationFrame`).
- Pause on `document.visibilitychange` when the tab is hidden.
- Both must call `clock.start()` cleanly on resume so noise time doesn't jump.

## ACCESSIBILITY & PERFORMANCE

- `prefers-reduced-motion: reduce` -> do NOT mount `<HeroCanvas />` at all. The static parts must still render and look intentional against the dark background. Use a `useReducedMotion()` hook (reuse the existing one under `src/components/hero/hooks/` if present) returning a boolean.
- CSS animations on the scroll badge, pulse dot, and floating dot must also disable under reduced motion (HTML already has this `@media` query - port it into the BEM partial).
- Lighthouse mobile Performance >= 90 under 4G throttling. Canvas not mounting on reduced-motion is part of how this is achieved.
- Visible focus ring on the Book a call CTA (token-driven). All nav items keyboard-reachable.

## CONTENT - DO NOT EDIT THE WORDS (but no em-dashes in shipped copy)

All of the below goes in `src/constants/`. Note: this repo bans em-dashes and en-dashes in all shipped copy, commit messages, and PR bodies. Where the source uses one, replace with a spaced hyphen ` - ` or rewrite.

- Wordmark: `dd domenghini` (with `dd` in warm accent colour)
- Language toggle: `| EN . IT` (IT at 50% opacity, `aria-disabled` until IT content exists)
- Right nav: `WORK . ABOUT . LAB . CONTACT . Book a call`
- Eyebrow: `01 - SENIOR FRONT-END . FOUNDER` (spaced hyphen, not em-dash)
- Headline: `Frontend that ships product, not just code.` (italicise "ships")
- Vertical edge text: `EST . 2006 - LONDON . ROMA` (spaced hyphen, not em-dash)
- Scroll badge: `SCROLL DOWN . SCROLL DOWN .` (repeating, one revolution / 18s)

(The `.` separators above represent the middle-dot glyph in the source; keep the original middle-dot character in the actual constants, just never an em-dash or en-dash.)

## DELIVERY - TWO PRs (branch off `master`, no AI co-author trailer)

Commit messages and PR bodies: subject + body only, plain hyphens, **no `Co-Authored-By:` / AI attribution** (CLAUDE.md rule).

**PR 1 - Static shell.** File structure reconciled with existing `hero/`, all five static parts, constants extraction, token + BEM integration via the `scss-utility-architecture` skill, the reduced-motion hook, all CSS keyframe animations on the ambient elements. No canvas. The page should look intentional and complete as a reduced-motion fallback.

**PR 2 - Canvas integration.** Add/reconcile `<HeroCanvas />`, lift shader + animation loop, wire visibility/intersection pauses, verify against `documents/davide-hero-final.html` at full viewport.

Each PR opens with a 2-line plan ("shipping / deferring") and closes with a 2-line summary ("what went in, what didn't, what to look at").

## VERIFICATION

Before declaring PR 2 done, open side by side at 1920x1080:
1. `documents/davide-hero-final.html`
2. The Next.js dev server (`npm run dev`) on `/`

They must be visually indistinguishable in: form silhouettes, internal band patterns, dark zones, rim glow, drift motion, parallax response. If not, iterate the canvas - never the static shell. Run Lighthouse on the production build; post the score in the PR description.

## ONE-LINE NORTH STAR

The HTML is the design. You're porting it. Sharpness is a feature, not a bug - preserve it.
