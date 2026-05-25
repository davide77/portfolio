# SEO Action Plan: domenghini.com

Prioritized from the full audit (2026-05-22). Health score 77/100. Items are ordered by impact-per-effort. Files are in this repo (path has a trailing space, quote it).

Effort key: XS (minutes), S (under an hour), M (a few hours), L (a day or more).

---

## Critical (fix immediately)

### 1. Fix the site-wide host mismatch (one line, fixes 4 categories)
Every canonical, `og:url`, sitemap `<loc>`, and JSON-LD URL points to bare `domenghini.com`, which 307-redirects to the live `www.` host.
- Change `SITE_URL` in `src/lib/seo.ts:4` to `https://www.domenghini.com`.
- This propagates to canonical, OpenGraph, sitemap, robots, and all schema in one edit.
- Effort: XS. Fixes T1, C1, S1, G1.

### 2. Make the apex redirect permanent (308)
The apex to www redirect is currently 307 (temporary).
- In the Vercel dashboard (Project, Domains), set `domenghini.com` to permanently redirect to `www.domenghini.com`.
- Verify: `curl -sI https://domenghini.com/` returns 308.
- Effort: XS (dashboard).

### 3. Stop the no-JS / pre-hydration blank screen
The `page-transition__curtain` (fixed, full-viewport, z-index 500) defaults to `opacity:1` and is only lifted by JS. JS-off/slow/blocked visitors see a blank dark page.
- Default the curtain to `opacity:0` in CSS; animate it in only when JS is present (or scope it behind a JS-enabled class set synchronously in `<head>`).
- Curtain/transition lives under `src/components/motion`.
- Effort: S. Fixes V1.

---

## High (within a week)

### 4. Un-gate the hero h1 from JavaScript (LCP)
Hero words ship `opacity:0` inline and paint only after framer-motion hydrates.
- Render the headline visible by default; animate as progressive enhancement; honour `prefers-reduced-motion` and treat first paint as the visible state.
- Hero lives under `src/components/sections/home`; motion wrappers under `src/components/motion`.
- Effort: M. Fixes P1, V2.

### 5. Add security headers
Only HSTS is present today.
- Add a `headers()` block to `next.config.ts`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and HSTS with `includeSubDomains; preload`.
- Add a CSP in `Report-Only` first (allow `plausible.io`, self-hosted `next/font`), then enforce.
- Effort: S. Fixes T3.

### 6. Remove placeholder copy from the live site
- `receipts.ts` section 07: remove "Final site will replace these with named LinkedIn quotes..." Reframe as "Selected proof" or ship real attributed testimonials.
- `projects.ts:378`: replace the Bristol "interim hero until design-system capture is added" caption with a neutral finished one.
- Effort: S. Fixes C-H1.

### 7. Bring the four thin case studies up to depth
Nannynow, Striver, Cheam, Bristol each carry one short section.
- Expand to the Liberty Blume shape: Constraints / Stack and architecture / Outcome (with a measurable result line) plus 2-3 artefacts. Keep each project-specific to avoid near-duplicate passages.
- Priority: Bristol first (500k-resident WCAG 2.1 AA story).
- Source: `src/constants/content/projects.ts`.
- Effort: M-L. Fixes C-H2.

### 8. Fix mobile hero overflow and the 4px horizontal scroll
- Reduce mobile headline font-size/line-height so the full sentence plus a CTA fit above the fold (V3).
- Track down the element causing `scrollWidth` 394 vs 390 on mobile home (likely the orb/canvas atmosphere layer) (V4).
- Effort: S. Fixes V3, V4.

### 9. Fix the homepage double H1
- Keep the hero positioning line as the single H1; demote the second to H2.
- Effort: XS. Fixes C-M2.

---

## Medium (within a month)

### 10. Publish `/llms.txt`
High-impact, low-effort AI-citation surface. Draft below; place at the site root (e.g. `public/llms.txt`). No long dashes.

```
# Davide Domenghini

> Senior front-end engineer and founder based in London, UK. Twenty years
> (since 2006) shipping the front end of products people use. Specialises in
> React, Next.js, and TypeScript, with depth in accessibility, design systems,
> and WebGL. Available for senior individual-contributor and lead front-end
> roles, contract or permanent, in London or remote, from discovery to deploy.

## About

Davide Domenghini is a senior front-end engineer and founder with twenty-plus
years building scalable, high-performance web applications. He has shipped work
for Sky, Estee Lauder, Liberty Global, Bristol City Council, EE, and A+E
Networks, across enterprise lending, luxury retail, public sector, and consumer
products. He architects multi-step regulated platforms and prototypes
experimental WebGL interfaces, leads front-end on enterprise revenue platforms,
mentors junior engineers, and is currently building Nannynow.co.uk end to end.

## Specialisms

- Front-end architecture: Next.js, React, TypeScript, SCSS
- Accessibility: axe, NVDA, VoiceOver, Lighthouse
- Performance: Lighthouse, WebPageTest, Core Web Vitals
- Design systems: Figma, Style Dictionary, SCSS
- WebGL and motion: Three.js, GLSL
- End-to-end delivery: Vercel, GitHub Actions, Stripe

## Selected work

- Liberty Blume (Liberty Global), senior FE lead, 2025-now: 12-step regulated
  lending journey, live. https://www.domenghini.com/work/liberty-blume
- Estee Lauder EMEA, senior FE, 2022-25: front-end modernisation across brands
  with FR and DE rollouts. https://www.domenghini.com/work/estee-lauder-emea
- Bristol City Council, senior FE, 2021-22: GOV.UK-aligned design system serving
  500k+ residents. https://www.domenghini.com/work/bristol-city-council
- Striver.Football, design and FE lead, 2026: brand to a shipped Next.js site.
  https://www.domenghini.com/work/striver-football
- Cheam Sports FC, founder, 2024-now: solo full-stack build with payments.
  https://www.domenghini.com/work/cheam-sports-fc
- Nannynow.co.uk, founder, currently building: concept to MVP, solo.
  https://www.domenghini.com/work/nannynow

## Outcomes

- 500k+ Bristol residents served by the bristol.gov.uk design system
- 40% dev-time reduction across Squiz engagements
- 12-step regulated lending journey shipped and live at Liberty Blume

## Links

- Site: https://www.domenghini.com/
- Work archive: https://www.domenghini.com/lab
- LinkedIn: https://www.linkedin.com/in/davidedomenghini
- GitHub: https://github.com/davide77
- Email: davide@domenghini.com

## Contact

Hiring a senior IC or lead front-end engineer, or want a technical partner from
discovery to deploy? Email davide@domenghini.com. Replies within 48 hours.
London, GMT.
```
- Effort: XS. Fixes the missing-llms.txt GEO gap.

