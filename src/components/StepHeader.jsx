// "Step 2 of 5" plus a progress track, at the top of each step in a multi-step flow.
export default function StepHeader({ step, total, title, children }) {
  return (
    <div className="step">
      <p className="t-meta ink-secondary">
        Step {step} of {total}
      </p>
      <div
        className="step__track"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-label={`Step ${step} of ${total}`}
      >
        <div className="step__fill" style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <h2 className="t-section-header">{title}</h2>
      {children && <p className="t-body ink-secondary">{children}</p>}
    </div>
  )
}
