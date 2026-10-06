import { Link } from 'react-router-dom'
import { Icon, Notice, ReviewerTag } from '../../components'
import { REVIEWER_TYPES } from '../../data/practices.js'
import { VERIFIER_TYPES } from '../../data/store.jsx'

export const SETUP_STEPS = 3

// Matches only count from Celiac / Strict GF verifiers (reportStatus in store.jsx), so a
// verifier who changes to another type is shown as not verifying.
export function isActiveVerifier(user) {
  return user.isVerifier && VERIFIER_TYPES.includes(user.reviewerType)
}

// Plain-English meaning of each reviewer type, shown wherever someone picks one.
export const TYPE_DESCRIPTIONS = {
  Celiac: 'You have celiac disease. Even a trace of gluten from shared equipment matters to you.',
  'Strict GF':
    "You don't have a celiac diagnosis, but you avoid even trace amounts of gluten, so shared equipment matters to you too.",
  'Gluten-sensitive':
    'Gluten bothers you, but small amounts from shared equipment usually don’t.',
}

// Whose reports come first. Pyper didn't trust reports from people without celiac disease,
// so diners can put the strictest reviewers first, or hide everyone else.
export const REPORT_ORDERS = [
  {
    value: 'strict-first',
    label: 'Celiac and Strict GF first',
    detail: 'Everyone’s reports are shown; reports from the strictest diners come first.',
  },
  {
    value: 'strict-only',
    label: 'Only Celiac and Strict GF',
    detail: 'Hide reports from gluten-sensitive diners.',
  },
  {
    value: 'newest',
    label: 'Newest first, everyone',
    detail: 'Sort by visit date only, whoever wrote it.',
  },
]

export function reportOrderLabel(value) {
  return REPORT_ORDERS.find((o) => o.value === value)?.label ?? REPORT_ORDERS[0].label
}

// Applies the report-order setting to anything with a reviewerType.
// Other sections can use this too, e.g. Meal detail's list of reports.
export function applyReportOrder(items, order) {
  const strict = (item) => VERIFIER_TYPES.includes(item.reviewerType)
  if (order === 'strict-only') return items.filter(strict)
  if (order === 'newest') return items
  return [...items.filter(strict), ...items.filter((item) => !strict(item))]
}

// Radio list with a description under each option. Reuses the Checkbox row styles.
function ChoiceList({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="fieldset-plain">
      <legend className="visually-hidden">{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className="check-row">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="stack-2">
            <span className="choice__title t-card-header">{option.label}</span>
            <span className="choice__detail t-body ink-secondary">{option.detail}</span>
          </span>
        </label>
      ))}
    </fieldset>
  )
}

export function ReviewerTypePicker({ value, onChange }) {
  return (
    <ChoiceList
      legend="Reviewer type"
      name="reviewer-type"
      value={value}
      onChange={onChange}
      options={REVIEWER_TYPES.map((type) => ({
        value: type,
        label: type,
        detail: TYPE_DESCRIPTIONS[type],
      }))}
    />
  )
}

export function ReportOrderPicker({ value, onChange }) {
  return (
    <ChoiceList
      legend="Whose reports come first"
      name="report-order"
      value={value}
      onChange={onChange}
      options={REPORT_ORDERS}
    />
  )
}

// Explains what happens before a reviewer-type change is saved (error prevention).
export function TypeChangeNotice({ currentUser, nextType }) {
  if (!nextType || nextType === currentUser.reviewerType) return null
  const losesVerifier = isActiveVerifier(currentUser) && !VERIFIER_TYPES.includes(nextType)
  return (
    <Notice icon={losesVerifier ? 'triangle' : 'info'}>
      <div className="stack-2">
      {losesVerifier && (
        <p>
          <b>Your matches will stop counting.</b> Only Celiac and Strict GF verifiers confirm
          reports, so while your type is {nextType}, “Matches my visit” is recorded but doesn't
          count.
        </p>
      )}
      <p>Reports you've already written keep the type you had when you wrote them.</p>
      </div>
    </Notice>
  )
}

export function initials(name) {
  return name
    .split(' ')
    .filter((part) => /^[A-Za-z]/.test(part))
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// Avatar, name, reviewer type and location: top of Account and of a reviewer's profile.
export function PersonHeader({ name, reviewerType, detail, isVerifier }) {
  return (
    <div className="person">
      <div className="avatar" aria-hidden="true">
        {initials(name) || '?'}
      </div>
      <div className="grow stack-2">
        <p className="t-business-name">
          {name}
          {reviewerType && <ReviewerTag type={reviewerType} />}
        </p>
        {detail && <p className="t-meta ink-secondary">{detail}</p>}
        {isVerifier && (
          <p className="verifier-line t-meta">
            <Icon name="check" size={15} />
            Verifier · matches count toward confirming reports
          </p>
        )}
      </div>
    </div>
  )
}

export function ChangeTypeLink() {
  return (
    <Link className="link" to="/account/settings/type">
      Change reviewer type
    </Link>
  )
}
