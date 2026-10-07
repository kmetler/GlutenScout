import { Link } from 'react-router-dom'
import { Icon, MealCard } from '../../components'
import { ageText, evidenceOf } from './evidence.js'
import { useDiscover } from './discoverStore.js'

// The shared MealCard plus one line saying, in words, how strong and how current the evidence is.
// Order of the line: disagreement first (a risk someone saw), then old evidence, then the count.
export function MealResult({ meal }) {
  const ev = evidenceOf(meal)
  let tone = 'confirmed'
  let icon = 'check'
  let text = `${ev.confirmed} of ${ev.total} practices confirmed by diners · verified ${ageText(ev.age)}`
  if (ev.disputed.length) {
    tone = 'conflict'
    icon = 'triangle'
    text = `Reports disagree about the ${ev.disputed.join(' and the ')}`
  } else if (ev.stale) {
    tone = 'unverified'
    icon = 'clock'
    text = `Last verified ${ageText(ev.age)} — call ahead before you go`
  } else if (ev.confirmed === 0) {
    tone = 'unverified'
    icon = 'clock'
    text = 'No practices confirmed by diners yet — only the restaurant’s word'
  }
  return (
    <div className="meal-result">
      <MealCard meal={meal} to={`/meals/${meal.id}`} />
      <p className={`meal-result__evidence t-meta is-${tone}`}>
        <Icon name={icon} size={15} />
        <span>{text}</span>
      </p>
    </div>
  )
}

// Looks like a search field, opens the search screen (one place to type).
export function SearchLink({ label = 'Search dishes, restaurants or practices' }) {
  return (
    <Link className="search-link field__input t-body" to="/discover/search">
      <Icon name="search" size={18} />
      <span>{label}</span>
    </Link>
  )
}

export function LocationRow() {
  const { discover } = useDiscover()
  return (
    <p className="row t-meta">
      <Icon name="directions" size={16} />
      <span className="ink-secondary">Near {discover.location}</span>
      <Link className="link text-btn" to="/discover/location">
        Change
      </Link>
    </p>
  )
}
