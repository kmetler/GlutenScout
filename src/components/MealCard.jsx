import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import StarRating from './StarRating.jsx'
import PrecautionBadge from './PrecautionBadge.jsx'

// Meal / restaurant card, reused on browse, detail and saved screens.
// Shows the dated evidence before the food rating.
export default function MealCard({ meal, to = '/meals' }) {
  return (
    <Link className="meal-card" to={to}>
      <div className="meal-card__photo" aria-hidden="true">
        <Icon name="image" size={22} />
      </div>
      <div className="meal-card__main">
        <h3 className="t-card-header">{meal.name}</h3>
        <p className="t-meta ink-secondary">
          {meal.restaurant} · {meal.distance}
        </p>
        <p className="meal-card__date t-meta">
          <Icon name="clock" size={14} />
          Last verified {meal.lastVerified}
        </p>
        <div className="meal-card__badges">
          {meal.precautions.slice(0, 2).map((p) => (
            <PrecautionBadge key={p.label} state={p.state}>
              {p.label}
            </PrecautionBadge>
          ))}
        </div>
        <StarRating value={meal.rating} count={meal.reviewCount} size={14} />
      </div>
    </Link>
  )
}
