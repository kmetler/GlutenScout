import { Link, Navigate } from 'react-router-dom'
import { Button, Icon, PrecautionBadge, ScreenHeader } from '../../components'
import { evidenceSummary, mealEvidence, practiceRows, STATE_WORDS } from './evidence.js'
import { useMeal } from './shared.jsx'

// Every kitchen practice for one meal and how well it has been checked (research insights
// #1 and #4: show the "how", and put cross-contamination before ingredients).
export default function MealPractices() {
  const { meal, reports, votes } = useMeal()
  if (!meal) return <Navigate to="/discover" replace />

  const rows = practiceRows(meal, mealEvidence(meal, reports, votes))

  return (
    <>
      <ScreenHeader title="Evidence by practice" backTo={`/meals/${meal.id}`} />

      <div className="section stack-2">
        <h2 className="t-section-header">{meal.name}</h2>
        <p className="t-meta ink-secondary">{meal.restaurant}</p>
        <p className="t-body ink-secondary">
          What diners and staff have said about how the kitchen handles this meal. Anything
          disputed or not confirmed comes first.
        </p>
      </div>

      <div className="band" />

      <div className="section">
        {rows.map((row) => (
          <Link key={row.key} className="list-row" to={`/meals/${meal.id}/practices/${row.key}`}>
            <span className="list-row__main stack-2">
              <span>
                <PrecautionBadge state={row.state}>{row.label}</PrecautionBadge>
              </span>
              <span className="list-row__title t-meta">{STATE_WORDS[row.state]}</span>
              <span className="list-row__detail t-meta ink-secondary">
                {evidenceSummary(row.items)}
              </span>
            </span>
            <span className="list-row__chevron">
              <Icon name="chevron" />
            </span>
          </Link>
        ))}
      </div>

      <div className="section stack-3">
        <Button block to={`/contribute/call/${meal.id}`}>
          <Icon name="phone" />
          Call ahead about this meal
        </Button>
        <p className="t-meta">
          <Link className="link" to="/account/help/badges">
            What do the badges mean?
          </Link>
        </p>
      </div>
    </>
  )
}
