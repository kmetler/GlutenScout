import { useId } from 'react'
import Icon from './Icon.jsx'

// Labelled text input. Errors are shown in words with an icon, never color alone.
export function TextField({ label, hint, error, ...inputProps }) {
  const id = useId()
  return (
    <div className="field">
      <label className="field__label t-meta" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="field__input t-body"
        aria-invalid={Boolean(error)}
        aria-describedby={hint || error ? `${id}-help` : undefined}
        {...inputProps}
      />
      <FieldHelp id={`${id}-help`} hint={hint} error={error} />
    </div>
  )
}

export function TextArea({ label, hint, error, value = '', maxLength, ...inputProps }) {
  const id = useId()
  const counter = maxLength ? `${value.length} / ${maxLength}` : null
  return (
    <div className="field">
      <label className="field__label t-meta" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="field__input field__input--area t-body"
        value={value}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-help`}
        {...inputProps}
      />
      <FieldHelp id={`${id}-help`} hint={hint} error={error} counter={counter} />
    </div>
  )
}

function FieldHelp({ id, hint, error, counter }) {
  if (!hint && !error && !counter) return null
  return (
    <div id={id} className="field__help t-caption">
      {error ? (
        <span className="field__error">
          <Icon name="triangle" size={14} />
          {error}
        </span>
      ) : (
        <span className="ink-secondary">{hint}</span>
      )}
      {counter && <span className="ink-secondary">{counter}</span>}
    </div>
  )
}

// Checkbox row with a 44px touch target.
export function Checkbox({ checked, onChange, children }) {
  return (
    <label className="check-row t-body">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{children}</span>
    </label>
  )
}
