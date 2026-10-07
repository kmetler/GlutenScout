import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ActionBar,
  Button,
  Checkbox,
  FilterChip,
  FilterChips,
  ScreenHeader,
} from '../../components'
import { PRACTICES } from '../../data/practices.js'
import { NO_FILTERS, useDiscover } from './discoverStore.js'
import { DISTANCES, FILTER_PRACTICES, RECENCY, SORTS, findMeals } from './evidence.js'

// Sort and filter. Changes are held here until "Show n meals", so people can see the count
// before committing (visibility of system status) and back out with Cancel.
export default function Filters() {
  const navigate = useNavigate()
  const { discover, setFilters, setSort } = useDiscover()
  const [sort, setDraftSort] = useState(discover.sort)
  const [filters, setDraft] = useState(discover.filters)
  const patch = (p) => setDraft((f) => ({ ...f, ...p }))
  const count = findMeals(filters, sort).length

  const togglePractice = (key, on) =>
    patch({
      practices: on ? [...filters.practices, key] : filters.practices.filter((k) => k !== key),
    })

  const apply = () => {
    setSort(sort)
    setFilters(filters)
    navigate('/discover')
  }

  return (
    <>
      <ScreenHeader
        title="Sort and filter"
        backTo="/discover"
        action={
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              setDraft(NO_FILTERS)
              setDraftSort('evidence')
            }}
          >
            Reset
          </button>
        }
      />

      <div className="section">
        <fieldset className="fieldset-plain">
          <legend className="t-section-header">Sort by</legend>
          {SORTS.map((option) => (
            <label key={option.value} className="check-row">
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sort === option.value}
                onChange={() => setDraftSort(option.value)}
              />
              <span className="stack-2">
                <span className="choice__title t-card-header">{option.label}</span>
                <span className="choice__detail t-body ink-secondary">{option.detail}</span>
              </span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className="band" />

      <div className="section stack-4">
        <div><fieldset className="fieldset-plain stack-2">
          <legend className="t-section-header">Last verified</legend>
          <p className="t-body ink-secondary">Kitchens and staff change, so newer evidence counts for more.</p>
          <FilterChips label="Last verified" wrap>
            <FilterChip
              selected={filters.verifiedWithin == null}
              onClick={() => patch({ verifiedWithin: null })}
            >
              Any time
            </FilterChip>
            {RECENCY.map((r) => (
              <FilterChip
                key={r.days}
                selected={filters.verifiedWithin === r.days}
                onClick={() => patch({ verifiedWithin: r.days })}
              >
                {r.label}
              </FilterChip>
            ))}
          </FilterChips>
        </fieldset></div>

        <div><fieldset className="fieldset-plain stack-2">
          <legend className="t-section-header">Kitchen practices</legend>
          <p className="t-body ink-secondary">
            Only show meals where diners confirmed these. Practices that reports disagree on
            don’t count.
          </p>
          <div>
            {FILTER_PRACTICES.map((key) => (
              <Checkbox
                key={key}
                checked={filters.practices.includes(key)}
                onChange={(on) => togglePractice(key, on)}
              >
                {PRACTICES[key].label}
              </Checkbox>
            ))}
          </div>
        </fieldset></div>

        <div><fieldset className="fieldset-plain stack-2">
          <legend className="t-section-header">Distance</legend>
          <FilterChips label="Distance" wrap>
            <FilterChip selected={filters.maxMiles == null} onClick={() => patch({ maxMiles: null })}>
              Any distance
            </FilterChip>
            {DISTANCES.map((mi) => (
              <FilterChip
                key={mi}
                selected={filters.maxMiles === mi}
                onClick={() => patch({ maxMiles: mi })}
              >
                Within {mi} mi
              </FilterChip>
            ))}
          </FilterChips>
        </fieldset></div>
      </div>

      <ActionBar
        note={
          count === 0
            ? 'No meals match all of these. Try a wider distance or fewer practices.'
            : undefined
        }
      >
        <Button variant="primary" block disabled={count === 0} onClick={apply}>
          {count === 0 ? 'No meals match' : `Show ${count} ${count === 1 ? 'meal' : 'meals'}`}
        </Button>
        <Button block to="/discover">
          Cancel
        </Button>
      </ActionBar>
    </>
  )
}
