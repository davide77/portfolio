# Full SEO Audit: domenghini.com

Audited 2026-05-22 against the live site `https://www.domenghini.com`, cross-referenced with the source repo. Six specialist passes: technical, content/E-E-A-T, schema, performance, GEO/AI-search, and visual/mobile.

The live site matches the current revamp in this repo (identical metadata and hero copy), so this audit reflects what is shipping today.

---

## Executive summary

### SEO Health Score: 77 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 78 | 17.2 |
| Content Quality | 23% | 74 | 17.0 |
| On-Page SEO | 20% | 80 | 16.0 |
| Schema / Structured Data | 10% | 80 | 8.0 |
| Performance (CWV) | 10% | 72 | 7.2 |
| AI Search Readiness | 10% | 82 | 8.2 |
| Images | 5% | 75 | 3.8 |
| **Total** | | | **77** |

**Business type:** personal brand / freelance positioning for a senior front-end engineer (London, UK). Not a local-pack business, so Google Business Profile and citation factors do not apply. The AI-citation / entity-recognition path matters more here than classic local SEO.

### The headline: one bug undermines four categories

Every canonical tag, `og:url`, sitemap `<loc>`, and JSON-LD `url`/`@id` points to the bare host `https://domenghini.com`, but the site only serves on `https://www.domenghini.com` (the bare host 307-redirects to www). So every canonical signal points at a URL that immediately redirects to a different host. This single defect is flagged independently by the technical, content, schema, and GEO passes. It is a **one-line fix** (`SITE_URL` in `src/lib/seo.ts`) plus a Vercel redirect status change, and it lifts four categories at once.

### Top 5 critical / high issues

1. **Host mismatch site-wide** (Critical). Canonical, OG, sitemap, and all schema URLs use bare `domenghini.com`; the live host is `www`. Fix `SITE_URL` to `https://www.domenghini.com` and make the apex redirect permanent (308). See T1, C1, S1, G1.
2. **No-JS / pre-hydration paint is a blank dark screen** (Critical). A fixed full-viewport `page-transition__curtain` defaults to `opacity:1` and is lifted by JS. If JS fails, is slow, or is blocked, the visitor sees nothing even though the hero text exists in the DOM. See V1.
3. **Hero `<h1>` LCP is gated on JavaScript** (High). The headline words ship `opacity:0` inline and only paint after framer-motion hydrates, inflating LCP and risking a blank hero on slow connections. See P1, V2.
4. **Live site ships self-admitted placeholder copy** (High). Section 07 reads "Final site will replace these with named LinkedIn quotes...", and the Bristol artefact caption says "interim hero until design-system capture is added". This reads as unfinished and is quotable by AI crawlers. See C-H1.
5. **Four of six case studies are thin** (High). Nannynow, Striver, Cheam, and Bristol carry one short section and 1-2 points each (under ~150 unique body words), wasting strong proof like Bristol's 500k-resident WCAG 2.1 AA story. See C-H2.

### Top 5 quick wins

1. Change `SITE_URL` to `https://www.domenghini.com` (one line, fixes the site-wide host bug across canonical, OG, sitemap, and schema).
2. Publish `/llms.txt` (draft provided in the GEO section below). Highest-impact, lowest-effort AI-citation win for a personal brand.
3. Add the missing security headers via a `headers()` block in `next.config.ts`.
4. Demote the second homepage `<h1>` to `<h2>` (home currently has two H1s).
5. Add AVIF to `next.config.ts` images config (the site serves WebP only today).

---

## Technical SEO (78/100)

### Critical

- **T1. Site-wide host mismatch.** `https://domenghini.com/` returns 307 (temporary) to `https://www.domenghini.com/`, but canonical, `og:url`, sitemap `<loc>`, and all JSON-LD URLs use the bare host. Root cause: `SITE_URL = "https://domenghini.com"` in `src/lib/seo.ts:4`. Fix: set it to `https://www.domenghini.com` (propagates to canonical, OG, sitemap, robots, and schema in one change).
- **T2. Apex redirect is 307, not 308/301.** A temporary redirect tells crawlers the target may change and slows signal consolidation. Configure the apex to www redirect in the Vercel dashboard (Project, Domains) to issue a permanent 308. Verify with `curl -sI https://domenghini.com/`.

