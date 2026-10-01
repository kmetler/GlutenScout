import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// variant: 'primary' (one per screen) | 'secondary'
// Pass `to` to render a link that looks like a button.
const Button = forwardRef(function Button(
  { variant = 'secondary', block = false, to, children, ...rest },
  ref,
) {
  const className = `btn btn--${variant}${block ? ' btn--block' : ''}`
  if (to) {
    return (
      <Link ref={ref} className={className} to={to} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button ref={ref} type="button" className={className} {...rest}>
      {children}
    </button>
  )
})

export default Button

// Ghost icon button: Save / Share / Directions.
export function GhostButton({ icon, label, selected = false, ...rest }) {
  return (
    <button
      type="button"
      className={`btn btn--ghost${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      {...rest}
    >
      <Icon name={icon} />
      {label}
    </button>
  )
}
