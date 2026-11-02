import { Button, ListRow } from '../../components'
import { distanceText, isNearby, mealsAt, milesFrom, restaurants } from '../../data/sample.js'
import { useDiscover } from './discoverStore.js'
import { evidenceOf } from './evidence.js'
import { DiscoverTop } from './shared.jsx'

// Restaurants near you. No overall score: the row counts meals and points out disagreements,
// and the restaurant page lists each meal with its own evidence.
export function restaurantSummary(restaurant, area) {
  const list = mealsAt(restaurant.id)
  const disputed = list.filter((m) => evidenceOf(m).disputed.length).length
  const parts = [`${restaurant.cuisine} · ${distanceText(restaurant, area)}`]
  parts.push(`${list.length} ${list.length === 1 ? 'meal' : 'meals'} reported`)
  if (disputed) parts.push(`${disputed} with disagreements`)
  return parts.join(' · ')
}

export default function Restaurants() {
  const { location } = useDiscover().discover
  const sorted = restaurants
    .filter((r) => isNearby(r, location))
    .sort((a, b) => milesFrom(a, location) - milesFrom(b, location))
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
              detail={restaurantSummary(r, location)}
            />
          ))}
        </nav>
        {!sorted.length && <Button to="/discover/location">Change location</Button>}
      </div>
    </>
  )
}
