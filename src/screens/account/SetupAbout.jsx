import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionBar, Button, ScreenHeader, StepHeader, TextField } from '../../components'
import { useStore } from '../../data/store.jsx'
import { SETUP_STEPS } from './shared.jsx'

export const NAME_MAX = 24

export function nameError(name) {
  const trimmed = name.trim()
  if (!trimmed) return 'Enter the name to show on your reports.'
  if (trimmed.length > NAME_MAX) return `Keep it to ${NAME_MAX} characters or fewer.`
  return null
}

// Step 1. The name shown on reports, and the area reports are about.
export default function SetupAbout() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const user = state.currentUser
  const [name, setName] = useState(user.name === 'You' ? '' : user.name)
  const [location, setLocation] = useState(user.location)
  const [touched, setTouched] = useState(false)
  const error = nameError(name)

  const next = () => {
    actions.updateProfile({ name: name.trim(), location: location.trim() || user.location })
    navigate('/account/setup/type')
  }

  return (
    <>
      <ScreenHeader title="Set up profile" backTo="/account" />
      <div className="section stack-4">
        <StepHeader step={1} total={SETUP_STEPS} title="About you">
          This is what other diners see next to your reports.
        </StepHeader>
        <TextField
          label="Name on reports"
          placeholder="e.g. Maya R."
          value={name}
          maxLength={NAME_MAX + 10}
          hint="First name and last initial is enough."
          error={touched ? error : null}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        <TextField
          label="Home area"
          value={location}
          hint="Used to show reviewers and meals near you."
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <ActionBar note={error}>
        <Button variant="primary" block disabled={Boolean(error)} onClick={next}>
          Next
        </Button>
      </ActionBar>
    </>
  )
}
