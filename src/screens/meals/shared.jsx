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

// The prototype stores some verification counts without individual report records.
export function ReviewerTally({ tally }) {
  const describe = (counts) =>
    Object.entries(counts)
      .map(([type, count]) => {
        const diner = count === 1 ? 'diner' : 'diners'
        if (type === 'Strict GF') return `${count} ${diner} who strictly ${count === 1 ? 'avoids' : 'avoid'} gluten`
        if (type === 'Celiac') return `${count} ${diner} with celiac disease`
        return `${count} gluten-sensitive ${diner}`
      })
      .join(', ')

  return (
    <>
      {tally.yesTotal > 0 && <span><b>Reported the practice:</b> {describe(tally.yes)}</span>}
      {tally.yesTotal > 0 && tally.noTotal > 0 && <br />}
      {tally.noTotal > 0 && <span><b>Reported otherwise:</b> {describe(tally.no)}</span>}
    </>
  )
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