### 11. Build the positioning / comparison page
The spec already exists in `docs/seo/positioning-page/` (primary target `hire senior front-end engineer London`, H1, comparison matrix, ~1,500 words, `FAQPage` schema). It is the only asset targeting the primary buyer keyword.
- Build as a standalone route with `FAQPage` JSON-LD mirroring on-page Q&As verbatim.
- Effort: L. Fixes C-M1, supports C-H3 and G-M2.

### 12. Strengthen the Person schema and entity graph
In `src/components/seo/JsonLd.tsx`:
- Add `@id` (e.g. `https://www.domenghini.com/#person`), `worksFor`/`founder` (Nannynow), `knowsAbout` (React, Next.js, TypeScript, accessibility, design systems, WebGL), and `image`.
- Fix `addressCountry` from `"UK"` to `"GB"`.
- Wrap the home graph in `ProfilePage` (`mainEntity` to the Person `@id`); link `WebSite` to the Person. No `SearchAction` (no site search).
- Reference the Person `@id` from each work `CreativeWork` `author`; add `dateModified` (reuse `SITEMAP_LAST_MODIFIED`), `keywords` (from `tags`), and `about` (client org).
- Effort: M. Fixes S2, S3, S5, G2, C-M4.

### 13. Add a FAQ block with FAQPage schema
On home or about: who/what/available/clients, each answer self-contained in 40-60 words.
- Effort: S-M. Fixes G-M2.

### 14. Add an explicit availability sentence and a "who is" sentence
- "Davide Domenghini is available for senior front-end contract and lead roles in London or remote, from discovery to deploy." Put it in About copy and llms.txt.
- Add a crisp third-person identity sentence early on home and as the Person schema `description`.
- Effort: XS-S. Fixes G-M3, C-M3.

### 15. Serve AVIF and trim image weight
- Add `images: { formats: ["image/avif", "image/webp"] }` to `next.config.ts` (no images block exists today).
- Verify `sizes` on the 236 KB Liberty Blume LCP image.
- Effort: S. Fixes P2, Images.

### 16. Lazy-init the WebGL hero and trim JS
- Gate the shader hero behind IntersectionObserver, pause off-screen, honour reduced-motion, dynamic-import with `ssr:false`.
- Use framer-motion `LazyMotion` + `m` API; code-split the shader off the critical path.
- Add `<link rel="preconnect" href="https://plausible.io" crossorigin>` in `src/app/layout.tsx`.
- Effort: M. Fixes P3, P4, P5.

### 17. Resolve the /lab indexability decision
- If `/lab` should rank: add `ROUTES.lab` to `src/app/sitemap.ts` and a minimal `CollectionPage` + `BreadcrumbList` schema.
- If not: set `noIndex: true` in its metadata.
- Effort: S. Fixes T6, S4, G-L3.

### 18. Audit home image alt text
- Give the 6 non-decorative home images descriptive alt (logos to brand name, work tiles to a short description); leave genuinely decorative ones empty.
- Effort: S. Fixes G-M4, Images.

---

## Low (backlog)

- **19.** Standardize the response-time claim (48h vs 24h vs one working day) across home, profile, and contact. (C-M5)
- **20.** Collapse duplicated client name in self-named work titles. (C-L1)
- **21.** Replace en-dashes in Liberty Blume copy with plain hyphens. (V7)
- **22.** Increase mobile tap-target heights to 44px min. (V6)
- **23.** `aria-hidden` the duplicate client marquee copies so extractors see one. (G-L2)
- **24.** Add source attribution to "By the numbers" stats. (G-L1)
- **25.** Add a supporting paragraph to the Estée Lauder page for the 40% metric. (C-L4)
- **26.** Verify no inferred/incorrect client names ship on `/lab`. (C-L2)
- **27.** Remove the `/styleguide` disallow from robots if the route is permanently gone. (T5)
- **28.** Optional: deploy an IndexNow key for Bing/Yandex. (T8)

---

## Suggested sequencing

1. **Now (XS, one sitting):** items 1, 2, 9, 10, 14. The host fix plus llms.txt plus the double-H1 fix plus availability copy are minutes of work for outsized signal gain.
2. **This week:** items 3, 4, 5, 6, 8 (the no-JS blank screen, LCP gating, headers, placeholder copy, mobile overflow).
3. **This month:** items 7, 11, 12, 13, 15, 16, 17, 18 (case-study depth, positioning page, schema enrichment, FAQ, performance, lab decision, alt text).
4. **Backlog:** items 19-28.

The single highest-leverage move is item 1: it is one line and lifts technical, content, schema, and GEO simultaneously.
