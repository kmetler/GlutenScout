import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Icon, Notice, ScreenHeader, StepHeader, TextField } from '../../components'
import { useDiscover } from './discoverStore.js'

const AREAS = [
  'Provo, UT',
  'Orem, UT',
  'Lehi, UT',
  'Springville, UT',
  'American Fork, UT',
  'Salt Lake City, UT',
]

// Set the area to search near. Also step 3 of the tour (?tour=1).
export default function Location() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const inTour = params.get('tour') === '1'
  const { discover, setLocation, finishTour } = useDiscover()
  const [text, setText] = useState('')
  const q = text.trim().toLowerCase()
  const matches = AREAS.filter((a) => a.toLowerCase().includes(q))

  const choose = (area) => {
    setLocation(area)
    if (inTour) finishTour()
    navigate('/discover')
  }

  return (
    <>
      <ScreenHeader
        title={inTour ? 'Quick tour' : 'Location'}
        backTo={inTour ? '/discover/welcome/evidence' : '/discover'}
        action={
          inTour && (
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
      />

      <div className="section stack-4">
        {inTour ? (
          <StepHeader step={3} total={3} title="Where are you eating?">
            We’ll show meals near this area. You can change it any time from Discover.
          </StepHeader>
        ) : (
          <h2 className="t-section-header">Where are you eating?</h2>
        )}

        <p className="row t-meta">
          <Icon name="directions" size={16} />
          <span>
            Now: <b>{discover.location}</b>
          </span>
        </p>

        <Button block onClick={() => choose('Provo, UT')}>
          <Icon name="directions" />
          Use my current location
        </Button>

        <TextField
          label="Or type a city"
          placeholder="e.g. Orem"
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={q && matches.length === 0 ? 'No matching area in this prototype. Try Provo or Orem.' : undefined}
        />

        <div role="list" aria-label="Areas">
          {matches.map((area) => (
            <button
              key={area}
              type="button"
              role="listitem"
              className="list-row list-row--button"
              aria-current={area === discover.location ? 'true' : undefined}
              onClick={() => choose(area)}
            >
              <span className="list-row__main">
                <span className="list-row__title t-card-header">{area}</span>
              </span>
              {area === discover.location && (
                <span className="list-row__icon">
                  <Icon name="check" />
                  <span className="visually-hidden">Current</span>
                </span>
              )}
            </button>
          ))}
        </div>

        <Notice>
          Prototype note: the example meals and distances are the same whichever area you pick.
        </Notice>
      </div>
    </>
  )
}
