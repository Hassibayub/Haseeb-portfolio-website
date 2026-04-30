# 13. /work Live Audit

**Status:** page ships, renders cleanly, most of the spec landed. Two critical blockers and roughly 10 polish issues.
**Surface:** `http://localhost:3000/work` at 1440×900 and 390×844.
**Method:** Playwright MCP. Screenshots + DOM inspection + console inspection + interactive tests (filter click, keyboard nav, case study link click-through).

This audit ranks findings by severity. Critical first. Nice-to-have last.

---

## 0. What's already right (don't touch)

Before the problems, credit what landed well:

- **Zero em dashes** in rendered body copy (grep confirmed).
- **Zero `→/←` glyphs** in buttons or links.
- **Surface alternation works**: cream hero/grid → dark WorkNumbers → dark FinalCTA → footer.
- **Hero stat strip renders** with real numbers (17K, $100K to $1.5K, 500K, $1.2M, 68K). Matches spec.
- **Filter pills visual treatment** correct: black-fill active, white-with-border inactive.
- **Bento hierarchy delivers on desktop**: Aphra wide (584px), FCS wide (584px), Sony xwide (884px). Rest 284px standard.
- **`auto-rows-[320px]`** holds card height consistent across the grid.
- **Mobile grid collapses to 1 col** correctly via `grid-cols-1 md:grid-cols-4`.
- **Metric chips render correctly** inside cards (e.g. `17K active users`, `9wk to launch`).
- **FinalCTA includes trust strip** below the button (`Reply within 24h · Taking 1 new project this month · Remote (UTC+5)`). Nice touch not in spec.
- **Filter pill count labels are accurate** (All (8), AI Product (2), etc).

Good baseline. Now the problems.

---

## 1. CRITICAL (ship blockers)

### 1.1 Every `/work/[slug]` destination is 404

**Severity:** Blocker. The whole page's job is to drive clicks into case studies. Clicks go to 404.

Tested:
- `/work/aphra` → 404
- `/work/sony-playstation` → 404

This means:
- `CaseCard` components are anchors (good).
- The `[slug]` dynamic route doesn't exist yet.
- MDX content from `02-CASE-STUDIES.md` isn't wired.

**Fix:** build `src/app/work/[slug]/page.tsx` with MDX rendering, per earlier plan. All 8 slugs need to resolve. Until they do, the `/work` page is a dead end.

Spec reference: this is already called out in `07-IMPLEMENTATION-PLAYBOOK.md` Task 7. It just hasn't been done. `/work` shipped before its dependencies.

### 1.2 Filter is broken when clicking non-"All" pills

**Severity:** High. Filter UI works (active state flips), but grid doesn't filter correctly.

Reproduction:
1. Click `Voice AI (1)` pill. Active state moves. Expected: 1 card (medmatch).
2. Actual: 5 cards render (medmatch, aphra, capwell, kcnl, tula).

DOM check confirmed 5 card links present in DOM when Voice AI is active, not 1.

**Hypothesis:** the category classification on cards is wrong, OR the filter logic matches on a partial/fuzzy field, OR the `All` filter isn't being cleared and Voice AI is additive.

**Fix:** inspect the filter predicate in `WorkGrid` or `WorkFilters`. Expected shape:

```ts
const visible = filter === 'all'
  ? caseStudies
  : caseStudies.filter(cs => cs.category === filter);
```

Confirm every case study has correct `category` in `case-studies-meta.ts`. Test each filter: each should show exactly the count in its pill label.

---

## 2. HIGH (polish, visible to every visitor)

### 2.1 Card covers are text placeholders using `underscore_case`

**Severity:** High. Every card shows a text label like `CS_1/APHRA`, `CS_2/MEDMATCH`, `CS_3/SONY-PLAYSTATION` on a gradient background. This violates the explicit v2 rule: no `underscore_case` in user-facing labels.

**Current state:**

```
CS_1/APHRA      CS_1/CAPWELL   CS_1/KCNL
CS_2/TULA       CS_2/MEDMATCH  CS_2/FCS
CS_3/BESTINFORM CS_3/SONY-PLAYSTATION
```

This is exactly the "junior-dev LARP" smell we killed on `/services`. It reads as developer shorthand on a sales page for non-technical founders.

**Fix (two paths):**

