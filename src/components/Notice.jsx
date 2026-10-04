import Icon from './Icon.jsx'

// Calm, neutral explanation box (how something works, why an action is unavailable).
// For disagreement between reports, use the SafetyProfile conflict note instead.
export default function Notice({ icon = 'info', children }) {
  return (
    <div className="notice t-body">
      <Icon name={icon} />
      <div>{children}</div>
    </div>
  )
}
