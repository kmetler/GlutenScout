import { NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'

// Always visible, so every section is one tap away from any screen (non-linear navigation).
export const TABS = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/discover', label: 'Discover', icon: 'search' },
  { to: '/meals', label: 'Meals', icon: 'meal' },
  { to: '/contribute', label: 'Contribute', icon: 'plus' },
  { to: '/account', label: 'Account', icon: 'person' },
]

export default function TabBar() {
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => `tab-bar__item${isActive ? ' is-active' : ''}`}
        >
          <Icon name={tab.icon} size={22} />
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
