import { Link, Navigate } from 'react-router-dom'
import { Button, Icon, Notice, ReportStatus, ReviewerTag, ScreenHeader } from '../../components'
import { useStore, VERIFIER_TYPES } from '../../data/store.jsx'
import { freshness, mealHistory } from './evidence.js'
import { StaleNote, useMeal } from './shared.jsx'

const TONE_ICON = { confirmed: 'check', conflict: 'triangle', unverified: 'clock' }

function Who({ name, reviewerType }) {
  return (
    <>
      <b>{name}</b>
      <ReviewerTag type={reviewerType} />
    </>
  )
}

function Event({ event }) {
  const { statusOf } = useStore()
  const { kind, report, vote } = event
  let tone = 'unverified'
  let body

  if (kind === 'restaurant') {
    body = (
      <>
        <p className="t-body">
          <b>The restaurant</b> updated its answers.
        </p>
        <p className="t-caption ink-secondary">
          The restaurant's word alone stays unconfirmed until diners see it for themselves.
        </p>
      </>
    )
  } else if (kind === 'report') {
    const { status, matches } = statusOf(report)
    tone = status === 'pending' ? 'unverified' : status
    body = (
      <>
        <p className="t-body">
          <Who name={report.name} reviewerType={report.reviewerType} />{' '}
          {report.source === 'phone'
            ? 'answered questions about this meal.'
            : 'ate this and reported on it.'}
        </p>
        <p>
          <ReportStatus status={status} matches={matches} />
        </p>
        <Link className="text-btn" to={`/contribute/review/${report.id}`}>
          Read the report
        </Link>
      </>
    )
  } else if (kind === 'dispute') {
    tone = 'conflict'
    body = (
      <>
        <p className="t-body">
          <Who name={vote.name} reviewerType={vote.reviewerType} /> saw something different from{' '}
          {report.name}'s report.
        </p>
        {vote.note && <p className="t-body">“{vote.note}”</p>}
      </>
    )
  } else {
    const counts = vote.verifier && VERIFIER_TYPES.includes(vote.reviewerType)
    tone = counts ? 'confirmed' : 'unverified'
    body = (
      <>
        <p className="t-body">
          <Who name={vote.name} reviewerType={vote.reviewerType} /> said {report.name}'s report
          matches their own visit.
        </p>
        {!counts && (
          <p className="t-caption ink-secondary">
            Not counted — not a celiac or strict GF verifier.
          </p>
        )}
      </>
    )
  }

  return (
    <li className={`event event--${tone}`}>
      <Icon name={TONE_ICON[tone]} />
      <div className="event__main grow">
        <p className="t-meta ink-secondary">{event.date}</p>
        {body}
      </div>
    </li>
  )
}

// When this meal's evidence was last verified, and everything dated that led up to it
// (research insight #2: recency matters as much as the verification itself).
export default function MealHistory() {
  const { meal, reports, votes } = useMeal()
  if (!meal) return <Navigate to="/meals" replace />

  const { ago } = freshness(meal.lastVerified)
  const events = mealHistory(meal, reports, votes)

  return (
    <>
      <ScreenHeader title="Verification history" backTo={`/meals/${meal.id}`} />

      <div className="section stack-3">
        <div className="stack-2">
          <p className="t-meta ink-secondary">
            {meal.name} · {meal.restaurant}
          </p>
          <h2 className="t-section-header">Last verified {meal.lastVerified}</h2>
          {ago && <p className="t-emphasis">{ago}</p>}
        </div>
        <StaleNote date={meal.lastVerified} />
        <Notice>
          A report moves this date once another verifier's visit matches it. Reports nobody has
          matched yet, and disputed reports, are listed below but don't move it. If no report
          counts yet, it's the date the restaurant last updated its answers.
        </Notice>
        <Button block to={`/contribute/call/${meal.id}`}>
          <Icon name="phone" />
          Call ahead for today's answer
        </Button>
      </div>

      <div className="band" />

      <div className="section">
        <div className="stack-2">
          <h2 className="t-section-header">What happened, newest first</h2>
          <p className="t-caption ink-secondary">Example data: only a few events are shown.</p>
        </div>
        <ul>
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </>
  )
}
