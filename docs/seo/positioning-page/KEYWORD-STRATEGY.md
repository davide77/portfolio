# Keyword strategy: positioning / "work with me" page

> Planning deliverable. Last updated 2026-05-22. Volumes are directional signals,
> not measured numbers. Validate with the seo-dataforseo skill before committing
> to any primary target.

## Important reality check

This is a personal portfolio, not a SaaS product. There is no high-volume
`[Product A] vs [Product B]` term to win, and chasing one would put generic,
non-brand copy on the site (which the brand audit forbids). The realistic prize
is **mid-funnel buyer-comparison and local-hire intent**: people deciding *how*
to get a front end shipped, and people searching for a senior front-end hire in
London. Treat this page as a conversion asset that also captures that intent,
not as a traffic play.

## Live SERP landscape (WebSearch, 2026-05-25, UK terms)

Directional only: who currently ranks, not volume or difficulty. Pulled via
WebSearch (US-skewed index) pending the DataForSEO extension for measured UK data.

- **`hire senior front-end engineer London`** is owned end to end by marketplaces
  and job boards: Toptal, Upwork, Arc.dev, Webflow, Indeed, LinkedIn, Totaljobs,
  Glassdoor. A single personal domain will not rank organically here. Treat this
  as a paid/profile term, not an organic target. (Reference surfaced: average
  London senior front-end salary ~£82,499, a real anchor for the page's
  full-time-hire cost column.)
- **`front-end developer who can design`** surfaces individuals, not platforms:
  michaelpumo.com (18+ yrs, Figma, accessible), ryangittings.co.uk,
  johnkavanagh.co.uk (front-end architecture + React/TS), thelonelypixel.co.uk.
  This is the winnable niche. Critically, these competitors position as
  brochure/marketing-site designer-developers. None lead with regulated,
  enterprise, end-to-end product proof, which is exactly Davide's gap to own
  (Liberty Blume 12-step lending, bristol.gov.uk at 500k+).
- **`design agency vs freelance developer`** is owned by agency and freelancer
  blogs (Dribbble, Medium, agency sites). They confirm the page's framing:
  agency = parallel capacity and post-launch maintenance; freelancer = lower
  cost but risk of walking away after launch. Hard to top organically, but the
  page's "how I work" section already answers the maintenance objection they
  raise.

## Primary keyword (revised after SERP look)

- **`front-end developer who can design` / `designer who can code`** (the
  winnable niche where individuals rank, and where Davide's end-to-end +
  regulated/enterprise proof differentiates him from the brochure-site
  freelancers currently ranking).
- `hire senior front-end engineer London` stays a **conversion / paid** term,
  not an organic primary, because marketplaces own the organic SERP.

## Secondary keywords

| Keyword | Intent | Competition signal | Fit |
|---|---|---|---|
| `freelance front-end developer London` | Hire | Medium | Strong |
| `front-end developer who can design` | Comparison | Low-Med | Strong |
| `designer who can code` | Comparison | Medium | Strong |
| `agency vs freelance web development` | Comparison | Medium | Good (Section 3) |
| `freelance developer vs agency` | Comparison | Medium | Good |
| `fractional front-end lead` | Hire | Low | Good |
| `freelance product engineer UK` | Hire | Low | Good |
| `hire React Next.js developer London` | Hire | Medium | Strong |

## Long-tail opportunities

- `should I hire an agency or a freelance developer` (maps directly to the FAQ)
- `freelance front-end engineer who ships to production`
- `accessible front-end developer WCAG hire`
- `senior front-end contractor UK day rate` (note: only target if a rate or rate
  band is actually published; otherwise the page underdelivers on the query)
- `Next.js developer for regulated fintech` (Liberty Blume proof supports this)
- `front-end engineer end to end product` 

## Title and H1 (carried from COMPARISON-PAGE.md)

- Title: `Freelance front-end engineer vs agency, freelancer or hire (2026)`
  or conversion-led `Hire a senior front-end engineer who owns UX to deploy`.
- H1: `One senior owner, from UX to deploy`.
- Keep H1 under 70 characters and in sentence case (brand rule).

## Content gaps vs how the rest of the site reads

The home page sells Davide narratively, section by section. It does **not**
currently answer the buyer's explicit comparison question ("why you and not an
agency / a permanent hire / a cheaper contractor"). That objection-handling
content is the gap this page fills. Specifics the page adds that the site lacks:

1. A like-for-like comparison table across the four hiring options.
2. Honest "choose the alternative when..." guidance (builds trust, earns AI
   citations, answers the actual decision).
3. FAQ content structured for AI Overviews and the FAQPage schema.

## GEO / AI-citation notes

- The "when each alternative wins" section is written as self-contained,
  citable passages. That format is what AI Overviews, Perplexity and ChatGPT
  pull. Keep each answer answerable in isolation.
- The FAQPage schema mirrors the on-page Q&As verbatim. Keep them in sync.
- Run the seo-geo skill on the drafted page before publishing to score
  passage-level citability and AI-crawler accessibility.

## Recommendations

1. **Lead the page on differentiation, not the head term.** The SERP look shows
   the broad hire term is marketplace-owned. Win instead on "designer who can
   code" intent by foregrounding the one thing the ranking individuals lack:
   regulated, enterprise, end-to-end product delivery (Liberty Blume,
   bristol.gov.uk). That proof is the wedge, not the geo head term.
2. **Decide route vs anchor first** (see COMPARISON-PAGE.md). It changes the
   title, the schema `@id`s, the breadcrumb and whether it enters the sitemap.
3. **Do not fabricate ratings.** Add `Review` / `AggregateRating` schema only
   when real, attributable client testimonials exist. Until then the Person +
   Service + FAQPage graph is the honest maximum.
4. **Validate volumes** with seo-dataforseo (UK, location 2826) before locking
   the primary keyword. The SERP look ranked the targets qualitatively; volume
   and difficulty still need the live data to size the prize.
5. **Add a "Work with me" link** from the home approach section and the footer
   so the page has internal entry points.
6. **Quarterly review** of the comparison table and the "(2026)" in the title,
   per the skill's update cadence.

## New comparison-page opportunities (future, optional)

- A focused `/work/liberty-blume`-adjacent angle: "regulated fintech front-end,
  what changes" (supports `Next.js developer for regulated fintech`). This is
  editorial, not a hire-comparison, so it would belong in a writing/blog surface
  if one is ever added, not on this page.
