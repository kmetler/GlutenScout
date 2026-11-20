import { Link } from 'react-router-dom'
import { Icon, MealCard } from '../../components'
import { ageText, evidenceOf } from './evidence.js'
import { mealVerifiers, strictnessOf, useStrictness, withStrictness } from '../../data/verifiers.js'
import { useDiscover } from './discoverStore.js'
import { ingredientSummary } from '../../data/ingredients.js'

// The one-glance answer for a meal, shared by the meal card and the meal page so they never
// disagree. Disagreement outranks everything; old evidence turns the date into a warning.
// Never a "safe" verdict — just what diners confirmed and how recently.
export function safetyStatus(meal) {
  const ev = evidenceOf(meal)
  const age = ev.age == null ? meal.lastVerified : ageText(ev.age)
  let tone = 'confirmed'
  let icon = 'check'
  let headline = ev.confirmed === ev.total ? `All ${ev.total} practices confirmed` : `${ev.confirmed} of ${ev.total} practices confirmed`
  if (ev.disputed.length) {
    tone = 'conflict'
    icon = 'triangle'
    headline = `Reports disagree about the ${ev.disputed.join(' and ')}`
  } else if (ev.confirmed === 0) {
    tone = 'unverified'
    icon = 'clock'
    headline = 'Not confirmed by diners yet'
  } else if (ev.confirmed < ev.total) {
    tone = 'unverified'
  }
  return { tone, icon, headline, verified: `Verified ${age}`, stale: ev.stale }
}

// Card version: just the date. The color-coded practice badges under it already show what's
// confirmed, disputed or open, so the card adds no words on top. Old evidence turns orange.
// Also says when a practice rests on a single person's word (celiac testers wanted 2+).
export function mealEvidenceLine(meal) {
  const { verified, stale } = safetyStatus(meal)
  const thin = meal.precautions.some((p) => p.tally?.thin)
  return {
    tone: stale ? 'conflict' : 'unverified',
    icon: 'clock',
    text: thin ? `${verified} · needs more reports` : verified,
  }
}

export function MealResult({ meal }) {
  const level = useStrictness()
  const shown = withStrictness(meal, level)
  const tags = mealVerifiers(meal, level)
  const verifiedBy = tags && { tags, none: `Not verified by ${strictnessOf(level).phrase} yet` }
  return (
    <MealCard
      meal={shown}
      to={`/meals/${meal.id}`}
      evidence={mealEvidenceLine(shown)}
      verifiedBy={verifiedBy}
      ingredients={ingredientSummary(meal.id)}
    />
  )
}

// Looks like a search field, opens the search screen (one place to type).
// `hero` is the highlighted version at the top of Discover: the page's main action.
export function SearchLink({ label = 'Search dishes, restaurants or practices', hero = false }) {
  return (
    <Link
      className={`search-link field__input t-body${hero ? ' search-link--hero' : ''}`}
      to="/discover/search"
    >
      <Icon name="search" size={18} />
      <span>{label}</span>
    </Link>
  )
}

// Top of both Discover views: the purpose, the search bar, and where you are — kept compact
// so more meals fit above the fold. `view` is 'meals' or 'restaurants'.
export function DiscoverTop({ view = 'meals' }) {
  const { discover } = useDiscover()
  return (
    <>
      <div className="discover-top">
        <h1 className="t-section-header">Find meals you can check before you go</h1>
      </div>
      <div className="discover-search">
        <SearchLink hero />
      </div>
      <div className="discover-where row row--between row--wrap t-meta">
        <span className="row">
          <Icon name="directions" size={16} />
          <span className="ink-secondary">Near {discover.location}</span>
          <Link className="link text-btn" to="/discover/location">
            Change
          </Link>
        </span>
        {view === 'meals' ? (
          <Link className="link text-btn" to="/discover/restaurants">
            Browse by restaurant
          </Link>
        ) : (
          <Link className="link text-btn" to="/discover">
            Browse by meal
          </Link>
        )}
      </div>
    </>
  )
}

// Opens the restaurant's address in a maps app (a new tab on desktop). The only link that
// leaves the prototype, so diners always have a next step once they've decided to go.
export function openDirections(restaurant) {
  const query = encodeURIComponent(`${restaurant.name}, ${restaurant.address}`)
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener')
}
