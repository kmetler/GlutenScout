import { PRACTICES, practicesForMeal } from '../../data/practices.js'
import { VERIFIER_TYPES } from '../../data/store.jsx'
import { NAMES_TYPES, typeBreakdown } from '../../data/variant.js'
import { daysSince, reviewers } from '../account/data.js'
import { STALE_AFTER_DAYS } from '../account/SavedMeals.jsx'

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

// How old a shown date is, in words. Evidence older than STALE_AFTER_DAYS is called out.
export function freshness(shown) {
  const age = daysSince(shown)
  if (age == null || age < 0) return { ago: null, stale: false }
  const ago = age === 0 ? 'today' : age === 1 ? '1 day ago' : `${age} days ago`
  return { age, ago, stale: age > STALE_AFTER_DAYS }
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

const STATE_WORDS = {
  conflict: 'Reports disagree',
  unverified: 'Not confirmed yet',
}

// "3 diners", or in version B of the "Who verified it" test, "2 celiac and 1 strict GF diners".
export function dinerCount(items) {
  const who = NAMES_TYPES ? typeBreakdown(items) : items.length
  return `${who} diner${items.length > 1 ? 's' : ''}`
}

// How a practice row's state is put into words. Who verified it depends on the A/B test
// (data/variant.js): A says "Verified by diners", B names the types of diners who saw it.
export function stateWords(row) {
  if (row.state !== 'confirmed') return STATE_WORDS[row.state]
  const saw = row.items.filter((item) => item.how === 'saw')
  if (!NAMES_TYPES || !saw.length) return 'Verified by diners'
  return `Confirmed by ${dinerCount(saw)}`
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
// Version B of the A/B test names who saw: "2 celiac and 1 strict GF saw it".
export function evidenceSummary(items) {
  if (!items.length) return 'No reports yet'
  const who = (...hows) => {
    const matching = items.filter((item) => hows.includes(item.how))
    return matching.length && NAMES_TYPES ? typeBreakdown(matching) : matching.length
  }
  const saw = who('saw')
  const told = items.filter((item) => ['staff', 'restaurant'].includes(item.how)).length
  const otherwise = who('not', 'different')
  return [
    saw && `${saw} saw it`,
    told && `${told} told by staff`,
    otherwise && `${otherwise} saw otherwise`,
    `newest ${items[0].date}`,
  ]
    .filter(Boolean)
    .join(' · ')
}

// Source lines for the SafetyProfile, counted from the reports actually listed below it.
// Version A of the A/B test counts every diner's report without naming types.
export function mealSources(meal, reports) {
  const sources = meal.sources.filter((s) => s.label === 'Restaurant answers')
  if (!NAMES_TYPES) {
    const diners = reports.filter((r) => r.source === 'visit')
    if (diners.length) {
      sources.push({
        label: `${diners.length} diner report${diners.length > 1 ? 's' : ''}`,
        detail: `newest ${diners[0].date}`,
      })
    }
    return sources
  }
  const strict = reports.filter((r) => VERIFIER_TYPES.includes(r.reviewerType))
  if (strict.length) {
    sources.push({
      label: `${strict.length} celiac / strict report${strict.length > 1 ? 's' : ''}`,
      detail: `newest ${strict[0].date}`,
    })
  }
  return sources
}

// Everything that has happened to a meal's evidence, newest first:
// restaurant answers, reports, and the peer-review votes on those reports.
export function mealHistory(meal, reports, votes) {
  const events = []
  const restaurant = meal.sources.find((s) => s.label === 'Restaurant answers')
  if (restaurant) {
    events.push({ kind: 'restaurant', id: 'restaurant', date: restaurant.detail.replace(/^updated /, '') })
  }
  for (const report of reports) {
    events.push({ kind: 'report', id: report.id, date: report.date, report })
    for (const vote of votes[report.id] ?? []) {
      events.push({ kind: vote.kind, id: `${report.id}-${vote.by}`, date: vote.date, vote, report })
    }
  }
  return newestFirst(events)
}

// Community (Section D) profile for a report's author, if they have one.
export function reviewerIdFor(name) {
  return reviewers.find((r) => r.name === name)?.id
}
