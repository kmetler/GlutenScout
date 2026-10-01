// Made-up example content shared by every section. Add to it rather than inventing data per screen.

export const meals = [
  {
    id: 'gf-burger',
    name: 'Gluten-free bun cheeseburger',
    restaurant: 'Juniper Grill',
    distance: '0.8 mi',
    lastVerified: 'Sep 12, 2026',
    rating: 4.5,
    reviewCount: 212,
    precautions: [
      { label: 'Separate prep area', state: 'confirmed' },
      { label: 'Gloves changed', state: 'confirmed' },
      { label: 'Shared fryer?', state: 'conflict' },
    ],
    sources: [
      { label: 'Restaurant answers', detail: 'updated Aug 30, 2026' },
      { label: '6 celiac / strict reports', detail: 'newest Sep 12, 2026' },
    ],
    conflictNote: '2 reports disagree about whether fries share a fryer with breaded items.',
  },
  {
    id: 'corn-tacos',
    name: 'Corn tortilla street tacos',
    restaurant: 'Casa Verde',
    distance: '1.4 mi',
    lastVerified: 'Sep 24, 2026',
    rating: 4,
    reviewCount: 88,
    precautions: [
      { label: 'Dedicated fryer', state: 'confirmed' },
      { label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [
      { label: 'Restaurant answers', detail: 'updated Sep 2, 2026' },
      { label: '4 celiac / strict reports', detail: 'newest Sep 24, 2026' },
    ],
  },
  {
    id: 'rice-bowl',
    name: 'Teriyaki rice bowl (tamari)',
    restaurant: 'Koji Kitchen',
    distance: '2.1 mi',
    lastVerified: 'Mar 3, 2026',
    rating: 3.5,
    reviewCount: 41,
    precautions: [
      { label: 'Separate wok', state: 'unverified' },
      { label: 'Tamari on request', state: 'unverified' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Mar 3, 2026' }],
  },
]

export const reports = [
  {
    id: 'r1',
    name: 'Maya R.',
    reviewerType: 'Celiac',
    location: 'Provo, UT',
    reportCount: 23,
    date: 'Sep 12, 2026',
    rating: 4,
    body: "Told the server I'm celiac — the cook came out, changed gloves and used a separate board. GF bun was great. Fries share the fryer, so I skipped them.",
  },
  {
    id: 'r2',
    name: 'Devin T.',
    reviewerType: 'Gluten-sensitive',
    location: 'Orem, UT',
    reportCount: 5,
    date: 'Sep 4, 2026',
    rating: 5,
    body: 'Staff said the fries have their own fryer. I did not see the kitchen myself, so I am passing on what they told me.',
  },
]
