import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { DisclosureModal, TabBar } from './components'
import Home from './screens/Home.jsx'
import SectionPlaceholder from './screens/SectionPlaceholder.jsx'
import StyleGuide from './screens/StyleGuide.jsx'
import DiscoverRoutes from './screens/discover/index.jsx'
import MealRoutes from './screens/meals/index.jsx'
import ContributeRoutes from './screens/contribute/index.jsx'
import AccountRoutes from './screens/account/index.jsx'
import MyMeals from './screens/account/MyMeals.jsx'
import { SECTIONS } from './screens/sections.js'
import { readStored, writeStored } from './data/storage.js'

const DISCLOSURE_KEY = 'gs-disclosure-seen'
const THEME_KEY = 'gs-theme'

// Sections that are built. Owners: add yours here; the rest show SectionPlaceholder.
const SECTION_SCREENS = {
  '/discover': <DiscoverRoutes />,
  '/meals': <MealRoutes />,
  '/contribute': <ContributeRoutes />,
  '/account': <AccountRoutes />,
}

export default function App() {
  const [showDisclosure, setShowDisclosure] = useState(() => !readStored(DISCLOSURE_KEY))
  const screenRef = useRef(null)
  const { pathname, key } = useLocation()
  const navType = useNavigationType()
  const scrollByEntry = useRef({})

  // A new screen starts at the top; going Back returns to where you were on that screen
  // (testers lost their place in long lists and reviews after opening a profile or practice).
  useLayoutEffect(() => {
    const saved = scrollByEntry.current[key]
    screenRef.current?.scrollTo(0, navType === 'POP' && saved != null ? saved : 0)
  }, [key, navType])

  const closeDisclosure = useCallback(() => {
    writeStored(DISCLOSURE_KEY, '1')
    setShowDisclosure(false)
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
    const next = isDark ? 'light' : 'dark'
    root.dataset.theme = next
    writeStored(THEME_KEY, next)
  }

  return (
    <div className="app">
      {/* Keyed by path so each new screen plays the short enter animation (timely feedback). */}
      <main
        key={pathname}
        className="app__screen"
        ref={screenRef}
        onScroll={(e) => {
          scrollByEntry.current[key] = e.currentTarget.scrollTop
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home onShowDisclosure={() => setShowDisclosure(true)} onToggleTheme={toggleTheme} />
            }
          />
          {SECTIONS.map((section) => (
            <Route
              key={section.to}
              path={`${section.to}/*`}
              element={SECTION_SCREENS[section.to] ?? <SectionPlaceholder section={section} />}
            />
          ))}
          <Route path="/my-meals" element={<MyMeals />} />
          <Route path="/styleguide" element={<StyleGuide />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <TabBar />
      {showDisclosure && <DisclosureModal onClose={closeDisclosure} />}
    </div>
  )
}
