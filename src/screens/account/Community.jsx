import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterChip, FilterChips, ListRow, ReviewerTag, ScreenHeader } from '../../components'
import { REVIEWER_TYPES } from '../../data/practices.js'
import { useStore } from '../../data/store.jsx'
import { useAccount } from './accountStore.js'
import { reviewers } from './data.js'
import { applyReportOrder, reportOrderLabel } from './shared.jsx'

const ALL = 'All'

// Newest visit date among a reviewer's reports in this prototype, or null.
export function newestReport(reviewer, reports) {
  const theirs = reports.filter((r) => r.name === reviewer.name && r.source === 'visit')
  if (!theirs.length) return null
  return theirs.map((r) => r.date).sort((a, b) => new Date(b) - new Date(a))[0]
}

function ReviewerRow({ reviewer, reports }) {
  const newest = newestReport(reviewer, reports)
  return (
    <ListRow
      to={`/account/community/${reviewer.id}`}
      title={
        <>
          {reviewer.name}
          <ReviewerTag type={reviewer.reviewerType} />
        </>
      }
      detail={[
        reviewer.location,
        `${reviewer.reportCount} reports`,
        reviewer.verifier ? 'Verifier' : null,
        newest ? `newest ${newest}` : null,
      ]
        .filter(Boolean)
        .join(' · ')}
    />
  )
}

// Reviewers near you, with their type shown first (research insight #3: trust is peer-based).
export default function Community() {
  const { state } = useStore()
  const { account } = useAccount()
  const [type, setType] = useState(ALL)
  const order = account.reportOrder

  const ordered = applyReportOrder(reviewers, order)
  const shown = type === ALL ? ordered : ordered.filter((r) => r.reviewerType === type)
  const followed = shown.filter((r) => account.following.includes(r.id))
  const others = shown.filter((r) => !account.following.includes(r.id))
  const hiddenByOrder = order === 'strict-only' && type === 'Gluten-sensitive'

  return (
    <>
      <ScreenHeader title="Community" backTo="/account" />

      <div className="section stack-3">
        <h2 className="t-section-header">Reviewers near {state.currentUser.location}</h2>
        <p className="t-body ink-secondary">
          The people behind the reports. Each one shows how they eat gluten-free, so you can weigh
          what they share.
        </p>
        <FilterChips label="Reviewer type">
          {[ALL, ...REVIEWER_TYPES].map((t) => (
            <FilterChip key={t} selected={type === t} onClick={() => setType(t)}>
              {t}
            </FilterChip>
          ))}
        </FilterChips>
        <p className="t-meta ink-secondary">
          Order: {reportOrderLabel(order)} ·{' '}
          <Link className="link" to="/account/settings">
            Change in Settings
          </Link>
        </p>
      </div>

      {followed.length > 0 && (
        <>
          <div className="band" />
          <div className="section">
            <h2 className="t-card-header">People you follow</h2>
            {followed.map((r) => (
              <ReviewerRow key={r.id} reviewer={r} reports={state.reports} />
            ))}
          </div>
        </>
      )}

      <div className="band" />

      <div className="section">
        {followed.length > 0 && <h2 className="t-card-header">Everyone else</h2>}
        {others.map((r) => (
          <ReviewerRow key={r.id} reviewer={r} reports={state.reports} />
        ))}
        {!shown.length && (
          <p className="t-body ink-secondary">
            {hiddenByOrder
              ? 'Your settings hide reports from gluten-sensitive diners, so they aren’t listed. Change “Whose reports come first” in Settings to see them.'
              : 'No reviewers of this type near you yet.'}
          </p>
        )}
      </div>
    </>
  )
}
