import { FilterChip, FilterChips } from '../../components'
import { STRICTNESS, setStrictness, useStrictness } from '../../data/verifiers.js'

// "Count verifications from: All diners · Celiac & strict GF · Celiac only"
// Lets each diner decide whose word counts, without an account (remembered in this browser).
// Same filter on Discover and on each meal, so badges never disagree between screens.
export default function StrictnessFilter() {
  const level = useStrictness()
  return (
    <div className="strictness-filter">
      <p className="t-meta ink-secondary" id="strictness-label">
        Count verifications from
      </p>
      <FilterChips label="Count verifications from">
        {STRICTNESS.map((s) => (
          <FilterChip key={s.value} selected={level === s.value} onClick={() => setStrictness(s.value)}>
            {s.label}
          </FilterChip>
        ))}
      </FilterChips>
    </div>
  )
}
