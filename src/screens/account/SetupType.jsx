import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ActionBar, Button, Notice, ScreenHeader, StepHeader } from '../../components'
import { useStore, VERIFIER_TYPES } from '../../data/store.jsx'
import { ReviewerTypePicker, SETUP_STEPS, TypeChangeNotice } from './shared.jsx'

// Step 2. Reviewer type: the trust signal on every report (research insight #3).
export default function SetupType() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const user = state.currentUser
  const [type, setType] = useState(user.reviewerType)
  if (user.name === 'You') return <Navigate to="/account/setup" replace />

  const next = () => {
    actions.setReviewerType(type)
    navigate('/account/setup/order')
  }

  return (
    <>
      <ScreenHeader title="Set up profile" backTo="/account/setup" />
      <div className="section stack-4">
        <StepHeader step={2} total={SETUP_STEPS} title="How do you eat gluten-free?">
          This tag sits next to your name on every report. Diners told us they weigh a report
          differently depending on who wrote it.
        </StepHeader>
        <ReviewerTypePicker value={type} onChange={setType} />
        {user.reviewerType ? (
          <TypeChangeNotice currentUser={user} nextType={type} />
        ) : (
          type && (
            <Notice>
              {VERIFIER_TYPES.includes(type)
                ? 'Celiac and Strict GF diners can also become verifiers, who confirm other people’s reports.'
                : 'You can write reports and flag conflicts. Confirming reports is left to Celiac and Strict GF verifiers.'}
            </Notice>
          )
        )}
      </div>
      <ActionBar note={type ? null : 'Choose the option that fits you best.'}>
        <Button variant="primary" block disabled={!type} onClick={next}>
          Next
        </Button>
      </ActionBar>
    </>
  )
}
