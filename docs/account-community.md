# Section D — Account & Community

How profiles, saved meals, community and help work in the GlutenScout prototype, and why.

- **Owner:** Person D · branch `feature/account-community`
- **Code:** [src/screens/account/](../src/screens/account/). Everything for this section lives in that folder: screens, example reviewers (`data.js`), saved settings (`accountStore.js`) and layout CSS (`account.css`).
- **Files changed outside the folder:**
  - `src/App.jsx`: two lines adding `/account` to `SECTION_SCREENS`, as the README asks every owner to do.
  - `src/data/store.jsx`: one new action, `updateProfile({ name, location })`, so the name set in Account appears on new reports. It changes only those two fields. Nothing else in the shared store changed.
- **Research insights addressed:** #3 *trust is peer-based* (Pyper's distrust of non-celiac reviewers), #2 *recency matters*, and the community-support theme from Pyper and Alondra.

---

## Decisions

### 1. Setup asks for the name on reports first
**Chosen:** Setup step 1 asks for a name (first name and last initial is enough) and home area, saved to the shared store with `actions.updateProfile`. Contribute already stamps new reports with `currentUser.name`, so reports show the real name from then on. Name and home area can be changed later in Settings.
**Why:** Reports are only as trustworthy as the person behind them; a name next to the reviewer type makes a report feel like it came from someone real.

### 2. Reviewer type is chosen with a plain description of each option
**Chosen:** Setup step 2 lists Celiac, Strict GF and Gluten-sensitive, each with one sentence saying who it's for. Saved with the shared `actions.setReviewerType`, so Contribute sees it right away.
**Why:** The tag is the trust signal on every report, so it's only useful if people pick the right one. Descriptions mean nobody has to remember what "Strict GF" means (recognition over recall).

### 3. Diners choose whose reports come first
**Chosen:** A "Whose reports come first" setting: *Celiac and Strict GF first* (default) · *Only Celiac and Strict GF* · *Newest first, everyone*. Set in setup step 3 and in Settings. Community already follows it.
**Why:** Pyper didn't trust reports from people without celiac disease. Rather than deciding for everyone, diners weight reports the way they already do in their head.

### 4. Changing reviewer type warns before matches stop counting
**Chosen:** If a verifier picks Gluten-sensitive, a notice explains before saving that their matches will be recorded but won't count. Account shows them as not verifying while their type is Gluten-sensitive.
**Why:** Error prevention. The shared peer-review rule (`reportStatus` in store.jsx) only counts matches from Celiac or Strict GF verifiers, so the warning describes exactly what will happen.

### 5. Past reports keep the name and type they were posted with
**Why:** A report records one visit by one person at one time. Both edit screens say so.

### 6. Saved meals point out old or disputed evidence
**Chosen:** A line under each saved meal: evidence older than 90 days, or practices that reports disagree about, with a *Call ahead* button. Those meals are listed first. Removing a meal shows *Undo*.
**Why:** Insight #2. A meal saved months ago may not be made the same way today.

### 7. Community shows who is behind reports, without chat
**Chosen:** Reviewers near you with type, report count, verifier status and newest report, filterable by type. A reviewer's page shows their reports and the reports they checked. The only social action is *Follow*, which lists that person first.
**Considered:** comments, messaging, groups.
**Why:** The rubric penalizes tangential features. Seeing *who* wrote a report supports peer-based trust directly. Help points to national celiac organizations and to a doctor or dietitian for wider support.

### 8. Help explains the trust model
**Chosen:** 8 searchable topics using the real badges, statuses and tags, each linking to the screens it describes.
**Why:** Badges and statuses carry a lot of meaning; Help lets test participants check what they mean without leaving the app.

### 9. Section D keeps its own saved state
**Chosen:** Report order, alerts, saved meals and follows are saved in `accountStore.js` (browser key `gs-account-v1`). Reviewer type, verifier status, name and location stay in the shared `useStore()`, because Contribute uses them on reports.
**Why:** To build this section without editing shared files. `useAccount()` needs no provider, so any section can use it.

---

## Screen map

| # | Route | Screen |
|---|---|---|
| 1 | `/account` | Account hub (setup prompt if no reviewer type yet) |
| 2 | `/account/setup` | Setup step 1 · name and home area |
| 3 | `/account/setup/type` | Setup step 2 · reviewer type |
| 4 | `/account/setup/order` | Setup step 3 · whose reports come first |
| 5 | `/account/setup/done` | Profile saved · how your name appears on reports |
| 6 | `/account/saved` | Saved meals · old/disputed evidence first · undo remove |
| 7 | `/account/community` | Reviewers near you · filter by type |
| 8 | `/account/community/:reviewerId` | Reviewer profile · follow · reports · reports checked |
| 9 | `/account/settings` | Settings · report order · alerts · reset account data |
| 10 | `/account/settings/type` | Change reviewer type (verifier warning) |
| 11 | `/account/profile` | Edit name and home area |
| 12 | `/account/help` | Help and FAQ · search |
| 13 | `/account/help/:topicId` | Help topic (8 topics) |

Unknown `/account/...` paths go to the hub. Later setup steps send you back to step 1 if it hasn't been done.

## Error prevention
- *Next* / *Save* stay disabled until the screen is complete, with a note saying what's missing.
- The name is required (24 characters at most) and the error says so in words.
- *Save reviewer type* and *Save changes* stay disabled until something changes.
- Removing a saved meal shows *Undo*; resetting account data asks first.
- Settings that save on tap say so.

## Test sessions
*Settings → Reset account data* restores saved meals, follows, report order and alerts. Name, home area, reviewer type and verifier status are reset by *My reports → Reset example data* (Section C).

---

## For other sections

```js
import { useAccount } from '../account/accountStore.js'
const { account, toggleSaved, toggleFollow } = useAccount()
// account.saved (meal ids) · account.following (reviewer ids) · account.reportOrder · account.alerts
```

**Section B — Meal trust detail**
- Save button: `<GhostButton icon="bookmark" label={saved ? 'Saved' : 'Save'} selected={saved} onClick={() => toggleSaved(meal.id)} />` with `const saved = account.saved.includes(meal.id)`.
- Report order: `import { applyReportOrder } from '../account/shared.jsx'`, then `applyReportOrder(reports, account.reportOrder)`. Keep conflicts in the safety profile whatever the setting.
- Reviewer names can link to `/account/community/{id}` (ids in `src/screens/account/data.js`).
- Saved meals link to `/meals/{mealId}`.

**Suggestions for the shared store (owner's call — not changed by this section)**
- Clearing `isVerifier` in `setReviewerType` when the new type isn't Celiac or Strict GF, so Contribute's hub matches Account.
- Having *Reset example data* also call `accountActions.reset()` from `accountStore.js`, so one button resets everything.

---

## Left out on purpose
- Login, passwords, email, account deletion — there are no real accounts.
- Messaging, comments, groups, friend requests, profile photos, points or rankings.
- Real alerts (the toggles are saved, nothing is sent).
- A theme setting (the switch is on Home).
