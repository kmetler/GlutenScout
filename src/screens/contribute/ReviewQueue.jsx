import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Notice, ScreenHeader } from '../../components'
import { MATCHES_NEEDED, useStore } from '../../data/store.jsx'
import { newestFirst } from '../meals/evidence.js'
import { ReportRow } from './shared.jsx'

const FIRST_SHOWN = 8

// Other people's reports that still need checking: pending ones and conflicts.
export default function ReviewQueue() {
  const { state, statusOf } = useStore()
  const others = state.reports.filter((r) => r.author !== 'me' && r.claims.length > 0)
  const [showAll, setShowAll] = useState(false)
  // Closest to being confirmed first, then newest, so a single check does the most good.
  const pending = newestFirst(others.filter((r) => statusOf(r).status === 'pending')).sort(
    (a, b) => statusOf(b).matches - statusOf(a).matches,
  )
  const conflicts = others.filter((r) => statusOf(r).status === 'conflict')

  return (
    <>
      <ScreenHeader title="Review reports" backTo="/contribute" />
      <div className="section stack-3">
        <p className="t-body">
          Ate at one of these places recently? Tell us if the report matches what you saw. A report
          is confirmed when {MATCHES_NEEDED} celiac or strict gluten-free verifiers match it.
        </p>
        {!state.currentUser.isVerifier && (
          <Notice>
            Anyone can flag a conflict, but only verifiers' matches count toward confirming.{' '}
            <Link className="link" to="/contribute/verifier">
              Become a verifier
            </Link>
          </Notice>
        )}
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-section-header">Waiting for matches ({pending.length})</h2>
        {(showAll ? pending : pending.slice(0, FIRST_SHOWN)).map((r) => (
          <ReportRow key={r.id} report={r} />
        ))}
        {!showAll && pending.length > FIRST_SHOWN && (
          <button type="button" className="text-btn" onClick={() => setShowAll(true)}>
            Show all {pending.length}
          </button>
        )}
        {!pending.length && <p className="t-body ink-secondary">Nothing waiting right now.</p>}
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-section-header">Conflicts ({conflicts.length})</h2>
        <p className="t-meta ink-secondary">
          Reports someone disagreed with. The moderation team is checking these; you can still add
          what you saw.
        </p>
        {conflicts.map((r) => (
          <ReportRow key={r.id} report={r} />
        ))}
      </div>
    </>
  )
}
