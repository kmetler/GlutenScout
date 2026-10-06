import { Button, ListRow, Notice, ScreenHeader } from '../../components'
import { findMeal } from '../../data/sample.js'
import { useStore } from '../../data/store.jsx'
import { needsCheck } from './SavedMeals.jsx'
import { useAccount } from './accountStore.js'
import { isActiveVerifier, PersonHeader } from './shared.jsx'

export default function AccountHub() {
  const { state } = useStore()
  const { account } = useAccount()
  const { saved, following } = account
  const { currentUser, reports } = state
  const hasProfile = Boolean(currentUser.reviewerType)
  const savedMeals = saved.map(findMeal).filter(Boolean)
  const toCheck = savedMeals.filter(needsCheck).length
  const mine = reports.filter((r) => r.author === 'me').length

  return (
    <>
      <ScreenHeader title="Account" back={false} />

      <div className="section stack-3">
        {hasProfile ? (
          <>
            <PersonHeader
              name={currentUser.name}
              reviewerType={currentUser.reviewerType}
              detail={currentUser.location}
              isVerifier={isActiveVerifier(currentUser)}
            />
            <p className="t-body ink-secondary">
              Your reviewer type is shown next to your name on every report, so readers can weigh
              what you share.
            </p>
          </>
        ) : (
          <>
            <h2 className="t-section-header">Set up your profile</h2>
            <p className="t-body ink-secondary">
              Tell us how you eat gluten-free. It appears next to your name on every report, and
              lets you choose whose reports you see first.
            </p>
            <Notice>Takes about a minute. You can change it later in Settings.</Notice>
            <Button variant="primary" block to="/account/setup">
              Set up profile
            </Button>
          </>
        )}
      </div>

      <div className="band" />

      <div className="section">
        <nav aria-label="Your things">
          <ListRow
            to="/account/saved"
            icon="bookmark"
            title="Saved meals"
            detail={
              savedMeals.length
                ? `${savedMeals.length} saved${toCheck ? ` · ${toCheck} worth checking before you go` : ''}`
                : 'Nothing saved yet'
            }
          />
          <ListRow
            to="/account/community"
            icon="person"
            title="Community"
            detail={
              following.length
                ? `Following ${following.length} · see who reports near you`
                : 'See who reports on meals near you'
            }
          />
          <ListRow
            to="/contribute/mine"
            icon="plus"
            title="My reports"
            detail={mine ? `${mine} submitted` : 'Nothing submitted yet'}
          />
        </nav>
      </div>

      <div className="band" />

      <div className="section">
        <nav aria-label="Settings and help">
          <ListRow
            to="/account/settings"
            icon="grid"
            title="Settings"
            detail="Name, reviewer type, whose reports come first, alerts"
          />
          <ListRow
            to="/account/help"
            icon="info"
            title="Help and FAQ"
            detail="What badges mean, how reports get confirmed"
          />
        </nav>
      </div>
    </>
  )
}
