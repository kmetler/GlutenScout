import { useId } from 'react'

const STAR = 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z'

// Tap-to-rate input (whole stars). Tapping the current value again clears it.
export function StarInput({ value, onChange, label = 'Food rating' }) {
  return (
    <div className="star-input" role="radiogroup" aria-label={label}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? 's' : ''}`}
          className="star-input__star"
          onClick={() => onChange(value === i ? null : i)}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
            <path className={value >= i ? 'stars__fill' : 'stars__empty'} d={STAR} />
          </svg>
        </button>
      ))}
    </div>
  )
}

// Stars rate food and experience only — never gluten safety.
// size: 22 | 18 | 15 | 14. Always paired with the count.
export default function StarRating({ value, count, size = 15 }) {
  const id = useId()
  const rounded = Math.round(value * 2) / 2
  return (
    <span className="stars">
      <span className="stars__row" role="img" aria-label={`Food rating ${rounded} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = rounded >= i ? 1 : rounded >= i - 0.5 ? 0.5 : 0
          const clip = `${id}-${i}`
          return (
            <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <clipPath id={clip}>
                  <rect width={24 * fill} height="24" />
                </clipPath>
              </defs>
              <path className="stars__empty" d={STAR} />
              <path className="stars__fill" clipPath={`url(#${clip})`} d={STAR} />
            </svg>
          )
        })}
      </span>
      <span className="t-emphasis">{rounded.toFixed(1)}</span>
      {count != null && (
        <span className="t-meta ink-secondary">· {count.toLocaleString()} reviews</span>
      )}
    </span>
  )
}
