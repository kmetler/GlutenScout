# Section A — Discover & Browse

How people find meals in the GlutenScout prototype, and why it works that way.

- **Owner:** Person A · branch `feature/discover-browse`
- **Code:** [src/screens/discover/](../src/screens/discover/). Screens, ranking rules (`evidence.js`), saved settings (`discoverStore.js`) and layout CSS (`discover.css`) all live in that folder.
- **Files changed outside the folder:**
  - `src/App.jsx`: two lines adding `/discover` to `SECTION_SCREENS`.
  - `src/data/sample.js`: five more example meals, a `restaurantId` on every meal, and a `restaurants` list with `findRestaurant()` and `mealsAt()`. Existing meals and reports are unchanged. The new meals only use practice keys already in `practices.js`, so Contribute's report and call-ahead flows work for them too.
- **Research insights addressed:** Pyper wanted to sort by verification strength and recency (#2 *recency matters*); #1 *show the "how"*; #4 *cross-contamination is the real risk*; Mallory's *"I'd rather be told there's a risk than have someone guess."*

---

## Decisions

### 1. Meals are the results, not restaurants
**Chosen:** Discover opens on a list of meals. Restaurants are one tap away (Meals / Restaurants chips), but a restaurant page is just a list of its meals, each with its own evidence. There's no restaurant-level score anywhere.
**Considered:** a restaurant list first, like Yelp.
**Why:** The core value proposition is "confidence in every meal — not just the restaurant." A kitchen can handle one dish carefully and another not (Juniper Grill's salmon has 3 confirmed practices; its burger has a fryer dispute).

### 2. Default sort is "Strongest evidence"
**Chosen:** Three sorts: *Strongest evidence* (default), *Most recently verified*, *Closest*. Strongest evidence = practices confirmed by diners minus practices reports disagree on. Ties go to the most recently verified meal.
**Why:** Pyper asked for exactly this. The rule is simple enough to explain in one sentence on the *How is this sorted?* screen, so nobody has to trust a hidden score.

### 3. Every result says its evidence in words
**Chosen:** Inside each shared `MealCard` (its `evidence` line, in place of the plain "Last verified" line), one line with icon + words: a disagreement first ("Reports disagree about the fryer · verified 24 days ago"), then old evidence ("Last verified 217 days ago — call ahead before you go"), then nothing confirmed ("Only the restaurant's word so far · verified …"), otherwise "3 of 3 practices confirmed by diners · verified 4 days ago". Every version carries the age.
**Why:** `MealCard` only shows 2 badges, so a disputed third practice could be missed. The line makes the most important fact visible without opening the meal, and never relies on color alone (design rule 5). Putting it inside the card (instead of under it) removed one line per result after team feedback that cards felt busy.

### 4. Disagreements are never hidden
**Chosen:** No "hide meals with disagreements" filter. Requiring a practice only matches meals where diners *confirmed* it, so disputed practices don't count, but the meal still appears in the unfiltered list.
**Why:** Mallory: "I'd rather be told there's a risk than have someone guess." Hiding a dispute would make the list look cleaner than the evidence is.

### 5. Quick filters on the list, full filters on their own screen
**Chosen:** Chips on Discover toggle the three most common filters in one tap (Within 2 mi · Verified this month · Dedicated fryer). The *Filters* screen has everything: last verified (any / this month / 90 days), required practices, distance. Changes on that screen aren't applied until *Show n meals*, and the button shows the live count.
**Why:** Visibility of system status and error prevention: people see how many meals they'll get before applying, and *Show* is disabled with a note when nothing matches. *Cancel* and *Reset* make it easy to back out. Filters are ordered evidence-first (recency, practices, then distance).

### 6. The tour is optional and skippable
**Chosen:** A *New here?* card on **Home** offers a 3-step tour (rate meals not restaurants → how to read the badges → set your location). *Not now* dismisses it; every tour step has *Skip*. It can be replayed from *How is this sorted?*.
**Why:** The rubric requires skippable onboarding, and test participants shouldn't be forced down one path. The tour's content is the same trust model the rest of the app uses. It moved from Discover to Home so Discover's space goes to meals.

### 6a. Discover's top is compact; search is the main action
**Chosen:** One heading ("Find meals you can check before you go"), then the search bar, sticky while scrolling, with a `brand-ink` outline and icon and `shadow-raised`, then one line with the location and a *Browse by restaurant / by meal* switch, then a single chip row (Filters · Sort · quick filters). No separate screen header.
**Why:** Team feedback: too much chrome above the results, and the search didn't stand out. More meals now show above the fold, and the search bar is the most prominent element on the screen.

### 7. One place to type
**Chosen:** The search bar on Discover opens the Search screen. Search matches dish, restaurant, cuisine and practice names ("fryer" finds meals with a fryer badge). Recent searches and suggestions are tappable chips (recognition over recall). Results use the current sort.

### 8. Location is a simple area picker
**Chosen:** *Use my current location* or pick/type an area. A notice says the example meals and distances are the same for every area in this prototype.
**Why:** Being honest that it's lo-fi, without building map or GPS features that aren't the core idea.

### 9. Section A keeps its own saved state
**Chosen:** Location, sort, filters, tour status and recent searches are saved in `discoverStore.js` (browser key `gs-discover-v1`), same pattern as Account's `accountStore.js`.
**Why:** So filters survive moving between tabs (non-linear navigation) without editing the shared store.

---

## Screen map

| # | Route | Screen |
|---|---|---|
| 1 | `/discover` | Discover · meals ranked by evidence · quick filters |
| 2 | `/discover/search` | Search · recent and suggested searches · meal and restaurant results (`?q=`) |
| 3 | `/discover/filters` | Sort and filter · live count · reset / cancel |
| 4 | `/discover/how-sorted` | How meals are sorted · what the badges mean · replay tour |
| 5 | `/discover/restaurants` | Restaurants · closest first · meal count and disagreements |
| 6 | `/discover/restaurants/:restaurantId` | One restaurant · call · directions · its meals with their own evidence |
| 7 | `/discover/location` | Set location |
| 8 | `/discover/welcome` | Tour step 1 · rate meals, not restaurants |
| 9 | `/discover/welcome/evidence` | Tour step 2 · how to read the evidence |
| 10 | `/discover/location?tour=1` | Tour step 3 · where are you eating |

Unknown `/discover/...` paths go to Discover. Unknown restaurant ids go to the restaurant list.

## Error prevention and status
- *Show n meals* shows the result count live and is disabled when nothing matches, with a note saying what to change.
- Active filters are listed in words above the results, with *Clear filters*.
- Empty search and empty filter results say what to try next.
- Typing an area that doesn't exist shows an error in words.

---

## For other sections

- Discover is the one tab for finding meals: the old Meals tab root (`/meals`) now redirects here, and the Discover tab stays highlighted on `/meals/...` pages.
- Meal cards link to `/meals/{mealId}` (Section B's meal detail).
- Directions: `import { openDirections } from '../discover/shared.jsx'`, then `openDirections(findRestaurant(meal.restaurantId))` opens the address in Google Maps.
- Restaurant data: `import { restaurants, findRestaurant, mealsAt } from '../../data/sample.js'`. Every meal now has `restaurantId`.
- Evidence helpers: `import { evidenceOf, sortMeals } from '../discover/evidence.js'` — `evidenceOf(meal)` returns `{ confirmed, disputed, total, age, stale, score }`.
- Link to Discover with search filled in: `/discover/search?q=tacos`.

## Left out on purpose
- In-app maps, GPS and real distances. (*Directions* hands off to Google Maps.)
- Restaurant-level scores, menus, hours, photos, prices and reservations.
- Cuisine, price or dietary filters other than gluten practices.
- Ads, sponsored results and promotions.
