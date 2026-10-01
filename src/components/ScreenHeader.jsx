import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

// Header / back pattern for every screen below a tab root.
// `backTo` gives a fixed destination; otherwise Back returns to the previous screen.
export default function ScreenHeader({ title, back = true, backTo, action }) {
  const navigate = useNavigate()
  return (
    <header className="header">
      {back && (
        <button
          type="button"
          className="icon-btn"
          aria-label="Back"
          onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
        >
          <Icon name="back" size={22} />
        </button>
      )}
      <h1 className="header__title t-card-header">{title}</h1>
      {action}
    </header>
  )
}
