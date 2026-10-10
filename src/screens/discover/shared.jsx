import { Link } from 'react-router-dom'
import { Icon, MealCard } from '../../components'
import { ageText, evidenceOf } from './evidence.js'
import { useDiscover } from './discoverStore.js'

// The shared MealCard with one line saying, in words, how strong and how current the evidence
// is. Order: disagreement first (a risk someone saw), then old evidence, then the count.
// Every version of the line carries the age, so the date is never dropped.
export function mealEvidenceLine(meal) {
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
    text: `${ev.confirmed} of ${ev.total} practices confirmed by diners · ${age}`,
  }
}

export function MealResult({ meal }) {
  return <MealCard meal={meal} to={`/meals/${meal.id}`} evidence={mealEvidenceLine(meal)} />
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
