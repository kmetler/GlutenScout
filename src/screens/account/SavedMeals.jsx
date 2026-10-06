import { useState } from 'react'
import { Button, Icon, MealCard, Notice, ScreenHeader } from '../../components'
import { findMeal } from '../../data/sample.js'
import { PRACTICES } from '../../data/practices.js'
import { useAccount } from './accountStore.js'
import { daysSince } from './data.js'

// Evidence older than this is flagged on saved meals (research insight #2: recency matters).
export const STALE_AFTER_DAYS = 90

// What's worth checking before going back to a saved meal, in words. null if nothing.
export function savedStatus(meal) {
  const age = daysSince(meal.lastVerified)
  const disputed = meal.precautions
    .filter((p) => p.state === 'conflict')
    .map((p) => (PRACTICES[p.key]?.label ?? p.label).replace(/\?$/, '').toLowerCase())
  if (age != null && age > STALE_AFTER_DAYS) {
    return `Last verified ${age} days ago. Kitchens and staff change, so call ahead before you go.`
  }
  if (disputed.length) {
    return `Reports disagree about the ${disputed.join(' and the ')}. Call ahead to ask.`
  }
  return null
}

export function needsCheck(meal) {
  return savedStatus(meal) != null
}

export default function SavedMeals() {
  const { account, toggleSaved } = useAccount()
  const [removed, setRemoved] = useState(null)
  const meals = account.saved.map(findMeal).filter(Boolean)
  // Meals worth a check come first, so they're not missed.
  const ordered = [...meals.filter(needsCheck), ...meals.filter((m) => !needsCheck(m))]

  const remove = (meal) => {
    toggleSaved(meal.id)
    setRemoved(meal)
  }

  return (
    <>
      <ScreenHeader title="Saved meals" backTo="/account" />

      {removed && (
        <div className="section">
          <Notice icon="check">
            <div className="row row--between row--wrap">
              <span>Removed {removed.name}.</span>
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  toggleSaved(removed.id)
                  setRemoved(null)
                }}
              >
                Undo
              </button>
            </div>
          </Notice>
        </div>
      )}

      {ordered.length > 0 ? (
        <div className="section">
          <p className="t-body ink-secondary">
            Meals with old or disputed evidence are listed first.
          </p>
          {ordered.map((meal) => {
            const status = savedStatus(meal)
            return (
              <div key={meal.id} className="saved-item">
                <MealCard meal={meal} to={`/meals/${meal.id}`} />
                <p className={`saved-item__status t-meta${status ? '' : ' is-current'}`}>
                  <Icon name={status ? 'triangle' : 'clock'} size={15} />
                  <span>
                    {status ??
                      `Verified within the last ${STALE_AFTER_DAYS} days with no disagreements.`}
                  </span>
                </p>
                <div className="row row--wrap">
                  {status && (
                    <Button to={`/contribute/call/${meal.id}`}>
                      <Icon name="phone" />
                      Call ahead
                    </Button>
                  )}
                  <button
                    type="button"
                    className="text-btn"
                    aria-label={`Remove ${meal.name} from saved`}
                    onClick={() => remove(meal)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="section stack-3">
          <h2 className="t-section-header">No saved meals yet</h2>
          <p className="t-body ink-secondary">
            Save a meal from its page to keep it here. We'll point out when its evidence gets old
            or reports start to disagree.
          </p>
          <Button variant="primary" block to="/discover">
            Find meals
          </Button>
        </div>
      )}
    </>
  )
}
