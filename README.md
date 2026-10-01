# GlutenScout

**Confidence in every meal — not just the restaurant.**

GlutenScout helps people with celiac disease and gluten sensitivity find meals they can trust. Instead of rating a restaurant overall, the gluten-free community reports on individual dishes: how the kitchen prepared them, when that was last checked, and who checked it.

This repo is a **low-fidelity prototype** for IS 551 (UX Design). All restaurants, meals, reviews and dates are made-up examples.

## The idea

Our research (4 interviews, 63 tagged insights) pointed to six things the design is built around:

1. **Show the "how", not just the "what".** A gluten-free label isn't enough; people want to see the dedicated fryer, the glove change, the separate prep area.
2. **Recency matters.** Kitchens and staff change, so every claim carries a "last verified" date.
3. **Trust is peer-based.** Every report shows the reviewer's type: Celiac, Strict GF, Gluten-sensitive or Restaurant.
4. **Cross-contamination is the real risk.** Prep details come before ingredient lists.
5. **Calling ahead is still the most trusted method.** A built-in call-ahead script makes it easier.
6. **One report isn't proof.** New reports stay pending until others corroborate them.

The app never says a meal is "safe". It shows evidence, dates and sources, and the diner decides.

## Run it locally

You need [Node.js](https://nodejs.org) 18 or newer (the LTS installer is fine) and Git.

```bash
git clone https://github.com/kmetler/GlutenScout.git
cd GlutenScout
npm install
npm run dev
```

Then open the address it prints, usually **http://localhost:5173**. The page reloads automatically when you save a file.

Tips for looking around:

- The app is laid out for a phone. In Chrome, press `F12` and then `Ctrl+Shift+M` (`Cmd+Shift+M` on Mac) to view it at phone size.
- The "low-fidelity prototype" notice appears only on your first visit. Tap the gray strip at the top of Home to see it again.
- The moon icon on Home switches between light and dark theme. Every screen must work in both.
- **Home → Component reference** shows every shared component with example data. Look there before building anything new.

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the site into `dist/` — run this before opening a PR to check nothing is broken |
| `npm run preview` | Serves the built `dist/` folder locally |

## What's built so far (Step 0)

- Design tokens for color (light and dark), type, spacing, radius and shadow
- Shared components: Button, PrecautionBadge, SafetyProfile, ReviewCard, StarRating, FilterChip, MealCard, ScreenHeader, TabBar, ListRow, DisclosureModal
- The lo-fi disclosure modal
- A bottom tab bar on every screen, so any section is one tap away
- A Home screen linking to all four sections
- A placeholder screen for each section, listing what it will contain

## Who builds what

| Section | Owner | Branch | Route |
|---|---|---|---|
| Discover & browse | Person A | `feature/discover-browse` | `/discover` |
| Meal trust detail | Person B | `feature/meal-trust-detail` | `/meals` |
| Contribute & verify | Person C | `feature/contribute-verify` | `/contribute` |
| Account & community | Person D | `feature/account-community` | `/account` |

The planned screens and research tie-in for each section are in [docs/Instructions.md](docs/Instructions.md).

## Building your section

1. Branch off `main`: `git checkout -b feature/your-section`
2. Add your screens in `src/screens/`.
3. In [src/App.jsx](src/App.jsx), replace your section's placeholder route with your screens.
4. Open a pull request back into `main`.

Rules that keep the app consistent:

- **Use the shared components.** Import them from `src/components` (`import { Button, MealCard } from '../components'`). Don't create one-off buttons, cards or colors.
- **Use tokens, not raw values.** Colors, font sizes and spacing come from [src/styles/tokens.css](src/styles/tokens.css) (`var(--brand)`, `var(--space-4)`), never a hard-coded hex or pixel value.
- **One green button per screen.**
- **Never write "safe", "celiac-safe", "100% gluten-free" or "guaranteed".** Every safety claim shows a date; every report shows its reviewer type.
- **Reuse the example data** in [src/data/sample.js](src/data/sample.js), and add to it there rather than inside a screen.
- **Don't add unrelated features** (messaging, payments, loyalty points). The rubric penalizes them.

The full design rules are in [docs/DESIGN.md](docs/DESIGN.md).

## Project layout

```
docs/               Assignment instructions and design system rules
src/
  components/       Shared components
  screens/          One file per screen; sections.js lists the four sections
  data/sample.js    Example meals and reports
  styles/           tokens.css, base.css (layout and type), components.css
  App.jsx           Routes, disclosure modal, theme toggle
```

Built with Vite, React and React Router.
