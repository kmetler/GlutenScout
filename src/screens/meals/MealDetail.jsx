import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  ActionBar,
  Button,
  FilterChip,
  FilterChips,
  GhostButton,
  Icon,
  ScreenHeader,
  StarRating,
} from '../../components'
import { REVIEWER_TYPES } from '../../data/practices.js'
import { findRestaurant } from '../../data/sample.js'
import { useAccount } from '../account/accountStore.js'
import { applyReportOrder } from '../account/shared.jsx'
import { openDirections } from '../discover/shared.jsx'
import SafetyCheck from './SafetyCheck.jsx'
import StrictnessFilter from '../discover/StrictnessFilter.jsx'
import { useStrictness, withStrictness } from '../../data/verifiers.js'
import { ReportItem, useMeal } from './shared.jsx'

const PREVIEW_REPORTS = 3

// The core screen, in the order a diner decides: the meal, then the safety check (status,
// one row per kitchen practice, call ahead if anything is open), then the reports behind it.
// Writing a report sits in the ActionBar so it's in reach without scrolling.
export default function MealDetail() {
  const { meal: rawMeal, reports, votes } = useMeal()
  const level = useStrictness()
  const meal = withStrictness(rawMeal, level)
  const { account, toggleSaved } = useAccount()
  const [type, setType] = useState('All')
  const [showAll, setShowAll] = useState(false)
  if (!meal) return <Navigate to="/discover" replace />

  const saved = account.saved.includes(meal.id)
  const restaurant = findRestaurant(meal.restaurantId)
  const visible = applyReportOrder(reports, account.reportOrder)
  const hidden = reports.length - visible.length
  const types = [...REVIEWER_TYPES, 'Restaurant'].filter((t) =>
    visible.some((r) => r.reviewerType === t),
  )
  const filtered = type === 'All' ? visible : visible.filter((r) => r.reviewerType === type)
  const shown = showAll ? filtered : filtered.slice(0, PREVIEW_REPORTS)

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
      </div>

      <div className="band" />

      <div className="section stack-3">
        <StrictnessFilter />
        <SafetyCheck meal={meal} reports={reports} votes={votes} />
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-section-header">Reports · {visible.length}</h2>
        {types.length > 1 && (
          <FilterChips label="Reviewer type">
            <FilterChip selected={type === 'All'} onClick={() => setType('All')}>
              All
            </FilterChip>
            {types.map((t) => (
              <FilterChip key={t} selected={type === t} onClick={() => setType(t)}>
                {t}
              </FilterChip>
            ))}
          </FilterChips>
        )}

        {shown.length > 0 ? (
          <div>
            {shown.map((report) => (
              <ReportItem key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <p className="t-body ink-secondary">No reports yet.</p>
        )}
        {hidden > 0 && (
          <p className="t-caption ink-secondary">{hidden} hidden by your settings</p>
        )}

        {!showAll && filtered.length > PREVIEW_REPORTS && (
          <Button block onClick={() => setShowAll(true)}>
            Show all {filtered.length}
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