**Path A. Replace placeholder text with real cover images** (preferred).
- Source or generate 8 cover images.
- Filenames: `/public/covers/aphra.webp`, `/public/covers/capwell.webp`, etc.
- Size: 800×500 (wide), 600×500 (standard), 1100×500 (xwide Sony).
- Style: moody screenshots, product-in-context, or abstract per-brand accents. See 04A-ASSETS-NEEDED.md for prompts.

**Path B. If covers not ready, use a clean text treatment, not underscore_case.**
- Replace `CS_1/APHRA` with just `Aphra` or `Aphra.me` in Bricolage 28px weight 400, centered, `#F3F2F1` on the dark gradient. Keep the year in a corner: `2024`, mono small.
- No `CS_1/` prefix. No slash. No uppercase. No underscore.
- This is the temporary state until real imagery lands.

Either way, kill the `CS_` prefix. It isn't a branding system, it's a debug artifact.

### 2.2 `WorkNumbers` section repeats the hero stats verbatim

**Severity:** High. Reads as padding, not progress.

Spec wanted a **zoom-out** stat set that doesn't appear elsewhere on the page:

```
49       projects completed
100%     Upwork job success
$0       ad spend to get here
14       countries clients served from
```

Actual render:

```
17K         $100K to $1.5K    500K           $1.2M         68K
active      monthly LLM cost  records        raised        leads automated
users       handled
(APHRA)     (KCNL)            (CAPWELL)      (TULA)        (FCS)
```

These are the **exact same five stats as the hero**, re-presented on a dark surface with brand labels. The visitor sees `17K active users at Aphra` in the hero, then scrolls to `17K / active users / APHRA` on the dark interstitial. Déjà vu.

**Fix:** replace with the 4 zoom-out stats from spec. Real numbers only:

| Value | Label |
|---|---|
| 49 | Projects completed |
| 100% | Upwork job success |
| $0 | Ad spend to get here |
| X | Countries clients served from (pick a real count, or drop this stat) |

Or pivot to different cuts: avg engagement length, % fixed-price, number of rehires, years in operation. Whatever is real and different from the hero.

### 2.3 `Read case study` appears ONLY on the Sony xwide card

**Severity:** Medium-high. Inconsistent affordance.

Sony card has a visible `Read case study` text link bottom-right. The other 7 cards have no such affordance — the whole card is clickable but nothing indicates that.

Two cohesive options:

**Option A.** Remove `Read case study` from Sony. Every card is a whole-card link. No text affordance needed if the hover state communicates clickability.

**Option B.** Add `Read case study` to every card in the same position. Consistent.

I recommend **A**. The underline on `Read case study` is visual noise competing with the title. Make the whole card the CTA and let hover (lift + shadow) signal clickability. Add a small visual cue (tiny arrow icon appearing on hover, lime color) if you need the affordance explicit.

### 2.4 Hero headline crashes into navbar on narrower desktop

**Severity:** Medium. At 1440×900, the first viewport shows the nav pill overlapping the top of the "E" in "Eight systems." The headline starts too high and the pill sits on top of it.

This is the same issue as home. The nav is floating with low z-index in the stacking order, and hero top-padding isn't enough to clear it.

**Fix:** confirm hero `pt-[160px]` matches spec. If it does but nav still overlaps, bump to `pt-[192px]` on desktop or add a `scroll-margin-top` accommodation. Either way, the headline's first character should never be closer than 40px below the navbar's bottom edge.

### 2.5 Card hover state not subtle enough (needs verification)

**Severity:** Medium. Visual only — test in live browser, not screenshot.

Spec asked for: translateY -4px, shadow `0 12px 32px rgba(0,0,0,0.08)`, 220ms ease-out.

Can't verify hover in static screenshot. Dev should check that hovering a standard card lifts it gently (4px max) without feeling bouncy. If it scales or feels like a template, dial it back.

---

## 3. MEDIUM (hygiene)

### 3.1 `geist-latin.woff2` 404 still in console

Same error as home page. The default Geist font tries to preload and 404s. `geist` isn't actually used (we're on Bricolage + IBM Plex Mono).

**Fix:** remove any residual `@next/font` or `geist` references from `src/app/layout.tsx` or `globals.css`. Not page-specific, but it throws on every `/work` load.

### 3.2 Font preload warnings (5 of them)

Browser says 5 fonts are preloaded but not used within the first load window.

```
/_next/static/media/d3ebbfd689654d3a-s.p.woff2  preload unused
/_next/static/media/98e207f02528a563-s.p.woff2  preload unused
/_next/static/media/9d5a263311222317-s.p.woff2  preload unused
/_next/static/media/e6099e249fd938cc-s.p.woff2  preload unused
/_next/static/media/e4af272ccee01ff0-s.p.woff2  preload unused
```

