import { useState } from 'react'
import StarRating from './StarRating.jsx'

// Reviewer type is required on every report: Celiac / Strict GF / Gluten-sensitive / Restaurant.
export function ReviewerTag({ type }) {
  return <span className="reviewer-tag">{type}</span>
}

const ACTIONS = ['Helpful', 'Matches my visit', 'Report conflict']

export default function ReviewCard({ name, reviewerType, location, reportCount, date, rating, children }) {
  const [expanded, setExpanded] = useState(false)
  const [chosen, setChosen] = useState([])
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const isLong = typeof children === 'string' && children.length > 220

  const toggle = (action) =>
    setChosen((list) => (list.includes(action) ? list.filter((a) => a !== action) : [...list, action]))

  return (
    <article className="review">
      <div className="review__who">
        <div className="avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <div className="t-reviewer-name">
            {name}
            <ReviewerTag type={reviewerType} />
          </div>
          <div className="t-caption ink-secondary">
            {location} · {reportCount} reports
          </div>
        </div>
      </div>
      <div className="review__meta">
        <StarRating value={rating} size={15} />
        <span className="t-caption ink-secondary">Visited {date}</span>
      </div>
      <p className={`review__body t-body${isLong && !expanded ? ' is-clamped' : ''}`}>{children}</p>
      {isLong && !expanded && (
        <button type="button" className="t-caption link" onClick={() => setExpanded(true)}>
          Read more
        </button>
      )}
      <div className="review__actions">
        {ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            className={`review__action${chosen.includes(action) ? ' is-chosen' : ''}`}
            aria-pressed={chosen.includes(action)}
            onClick={() => toggle(action)}
          >
            {action}
          </button>
        ))}
      </div>
    </article>
  )
}
