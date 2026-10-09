import { useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  ActionBar,
  Button,
  FilterChip,
  FilterChips,
  Notice,
  ScreenHeader,
  TextArea,
  TextField,
} from '../../components'
import { findMeal } from '../../data/sample.js'
import { formatISO, todayISO } from '../../data/dates.js'
import { useStore } from '../../data/store.jsx'

// Anyone can flag a conflict. One dispute is enough to mark the report and send it to moderation.
export default function ReviewConflict() {
  const { reportId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { actions, findReport } = useStore()
  const [chosen, setChosen] = useState([])
  const [note, setNote] = useState('')
  const [date, setDate] = useState(todayISO())
  const report = findReport(reportId)
  if (!report) return <Navigate to="/contribute/review" replace />

  const meal = findMeal(report.mealId)
  const options = [...report.claims.map((c) => c.label), 'Something else']
  const today = todayISO()
  const dateError = !date ? 'Enter the date you ate there.' : date > today ? "The date can't be in the future." : null
  const missing = [
    !chosen.length && 'pick what was different',
    !note.trim() && 'describe what you saw',
  ].filter(Boolean)

  const toggle = (label) =>
    setChosen((list) => (list.includes(label) ? list.filter((l) => l !== label) : [...list, label]))

  const send = () => {
    actions.vote(report.id, 'dispute', { claims: chosen, note: note.trim(), date })
    // Step back to the report this was opened from, so Back afterwards keeps returning the way
    // you came; replace only if this screen was opened directly.
    if (location.key === 'default') navigate(`/contribute/review/${report.id}`, { replace: true })
    else navigate(-1)
  }

  return (
    <>
      <ScreenHeader title="Something was different" backTo={`/contribute/review/${report.id}`} />
      <div className="section stack-4">
        <div className="stack-2">
          <h2 className="t-section-header">{meal.name}</h2>
          <p className="t-meta ink-secondary">
            Report by {report.name} · {report.date}
          </p>
        </div>

        <fieldset className="fieldset-plain stack-2">
          <legend className="t-card-header">What was different?</legend>
          <FilterChips label="What was different" wrap>
            {options.map((label) => (
              <FilterChip key={label} selected={chosen.includes(label)} onClick={() => toggle(label)}>
                {label}
              </FilterChip>
            ))}
          </FilterChips>
        </fieldset>

        <TextArea
          label="What did you see?"
          placeholder="e.g. Fries and onion rings went into the same fryer."
          hint="Describe what happened. Our moderators read every one."
          maxLength={500}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <TextField
          label="When did you eat there?"
          type="date"
          max={today}
          value={date}
          error={dateError}
          onChange={(e) => setDate(e.target.value)}
        />

        <Notice>
          The report will be marked <b>Conflict</b> and both versions stay visible, so diners can
          see there's a disagreement. The moderation team then checks the details.
          {date && !dateError && ` Your visit will show as ${formatISO(date)}.`}
        </Notice>
      </div>
      <ActionBar note={missing.length ? `To send, ${missing.join(' and ')}.` : dateError}>
        <Button
          variant="primary"
          block
          disabled={missing.length > 0 || Boolean(dateError)}
          onClick={send}
        >
          Send to moderation
        </Button>
      </ActionBar>
    </>
  )
}
