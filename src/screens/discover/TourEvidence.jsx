import { ActionBar, Button, PrecautionBadge, ScreenHeader, StarRating, StepHeader } from '../../components'
import { SkipTour } from './TourWelcome.jsx'

// Tour step 2 of 3: how to read the badges people will see on every meal.
export const BADGE_EXAMPLES = [
  {
    state: 'confirmed',
    label: 'Dedicated fryer',
    meaning: 'A diner saw this happen on their visit.',
  },
  {
    state: 'conflict',
    label: 'Shared fryer?',
    meaning: 'Reports disagree. Someone saw something different, so call ahead and ask.',
  },
  {
    state: 'unverified',
    label: 'Separate wok',
    meaning: 'Only the restaurant or staff said so, or nobody has checked recently.',
  },
]

export function BadgeGuide() {
  return (
    <div>
      {BADGE_EXAMPLES.map((b) => (
        <div key={b.state} className="example-row">
          <PrecautionBadge state={b.state}>{b.label}</PrecautionBadge>
          <p className="t-body">{b.meaning}</p>
        </div>
      ))}
      <div className="example-row">
        <StarRating value={4} count={88} size={14} />
        <p className="t-body">Stars rate the food only — never gluten safety.</p>
      </div>
    </div>
  )
}

export default function TourEvidence() {
  return (
    <>
      <ScreenHeader title="Quick tour" backTo="/discover/welcome" action={<SkipTour />} />

      <div className="section stack-4">
        <StepHeader step={2} total={3} title="How to read the evidence">
          Every meal shows badges like these, plus the date it was last verified.
        </StepHeader>
        <BadgeGuide />
      </div>

      <ActionBar>
        <Button variant="primary" block to="/discover/location?tour=1">
          Next
        </Button>
      </ActionBar>
    </>
  )
}
