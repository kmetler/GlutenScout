import { useEffect, useRef } from 'react'
import Button from './Button.jsx'

// Lo-fi disclosure: shown once on first load, reopened from the notice on Home.
export default function DisclosureModal({ onClose }) {
  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current?.focus()
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-scrim">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="disclosure-title">
        <h2 id="disclosure-title" className="t-section-header">
          This is a low-fidelity prototype
        </h2>
        <p className="t-body">
          GlutenScout is a student research project, not a finished app. We built this rough
          version to test whether the idea works before we polish how it looks.
        </p>
        <ul className="modal__list t-body">
          <li>Restaurants, meals, reviews and dates are made-up examples.</li>
          <li>Photos are gray boxes and some buttons don't do anything yet.</li>
          <li>Please don't use anything here to decide what to eat.</li>
        </ul>
        <div className="notice t-body">
          <div className="stack-2">
            <p>
              <b>Your goal:</b> you eat gluten-free and want dinner out tonight. Find a meal near
              you, check how it was verified, and decide whether to call ahead first.
            </p>
            <p className="ink-secondary">
              There's more than one way to get there — Home, search or the tabs. The tour is
              optional.
            </p>
          </div>
        </div>
        <p className="t-body">Tap around freely — you can't break anything.</p>
        <div className="modal__action">
          <Button ref={buttonRef} variant="primary" block onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  )
}