### High

- **T3. Incomplete security headers.** Live www responses send only `strict-transport-security: max-age=63072000`. Missing: `X-Content-Type-Options`, `X-Frame-Options` (or CSP `frame-ancestors`), `Referrer-Policy`, `Permissions-Policy`, and a CSP. HSTS lacks `includeSubDomains; preload`. Add a `headers()` block to `next.config.ts`. Start CSP in `Report-Only` (note Plausible at `plausible.io` and self-hosted `next/font`).

### Medium

- **T4. JSON-LD URLs inherit the host bug.** Resolved automatically by the T1 fix.
- **T5. `robots.txt` disallows `/styleguide`, which is already a 404.** Harmless but unnecessary. Optional cleanup in `src/app/robots.ts`.
- **T6. `/lab` is indexable but absent from the sitemap.** It self-canonicalizes with no noindex, yet `sitemap.ts` only emits home plus the six case studies. Decide: add `ROUTES.lab` to the sitemap (a `SITEMAP_LAST_MODIFIED["/lab"]` entry already exists) or set `noIndex: true` so the signals agree. Right now it is a borderline orphan.

### Low

- **T7.** Home canonical/`og:url` has no trailing slash while the served document is `/`. After T1, normalize the root to a single consistent form.
- **T8.** No IndexNow key (`/indexnow.txt` 404). Low value for a small site; optional.

### Confirmed healthy

- Old-URL redirects are permanent 308s (`/about` to `/#about`, `/work` to `/#work`, `/contact` to `/#contact`, `/archive` to `/lab`), single hop, defined in `next.config.ts`.
- Content is server-rendered: the hero `<h1>` and all work-page titles are in the initial HTML (`x-nextjs-prerender: 1`). Crawlers do not need to execute JS to read primary content.
- No mixed content, viewport meta correct, `<html lang="en-GB">` set, skip-link present, true 404 handling (no soft-200), no accidental noindex on in-scope pages.

---

## Content Quality and E-E-A-T (74/100)

Brand voice is deliberately confident (benchmarked against the "F*ck Being Humble" CV guide) and is on-brand, not a problem. The findings below are genuine clarity, credibility, and depth gaps only.

E-E-A-T breakdown: Experience 88, Expertise 86, Authoritativeness 62 (the weak axis), Trustworthiness 76.

### Critical

- **C1. Host mismatch (same as T1)** weakens the entity/trust signals the content otherwise earns. Fix `SITE_URL`.

### High

- **C-H1. Self-admitted placeholder copy is live.** Section 07 (`receipts.ts`): "Final site will replace these with named LinkedIn quotes. Until then, the evidence is the work." Bristol caption (`projects.ts:378`): "interim hero until design-system capture is added." Remove the meta-commentary; ship real attributed testimonials or reframe as "Selected proof" with no admission of incompleteness.
- **C-H2. Four thin case studies.** Liberty Blume (~387 words) and Estée Lauder (~209) are substantive. Nannynow (182), Striver (175), Cheam (173), and Bristol (168) carry one short section and 1-2 points each, well under the substantive-case-study floor. Bring all four up to the Liberty Blume shape: Constraints / Stack and architecture / Outcome with a measurable result line, plus 2-3 artefacts. Bristol's 500k-resident WCAG 2.1 AA story is the single best authoritativeness asset and currently lives in one sentence.
- **C-H3. No published rate, availability date, or third-party proof.** Authoritativeness is the lowest E-E-A-T axis. Add at least one attributable testimonial (name + company + `Review`/`Person` schema). Consider a rate band if targeting day-rate queries.

### Medium

