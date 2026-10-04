import { Navigate, useNavigate } from 'react-router-dom'
import {
  ActionBar,
  Button,
  FilterChip,
  FilterChips,
  ScreenHeader,
  StepHeader,
  TextField,
} from '../../components'
import { findMeal } from '../../data/sample.js'
import { REVIEWER_TYPES } from '../../data/practices.js'
import { todayISO } from '../../data/dates.js'
import { useStore } from '../../data/store.jsx'
import { REPORT_STEPS } from './shared.jsx'

// Step 3. Every report carries a date and the reviewer's type.
export default function ReportVisit() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const draft = state.draft
  if (!draft) return <Navigate to="/contribute/report/meal" replace />

  const meal = findMeal(draft.mealId)
  const today = todayISO()
  const dateError = !draft.visitDate
    ? 'Enter the date you ate there.'
    : draft.visitDate > today
      ? "The visit date can't be in the future."
      : null

  return (
    <>
      <ScreenHeader title={meal.name} backTo="/contribute/report/practices" />
      <div className="section stack-4">
        <StepHeader step={3} total={REPORT_STEPS} title="When did you go?">
          Kitchens change, so every report shows its visit date.
        </StepHeader>
        <TextField
          label="Visit date"
          type="date"
          max={today}
          value={draft.visitDate}
          error={dateError}
          onChange={(e) => actions.updateDraft({ visitDate: e.target.value })}
        />
        <fieldset className="fieldset-plain stack-2">
          <legend className="t-card-header">How do you eat gluten-free?</legend>
          <p className="t-body ink-secondary">
            Shown next to your name so readers can weigh your report. This also updates your
            profile.
          </p>
          <FilterChips label="Reviewer type" wrap>
            {REVIEWER_TYPES.map((type) => (
              <FilterChip
                key={type}
                selected={draft.reviewerType === type}
                onClick={() => actions.updateDraft({ reviewerType: type })}
              >
                {type}
              </FilterChip>
            ))}
          </FilterChips>
        </fieldset>
      </div>
      <ActionBar note={dateError}>
        <Button
          variant="primary"
          block
          disabled={Boolean(dateError)}
          onClick={() => navigate('/contribute/report/rating')}
        >
          Next
        </Button>
      </ActionBar>
    </>
  )
}
