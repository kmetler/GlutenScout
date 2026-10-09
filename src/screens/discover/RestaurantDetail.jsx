import { Navigate, useParams } from 'react-router-dom'
import { Button, Icon, Notice, ScreenHeader } from '../../components'
import { findRestaurant, mealsAt } from '../../data/sample.js'
import { useDiscover } from './discoverStore.js'
import { sortMeals } from './evidence.js'
import { MealResult, openDirections } from './shared.jsx'

// One restaurant: its details, then every meal with that meal's own evidence.
export default function RestaurantDetail() {
  const { restaurantId } = useParams()
  const { discover } = useDiscover()
  const restaurant = findRestaurant(restaurantId)
  if (!restaurant) return <Navigate to="/discover/restaurants" replace />
  const list = sortMeals(mealsAt(restaurant.id), discover.sort === 'distance' ? 'evidence' : discover.sort)

  return (
    <>
      <ScreenHeader title={restaurant.name} fallbackTo="/discover/restaurants" />

      <div className="section stack-2">
        <div className="tour-art" aria-hidden="true">
          <Icon name="image" size={28} />
        </div>
        <h2 className="t-business-name">{restaurant.name}</h2>
        <p className="t-meta ink-secondary">
          {restaurant.cuisine} · {restaurant.distance} · {restaurant.address}
        </p>
        <div className="row row--wrap">
          {/* Same classes as the shared secondary Button; a real link so the phone app opens. */}
          <a className="btn btn--secondary" href={`tel:${restaurant.phone.replace(/\D/g, '')}`}>
            <Icon name="phone" />
            Call {restaurant.phone}
          </a>
          <Button onClick={() => openDirections(restaurant)}>
            <Icon name="directions" />
            Directions
          </Button>
        </div>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-section-header">Meals with reports</h2>
        <Notice>
          There’s no overall score for {restaurant.name}. Each meal below shows what diners
          confirmed in the kitchen and when.
        </Notice>
        <div>
          {list.map((meal) => (
            <MealResult key={meal.id} meal={meal} />
          ))}
        </div>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-card-header">Ate something here that isn’t listed, or saw something different?</h2>
        <Button to="/contribute/report/meal">Write a report</Button>
      </div>
    </>
  )
}
