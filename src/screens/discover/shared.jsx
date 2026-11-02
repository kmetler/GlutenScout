import { Link } from 'react-router-dom'
import { Icon, MealCard } from '../../components'
import { useStore } from '../../data/store.jsx'
import { NAMES_TYPES, typeBreakdown } from '../../data/variant.js'
import { mealEvidence, mealReports } from '../meals/evidence.js'
import { ageText, evidenceOf } from './evidence.js'
import { useDiscover } from './discoverStore.js'

// The shared MealCard with one line saying, in words, how strong and how current the evidence
// is. Order: disagreement first (a risk someone saw), then old evidence, then the count.
// Every version of the line carries the age, so the date is never dropped.
// `confirmers` are the reports that saw a confirmed practice happen (named in version B of the
// "Who verified it" test, data/variant.js).
export function mealEvidenceLine(meal, confirmers = []) {
  const ev = evidenceOf(meal)
  const age = `verified ${ev.age == null ? meal.lastVerified : ageText(ev.age)}`
  if (ev.disputed.length) {
    return {
      tone: 'conflict',
      icon: 'triangle',
      text: `Reports disagree about the ${ev.disputed.join(' and the ')} · ${age}`,
    }
  }
  if (ev.stale) {
    return {
      tone: 'unverified',
      icon: 'clock',
      text: `Last ${age} — call ahead before you go`,
    }
  }
  if (ev.confirmed === 0) {
    return {
      tone: 'unverified',
      icon: 'clock',
      text: `Only the restaurant’s word so far · ${age}`,
    }
  }
  return {
    tone: 'confirmed',
    icon: 'check',
    text: NAMES_TYPES && confirmers.length
      ? `${ev.confirmed} of ${ev.total} practices confirmed by ${typeBreakdown(confirmers)} diners · ${age}`
      : `${ev.confirmed} of ${ev.total} practices verified by diners · ${age}`,
  }
}

// Reports in which a diner saw one of the meal's confirmed practices happen.
function confirmingReports(meal, reports, votes) {
  const evidence = mealEvidence(meal, mealReports(reports, meal.id), votes)
  const found = new Map()
  for (const p of meal.precautions.filter((p) => p.state === 'confirmed')) {
    for (const item of evidence[p.key] ?? []) {
      if (item.how === 'saw') found.set(item.report.id, item.report)
    }
  }
  return [...found.values()]
}

export function MealResult({ meal }) {
  const { state } = useStore()
  const evidence = mealEvidenceLine(meal, confirmingReports(meal, state.reports, state.votes))
  return <MealCard meal={meal} to={`/meals/${meal.id}`} evidence={evidence} />
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
