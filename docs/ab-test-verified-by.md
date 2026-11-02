# A/B test: Who verified it

**Question:** Do diners trust a verification more when it says *who* verified it?

| | Version A | Version B |
|---|---|---|
| Practice state | Verified by diners | Confirmed by 3 celiac diners |
| Practice evidence summary | 4 saw it · 1 told by staff | 3 celiac and 1 strict GF saw it · 1 told by staff |
| Practice detail rows | Name only | Name + reviewer type tag |
| Safety profile source line | 12 diner reports | 6 celiac / strict reports |
| Discover meal card | 2 of 3 practices verified by diners | 2 of 3 practices confirmed by 5 celiac and 2 strict GF diners |
| Peer-review badge on a report | Confirmed by 2 verifiers | Confirmed by 1 celiac and 1 strict GF verifier |
| Reviews and report lists | Name only | Name + reviewer type tag (Celiac, Strict GF, Gluten-sensitive) |
| Evidence by diner | No type filters, newest first | Type filters, ordered by the Settings choice |
| Tour | "which diner wrote it" | "Celiac, Strict GF or Gluten-sensitive" |

| "Whose reports come first?" | Not asked: no setup step, Settings section or Help topic | Asked in setup, changeable in Settings |

Community, reviewer profile headers and choosing your own reviewer type in setup show types in both versions. Choosing a type is core to GlutenScout and stays long term; this test checks whether showing it to other diners makes a difference.

## How participants get a version

- Each browser is assigned A or B at random (50/50) on its first visit and keeps it.
- Open the app with `?v=a` or `?v=b` (e.g. `https://<site>/?v=b`) to switch that browser. Use this to check both versions, or to rebalance if the random split comes out lopsided.
- Settings → Delete my account / reset does **not** change the version. Clear site data to be re-assigned.

## Finding it in Clarity

Every session is tagged `verifiedBy` = `A` or `B`. In Clarity, filter recordings or heatmaps by **Custom tags → verifiedBy**. The tag is only sent from the deployed (production) site.

Code: `src/data/variant.js`.
