# Davide Domenghini brand

> This file is the **single source of truth** for the personal portfolio brand. SCSS tokens, components, copy, and assets all derive from it. If anywhere in the repo disagrees with this file, this file wins. Update here first, then reflect downstream.

## Positioning

> **Senior front-end engineer who ships whole products, end to end.**
>
> London-based. Twenty years in high-traffic web work for Sky, Estée Lauder and Liberty Global, now leading frontend at Liberty Blume and building Nannynow with the same rigour as enterprise lending and luxury retail.

Tagline (lock-up): **"Ship the hard path. Make it feel simple."**

## Mood

Precise, warm, confident, craft-led. Not generic startup hype, not cold "corporate dev" sterility.

## Audience

- Hiring leads and engineering managers hiring senior IC or lead front-end roles.
- Founders and product leaders looking for a technical partner who can own UX through to deployment.
- Recruiters who need a clear story without buzzword soup.

## Voice

### Voice in one paragraph

Direct sentences. Evidence over adjectives. British spelling. Name the stack, the constraint, and the outcome. Show range (enterprise platforms, grassroots clubs, consumer startups) without sounding scattered.

### We sound like

- A senior engineer explaining trade-offs to another practitioner.
- Someone who respects design, accessibility, and commercial pressure equally.

### We do not sound like

- A keyword-stuffed CV pasted into a landing page.
- Influencer-style self-promotion.

### Hard rules

1. **No em-dashes (`—`) or en-dashes (`–`) anywhere.** Use plain hyphens with spaces where a break is needed.
2. **British English only.** colour, behaviour, organise, centre.
3. **English only on the site.** No Italian (or other) subtitles, stacked translations, or bilingual titles under headings. One language in UI and marketing copy.
4. **Sentence case for UI and headings by default.** Title Case only for proper nouns (brand names, product names).
5. **One core message at a time.** Headline plus one supporting line, not a paragraph in the hero.
6. **Filler ban list:** revolutionise, game-changer, synergy, unleash, elevate, leverage, cutting-edge, robust, seamless, intuitive, empower, world-class.
7. **Banned framings:** "It's not just X, it's Y", empty three-part lists, "In today's world...", "We're on a mission to...".

### Do say

- What you built, who it was for, and what changed.
- Specific technologies when they matter to the reader.

### Do not say

- Vague superlatives without proof.
- "Passionate about code" with no work behind it.

## Colours

All HEX values are canonical. Mirror them exactly in [src/styles/abstracts/_colors.scss](src/styles/abstracts/_colors.scss).

### Primary (dominant)

- **Ink** `#101214` - hero bands, footer, high-contrast panels.
- **Forest** `#2a6b5e` - primary actions, selection, key links on light backgrounds.
- **Paper** `#f5f1ea` - default page background.

### Secondary (complementary, smaller scale)

- **White** `#ffffff` - cards, raised surfaces.
- **Stone** `#6f6a63` - secondary text on light surfaces. Also the **control border** colour: the hairline `border #e0dbd4` is decorative only and fails the 3:1 a non-text UI boundary needs (WCAG 1.4.11), so interactive control bounds (inputs, chips, secondary buttons) use Stone instead (5.36:1 on white).

### Accents (subtle, never on logo)

- **Signal** `#c45c3e` - small highlights, hover emphasis, micro-labels on **light** surfaces only. Use for large text and non-text accents; it does not meet 4.5:1 for normal-size body text.
- **Signal strong** `#b04f33` - the accessible-text shade of Signal, derived for normal-size text on white or paper (5.23:1 on white, 4.65:1 on paper). Used for form error text and the skip-link surface. Same hue family as Signal, only darker for contrast; not a new brand colour.

### Hero orb (WebGL only)

The home hero's celestial "DD" forms and the /lab brand-orb cluster are a shader surface, not a CSS surface. They use a self-contained ramp that exists **only** for the WebGL orb material - never for type, UI, washes, or any CSS. It does not relax the "no colours outside this palette" rule for the rest of the site.

- **Orb void** `#000000` - pure black core of the forms. Design-mandated; not Ink.
- **Orb shadow** `#2c1505` - the dark warm bands between ridges.
- **Orb amber** `#d07a25` - the bright ridges.
- **Orb flare** `#ffc080` - the hot rim peaks.
- **Orb glow** `#a8d66a` - cool green refracted light. Approved deviation (2026-05-19): the /lab brand-orb cluster mirrors a glass-refraction reference whose letters shift through green as well as warm tones. WebGL orb material only, same as the rest of this ramp - never type/UI/CSS.

#### Sanctioned italic-accent carve-out (2026-05-20)

A single italic emphasis word on the hero headline and a single italic emphasis word on the closer headline may use **Orb flare** `#ffc080` as their text colour. This is the only CSS use of any orb-ramp colour anywhere on the site. The carve-out is bounded to:

