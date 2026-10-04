# Section C — Contribute & Verify

How reports are written, checked and confirmed in the GlutenScout prototype, and why it works that way.

- **Owner:** Person C · branch `feature/contribute-verify`
- **Code:** [src/screens/contribute/](../src/screens/contribute/) · shared state in [src/data/store.jsx](../src/data/store.jsx)
- **Research insights addressed:** #5 *calling ahead is still the most trusted method* and #6 *peer review builds trust over single reports* (see [Instructions.md](Instructions.md)).

---

## Decisions

### 1. Reports are written step by step, not on one long form
**Chosen:** 5 short steps — meal → kitchen practices → visit date and reviewer type → food rating and notes → check and submit.
**Considered:** one scrolling form.
**Why:** Each step asks one kind of question, so there's less to hold in mind, and the summary step lets people catch mistakes before submitting (error prevention, recognition over recall). It also gives usability testers clear points to comment on.

### 2. People say *how they know*, not just *what* they saw
**Chosen:** For each kitchen practice, reviewers pick **I saw it · Staff told me · Didn't happen · Not sure**. Each practice needs an answer, and "Not sure" counts.
**Why:** Insight #1 — trust needs the "how". Something a reviewer watched happen is stronger evidence than something staff said, so the two look different on the report (check vs. clock badge). "Not sure" stops people guessing; Mallory said she'd *"rather be told there's a risk than have someone guess."*

### 3. A report is confirmed by 2 matching celiac / strict GF verifiers
**Chosen:** A report stays **Pending** until 2 different verifiers whose reviewer type is Celiac or Strict GF tap *Matches my visit*.
**Considered:** any verifier regardless of type; any 3 people.
**Why:** Alondra described a peer-review model. Pyper didn't trust reviewers who don't have celiac disease, so only reviewers with the strictest needs can confirm. Gluten-sensitive diners can still write reports and flag conflicts; their matches are recorded but don't count.

### 4. One dispute is enough to mark a conflict
**Chosen:** If anyone taps *Something was different* and describes what they saw, the report becomes **Conflict** and goes to the moderation team. Matches can't outvote a dispute. Both reports stay visible.
**Why:** A risk someone saw should never be hidden by a majority — again, Mallory's "I'd rather be told there's a risk." Anyone can flag a conflict, not just verifiers, because a warning is useful no matter who gives it.

### 5. Submitted reports are saved in the browser
**Chosen:** Reports, votes, drafts and call answers are saved in `localStorage`, so they show up in lists and survive a reload.
**Considered:** simulating submission with fixed example data.
**Why:** Test participants see their own report appear as Pending, can confirm one, and can watch statuses change, which makes peer review feel real. Each tester's browser has its own copy, and **Reset example data** returns to the starting state between sessions.

### 6. The call-ahead script is tied to one meal
**Chosen:** The script is built from the meal's evidence. Questions about practices that are disputed or unconfirmed come first ("Ask about these first"), then the standard questions. What the restaurant said can be saved as a report.
**Considered:** one generic checklist.
**Why:** Insight #5 — calling ahead is how people decide today. Starting with exactly what's unclear makes the call short and useful. Saving the answers as a **Restaurant** report adds to the evidence without counting as a diner's own observation.

### 7. Stars rate the food only
**Chosen:** Food rating is optional, and the screen says stars are for the food, not gluten safety.
**Why:** Design-system rule — stars never signal safety. Kitchen practices carry the gluten information.

---

## Behavior

### Report lifecycle

| State | How it gets there | What people see |
|---|---|---|
| **Draft** | Picking a meal in step 1 | "Unfinished report" card on the Contribute hub with *Continue* / *Discard draft*. Answers are kept when leaving through the tab bar or the back button. |
| **Pending** | Submitting step 5, or saving a call-ahead report | Clock badge "Pending · n of 2 matches" |
| **Confirmed** | 2nd match from a different Celiac/Strict GF verifier | Check badge "Confirmed by 2 verifiers" |
| **Conflict** | Any *Something was different* submission | Triangle badge "Conflict · sent to moderation", plus the disputer's note and the date they ate there |

Status is never stored. `reportStatus()` in `store.jsx` works it out from the votes each time, so undoing a vote immediately changes the status back.

### Who can do what

| | Write a report | Call ahead | Match a report | Flag a conflict |
|---|---|---|---|---|
| Anyone | ✓ | ✓ | Recorded but doesn't count | ✓ |
| Verifier (Celiac / Strict GF) | ✓ | ✓ | ✓ Counts toward confirmed | ✓ |

- You can't vote on your own reports. Your vote can be undone.
- To become a verifier: reviewer type Celiac or Strict GF, plus agreeing to the guidelines (report only your own visit, date every visit, never call a meal "safe", flag rather than guess).
- Non-verifiers looking at a report see why their match won't count, and the main button becomes *Become a verifier*.

### How answers become claim badges

