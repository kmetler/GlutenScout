// Made-up example content shared by every section. Add to it rather than inventing data per screen.
// Precaution `key`s refer to PRACTICES in practices.js.

import { claimsFromAnswers, PRACTICES } from './practices.js'

export const meals = [
  {
    id: 'gf-burger',
    restaurantId: 'juniper-grill',
    name: 'Gluten-free bun cheeseburger',
    restaurant: 'Juniper Grill',
    phone: '(801) 555-0142',
    lastVerified: 'Oct 21, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'gloves', label: 'Gloves changed', state: 'confirmed' },
      { key: 'fryer', label: 'Shared fryer?', state: 'conflict' },
    ],
    sources: [
      { label: 'Restaurant answers', detail: 'updated Aug 30, 2026' },
    ],
    conflictNote: '3 diners saw fries share a fryer with breaded items; 1 saw a fryer used only for fries.',
  },
  {
    id: 'corn-tacos',
    restaurantId: 'casa-verde',
    name: 'Corn tortilla street tacos',
    restaurant: 'Casa Verde',
    phone: '(801) 555-0187',
    lastVerified: 'Oct 27, 2026',
    precautions: [
      { key: 'fryer', label: 'Dedicated fryer', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [
      { label: 'Restaurant answers', detail: 'updated Sep 2, 2026' },
    ],
  },
  {
    id: 'rice-bowl',
    restaurantId: 'koji-kitchen',
    name: 'Teriyaki rice bowl (tamari)',
    restaurant: 'Koji Kitchen',
    phone: '(801) 555-0119',
    lastVerified: 'Mar 3, 2026',
    precautions: [
      { key: 'wok', label: 'Separate wok', state: 'unverified' },
      { key: 'sauce', label: 'Tamari on request', state: 'unverified' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Mar 3, 2026' }],
  },
  {
    id: 'salmon-plate',
    restaurantId: 'juniper-grill',
    name: 'Grilled salmon with roasted potatoes',
    restaurant: 'Juniper Grill',
    phone: '(801) 555-0142',
    lastVerified: 'Oct 23, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
      { key: 'gloves', label: 'Gloves changed', state: 'confirmed' },
    ],
    sources: [
      { label: 'Restaurant answers', detail: 'updated Aug 30, 2026' },
    ],
  },
  {
    id: 'carnitas-bowl',
    restaurantId: 'casa-verde',
    name: 'Carnitas burrito bowl',
    restaurant: 'Casa Verde',
    phone: '(801) 555-0187',
    lastVerified: 'Aug 2, 2026',
    precautions: [
      { key: 'gloves', label: 'Gloves changed', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'unverified' },
    ],
    sources: [
      { label: 'Restaurant answers', detail: 'updated Sep 2, 2026' },
    ],
  },
  {
    id: 'pad-thai',
    restaurantId: 'lotus-thai',
    name: 'Pad thai with rice noodles',
    restaurant: 'Lotus Thai Kitchen',
    phone: '(801) 555-0163',
    lastVerified: 'Oct 24, 2026',
    precautions: [
      { key: 'sauce', label: 'Tamari on request', state: 'confirmed' },
      { key: 'wok', label: 'Shared wok?', state: 'conflict' },
    ],
    sources: [
      { label: 'Restaurant answers', detail: 'updated Jul 14, 2026' },
    ],
    conflictNote: '1 diner saw the noodles go in a wok just used for wheat noodles; 2 saw a cleaned wok.',
  },
  {
    id: 'gf-pizza',
    restaurantId: 'slice-society',
    name: 'Gluten-free crust margherita pizza',
    restaurant: 'Slice Society',
    phone: '(801) 555-0175',
    lastVerified: 'May 18, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'unverified' },
      { key: 'utensils', label: 'Clean utensils?', state: 'conflict' },
    ],
    sources: [
      { label: 'Restaurant answers', detail: 'updated May 18, 2026' },
    ],
    conflictNote: '2 diners disagree about whether the same pizza cutter is used on regular pizzas.',
  },
  {
    id: 'breakfast-hash',
    restaurantId: 'sunrise-cafe',
    name: 'Sweet potato breakfast hash',
    restaurant: 'Sunrise Café',
    phone: '(801) 555-0128',
    lastVerified: 'Oct 29, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'gloves', label: 'Gloves changed', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [
      { label: 'Restaurant answers', detail: 'updated Sep 10, 2026' },
    ],
  },
  {
    id: 'buckwheat-pancakes',
    restaurantId: 'sunrise-cafe',
    name: 'Buckwheat pancakes with berries',
    restaurant: 'Sunrise Café',
    phone: '(801) 555-0128',
    lastVerified: 'Oct 25, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Sep 10, 2026' }],
  },
  {
    id: 'cinnamon-roll',
    restaurantId: 'honey-oat',
    name: 'Gluten-free cinnamon roll',
    restaurant: 'Honey & Oat Bakery',
    phone: '(801) 555-0147',
    lastVerified: 'Oct 30, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'gloves', label: 'Gloves changed', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Oct 1, 2026' }],
  },
  {
    id: 'turkey-sandwich',
    restaurantId: 'honey-oat',
    name: 'Turkey avocado sandwich on GF bread',
    restaurant: 'Honey & Oat Bakery',
    phone: '(801) 555-0147',
    lastVerified: 'Oct 20, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'gloves', label: 'Gloves changed', state: 'confirmed' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Oct 1, 2026' }],
  },
  {
    id: 'shawarma-plate',
    restaurantId: 'olive-thyme',
    name: 'Chicken shawarma plate with rice',
    restaurant: 'Olive & Thyme',
    phone: '(801) 555-0131',
    lastVerified: 'Oct 28, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'gloves', label: 'Gloves changed', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Sep 18, 2026' }],
  },
  {
    id: 'falafel-bowl',
    restaurantId: 'olive-thyme',
    name: 'Falafel bowl with tahini',
    restaurant: 'Olive & Thyme',
    phone: '(801) 555-0131',
    lastVerified: 'Oct 17, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'fryer', label: 'Shared fryer?', state: 'conflict' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Sep 18, 2026' }],
    conflictNote: '2 diners saw falafel fried with pita chips; 1 saw a fryer used only for falafel.',
  },
  {
    id: 'harvest-bowl',
    restaurantId: 'harvest-bowl',
    name: 'Roasted chicken harvest bowl',
    restaurant: 'Harvest Bowl',
    phone: '(801) 555-0123',
    lastVerified: 'Oct 15, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'gloves', label: 'Gloves changed', state: 'unverified' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Aug 21, 2026' }],
  },
  {
    id: 'brisket-plate',
    restaurantId: 'red-mesa',
    name: 'Smoked brisket plate',
    restaurant: 'Red Mesa Smokehouse',
    phone: '(801) 555-0154',
    lastVerified: 'Oct 22, 2026',
    precautions: [
      { key: 'gloves', label: 'Gloves changed', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Sep 5, 2026' }],
  },
  {
    id: 'miso-salmon',
    restaurantId: 'koji-kitchen',
    name: 'Miso-glazed salmon with rice',
    restaurant: 'Koji Kitchen',
    phone: '(801) 555-0119',
    lastVerified: 'Apr 8, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'unverified' },
      { key: 'sauce', label: 'Tamari on request', state: 'unverified' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Apr 8, 2026' }],
  },
  {
    id: 'butter-chicken',
    restaurantId: 'saffron-table',
    name: 'Butter chicken with basmati rice',
    restaurant: 'Saffron Table',
    phone: '(801) 555-0196',
    lastVerified: 'Oct 19, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Sep 12, 2026' }],
  },
  {
    id: 'chana-masala',
    restaurantId: 'saffron-table',
    name: 'Chana masala with basmati rice',
    restaurant: 'Saffron Table',
    phone: '(801) 555-0196',
    lastVerified: 'Sep 3, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'unverified' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Sep 12, 2026' }],
  },
  {
    id: 'beef-pho',
    restaurantId: 'pho-lan',
    name: 'Beef pho with rice noodles',
    restaurant: 'Pho Lan',
    phone: '(801) 555-0108',
    lastVerified: 'Oct 11, 2026',
    precautions: [
      { key: 'sauce', label: 'Tamari on request', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils?', state: 'conflict' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Aug 27, 2026' }],
    conflictNote: '1 diner saw a noodle basket also used for egg noodles; 2 saw a separate basket.',
  },
  {
    id: 'green-curry',
    restaurantId: 'lotus-thai',
    name: 'Green curry with jasmine rice',
    restaurant: 'Lotus Thai Kitchen',
    phone: '(801) 555-0163',
    lastVerified: 'Oct 14, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'confirmed' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Jul 14, 2026' }],
  },
  {
    id: 'tuna-roll',
    restaurantId: 'tide-rice',
    name: 'Spicy tuna roll with tamari',
    restaurant: 'Tide & Rice Sushi',
    phone: '(801) 555-0112',
    lastVerified: 'Sep 27, 2026',
    precautions: [
      { key: 'sauce', label: 'Tamari on request', state: 'confirmed' },
      { key: 'prep', label: 'Separate prep area', state: 'confirmed' },
      { key: 'utensils', label: 'Clean utensils', state: 'unverified' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Aug 3, 2026' }],
  },
  {
    id: 'chicken-caesar',
    restaurantId: 'slice-society',
    name: 'Chicken Caesar salad, no croutons',
    restaurant: 'Slice Society',
    phone: '(801) 555-0175',
    lastVerified: 'Jun 9, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'unverified' },
      { key: 'utensils', label: 'Clean utensils?', state: 'conflict' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated May 18, 2026' }],
    conflictNote: '2 diners disagree about whether salads are tossed in a bowl used for croutons.',
  },
  {
    id: 'country-omelet',
    restaurantId: 'canyon-diner',
    name: 'Country omelet with hash browns',
    restaurant: 'Canyon Diner',
    phone: '(801) 555-0170',
    lastVerified: 'Jul 18, 2026',
    precautions: [
      { key: 'prep', label: 'Separate prep area', state: 'unverified' },
      { key: 'utensils', label: 'Clean utensils', state: 'unverified' },
    ],
    sources: [{ label: 'Restaurant answers', detail: 'updated Jul 18, 2026' }],
  },
]

export function findMeal(id) {
  return meals.find((meal) => meal.id === id)
}

// Restaurants, for Discover's restaurant list. GlutenScout never scores a restaurant as a whole:
// each meal keeps its own evidence, so a restaurant page is just a list of its meals.
export const restaurants = [
  { id: 'sunrise-cafe', name: 'Sunrise Café', cuisine: 'Breakfast', at: [0.1, 0.5], phone: '(801) 555-0128', address: '210 N University Ave, Provo' },
  { id: 'juniper-grill', name: 'Juniper Grill', cuisine: 'American', at: [-0.2, -0.8], phone: '(801) 555-0142', address: '48 W Center St, Provo' },
  { id: 'casa-verde', name: 'Casa Verde', cuisine: 'Mexican', at: [0.9, 1.1], phone: '(801) 555-0187', address: '1150 N 900 E, Provo' },
  { id: 'koji-kitchen', name: 'Koji Kitchen', cuisine: 'Japanese', at: [0.8, -1.9], phone: '(801) 555-0119', address: '560 E 1860 S, Provo' },
  { id: 'lotus-thai', name: 'Lotus Thai Kitchen', cuisine: 'Thai', at: [-0.9, 3.1], phone: '(801) 555-0163', address: '75 S State St, Orem' },
  { id: 'slice-society', name: 'Slice Society', cuisine: 'Pizza', at: [2.9, -3.6], phone: '(801) 555-0175', address: '1300 S Main St, Springville' },
  { id: 'honey-oat', name: 'Honey & Oat Bakery', cuisine: 'Bakery', at: [-0.3, 0.5], phone: '(801) 555-0147', address: '132 W 100 N, Provo' },
  { id: 'olive-thyme', name: 'Olive & Thyme', cuisine: 'Mediterranean', at: [0.4, 1.0], phone: '(801) 555-0131', address: '390 N 100 E, Provo' },
  { id: 'harvest-bowl', name: 'Harvest Bowl', cuisine: 'Salads & bowls', at: [1.0, 1.25], phone: '(801) 555-0123', address: '845 N 700 E, Provo' },
  { id: 'red-mesa', name: 'Red Mesa Smokehouse', cuisine: 'Barbecue', at: [0.9, -1.7], phone: '(801) 555-0154', address: '1420 S State St, Provo' },
  { id: 'saffron-table', name: 'Saffron Table', cuisine: 'Indian', at: [-1.2, 2.3], phone: '(801) 555-0196', address: '220 W 1300 S, Orem' },
  { id: 'pho-lan', name: 'Pho Lan', cuisine: 'Vietnamese', at: [0.2, 2.9], phone: '(801) 555-0108', address: '610 E University Pkwy, Orem' },
  { id: 'tide-rice', name: 'Tide & Rice Sushi', cuisine: 'Sushi', at: [-1.3, 3.6], phone: '(801) 555-0112', address: '95 N State St, Orem' },
  { id: 'canyon-diner', name: 'Canyon Diner', cuisine: 'Diner', at: [4.7, -6.2], phone: '(801) 555-0170', address: '480 N Main St, Spanish Fork' },
]

// Example map, in miles east and north of central Provo. `at` on a restaurant uses the same grid.
export const AREAS = {
  'Provo, UT': [0, 0],
  'Orem, UT': [-1, 3.5],
  'Springville, UT': [3, -3.8],
  'Spanish Fork, UT': [5, -6.5],
  'American Fork, UT': [-6, 11],
  'Lehi, UT': [-9, 15],
  'Salt Lake City, UT': [-6, 40],
}

// How far from an area a place still counts as "near" it.
export const NEARBY_MILES = 15

// The area named by something a person typed, like "orem" or "Orem, UT". null if we don't know it.
export function matchArea(text) {
  const q = text.trim().toLowerCase()
  if (!q) return null
  return Object.keys(AREAS).find((area) => area.toLowerCase().startsWith(q) || q.startsWith(area.split(',')[0].toLowerCase())) ?? null
}

// Miles from an area to a restaurant or a meal.
export function milesFrom(item, area) {
  const [fromX, fromY] = AREAS[area] ?? AREAS['Provo, UT']
  const [x, y] = item.at ?? findRestaurant(item.restaurantId).at
  return Math.hypot(x - fromX, y - fromY)
}

export function isNearby(item, area) {
  return milesFrom(item, area) <= NEARBY_MILES
}

// "0.8 mi", or "13 mi" once the decimal stops being useful.
export function distanceText(item, area) {
  const miles = milesFrom(item, area)
  return `${miles < 10 ? miles.toFixed(1) : Math.round(miles)} mi`
}

export function findRestaurant(id) {
  return restaurants.find((r) => r.id === id)
}

export function mealsAt(restaurantId) {
  return meals.filter((meal) => meal.restaurantId === restaurantId)
}

// The diners who wrote the example reports. Reports match people by `name`; peer-review votes
// match by `id` (the vote's `by`). reportCount covers all meals, not just the ones in this prototype.
export const people = [
  { id: 'maya', name: 'Maya R.', reviewerType: 'Celiac', location: 'Provo, UT', reportCount: 23, verifier: true, memberSince: 'Mar 2025' },
  { id: 'alex', name: 'Alex P.', reviewerType: 'Celiac', location: 'Provo, UT', reportCount: 31, verifier: true, memberSince: 'Oct 2024' },
  { id: 'jordan', name: 'Jordan L.', reviewerType: 'Strict GF', location: 'American Fork, UT', reportCount: 17, verifier: true, memberSince: 'Feb 2025' },
  { id: 'priya', name: 'Priya S.', reviewerType: 'Strict GF', location: 'Lehi, UT', reportCount: 11, verifier: true, memberSince: 'Jan 2026' },
  { id: 'sam', name: 'Sam K.', reviewerType: 'Celiac', location: 'Springville, UT', reportCount: 8, verifier: true, memberSince: 'Nov 2025' },
  { id: 'kenji', name: 'Kenji Y.', reviewerType: 'Celiac', location: 'Orem, UT', reportCount: 27, verifier: true, memberSince: 'Sep 2024' },
  { id: 'rosa', name: 'Rosa M.', reviewerType: 'Strict GF', location: 'Provo, UT', reportCount: 19, verifier: true, memberSince: 'Dec 2024' },
  { id: 'grace', name: 'Grace W.', reviewerType: 'Strict GF', location: 'Orem, UT', reportCount: 15, verifier: true, memberSince: 'Jul 2025' },
  { id: 'hannah', name: 'Hannah B.', reviewerType: 'Celiac', location: 'Orem, UT', reportCount: 14, verifier: true, memberSince: 'Jun 2025' },
  { id: 'lauren', name: 'Lauren D.', reviewerType: 'Strict GF', location: 'Provo, UT', reportCount: 12, verifier: true, memberSince: 'Feb 2026' },
  { id: 'claire', name: 'Claire F.', reviewerType: 'Celiac', location: 'Provo, UT', reportCount: 10, verifier: true, memberSince: 'Jan 2026' },
  { id: 'ben', name: 'Ben O.', reviewerType: 'Celiac', location: 'Lehi, UT', reportCount: 9, verifier: true, memberSince: 'Apr 2025' },
  { id: 'luis', name: 'Luis A.', reviewerType: 'Gluten-sensitive', location: 'Provo, UT', reportCount: 11, verifier: false, memberSince: 'Jan 2026' },
  { id: 'ethan', name: 'Ethan C.', reviewerType: 'Gluten-sensitive', location: 'Provo, UT', reportCount: 10, verifier: false, memberSince: 'Jan 2026' },
  { id: 'olivia', name: 'Olivia H.', reviewerType: 'Gluten-sensitive', location: 'American Fork, UT', reportCount: 9, verifier: false, memberSince: 'Mar 2026' },
  { id: 'tess', name: 'Tess N.', reviewerType: 'Gluten-sensitive', location: 'Springville, UT', reportCount: 12, verifier: false, memberSince: 'Feb 2026' },
  { id: 'devin', name: 'Devin T.', reviewerType: 'Gluten-sensitive', location: 'Orem, UT', reportCount: 7, verifier: false, memberSince: 'Feb 2026' },
  { id: 'marcus', name: 'Marcus W.', reviewerType: 'Celiac', location: 'Provo, UT', reportCount: 3, verifier: false, memberSince: 'Aug 2026' },
  { id: 'nate', name: 'Nate G.', reviewerType: 'Celiac', location: 'Spanish Fork, UT', reportCount: 4, verifier: false, memberSince: 'Oct 2026' },
  { id: 'nora', name: 'Nora V.', reviewerType: 'Celiac', location: 'Provo, UT', reportCount: 21, verifier: true, memberSince: 'Aug 2025' },
  { id: 'amara', name: 'Amara E.', reviewerType: 'Celiac', location: 'American Fork, UT', reportCount: 16, verifier: true, memberSince: 'May 2025' },
  { id: 'theo', name: 'Theo J.', reviewerType: 'Strict GF', location: 'Orem, UT', reportCount: 13, verifier: true, memberSince: 'Nov 2025' },
  { id: 'mei', name: 'Mei L.', reviewerType: 'Strict GF', location: 'Provo, UT', reportCount: 8, verifier: true, memberSince: 'Mar 2026' },
  { id: 'will', name: 'Will S.', reviewerType: 'Gluten-sensitive', location: 'Lehi, UT', reportCount: 9, verifier: false, memberSince: 'Dec 2025' },
  { id: 'jess', name: 'Jess K.', reviewerType: 'Gluten-sensitive', location: 'Provo, UT', reportCount: 9, verifier: false, memberSince: 'Apr 2026' },
  { id: 'dana', name: 'Dana Q.', reviewerType: 'Gluten-sensitive', location: 'Spanish Fork, UT', reportCount: 7, verifier: false, memberSince: 'May 2026' },
  { id: 'owen', name: 'Owen R.', reviewerType: 'Celiac', location: 'Springville, UT', reportCount: 6, verifier: false, memberSince: 'Jun 2026' },
]

const person = (id) => people.find((p) => p.id === id)

// One visit report by someone in `people`. `seen` uses the visit answers from practices.js
// ({ fryer: 'saw' | 'told' | 'no' }), so claims are worded exactly like reports written in the app.
function visit(id, mealId, by, date, rating, body, seen = {}) {
  const { name, reviewerType, location, reportCount } = person(by)
  return {
    id,
    mealId,
    author: 'other',
    source: 'visit',
    name,
    reviewerType,
    location,
    reportCount,
    date,
    rating,
    body,
    claims: claimsFromAnswers(seen, 'visit'),
  }
}

// Reports from other diners. `author: 'other'` keeps them out of "My reports".
// Claims agree with each meal's precaution states above: a 'confirmed' practice has diners who
// saw it, a 'conflict' has diners who saw both, and an 'unverified' one only has staff's word.
export const reports = [
  // Gluten-free bun cheeseburger · Juniper Grill. Fryer disputed: 3 saw it shared, 1 saw it dedicated.
  visit('r1', 'gf-burger', 'maya', 'Sep 12, 2026', 4,
    "Told the server I'm celiac — the cook came out, changed gloves and used a separate board. GF bun was great. Fries share the fryer, so I skipped them.",
    { prep: 'saw', gloves: 'saw', fryer: 'no' }),
  visit('r2', 'gf-burger', 'devin', 'Sep 4, 2026', 5,
    'Staff said the fries have their own fryer. I did not see the kitchen myself, so I am passing on what they told me.',
    { fryer: 'told' }),
  visit('r5', 'gf-burger', 'sam', 'Sep 18, 2026', 4.5,
    'Asked to see the fryer. The cook pointed to a small one by the grill and said only fries go in it.',
    { fryer: 'saw' }),
  visit('b4', 'gf-burger', 'jordan', 'Sep 20, 2026', 3,
    'The burger itself was handled carefully on its own board. But I watched onion rings and fries go into the same fryer, so the fries are a no for me.',
    { prep: 'saw', fryer: 'no' }),
  visit('b5', 'gf-burger', 'kenji', 'Oct 21, 2026', 4,
    'Third time here. The cook changed gloves without me asking and plated mine away from the regular buns. Got the side salad instead of fries.',
    { prep: 'saw', gloves: 'saw' }),
  visit('b6', 'gf-burger', 'hannah', 'Oct 9, 2026', 5,
    'Best GF bun I have had in Utah County — they toast it in its own pan. Our server knew the drill before I finished saying "celiac".',
    { prep: 'saw', gloves: 'saw' }),
  visit('b7', 'gf-burger', 'ethan', 'Oct 14, 2026', 4,
    "Server said the fries are fine for gluten-free. I'm sensitive, not celiac, so I had them, but I can't tell you what the fryer is like.",
    { fryer: 'told' }),
  visit('b8', 'gf-burger', 'rosa', 'Aug 28, 2026', 4,
    'Sat at the bar facing the line. Separate board, fresh gloves, and the bun came out sealed in its bag.',
    { prep: 'saw', gloves: 'saw' }),
  visit('b9', 'gf-burger', 'tess', 'Jul 30, 2026', 3,
    "Bun was a little dry and fell apart halfway through. Didn't ask about the kitchen this time."),
  visit('b10', 'gf-burger', 'claire', 'Oct 3, 2026', 4,
    'The cook was honest: fries share a fryer with onion rings, especially when it is busy. Glove change was right in front of me.',
    { gloves: 'saw', fryer: 'no' }),
  visit('b11', 'gf-burger', 'luis', 'Oct 25, 2026', 5,
    'Huge burger and the GF bun actually held together. Would order again.'),
  visit('b12', 'gf-burger', 'alex', 'Sep 10, 2026', 4,
    'Same as my last two visits: separate board and new gloves for the GF order. I still skip the fries.',
    { prep: 'saw', gloves: 'saw' }),

  // Corn tortilla street tacos · Casa Verde
  visit('r3', 'corn-tacos', 'priya', 'Sep 24, 2026', 4,
    'Sat at the counter and watched them. Chips and the tacos go in a fryer with nothing breaded in it, and the cook grabbed clean tongs for my order.',
    { fryer: 'saw', utensils: 'saw' }),
  visit('t2', 'corn-tacos', 'rosa', 'Oct 18, 2026', 5,
    'Asked to see the fryer — it has a "GF only" label on the basket. The al pastor is fantastic.',
    { fryer: 'saw', utensils: 'saw' }),
  visit('t3', 'corn-tacos', 'ben', 'Oct 6, 2026', 4,
    'Cook swapped tongs and wiped down the flat-top before warming my tortillas.',
    { utensils: 'saw' }),
  visit('t4', 'corn-tacos', 'olivia', 'Sep 30, 2026', 4,
    'Server said the chips are fried on their own. Good salsa bar.',
    { fryer: 'told' }),
  visit('t5', 'corn-tacos', 'nate', 'Oct 27, 2026', 5,
    'Watched them pull my chips out of the GF-only fryer. Tacos and chips, no reaction afterward.',
    { fryer: 'saw' }),
  visit('t6', 'corn-tacos', 'luis', 'Sep 12, 2026', 3,
    'Tortillas fell apart a bit. The salsa bar makes up for it.'),
  visit('t7', 'corn-tacos', 'grace', 'Aug 22, 2026', 4,
    'Saw the fryer basket with the GF label. Staff said they use clean tongs but I could not see that part.',
    { fryer: 'saw', utensils: 'told' }),
  visit('t8', 'corn-tacos', 'hannah', 'Sep 17, 2026', 4,
    'Clean tongs and a clean spot on the flat-top for my tortillas. Carnitas tacos were the best of the three.',
    { utensils: 'saw' }),
  visit('t9', 'corn-tacos', 'ethan', 'Oct 11, 2026', 4,
    'Fast and cheap. Ask for the green salsa.'),

  // Teriyaki rice bowl (tamari) · Koji Kitchen. Little recent evidence: mostly what staff said.
  visit('r4', 'rice-bowl', 'marcus', 'Sep 28, 2026', 3,
    'The server said they use tamari, but it came already mixed in. I asked about the wok and they said they would check, but I never got an answer.',
    { sauce: 'told', wok: 'told' }),
  visit('k2', 'rice-bowl', 'ethan', 'Feb 21, 2026', 3,
    'Server said the sauce is made with tamari for GF orders. I had no way to check it myself.',
    { sauce: 'told' }),
  visit('k3', 'rice-bowl', 'kenji', 'Jan 30, 2026', 3,
    'Staff told me they use a separate wok, but the kitchen is out of sight. Flavor was fine, a bit sweet.',
    { wok: 'told' }),
  visit('k4', 'rice-bowl', 'tess', 'Oct 4, 2026', 4,
    "Big portion for the price. Didn't ask about the kitchen."),
  visit('k5', 'rice-bowl', 'olivia', 'Aug 9, 2026', 3,
    'Rice was a little mushy this time. Teriyaki flavor was good.'),

  // Grilled salmon with roasted potatoes · Juniper Grill
  visit('s1', 'salmon-plate', 'maya', 'Sep 30, 2026', 5,
    'They made it start to finish on the clean side of the line: new gloves, a separate board, and a fresh pan for the potatoes.',
    { prep: 'saw', gloves: 'saw', utensils: 'saw' }),
  visit('s2', 'salmon-plate', 'alex', 'Sep 22, 2026', 4,
    'Separate board and a glove change, same as the burger. Salmon was cooked perfectly.',
    { prep: 'saw', gloves: 'saw' }),
  visit('s3', 'salmon-plate', 'grace', 'Oct 16, 2026', 5,
    'I asked how the potatoes are roasted and they showed me a clean sheet pan just for GF orders.',
    { utensils: 'saw' }),
  visit('s4', 'salmon-plate', 'devin', 'Oct 1, 2026', 4,
    'Light and filling. The lemon butter is worth it.'),
  visit('s5', 'salmon-plate', 'lauren', 'Oct 23, 2026', 4,
    'Glove change and a separate prep area, both where I could see them. A bit pricey.',
    { prep: 'saw', gloves: 'saw' }),
  visit('s6', 'salmon-plate', 'ben', 'Aug 19, 2026', 5,
    'Cook grabbed a clean spatula and pan for my plate without me asking.',
    { utensils: 'saw' }),
  visit('s7', 'salmon-plate', 'luis', 'Sep 5, 2026', 4,
    'Good portion of salmon, potatoes were crispy.'),
  visit('s8', 'salmon-plate', 'claire', 'Oct 12, 2026', 4,
    'GF orders are prepped on their own counter by the window. Easy to watch.',
    { prep: 'saw' }),

  // Carnitas burrito bowl · Casa Verde. Few celiac / strict reports, and the newest is old.
  visit('c1', 'carnitas-bowl', 'sam', 'Aug 2, 2026', 4,
    'Saw the glove change. Asked about the serving spoons and was told they use clean ones for GF bowls.',
    { gloves: 'saw', utensils: 'told' }),
  visit('c2', 'carnitas-bowl', 'tess', 'Sep 8, 2026', 4,
    'The person at the line said they switch to clean spoons if you say gluten-free. Did not see it happen myself.',
    { utensils: 'told' }),
  visit('c3', 'carnitas-bowl', 'ethan', 'Aug 25, 2026', 5,
    'Carnitas are crispy and the bowl is huge.'),
  visit('c4', 'carnitas-bowl', 'olivia', 'Oct 10, 2026', 4,
    'Staff said they change gloves for gluten-free. Good bowl, a little salty.',
    { gloves: 'told' }),
  visit('c5', 'carnitas-bowl', 'luis', 'Oct 20, 2026', 3,
    'Rice was dry this time. Carnitas still good.'),
  visit('c6', 'carnitas-bowl', 'devin', 'Jul 12, 2026', 4,
    'Was told they use clean utensils for GF. Busy lunch rush, so I did not ask more.',
    { utensils: 'told' }),

  // Pad thai with rice noodles · Lotus Thai Kitchen. Wok disputed: 1 saw it shared, 2 saw it cleaned.
  visit('p1', 'pad-thai', 'priya', 'Sep 20, 2026', 5,
    'Watched them rinse the wok before my order, and they showed me the tamari bottle.',
    { sauce: 'saw', wok: 'saw' }),
  visit('p2', 'pad-thai', 'jordan', 'Sep 6, 2026', 2,
    'The cook tossed my rice noodles in the wok that had just made lo mein, no rinse. They remade it when I said something, but I left nervous.',
    { sauce: 'saw', wok: 'no' }),
  visit('p3', 'pad-thai', 'kenji', 'Aug 30, 2026', 5,
    'Cook scrubbed and rinsed the wok in front of me before starting my order. Tamari, not soy sauce.',
    { sauce: 'saw', wok: 'saw' }),
  visit('p4', 'pad-thai', 'hannah', 'Oct 24, 2026', 4,
    'They brought the tamari bottle to the table so I could read the label. Could not see the wok from where I sat.',
    { sauce: 'saw' }),
  visit('p5', 'pad-thai', 'ethan', 'Sep 28, 2026', 5,
    'Best pad thai in Orem. Ask for it spicy.'),
  visit('p6', 'pad-thai', 'olivia', 'Sep 15, 2026', 4,
    'Server said they make it with tamari for gluten-free. Tasted great.',
    { sauce: 'told' }),
  visit('p7', 'pad-thai', 'ben', 'Jul 26, 2026', 4,
    'Tamari bottle came out with the dish, so I could check it.',
    { sauce: 'saw' }),
  visit('p8', 'pad-thai', 'tess', 'Oct 7, 2026', 5,
    'Generous portion, lots of peanuts. Will be back.'),
  visit('p9', 'pad-thai', 'nate', 'Oct 30, 2026', 4,
    'The server said they clean the wok between orders, but I could not see the kitchen from my table.',
    { wok: 'told' }),
  visit('p10', 'pad-thai', 'rosa', 'Aug 12, 2026', 4,
    'Tamari confirmed — they showed me the bottle. Noodles a little soft.',
    { sauce: 'saw' }),

  // Gluten-free crust margherita pizza · Slice Society. Nothing recent; pizza cutter disputed.
  visit('z1', 'gf-pizza', 'lauren', 'Apr 29, 2026', 4,
    'They took a cutter from a separate drawer marked GF and cut mine on its own tray.',
    { utensils: 'saw' }),
  visit('z2', 'gf-pizza', 'grace', 'Apr 11, 2026', 2,
    'The same cutter went from a pepperoni pizza straight into my GF one. They offered to remake it, but I did not stay.',
    { utensils: 'no' }),
  visit('z3', 'gf-pizza', 'devin', 'May 3, 2026', 4,
    'Staff said the GF crusts are topped on their own counter. Crust was crispier than I expected.',
    { prep: 'told' }),
  visit('z4', 'gf-pizza', 'tess', 'Mar 20, 2026', 3,
    'Crust is a bit like cardboard, but the toppings are good.'),
  visit('z5', 'gf-pizza', 'luis', 'Feb 14, 2026', 4,
    'Fun date-night spot. GF crust costs $3 extra.'),
  visit('z6', 'gf-pizza', 'olivia', 'Apr 2, 2026', 3,
    'Was told GF pizzas are made in a separate area. Could not see it from the dining room.',
    { prep: 'told' }),

  // Sweet potato breakfast hash · Sunrise Café. Open kitchen, so most reports saw the practices.
  visit('h1', 'breakfast-hash', 'claire', 'Oct 2, 2026', 5,
    'Open kitchen, so I watched the whole thing: separate board, glove change, and a clean skillet for the hash.',
    { prep: 'saw', gloves: 'saw', utensils: 'saw' }),
  visit('h2', 'breakfast-hash', 'alex', 'Sep 26, 2026', 4,
    'GF orders get their own corner of the prep counter, and the cook changed gloves before starting mine.',
    { prep: 'saw', gloves: 'saw' }),
  visit('h3', 'breakfast-hash', 'lauren', 'Sep 14, 2026', 5,
    'Clean skillet and spatula, right in front of the counter seats. The hash is amazing.',
    { utensils: 'saw' }),
  visit('h4', 'breakfast-hash', 'maya', 'Oct 19, 2026', 4,
    'Glove change before my order, like always. Got the hash with a poached egg.',
    { gloves: 'saw' }),
  visit('h5', 'breakfast-hash', 'rosa', 'Sep 29, 2026', 4,
    'GF prep area is separate from the toast station. Weekend wait was about 30 minutes.',
    { prep: 'saw' }),
  visit('h6', 'breakfast-hash', 'ethan', 'Oct 5, 2026', 5,
    'Best breakfast in Provo. The sweet potatoes are perfectly crispy.'),
  visit('h7', 'breakfast-hash', 'nate', 'Oct 26, 2026', 4,
    'Our server said the cooks always change gloves for gluten-free. I was in the back booth, so I did not see it.',
    { gloves: 'told' }),
  visit('h8', 'breakfast-hash', 'tess', 'Aug 31, 2026', 4,
    'Cozy café, friendly staff. Hash could use more seasoning.'),
  visit('h9', 'breakfast-hash', 'luis', 'Oct 12, 2026', 4,
    'Great coffee too. Go early on Saturdays.'),
  visit('h10', 'breakfast-hash', 'grace', 'Sep 21, 2026', 4,
    'Separate prep corner and a clean pan. They take gluten-free seriously here.',
    { prep: 'saw', utensils: 'saw' }),
  visit('h11', 'breakfast-hash', 'marcus', 'Oct 29, 2026', 3,
    'GF orders are made on their own counter, which I could see. Hash was a little greasy today.',
    { prep: 'saw' }),

  // Buckwheat pancakes with berries · Sunrise Café
  visit('bp1', 'buckwheat-pancakes', 'nora', 'Oct 25, 2026', 5,
    'They keep one griddle section just for buckwheat and scrape it first. I watched from the counter. Fluffier than I expected.',
    { prep: 'saw', utensils: 'saw' }),
  visit('bp2', 'buckwheat-pancakes', 'mei', 'Oct 8, 2026', 4,
    'Batter is mixed at the same separate counter as the hash. Clean spatula too.',
    { prep: 'saw', utensils: 'saw' }),
  visit('bp3', 'buckwheat-pancakes', 'jess', 'Oct 18, 2026', 5,
    'The berry compote is the best part. Get there before the church crowd.'),
  visit('bp4', 'buckwheat-pancakes', 'amara', 'Sep 19, 2026', 4,
    'Saw a fresh spatula come out for my stack. A little dense, but good flavor.',
    { utensils: 'saw' }),
  visit('bp5', 'buckwheat-pancakes', 'will', 'Sep 2, 2026', 3,
    'Tasty, but small for the price. Staff said the griddle gets cleaned first.',
    { utensils: 'told' }),
  visit('bp6', 'buckwheat-pancakes', 'theo', 'Aug 16, 2026', 4,
    'Separate mixing area, right where you can see it from the door.',
    { prep: 'saw' }),

  // Gluten-free cinnamon roll · Honey & Oat Bakery. An all gluten-free bakery.
  visit('cr1', 'cinnamon-roll', 'hannah', 'Oct 30, 2026', 5,
    'The whole bakery is gluten-free and no flour bags are in sight. I watched them box mine with fresh gloves and clean tongs.',
    { prep: 'saw', gloves: 'saw', utensils: 'saw' }),
  visit('cr2', 'cinnamon-roll', 'nora', 'Oct 12, 2026', 5,
    'First cinnamon roll I have had in nine years. I may have cried a little. Fresh gloves at the counter.',
    { gloves: 'saw' }),
  visit('cr3', 'cinnamon-roll', 'lauren', 'Oct 4, 2026', 5,
    'I asked to see the back and they showed me: one kitchen, all gluten-free.',
    { prep: 'saw' }),
  visit('cr4', 'cinnamon-roll', 'jess', 'Oct 22, 2026', 4,
    'Very sweet, so split one with a friend. Still warm at 9am.'),
  visit('cr5', 'cinnamon-roll', 'owen', 'Sep 24, 2026', 5,
    'Clean tongs for every order. My kid could not tell it was gluten-free.',
    { utensils: 'saw' }),
  visit('cr6', 'cinnamon-roll', 'dana', 'Sep 11, 2026', 4,
    'Worth the drive from Spanish Fork. They sell out by noon.'),
  visit('cr7', 'cinnamon-roll', 'theo', 'Aug 29, 2026', 4,
    'Glove change between the register and the case. Icing is a little heavy for me.',
    { gloves: 'saw' }),
  visit('cr8', 'cinnamon-roll', 'tess', 'Aug 14, 2026', 5,
    'Soft all the way through, which is rare for gluten-free baking.'),
  visit('cr9', 'cinnamon-roll', 'grace', 'Jul 21, 2026', 4,
    'Dedicated kitchen is the real deal. I checked before ordering.',
    { prep: 'saw' }),

  // Turkey avocado sandwich on GF bread · Honey & Oat Bakery
  visit('ts1', 'turkey-sandwich', 'amara', 'Oct 20, 2026', 4,
    'Built on a clean counter with fresh gloves. The bread holds up better than most.',
    { prep: 'saw', gloves: 'saw' }),
  visit('ts2', 'turkey-sandwich', 'mei', 'Oct 2, 2026', 5,
    'Everything in this kitchen is gluten-free, and they still change gloves. Good avocado too.',
    { prep: 'saw', gloves: 'saw' }),
  visit('ts3', 'turkey-sandwich', 'jess', 'Oct 15, 2026', 4,
    'Nice quick lunch. Add the pickled onions.'),
  visit('ts4', 'turkey-sandwich', 'alex', 'Sep 16, 2026', 4,
    'Saw the glove change. Sandwich was a bit small, so I added soup.',
    { gloves: 'saw' }),
  visit('ts5', 'turkey-sandwich', 'will', 'Aug 27, 2026', 3,
    'Bread was a little dry the day I went. Service was friendly.'),

  // Chicken shawarma plate with rice · Olive & Thyme
  visit('sw1', 'shawarma-plate', 'theo', 'Oct 28, 2026', 5,
    'I told them I am strict and the cook changed gloves, cleaned the board and picked up a fresh knife. Garlic sauce is excellent.',
    { prep: 'saw', gloves: 'saw', utensils: 'saw' }),
  visit('sw2', 'shawarma-plate', 'ben', 'Oct 13, 2026', 4,
    'They keep pita at the far end of the line, away from the plates. Fresh gloves for mine.',
    { prep: 'saw', gloves: 'saw' }),
  visit('sw3', 'shawarma-plate', 'kenji', 'Sep 30, 2026', 5,
    'Fresh knife for the chicken, away from the pita station. One of my regular spots now.',
    { prep: 'saw', utensils: 'saw' }),
  visit('sw4', 'shawarma-plate', 'dana', 'Oct 6, 2026', 4,
    'Big plate. The pickled turnips are great.'),
  visit('sw5', 'shawarma-plate', 'priya', 'Sep 14, 2026', 4,
    'New gloves and a clean spoon for the rice. Chicken was a touch dry this time.',
    { gloves: 'saw', utensils: 'saw' }),
  visit('sw6', 'shawarma-plate', 'luis', 'Aug 23, 2026', 5,
    'Best lunch deal near campus.'),
  visit('sw7', 'shawarma-plate', 'owen', 'Aug 8, 2026', 4,
    'Staff said they swap gloves for gluten-free orders. I was at a table, so I did not see it.',
    { gloves: 'told' }),
  visit('sw8', 'shawarma-plate', 'tess', 'Jul 25, 2026', 4,
    'Good portion, fast service. Parking is tricky.'),

  // Falafel bowl with tahini · Olive & Thyme. Fryer disputed: 2 saw it shared, 1 saw it dedicated.
  visit('fb1', 'falafel-bowl', 'mei', 'Oct 17, 2026', 2,
    'Bowl was prepped carefully, but I watched pita chips go in the fryer right before my falafel. Could not eat it.',
    { prep: 'saw', fryer: 'no' }),
  visit('fb2', 'falafel-bowl', 'sam', 'Sep 26, 2026', 4,
    'The manager showed me a small fryer used only for falafel. Prep counter was separate as well.',
    { prep: 'saw', fryer: 'saw' }),
  visit('fb3', 'falafel-bowl', 'rosa', 'Sep 3, 2026', 3,
    'On the Friday rush, pita chips and falafel were in the same oil. Ask before you order.',
    { fryer: 'no' }),
  visit('fb4', 'falafel-bowl', 'jess', 'Oct 9, 2026', 5,
    'Crispy falafel and lots of tahini. I am sensitive, not celiac, and it was fine for me.'),
  visit('fb5', 'falafel-bowl', 'will', 'Aug 30, 2026', 4,
    'Staff told me the falafel has its own fryer.',
    { fryer: 'told' }),
  visit('fb6', 'falafel-bowl', 'claire', 'Aug 11, 2026', 4,
    'Separate counter for the bowls. I skipped the falafel and got chicken instead until the fryer question is settled.',
    { prep: 'saw' }),

  // Roasted chicken harvest bowl · Harvest Bowl
  visit('hb1', 'harvest-bowl', 'lauren', 'Oct 15, 2026', 4,
    'Allergy orders go to a separate station at the end of the line. Sweet potatoes were great.',
    { prep: 'saw' }),
  visit('hb2', 'harvest-bowl', 'owen', 'Oct 1, 2026', 4,
    'I saw the allergy station. The person making mine said they change gloves, but I was not watching closely.',
    { prep: 'saw', gloves: 'told' }),
  visit('hb3', 'harvest-bowl', 'ethan', 'Oct 19, 2026', 5,
    'Filling and not boring, which is hard for a salad place.'),
  visit('hb4', 'harvest-bowl', 'jordan', 'Sep 8, 2026', 3,
    'Separate station is good. The croutons sit in an open bin nearby, so I asked them to make mine at the far end.',
    { prep: 'saw' }),
  visit('hb5', 'harvest-bowl', 'dana', 'Aug 18, 2026', 4,
    'Staff said gloves get changed if you mention gluten. The dressing is the highlight.',
    { gloves: 'told' }),
  visit('hb6', 'harvest-bowl', 'olivia', 'Jul 28, 2026', 3,
    'Chicken was cold when it got to me. Otherwise fine.'),

  // Smoked brisket plate · Red Mesa Smokehouse
  visit('br1', 'brisket-plate', 'alex', 'Oct 22, 2026', 5,
    'Pitmaster changed gloves and used a clean knife and board for mine. Sauce on the side, and they read me the label.',
    { gloves: 'saw', utensils: 'saw' }),
  visit('br2', 'brisket-plate', 'grace', 'Oct 7, 2026', 4,
    'Clean knife, fresh gloves. I had to wait a few minutes, which I was happy to do.',
    { gloves: 'saw', utensils: 'saw' }),
  visit('br3', 'brisket-plate', 'will', 'Oct 16, 2026', 5,
    'Smoke ring for days. Go early, they run out.'),
  visit('br4', 'brisket-plate', 'nora', 'Sep 25, 2026', 4,
    'Saw the glove change right at the cutting block. Beans have wheat, so I got slaw.',
    { gloves: 'saw' }),
  visit('br5', 'brisket-plate', 'ben', 'Sep 9, 2026', 5,
    'They wiped the block and got a fresh knife before slicing mine.',
    { utensils: 'saw' }),
  visit('br6', 'brisket-plate', 'luis', 'Aug 20, 2026', 4,
    'Good meat, a little pricey.'),
  visit('br7', 'brisket-plate', 'marcus', 'Oct 26, 2026', 4,
    'The person slicing said they use a separate knife for gluten-free. Could not see it from the line.',
    { utensils: 'told' }),

  // Miso-glazed salmon with rice · Koji Kitchen. Nothing recent, and only staff's word.
  visit('ms1', 'miso-salmon', 'kenji', 'Mar 28, 2026', 3,
    'Server said this miso has no barley and that tamari is used in the glaze. I would like to see a label next time.',
    { sauce: 'told' }),
  visit('ms2', 'miso-salmon', 'will', 'Apr 19, 2026', 4,
    'Salmon was cooked nicely. Staff said it is prepared apart from the regular teriyaki.',
    { prep: 'told' }),
  visit('ms3', 'miso-salmon', 'dana', 'Jun 2, 2026', 3,
    'Good salmon, small portion of rice. Did not ask about the kitchen.'),

  // Butter chicken with basmati rice · Saffron Table
  visit('bc1', 'butter-chicken', 'amara', 'Oct 19, 2026', 5,
    'Owner walked me through it: no naan near this station, and a clean ladle and pan for my order. I watched from the pass.',
    { prep: 'saw', utensils: 'saw' }),
  visit('bc2', 'butter-chicken', 'theo', 'Oct 3, 2026', 4,
    'Saw naan kept on the opposite side of the kitchen. Clean ladle for the sauce.',
    { prep: 'saw', utensils: 'saw' }),
  visit('bc3', 'butter-chicken', 'tess', 'Oct 11, 2026', 5,
    'So rich. Ask for medium if you are nervous about the spice.'),
  visit('bc4', 'butter-chicken', 'priya', 'Sep 17, 2026', 4,
    'Curries are made away from the tandoor and bread station. A bit heavy on the cream.',
    { prep: 'saw' }),
  visit('bc5', 'butter-chicken', 'sam', 'Aug 26, 2026', 4,
    'Clean pan for my order, and they double-checked what was in the marinade.',
    { utensils: 'saw' }),
  visit('bc6', 'butter-chicken', 'jess', 'Aug 9, 2026', 4,
    'Lunch buffet is cheaper, but order from the menu if you are worried about shared spoons.'),
  visit('bc7', 'butter-chicken', 'devin', 'Jul 16, 2026', 3,
    'Service was slow on a Friday. Food was good.'),

  // Chana masala with basmati rice · Saffron Table. Only a few reports so far.
  visit('cm1', 'chana-masala', 'mei', 'Sep 3, 2026', 4,
    'Clean ladle for mine, I saw that much. I could not tell where it was prepped.',
    { utensils: 'saw' }),
  visit('cm2', 'chana-masala', 'olivia', 'Sep 21, 2026', 4,
    'Staff said it is made away from the bread station. Nicely spiced.',
    { prep: 'told' }),

  // Beef pho with rice noodles · Pho Lan. Noodle basket disputed: 1 saw it shared, 2 saw it separate.
  visit('ph1', 'beef-pho', 'nora', 'Oct 11, 2026', 5,
    'They have a separate noodle basket for rice noodles, and I saw them use it. Brought tamari in place of hoisin.',
    { sauce: 'saw', utensils: 'saw' }),
  visit('ph2', 'beef-pho', 'jordan', 'Sep 18, 2026', 2,
    'The basket that came out of the egg noodle pot went straight into my rice noodles. Good broth, but I will not risk it again.',
    { utensils: 'no' }),
  visit('ph3', 'beef-pho', 'hannah', 'Sep 29, 2026', 4,
    'Separate basket, hanging on its own hook. Tamari bottle came to the table.',
    { sauce: 'saw', utensils: 'saw' }),
  visit('ph4', 'beef-pho', 'ethan', 'Oct 2, 2026', 5,
    'Broth is outstanding. Perfect for a cold day.'),
  visit('ph5', 'beef-pho', 'owen', 'Aug 24, 2026', 4,
    'Saw the tamari bottle, but sat too far away to see the noodles.',
    { sauce: 'saw' }),
  visit('ph6', 'beef-pho', 'will', 'Jul 31, 2026', 4,
    'Server said the rice noodles get their own pot. Generous herbs.',
    { utensils: 'told' }),
  visit('ph7', 'beef-pho', 'tess', 'Oct 21, 2026', 4,
    'Quick and cheap. Tiny parking lot.'),

  // Green curry with jasmine rice · Lotus Thai Kitchen
  visit('gc1', 'green-curry', 'ben', 'Oct 14, 2026', 5,
    'Made in its own pot on a separate burner, away from the wok station. Clean ladle too.',
    { prep: 'saw', utensils: 'saw' }),
  visit('gc2', 'green-curry', 'rosa', 'Sep 22, 2026', 4,
    'Curries have their own corner. It is easier to trust than the noodle dishes here.',
    { prep: 'saw' }),
  visit('gc3', 'green-curry', 'dana', 'Oct 5, 2026', 5,
    'Spicy and fragrant. I would order this again over the pad thai.'),
  visit('gc4', 'green-curry', 'lauren', 'Aug 25, 2026', 4,
    'Saw a clean ladle come out for my order. Good, but a bit thin.',
    { utensils: 'saw' }),
  visit('gc5', 'green-curry', 'jess', 'Aug 3, 2026', 4,
    'Nice lunch portion. The rice is always perfect.'),

  // Spicy tuna roll with tamari · Tide & Rice Sushi
  visit('tr1', 'tuna-roll', 'sam', 'Sep 27, 2026', 4,
    'Bottle of tamari on the bar, and they rolled mine on a fresh mat at a separate board. I could not tell about the knife.',
    { sauce: 'saw', prep: 'saw' }),
  visit('tr2', 'tuna-roll', 'grace', 'Sep 13, 2026', 4,
    'Sat at the bar. Fresh board for my roll and real tamari. The chef said the knife gets wiped first.',
    { sauce: 'saw', prep: 'saw', utensils: 'told' }),
  visit('tr3', 'tuna-roll', 'luis', 'Oct 8, 2026', 5,
    'Fresh tuna and a good kick. Check that the spicy sauce is the GF one.'),
  visit('tr4', 'tuna-roll', 'amara', 'Aug 22, 2026', 3,
    'Tamari was there, but I had to ask twice. Roll fell apart a little.',
    { sauce: 'saw' }),
  visit('tr5', 'tuna-roll', 'devin', 'Aug 1, 2026', 4,
    'Staff said the imitation crab is the thing to avoid here. Tuna roll is safe, they told me.',
    { sauce: 'told' }),

  // Chicken Caesar salad, no croutons · Slice Society. Old, and the salad bowl is disputed.
  visit('cc1', 'chicken-caesar', 'jordan', 'May 30, 2026', 2,
    'Watched them toss my salad in the bowl that had just had croutons in it. They redid it when I asked.',
    { utensils: 'no' }),
  visit('cc2', 'chicken-caesar', 'alex', 'Jun 9, 2026', 4,
    'They got a clean bowl and tongs from the back without me asking.',
    { utensils: 'saw' }),
  visit('cc3', 'chicken-caesar', 'olivia', 'May 12, 2026', 3,
    'Staff said salads are made in a separate area. Dressing was fine, nothing special.',
    { prep: 'told' }),
  visit('cc4', 'chicken-caesar', 'jess', 'Jun 21, 2026', 4,
    'Good option when everyone else wants pizza.'),

  // Country omelet with hash browns · Canyon Diner. Far away, and only staff's word.
  visit('co1', 'country-omelet', 'dana', 'Jul 18, 2026', 4,
    'My regular breakfast. The owner says omelets go on a clean part of the griddle, but I have not seen it myself.',
    { prep: 'told', utensils: 'told' }),
  visit('co2', 'country-omelet', 'nate', 'Oct 28, 2026', 3,
    'Hash browns were good, but nobody could really tell me how the griddle is shared. I would call ahead.',
    { utensils: 'told' }),
  visit('co3', 'country-omelet', 'owen', 'Jun 14, 2026', 4,
    'Huge omelet. Old-school diner with friendly staff.'),
]

// A "Matches my visit" or "Saw something different" vote by someone in `people`.
function vote(by, kind, date, details = {}) {
  const { name, reviewerType, verifier } = person(by)
  return { by, name, reviewerType, verifier, kind, date, ...details }
}

// Peer-review votes already on the example reports (rule: reportStatus in store.jsx).
// r1 is confirmed, r3 needs one more verifier match, r5 and z1 are disputed.
export const votes = {
  r1: [vote('alex', 'match', 'Sep 15, 2026'), vote('jordan', 'match', 'Sep 19, 2026')],
  r3: [vote('alex', 'match', 'Sep 27, 2026')],
  r5: [
    vote('jordan', 'dispute', 'Sep 20, 2026', {
      claims: ['Dedicated fryer'],
      note: 'Watched onion rings and fries go into the same fryer on my visit.',
    }),
  ],
  b4: [vote('maya', 'match', 'Sep 25, 2026'), vote('claire', 'match', 'Oct 3, 2026')],
  b5: [vote('hannah', 'match', 'Oct 24, 2026')],
  b6: [vote('rosa', 'match', 'Oct 11, 2026'), vote('kenji', 'match', 'Oct 21, 2026')],
  b12: [vote('maya', 'match', 'Sep 12, 2026'), vote('rosa', 'match', 'Sep 14, 2026')],
  t2: [vote('ben', 'match', 'Oct 20, 2026')],
  t3: [vote('hannah', 'match', 'Oct 8, 2026'), vote('priya', 'match', 'Oct 9, 2026')],
  s1: [vote('alex', 'match', 'Oct 2, 2026'), vote('lauren', 'match', 'Oct 23, 2026')],
  s2: [vote('maya', 'match', 'Oct 1, 2026'), vote('claire', 'match', 'Oct 12, 2026')],
  s3: [vote('lauren', 'match', 'Oct 23, 2026')],
  p1: [vote('kenji', 'match', 'Sep 22, 2026'), vote('rosa', 'match', 'Sep 25, 2026')],
  p3: [vote('rosa', 'match', 'Sep 2, 2026'), vote('priya', 'match', 'Sep 21, 2026')],
  z1: [
    vote('grace', 'dispute', 'Apr 30, 2026', {
      claims: ['Clean utensils'],
      note: 'On my visit the same cutter went from a pepperoni pizza to my GF one.',
    }),
  ],
  h1: [vote('alex', 'match', 'Oct 3, 2026'), vote('maya', 'match', 'Oct 19, 2026')],
  h2: [vote('rosa', 'match', 'Sep 29, 2026'), vote('claire', 'match', 'Oct 2, 2026')],
  h3: [vote('grace', 'match', 'Sep 21, 2026')],
  h10: [vote('lauren', 'match', 'Sep 22, 2026'), vote('rosa', 'match', 'Sep 29, 2026')],
}

// Which practice a claim is about, and whether it says the practice happened.
function readSeen(claim) {
  for (const [key, practice] of Object.entries(PRACTICES)) {
    if (claim.label === practice.label) return { key, happened: true }
    if (claim.label === practice.negative) return { key, happened: false }
  }
  return null // Staff's word, which a diner can't match.
}

// Reports from the last few weeks are left waiting for checks, so the review queue has work in it.
const CHECKED_BEFORE = new Date('Oct 10, 2026')

// Older reports with no votes above get matches from up to 2 verifiers who ate the same meal,
// saw at least one of the same things, and didn't see the opposite of anything in the report.
for (const report of reports) {
  if (votes[report.id] || new Date(report.date) >= CHECKED_BEFORE) continue
  const seen = report.claims.map(readSeen).filter(Boolean)
  const matches = reports.filter((other) => {
    if (other.mealId !== report.mealId || other.id === report.id) return false
    if (!people.find((p) => p.name === other.name).verifier) return false
    const theirs = other.claims.map(readSeen).filter(Boolean)
    const same = (a, b) => a.key === b.key && a.happened === b.happened
    const opposite = (a, b) => a.key === b.key && a.happened !== b.happened
    return theirs.some((a) => seen.some((b) => same(a, b))) && !theirs.some((a) => seen.some((b) => opposite(a, b)))
  })
  if (!matches.length) continue
  votes[report.id] = matches.slice(0, 2).map((other) => {
    const later = new Date(other.date) > new Date(report.date) ? other.date : report.date
    return vote(people.find((p) => p.name === other.name).id, 'match', later)
  })
}

// Food rating for a meal from its diner reports: { rating, count }. rating is null until
// someone rates it. Phone calls aren't reviews, so they don't count.
export function mealRating(mealId, allReports) {
  const reviews = allReports.filter((r) => r.mealId === mealId && r.source === 'visit')
  const rated = reviews.filter((r) => r.rating != null)
  const rating = rated.length ? rated.reduce((sum, r) => sum + r.rating, 0) / rated.length : null
  return { rating, count: reviews.length }
}