- **C-M1. The planned positioning/comparison page is specced but not built.** `docs/seo/positioning-page/` defines the primary target `hire senior front-end engineer London`, an H1, a comparison matrix, a ~1,500-word spec, and `FAQPage` schema. None is live. This is the only asset targeting the stated primary buyer keyword and the strongest AI-citation play available. Build it as a standalone route.
- **C-M2. Home has two H1s.** Keep the hero positioning line as the single H1; demote the second to H2.
- **C-M3. Weak self-contained "who is" statement on the highest-authority surface.** The strongest identity sentence is split across hero and subhead. Add a crisp third-person-resolvable sentence early on home and a `description`/`knowsAbout` to the Person schema.
- **C-M4. No freshness signals.** No `datePublished`/`dateModified` in any schema; `period` fields exist in the data but are not surfaced as dates. Reuse `SITEMAP_LAST_MODIFIED` for schema dates.
- **C-M5. Conflicting response-time claims.** Home/profile says "Replies within 48h", contact page says "within 24 hours" and "within one working day". Standardize on one figure.

### Low

- **C-L1.** Work titles repeat the client name when title and client are identical (e.g. "Striver.Football · Striver.Football · Davide Domenghini"). Collapse to one instance.
- **C-L2.** `/lab` archive source notes some client names are inferred and marked TODO. Verify no incorrect client attributions ship publicly.
- **C-L4.** Estée Lauder page is image-heavy (7 artefacts) but light on prose. Add a short paragraph supporting the "40% dev-time reduction" metric so it is quotable.

### Working well

Named enterprise clients (Sky, Estée Lauder, Liberty Global, Bristol), concrete metrics (500k residents, 40% dev-time, WCAG 2.1 AA), real founder builds, clean per-page metadata, genuine trust infrastructure (real email, social profiles, address, schema), and human-sounding copy free of AI-tell phrasing and long dashes.

---

## On-Page SEO (80/100)

- Unique, well-formed titles and meta descriptions per page.
- Single H1 on all six work pages; **home has two H1s** (fix C-M2).
- Heading hierarchy is otherwise clean and extraction-friendly.
- Title-tag client-name duplication on self-named projects (C-L1).
- Canonical correctness is gated on the T1 host fix.
- Internal linking via the single-page anchor architecture plus `/work/<slug>` pages is coherent; old URLs 301 (308) to anchors.

---

## Schema / Structured Data (80/100)

Strong baseline: every page's JSON-LD parses cleanly, uses `https://schema.org`, no deprecated types, no relative URLs. The hypothesis that work pages lacked schema was wrong: each `/work/<slug>` emits a valid `CreativeWork` + `BreadcrumbList` graph. Source: `src/components/seo/JsonLd.tsx`.

| Page | Types |
|---|---|
| `/` | Person, WebSite (in a `@graph`) |
| `/work/<slug>` (x6) | CreativeWork, BreadcrumbList |
| `/lab` and `/lab/*` | none |

### Critical

- **S1. Host mismatch in all `url`/`item`/`image`/`author.url`** (same root as T1). Fixed by `SITE_URL`.

### Warning

- **S2. `Person` is incomplete.** Has name, jobTitle, email, url, sameAs, address. Missing `@id`, `worksFor`/`founder` (Nannynow), `knowsAbout` (skills), and `image`. Also `addressCountry` is `"UK"`; it should be the ISO code `"GB"`.
- **S3. No `ProfilePage` wrapper and no `@id` cross-linking.** Google supports `ProfilePage` for personal/creator profiles. Add it as the home top-level type with `mainEntity` referencing the Person `@id`, and link `WebSite` to the Person. Correctly no `SearchAction` (there is no site search).

### Info

- **S4. `/lab` has zero schema.** Add a minimal `CollectionPage` + `BreadcrumbList` referencing the Person `@id`. Low priority.
- **S5. Enrich work `CreativeWork`** with `dateModified` (reuse `SITEMAP_LAST_MODIFIED`), `keywords` (from existing `tags`), `about` (client org from `client` + `liveUrl`), and `author` as an `@id` reference to the home Person. `CreativeWork` is the correct type; do not switch to `Article`.

