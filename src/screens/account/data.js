// Section D (Account & Community) helpers. The people themselves live in data/sample.js,
// so every report author has a profile.
import { people } from '../../data/sample.js'

export const reviewers = people

export function findReviewer(id) {
  return reviewers.find((r) => r.id === id)
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Whole days between a shown date ('Sep 12, 2026') and today. null if it can't be read.
export function daysSince(shown) {
  const match = /^([A-Za-z]{3}) (\d{1,2}), (\d{4})$/.exec(shown ?? '')
  if (!match) return null
  const then = new Date(Number(match[3]), MONTHS.indexOf(match[1]), Number(match[2]))
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((today - then) / 86400000)
}
