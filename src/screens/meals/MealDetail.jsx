import { Link, Navigate } from 'react-router-dom'
import {
  ActionBar,
  Button,
  GhostButton,
  Icon,
  ListRow,
  SafetyProfile,
  ScreenHeader,
  StarRating,
} from '../../components'
import { findRestaurant } from '../../data/sample.js'
import { useAccount } from '../account/accountStore.js'
import { applyReportOrder, reportOrderLabel } from '../account/shared.jsx'
import { openDirections } from '../discover/shared.jsx'
import { mealEvidence, mealSources } from './evidence.js'
import { datedAgo, ReportItem, StaleNote, useMeal } from './shared.jsx'

const PREVIEW_REPORTS = 2

// The core screen: what the kitchen does for this meal, when that was last verified, and
// who says so. Evidence comes before the reports; the food rating stays small.
// Writing a report sits in the ActionBar so it's in reach without scrolling.
export default function MealDetail() {
  const { meal, reports, votes } = useMeal()
  const { account, toggleSaved } = useAccount()
  if (!meal) return <Navigate to="/discover" replace />

  const saved = account.saved.includes(meal.id)
  const restaurant = findRestaurant(meal.restaurantId)
  const practiceCount = Object.keys(mealEvidence(meal, reports, votes)).length
  const visible = applyReportOrder(reports, account.reportOrder)
  const hidden = reports.length - visible.length

  return (
    <>
      <ScreenHeader title={meal.restaurant} fallbackTo="/discover" />

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
          {restaurant && (
            <GhostButton
              icon="directions"
              label="Directions"
              aria-label={`Directions to ${meal.restaurant} (opens maps)`}
              onClick={() => openDirections(restaurant)}
            />
          )}
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
      </div>

      <div className="band" />

      {/* The same evidence three ways, each saying what question it answers. */}
      <div className="section stack-2">
        <h2 className="t-section-header">Look closer</h2>
        <p className="t-body ink-secondary">
          The safety profile sums up the evidence. Look at it by practice, by date, or by diner.
        </p>
        <nav aria-label="Evidence for this meal">
          <ListRow
            to={`/meals/${meal.id}/practices`}
            icon="check"
            title="By practice"
            detail={`How each of ${practiceCount} kitchen practices was checked, and by whom`}
          />
          <ListRow
            to={`/meals/${meal.id}/history`}
            icon="clock"
            title="By date"
            detail={`What set “last verified ${meal.lastVerified}”, and what didn’t`}
          />
          <ListRow
            to={`/meals/${meal.id}/reports`}
            icon="person"
            title="By diner"
            detail={`Every report in the diner’s own words · ${visible.length} shown`}
          />
        </nav>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <div className="stack-2">
          <h2 className="t-section-header">Latest reports</h2>
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
      </div>

      <ActionBar>
        <Button variant="primary" block to={`/contribute/report/meal?meal=${meal.id}`}>
          Ate this? Write a report
        </Button>
      </ActionBar>
    </>
  )
}
