import Icon from './Icon.jsx'
import Button from './Button.jsx'
import PrecautionBadge from './PrecautionBadge.jsx'

// The combined safety summary. Every claim shows a date; conflicts are stated in words.
// precautions: [{ label, state }]   sources: [{ label, detail }]
// Pass mealId so "Call ahead" opens the call-ahead script for that meal.
export default function SafetyProfile({
  mealId,
  lastVerified,
  precautions = [],
  sources = [],
  conflictNote,
  callAheadTo = mealId ? `/contribute/call/${mealId}` : '/contribute/call',
}) {
  const needsCall = Boolean(conflictNote) || precautions.some((p) => p.state !== 'confirmed')
  return (
    <section className="safety">
      <h2 className="t-section-header">Safety profile</h2>
      <p className="safety__date t-meta">
        <Icon name="clock" size={14} />
        Last verified {lastVerified}
      </p>
      <div className="safety__badges">
        {precautions.map((p) => (
          <PrecautionBadge key={p.label} state={p.state}>
            {p.label}
          </PrecautionBadge>
        ))}
      </div>
      <ul className="safety__sources t-body">
        {sources.map((s) => (
          <li key={s.label}>
            <b>{s.label}</b> · {s.detail}
          </li>
        ))}
      </ul>
      {conflictNote && (
        <p className="safety__note t-body">
          <Icon name="triangle" />
          <span>{conflictNote}</span>
        </p>
      )}
      {needsCall && (
        <div className="safety__action">
          <Button to={callAheadTo}>
            <Icon name="phone" />
            Call ahead
          </Button>
        </div>
      )}
    </section>
  )
}
