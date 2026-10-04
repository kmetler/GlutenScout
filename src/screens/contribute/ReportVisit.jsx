import { Navigate, useNavigate } from 'react-router-dom'
import { ActionBar, Button, ScreenHeader, StepHeader, TextField } from '../../components'
import { findMeal } from '../../data/sample.js'
import { todayISO } from '../../data/dates.js'
import { useStore } from '../../data/store.jsx'
import { REPORT_STEPS, ReviewerTypeSetting } from './shared.jsx'

// Step 3. Every report carries a date and the reviewer's type (from the profile).
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
  const typeMissing = !state.currentUser.reviewerType

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
        <ReviewerTypeSetting />
      </div>
      <ActionBar note={dateError ?? (typeMissing ? 'Choose how you eat gluten-free.' : null)}>
        <Button
          variant="primary"
          block
          disabled={Boolean(dateError) || typeMissing}
          onClick={() => navigate('/contribute/report/rating')}
        >
          Next
        </Button>
      </ActionBar>
    </>
  )
}
