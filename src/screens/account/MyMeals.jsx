import { Link } from 'react-router-dom'
import { Button, ScreenHeader } from '../../components'
import { useStore } from '../../data/store.jsx'
import { ReportRow } from '../contribute/shared.jsx'
import { SavedMealList } from './SavedMeals.jsx'

const PREVIEW_REPORTS = 3

// My Meals tab: the meals you saved and the reports you wrote, one tap from anywhere.
export default function MyMeals() {
  const { state } = useStore()
  const mine = state.reports.filter((r) => r.author === 'me')

  return (
    <>
      <ScreenHeader title="My meals" back={false} />

      <div className="section stack-3">
        <h2 className="t-section-header">Saved meals</h2>
        <SavedMealList />
        <Button block to="/discover">
          Find meals to save
        </Button>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <div className="row row--between">
          <h2 className="t-section-header">My reports</h2>
          {mine.length > PREVIEW_REPORTS && (
            <Link className="text-btn" to="/contribute/mine">
              See all {mine.length}
            </Link>
          )}
        </div>
        {mine.length > 0 ? (
          <div>
            {mine.slice(0, PREVIEW_REPORTS).map((r) => (
              <ReportRow key={r.id} report={r} />
            ))}
          </div>
        ) : (
          <p className="t-body ink-secondary">
            You haven't written a report yet. Reports from your visits help others decide.
          </p>
        )}
        <Button block to="/contribute/report/meal">
          Write a report
        </Button>
      </div>
    </>
  )
}
