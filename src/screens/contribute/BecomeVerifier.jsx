import { useState } from 'react'
import {
  ActionBar,
  Button,
  Checkbox,
  FilterChip,
  FilterChips,
  Icon,
  Notice,
  ScreenHeader,
} from '../../components'
import { REVIEWER_TYPES } from '../../data/practices.js'
import { MATCHES_NEEDED, useStore, VERIFIER_TYPES } from '../../data/store.jsx'

const GUIDELINES = [
  'Only report what you saw or were told on your own visit.',
  'Put the real date on every visit.',
  'Describe what happened — never call a meal "safe".',
  'Flag disagreements instead of guessing.',
]

export default function BecomeVerifier() {
  const { state, actions } = useStore()
  const [agreed, setAgreed] = useState(false)
  const { reviewerType, isVerifier } = state.currentUser
  const eligible = VERIFIER_TYPES.includes(reviewerType)

  if (isVerifier) {
    return (
      <>
        <ScreenHeader title="Verifier" backTo="/contribute" />
        <div className="section stack-3">
          <h2 className="success-title t-section-header">
            <Icon name="check" size={22} />
            You're a verifier
          </h2>
          <p className="t-body">
            When you tap “Matches my visit”, it now counts toward confirming a report. It takes{' '}
            {MATCHES_NEEDED} verifier matches to confirm one.
          </p>
          <Button variant="primary" block to="/contribute/review">
            Review reports
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <ScreenHeader title="Become a verifier" backTo="/contribute" />
      <div className="section stack-3">
        <h2 className="t-section-header">Help confirm reports</h2>
        <p className="t-body">
          Verifiers compare other people's reports with their own visits. A report is confirmed
          when {MATCHES_NEEDED} verifiers say it matches.
        </p>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-card-header">1. How do you eat gluten-free?</h2>
        <FilterChips label="Reviewer type" wrap>
          {REVIEWER_TYPES.map((type) => (
            <FilterChip
              key={type}
              selected={reviewerType === type}
              onClick={() => actions.setReviewerType(type)}
            >
              {type}
            </FilterChip>
          ))}
        </FilterChips>
        {!eligible && (
          <Notice>
            Verifiers are celiac or strict gluten-free diners, because they check kitchens most
            closely. You can still write reports and flag conflicts.
          </Notice>
        )}
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-card-header">2. Agree to the guidelines</h2>
        <ul className="list-plain t-body stack-2">
          {GUIDELINES.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <Checkbox checked={agreed} onChange={setAgreed}>
          I'll follow these guidelines.
        </Checkbox>
      </div>

      <ActionBar
        note={
          !eligible
            ? 'Choose Celiac or Strict GF to continue.'
            : !agreed
              ? 'Tick the box to agree to the guidelines.'
              : null
        }
      >
        <Button
          variant="primary"
          block
          disabled={!eligible || !agreed}
          onClick={actions.becomeVerifier}
        >
          Become a verifier
        </Button>
      </ActionBar>
    </>
  )
}
