// Example data used only by Section D (Account & Community). Made-up people.
// Reports match reviewers by `name`; peer-review votes match by `id` (the vote's `by`).
// reportCount covers all meals, not just the three in this prototype.
export const reviewers = [
  { id: 'maya', name: 'Maya R.', reviewerType: 'Celiac', location: 'Provo, UT', reportCount: 23, verifier: true, memberSince: 'Mar 2025' },
  { id: 'alex', name: 'Alex P.', reviewerType: 'Celiac', location: 'Provo, UT', reportCount: 31, verifier: true, memberSince: 'Oct 2024' },
  { id: 'jordan', name: 'Jordan L.', reviewerType: 'Strict GF', location: 'American Fork, UT', reportCount: 17, verifier: true, memberSince: 'Feb 2025' },
  { id: 'priya', name: 'Priya S.', reviewerType: 'Strict GF', location: 'Lehi, UT', reportCount: 11, verifier: true, memberSince: 'Jan 2026' },
  { id: 'sam', name: 'Sam K.', reviewerType: 'Celiac', location: 'Springville, UT', reportCount: 8, verifier: true, memberSince: 'Nov 2025' },
  { id: 'marcus', name: 'Marcus W.', reviewerType: 'Celiac', location: 'Provo, UT', reportCount: 3, verifier: false, memberSince: 'Aug 2026' },
  { id: 'devin', name: 'Devin T.', reviewerType: 'Gluten-sensitive', location: 'Orem, UT', reportCount: 5, verifier: false, memberSince: 'Jul 2026' },
]

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
