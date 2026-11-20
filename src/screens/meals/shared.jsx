import { Link, useParams } from 'react-router-dom'
import { Icon, ReportStatus, ReviewCard } from '../../components'
import { findMeal } from '../../data/sample.js'
import { useStore } from '../../data/store.jsx'
import { mealReports } from './evidence.js'

// The meal named in the route, with its reports (newest first) from the shared store.
export function useMeal() {
  const { mealId } = useParams()
  const { state } = useStore()
  const meal = findMeal(mealId)
  return { meal, reports: meal ? mealReports(state.reports, meal.id) : [], votes: state.votes }
}

// One report as diners read it: who (with reviewer type), when, what they said, and where it
// stands in peer review. The practices it mentions are already counted in the safety check.
export function ReportItem({ report }) {
  const { state, statusOf } = useStore()
  const { status, matches } = statusOf(report)
  const disputes = (state.votes[report.id] ?? []).filter((v) => v.kind === 'dispute')
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
      {disputes.map((vote) => (
        <p key={vote.by} className="report-item__dispute t-meta">
          <Icon name="triangle" size={14} />
          <span>
            {vote.name} saw something different{vote.note && <>: “{vote.note}”</>}
          </span>
        </p>
      ))}
      <div className="report-item__foot">
        <ReportStatus status={status} matches={matches} />
        <Link className="text-btn t-meta" to={`/contribute/review/${report.id}`}>
          {isMine ? 'Who checked it' : 'Check this report'}
        </Link>
      </div>
    </div>
  )
}
