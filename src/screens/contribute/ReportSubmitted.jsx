import { Navigate, useSearchParams } from 'react-router-dom'
import { ActionBar, Button, Icon, ReportStatus, ScreenHeader } from '../../components'
import { findMeal } from '../../data/sample.js'
import { MATCHES_NEEDED, useStore } from '../../data/store.jsx'
import { ReportClaims } from './shared.jsx'

// Shown after a visit report or a call-ahead report is saved.
export default function ReportSubmitted() {
  const { findReport, statusOf } = useStore()
  const [params] = useSearchParams()
  const report = findReport(params.get('id'))
  if (!report) return <Navigate to="/contribute/mine" replace />

  const meal = findMeal(report.mealId)
  const { status, matches } = statusOf(report)

  return (
    <>
      <ScreenHeader title="Report submitted" backTo="/contribute" />
      <div className="section stack-4">
        <div className="stack-2">
          <h2 className="success-title t-section-header">
            <Icon name="check" size={22} />
            Thanks — your report is in
          </h2>
          <p className="t-body">
            {meal.name} · {meal.restaurant} · {report.date}
          </p>
          <ReportStatus status={status} matches={matches} />
        </div>
        <ReportClaims claims={report.claims} />
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-section-header">What happens next</h2>
        <ol className="list-numbered t-body stack-2">
          <li>Verifiers who have eaten there compare it with their own visit.</li>
          <li>
            Once {MATCHES_NEEDED} celiac or strict gluten-free verifiers say it matches, it shows as
            Confirmed on the meal.
          </li>
          <li>
            If someone saw something different, it's marked as a conflict and our moderation team
            checks the details. Both reports stay visible.
          </li>
        </ol>
      </div>

      {/* A clear next step, so the flow doesn't end here. */}
      <ActionBar>
        <Button variant="primary" block to={`/meals/${meal.id}`}>
          See it on the meal
        </Button>
        <Button block to="/my-meals">
          See my reports
        </Button>
      </ActionBar>
    </>
  )
}
