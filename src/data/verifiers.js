import { useSyncExternalStore } from 'react'
import { PRACTICES } from './practices.js'
import { readStored, writeStored } from './storage.js'

// Who verified each kitchen practice, by reviewer type (example data — no backend).
// Added after user testing: Version B testers mostly didn't notice reviewer types inside the
// reports, and celiac testers gained almost no trust. So the type now sits on the safety
// check itself, and diners can choose whose verifications count (the strictness filter).
//
//   yes = saw it happen (or staff confirmed it)   no = saw it NOT happen
// Counts match each meal's badges and conflict notes in sample.js.
export const VERIFIED_BY = {
  // Verified only by celiac diners: identical under every filter, all green.
  'breakfast-hash': {
    prep: { yes: { Celiac: 3 } },
    gloves: { yes: { Celiac: 2 } },
    utensils: { yes: { Celiac: 3 } },
  },
  'corn-tacos': {
    fryer: { yes: { Celiac: 2 } },
    utensils: { yes: { Celiac: 2 } },
  },
  // Strict GF diners only: green until "Celiac only", then nothing is confirmed.
  'salmon-plate': {
    prep: { yes: { 'Strict GF': 2 } },
    utensils: { yes: { 'Strict GF': 2 } },
    gloves: { yes: { 'Strict GF': 1 } },
  },
  // Gluten-sensitive diners only: anything stricter than "All diners" shows nothing confirmed.
  'carnitas-bowl': {
    gloves: { yes: { 'Gluten-sensitive': 2 } },
  },
  // Mixed: some practices hold up under a stricter filter, some don't.
  'gf-burger': {
    prep: { yes: { Celiac: 2, 'Strict GF': 1 } },
    gloves: { yes: { 'Gluten-sensitive': 2 } },
    fryer: { yes: { 'Gluten-sensitive': 1 }, no: { Celiac: 1 } },
  },
  'pad-thai': {
    sauce: { yes: { 'Strict GF': 2, 'Gluten-sensitive': 1 } },
    wok: { yes: { 'Gluten-sensitive': 2 }, no: { Celiac: 1 } },
  },
  'gf-pizza': {
    utensils: { yes: { 'Strict GF': 1 }, no: { Celiac: 1 } },
  },
  'rice-bowl': {},
}

// Whose verifications count. Set by the diner with a filter — nothing to sign up for.
export const STRICTNESS = [
  { value: 'all', label: 'All diners', types: ['Celiac', 'Strict GF', 'Gluten-sensitive'], phrase: 'diners' },
  { value: 'strict', label: 'Celiac & strict GF', types: ['Celiac', 'Strict GF'], phrase: 'celiac & strict GF diners' },
  { value: 'celiac', label: 'Celiac only', types: ['Celiac'], phrase: 'celiac diners' },
]
export function strictnessOf(value) {
  return STRICTNESS.find((s) => s.value === value) ?? STRICTNESS[0]
}

// A practice confirmed by only one person is flagged: celiac testers said they want
// "at least two people" before trusting it.
export const ENOUGH_REPORTS = 2

const SHORT = { Celiac: 'celiac', 'Strict GF': 'strict GF', 'Gluten-sensitive': 'gluten-sensitive' }
const sum = (counts) => Object.values(counts).reduce((a, b) => a + b, 0)
function only(counts = {}, types) {
  return Object.fromEntries(Object.entries(counts).filter(([type]) => types.includes(type)))
}
// { Celiac: 2, 'Strict GF': 1 } → "2 celiac, 1 strict GF"
export function whoText(counts) {
  return Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([type, n]) => `${n} ${SHORT[type] ?? type}`)
    .join(', ')
}

// One practice, counted with the chosen strictness.
export function practiceTally(mealId, key, level = 'all') {
  const raw = VERIFIED_BY[mealId]?.[key]
  if (!raw) return null
  const { types } = strictnessOf(level)
  const yes = only(raw.yes, types)
  const no = only(raw.no, types)
  const yesTotal = sum(yes)
  const noTotal = sum(no)
  const state = noTotal ? 'conflict' : yesTotal ? 'confirmed' : 'unverified'
  return { yes, no, yesTotal, noTotal, state, thin: state === 'confirmed' && yesTotal < ENOUGH_REPORTS }
}

// The meal as seen with the chosen strictness: each practice's state is recounted, and each
// carries its tally. Everything downstream (badges, status line, sorting) just works.
export function withStrictness(meal, level = 'all') {
  if (!meal || !VERIFIED_BY[meal.id]) return meal
  const precautions = meal.precautions.map((p) => {
    const tally = practiceTally(meal.id, p.key, level)
    if (!tally) return p
    let label = p.label
    if (tally.state !== p.state) {
      const name = PRACTICES[p.key]?.label ?? p.label.replace(/\?$/, '')
      label = tally.state === 'conflict' ? `${name}?` : name
    }
    return { ...p, state: tally.state, label, tally }
  })
  return { ...meal, precautions, strictness: level }
}

// "Verified by" summary for a meal card: for each reviewer type that counts under the
// filter, the most people of that type who confirmed any one practice. Shown as tags
// (Celiac ×3 · Strict GF ×1) so the filter's effect is visible at a glance.
const TYPE_ORDER = ['Celiac', 'Strict GF', 'Gluten-sensitive']
export function mealVerifiers(meal, level = 'all') {
  const data = VERIFIED_BY[meal?.id]
  if (!data) return null
  const { types } = strictnessOf(level)
  const most = {}
  for (const practice of Object.values(data)) {
    for (const [type, n] of Object.entries(practice.yes ?? {})) {
      if (types.includes(type)) most[type] = Math.max(most[type] ?? 0, n)
    }
  }
  return TYPE_ORDER.filter((t) => most[t]).map((type) => ({ type, count: most[type] }))
}

// The chosen strictness, remembered in this browser and shared by every screen.
const KEY = 'gs-strictness-v1'
let level = strictnessOf(readStored(KEY)).value
const listeners = new Set()
export function setStrictness(value) {
  level = strictnessOf(value).value
  writeStored(KEY, level)
  listeners.forEach((l) => l())
}
export function useStrictness() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => level,
  )
}
