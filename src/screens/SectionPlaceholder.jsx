import { ScreenHeader, ListRow } from '../components'
import { SECTIONS } from './sections.js'

// Placeholder for a section that hasn't been built yet.
// The section owner replaces this route's element in src/App.jsx with real screens.
export default function SectionPlaceholder({ section }) {
  const others = SECTIONS.filter((s) => s.to !== section.to)
  return (
    <>
      <ScreenHeader title={section.title} backTo="/" />

      <div className="section stack-2">
        <h2 className="t-section-header">Coming soon</h2>
        <p className="t-body">
          This part of the prototype isn't built yet. Here is what it will include:
        </p>
        <ul className="modal__list t-body">
          {section.planned.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="t-meta ink-secondary">
          {section.owner} · {section.branch}
        </p>
        <p className="t-meta ink-secondary">Research tie-in: {section.insight}</p>
      </div>

      <div className="band" />

      <div className="section">
        <h2 className="t-section-header">Go somewhere else</h2>
        <nav aria-label="Other sections">
          {others.map((s) => (
            <ListRow key={s.to} to={s.to} icon={s.icon} title={s.title} detail={s.summary} />
          ))}
        </nav>
      </div>
    </>
  )
}
