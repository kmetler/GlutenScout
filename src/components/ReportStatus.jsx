import Icon from './Icon.jsx'
import { MATCHES_NEEDED } from '../data/store.jsx'
import { NAMES_TYPES, typeBreakdown } from '../data/variant.js'

// Peer-review state of a report. Reuses the PrecautionBadge styles: icon + words + color.
// matchVotes (from statusOf) lets version B of the "Who verified it" test name the verifiers'
// types: "Confirmed by 1 celiac and 1 strict GF verifier".
export default function ReportStatus({ status, matches = 0, matchVotes = [] }) {
  if (status === 'confirmed') {
    const who = NAMES_TYPES && matchVotes.length ? typeBreakdown(matchVotes) : Math.max(matches, MATCHES_NEEDED)
    return (
      <span className="badge badge--confirmed">
        <Icon name="check" size={15} />
        Confirmed by {who} verifiers
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
