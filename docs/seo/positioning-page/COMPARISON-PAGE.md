# Positioning page: "Hire one senior owner, not a handoff chain"

> Planning deliverable. No code changed. Copy below is written to brand.md voice
> (British English, sentence case, no em/en dashes, no filler ban-list words,
> evidence over adjectives). Review, then decide whether to build.
> Last updated: 2026-05-22.

## What this page is

A positioning page that frames Davide against the four realistic ways a founder
or hiring lead gets a product's front end shipped:

1. A design agency or studio
2. A design-only freelancer (hands you Figma, you still need it built)
3. A dev contractor with no UX ownership (needs specs fed to them)
4. A full-time senior hire (slow to recruit, fixed headcount)

The argument is not "Davide is better than everyone". It is: **one accountable
senior owner who designs the UX and ships the build is the right call for a
specific situation, and here is exactly when it is not.** Honesty about when an
agency or a permanent hire wins is what makes the page credible (and keeps it on
the right side of the brand audit: no superlatives without evidence).

## Where it could live (architecture note)

The site is locked to `/` plus `/work/<slug>` (see single-page-architecture).
Two options if this is ever built, neither chosen yet:

- **Section anchor on home** (`/#work-with-me`), no new route, no architecture
  exception. Lowest friction. Weaker for ranking a distinct query.
- **One sanctioned route exception**, e.g. `/hire-a-front-end-engineer`. Better
  for targeting the comparison query as its own indexable doc. Needs the owner
  to approve breaking the single-page rule once.

Recommendation: if SEO is the goal, the standalone route earns its keep. If this
is purely a conversion aid for people already on the site, the anchor is enough.

---

## Title tag and meta

- **Title (route version):** `Freelance front-end engineer vs agency, freelancer or hire (2026)`
  (60 chars). Or, conversion-led: `Hire a senior front-end engineer who owns UX to deploy`.
- **Meta description:** `Weighing an agency, a design-only freelancer, a dev contractor or a full-time hire? Here is an honest comparison, and exactly when one senior owner who designs and ships is the right call.`
- **H1:** `One senior owner, from UX to deploy`
- **Sub-head:** `An honest look at the four ways to ship a product's front end, and when each one wins.`

---

## Section 1: Above the fold (summary + primary CTA)

**H1:** One senior owner, from UX to deploy

**Lead paragraph:**
> Most product front ends get built by a chain: a designer hands off to a
> developer, a developer hands off to whoever deploys, and someone manages the
> seams. I remove the seams. Twenty years shipping for Sky, Estée Lauder and
> Liberty Global, now leading frontend at Liberty Blume. I take the brief from
> first sketch to live deploy, and I am the one accountable when it ships.

**Primary CTA:** `Email Davide` (links `mailto` / `/#contact`)
**Secondary CTA:** `See selected work` (links `/#work`)

**Trust line under the fold:** `20+ years · WCAG 2.1 AA on every shipped flow · Lighthouse 90+ on production heroes · London / GMT`

---

## Section 2: The comparison at a glance (feature matrix)

Intro line:
> The same product can be shipped four ways. Here is where each option is strong
> and where it leaves a gap you have to fill yourself.

| What you are buying | Davide (one senior owner) | Design agency / studio | Design-only freelancer | Dev contractor (no UX) | Full-time senior hire |
|---|:---:|:---:|:---:|:---:|:---:|
| Owns UX **and** front-end build | ✅ one person | ✅ across a team | ❌ design only | ❌ build only | ✅ one person |
| Single accountable owner | ✅ | ⚠️ account-manager layer | ✅ | ✅ | ✅ |
| Ships to production (pipeline, deploy) | ✅ | ✅ | ❌ | ✅ | ✅ |
| Accessibility to WCAG 2.1 AA in the definition of done | ✅ (500k+ on bristol.gov.uk) | ⚠️ varies by team | ❌ not built | ⚠️ if specified | ⚠️ depends on hire |
| Senior judgement, day one | ✅ 20+ yrs | ⚠️ you get who is staffed | depends | depends | ✅ once ramped |
| Start this week, no recruitment lag | ✅ | ✅ | ✅ | ✅ | ❌ weeks to months |
| No long-term headcount commitment | ✅ | ✅ | ✅ | ✅ | ❌ permanent cost |
| Capacity to staff several streams at once | ⚠️ one person | ✅ | ❌ | ❌ | ⚠️ one person |
| Continuity after launch | ⚠️ engagement-based | ⚠️ retainer | ⚠️ | ⚠️ | ✅ |
| Typical cost model | day rate / fixed project | blended rate + overhead | day rate (design only) | day rate (build only) | salary + on-costs |

**Legend:** ✅ included · ⚠️ partial / depends · ❌ not covered

> Read the table honestly: an agency buys you capacity and redundancy, a
> full-time hire buys you continuity. What a single senior owner buys you is no
> handoff gap and one person to hold accountable, with senior output from week one.

---

## Section 3: When each alternative is the right call (the fair section)

This section is the credibility engine. It concedes real strengths and tells the
reader to choose the other option when it genuinely fits. Per brand audit: no
defamation, acknowledge strengths, evidence not adjectives.

### Choose a design agency or studio when

