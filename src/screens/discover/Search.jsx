import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FilterChip, FilterChips, Icon, ListRow, ScreenHeader } from '../../components'
import { restaurants } from '../../data/sample.js'
import { useDiscover } from './discoverStore.js'
import { searchMeals, sortMeals } from './evidence.js'
import { MealResult } from './shared.jsx'

const SUGGESTIONS = ['Tacos', 'Pizza', 'Dedicated fryer', 'Thai', 'Breakfast']
const BY_ID = Object.fromEntries(restaurants.map((r) => [r.id, r]))

export default function Search() {
  const [params, setParams] = useSearchParams()
  const { discover, addRecent, clearRecent } = useDiscover()
  const [text, setText] = useState(params.get('q') ?? '')
  const query = text.trim()

  const mealHits = useMemo(() => sortMeals(searchMeals(query, BY_ID), discover.sort), [query, discover.sort])
  const placeHits = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return []
    return restaurants.filter((r) => `${r.name} ${r.cuisine}`.toLowerCase().includes(q))
  }, [query])

  const run = (term) => {
    setText(term)
    setParams(term ? { q: term } : {}, { replace: true })
    addRecent(term)
  }

  return (
    <>
      <ScreenHeader title="Search" backTo="/discover" />

      <div className="section stack-3">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            run(text)
          }}
        >
          <label className="visually-hidden" htmlFor="discover-search">
            Search dishes, restaurants or practices
          </label>
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              id="discover-search"
              className="field__input t-body"
              type="search"
              autoFocus
              placeholder="Try “tacos” or “dedicated fryer”"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={() => query && addRecent(query)}
            />
          </div>
        </form>

        {!query && (
          <>
            {discover.recent.length > 0 && (
              <div className="stack-2">
                <div className="row row--between">
                  <h2 className="t-card-header">Recent searches</h2>
                  <button type="button" className="text-btn" onClick={clearRecent}>
                    Clear
                  </button>
                </div>
                <FilterChips label="Recent searches" wrap>
                  {discover.recent.map((term) => (
                    <FilterChip key={term} icon="clock" onClick={() => run(term)}>
                      {term}
                    </FilterChip>
                  ))}
                </FilterChips>
              </div>
            )}
            <div className="stack-2">
              <h2 className="t-card-header">Try searching for</h2>
              <FilterChips label="Suggested searches" wrap>
                {SUGGESTIONS.map((term) => (
                  <FilterChip key={term} icon="search" onClick={() => run(term)}>
                    {term}
                  </FilterChip>
                ))}
              </FilterChips>
            </div>
          </>
        )}
      </div>

      {query && (
        <>
          <div className="band" />
          <div className="section">
            <h2 className="t-card-header" aria-live="polite">
              {mealHits.length} {mealHits.length === 1 ? 'meal' : 'meals'} for “{query}”
            </h2>
            {mealHits.map((meal) => (
              <MealResult key={meal.id} meal={meal} />
            ))}
            {mealHits.length === 0 && (
              <p className="t-body ink-secondary">
                No meals match. Check the spelling, try a dish or restaurant name, or{' '}
                <Link className="link" to="/discover">
                  browse all meals
                </Link>
                .
              </p>
            )}
          </div>

          {placeHits.length > 0 && (
            <>
              <div className="band" />
              <div className="section">
                <h2 className="t-card-header">Restaurants</h2>
                {placeHits.map((r) => (
                  <ListRow
                    key={r.id}
                    to={`/discover/restaurants/${r.id}`}
                    icon="meal"
                    title={r.name}
                    detail={`${r.cuisine} · ${r.distance}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
