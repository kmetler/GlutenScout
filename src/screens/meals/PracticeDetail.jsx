import { Link, Navigate, useParams } from 'react-router-dom'
import {
  Button,
  Icon,
  PrecautionBadge,
  ReportStatus,
  ReviewerTag,
  ScreenHeader,
} from '../../components'
import { PRACTICES } from '../../data/practices.js'
import { useStore } from '../../data/store.jsx'
import { evidenceSummary, mealEvidence, practiceRows, STATE_WORDS } from './evidence.js'
import { useMeal } from './shared.jsx'

// What's known is grouped by how it's known: something a diner watched happen is stronger
// than something staff said, and a diner who saw otherwise is never hidden.
const GROUPS = [
  { title: 'Diners saw otherwise', hows: ['not', 'different'], tone: 'conflict', icon: 'triangle' },
  { title: 'Diners saw it happen', hows: ['saw'], tone: 'confirmed', icon: 'check' },
  { title: 'Staff said so', hows: ['staff', 'restaurant'], tone: 'unverified', icon: 'clock' },
]

function what(item, practice) {
  if (item.how === 'saw') return 'Saw it in the kitchen.'
  if (item.how === 'staff') return 'Was told by staff, and did not see it.'
  if (item.how === 'restaurant') return 'The restaurant said so by phone.'
  if (item.how === 'not') return `Saw: ${practice.negative.toLowerCase()}.`
  return `Saw something different from ${item.report.name}'s report.`
}

function EvidenceRow({ item, practice, tone, icon }) {
  const { statusOf } = useStore()
  const { status, matches } = statusOf(item.report)
  return (
    <li className={`event event--${tone}`}>
      <Icon name={icon} />
      <div className="event__main grow">
        <p className="t-reviewer-name">
          {item.name}
          <ReviewerTag type={item.reviewerType} />
        </p>
        <p className="t-caption ink-secondary">
          {item.dateLabel} {item.date}
        </p>
        <p className="t-body">{what(item, practice)}</p>
        {item.note && <p className="t-body">“{item.note}”</p>}
        {item.how !== 'different' && (
          <p>
            <ReportStatus status={status} matches={matches} />
          </p>
        )}
        <Link className="text-btn" to={`/contribute/review/${item.report.id}`}>
          Read the report
        </Link>
      </div>
    </li>
  )
}

// One practice for one meal: why it matters, and every dated piece of evidence about it.
export default function PracticeDetail() {
  const { practiceKey } = useParams()
  const { meal, reports, votes } = useMeal()
  if (!meal) return <Navigate to="/discover" replace />

  const row = practiceRows(meal, mealEvidence(meal, reports, votes)).find(
    (r) => r.key === practiceKey,
  )
  if (!row) return <Navigate to={`/meals/${meal.id}/practices`} replace />

  const practice = PRACTICES[row.key]
  const groups = GROUPS.map((group) => ({
    ...group,
    items: row.items.filter((item) => group.hows.includes(item.how)),
  })).filter((group) => group.items.length)

  return (
    <>
      <ScreenHeader title={practice.label} backTo={`/meals/${meal.id}/practices`} />

      <div className="section stack-3">
        <div className="stack-2">
          <h2 className="t-section-header">{practice.label}</h2>
          <p className="t-meta ink-secondary">
            {meal.name} · {meal.restaurant}
          </p>
        </div>
        <div>
          <PrecautionBadge state={row.state}>{STATE_WORDS[row.state]}</PrecautionBadge>
        </div>
        <p className="t-meta">{evidenceSummary(row.items)}</p>
        <p className="t-body ink-secondary">
          <b>Why it matters:</b> {practice.why}
        </p>
      </div>

      {groups.map((group) => (
        <div key={group.title}>
          <div className="band" />
          <div className="section">
            <h2 className="t-card-header">
              {group.title} · {group.items.length}
            </h2>
            <ul>
              {group.items.map((item) => (
                <EvidenceRow
                  key={`${item.report.id}-${item.name}-${item.how}`}
                  item={item}
                  practice={practice}
                  tone={group.tone}
                  icon={group.icon}
                />
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-card-header">
          {row.items.length ? 'Ask the restaurant yourself' : 'Nobody has reported on this yet'}
        </h2>
        <p className="t-body">“{practice.question}”</p>
        <Button block to={`/contribute/call/${meal.id}`}>
          <Icon name="phone" />
          Open the call-ahead script
        </Button>
        <Button block to={`/contribute/report/meal?meal=${meal.id}`}>
          Saw it yourself? Write a report
        </Button>
      </div>
    </>
  )
}
