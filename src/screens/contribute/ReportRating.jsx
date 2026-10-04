import { Navigate, useNavigate } from 'react-router-dom'
import { ActionBar, Button, ScreenHeader, StarInput, StepHeader, TextArea } from '../../components'
import { findMeal } from '../../data/sample.js'
import { useStore } from '../../data/store.jsx'
import { REPORT_STEPS } from './shared.jsx'

// Step 4. Both fields are optional. Stars are for the food, never for gluten safety.
export default function ReportRating() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const draft = state.draft
  if (!draft) return <Navigate to="/contribute/report/meal" replace />

  const meal = findMeal(draft.mealId)

  return (
    <>
      <ScreenHeader title={meal.name} backTo="/contribute/report/visit" />
      <div className="section stack-4">
        <StepHeader step={4} total={REPORT_STEPS} title="How was the food?">
          Optional. Stars rate the food only — the kitchen practices you reported carry the
          gluten information.
        </StepHeader>
        <div className="stack-2">
          <StarInput value={draft.rating} onChange={(rating) => actions.updateDraft({ rating })} />
          <p className="t-caption ink-secondary">
            {draft.rating ? `${draft.rating} of 5 · tap again to clear` : 'No rating'}
          </p>
        </div>
        <TextArea
          label="Anything else people should know?"
          placeholder="What you ordered, what you asked, what staff did…"
          hint="Optional. Describe what happened, not whether it's safe."
          maxLength={500}
          value={draft.notes}
          onChange={(e) => actions.updateDraft({ notes: e.target.value })}
        />
      </div>
      <ActionBar>
        <Button variant="primary" block onClick={() => navigate('/contribute/report/review')}>
          Next
        </Button>
      </ActionBar>
    </>
  )
}
