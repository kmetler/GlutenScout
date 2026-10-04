// Sticky bottom area holding the screen's main action, so it's always in reach.
// Put the single primary button here; `note` explains why it's disabled, if it is.
export default function ActionBar({ note, children }) {
  return (
    <div className="action-bar">
      {note && <p className="action-bar__note t-caption ink-secondary">{note}</p>}
      <div className="action-bar__buttons">{children}</div>
    </div>
  )
}
