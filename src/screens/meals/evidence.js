import { PRACTICES, practicesForMeal } from '../../data/practices.js'
import { VERIFIER_TYPES } from '../../data/store.jsx'
import { daysSince } from '../account/data.js'

// Section B works out who said what about each kitchen practice from the shared reports and
// peer-review votes, so a report written in Contribute shows up here straight away.
// Rules and wording: docs/meal-trust-detail.md

// Anything with a shown `date` ('Sep 12, 2026'), newest first.
export function newestFirst(items) {
  const age = (item) => daysSince(item.date) ?? Infinity
  return [...items].sort((a, b) => age(a) - age(b))
}

export function mealReports(reports, mealId) {
  return newestFirst(reports.filter((r) => r.mealId === mealId))
}

const SAID_BY = { ' (staff said)': 'staff', ' (restaurant said)': 'restaurant' }

// Reads a claim label written by claimsFromAnswers back into a practice and how it's known:
// 'saw' · 'staff' · 'restaurant' · 'not' (seen not happening). null if it isn't a practice.
export function readClaim(label) {
  let name = label
  let how = 'saw'
  for (const [suffix, saidBy] of Object.entries(SAID_BY)) {
    if (name.endsWith(suffix)) {
      name = name.slice(0, -suffix.length)
      how = saidBy
    }
  }
  for (const [key, practice] of Object.entries(PRACTICES)) {
    if (practice.label === name) return { key, how }
    if (practice.negative === name) return { key, how: 'not' }
  }
  return null
}

// Every piece of evidence about each practice for one meal: { [practiceKey]: [item] }.
// A dispute counts as evidence too ('different'), about the practices it names.
export function mealEvidence(meal, reports, votes) {
  const byKey = Object.fromEntries(practicesForMeal(meal).map((key) => [key, []]))
  const add = (key, item) => {
    byKey[key] = [...(byKey[key] ?? []), item]
  }
  for (const report of reports) {
    for (const claim of report.claims) {
      const read = readClaim(claim.label)
      if (!read) continue
      add(read.key, {
        how: read.how,
        name: report.name,
        reviewerType: report.reviewerType,
        date: report.date,
        dateLabel: report.source === 'phone' ? 'Called' : 'Visited',
        report,
      })
    }
    for (const vote of votes[report.id] ?? []) {
      if (vote.kind !== 'dispute') continue
      for (const label of vote.claims ?? []) {
        const read = readClaim(label)
        if (!read) continue
        add(read.key, {
          how: 'different',
          name: vote.name,
          reviewerType: vote.reviewerType,
          date: vote.date,
          dateLabel: 'Ate there',
          note: vote.note,
          report,
        })
      }
    }
  }
  for (const key of Object.keys(byKey)) byKey[key] = newestFirst(byKey[key])
  return byKey
}

export const STATE_WORDS = {
  confirmed: 'Confirmed by diners',
  conflict: 'Reports disagree',
  unverified: 'Not confirmed yet',
}

const STATE_ORDER = ['conflict', 'unverified', 'confirmed']

// One row per practice for a meal. What's disputed or unconfirmed comes first, so a risk is
// never below the fold. A practice nobody has reported on is listed as not confirmed.
export function practiceRows(meal, evidence) {
  return Object.keys(evidence)
    .map((key) => {
      const precaution = meal.precautions.find((p) => p.key === key)
      return {
        key,
        // The practice's own name, so "saw it" and "saw otherwise" read the same on every row.
        label: PRACTICES[key].label,
        state: precaution?.state ?? 'unverified',
        items: evidence[key],
      }
    })
    .sort((a, b) => STATE_ORDER.indexOf(a.state) - STATE_ORDER.indexOf(b.state))
}

// "1 saw it · 1 told by staff · 2 saw otherwise · newest Sep 20, 2026"
export function evidenceSummary(items) {
  if (!items.length) return 'No reports yet'
  const count = (...hows) => items.filter((item) => hows.includes(item.how)).length
  const saw = count('saw')
  const told = count('staff', 'restaurant')
  const otherwise = count('not', 'different')
  return [
    saw && `${saw} saw it`,
    told && `${told} told by staff`,
    otherwise && `${otherwise} saw otherwise`,
    `newest ${items[0].date}`,
  ]
    .filter(Boolean)
    .join(' · ')
}
