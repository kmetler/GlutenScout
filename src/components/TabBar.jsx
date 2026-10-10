import { NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'

// Always visible, so every section is one tap away from any screen (non-linear navigation).
// `also` lists other paths that belong to the tab: a meal page is part of Discover.
export const TABS = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/discover', label: 'Discover', icon: 'search', also: ['/meals'] },
  { to: '/my-meals', label: 'My Meals', icon: 'bookmark' },
  { to: '/contribute', label: 'Contribute', icon: 'plus' },
  { to: '/account', label: 'Account', icon: 'person' },
]

export default function TabBar() {
  const { pathname } = useLocation()
  const inAlso = (tab) => tab.also?.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `tab-bar__item${isActive || inAlso(tab) ? ' is-active' : ''}`
          }
        >
          <Icon name={tab.icon} size={22} />
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
