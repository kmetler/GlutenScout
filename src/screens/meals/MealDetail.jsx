import { Link, Navigate } from 'react-router-dom'
import {
  Button,
  GhostButton,
  Icon,
  ListRow,
  SafetyProfile,
  ScreenHeader,
  StarRating,
} from '../../components'
import { useAccount } from '../account/accountStore.js'
import { applyReportOrder, reportOrderLabel } from '../account/shared.jsx'
import { mealEvidence, mealSources } from './evidence.js'
import { datedAgo, ReportItem, StaleNote, useMeal } from './shared.jsx'

const PREVIEW_REPORTS = 2

// The core screen: what the kitchen does for this meal, when that was last verified, and
// who says so. Evidence comes before the reports; the food rating stays small.
export default function MealDetail() {
  const { meal, reports, votes } = useMeal()
  const { account, toggleSaved } = useAccount()
  if (!meal) return <Navigate to="/meals" replace />

  const saved = account.saved.includes(meal.id)
  const practiceCount = Object.keys(mealEvidence(meal, reports, votes)).length
  const visible = applyReportOrder(reports, account.reportOrder)
  const hidden = reports.length - visible.length

  return (
    <>
      <ScreenHeader title={meal.restaurant} backTo="/meals" />

      <div className="meal-photo" aria-hidden="true">
        <Icon name="image" size={22} />
      </div>

      <div className="section stack-2">
        <div className="meal-title">
          <div className="grow stack-2">
            <h2 className="t-business-name">{meal.name}</h2>
            <p className="t-meta ink-secondary">
              {meal.restaurant} · {meal.distance}
            </p>
          </div>
          <GhostButton
            icon="bookmark"
            label={saved ? 'Saved' : 'Save'}
            selected={saved}
            onClick={() => toggleSaved(meal.id)}
          />
        </div>
        <StarRating value={meal.rating} count={meal.reviewCount} />
        <p className="t-caption ink-secondary">Stars rate the food, not how gluten is handled.</p>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <StaleNote date={meal.lastVerified} />
        <SafetyProfile
          mealId={meal.id}
          lastVerified={datedAgo(meal.lastVerified)}
          precautions={meal.precautions}
          sources={mealSources(meal, reports)}
          conflictNote={meal.conflictNote}
        />
        <nav aria-label="Evidence for this meal">
          <ListRow
            to={`/meals/${meal.id}/practices`}
            title="How each practice was checked"
            detail={`${practiceCount} kitchen practices · who saw what, and when`}
          />
          <ListRow
            to={`/meals/${meal.id}/history`}
            title="Verification history"
            detail={`Last verified ${meal.lastVerified}`}
          />
        </nav>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <div className="stack-2">
          <h2 className="t-section-header">Reports</h2>
          <p className="t-meta ink-secondary">
            {reportOrderLabel(account.reportOrder)} ·{' '}
            <Link className="link" to="/account/settings">
              Change in Settings
            </Link>
          </p>
        </div>

        {visible.length > 0 ? (
          <div>
            {visible.slice(0, PREVIEW_REPORTS).map((report) => (
              <ReportItem key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <p className="t-body ink-secondary">
            {hidden
              ? 'No reports from celiac or strict GF diners yet.'
              : 'Nobody has reported on this meal yet. Call ahead to ask, or be the first to report.'}
          </p>
        )}
        {hidden > 0 && (
          <p className="t-caption ink-secondary">
            {hidden} report{hidden > 1 ? 's' : ''} from other diners hidden by your setting.
          </p>
        )}

        {visible.length > PREVIEW_REPORTS && (
          <Button block to={`/meals/${meal.id}/reports`}>
            See all {visible.length} reports
          </Button>
        )}
        <Button variant="primary" block to={`/contribute/report/meal?meal=${meal.id}`}>
          Ate this? Write a report
        </Button>
      </div>
    </>
  )
}
