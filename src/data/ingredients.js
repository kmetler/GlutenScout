// Ingredients and hidden gluten for each meal (example data — no backend).
// Added after user testing: asked "What would you still want to know before ordering?", most
// testers named sauces, seasonings, marinades or flour, not kitchen practices. So each meal
// lists its main ingredients, then the components where gluten usually hides, each with a
// status and where that status came from.
//
// status:  'gf'      Gluten-free confirmed
//          'gluten'  Contains gluten (`fix` says how to order around it)
//          'ask'     Unknown – ask staff (`ask` is the question to ask)
// source:  { by: 'restaurant' }                    Listed by restaurant
//          { by: 'diners', who: { Celiac: 2 }, date }   Reported by N diners, by reviewer type
//          omitted                                 Not listed or reported yet
import { ENOUGH_REPORTS, whoText } from './verifiers.js'

const RESTAURANT = { by: 'restaurant' }

export const INGREDIENTS = {
  'gf-burger': {
    main: ['Beef patty', 'Cheddar', 'Gluten-free bun', 'Lettuce, tomato, onion', 'Fries'],
    components: [
      { name: 'Gluten-free bun', kind: 'Bread', status: 'gf', source: RESTAURANT },
      {
        name: 'Burger seasoning',
        kind: 'Seasoning blend',
        status: 'gf',
        source: { by: 'diners', who: { Celiac: 1, 'Strict GF': 1 }, date: 'Sep 12, 2026' },
      },
      {
        name: 'House burger sauce',
        kind: 'Sauce',
        status: 'ask',
        ask: 'Is the house sauce made with malt vinegar or Worcestershire?',
      },
      {
        name: 'Fries',
        kind: 'Fryer',
        status: 'ask',
        ask: 'Do the fries share oil with onion rings or anything breaded?',
        source: { by: 'diners', who: { Celiac: 1, 'Gluten-sensitive': 1 }, date: 'Sep 18, 2026' },
        sourceNote: 'disagree',
      },
    ],
  },
  'corn-tacos': {
    main: ['Corn tortillas', 'Carne asada', 'Onion and cilantro', 'Lime', 'Salsa verde'],
    components: [
      { name: 'Corn tortillas', kind: 'Bread', status: 'gf', source: RESTAURANT },
      {
        name: 'Carne asada marinade',
        kind: 'Marinade',
        status: 'gf',
        source: { by: 'diners', who: { Celiac: 2 }, date: 'Sep 24, 2026' },
      },
      { name: 'Salsa verde', kind: 'Sauce', status: 'gf', source: RESTAURANT },
      { name: 'Chips and taco shells', kind: 'Fryer', status: 'gf', source: RESTAURANT },
    ],
  },
  'rice-bowl': {
    main: ['Steamed rice', 'Chicken thigh', 'Broccoli', 'Carrots', 'Sesame seeds'],
    components: [
      {
        name: 'Teriyaki sauce',
        kind: 'Sauce',
        status: 'ask',
        ask: 'Does the teriyaki sauce contain wheat or regular soy sauce?',
      },
      {
        name: 'Chicken marinade',
        kind: 'Marinade',
        status: 'ask',
        ask: 'Is the chicken marinated in regular soy sauce before cooking?',
      },
      { name: 'Tamari', kind: 'Sauce', status: 'gf', source: { by: 'diners', who: { Celiac: 1 }, date: 'Sep 28, 2026' } },
      { name: 'Sesame oil', kind: 'Oil', status: 'gf', source: RESTAURANT },
    ],
  },
  'salmon-plate': {
    main: ['Atlantic salmon', 'Roasted potatoes', 'Asparagus', 'Lemon'],
    components: [
      {
        name: 'Lemon-herb glaze (no soy sauce)',
        kind: 'Marinade',
        status: 'gf',
        source: { by: 'diners', who: { 'Strict GF': 2 }, date: 'Sep 30, 2026' },
      },
      { name: 'Potato seasoning', kind: 'Seasoning blend', status: 'gf', source: RESTAURANT },
      { name: 'Herb butter', kind: 'Sauce', status: 'gf', source: RESTAURANT },
    ],
  },
  'carnitas-bowl': {
    main: ['Carnitas', 'Cilantro-lime rice', 'Black beans', 'Pico de gallo', 'Cheese'],
    components: [
      {
        name: 'Tortilla strips',
        kind: 'Topping',
        status: 'gluten',
        fix: 'Made from flour tortillas. Ask for none.',
        source: RESTAURANT,
      },
      {
        name: 'Carnitas spice blend',
        kind: 'Seasoning blend',
        status: 'ask',
        ask: 'Does the carnitas spice blend use wheat flour as a filler?',
      },
      {
        name: 'Black beans (no beer)',
        kind: 'Sauce',
        status: 'gf',
        source: { by: 'diners', who: { 'Gluten-sensitive': 1 }, date: 'Aug 2, 2026' },
      },
      { name: 'Pico de gallo', kind: 'Sauce', status: 'gf', source: RESTAURANT },
    ],
  },
  'pad-thai': {
    main: ['Rice noodles', 'Shrimp or tofu', 'Egg', 'Bean sprouts', 'Peanuts', 'Lime'],
    components: [
      { name: 'Pad thai sauce (tamarind)', kind: 'Sauce', status: 'gf', source: RESTAURANT },
      {
        name: 'Fish sauce',
        kind: 'Sauce',
        status: 'gf',
        source: { by: 'diners', who: { 'Strict GF': 2 }, date: 'Sep 20, 2026' },
      },
      { name: 'Tamari', kind: 'Sauce', status: 'gf', source: RESTAURANT },
      {
        name: 'Oyster sauce',
        kind: 'Sauce',
        status: 'ask',
        ask: 'Is oyster sauce added? Most brands contain wheat.',
      },
    ],
  },
  'gf-pizza': {
    main: ['Gluten-free crust', 'Tomato sauce', 'Fresh mozzarella', 'Basil'],
    components: [
      { name: 'Gluten-free crust', kind: 'Bread', status: 'gf', source: RESTAURANT },
      { name: 'Pizza sauce', kind: 'Sauce', status: 'gf', source: RESTAURANT },
      {
        name: 'Pan and peel dusting',
        kind: 'Flour',
        status: 'ask',
        ask: 'Is the pan or peel dusted with regular flour or semolina?',
      },
      {
        name: 'Garlic oil drizzle',
        kind: 'Oil',
        status: 'gf',
        source: { by: 'diners', who: { 'Strict GF': 1 }, date: 'Apr 29, 2026' },
      },
    ],
  },
  'breakfast-hash': {
    main: ['Sweet potato', 'Bell peppers and onion', 'Two eggs', 'Avocado', 'Breakfast sausage'],
    components: [
      {
        name: 'Country gravy',
        kind: 'Sauce',
        status: 'gluten',
        fix: 'Thickened with flour. Ask for none.',
        source: RESTAURANT,
      },
      {
        name: 'Hash seasoning',
        kind: 'Seasoning blend',
        status: 'gf',
        source: { by: 'diners', who: { Celiac: 3 }, date: 'Oct 2, 2026' },
      },
      { name: 'Breakfast sausage (no breadcrumb filler)', kind: 'Seasoning blend', status: 'gf', source: RESTAURANT },
      { name: 'Cooking oil (no shared fryer)', kind: 'Oil', status: 'gf', source: RESTAURANT },
    ],
  },
}

