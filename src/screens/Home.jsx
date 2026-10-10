import { Link } from 'react-router-dom'
import { Button, Icon } from '../components'
import { useDiscover } from './discover/discoverStore.js'

// Landing screen: says what GlutenScout does and leads to the main task, browsing meals.
// The other sections are one tap away in the tab bar.
export default function Home({ onShowDisclosure, onToggleTheme }) {
  const { discover, finishTour, restartTour } = useDiscover()

  return (
    <>
      <button type="button" className="lofi-note t-caption" onClick={onShowDisclosure}>
        <Icon name="info" />
        Low-fidelity prototype — example data only. Tap for details.
      </button>

      <div className="section stack-3">
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
          Find gluten-free meals near you and see how each one was checked — when, and by whom.
          Then decide for yourself.
        </p>
        <Button variant="primary" block to="/discover">
          <Icon name="search" />
          Browse meals
        </Button>
      </div>

      <div className="band" />

      <div className="section">
        {discover.tourDone ? (
          <Link className="text-btn" to="/discover/welcome" onClick={restartTour}>
            Take the quick tour again
          </Link>
        ) : (
          <div className="notice t-body">
            <Icon name="info" />
            <div className="grow stack-2">
              <p>
                <b>New here?</b> See how GlutenScout shows evidence for each dish, in 3 short
                screens.
              </p>
              <div className="row row--wrap">
                <Button to="/discover/welcome">Take the tour</Button>
                <button type="button" className="text-btn" onClick={finishTour}>
                  Not now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
