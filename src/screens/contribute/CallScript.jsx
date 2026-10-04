import { Navigate, useParams } from 'react-router-dom'
import {
  Button,
  FilterChip,
  FilterChips,
  Icon,
  PrecautionBadge,
  ScreenHeader,
} from '../../components'
import { findMeal } from '../../data/sample.js'
import { CALL_ANSWERS, PRACTICES, practicesForMeal } from '../../data/practices.js'
import { useStore } from '../../data/store.jsx'

// Questions about what the evidence leaves unclear come first, then the standard ones.
export function buildCallScript(meal) {
  const flagged = meal.precautions
    .filter((p) => p.state !== 'confirmed' && PRACTICES[p.key])
    .map((p) => ({
      key: p.key,
      text: PRACTICES[p.key].question,
      reason: p.state === 'conflict' ? 'Reports disagree' : 'Not confirmed yet',
      reasonState: p.state,
    }))
  const flaggedKeys = flagged.map((q) => q.key)
  const standard = [
    { key: 'available', text: `Can you make the ${meal.name.toLowerCase()} today?` },
    ...practicesForMeal(meal)
      .filter((key) => !flaggedKeys.includes(key))
      .map((key) => ({ key, text: PRACTICES[key].question })),
  ]
  return { flagged, standard }
}

function Question({ question, value, onAnswer }) {
  return (
    <fieldset className="fieldset-plain summary-block stack-2">
      <legend className="t-body">{question.text}</legend>
      {question.reason && (
        <PrecautionBadge state={question.reasonState}>{question.reason}</PrecautionBadge>
      )}
      <FilterChips label={question.text} wrap>
        {CALL_ANSWERS.map((a) => (
          <FilterChip key={a.value} selected={value === a.value} onClick={() => onAnswer(a.value)}>
            {a.label}
          </FilterChip>
        ))}
      </FilterChips>
    </fieldset>
  )
}

export default function CallScript() {
  const { mealId } = useParams()
  const { state, actions } = useStore()
  const meal = findMeal(mealId)
  if (!meal) return <Navigate to="/contribute/call" replace />

  const answers = state.calls[mealId] ?? {}
  const { flagged, standard } = buildCallScript(meal)
  const answer = (key) => (value) => actions.setCallAnswer(mealId, key, value)

  return (
    <>
      <ScreenHeader title="Call ahead" backTo="/contribute/call" />
      <div className="section stack-3">
        <h2 className="t-business-name">{meal.restaurant}</h2>
        <p className="t-meta ink-secondary">
          About: {meal.name} · {meal.phone}
        </p>
        <a className="btn btn--primary btn--block" href={`tel:${meal.phone.replace(/\D/g, '')}`}>
          <Icon name="phone" />
          Call {meal.restaurant}
        </a>
        <p className="t-caption ink-secondary">
          Tip: say you're ordering for someone with celiac disease. Tap answers as you go — they're
          kept if you leave this screen.
        </p>
      </div>

      {flagged.length > 0 && (
        <>
          <div className="band" />
          <div className="section stack-3">
            <h2 className="t-section-header">Ask about these first</h2>
            {flagged.map((q) => (
              <Question key={q.key} question={q} value={answers[q.key]} onAnswer={answer(q.key)} />
            ))}
          </div>
        </>
      )}

      <div className="band" />
      <div className="section stack-3">
        <h2 className="t-section-header">{flagged.length ? 'Then ask' : 'Questions to ask'}</h2>
        {standard.map((q) => (
          <Question key={q.key} question={q} value={answers[q.key]} onAnswer={answer(q.key)} />
        ))}
        <Button block to={`/contribute/call/${mealId}/result`}>
          Done — review answers
        </Button>
      </div>
    </>
  )
}
