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

Only verification wording changes. Review cards, the "Evidence by diner" filters, Community and onboarding show reviewer types in both versions.

## How participants get a version

- Each browser is assigned A or B at random (50/50) on its first visit and keeps it.
- Open the app with `?v=a` or `?v=b` (e.g. `https://<site>/?v=b`) to switch that browser. Use this to check both versions, or to rebalance if the random split comes out lopsided.
- Settings → Delete my account / reset does **not** change the version. Clear site data to be re-assigned.

## Finding it in Clarity

Every session is tagged `verifiedBy` = `A` or `B`. In Clarity, filter recordings or heatmaps by **Custom tags → verifiedBy**. The tag is only sent from the deployed (production) site.

Code: `src/data/variant.js`.
