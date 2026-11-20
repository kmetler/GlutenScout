# Section B — Meal Trust Detail

How a meal's evidence is shown in the GlutenScout prototype, and why. This is the core value proposition: *confidence in every meal*.

- **Owner:** Person B · branch `feature/meal-trust-detail`
- **Code:** [src/screens/meals/](../src/screens/meals/). Screens, the evidence rules (`evidence.js`), shared pieces (`shared.jsx`) and layout CSS (`meals.css`) all live in that folder.
- **Files changed outside the folder:**
  - `src/App.jsx`: two lines adding `/meals` to `SECTION_SCREENS`.
  - `src/data/practices.js`: one new field per practice, `why` — a sentence on how skipping the practice lets gluten in. Nothing existing changed.
- **Research insights addressed:** #1 *show the "how"*, #2 *recency matters*, #3 *trust is peer-based*, #4 *cross-contamination is the real risk*. It also shows the result of #6 (*one report isn't proof*) wherever a report appears.

---

## Decisions

### 1. The meal page leads with the safety profile, not the reviews
**Chosen:** Photo → name, food rating, *Save* and *Directions* → **Safety profile** (last verified date, precaution badges, sources, conflict in words, Call ahead) → **Look closer** (the same evidence *by practice*, *by date* or *by diner*) → latest reports. *Ate this? Write a report* is in the sticky `ActionBar`, so it's visible without scrolling. This is the page order in DESIGN.md.
**Why:** Every screen answers "can I eat here, and how sure are we?". The evidence is the answer; reports are the support for it. The food rating stays small and says "Stars rate the food, not how gluten is handled."
Team feedback said "How each practice was checked", "Verification history" and "Reports" felt similar and unclear. They are the same evidence sorted three ways, so the page now says exactly that, and each sub-screen is titled to match (*Evidence by practice / by date / by diner*).

### 2. Each kitchen practice has its own evidence screen
**Chosen:** *How each practice was checked* lists every practice asked about for the meal (the 4 core ones plus any specific to the dish). Tapping one shows every dated piece of evidence about it, grouped by **how it's known**: *Diners saw otherwise* → *Diners saw it happen* → *Staff said so*.
**Considered:** badges only, with the detail left in the review text.
**Why:** Insight #1 — a label isn't enough, people want the "how". Something a diner watched is stronger than something staff said, so they're never mixed. "Saw otherwise" is first because Mallory would *"rather be told there's a risk than have someone guess."*

