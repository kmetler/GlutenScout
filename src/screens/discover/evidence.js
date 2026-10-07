import { meals } from '../../data/sample.js'
import { PRACTICES } from '../../data/practices.js'
import { daysSince } from '../account/data.js'

// How Discover ranks and filters meals. Plain rules, so the "How is this sorted?" screen
// can explain them in one breath (research insight: Pyper wanted to sort by verification
// strength and recency).

export const SORTS = [
  {
    value: 'evidence',
    label: 'Strongest evidence',
    detail: 'Most kitchen practices confirmed by diners first. Disagreements count against a meal.',
  },
  {
    value: 'recent',
    label: 'Most recently verified',
    detail: 'Newest "last verified" date first. Kitchens and staff change.',
  },
  {
    value: 'distance',
    label: 'Closest',
    detail: 'Shortest distance first.',
  },
]

export const DISTANCES = [1, 2, 5]
export const RECENCY = [
  { days: 30, label: 'This month' },
  { days: 90, label: 'Last 90 days' },
]
// Evidence older than this gets a "call ahead" nudge (same threshold as Saved meals).
export const STALE_AFTER_DAYS = 90

// Practices people can require. Labels come from practices.js so wording matches everywhere.
export const FILTER_PRACTICES = ['fryer', 'prep', 'gloves', 'utensils']

export function sortLabel(value) {
  return SORTS.find((s) => s.value === value)?.label ?? SORTS[0].label
}

export function miles(item) {
  return parseFloat(item.distance)
}

export function evidenceOf(meal) {
  const confirmed = meal.precautions.filter((p) => p.state === 'confirmed')
  const disputed = meal.precautions.filter((p) => p.state === 'conflict')
  const unconfirmed = meal.precautions.filter((p) => p.state === 'unverified')
  const age = daysSince(meal.lastVerified)
  return {
    confirmed: confirmed.length,
    disputed: disputed.map((p) => practiceName(p).toLowerCase()),
    unconfirmed: unconfirmed.length,
    total: meal.precautions.length,
    age,
    stale: age != null && age > STALE_AFTER_DAYS,
    score: confirmed.length - disputed.length,
  }
}

// Neutral names for sentences like "Reports disagree about the fryer" — no verdict in the noun.
const NEUTRAL_NAMES = {
  prep: 'prep area',
  gloves: 'glove changes',
  fryer: 'fryer',
  utensils: 'utensils',
  wok: 'wok',
  sauce: 'sauce',
}

export function practiceName(precaution) {
  return NEUTRAL_NAMES[precaution.key] ?? precaution.label.replace(/\?$/, '')
}

export function ageText(age) {
  if (age == null) return ''
  if (age <= 0) return 'today'
  if (age === 1) return 'yesterday'
  return `${age} days ago`
}

export function matchesFilters(meal, filters) {
  if (filters.maxMiles != null && miles(meal) > filters.maxMiles) return false
  if (filters.verifiedWithin != null) {
    const age = daysSince(meal.lastVerified)
    if (age == null || age > filters.verifiedWithin) return false
  }
  for (const key of filters.practices) {
    const found = meal.precautions.find((p) => p.key === key)
    if (!found || found.state !== 'confirmed') return false
  }
  return true
}

export function sortMeals(list, sort) {
  const byRecent = (a, b) => (evidenceOf(a).age ?? 9999) - (evidenceOf(b).age ?? 9999)
  const sorted = [...list]
  if (sort === 'distance') sorted.sort((a, b) => miles(a) - miles(b) || byRecent(a, b))
  else if (sort === 'recent') sorted.sort(byRecent)
  else sorted.sort((a, b) => evidenceOf(b).score - evidenceOf(a).score || byRecent(a, b))
  return sorted
}

export function findMeals(filters, sort) {
  return sortMeals(
    meals.filter((meal) => matchesFilters(meal, filters)),
    sort,
  )
}

export function activeFilterCount(filters) {
  return (
    (filters.maxMiles != null ? 1 : 0) +
    (filters.verifiedWithin != null ? 1 : 0) +
    filters.practices.length
  )
}

// Words for the active filters, e.g. "Within 2 mi · Dedicated fryer confirmed".
export function filterSummary(filters) {
  const parts = []
  if (filters.maxMiles != null) parts.push(`Within ${filters.maxMiles} mi`)
  const recency = RECENCY.find((r) => r.days === filters.verifiedWithin)
  if (recency) parts.push(`Verified ${recency.label.toLowerCase()}`)
  for (const key of filters.practices) parts.push(`${PRACTICES[key].label} confirmed`)
  return parts.join(' · ')
}

// Search across dish, restaurant, cuisine and practice names.
export function searchMeals(query, restaurantsById) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return meals.filter((meal) => {
    const restaurant = restaurantsById[meal.restaurantId]
    const haystack = [
      meal.name,
      meal.restaurant,
      restaurant?.cuisine,
      ...meal.precautions.map((p) => p.label),
      ...meal.precautions.map((p) => PRACTICES[p.key]?.label),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return q.split(/\s+/).every((word) => haystack.includes(word))
  })
}