- exactly one emphasis word per surface (hero, closer)
- the `<em>` inside the headline only - never body, eyebrow, meta, or button copy
- ink-surface headlines only - never on paper

Wired via the `--hero-emphasis-color` CSS custom property on the emphasis-word class so the rule lives in component SCSS, not inline. Any other CSS reference to an orb-ramp colour is a bug.

### Rules

- Dominant: ink on large bands, paper for canvas, forest for actions. Support: white cards, stone for meta. Signal only for accents and hover states on light backgrounds, never as small caps text on ink (use cream for meta on ink for contrast).
- Personal name / wordmark: ink or forest on light; white or paper on ink. No gradient on the name.
- No colours outside this palette.

## Typography

- **DM Sans** - the single typeface. Titles, headlines, body, navigation, labels. Neutral, legible, modern.

One typeface only. Hierarchy comes from **size and weight contrast**, not from a second face: big titles run light-to-medium weight at large sizes, body stays regular. No serif, no display face, no third font.

Fallback:

- DM Sans -> system-ui, sans-serif

## Logo

- Wordmark is the name set in DM Sans semibold. No separate mark required for v1.
- Minimum size: 120px wide on desktop nav.
- Clear space: cap height of the "D" on all sides.
- Never distort, outline, or add drop shadow to the wordmark.

## Patterns and motifs

- Subtle grid or single vertical rule in ink sections only. No busy pattern fills behind body copy.
- **Ink hero backgrounds** may layer soft radial washes using only Forest, Signal, and Cream at **12% opacity or lower** per stop. No colours outside the palette, no neon or unrelated hues.
- **Glass-forward depth** (same idea as frosted dark UI references such as [monopo Saigon on Refero](https://styles.refero.design/style/3e52dd36-6ab1-48c6-bc40-47ef6d33abc2), but always with **our** hexes only): translucent panels sit over the ink wash. Use `backdrop-filter` blur, a **1px** border around **30% cream-on-transparent** (not arbitrary RGB), and hierarchy from **gradient depth**, not stacked drop shadows. Optional **very slow** motion on background washes is allowed on marketing ink bands only when `prefers-reduced-motion: reduce` turns it off. Shared mixins `ink-atmosphere-wash-background` and `paper-atmosphere-wash-background` in SCSS keep footer, archive, and future bands aligned; override `:root { --brand-atmosphere-strength }` with a number from **0** to **1** (default **1** in global CSS) to dim or silence those layers globally.
- **Monopo-style layout translation (SCSS only):** we do **not** import Roobert, Raleway, Midnight `#000`, or the Deep Ocean RGB string. Instead we use **`brand-atmospheric-band`** (horizontal Forest / Paper / Signal wash), **`$layout-page-max` (1078px)** via `.container-atmosphere`, **`$radius-card-glass` (10px)** on frosted cards, **`$radius-pill-cta`** on buttons and nav pills, **`spacer(11)` (46px)** for monopo-style section and grid gaps where noted in components, and **`AppStickyNav` `surface="ink"`** on the dark home stack. Typography stays **DM Sans only** (size and weight contrast for hierarchy, no second face).
- **Archive gallery** uses a bento-style grid: mixed tile sizes, thin borders, and real screen exports from the long-form archive.
- Cards: soft radius, thin border, no heavy shadow stacks.

## Photography direction

- Project shots are real captures of shipped sites, not stock.
- Prefer wide desktop captures for case study heroes; keep file size reasonable (JPEG quality around 85).

## Design direction

- Strong typographic hierarchy over decorative illustration.
- Generous spacing, one focal column on case studies.
- Avoid: generic purple-on-purple SaaS gradients, fake device frames, meaningless icon grids.

## Content pillars

1. **Shipped work** - live products and sites with outcomes and tech.
2. **Practice** - accessibility, performance, design systems, how you work with teams.
3. **Range** - enterprise, public sector, consumer, grassroots, all tied to the same craft standards.

## Writing patterns

### Headlines

- DM Sans, sentence case. One idea. Roughly six to ten words.

### Sub-headlines

- DM Sans, sentence case. One sentence, adds specificity.

### Body copy

- Short paragraphs. Lead with what the reader gets (clarity, risk reduction, speed), not biography alone.

### CTAs

- Verb-led, two or three words: "View case study", "Open live site", "Email Davide".

### Error and empty states

- Human and direct. Example: "That project is not in this portfolio. Head back to the homepage."

## Audit checklist

1. Em-dashes, en-dashes, or decorative substitutes.
2. British spelling.
3. Non-English or bilingual UI (subtitles, stacked translations).
4. Banned words and framings.
5. Superlatives without evidence.
6. Generic CTAs ("Learn more", "Click here").
7. Copy that could belong to any developer CV.
