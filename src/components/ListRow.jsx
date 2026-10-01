import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// Tappable row: section links, settings, help topics.
export default function ListRow({ to, icon, title, detail }) {
  return (
    <Link className="list-row" to={to}>
      {icon && (
        <span className="list-row__icon">
          <Icon name={icon} size={22} />
        </span>
      )}
      <span className="list-row__main">
        <span className="list-row__title t-card-header">{title}</span>
        {detail && <span className="list-row__detail t-meta ink-secondary">{detail}</span>}
      </span>
      <span className="list-row__chevron">
        <Icon name="chevron" />
      </span>
    </Link>
  )
}
