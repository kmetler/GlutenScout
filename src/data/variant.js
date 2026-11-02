import { readStored, writeStored } from './storage.js'

// Interview A/B test: "Who verified it".
// A: verifications say "Verified by diners" and never name a reviewer type.
// B: every verification names the verifiers' types, e.g. "Confirmed by 3 celiac diners".
// Review cards show the reviewer type in both versions; only verification wording changes.
//
// Each browser is assigned A or B at random on its first visit and keeps it. Opening the app
// with ?v=a or ?v=b switches this browser to that version (handy for checking both).
// The version is tagged in Clarity as "verifiedBy" so recordings can be filtered by it.

const STORAGE_KEY = 'gs-variant'
const VARIANTS = ['A', 'B']

function fromUrl() {
  // HashRouter: the query can sit before the hash (/?v=b#/) or inside it (#/meals?v=b).
  const query = window.location.search || window.location.hash.split('?')[1] || ''
  const v = new URLSearchParams(query).get('v')?.toUpperCase()
  return VARIANTS.includes(v) ? v : null
}

function assign() {
  const forced = fromUrl()
  const stored = readStored(STORAGE_KEY)
  const variant = forced ?? (VARIANTS.includes(stored) ? stored : VARIANTS[Math.random() < 0.5 ? 0 : 1])
  writeStored(STORAGE_KEY, variant)
  return variant
}

// Fixed for the whole session, so screens can read it directly.
export const VERIFIED_BY = assign()

// Editing only the part after # doesn't reload the page, so a new ?v= would otherwise be
// ignored until a refresh. Reload once so the whole app switches together.
window.addEventListener('hashchange', () => {
  const forced = fromUrl()
  if (forced && forced !== VERIFIED_BY) {
    writeStored(STORAGE_KEY, forced)
    window.location.reload()
  }
})
export const NAMES_TYPES = VERIFIED_BY === 'B'

// "2 celiac and 1 strict GF" from anything with a reviewerType (reports, votes, evidence items).
export function typeBreakdown(items) {
  const counts = new Map()
  for (const { reviewerType } of items) {
    if (!reviewerType || reviewerType === 'Restaurant') continue
    const word = reviewerType === 'Strict GF' ? 'strict GF' : reviewerType.toLowerCase()
    counts.set(word, (counts.get(word) ?? 0) + 1)
  }
  const parts = [...counts].sort((a, b) => b[1] - a[1]).map(([word, n]) => `${n} ${word}`)
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)}` : parts[0] ?? ''
}
