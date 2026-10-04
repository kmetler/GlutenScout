import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FilterChip,
  FilterChips,
  Icon,
  PrecautionBadge,
  ReportStatus,
  ReviewerTag,
} from '../../components'
import { findMeal } from '../../data/sample.js'
import { REVIEWER_TYPES } from '../../data/practices.js'
import { useStore } from '../../data/store.jsx'

// Reviewer type is a profile setting owned by Account. If it's missing we ask once here
// (and keep the choices open on this visit so a mis-tap can be fixed); otherwise just show it.
export function ReviewerTypeSetting({ label = 'How do you eat gluten-free?', hint }) {
  const { state, actions } = useStore()
  const { reviewerType } = state.currentUser
  const [askingHere] = useState(!reviewerType)

  if (!askingHere) {
    return (
      <div className="stack-2">
        <p className="t-body">
          Posting as <ReviewerTag type={reviewerType} />
          {' · '}
          <Link className="link" to="/account">
            Change in Account
          </Link>
        </p>
        {hint && <p className="t-caption ink-secondary">{hint}</p>}
      </div>
    )
  }

  return (
    <fieldset className="fieldset-plain stack-2">
      <legend className="t-card-header">{label}</legend>
      <p className="t-body ink-secondary">
        We'll save this to your profile and show it next to your name on every report, so readers
        can weigh what you share. You only need to answer once.
      </p>
      <FilterChips label="Reviewer type" wrap>
        {REVIEWER_TYPES.map((type) => (
          <FilterChip
            key={type}
            selected={reviewerType === type}
            onClick={() => actions.setReviewerType(type)}
          >
            {type}
          </FilterChip>
        ))}
      </FilterChips>
    </fieldset>
  )
}

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
