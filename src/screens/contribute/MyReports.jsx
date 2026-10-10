import { useState } from 'react'
import { ActionBar, Button, ScreenHeader } from '../../components'
import { useStore } from '../../data/store.jsx'
import { ReportRow } from './shared.jsx'

export default function MyReports() {
  const { state, actions } = useStore()
  const [confirmReset, setConfirmReset] = useState(false)
  const mine = state.reports.filter((r) => r.author === 'me')

  return (
    <>
      <ScreenHeader title="My reports" backTo="/contribute" />
      <div className="section">
        {mine.map((r) => (
          <ReportRow key={r.id} report={r} />
        ))}
        {!mine.length && (
          <p className="t-body ink-secondary">
            You haven't written a report yet. Reports from your visits help others decide.
          </p>
        )}
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-card-header">For test sessions</h2>
        {confirmReset ? (
          <>
            <p className="t-body">
              This clears your reports, votes, call answers, draft, reviewer type and verifier
              status, and restores the example data.
            </p>
            <div className="row">
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  actions.resetDemo()
                  setConfirmReset(false)
                }}
              >
                Yes, reset
              </button>
              <button type="button" className="text-btn" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <button type="button" className="text-btn" onClick={() => setConfirmReset(true)}>
            Reset example data
          </button>
        )}
      </div>

      {/* The main thing to do here, whether or not you've written one yet. */}
      <ActionBar>
        <Button variant="primary" block to="/contribute/report/meal">
          Write a report
        </Button>
      </ActionBar>
    </>
  )
}
