import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MealCard, Notice, ScreenHeader, StepHeader, TextField } from '../../components'
import { findMeal, meals } from '../../data/sample.js'
import { useStore } from '../../data/store.jsx'
import { REPORT_STEPS } from './shared.jsx'

// Step 1. Tapping a meal goes to ?meal=<id>, the same entry point other sections link to.
export default function ReportMeal() {
  const { state, actions } = useStore()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const mealId = params.get('meal')
  const draftMeal = state.draft && findMeal(state.draft.mealId)

  useEffect(() => {
    if (!mealId || !findMeal(mealId)) return
    // Same meal keeps the answers so far; a different meal starts a fresh report.
    if (state.draft?.mealId !== mealId) actions.startDraft(mealId)
    navigate('/contribute/report/practices', { replace: true })
  }, [mealId]) // eslint-disable-line react-hooks/exhaustive-deps

  const q = query.trim().toLowerCase()
  const results = meals.filter(
    (m) => !q || m.name.toLowerCase().includes(q) || m.restaurant.toLowerCase().includes(q),
  )

  return (
    <>
      <ScreenHeader title="Write a report" backTo="/contribute" />
      <div className="section stack-4">
        <StepHeader step={1} total={REPORT_STEPS} title="Which meal did you have?" />
        {draftMeal && (
          <Notice>
            You have an unfinished report for <b>{draftMeal.name}</b>. Pick it again to continue,
            or pick another meal to start over.
          </Notice>
        )}
        <TextField
          label="Search meals or restaurants"
          type="search"
          placeholder="e.g. tacos, Juniper Grill"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div>
          {results.map((meal) => (
            <MealCard key={meal.id} meal={meal} to={`/contribute/report/meal?meal=${meal.id}`} />
          ))}
          {!results.length && (
            <p className="t-body ink-secondary">No meals match “{query}”. Try a restaurant name.</p>
          )}
        </div>
      </div>
    </>
  )
}
