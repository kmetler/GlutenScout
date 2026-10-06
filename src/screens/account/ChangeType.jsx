import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionBar, Button, ScreenHeader } from '../../components'
import { useStore } from '../../data/store.jsx'
import { ReviewerTypePicker, TypeChangeNotice } from './shared.jsx'

// The one place to change reviewer type after setup.
export default function ChangeType() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const user = state.currentUser
  const [type, setType] = useState(user.reviewerType)
  const changed = type && type !== user.reviewerType

  const save = () => {
    actions.setReviewerType(type)
    navigate('/account/settings', { state: { saved: `Reviewer type saved: ${type}.` } })
  }

  return (
    <>
      <ScreenHeader title="Reviewer type" backTo="/account/settings" />
      <div className="section stack-3">
        <h2 className="t-section-header">How do you eat gluten-free?</h2>
        <p className="t-body ink-secondary">
          Shown next to your name on every report. Pick the one that fits you, even if it means
          you can't verify — readers rely on it.
        </p>
        <ReviewerTypePicker value={type} onChange={setType} />
        <TypeChangeNotice currentUser={user} nextType={type} />
      </div>
      <ActionBar
        note={!type ? 'Choose the option that fits you best.' : changed ? null : 'This is your current type.'}
      >
        <Button variant="primary" block disabled={!changed} onClick={save}>
          Save reviewer type
        </Button>
      </ActionBar>
    </>
  )
}