export const INGREDIENT_STATUS = {
  gluten: { label: 'Contains gluten', icon: 'close', tone: 'conflict' },
  ask: { label: 'Unknown – ask staff', icon: 'question', tone: 'unverified' },
  gf: { label: 'Gluten-free confirmed', icon: 'check', tone: 'confirmed' },
}
const ORDER = ['gluten', 'ask', 'gf']

const sum = (who) => Object.values(who).reduce((a, b) => a + b, 0)

// "Listed by restaurant" / "Reported by 3 diners (2 celiac, 1 strict GF)" / "Not listed yet".
// One diner's word gets the same "needs more reports" flag as the safety check.
// Every claim carries a date (DESIGN.md rule 4): a restaurant listing uses the date of that
// meal's "Restaurant answers" source in sample.js; diner reports carry their newest date.
export function sourceText(item, meal) {
  const { source } = item
  if (!source) return { text: 'Not listed by the restaurant yet' }
  if (source.by === 'restaurant') {
    const listed = meal?.sources?.find((s) => s.label === 'Restaurant answers')
    const date = listed?.detail.replace(/^updated /, '')
    return { text: date ? `Listed by restaurant, ${date}` : 'Listed by restaurant' }
  }
  const n = sum(source.who)
  const types = Object.keys(source.who)
  const who = whoText(source.who)
  const date = source.date ? `, ${source.date}` : ''
  if (item.sourceNote === 'disagree') return { text: `${n} diners disagree (${who})${date}` }
  // "Reported by 2 celiac diners" for one type; "Reported by 2 diners (1 celiac, 1 strict GF)".
  const noun = n === 1 ? 'diner' : 'diners'
  const text = types.length === 1 ? `Reported by ${who} ${noun}` : `Reported by ${n} ${noun} (${who})`
  return { text: `${text}${date}`, thin: item.status === 'gf' && n < ENOUGH_REPORTS }
}

export function mealIngredients(mealId) {
  const data = INGREDIENTS[mealId]
  if (!data) return null
  const components = [...data.components].sort(
    (a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status),
  )
  return { main: data.main, components }
}

// One line for meal cards and the section header: what's left to sort out before ordering.
export function ingredientSummary(mealId) {
  const data = INGREDIENTS[mealId]
  if (!data) return null
  const count = (status) => data.components.filter((c) => c.status === status).length
  const gluten = count('gluten')
  const ask = count('ask')
  const parts = []
  if (gluten) parts.push(`${gluten} contains gluten`)
  if (ask) parts.push(`${ask} to ask about`)
  if (!parts.length) {
    return { tone: 'confirmed', icon: 'check', text: 'all confirmed', gluten, ask }
  }
  return {
    tone: gluten ? 'conflict' : 'unverified',
    icon: gluten ? 'close' : 'question',
    text: parts.join(', '),
    gluten,
    ask,
  }
}
