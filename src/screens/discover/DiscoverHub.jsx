import { Link, useNavigate } from 'react-router-dom'
import { Button, FilterChip, FilterChips } from '../../components'
import { useDiscover } from './discoverStore.js'
import { activeFilterCount, filterSummary, findMeals, sortLabel } from './evidence.js'
import { DiscoverTop, MealResult } from './shared.jsx'

// Discover tab root: meals near you, ranked by evidence, with quick filters one tap away.
// The top is kept compact so the meals themselves start above the fold.
export default function DiscoverHub() {
  const navigate = useNavigate()
  const { discover, patchFilters, clearFilters } = useDiscover()
  const { filters, sort } = discover
  const results = findMeals(filters, sort)
  const count = activeFilterCount(filters)
  const fryer = filters.practices.includes('fryer')

  return (
    <>
      <DiscoverTop view="meals" />

      <div className="discover-chips">
        <FilterChips label="Sort and filter">
          <FilterChip icon="grid" onClick={() => navigate('/discover/filters')}>
            {count ? `Filters (${count})` : 'Filters'}
          </FilterChip>
          <FilterChip onClick={() => navigate('/discover/filters')}>
            Sort: {sortLabel(sort)}
          </FilterChip>
          <FilterChip
            selected={filters.maxMiles === 2}
            onClick={() => patchFilters({ maxMiles: filters.maxMiles === 2 ? null : 2 })}
          >
            Within 2 mi
          </FilterChip>
          <FilterChip
            selected={filters.verifiedWithin === 30}
            onClick={() =>
              patchFilters({ verifiedWithin: filters.verifiedWithin === 30 ? null : 30 })
            }
          >
            Verified this month
          </FilterChip>
          <FilterChip
            selected={fryer}
            onClick={() =>
              patchFilters({
                practices: fryer
                  ? filters.practices.filter((k) => k !== 'fryer')
                  : [...filters.practices, 'fryer'],
              })
            }
          >
            Dedicated fryer
          </FilterChip>
        </FilterChips>
      </div>

      <div className="band" />

      <div className="section">
        <div className="result-count">
          <h2 className="t-card-header" aria-live="polite">
            {results.length} {results.length === 1 ? 'meal' : 'meals'} · {sortLabel(sort).toLowerCase()} first
          </h2>
          <Link className="text-btn t-meta" to="/discover/how-sorted">
            How is this sorted?
          </Link>
        </div>
        {count > 0 && (
          <p className="row row--wrap t-meta ink-secondary">
            <span>{filterSummary(filters)}</span>
            <button type="button" className="text-btn" onClick={clearFilters}>
              Clear filters
            </button>
          </p>
        )}

        {results.length > 0 ? (
          results.map((meal) => <MealResult key={meal.id} meal={meal} />)
        ) : (
          <div className="stack-3">
            <p className="t-body ink-secondary">
              No meals match all of these filters. Try a wider distance or fewer required
              practices.
            </p>
            <Button onClick={clearFilters}>Clear filters</Button>
          </div>
        )}
      </div>
    </>
  )
}
