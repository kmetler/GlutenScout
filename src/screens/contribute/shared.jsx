import { Link } from 'react-router-dom'
import { Icon, PrecautionBadge, ReportStatus, ReviewerTag } from '../../components'
import { findMeal } from '../../data/sample.js'
import { useStore } from '../../data/store.jsx'

export const REPORT_STEPS = 5

// Row for a report in the review queue and in My reports.
export function ReportRow({ report }) {
  const { statusOf } = useStore()
  const meal = findMeal(report.mealId)
  const { status, matches } = statusOf(report)
  return (
    <Link className="list-row" to={`/contribute/review/${report.id}`}>
      <span className="list-row__main stack-2">
        <span className="list-row__title t-card-header">{meal?.name}</span>
        <span className="list-row__detail t-meta ink-secondary">
          {report.name}
          <ReviewerTag type={report.reviewerType} /> · {report.date}
        </span>
        <span>
          <ReportStatus status={status} matches={matches} />
        </span>
      </span>
      <span className="list-row__chevron">
        <Icon name="chevron" />
      </span>
    </Link>
  )
}

export function ReportClaims({ claims }) {
  if (!claims.length) {
    return <p className="t-body ink-secondary">No kitchen practices reported.</p>
  }
  return (
    <div className="claims">
      {claims.map((claim) => (
        <PrecautionBadge key={claim.label} state={claim.state}>
          {claim.label}
        </PrecautionBadge>
      ))}
    </div>
  )
}