### 3. Practices nobody has reported on are still listed
**Chosen:** A practice with no evidence shows a clock badge, "Not confirmed yet · No reports yet", and its call-ahead question.
**Why:** A missing badge reads as "fine". Showing the gap is more honest, and it gives the diner the exact question to ask (insight #5).

### 4. Disputed and unconfirmed practices come first
**Chosen:** The practice list is ordered Reports disagree → Not confirmed yet → Confirmed.
**Why:** The thing most likely to change someone's decision shouldn't be below the fold.

### 5. Every date comes with its age, and old evidence is called out
**Chosen:** "Last verified Sep 12, 2026 · 24 days ago". Past 90 days (the same limit Saved meals uses) a line above the safety profile says so and points to calling ahead.
**Why:** Insight #2. A date alone makes people do arithmetic; the age is what they actually weigh.

### 6. Verification history shows what moved the date and what didn't
**Chosen:** A timeline, newest first, of restaurant answers, reports, matches and disputes, each with reviewer type and status. A notice explains the rule: a report moves "last verified" once another verifier's visit matches it; unmatched and disputed reports are listed but don't move it; with no such report, it's the date the restaurant last updated its answers.
**Why:** Insight #6 — a single report isn't proof — applied to the date itself. Seeing a newer pending report *below* an older "last verified" date is the point.

### 7. Reports show reviewer type, claims and peer-review status together
**Chosen:** Each report is the shared `ReviewCard` (name + reviewer-type tag, visit date, food stars, text) followed by its claim badges, its `ReportStatus`, and any dispute in words. Reports follow the diner's *Whose reports come first* setting from Account; the full list can be filtered by reviewer type only.
**Considered:** sort and filter by rating, helpfulness, date.
**Why:** Insight #3 — Pyper weighs a report by who wrote it. One filter keeps attention on that.

### 8. Reading happens here; checking happens in Contribute
**Chosen:** `ReviewCard`'s built-in Helpful / Matches / Conflict buttons are turned off. Each report links to its Contribute review screen ("Ate this too? Check this report"), where matching and disputing follow the verifier rules.
**Why:** One place for peer review, so the rules (who counts, undo, conflicts) can't differ between two screens.

---

## How evidence is worked out

Nothing is stored for this section. `evidence.js` reads the shared reports and votes each time, so a report or dispute made in Contribute appears here immediately.

| Source | Becomes |
|---|---|
| Report claim, e.g. "Dedicated fryer" | *Saw it* |
| Claim ending "(staff said)" / "(restaurant said)" | *Staff said so* |
| Negative claim, e.g. "Shared fryer" | *Saw otherwise* |
| Dispute vote naming a claim | *Saw otherwise*, with the disputer's note |

- The **badge state** of a practice (confirmed / conflict / unverified) and the **last verified date** come from the meal in `sample.js`, the same values `MealCard`, Saved meals and the call-ahead script use, so every screen agrees. A practice the meal doesn't list is shown as not confirmed.
- The safety profile's **source lines** are counted from the reports actually listed, so the numbers match what's on the page.
- Known limit: because the summary state and date are example data, a tester's own match or report changes the evidence lists, history and counts, but not the badge state or the last verified date.

## Screen map

| # | Route | Screen |
|---|---|---|
| 1 | `/meals` | Redirects to Discover (one tab for finding meals) |
| 2 | `/meals/:mealId` | Meal detail · **safety check** (status line, one row per practice, Call ahead when anything is open) · reports · save |
| 3 | `/meals/:mealId/practices/:practiceKey` | One practice · evidence grouped by how it's known |

`/meals/:mealId/practices`, `/history` and `/reports` redirect to the meal page. The status line comes from `safetyStatus()` in `src/screens/discover/shared.jsx`, which the meal cards also use, so a card and its meal page always say the same thing. Code: `SafetyCheck.jsx`.

Unknown meals go to `/discover`; unknown practices go to the meal's practice list. Back on the meal page returns the way you came (e.g. to a reviewer's profile), falling back to Discover when opened from a link.

## Links to other sections
- **Contribute:** Write a report (`/contribute/report/meal?meal={id}`), Call ahead (`/contribute/call/{id}`), and each report's review screen (`/contribute/review/{reportId}`).
- **Account:** Save button (`toggleSaved`), report order (`applyReportOrder`), reviewer profiles (`/account/community/{id}`), Settings, and the badges help topic.
- **Discover:** Discover's cards link to `/meals/{meal.id}`. Directions use Discover's `openDirections()`.

## Left out on purpose
- Menus, prices, hours, photos and sharing — ordinary restaurant-app content. (Ingredient lists were left out at first because insight #4 puts prep before ingredients; user testing changed that, see below.)
- An overall score or a "safe / not safe" verdict. The page shows evidence, dates and sources; the diner decides.
- Voting on reports from this section (see decision 8), comments and replies.
- Sorting reports by anything other than the Account setting.

---

## Changes after user testing (confidence to order)

**Finding.** In the 29-person test, GlutenScout raised confidence about ordering a safe meal less clearly than it raised trust. Asked "What would you still want to know before ordering that meal?", most participants named ingredients, sauces, seasonings, marinades or flour/breading (e.g. "I'd also verify that there's no soy sauce on the salmon, since it often has wheat in it"). Only 5 said they needed nothing more.

1. **Ingredients & hidden gluten, on every meal page.** Directly below the safety check: the meal's main ingredients, then the higher-risk components (sauces, seasoning blends, marinades, flour/breading, oils and fryer use). Each has a status in icon + words: *Gluten-free confirmed*, *Contains gluten* (with how to order around it, e.g. "Ask for none") or *Unknown – ask staff* (with a question to ask). Each status says where it came from and when: "Listed by restaurant, {date}" or "Reported by 2 celiac diners, {date}", and a single diner's word gets "needs more reports" like the safety check. Code: `src/screens/meals/Ingredients.jsx`.
2. **Ingredient summary on meal cards.** Discover, Search and restaurant pages show "Ingredients: all confirmed", "2 to ask about" or "1 contains gluten" so diners can see whether questions remain. Code: `ingredients` prop on `MealCard`, `ingredientSummary()`.

Example data: `INGREDIENTS` in `src/data/ingredients.js`, one entry per meal. Restaurant-listed items use the date of that meal's "Restaurant answers" source in `sample.js`. The strictness filter doesn't recount ingredient reports yet; reviewer types are shown in the source line instead.
