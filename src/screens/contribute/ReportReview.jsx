import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ActionBar, Button, Notice, ScreenHeader, StarRating, StepHeader } from '../../components'
import { findMeal } from '../../data/sample.js'
import { answerLabel, claimsFromAnswers, PRACTICES, practicesForMeal, SEEN_ANSWERS } from '../../data/practices.js'
import { formatISO } from '../../data/dates.js'
import { MATCHES_NEEDED, useStore } from '../../data/store.jsx'
import { REPORT_STEPS, ReportClaims } from './shared.jsx'

function SummaryBlock({ title, editTo, children }) {
  return (
    <div className="summary-block">
      <div className="row row--between">
        <h3 className="t-card-header">{title}</h3>
        <Link className="text-btn" to={editTo} aria-label={`Edit ${title.toLowerCase()}`}>
          Edit
        </Link>
      </div>
      {children}
    </div>
  )
}

// Step 5. Check everything, then submit. The report starts as Pending.
export default function ReportReview() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const draft = state.draft
  if (!draft) return <Navigate to="/contribute/report/meal" replace />

  const meal = findMeal(draft.mealId)
  const claims = claimsFromAnswers(draft.practices, 'visit')

  const submit = () => {
    const id = actions.submitDraft()
    navigate(`/contribute/report/submitted?id=${id}`, { replace: true })
  }

  return (
    <>
      <ScreenHeader title={meal.name} backTo="/contribute/report/rating" />
      <div className="section stack-4">
        <StepHeader step={5} total={REPORT_STEPS} title="Check your report" />

        <SummaryBlock title="Meal" editTo="/contribute/report/meal">
          <p className="t-body">
            {meal.name} · {meal.restaurant}
          </p>
        </SummaryBlock>

        <SummaryBlock title="Kitchen practices" editTo="/contribute/report/practices">
          <ReportClaims claims={claims} />
          <ul className="t-meta ink-secondary">
            {practicesForMeal(meal).map((key) => (
              <li key={key}>
                {PRACTICES[key].label}: {answerLabel(SEEN_ANSWERS, draft.practices[key])}
              </li>
            ))}
          </ul>
        </SummaryBlock>

        <SummaryBlock title="Visit" editTo="/contribute/report/visit">
          <p className="t-body">
            {formatISO(draft.visitDate)} · {draft.reviewerType}
          </p>
        </SummaryBlock>

        <SummaryBlock title="Food and notes" editTo="/contribute/report/rating">
          {draft.rating ? <StarRating value={draft.rating} size={15} /> : <p className="t-body ink-secondary">No rating</p>}
          <p className="t-body">{draft.notes.trim() || <span className="ink-secondary">No notes</span>}</p>
        </SummaryBlock>

        <Notice icon="clock">
          Your report shows as <b>Pending</b> until {MATCHES_NEEDED} celiac or strict gluten-free
          verifiers say it matches their visit.
        </Notice>
      </div>
      <ActionBar>
        <Button variant="primary" block onClick={submit}>
          Submit report
        </Button>
      </ActionBar>
    </>
  )
}
