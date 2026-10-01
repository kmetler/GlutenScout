import { Icon, ListRow } from '../components'
import { SECTIONS } from './sections.js'

// Landing screen: the starting point every section branches from.
export default function Home({ onShowDisclosure, onToggleTheme }) {
  return (
    <>
      <button type="button" className="lofi-note t-caption" onClick={onShowDisclosure}>
        <Icon name="info" />
        Low-fidelity prototype — example data only. Tap for details.
      </button>

      <div className="section stack-2">
        <div className="row row--between">
          <span className="wordmark">GlutenScout</span>
          <button
            type="button"
            className="icon-btn"
            aria-label="Switch between light and dark theme"
            onClick={onToggleTheme}
          >
            <Icon name="theme" size={22} />
          </button>
        </div>
        <h1 className="t-screen-title">Confidence in every meal</h1>
        <p className="t-body ink-secondary">
          See how each dish was checked, when, and by whom — then decide for yourself.
        </p>
      </div>

      <div className="band" />

      <div className="section">
        <h2 className="t-section-header">Where to?</h2>
        <nav aria-label="Sections">
          {SECTIONS.map((section) => (
            <ListRow
              key={section.to}
              to={section.to}
              icon={section.icon}
              title={section.title}
              detail={section.summary}
            />
          ))}
        </nav>
      </div>

      <div className="band" />

      <div className="section">
        <ListRow
          to="/styleguide"
          icon="grid"
          title="Component reference"
          detail="For the team: every shared component in one place"
        />
      </div>
    </>
  )
}
