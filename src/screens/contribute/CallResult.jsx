import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ActionBar,
  Button,
  FilterChip,
  FilterChips,
  Notice,
  ScreenHeader,
} from '../../components'
import { findMeal } from '../../data/sample.js'
import { answerLabel, CALL_ANSWERS, claimsFromAnswers, PRACTICES } from '../../data/practices.js'
import { useStore } from '../../data/store.jsx'
import { buildCallScript } from './CallScript.jsx'
import { ReportClaims } from './shared.jsx'

const DECISIONS = ['Order it', 'Skip it', 'Still deciding']

export default function CallResult() {
  const { mealId } = useParams()
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const [decision, setDecision] = useState(null)
  const meal = findMeal(mealId)
  if (!meal) return <Navigate to="/contribute/call" replace />

  const answers = state.calls[mealId] ?? {}
  const { flagged, standard } = buildCallScript(meal)
  const questions = [...flagged, ...standard]
  const practiceAnswers = Object.fromEntries(Object.entries(answers).filter(([key]) => PRACTICES[key]))
  const claims = claimsFromAnswers(practiceAnswers, 'phone')
  const answeredCount = Object.keys(answers).length

  const save = () => {
    const id = actions.submitCall(mealId)
    navigate(`/contribute/report/submitted?id=${id}`, { replace: true })
  }

  return (
    <>
      <ScreenHeader title="What did they say?" backTo={`/contribute/call/${mealId}`} />
      <div className="section stack-3">
        <h2 className="t-section-header">{meal.restaurant}</h2>
        <ul className="stack-2">
          {questions.map((q) => (
            <li key={q.key} className="summary-block">
              <p className="t-body">{q.text}</p>
              <p className="t-meta">{answerLabel(CALL_ANSWERS, answers[q.key])}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-section-header">Will you order it?</h2>
        <FilterChips label="Your decision" wrap>
          {DECISIONS.map((d) => (
            <FilterChip key={d} selected={decision === d} onClick={() => setDecision(d)}>
              {d}
            </FilterChip>
          ))}
        </FilterChips>
        <p className="t-caption ink-secondary">
          Only you can decide. This choice isn't saved or shared.
        </p>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-section-header">Share what they told you</h2>
        <ReportClaims claims={claims} />
        <Notice>
          This is saved as a <b>Restaurant</b> report — what staff said, not what a diner saw. It
          stays Pending until verifiers confirm it on a visit.
        </Notice>
      </div>

      <ActionBar note={answeredCount ? null : 'Answer at least one question to save a report.'}>
        <Button variant="primary" block disabled={!answeredCount} onClick={save}>
          Save as report
        </Button>
      </ActionBar>
    </>
  )
}
