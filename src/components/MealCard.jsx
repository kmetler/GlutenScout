import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import StarRating from './StarRating.jsx'
import PrecautionBadge from './PrecautionBadge.jsx'
import { ReviewerTag } from './ReviewCard.jsx'

// Meal / restaurant card, reused on browse, detail and saved screens.
// Shows the dated evidence before the food rating, and says it can be opened ("See details").
// evidence: optional { tone: 'confirmed' | 'conflict' | 'unverified', icon, text } — one line in
//   words that replaces the plain "Last verified" line. The text must include the date.
// compact: photo, meal and restaurant only, for pick-a-meal lists.
// verifiedBy: optional { tags: [{ type, count }], none } — who confirmed the practices, as
//   reviewer-type tags (Celiac ×3). `none` is the words shown when no one counts yet.
export default function MealCard({ meal, to = `/meals/${meal.id}`, evidence, verifiedBy, compact = false }) {
  if (compact) {
    return (
      <Link className="meal-card meal-card--compact" to={to}>
        <div className="meal-card__photo" aria-hidden="true">
          <Icon name="image" size={22} />
        </div>
        <div className="meal-card__main">
          <h3 className="t-card-header">{meal.name}</h3>
          <p className="t-meta ink-secondary">{meal.restaurant}</p>
        </div>
        <span className="list-row__chevron">
          <Icon name="chevron" />
        </span>
      </Link>
    )
  }

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
        {evidence ? (
          <p className={`meal-card__evidence t-meta is-${evidence.tone}`}>
            <Icon name={evidence.icon} size={14} />
            <span>{evidence.text}</span>
          </p>
        ) : (
          <p className="meal-card__date t-meta">
            <Icon name="clock" size={14} />
            Last verified {meal.lastVerified}
          </p>
        )}
        {verifiedBy && (
          <p className="meal-card__who t-meta">
            {verifiedBy.tags.length ? (
              <>
                <span className="ink-secondary">Verified by</span>
                {verifiedBy.tags.map(({ type, count }) => (
                  <ReviewerTag key={type} type={`${type} ×${count}`} />
                ))}
              </>
            ) : (
              <span className="meal-card__who-none">{verifiedBy.none}</span>
            )}
          </p>
        )}
        <div className="meal-card__badges">
          {meal.precautions.map((p) => (
            <PrecautionBadge key={p.label} state={p.state}>
              {p.label}
            </PrecautionBadge>
          ))}
        </div>
        <div className="meal-card__foot">
          <StarRating value={meal.rating} count={meal.reviewCount} size={14} />
          <span className="meal-card__more t-meta">
            See details
            <Icon name="chevron" size={16} />
          </span>
        </div>
      </div>
    </Link>
  )
}
