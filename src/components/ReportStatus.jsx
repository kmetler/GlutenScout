import Icon from './Icon.jsx'
import { MATCHES_NEEDED } from '../data/store.jsx'

// Peer-review state of a report. Reuses the PrecautionBadge styles: icon + words + color.
export default function ReportStatus({ status, matches = 0 }) {
  if (status === 'confirmed') {
    return (
      <span className="badge badge--confirmed">
        <Icon name="check" size={15} />
        Confirmed by {Math.max(matches, MATCHES_NEEDED)} verifiers
      </span>
    )
  }
  if (status === 'conflict') {
    return (
      <span className="badge badge--conflict">
        <Icon name="triangle" size={15} />
        Conflict · sent to moderation
      </span>
    )
  }
  return (
    <span className="badge badge--unverified">
      <Icon name="clock" size={15} />
      Pending · {matches} of {MATCHES_NEEDED} matches
    </span>
  )
}
