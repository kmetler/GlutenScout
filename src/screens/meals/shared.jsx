import { Link, useParams } from 'react-router-dom'
import { Icon, ReportStatus, ReviewCard, ReviewerTag } from '../../components'
import { findMeal } from '../../data/sample.js'
import { useStore } from '../../data/store.jsx'
import { STALE_AFTER_DAYS } from '../account/SavedMeals.jsx'
import { ReportClaims } from '../contribute/shared.jsx'
import { freshness, mealReports, reviewerIdFor } from './evidence.js'

// The meal named in the route, with its reports (newest first) from the shared store.
export function useMeal() {
  const { mealId } = useParams()
  const { state } = useStore()
  const meal = findMeal(mealId)
  return { meal, reports: meal ? mealReports(state.reports, meal.id) : [], votes: state.votes }
}

// "Sep 12, 2026 · 24 days ago" — a date is easier to weigh with its age next to it.
export function datedAgo(shown) {
  const { ago } = freshness(shown)
  return ago ? `${shown} · ${ago}` : shown
}

// Shown only when a meal's evidence is old (research insight #2: recency matters).
export function StaleNote({ date }) {
  const { age, stale } = freshness(date)
  if (!stale) return null
  return (
    <p className="stale-note t-meta">
      <Icon name="triangle" size={15} />
      <span>
        This was last verified {age} days ago, more than {STALE_AFTER_DAYS}. Kitchens and staff
        change, so call ahead before you go.
      </span>
    </p>
  )
}

// One report as diners read it on a meal: who (with reviewer type), when, what they
// reported, and where it stands in peer review. Checking it happens in Contribute.
export function ReportItem({ report }) {
  const { state, statusOf } = useStore()
  const { status, matches } = statusOf(report)
  const disputes = (state.votes[report.id] ?? []).filter((v) => v.kind === 'dispute')
  const reviewerId = reviewerIdFor(report.name)
  const isMine = report.author === 'me'

  return (
    <div className="report-item stack-2">
      <ReviewCard
        name={report.name}
        reviewerType={report.reviewerType}
        location={report.location}
        reportCount={report.reportCount}
        date={report.date}
        dateLabel={report.source === 'phone' ? 'Called' : 'Visited'}
        rating={report.rating}
        showActions={false}
      >
        {report.body}
      </ReviewCard>
      <ReportClaims claims={report.claims} />
      <div>
        <ReportStatus status={status} matches={matches} />
      </div>
      {disputes.map((vote) => (
        <p key={vote.by} className="t-body">
          {vote.name}
          <ReviewerTag type={vote.reviewerType} /> saw something different on {vote.date}
          {vote.note && <>: “{vote.note}”</>}
        </p>
      ))}
      <div className="report-item__links">
        <Link className="text-btn" to={`/contribute/review/${report.id}`}>
          {isMine ? 'See who has checked your report' : 'Ate this too? Check this report'}
        </Link>
        {reviewerId && (
          <Link className="text-btn" to={`/account/community/${reviewerId}`}>
            About {report.name.split(' ')[0]}
          </Link>
        )}
      </div>
    </div>
  )
}