Recommended JSON-LD snippets for the enriched Person, ProfilePage wrapper, and CreativeWork are in the schema agent output and should be applied in `src/components/seo/JsonLd.tsx`.

---

## Performance / Core Web Vitals (72/100)

Measured over the wire from London (Vercel edge `lhr1`, cache HIT). A real Lighthouse/CrUX run was not obtainable (PageSpeed Insights API returned 429 throughout, no local Lighthouse). Byte/timing/format figures below are measured; CWV figures are reasoned estimates and labelled as such.

### Measured

| Signal | Home | Liberty Blume |
|---|---|---|
| TTFB (edge, cache HIT) | 83 ms | 44 ms |
| HTML (compressed) | 80 KB | 47 KB |
| JS transfer (compressed) | ~265 KB / 15 chunks | shares home chunks |
| JS uncompressed | ~868 KB | |
| Image format served | WebP (not AVIF) | WebP, LCP image 236 KB at w1920 |
| Reveal nodes shipped `opacity:0` | 50 (incl. hero h1) | 0 |
| Preconnect / dns-prefetch | 0 | 0 |

### Estimated CWV (mobile, mid-tier, derived, NOT a Lighthouse run)

- **Home LCP ~2.3-3.2s (borderline).** The hero h1 is JS-gated (`opacity:0` until framer-motion hydrates), the worst case for an animation-heavy hero.
- **Home INP ~150-280ms (borderline).** ~868 KB uncompressed JS plus a continuously running WebGL shader hero (rAF loop).
- **CLS likely good** (reveals use transform, not layout-shifting properties; hero reserves space) but verify against the splash-to-hero transition.
- **Liberty Blume is healthier**: LCP image correctly preloaded with responsive srcset, no JS-gated text, no shader hero.

### Optimizations

High: (P1) stop gating the hero h1 on JS (render visible by default, animate as progressive enhancement, honour reduced-motion); (P2) serve AVIF via `images.formats` in `next.config.ts`; (P3) lazy-init and pause the WebGL hero with IntersectionObserver and `prefers-reduced-motion`, dynamic-import with `ssr:false`.

Medium: (P4) add `preconnect` to `plausible.io`; (P5) trim JS with framer-motion `LazyMotion`/`m` API and code-split the shader off the critical path; (P6) shrink the 236 KB case-study LCP image with AVIF and verified `sizes`.

Already good: TTFB, prerendering, edge cache, async-only app JS, self-hosted fonts with preload + `display:swap`, correct LCP image preload on case studies, transform-based reveals with explicit image dimensions.

---

## AI Search Readiness / GEO (82/100)

Strong technical foundation: fully server-rendered, schema-rich, crawlable. All major AI crawlers return 200 (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Googlebot, Bingbot, CCBot). The open posture is correct for a personal brand chasing citability; do not add training blocks.

Platform scores: Google AI Overviews 84, Bing Copilot 83, Perplexity 82, ChatGPT 80.

### High

- **G1. www/apex entity inconsistency** (same root as T1). For entity disambiguation this is a real problem: the canonical/schema declare the apex as the entity home while the linkable URL is www. LLMs reconcile entities by matching the crawled URL against `url`/`sameAs`.
- **G2. No `@id` / weak entity-graph linkage.** Each page re-declares an anonymous Davide. Give the Person a stable `@id` and reference it from every CreativeWork `author`. Add `knowsAbout` and `worksFor`/`founder`.

### Medium

