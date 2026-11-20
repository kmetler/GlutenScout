import { Link } from 'react-router-dom'
import { Button, Icon } from '../../components'
import { PRACTICES } from '../../data/practices.js'
import { safetyStatus } from '../discover/shared.jsx'
import { mealEvidence, STATE_WORDS } from './evidence.js'

// The meal page's answer to "can I eat this?", readable in a glance: one status line, then
// one row per kitchen practice with an icon, its name and a two-word tally. Tap a row for
// who said what. Color always comes with an icon (and the icon with words).
const ICON = { confirmed: 'check', conflict: 'triangle', unverified: 'clock' }
const ORDER = ['conflict', 'unverified', 'confirmed']

function tally(state, items) {
  const count = (...hows) => items.filter((item) => hows.includes(item.how)).length
  const yes = count('saw', 'staff', 'restaurant')
  const no = count('not', 'different')
  const saw = count('saw')
  if (state === 'conflict') return `${yes} yes · ${no} no`
  if (state === 'confirmed') return saw ? `Seen by ${saw}` : ''
  return yes ? 'Staff said so' : 'No reports'
}

// The meal's own practices, plus any other practice someone has reported on.
function checkRows(meal, evidence) {
  const keys = [
    ...meal.precautions.map((p) => p.key),
    ...Object.keys(evidence).filter(
      (key) => evidence[key].length && !meal.precautions.some((p) => p.key === key),
    ),
  ]
  return keys
    .map((key) => ({
      key,
      label: PRACTICES[key].label,
      state: meal.precautions.find((p) => p.key === key)?.state ?? 'unverified',
      items: evidence[key] ?? [],
    }))
    .sort((a, b) => ORDER.indexOf(a.state) - ORDER.indexOf(b.state))
}

export default function SafetyCheck({ meal, reports, votes }) {
  const status = safetyStatus(meal)
  const rows = checkRows(meal, mealEvidence(meal, reports, votes))
  const needsCall = status.stale || rows.some((row) => row.state !== 'confirmed')

  return (
    <section className="safety-check" aria-label="Safety check">
      <div className={`safety-check__status is-${status.tone}`}>
        <span className="safety-check__icon" aria-hidden="true">
          <Icon name={status.icon} size={24} />
        </span>
        <div className="grow">
          <h2 className="t-card-header">{status.headline}</h2>
          <p className={`t-meta${status.stale ? ' safety-check__stale' : ' ink-secondary'}`}>
            {status.verified}
          </p>
        </div>
      </div>

      <ul className="safety-check__rows">
        {rows.map((row) => (
          <li key={row.key}>
            <Link
              className={`safety-row is-${row.state}`}
              to={`/meals/${meal.id}/practices/${row.key}`}
            >
              <span className="safety-row__icon">
                <Icon name={ICON[row.state]} size={16} />
              </span>
              <span className="safety-row__name t-body">
                <span className="visually-hidden">{STATE_WORDS[row.state]}: </span>
                {row.label}
              </span>
              <span className="safety-row__tally t-meta">{tally(row.state, row.items)}</span>
              <Icon name="chevron" size={16} />
            </Link>
          </li>
        ))}
      </ul>

      {needsCall && (
        <Button block to={`/contribute/call/${meal.id}`}>
          <Icon name="phone" />
          Call ahead
        </Button>
      )}
    </section>
  )
}
