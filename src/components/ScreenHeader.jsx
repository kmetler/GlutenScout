import { useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

// Header / back pattern for every screen below a tab root.
// `backTo` gives a fixed destination (use it in step-by-step flows).
// `fallbackTo` returns the way you came — for screens reachable from many places — and is only
// used when there's nothing to go back to (e.g. the screen was opened from a link).
// With neither, Back returns to the previous screen.
export default function ScreenHeader({ title, back = true, backTo, fallbackTo, action }) {
  const navigate = useNavigate()
  const location = useLocation()
  const goBack = () => {
    if (backTo) navigate(backTo)
    else if (fallbackTo && location.key === 'default') navigate(fallbackTo)
    else navigate(-1)
  }
  return (
    <header className="header">
      {back && (
        <button type="button" className="icon-btn" aria-label="Back" onClick={goBack}>
          <Icon name="back" size={22} />
        </button>
      )}
      <h1 className="header__title t-card-header">{title}</h1>
      {action}
    </header>
  )
}
