# GlutenScout — Lo-Fi Prototype Build Instructions

## Project Summary
GlutenScout helps people with celiac disease and gluten sensitivity find **meals they can trust**, not just restaurants that claim to be "gluten-free." Instead of rating a restaurant overall, the gluten-free community upvotes and reviews individual dishes based on real experience.

**Core value proposition:** *"Confidence in every meal — not just the restaurant."*

**Research source:** All insights below come from 4 user interviews, 63 tagged insights, and an affinity diagram. Full research: https://www.figma.com/board/RzQWL2A0eQFc7K1mgKnDVw/Toby---Research-and-Discovery

## Assignment Requirements (do not skip any of these)
- Low-fidelity in look and feel, but users must be **explicitly told it's low-fidelity** in plain English (a modal on first load is the simplest way).
- **20–30+ screens** so it feels like a complete app, not a 3-screen demo.
- **Non-linear navigation** — users must be able to jump between sections freely, not be forced down one path.
- Implement standard usability principles throughout (visibility of system status, consistency, error prevention, recognition over recall, clear visual hierarchy/guiding attention, etc.) — review the whole prototype once per principle, not all at once.
- The prototype must **emphasize the core design feature(s)** from research and **minimize tangential functions** — don't pad with unrelated features just to hit the screen count.
- Must be deployed to a **public URL** — if it can't be opened without login/permissions, it gets zero credit.

## Key Research Insights to Design Around
1. **Trust requires knowing the "how," not just the "what."** Users want to see *how* a dish was verified safe (dedicated fryer, glove changes, separate prep area), not just a gluten-free label.
2. **Recency matters.** Staff and kitchen practices change; a "last verified" date matters as much as the verification itself.
3. **Trust is peer-based.** Users trust reviewers more when they share their own sensitivity level (celiac vs. gluten-intolerant vs. no true allergy).
4. **Cross-contamination, not ingredients, is the real risk.** Design should foreground prep details over ingredient lists.
5. **Calling ahead is still the most trusted method today** — a built-in call-ahead script/checklist reduces that burden.
6. **Peer-review builds trust over single reports** — new submissions should visibly be "pending" until corroborated.

## Design System (build this first — Step 0)
Before any feature screens are built, establish:
- **Color palette:** primary brand color, background, a "verified safe" success color (e.g. green), a "pending/unverified" warning color (e.g. amber), neutral grays for low-fi look.
- **Typography:** one heading scale, one body text style. Keep it simple/sketchy to read as low-fidelity (e.g. a slightly informal or wireframe-style font is fine).
- **Spacing & shape rules:** consistent padding, corner radius, shadow style.
- **Core reusable components:**
  - Bottom (or top) navigation bar linking to all 4 sections below, enabling non-linear navigation from screen one.
  - Meal/restaurant card component (reused across browse, detail, and saved screens).
  - Verification badge component (e.g. "✓ Verified 3 days ago — dedicated fryer").
  - Header / back button pattern.
- **Lo-fi disclosure modal:** shown once on first load, plain-English explanation that this is a low-fidelity prototype for research/testing purposes, not a finished product.
- **A blank home/landing screen** linking out to placeholder versions of all 4 sections below — this is the literal starting point every other branch builds on.

## Screen Ownership (4-person split, ~20-30 screens total)
Each teammate owns one section end-to-end, including both the UI and ensuring it reflects a specific research insight.

### Person A — Discover & Browse (~6-7 screens)
Onboarding → location/search → restaurant list → meal list → filters/sort (by verification strength, recency, distance).
*Research tie-in:* Pyper wanted sorting by verification strength and recency.

### Person B — Meal Trust Detail (core value prop, ~6-7 screens)
Meal detail screen, verification badges (dedicated fryer, glove changes, etc.), last-verified timestamp, reviewer profile tags shown inline on reviews.
*Research tie-in:* This is the single biggest value prop — "confidence in every meal."

### Person C — Contribute & Verify (~6-7 screens)
Submit a review, call-ahead script/checklist, "become a verifier" flow, peer-review/dispute screens (pending → confirmed).
*Research tie-in:* Alondra's peer-review model; Mallory's "I'd rather be told there's a risk than have someone guess."

### Person D — Account & Community (~5-6 screens)
Profile setup (celiac / strict gluten-free / gluten-intolerant tag), saved restaurants, community/social screens, settings, help/FAQ.
*Research tie-in:* Pyper's distrust of non-celiac reviewers; the community-support theme from Pyper and Alondra.

## Git Workflow
1. One person builds and pushes the Step 0 design system + shared components + disclosure modal + skeleton nav as the first commit.
2. Each teammate branches off that commit (`git checkout -b feature/discover-browse`, etc.).
3. Each person builds their section using the shared components — do not create new one-off buttons, cards, or colors outside the design system.
4. Open a PR to merge each branch back into main.
5. Do one final full-team pass together to check: non-linear navigation works everywhere, and each usability principle holds across the *whole* app, not just within individual sections.

## What NOT to Build
Do not add features unrelated to the research above just to hit the screen count (e.g. in-app messaging, payments, loyalty points) — the rubric explicitly penalizes tangential functions that dilute the core value proposition.

## Deliverable Notes (for submission, not for Claude Code to build)
When submitting, include a short written note explaining how the prototype emphasizes the core design feature(s) above (meal-level trust, verification detail, recency, peer review) and what was deliberately left out or minimized to keep focus on that core value.
