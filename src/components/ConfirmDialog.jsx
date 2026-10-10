import { useEffect, useRef } from 'react'
import Button from './Button.jsx'

// Yes / no check before something is removed or deleted (error prevention).
// Same look as the disclosure modal. Focus starts on the safe choice; Escape cancels.
export default function ConfirmDialog({
  title,
  children,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null)
  const onCancelRef = useRef(onCancel)
  onCancelRef.current = onCancel

  useEffect(() => {
    cancelRef.current?.focus()
    const onKey = (event) => event.key === 'Escape' && onCancelRef.current()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="modal-scrim">
      <div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title" className="t-section-header">
          {title}
        </h2>
        {children && <div className="t-body">{children}</div>}
        <div className="modal__action stack-2">
          <Button variant="primary" block onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button ref={cancelRef} block onClick={onCancel}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
