import { useNavigate } from 'react-router-dom'
import { ActionBar, Button, Icon, ScreenHeader, StepHeader } from '../../components'
import { useDiscover } from './discoverStore.js'

// Tour step 1 of 3. Optional: offered on Discover, skippable on every step.
export function SkipTour() {
  const navigate = useNavigate()
  const { finishTour } = useDiscover()
  return (
    <button
      type="button"
      className="text-btn"
      onClick={() => {
        finishTour()
        navigate('/discover')
      }}
    >
      Skip
    </button>
  )
}

export default function TourWelcome() {
  return (
    <>
      <ScreenHeader title="Quick tour" backTo="/discover" action={<SkipTour />} />

      <div className="section stack-4">
        <StepHeader step={1} total={3} title="Rate meals, not restaurants">
          A restaurant can handle one dish carefully and another not. GlutenScout shows evidence
          for each dish on its own.
        </StepHeader>
        <div className="tour-art" aria-hidden="true">
          <Icon name="meal" size={40} />
        </div>
        <ul className="list-plain t-body stack-2">
          <li>
            <b>See how it was made</b> — the dedicated fryer, the glove change, the separate prep
            area.
          </li>
          <li>
            <b>See when</b> — every claim has a “last verified” date.
          </li>
          <li>
            <b>See who</b> — every report shows whether the reviewer is Celiac, Strict GF or
            Gluten-sensitive.
          </li>
        </ul>
        <p className="t-body ink-secondary">
          We never call a meal “safe”. We show the evidence, and you decide.
        </p>
      </div>

      <ActionBar>
        <Button variant="primary" block to="/discover/welcome/evidence">
          Next
        </Button>
      </ActionBar>
    </>
  )
}
