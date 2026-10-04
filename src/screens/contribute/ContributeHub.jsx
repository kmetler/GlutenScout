import { useState } from 'react'
import { Button, ListRow, ScreenHeader } from '../../components'
import { findMeal } from '../../data/sample.js'
import { useStore } from '../../data/store.jsx'

export default function ContributeHub() {
  const { state, actions, statusOf } = useStore()
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  const { draft, reports, currentUser } = state
  const draftMeal = draft && findMeal(draft.mealId)

  const waiting = reports.filter(
    (r) => r.author !== 'me' && statusOf(r).status !== 'confirmed',
  ).length
  const mine = reports.filter((r) => r.author === 'me').length

  return (
    <>
      <ScreenHeader title="Contribute" back={false} />

      <div className="section stack-3">
        <h2 className="t-section-header">Help others eat out with confidence</h2>
        <p className="t-body ink-secondary">
          Share what you saw in the kitchen, call ahead when you're unsure, and check other
          people's reports against your own visits.
        </p>
        <Button variant="primary" block to="/contribute/report/meal">
          Write a report
        </Button>

        {draftMeal && (
          <div className="notice t-body">
            <div className="grow stack-2">
              <p>
                <b>Unfinished report</b> · {draftMeal.name}
              </p>
              {confirmDiscard ? (
                <div className="row row--wrap">
                  <span className="t-meta">Discard your answers?</span>
                  <button
                    type="button"
                    className="text-btn"
                    onClick={() => {
                      actions.discardDraft()
                      setConfirmDiscard(false)
                    }}
                  >
                    Yes, discard
                  </button>
                  <button type="button" className="text-btn" onClick={() => setConfirmDiscard(false)}>
                    Keep it
                  </button>
                </div>
              ) : (
                <div className="row row--wrap">
                  <Button to="/contribute/report/practices">Continue report</Button>
                  <button type="button" className="text-btn" onClick={() => setConfirmDiscard(true)}>
                    Discard draft
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="band" />

      <div className="section">
        <nav aria-label="Contribute">
          <ListRow
            to="/contribute/call"
            icon="phone"
            title="Call ahead"
            detail="A question script for the restaurant, built from what's unclear"
          />
          <ListRow
            to="/contribute/review"
            icon="check"
            title="Review reports"
            detail={`${waiting} waiting for matches or in conflict`}
          />
          <ListRow
            to="/contribute/mine"
            icon="bookmark"
            title="My reports"
            detail={mine ? `${mine} submitted` : 'Nothing submitted yet'}
          />
          <ListRow
            to="/contribute/verifier"
            icon="person"
            title="Become a verifier"
            detail={
              currentUser.isVerifier
                ? `You're a verifier (${currentUser.reviewerType})`
                : 'Your matches help confirm reports'
            }
          />
        </nav>
      </div>
    </>
  )
}
