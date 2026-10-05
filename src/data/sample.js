// Made-up example content shared by every section. Add to it rather than inventing data per screen.
// Precaution `key`s refer to PRACTICES in practices.js.

export const meals = [
  {
    id: 'gf-burger',
    name: 'Gluten-free bun cheeseburger',
    restaurant: 'Juniper Grill',
    phone: '(801) 555-0142',
    distance: '0.8 mi',
    lastVerified: 'Sep 12, 2026',
    rating: 4.5,
    reviewCount: 212,
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'gloves', label: 'Gloves changed', state: 'confirmed' },
      { key: 'fryer', label: 'Shared fryer?', state: 'conflict' },
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
    phone: '(801) 555-0187',
    distance: '1.4 mi',
    lastVerified: 'Sep 24, 2026',
    rating: 4,
    reviewCount: 88,
    precautions: [
      { key: 'fryer', label: 'Dedicated fryer', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
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
    phone: '(801) 555-0119',
    distance: '2.1 mi',
    lastVerified: 'Mar 3, 2026',
    rating: 3.5,
    reviewCount: 41,
    precautions: [
      { key: 'wok', label: 'Separate wok', state: 'unverified' },
      { key: 'sauce', label: 'Tamari on request', state: 'unverified' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Mar 3, 2026' }],
  },
]

export function findMeal(id) {
  return meals.find((meal) => meal.id === id)
}

// Reports from other diners. `author: 'other'` keeps them out of "My reports".
export const reports = [
  {
    id: 'r1',
    mealId: 'gf-burger',
    author: 'other',
    source: 'visit',
    name: 'Maya R.',
    reviewerType: 'Celiac',
    location: 'Provo, UT',
    reportCount: 23,
    date: 'Sep 12, 2026',
    rating: 4,
    body: "Told the server I'm celiac — the cook came out, changed gloves and used a separate board. GF bun was great. Fries share the fryer, so I skipped them.",
    claims: [
      { label: 'Separate prep area', state: 'confirmed' },
      { label: 'Gloves changed', state: 'confirmed' },
      { label: 'Shared fryer', state: 'conflict' },
    ],
  },
  {
    id: 'r2',
    mealId: 'gf-burger',
    author: 'other',
    source: 'visit',
    name: 'Devin T.',
    reviewerType: 'Gluten-sensitive',
    location: 'Orem, UT',
    reportCount: 5,
    date: 'Sep 4, 2026',
    rating: 5,
    body: 'Staff said the fries have their own fryer. I did not see the kitchen myself, so I am passing on what they told me.',
    claims: [{ label: 'Dedicated fryer (staff said)', state: 'unverified' }],
  },
  {
    id: 'r3',
    mealId: 'corn-tacos',
    author: 'other',
    source: 'visit',
    name: 'Priya S.',
    reviewerType: 'Strict GF',
    location: 'Lehi, UT',
    reportCount: 11,
    date: 'Sep 24, 2026',
    rating: 4,
    body: 'Sat at the counter and watched them. Chips and the tacos go in a fryer with nothing breaded in it, and the cook grabbed clean tongs for my order.',
    claims: [
      { label: 'Dedicated fryer', state: 'confirmed' },
      { label: 'Clean utensils', state: 'confirmed' },
    ],
  },
  {
    id: 'r4',
    mealId: 'rice-bowl',
    author: 'other',
    source: 'visit',
    name: 'Marcus W.',
    reviewerType: 'Celiac',
    location: 'Provo, UT',
    reportCount: 3,
    date: 'Sep 28, 2026',
    rating: 3,
    body: 'They brought out a bottle of tamari so I could see it. I asked about the wok and the server said they would check, but I never got an answer.',
    claims: [
      { label: 'Tamari on request', state: 'confirmed' },
      { label: 'Separate wok (staff said)', state: 'unverified' },
    ],
  },
  {
    id: 'r5',
    mealId: 'gf-burger',
    author: 'other',
    source: 'visit',
    name: 'Sam K.',
    reviewerType: 'Celiac',
    location: 'Springville, UT',
    reportCount: 8,
    date: 'Sep 18, 2026',
    rating: 4.5,
    body: 'Asked to see the fryer. The cook pointed to a small one by the grill and said only fries go in it.',
    claims: [{ label: 'Dedicated fryer', state: 'confirmed' }],
  },
]

// Peer-review votes already on the example reports.
// r1 is confirmed, r3 needs one more verifier match, r5 is disputed.
export const votes = {
  r1: [
    { by: 'alex', name: 'Alex P.', reviewerType: 'Celiac', verifier: true, kind: 'match', date: 'Sep 15, 2026' },
    { by: 'jordan', name: 'Jordan L.', reviewerType: 'Strict GF', verifier: true, kind: 'match', date: 'Sep 19, 2026' },
  ],
  r3: [
    { by: 'alex', name: 'Alex P.', reviewerType: 'Celiac', verifier: true, kind: 'match', date: 'Sep 27, 2026' },
  ],
  r5: [
    {
      by: 'jordan',
      name: 'Jordan L.',
      reviewerType: 'Strict GF',
      verifier: true,
      kind: 'dispute',
      claims: ['Dedicated fryer'],
      note: 'Watched onion rings and fries go into the same fryer on my visit.',
      date: 'Sep 20, 2026',
    },
  ],
}
