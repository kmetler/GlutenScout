import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ActionBar,
  Button,
  ConfirmDialog,
  Icon,
  Notice,
  ReportStatus,
  ReviewCard,
  ReviewerTag,
  ScreenHeader,
} from '../../components'
import { findMeal } from '../../data/sample.js'
import { useStore, VERIFIER_TYPES } from '../../data/store.jsx'
import { ReportClaims } from './shared.jsx'

function VoteList({ votes }) {
  if (!votes.length) return <p className="t-body ink-secondary">No one has reviewed this yet.</p>
  return (
    <ul>
      {votes.map((v) => (
        <li key={v.by} className="summary-block">
          <p className="t-reviewer-name">
            {v.name}
            <ReviewerTag type={v.reviewerType} />
            {v.verifier && <span className="t-caption ink-secondary"> · verifier</span>}
          </p>
          {v.kind === 'match' ? (
            <p className="t-meta ink-secondary">Matches their visit · {v.date}</p>
          ) : (
            <>
              <p className="t-meta text-conflict">
                Saw something different · {v.date}
              </p>
              {v.claims?.length > 0 && <p className="t-meta">About: {v.claims.join(', ')}</p>}
              {v.note && <p className="t-body">“{v.note}”</p>}
            </>
          )}
          {v.kind === 'match' && !(v.verifier && VERIFIER_TYPES.includes(v.reviewerType)) && (
            <p className="t-caption ink-secondary">Not counted — not a celiac or strict GF verifier.</p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ReviewReport() {
  const { reportId } = useParams()
  const navigate = useNavigate()
  const { state, actions, findReport, statusOf } = useStore()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const report = findReport(reportId)
  if (!report) return <Navigate to="/contribute/review" replace />

  const meal = findMeal(report.mealId)
  const { status, matches } = statusOf(report)
  const votes = state.votes[report.id] ?? []
  const myVote = votes.find((v) => v.by === 'me')
  const isMine = report.author === 'me'
  const { isVerifier } = state.currentUser

  let actionArea
  if (isMine) {
    actionArea = (
      <div className="stack-2">
        <Notice>This is your report. Verifiers who eat here will compare it with their visit.</Notice>
        <button type="button" className="text-btn" onClick={() => setConfirmDelete(true)}>
          Delete this report
        </button>
      </div>
    )
  } else if (myVote) {
    actionArea = (
      <ActionBar>
        <p className="t-body row">
          <Icon name={myVote.kind === 'match' ? 'check' : 'triangle'} />
          {myVote.kind === 'match'
            ? 'You said this matches your visit.'
            : 'You flagged a conflict. The moderation team will review it.'}
        </p>
        <Button block onClick={() => actions.unvote(report.id)}>
          Undo
        </Button>
      </ActionBar>
    )
  } else {
    actionArea = (
      <ActionBar
        note={
          isVerifier
            ? 'Only respond if you ate this meal here recently.'
            : "Your match won't count until you're a verifier. You can still flag a conflict."
        }
      >
        {isVerifier ? (
          <Button variant="primary" block onClick={() => actions.vote(report.id, 'match')}>
            Matches my visit
          </Button>
        ) : (
          <Button variant="primary" block to="/contribute/verifier">
            Become a verifier
          </Button>
        )}
        <Button block onClick={() => navigate(`/contribute/review/${report.id}/conflict`)}>
          Something was different
        </Button>
      </ActionBar>
    )
  }

  return (
    <>
      <ScreenHeader
        title="Report"
        fallbackTo={isMine ? '/contribute/mine' : '/contribute/review'}
      />
      <div className="section stack-2">
        <h2 className="t-section-header">{meal.name}</h2>
        <p className="t-meta ink-secondary">
          {meal.restaurant} · {meal.distance}
        </p>
        <ReportStatus status={status} matches={matches} />
        {status === 'conflict' && (
          <p className="t-body">
            Someone saw something different. Both reports stay visible while the moderation team
            checks the details.
          </p>
        )}
      </div>

      <div className="band" />

      <div className="section stack-3">
        <ReviewCard
          name={report.name}
          reviewerType={report.reviewerType}
          location={report.location}
          reportCount={report.reportCount}
          date={report.date}
          dateLabel={report.source === 'phone' ? 'Called' : 'Visited'}
          rating={report.rating}
          showActions={false}
        >
          {report.body}
        </ReviewCard>
        <h3 className="t-card-header">What they reported</h3>
        <ReportClaims claims={report.claims} />
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-section-header">Peer review</h2>
        <VoteList votes={votes} />
      </div>

      {isMine ? <div className="section">{actionArea}</div> : actionArea}

      {confirmDelete && (
        <ConfirmDialog
          title="Delete this report?"
          confirmLabel="Yes, delete it"
          cancelLabel="No, keep it"
          onConfirm={() => {
            actions.deleteReport(report.id)
            navigate('/my-meals', { replace: true })
          }}
          onCancel={() => setConfirmDelete(false)}
        >
          Your report on {meal.name} and any matches or conflicts on it will be removed. This
          can't be undone.
        </ConfirmDialog>
      )}
    </>
  )
}
