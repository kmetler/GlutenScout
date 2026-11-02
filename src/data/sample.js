// Made-up example content shared by every section. Add to it rather than inventing data per screen.
// Precaution `key`s refer to PRACTICES in practices.js.

import { claimsFromAnswers } from './practices.js'

export const meals = [
  {
    id: 'gf-burger',
    restaurantId: 'juniper-grill',
    name: 'Gluten-free bun cheeseburger',
    restaurant: 'Juniper Grill',
    phone: '(801) 555-0142',
    distance: '0.8 mi',
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
    distance: '1.4 mi',
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
    distance: '2.1 mi',
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
    distance: '0.8 mi',
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
    distance: '1.4 mi',
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
    distance: '3.2 mi',
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
    distance: '4.6 mi',
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
    distance: '0.5 mi',
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
]

export function findMeal(id) {
  return meals.find((meal) => meal.id === id)
}

// Restaurants, for Discover's restaurant list. GlutenScout never scores a restaurant as a whole:
// each meal keeps its own evidence, so a restaurant page is just a list of its meals.
export const restaurants = [
  { id: 'sunrise-cafe', name: 'Sunrise Café', cuisine: 'Breakfast', distance: '0.5 mi', phone: '(801) 555-0128', address: '210 N University Ave, Provo' },
  { id: 'juniper-grill', name: 'Juniper Grill', cuisine: 'American', distance: '0.8 mi', phone: '(801) 555-0142', address: '48 W Center St, Provo' },
  { id: 'casa-verde', name: 'Casa Verde', cuisine: 'Mexican', distance: '1.4 mi', phone: '(801) 555-0187', address: '1150 N 900 E, Provo' },
  { id: 'koji-kitchen', name: 'Koji Kitchen', cuisine: 'Japanese', distance: '2.1 mi', phone: '(801) 555-0119', address: '560 E 1860 S, Provo' },
  { id: 'lotus-thai', name: 'Lotus Thai Kitchen', cuisine: 'Thai', distance: '3.2 mi', phone: '(801) 555-0163', address: '75 S State St, Orem' },
  { id: 'slice-society', name: 'Slice Society', cuisine: 'Pizza', distance: '4.6 mi', phone: '(801) 555-0175', address: '1300 S Main St, Springville' },
]

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
  { id: 'luis', name: 'Luis A.', reviewerType: 'Gluten-sensitive', location: 'Provo, UT', reportCount: 8, verifier: false, memberSince: 'Jan 2026' },
  { id: 'ethan', name: 'Ethan C.', reviewerType: 'Gluten-sensitive', location: 'Provo, UT', reportCount: 7, verifier: false, memberSince: 'Jan 2026' },
  { id: 'olivia', name: 'Olivia H.', reviewerType: 'Gluten-sensitive', location: 'American Fork, UT', reportCount: 7, verifier: false, memberSince: 'Mar 2026' },
  { id: 'tess', name: 'Tess N.', reviewerType: 'Gluten-sensitive', location: 'Springville, UT', reportCount: 6, verifier: false, memberSince: 'Feb 2026' },
  { id: 'devin', name: 'Devin T.', reviewerType: 'Gluten-sensitive', location: 'Orem, UT', reportCount: 5, verifier: false, memberSince: 'Feb 2026' },
  { id: 'marcus', name: 'Marcus W.', reviewerType: 'Celiac', location: 'Provo, UT', reportCount: 3, verifier: false, memberSince: 'Aug 2026' },
  { id: 'nate', name: 'Nate G.', reviewerType: 'Celiac', location: 'Spanish Fork, UT', reportCount: 3, verifier: false, memberSince: 'Oct 2026' },
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
    'They brought out a bottle of tamari so I could see it. I asked about the wok and the server said they would check, but I never got an answer.',
    { sauce: 'saw', wok: 'told' }),
  visit('k2', 'rice-bowl', 'ethan', 'Feb 21, 2026', 3,
    'Server said the sauce is made with tamari for GF orders. It came already mixed in, so I could not check.',
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

// Food rating for a meal from its diner reports: { rating, count }. rating is null until
// someone rates it. Phone calls aren't reviews, so they don't count.
export function mealRating(mealId, allReports) {
  const reviews = allReports.filter((r) => r.mealId === mealId && r.source === 'visit')
  const rated = reviews.filter((r) => r.rating != null)
  const rating = rated.length ? rated.reduce((sum, r) => sum + r.rating, 0) / rated.length : null
  return { rating, count: reviews.length }
}