- **G-M1. Off-site brand-mention signals are the limiting factor**, not the site. Keep LinkedIn and a GitHub profile README verbatim-aligned with the site bio; answer relevant questions in dev communities under the same name. Ongoing.
- **G-M2. No FAQ / question-form headings and no `FAQPage` schema.** Add a short FAQ on home or about answering "Who is Davide Domenghini?", "What does he specialise in?", "Is he available for senior/contract work?", "What companies has he worked with?" in self-contained 40-60 word answers. Directly targets the stated query goals.
- **G-M3. Availability is implied, not stated as an extractable fact.** Add one explicit sentence: "Davide Domenghini is available for senior front-end contract and lead roles in London or remote, from discovery to deploy."
- **G-M4. Home images: 6 of 7 have empty alt.** Case studies and lab are fully alt-texted; home decorative treatment drops citable signal on logos and work tiles. Give the non-decorative ones descriptive alt.

### Low

- **G-L1.** Strong "By the numbers" stats lack source attribution.
- **G-L2.** The client name-drop marquee repeats 4-5x in the DOM; `aria-hidden` the duplicates so extractors see one copy.
- **G-L3.** `/lab` has no schema (same as S4).

### Missing: `/llms.txt`

`/llms.txt` and `/llms-full.txt` both 404. A complete draft is in the action plan and the GEO agent output, ready to drop at the site root.

---

## Images (75/100)

- Home: 6 of 7 images carry `alt=""` (decorative treatment); the rest of the site is fully alt-texted (Liberty Blume 4/4, Estée Lauder 9/9, lab 23/23).
- Format: WebP served, AVIF not offered (add `images.formats`).
- Loading: correct lazy-loading below the fold; case-study LCP image correctly eager + preloaded with responsive srcset.
- Largest image: 236 KB WebP at w1920 on Liberty Blume; AVIF would meaningfully shrink it.
- Source hygiene: photographic tiles stored as PNG sources then converted; prefer JPG/WebP/AVIF sources.

---

## Visual / Mobile (informs Performance and UX)

Captured with Playwright + Chromium at desktop 1440px and mobile 390px, plus reduced-motion, JS-disabled, and early-frame variants. Screenshots in `docs/seo/audit/screenshots/`.

Good news confirmed: the hero h1 is real, selectable text (not text-in-image) and is not stuck at `opacity:0` under normal conditions. Reduced-motion is handled correctly (instant resolve, no splash).

### Critical

- **V1. No-JS / pre-hydration paint is a fully blank dark screen.** A fixed full-viewport `page-transition__curtain` (z-index 500, `opacity:1`) is lifted by JS. With JS off/slow/blocked, the visitor sees nothing even though the hero exists. Default the curtain to `opacity:0` in CSS and animate in only when JS is present.

### High

- **V2. Full-screen intro splash delays real LCP.** The first painted frame is a "Davide Domenghini / 90%" splash; the real hero appears only after it plays out. Compounds with V1 and P1 on slow connections.
- **V3. Mobile hero headline overflows the fold.** At 390x844 the h1 box is ~316x898px, taller than the viewport; no CTA or supporting line visible without scrolling. Reduce mobile headline font-size/line-height.

### Medium

- **V4. 4px horizontal overflow on mobile home** (`scrollWidth` 394 vs `clientWidth` 390). Likely a decorative/canvas layer bleeding past the viewport. Case-study page is clean.
- **V5. CLS exposure from the splash-to-hero transition** (large structural delta between early and settled frames plus font swap). Verify font-display and that the hero container reserves final height.

### Low

- **V6. Mobile tap targets under 44px height** (logo 21px, several CTAs and footer links 21-36px). Increase vertical padding to 44px min.
- **V7. En-dashes in Liberty Blume copy** ("Multi–step", "03/2025 – present") violate the project no-long-dashes rule. Replace with plain hyphens.

---

## Method and caveats

- Live HTTP via curl and per-crawler user-agent spoofing; Playwright for visual capture; source inspection in the repo.
- No Lighthouse/CrUX field data (PSI 429 throughout). All CWV numbers are estimates from measured payload and clearly labelled. Re-run `npx lighthouse https://www.domenghini.com/ --output json` or PSI with an API key for authoritative 75th-percentile data.
- Crawl scope: home (single-page), six `/work/<slug>` case studies, `/lab`. This is the full indexable surface per the sitemap plus `/lab`.
