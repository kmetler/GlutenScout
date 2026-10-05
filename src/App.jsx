import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { DisclosureModal, TabBar } from './components'
import Home from './screens/Home.jsx'
import SectionPlaceholder from './screens/SectionPlaceholder.jsx'
import StyleGuide from './screens/StyleGuide.jsx'
import ContributeRoutes from './screens/contribute/index.jsx'
import { SECTIONS } from './screens/sections.js'
import { readStored, writeStored } from './data/storage.js'

const DISCLOSURE_KEY = 'gs-disclosure-seen'
const THEME_KEY = 'gs-theme'

// Sections that are built. Owners: add yours here; the rest show SectionPlaceholder.
const SECTION_SCREENS = {
  '/contribute': <ContributeRoutes />,
}

export default function App() {
  const [showDisclosure, setShowDisclosure] = useState(() => !readStored(DISCLOSURE_KEY))
  const screenRef = useRef(null)
  const { pathname } = useLocation()

  // Each screen starts at the top.
  useEffect(() => {
    screenRef.current?.scrollTo(0, 0)
  }, [pathname])

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
      <main className="app__screen" ref={screenRef}>
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
          <Route path="/styleguide" element={<StyleGuide />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <TabBar />
      {showDisclosure && <DisclosureModal onClose={closeDisclosure} />}
    </div>
  )
}
