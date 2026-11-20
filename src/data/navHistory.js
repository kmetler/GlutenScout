import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// Remembers which path sits at each position in the browser history, so Back can tell whether
// the screen it wants to return to is really the previous entry. React Router keeps the
// position in `window.history.state.idx`.
const STORE_KEY = 'gs-nav-history'

let entries = {}
try {
  entries = JSON.parse(sessionStorage.getItem(STORE_KEY)) ?? {}
} catch {
  entries = {}
}

const currentIdx = () => window.history.state?.idx ?? 0

export function recordEntry(path) {
  entries[currentIdx()] = path
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(entries))
  } catch {
    // Storage blocked: Back still works, it just can't look past a reload.
  }
}

const normalize = (path) => (path ?? '').split(/[?#]/)[0].replace(/\/+$/, '') || '/'

// True when the previous history entry is `path` (ignoring query string and trailing slash).
export function previousEntryIs(path) {
  const idx = currentIdx()
  return idx > 0 && normalize(entries[idx - 1]) === normalize(path)
}

// A one-time message for the screen we return to (e.g. "Name saved."), since stepping back in
// history can't carry router state.
let flash = null
export const setFlash = (message) => {
  flash = message
}
export const peekFlash = () => flash
export const clearFlash = () => {
  flash = null
}

// Return to `path`: a real Back when it's the previous screen, otherwise replace this screen.
// Use it for Back buttons and for "done" actions (Save, Apply, Skip) that return to a parent,
// so they never stack a duplicate screen that Back would bounce between.
export function useGoBackTo() {
  const navigate = useNavigate()
  return useCallback(
    (path, { message } = {}) => {
      if (message) setFlash(message)
      if (previousEntryIs(path)) navigate(-1)
      else navigate(path, { replace: true })
    },
    [navigate],
  )
}
