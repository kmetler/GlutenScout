import { Link, Navigate, useParams } from 'react-router-dom'
import { Button, ReportStatus, ReviewerTag, ScreenHeader, StarRating } from '../../components'
import { findMeal } from '../../data/sample.js'
import { useStore } from '../../data/store.jsx'
import { ReportClaims } from '../contribute/shared.jsx'
import { useAccount } from './accountStore.js'
import { findReviewer } from './data.js'
import { PersonHeader } from './shared.jsx'

// One reviewer: who they are, what they reported, and which reports they checked.
export default function ReviewerProfile() {
  const { reviewerId } = useParams()
  const { state, statusOf, findReport } = useStore()
  const { account, toggleFollow } = useAccount()
  const reviewer = findReviewer(reviewerId)
  if (!reviewer) return <Navigate to="/account/community" replace />

  const firstName = reviewer.name.split(' ')[0]
  const following = account.following.includes(reviewer.id)
  const theirReports = state.reports.filter((r) => r.name === reviewer.name && r.source === 'visit')
  const checked = Object.entries(state.votes).flatMap(([reportId, list]) =>
    list.filter((v) => v.by === reviewer.id).map((vote) => ({ vote, report: findReport(reportId) })),
  ).filter(({ report }) => report)

  return (
    <>
      <ScreenHeader title={reviewer.name} backTo="/account/community" />

      <div className="section stack-3">
        <PersonHeader
          name={reviewer.name}
          reviewerType={reviewer.reviewerType}
          detail={`${reviewer.location} · member since ${reviewer.memberSince} · ${reviewer.reportCount} reports`}
          isVerifier={reviewer.verifier}
        />
        <Button
          aria-pressed={following}
          onClick={() => toggleFollow(reviewer.id)}
        >
          {following ? 'Following · tap to unfollow' : `Follow ${firstName}`}
        </Button>
        <p className="t-caption ink-secondary">
          {following
            ? `${firstName} is listed first in Community.`
            : `People you follow are listed first in Community.`}
        </p>
      </div>

      <div className="band" />

      <div className="section">
        <div className="stack-2">
          <h2 className="t-section-header">Reports</h2>
          <p className="t-caption ink-secondary">Only meals in this prototype are shown.</p>
        </div>
        {theirReports.map((report) => {
          const meal = findMeal(report.mealId)
          const { status, matches } = statusOf(report)
          return (
            <div key={report.id} className="summary-block">
              <Link className="t-card-header link" to={`/meals/${report.mealId}`}>
                {meal?.name}
              </Link>
              <p className="t-meta ink-secondary">{meal?.restaurant}</p>
              <p className="t-caption ink-secondary">
                {report.name}
                <ReviewerTag type={report.reviewerType} /> · Visited {report.date}
              </p>
              <ReportStatus status={status} matches={matches} />
              <ReportClaims claims={report.claims} />
              {report.rating != null && <StarRating value={report.rating} size={14} />}
              <p className="t-body">{report.body}</p>
            </div>
          )
        })}
        {!theirReports.length && (
          <p className="t-body ink-secondary">
            {firstName} hasn't reported on any meals in this prototype yet.
          </p>
        )}
      </div>

      <div className="band" />

      <div className="section">
        <h2 className="t-section-header">Reports {firstName} checked</h2>
        {checked.map(({ vote, report }) => (
          <div key={report.id} className="summary-block">
            <Link className="t-card-header link" to={`/contribute/review/${report.id}`}>
              {findMeal(report.mealId)?.name}
            </Link>
            <p className="t-caption ink-secondary">
              Report by {report.name}
              <ReviewerTag type={report.reviewerType} /> · Visited {report.date}
            </p>
            <p className="t-body">
              {vote.kind === 'dispute'
                ? `Flagged a conflict on ${vote.date}: “${vote.note}”`
                : `Said it matches their own visit · ${vote.date}`}
            </p>
          </div>
        ))}
        {!checked.length && (
          <p className="t-body ink-secondary">
            {firstName} hasn't checked anyone's reports yet.
          </p>
        )}
      </div>
    </>
  )
}
