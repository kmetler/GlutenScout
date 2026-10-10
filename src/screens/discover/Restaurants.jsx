import { ListRow } from '../../components'
import { mealsAt, restaurants } from '../../data/sample.js'
import { evidenceOf, miles } from './evidence.js'
import { DiscoverTop } from './shared.jsx'

// Restaurants near you. No overall score: the row counts meals and points out disagreements,
// and the restaurant page lists each meal with its own evidence.
export function restaurantSummary(restaurant) {
  const list = mealsAt(restaurant.id)
  const disputed = list.filter((m) => evidenceOf(m).disputed.length).length
  const parts = [`${restaurant.cuisine} · ${restaurant.distance}`]
  parts.push(`${list.length} ${list.length === 1 ? 'meal' : 'meals'} reported`)
  if (disputed) parts.push(`${disputed} with disagreements`)
  return parts.join(' · ')
}

export default function Restaurants() {
  const sorted = [...restaurants].sort((a, b) => miles(a) - miles(b))
  return (
    <>
      <DiscoverTop view="restaurants" />

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-card-header">{sorted.length} restaurants · closest first</h2>
        <p className="t-body ink-secondary">
          We don’t score whole restaurants. A kitchen can handle one dish carefully and another
          not, so open a restaurant to see each meal’s own evidence.
        </p>
        <nav aria-label="Restaurants">
          {sorted.map((r) => (
            <ListRow
              key={r.id}
              to={`/discover/restaurants/${r.id}`}
              icon="meal"
              title={r.name}
              detail={restaurantSummary(r)}
            />
          ))}
        </nav>
      </div>
    </>
  )
}