Likely: Next is preloading all Bricolage subsets + all IBM Plex Mono subsets when the page only renders Latin. Wasteful bandwidth, hurts Lighthouse.

**Fix:** in `layout.tsx` `next/font` config, restrict to `subsets: ['latin']` only, or use `display: 'swap'` with `preload: false` for weights not used above the fold.

### 3.3 Dev "N" indicator shows in bottom-left

The Next.js dev tools dot floats bottom-left on every page. Not a bug; just noting this doesn't ship to production and shouldn't be visible in any shared screenshot.

### 3.4 Filter state lost on viewport resize

**Severity:** Low but strange. Clicked Voice AI, resized to 1440, filter reset to All.

This is probably because the mobile filter bar and desktop filter bar are separate React components with separate local state, and on viewport resize one mounts/unmounts while the other takes over. They don't share state.

**Fix:** lift filter state to a single parent or use `useState` in `WorkPage` passed down to both filter bars. Or use a single filter bar component that handles its own mobile/desktop styling.

Low priority because a real user doesn't resize mid-session. Still a correctness issue worth fixing when touching the component.

### 3.5 Footer email is outdated

Footer shows `miltech.haseeb@gmail.com`. This should be `haseeb@codewithhaseeb.com` once DNS/Resend is configured. Same for the FinalCTA trust strip.

Until the new domain email is live, leave as-is. Note this in a cleanup list.

### 3.6 Two copies of filter tabs in DOM (desktop + mobile)

`<button role="tab">` elements render twice (desktop flex row + mobile scrollable row, one hidden per breakpoint).

Works fine visually, but it means:
- 14 tabs in DOM instead of 7.
- Filter state lives in both, hence issue 3.4.
- Screen reader may announce duplicate tabs on edge cases.

**Fix:** single filter bar with responsive styling (flex-wrap on desktop, overflow-x-auto on mobile, via Tailwind breakpoint-modified classes on one element). Remove the duplicate.

### 3.7 Metric chip alignment inside cards

On the Aphra wide card, metrics wrap to 2 rows: `[17K active users] [9wk to launch]` on row 1, `[99.8% uptime]` on row 2. Looks fine. On Capwell and KCNL standard cards, metrics also wrap to 2 rows. That's intentional for 3 chips in 284px width.

**But on FCS wide card** (which has 3 chips), they render cramped. The card has room for 3 in one row but a line break forces them to 2 rows.

Small thing. Consider dropping FCS to 2 chips on the wide card for visual parity with other wide cards.

---

## 4. LOW (nice-to-haves)

### 4.1 Hero headline sits on 2 lines — could be 1 on wide screens

`Eight systems. Real metrics. No demos.` currently breaks after "metrics." at 1440px.

At 1920px it might fit on one line with better impact. At ≥1200px currently it's forced to wrap because of the `clamp(48px, 7vw, 88px)` settings.

Not a bug. Just test at 1600 and 1920 to see if it reads better single-line.

### 4.2 No hover preview for case study content

Cards link but don't preview. On Finns and other reference sites, a card hover sometimes reveals a preview thumb or pull-quote.

Not required. Flag only if the case study pages land and visitors aren't clicking through (GA4 data will show).

### 4.3 No sort control

Spec didn't call for one. Visitors might want to sort by year, by metric size, or alphabetically. If `/work` grows past 8 studies, add a sort dropdown. For 8, filter is enough.

### 4.4 `WorkNumbers` headline is bland

`What 8 projects add up to.` is serviceable but not sharp. Once the stats are replaced (issue 2.2), consider a stronger headline:

- `Since 2020. No ad spend. 49 projects.`
- `What five years of this adds up to.`
- `The receipts, in aggregate.`

Don't spend 30 minutes on this. A tweak.

### 4.5 Sony-Playstation slug

Sony card links to `/work/sony-playstation`. All others use single-word slugs (`aphra`, `fcs`, `kcnl`). Fine as a slug, but visually flag that URL structure is slightly heavier here.

Not a fix. Just an awareness note if you'd prefer `/work/sony` for brevity.

---

## 5. Accessibility quick-check

Ran through the basics:

