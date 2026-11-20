import { Icon } from '../../components'
import {
  INGREDIENT_STATUS,
  ingredientSummary,
  mealIngredients,
  sourceText,
} from '../../data/ingredients.js'

// "What's in it?" — answers the questions testers still had after the safety check: sauces,
// seasonings, marinades, flour, fryer oil. Problems first, like the safety check, and every
// status is icon + words + color. Each row says where its status came from.
export default function Ingredients({ meal }) {
  const data = mealIngredients(meal.id)
  if (!data) return null
  const summary = ingredientSummary(meal.id)

  return (
    <section className="ingredients stack-3" aria-labelledby="ingredients-title">
      <div className="stack-2">
        <h2 id="ingredients-title" className="t-section-header">
          Ingredients & hidden gluten
        </h2>
        <p className={`ingredients__summary t-meta is-${summary.tone}`}>
          <Icon name={summary.icon} size={14} />
          <span>
            {summary.text === 'all confirmed'
              ? 'Every higher-risk item is confirmed gluten-free'
              : `${summary.text[0].toUpperCase()}${summary.text.slice(1)}`}
          </span>
        </p>
      </div>

      <div className="stack-2">
        <h3 className="ingredients__label t-caption">Main ingredients</h3>
        <p className="t-body">{data.main.join(' · ')}</p>
      </div>

      <div>
        <h3 className="ingredients__label t-caption">Where gluten can hide</h3>
        <ul className="ingredients__rows">
          {data.components.map((item) => {
            const status = INGREDIENT_STATUS[item.status]
            const source = sourceText(item, meal)
            return (
              <li key={item.name} className={`ingredient-row is-${status.tone}`}>
                <span className="safety-row__icon ingredient-row__icon" aria-hidden="true">
                  <Icon name={status.icon} size={16} />
                </span>
                <div className="ingredient-row__main">
                  <p className="t-body">
                    {item.name}
                    <span className="ingredient-row__kind t-meta"> · {item.kind}</span>
                  </p>
                  <p className="t-meta">
                    <span className="ingredient-row__status">{status.label}</span>
                    <span className="ink-secondary"> · {source.text}</span>
                    {source.thin && <span className="safety-row__thin"> · needs more reports</span>}
                  </p>
                  {item.ask && (
                    <p className="ingredient-row__tip t-meta">
                      <b>Ask:</b> “{item.ask}”
                    </p>
                  )}
                  {item.fix && <p className="ingredient-row__tip t-meta">{item.fix}</p>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
