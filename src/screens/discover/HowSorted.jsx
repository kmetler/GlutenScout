import { Link } from 'react-router-dom'
import { Button, ScreenHeader } from '../../components'
import { useDiscover } from './discoverStore.js'
import { SORTS, STALE_AFTER_DAYS, sortLabel } from './evidence.js'
import { BadgeGuide } from './TourEvidence.jsx'

// Plain-English explanation of the ranking, reachable from the results list.
export default function HowSorted() {
  const { discover, restartTour } = useDiscover()
  return (
    <>
      <ScreenHeader title="How meals are sorted" backTo="/discover" />

      <div className="section stack-3">
        <h2 className="t-section-header">You’re sorting by {sortLabel(discover.sort).toLowerCase()}</h2>
        {SORTS.map((s) => (
          <div key={s.value} className="stack-2">
            <h3 className="t-card-header">{s.label}</h3>
            <p className="t-body ink-secondary">{s.detail}</p>
          </div>
        ))}
        <p className="t-body">
          Ties go to the meal verified most recently. Meals verified more than {STALE_AFTER_DAYS}{' '}
          days ago are marked so you know to call ahead.
        </p>
        <p className="t-body">
          Meals where reports disagree are never hidden. We’d rather tell you about a possible
          risk than leave it out.
        </p>
        <Button to="/discover/filters">Change sort and filters</Button>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-section-header">What the badges mean</h2>
        <BadgeGuide />
        <div className="row row--wrap">
          <Link className="text-btn" to="/account/help">
            Help and FAQ
          </Link>
          <Link className="text-btn" to="/discover/welcome" onClick={restartTour}>
            Replay the tour
          </Link>
        </div>
      </div>
    </>
  )
}
