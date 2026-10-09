import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Checkbox, ConfirmDialog, ListRow, Notice, ScreenHeader } from '../../components'
import { useStore } from '../../data/store.jsx'
import { discoverActions } from '../discover/discoverStore.js'
import { useAccount } from './accountStore.js'
import { isActiveVerifier, ReportOrderPicker } from './shared.jsx'

const ALERTS = [
  { key: 'savedReports', label: 'A saved meal gets a new report' },
  { key: 'savedConflicts', label: 'Reports on a saved meal start to disagree' },
  { key: 'following', label: 'Someone you follow posts a report' },
]

export default function Settings() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { account, setReportOrder, setAlert, reset } = useAccount()
  const { state: navState } = useLocation()
  const [confirmReset, setConfirmReset] = useState(false)
  const [resetDone, setResetDone] = useState(false)
  const user = state.currentUser
  const message = resetDone ? 'Account data reset.' : navState?.saved

  return (
    <>
      <ScreenHeader title="Settings" backTo="/account" />

      {message && (
        <div className="section">
          <Notice icon="check">{message}</Notice>
        </div>
      )}

      <div className="section">
        <h2 className="t-section-header">Profile</h2>
        <ListRow
          to="/account/profile"
          title="Name and home area"
          detail={user.name === 'You' ? 'Not set' : `${user.name} · ${user.location}`}
        />
        <ListRow
          to="/account/settings/type"
          title="Reviewer type"
          detail={user.reviewerType ?? 'Not set'}
        />
        <ListRow
          to="/contribute/verifier"
          title="Verifier"
          detail={isActiveVerifier(user) ? 'You’re a verifier' : 'Not a verifier'}
        />
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-section-header">Whose reports come first</h2>
        <p className="t-body ink-secondary">Used when you read reports about a meal.</p>
        <ReportOrderPicker value={account.reportOrder} onChange={setReportOrder} />
        <p className="t-caption ink-secondary">Changes save as soon as you tap.</p>
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-section-header">Alert me when</h2>
        {ALERTS.map((alert) => (
          <Checkbox
            key={alert.key}
            checked={account.alerts[alert.key]}
            onChange={(on) => setAlert(alert.key, on)}
          >
            {alert.label}
          </Checkbox>
        ))}
        <p className="t-caption ink-secondary">
          Changes save as soon as you tap. This prototype doesn't send alerts.
        </p>
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-section-header">Test sessions</h2>
        {confirmReset ? (
          <>
            <p className="t-body">
              This resets your saved meals, follows, report order and alerts to the examples.
            </p>
            <div className="row">
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  reset()
                  setConfirmReset(false)
                  setResetDone(true)
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
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              setConfirmReset(true)
              setResetDone(false)
            }}
          >
            Reset account data
          </button>
        )}
        <ListRow
          to="/contribute/mine"
          title="Reset reports and reviewer type"
          detail="At the bottom of My reports"
        />
        <ListRow
          to="/styleguide"
          title="Component reference"
          detail="For the team: every shared component in one place"
        />
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-section-header">Delete account</h2>
        <p className="t-body ink-secondary">
          Removes your profile, reports, saved meals and settings from this device.
        </p>
        <button type="button" className="text-btn" onClick={() => setConfirmDelete(true)}>
          Delete my account
        </button>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title="Delete your account?"
          confirmLabel="Yes, delete my account"
          cancelLabel="No, keep it"
          onConfirm={() => {
            actions.resetDemo()
            reset()
            discoverActions.reset()
            navigate('/', { replace: true })
          }}
          onCancel={() => setConfirmDelete(false)}
        >
          Your name, reviewer type, verifier status, reports, matches, saved meals, follows and
          settings will be removed. Other people's reports stay. This can't be undone.
        </ConfirmDialog>
      )}
    </>
  )
}
