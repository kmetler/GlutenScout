import { useState } from 'react'
import {
  Button,
  GhostButton,
  FilterChip,
  FilterChips,
  MealCard,
  PrecautionBadge,
  ReviewCard,
  SafetyProfile,
  ScreenHeader,
  StarRating,
} from '../components'
import { meals, reports } from '../data/sample.js'

const CHIPS = ['Celiac reports', 'Dedicated fryer', 'Within 2 mi', 'Verified this month']

// Team reference: every shared component with example data. Not part of the user-facing flow.
export default function StyleGuide() {
  const [selected, setSelected] = useState(['Celiac reports'])
  const [saved, setSaved] = useState(false)
  const meal = meals[0]

  const toggleChip = (chip) =>
    setSelected((list) => (list.includes(chip) ? list.filter((c) => c !== chip) : [...list, chip]))

  return (
    <>
      <ScreenHeader title="Component reference" backTo="/" />

      <div className="section stack-3">
        <h2 className="t-section-header">Buttons</h2>
        <div className="row row--wrap">
          <Button variant="primary">Write a report</Button>
          <Button variant="primary" disabled>
            Submit report
          </Button>
          <Button>Call ahead</Button>
        </div>
        <div className="row">
          <GhostButton
            icon="bookmark"
            label={saved ? 'Saved' : 'Save'}
            selected={saved}
            onClick={() => setSaved(!saved)}
          />
          <GhostButton icon="share" label="Share" />
          <GhostButton icon="directions" label="Directions" />
        </div>
        <p className="t-caption ink-secondary">
          One green button per screen. This page shows two only as a reference.
        </p>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-section-header">Precaution badges</h2>
        <div className="row row--wrap">
          <PrecautionBadge state="confirmed">Separate prep area</PrecautionBadge>
          <PrecautionBadge state="conflict">Shared fryer?</PrecautionBadge>
          <PrecautionBadge state="unverified">Dedicated toaster</PrecautionBadge>
        </div>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-section-header">Filter chips</h2>
        <FilterChips>
          {CHIPS.map((chip) => (
            <FilterChip key={chip} selected={selected.includes(chip)} onClick={() => toggleChip(chip)}>
              {chip}
            </FilterChip>
          ))}
        </FilterChips>
      </div>

      <div className="band" />

      <div className="section stack-3">
        <h2 className="t-section-header">Star rating</h2>
        <div>
          <StarRating value={4.5} count={3812} size={18} />
        </div>
        <div>
          <StarRating value={3} count={214} size={14} />
        </div>
      </div>

      <div className="band" />

      <div className="section">
        <SafetyProfile
          lastVerified={meal.lastVerified}
          precautions={meal.precautions}
          sources={meal.sources}
          conflictNote={meal.conflictNote}
        />
      </div>

      <div className="band" />

      <div className="section">
        <h2 className="t-section-header">Meal cards</h2>
        {meals.map((m) => (
          <MealCard key={m.id} meal={m} />
        ))}
      </div>

      <div className="band" />

      <div className="section">
        <h2 className="t-section-header">Reports</h2>
        {reports.map((r) => (
          <ReviewCard
            key={r.id}
            name={r.name}
            reviewerType={r.reviewerType}
            location={r.location}
            reportCount={r.reportCount}
            date={r.date}
            rating={r.rating}
          >
            {r.body}
          </ReviewCard>
        ))}
      </div>

      <div className="band" />

      <div className="section stack-2">
        <h2 className="t-section-header">Type scale</h2>
        <p className="t-screen-title">Screen title</p>
        <p className="t-business-name">Business name</p>
        <p className="t-section-header">Section header</p>
        <p className="t-card-header">Card header</p>
        <p className="t-emphasis">Emphasis</p>
        <p className="t-body">Body — review text, never bold.</p>
        <p className="t-meta ink-secondary">Meta · dates, locations, counts</p>
        <p className="t-caption ink-secondary">Caption · peer-review actions</p>
      </div>
    </>
  )
}