| Source | Answer | Badge |
|---|---|---|
| Visit | I saw it | ✓ *Practice* (confirmed) |
| Visit | Staff told me | 🕓 *Practice (staff said)* (unverified) |
| Visit | Didn't happen | ⚠ *Negative label*, e.g. "Shared fryer" (warning) |
| Visit / call | Not sure | left out |
| Phone call | Yes | 🕓 *Practice (restaurant said)* (unverified) |
| Phone call | No | ⚠ *Negative label* (warning) |

Practices and their questions are defined once in [src/data/practices.js](../src/data/practices.js). Every meal asks about the 4 core practices (separate prep area, gloves, fryer, utensils) plus any practice specific to that meal (e.g. separate wok, tamari).

### Call-ahead question order
1. **Ask about these first:** the meal's practices marked *conflict* ("Reports disagree") or *unverified* ("Not confirmed yet").
2. **Then ask:** "Can you make the {meal} today?", then the remaining practices.

Answers are saved as people tap, so switching to the phone app and back loses nothing. The "Will you order it?" choice on the results screen is not saved or shared — it's only there to prompt the decision.

### Error prevention
- *Next* stays disabled until each step is complete, with a note saying what's missing.
- Visit dates can't be in the future.
- A conflict needs at least one chosen claim and a description before *Send to moderation* is enabled.
- Discarding a draft and resetting example data both ask for confirmation.

### Reset example data
*My reports → Reset example data* clears your reports, votes, call answers, draft and verifier status, and brings back the seeded examples. Use it between usability-test sessions. Changes teammates make to `sample.js` only show up after a reset, because saved state takes priority.

### Seeded example states (for testing)
| Report | Meal | Starts as | Try |
|---|---|---|---|
| r1 Maya R. | Burger | Confirmed (2 matches) | — |
| r2 Devin T. | Burger | Pending 0/2 | Flag a conflict |
| r3 Priya S. | Tacos | Pending **1/2** | Become a verifier → match it → Confirmed |
| r4 Marcus W. | Rice bowl | Pending 0/2 | — |
| r5 Sam K. | Burger | Conflict | Read the dispute note |

---

## Screen map

| # | Route | Screen |
|---|---|---|
| 1 | `/contribute` | Contribute hub |
| 2 | `/contribute/report/meal` | Step 1 · pick the meal (`?meal=<id>` skips to step 2) |
| 3 | `/contribute/report/practices` | Step 2 · what did you see |
| 4 | `/contribute/report/visit` | Step 3 · visit date and reviewer type |
| 5 | `/contribute/report/rating` | Step 4 · food rating and notes |
| 6 | `/contribute/report/review` | Step 5 · check and submit |
| 7 | `/contribute/report/submitted?id=<id>` | Submitted — what happens next |
| 8 | `/contribute/call` | Call ahead · pick a meal |
| 9 | `/contribute/call/<mealId>` | Call-ahead script |
| 10 | `/contribute/call/<mealId>/result` | What did they say · save as report |
| 11 | `/contribute/review` | Peer-review queue |
| 12 | `/contribute/review/<reportId>` | One report · match / something was different / undo |
| 13 | `/contribute/review/<reportId>/conflict` | Describe the conflict |
| 14 | `/contribute/mine` | My reports · reset example data |
| 15 | `/contribute/verifier` | Become a verifier |

Steps 2–5 send you back to step 1 if there's no draft. Unknown `/contribute/...` paths go to the hub.

---

## Integration contract for other sections

**Section B — Meal trust detail**
- "Write a report" → link to `/contribute/report/meal?meal={meal.id}`.
- Pass `mealId` to `SafetyProfile` and its *Call ahead* button opens `/contribute/call/{mealId}`. Without `mealId` it opens the meal picker.
- Report statuses: `const { state, statusOf } = useStore()`, then `state.reports.filter(r => r.mealId === id)` and `statusOf(report)` → `{ status, matches }`. Show them with `<ReportStatus />`.
- The *View this meal* button after submitting links to `/meals/{mealId}`, so please use that route for meal detail.

**Section D — Account & community**
- The profile's reviewer type is `state.currentUser.reviewerType` (Celiac / Strict GF / Gluten-sensitive); change it with `actions.setReviewerType(type)`. Submitting a report also updates it.
- Verifier status is `state.currentUser.isVerifier`; link to `/contribute/verifier` to change it.
- "My reports" lives at `/contribute/mine` if you want to link to it from the profile.

**Everyone** — read and write shared data through `useStore()` (in `src/data/store.jsx`) rather than keeping copies in your screens.

---

## Left out on purpose
To keep the focus on meal-level evidence and peer review:
- Real phone calls (the call button opens the phone dialer with a made-up number) and call recording.
- Moderation tools — "sent to moderation" is the end of the flow for diners.
- Accounts, login and syncing reports between devices or testers.
- Photo uploads, comments and messaging between reviewers.
- Reputation points or badges for contributors.
