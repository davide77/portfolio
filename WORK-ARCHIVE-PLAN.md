# Plan: Home "latest 4" vs Work "all 6 + archive"

> Status: PLAN ONLY. Nothing here is implemented. Decisions locked 2026-05-19.
> Styling/visual work (cream/white/ink surface system, layout polish) is owned by a
> separate parallel task. This plan is **data layer only**; component/SCSS items are
> hand-off notes, not changes made by this plan.

## Locked decisions

1. Home shows the **4 latest by recency**: Liberty Blume, Nannynow, Striver.Football, Cheam Sports FC.
2. `/work` shows **all 6 case studies** (with descriptions), then the **29-image archive** below.
3. Estée Lauder EMEA and Bristol design system: `featured: false` (off home, still full case studies on `/work`).
4. Archive descriptions: the drafted table in Part D ships as the data; client names and ⚠ rows get corrected in-place in `archive-work.ts` afterwards.

## Constraints

- All edits confined to `src/constants/`. No `.tsx`, no `.scss` touched by this plan.
- Brand voice per `brand.md`: British spelling, no em/en dashes, sentence case, evidence over adjectives.

---

## Part A - Home = 4 latest, Work = all 6

Edit **`src/constants/content/projects.ts` only.**

- Set `featured: true` on: `liberty-blume`, `nannynow`, `striver-football`, `cheam-sports-fc`.
- Set `featured: false` on: `estee-lauder-emea`, `bristol-city-council`.
- No function signature changes:
  - `getFeaturedCaseStudies()` already filters `featured` + sorts by `order` -> returns the 4. Home `FeaturedWorkSection` keeps calling it untouched.
  - `getSortedCaseStudies()` already returns all 6. `/work` `WorkIndexClient` keeps calling it untouched.
- Add a guard comment above `CASE_STUDIES`:
  `// featured = appears on the home page (keep to 3-4). /work shows all case studies regardless of this flag.`

Result: home shows 4, `/work` shows 6, zero JSX changes, no collision with the styling task.

## Part B - `/work` renders existing descriptions (hand-off note)

Every case study already has populated `summary` and `brief`. `WorkIndexClient` currently
renders only `outcome` ([WorkIndexClient.tsx:70](src/components/sections/work/WorkIndexClient.tsx#L70)).

**Hand-off note for the styling task:** render `project.summary` as the card description
line (one brand-voiced sentence, already in the data). No new data required.

## Part C - Mount the orphaned archive (data + hand-off note)

`LegacyWorkGallery` ([src/components/LegacyWorkGallery.tsx](src/components/LegacyWorkGallery.tsx))
renders the 29 tiles but is imported nowhere.

**Data change (this plan):** rewrite `src/constants/content/archive-work.ts` to a typed shape:

```ts
export type ArchiveGroup =
  | "enterprise-saas"
  | "broadcast-streaming"
  | "automotive"
  | "retail-consumer"
  | "agency-loyalty";

export type ArchiveTile = {
  src: string;
  client: string;
  label: string;   // short title, sentence case
  blurb: string;   // one line, brand voice
  group: ArchiveGroup;
  layout: "wide" | "tall" | "default";
};
```

Groups (range demonstration, ties to `brand.md` "Range" pillar):

- **Enterprise SaaS campaigns** - SAP suite + SAP Concur
- **Broadcast & streaming** - Sky Sports, Sky VOD store, A+E history
- **Automotive** - Toyota, Renault, Honda
- **Retail & consumer** - Boux Avenue, card payments, Parrot, beauty prototype
- **Agency, loyalty & marketplaces** - ICLP, Momentum ABM, Driving.co.uk

**Hand-off note for the styling task:** import and mount `LegacyWorkGallery` at the bottom
of the `/work` page, below the case-study index; wire the new tile fields into its `.map()`
(one-line render change) and apply the group/blurb visual treatment.

## Part D - Drafted archive descriptions (correct in-place later)

⚠ = best guess from the pixels; fix client/label when convenient.

| File | client | label | blurb |
|---|---|---|---|
| a-01 | SAP | Oil & gas industry programme | Animated infinity-loop hero for an SAP industry innovation campaign. |
| a-02 | SAP | Marketing Cloud editorial | Long-form dark article page for SAP Marketing Cloud, aimed at consumer-goods leaders. |
| a-03 | SAP | Customer experience campaign | Bright editorial landing with dual call to action. |
| a-04 | SAP | Intelligent simplicity | Professional Services landing with brain illustration for B2B engagement teams. |
| a-05 | SAP | Digital future of banking | Portrait-led campaign hero with brand hashtag overlay. |
| a-06 | SAP | Time to transform | Particle-field hero for a digital transformation campaign. |
| a-07 | SAP | Identify the big opportunities | Cinematic scroll-through campaign page. |
| a-08 | SAP | Cloud expedition kit | SAP and AWS scroll-through microsite. |
| a-09 ⚠ | Beauty client (TBC) | Beauty app prototype | Annotated greyscale mobile UI wireframes for a beauty product app (2012). |
| a-10 | ICLP | Customer devotion | Loyalty and engagement agency site, "we drive customer devotion". |
| a-11 ⚠ | Sky (TBC) | VOD store front | Film detail and new-releases rail for a video-on-demand store. |
| a-12 ⚠ | Sky (TBC) | A to Z film catalogue | Full A-Z film grid for the same video-on-demand platform. |
| a-13 | Sky Sports | Sky Bet news module | Responsive red news tile. |
| a-14 | Renault | Guest host panel | Editorial "today's guest host" site module. |
| a-15 ⚠ | TBC | Cinematic promo tile | Dark editorial content tile. |
| a-16 | Toyota | Goodwood Festival of Speed | GT86 campaign tile. |
| a-17 ⚠ | TBC payments | Simple card payments | Phone-led marketing page for a card-payments product. |
| a-18 ⚠ | TBC | Local listings directory | "Set foot in our" directory page with embedded map. |
| a-19 | Sky Sports | Sky Sports news tile | Red news tile variant. |
| a-20 ⚠ | TBC | Cinematic promo tile | Dark editorial content tile (variant). |
| a-21 | Toyota | MyToyota x WWF | Environmental partnership panel. |
| a-22 ⚠ | A+E Networks (TBC) | The best of the ancient world | History documentary promo tile. |
| a-23 ⚠ | Parrot (TBC) | Audio device showcase | Product page for a Parrot audio device. |
| a-24 | Boux Avenue | Lingerie campaign | Retail campaign visual. |
| a-25 | SAP Concur | Global case-study globe | Interactive night-earth map, "explore our global case studies". |
| a-26 | Momentum | ABM consultancy | "The account based marketing consultancy" agency site. |
| a-27 | Honda | Civic: delivering the dream | Civic campaign / pitch creative. |
| a-28 | Driving.co.uk | Sell your car | Sunday Times Driving classifieds landing. |
| a-29 | ICLP | Customer devotion (nav open) | ICLP site with expanded side navigation. |

Layout rhythm: keep the existing bento cadence (wide / tall / default) or let the styling
task re-derive it per group.

## Files touched when this plan is executed

- `src/constants/content/projects.ts` - flip `featured` on 4/2, add guard comment.
- `src/constants/content/archive-work.ts` - typed shape + 29 entries + 5 groups.
- No component or SCSS files (hand-off notes only).

## Sequencing vs the parallel styling rewrite

Data changes merge independently. The two JSX hand-offs (render `summary` on `/work`,
mount `LegacyWorkGallery`) fold into the styling rewrite so the same files are not edited
by both tasks.
