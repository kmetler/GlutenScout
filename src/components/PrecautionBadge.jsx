import Icon from './Icon.jsx'

// One kitchen practice and its evidence state. Labels name practices, never verdicts.
// Safety is never signalled by color alone: icon + words + color.
const STATES = {
  confirmed: { icon: 'check', text: 'Confirmed' },
  conflict: { icon: 'triangle', text: 'Reports disagree' },
  unverified: { icon: 'clock', text: 'Unverified' },
}

export default function PrecautionBadge({ state = 'unverified', children }) {
  const { icon, text } = STATES[state]
  return (
    <span className={`badge badge--${state}`}>
      <Icon name={icon} size={15} />
      <span className="visually-hidden">{text}: </span>
      {children}
    </span>
  )
}
