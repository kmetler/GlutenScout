import { Navigate } from 'react-router-dom'
import { Button, Icon, Notice, ReviewCard, ScreenHeader } from '../../components'
import { formatISO, todayISO } from '../../data/dates.js'
import { useStore, VERIFIER_TYPES } from '../../data/store.jsx'
import { useAccount } from './accountStore.js'
import { isActiveVerifier, reportOrderLabel } from './shared.jsx'

// Shows the person exactly how they'll appear on a report.
export default function SetupDone() {
  const { state } = useStore()
  const { account } = useAccount()
  const user = state.currentUser
  if (!user.reviewerType) return <Navigate to="/account/setup" replace />
  const canVerify = VERIFIER_TYPES.includes(user.reviewerType) && !isActiveVerifier(user)
  const mine = state.reports.filter((r) => r.author === 'me').length

  return (
    <>
      <ScreenHeader title="Profile saved" backTo="/account" />
      <div className="section stack-3">
        <h2 className="success-title t-section-header">
          <Icon name="check" size={22} />
          Your profile is saved
        </h2>
        <p className="t-body">This is how your name will appear on reports you write:</p>
        <ReviewCard
          name={user.name}
          reviewerType={user.reviewerType}
          location={user.location}
          reportCount={mine}
          date={formatISO(todayISO())}
          showActions={false}
        >
          Your notes about the meal and the kitchen go here.
        </ReviewCard>
        <p className="t-meta ink-secondary">
          Reports on meals: {reportOrderLabel(account.reportOrder)}
        </p>
        {canVerify && (
          <Notice>
            As a {user.reviewerType} diner, you can become a verifier and help confirm other
            people's reports.
          </Notice>
        )}
      </div>
      <div className="section stack-2">
        <Button variant="primary" block to="/discover">
          Find meals near you
        </Button>
        {canVerify && (
          <Button block to="/contribute/verifier">
            Become a verifier
          </Button>
        )}
        <Button block to="/account">
          Back to Account
        </Button>
      </div>
    </>
  )
}