- [x] Page `<h1>` is the hero headline. ✓
- [x] Sections have `<h2>`. ✓
- [x] Filter tabs have `role="tab"` and `aria-selected`. ✓
- [ ] Filter tabs don't have `role="tablist"` parent wrapper in all cases (worth verifying).
- [x] Card links are `<a>`, not divs. ✓
- [ ] Cover placeholders: the `CS_1/APHRA` text is likely the accessible label for the whole card. Screen reader will read "CS one slash aphra, real-time AI video avatar…". Replace text placeholder (issue 2.1) fixes this too.
- [ ] No visible focus ring on card hover (CSS `outline: none` likely applied globally, needs `focus-visible:ring` rescue).

**Action:** verify focus-visible rings on filter pills and cards using keyboard tab-through. If missing, add:

```css
.card:focus-visible {
  outline: 2px solid #1D2020;
  outline-offset: 3px;
  border-radius: 16px;
}
```

---

## 6. Spec compliance

| Spec section | Status |
|---|---|
| §3 page shell (Hero → Filters → Grid → Numbers → FinalCTA) | ✓ |
| §3 surface alternation (cream → dark → dark) | ✓ |
| §4.1 WorkHero with stat strip | ✓ |
| §4.2 WorkFilters pill styling | ✓ |
| §4.3 WorkGrid bento row plan | ✓ |
| §4.3 row 1: aphra wide, capwell, kcnl | ✓ |
| §4.3 row 2: tula, medmatch, fcs wide | ✓ |
| §4.3 row 3: bestinform, sony xwide | ✓ |
| §4.4 CaseCard anatomy (cover + meta + title + chips) | ✓ structure, ✗ cover imagery |
| §4.6 WorkNumbers content | **✗ wrong stats** (dupes hero) |
| §4.7 FinalCTA variant | ✓ |
| §5 components folder structure | unknown (not checked) |
| §6 SEO — JSON-LD `CollectionPage` | **unknown, likely missing** |
| §6 SEO — OG image route | **unknown, likely missing** |
| §7 accessibility focus rings | **likely missing** |
| §8 motion — card hover lift | needs manual test |
| §8 motion — filter AnimatePresence | filter is broken (issue 1.2), so can't evaluate |
| §9 responsive | ✓ structurally (1-col on mobile) |
| §10 analytics events | **unknown, likely not wired** |
| acceptance: covers exist | **✗** |
| acceptance: no underscore_case | **✗ (CS_1/APHRA etc)** |
| acceptance: WorkNumbers real and distinct | **✗** |
| acceptance: filter works per category | **✗** |
| acceptance: /work/[slug] resolves | **✗** |

5 acceptance criteria failed. 3 unknowns. Rest passed.

---

## 7. Priority fix order

If I had 4 hours to fix this page, ordered by impact per minute:

**Hour 1 — Unblock the user journey:**
1. Fix filter logic (issue 1.2). 20 min.
2. Rewrite `WorkNumbers` stats (issue 2.2). 20 min.
3. Fix card cover placeholders to clean text (issue 2.1 path B). 20 min.

**Hour 2 — Ship /work/[slug]:**
4. Scaffold `src/app/work/[slug]/page.tsx` with MDX. 60 min.
5. Drop first 2 case studies (Aphra, KCNL) as MDX. Fills the biggest links first.

**Hour 3 — Polish:**
6. Consolidate filter bar (issue 3.6). 20 min.
7. Hero top-padding fix (issue 2.4). 10 min.
8. Focus rings (§5 a11y). 15 min.
9. Remove `Read case study` from Sony or add to all (issue 2.3). 10 min.
10. `geist` + font preload cleanup (issues 3.1, 3.2). 10 min.

**Hour 4 — Assets or remaining MDX:**
11. Either: source/generate 8 cover images. Or: 4 more MDX case studies.

---

## 8. Summary for the user

**What's working:** the page structure is right, the spec landed on 70% of expected behavior, and it's visually competent. No brand violations (em dashes, arrows, underscore_case except the CS_ prefix).

**What's broken:**
1. Every case study link is 404. **Biggest issue**, makes the page a trap.
2. Filter doesn't filter correctly.
3. `CS_1/APHRA` cover placeholders break the brand rule.
4. `WorkNumbers` repeats the hero stats instead of adding new context.

**What's missing:**
- 8 case study cover images.
- 8 case study MDX pages at `/work/[slug]`.
- JSON-LD, OG route, analytics wiring.

**What to do now:** fix the 4 things in section 7 hour-1-and-2 before showing this page to anyone. The rest is polish.

---

**End of 13-WORK-LIVE-AUDIT.md**
