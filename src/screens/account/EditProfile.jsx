import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionBar, Button, ScreenHeader, TextField } from '../../components'
import { useStore } from '../../data/store.jsx'
import { NAME_MAX, nameError } from './SetupAbout.jsx'

export default function EditProfile() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const user = state.currentUser
  const [name, setName] = useState(user.name === 'You' ? '' : user.name)
  const [location, setLocation] = useState(user.location)
  const error = nameError(name)
  const changed = name.trim() !== user.name || location.trim() !== user.location

  const save = () => {
    actions.updateProfile({ name: name.trim(), location: location.trim() || user.location })
    navigate('/account/settings', { state: { saved: 'Name and home area saved.' } })
  }

  return (
    <>
      <ScreenHeader title="Name and home area" backTo="/account/settings" />
      <div className="section stack-4">
        <TextField
          label="Name on reports"
          placeholder="e.g. Maya R."
          value={name}
          maxLength={NAME_MAX + 10}
          hint="First name and last initial is enough."
          error={error}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Home area"
          value={location}
          hint="Used to show reviewers and meals near you."
          onChange={(e) => setLocation(e.target.value)}
        />
        <p className="t-caption ink-secondary">
          Reports you've already written keep the name they were posted with.
        </p>
      </div>
      <ActionBar note={error ?? (changed ? null : 'Nothing has changed yet.')}>
        <Button variant="primary" block disabled={Boolean(error) || !changed} onClick={save}>
          Save changes
        </Button>
      </ActionBar>
    </>
  )
}
