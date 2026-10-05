import { Navigate, useNavigate } from 'react-router-dom'
import { ActionBar, Button, FilterChip, FilterChips, ScreenHeader, StepHeader } from '../../components'
import { findMeal } from '../../data/sample.js'
import { practicesForMeal, PRACTICES, SEEN_ANSWERS } from '../../data/practices.js'
import { useStore } from '../../data/store.jsx'
import { REPORT_STEPS } from './shared.jsx'

// Step 2. Every practice needs an answer ("Not sure" counts), so nothing is left ambiguous.
export default function ReportPractices() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const draft = state.draft
  if (!draft) return <Navigate to="/contribute/report/meal" replace />

  const meal = findMeal(draft.mealId)
  const keys = practicesForMeal(meal)
  const unanswered = keys.filter((key) => !draft.practices[key]).length

  const answer = (key, value) => actions.updateDraft({ practices: { ...draft.practices, [key]: value } })

  return (
    <>
      <ScreenHeader title={meal.name} backTo="/contribute/report/meal" />
      <div className="section stack-2">
        <StepHeader step={2} total={REPORT_STEPS} title="What did you see in the kitchen?">
          Say how you know. What you saw yourself counts for more than what staff told you.
        </StepHeader>
        {keys.map((key) => (
          <fieldset key={key} className="fieldset-plain summary-block">
            <legend className="t-card-header">{PRACTICES[key].label}</legend>
            <FilterChips label={PRACTICES[key].label} wrap>
              {SEEN_ANSWERS.map((a) => (
                <FilterChip
                  key={a.value}
                  selected={draft.practices[key] === a.value}
                  onClick={() => answer(key, a.value)}
                >
                  {a.label}
                </FilterChip>
              ))}
            </FilterChips>
          </fieldset>
        ))}
      </div>
      <ActionBar
        note={
          unanswered
            ? `${unanswered} left to answer. “Not sure” is a fine answer.`
            : null
        }
      >
        <Button
          variant="primary"
          block
          disabled={unanswered > 0}
          onClick={() => navigate('/contribute/report/visit')}
        >
          Next
        </Button>
      </ActionBar>
    </>
  )
}
