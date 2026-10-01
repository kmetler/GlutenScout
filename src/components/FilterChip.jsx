import Icon from './Icon.jsx'

// Wrap a set of chips in <FilterChips> for the horizontal-scroll row.
export function FilterChips({ label = 'Filters', children }) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {children}
    </div>
  )
}

export default function FilterChip({ selected = false, icon, children, ...rest }) {
  return (
    <button
      type="button"
      className={`chip${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      {...rest}
    >
      {icon && <Icon name={icon} size={15} />}
      {children}
    </button>
  )
}
