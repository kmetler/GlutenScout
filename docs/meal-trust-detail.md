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
| 2 | `/meals/:mealId` | Meal detail · safety profile · first reports · save |
| 3 | `/meals/:mealId/practices` | How each practice was checked |
| 4 | `/meals/:mealId/practices/:practiceKey` | One practice · evidence grouped by how it's known |
| 5 | `/meals/:mealId/history` | Last verified date and history |
| 6 | `/meals/:mealId/reports` | All reports · filter by reviewer type |

Unknown meals go to `/discover`; unknown practices go to the meal's practice list. Back on the meal page returns the way you came (e.g. to a reviewer's profile), falling back to Discover when opened from a link.

## Links to other sections
- **Contribute:** Write a report (`/contribute/report/meal?meal={id}`), Call ahead (`/contribute/call/{id}`), and each report's review screen (`/contribute/review/{reportId}`).
- **Account:** Save button (`toggleSaved`), report order (`applyReportOrder`), reviewer profiles (`/account/community/{id}`), Settings, and the badges help topic.
- **Discover:** Discover's cards link to `/meals/{meal.id}`. Directions use Discover's `openDirections()`.

## Left out on purpose
- Ingredient lists, menus, prices, hours, photos and sharing — insight #4 puts prep before ingredients, and the rest is ordinary restaurant-app content.
- An overall score or a "safe / not safe" verdict. The page shows evidence, dates and sources; the diner decides.
- Voting on reports from this section (see decision 8), comments and replies.
- Sorting reports by anything other than the Account setting.