> You need several workstreams running in parallel, brand plus product plus
> campaign, with cover when someone is off. Agencies are built for breadth and
> capacity. The trade-off is the account layer between you and the people doing
> the work, and a blended rate that pays for that layer. If your bottleneck is
> throughput across many surfaces, an agency is the right tool.

### Choose a design-only freelancer when

> You already have engineers who can build, and what you are missing is the
> design itself. A strong product designer who lives in Figma is exactly right
> here. The gap to plan for: someone still has to turn those files into
> production code, and the fidelity you signed off is only as good as that
> translation. If your build team is solid, this works well.

### Choose a dev contractor (no UX) when

> The design is already settled and signed off, and you need hands to build it
> to spec. A capable front-end contractor will ship what they are given. The
> gap: they will not own the UX decisions, so the quality of the result tracks
> the quality of the spec you hand them. If your design is locked, this is
> efficient.

### Choose a full-time senior hire when

> The work is permanent and continuous, and you want someone in the team long
> term, owning the roadmap, mentoring, and the codebase after launch. A
> permanent senior IC is the right answer for ongoing ownership. The trade-offs
> are recruitment lead time (weeks to months) and a fixed headcount cost from
> day one. If the need is permanent, hire permanently.

### Choose one senior owner (me) when

> The brief needs design judgement and a production-grade build, and you want
> one person accountable from discovery to deploy without a handoff gap. That is
> the spot I am built for: a regulated 12-step lending journey at Liberty Blume,
> a consumer product at Nannynow, a council platform serving 500,000+ residents,
> all owned end to end. Senior output this week, no recruitment lag, no
> permanent headcount commitment.

---

## Section 4: The proof (evidence, not adjectives)

Pull real receipts. Each links to the relevant case study.

- **Regulated, end to end:** 12-step lending journey live at Liberty Blume.
  [View case study](/work/liberty-blume)
- **Full vertical ownership:** Nannynow built from API contract to live deploy.
  [View case study](/work/nannynow)
- **Accessibility at scale:** WCAG 2.1 AA on bristol.gov.uk, 500,000+ residents.
  [View case study](/work/bristol-city-council)
- **Performance:** Lighthouse 90+ on production hero pages, mobile, throttled.
- **Speed without rework:** 40% dev-time reduction across Squiz engagements.
- **Twenty years, 60+ brands:** Sky, Estée Lauder, Liberty Global, EE, Toyota,
  HSBC and more.

CTA after proof block: `Email Davide`

---

## Section 5: How I work (de-risk the "one person" objection)

The honest counter to "but it is just one person":

> The single-owner risk is real, so here is how I manage it. Everything ships
> behind a perf budget measured on every pull request, accessibility in the
> definition of done, and a design system in code so a team can pick up the work
> without re-litigating every spacing decision. The library is a product, with
> versioning and a changelog. When the engagement ends, you are not left with a
> black box. You are left with documented, type-safe, accessible code.

Three short proof tiles (no empty three-part list framing, these are concrete):

1. **Perf budget on every PR.** Measure, refuse the regression. Repeatable.
2. **Accessibility in the definition of done.** Keyboard pass, contrast, reduced motion.
3. **Design system in code.** Tokens mirrored across brand book, Figma, and SCSS.

---

## Section 6: Final recommendation + CTA

> If you need parallel capacity, hire an agency. If the role is permanent, hire
> permanently. If the design is done and you just need it built, a contractor
> will do. But if the brief needs senior design judgement and a production
> build, owned by one accountable person from first sketch to live deploy, that
> is the brief to send me.

**Primary CTA:** `Email Davide`
**Secondary CTA:** `See selected work`
**Reassurance line:** `Replies within 48h · London · GMT`

---

## Internal linking plan

- Out to case studies: `/work/liberty-blume`, `/work/nannynow`,
  `/work/bristol-city-council` (and `/work/estee-lauder-emea`,
  `/work/striver-football`, `/work/cheam-sports-fc` where relevant in the proof
  grid).
- Out to home sections: `/#work` (selected work), `/#about` (approach),
  `/#contact`.
- In from: the home About/approach section and the footer (a "Work with me"
  link). If built as a route, add it to the sitemap.
- Breadcrumb (route version only): Home > Work with me.

## Word count and structure targets

- Minimum 1,500 words of body copy (the matrix plus the six prose sections
  comfortably exceed this once written out).
- One focal column, generous spacing, strong typographic hierarchy (per brand
  design direction). No device frames, no icon grids.

## Brand audit pass (run before publishing)

1. Em-dashes / en-dashes: none. ✅ (this doc uses hyphens only)
2. British spelling: behaviour, optimise, colour. ✅
3. No non-English / bilingual UI. ✅
4. Banned words checked: no revolutionise, game-changer, synergy, unleash,
   elevate, leverage, cutting-edge, robust, seamless, intuitive, empower,
   world-class. ✅
5. Banned framings checked: no "It's not just X, it's Y", no empty three-part
   lists, no "In today's world", no "We're on a mission to". ✅
6. CTAs are verb-led and specific: "Email Davide", "See selected work",
   "View case study". ✅
7. No superlative without a receipt behind it. ✅
