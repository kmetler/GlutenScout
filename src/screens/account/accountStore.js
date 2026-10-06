import { useSyncExternalStore } from 'react'
import { readStored, removeStored, writeStored } from '../../data/storage.js'

// Section D's own saved state: report order, alerts, saved meals and follows.
// Kept separate from the shared store (src/data/store.jsx) so this section doesn't edit it.
// No provider needed: any screen in any section can call useAccount().
// Reviewer type, verifier status, name and location still come from useStore().

const STORAGE_KEY = 'gs-account-v1'

const DEFAULTS = {
  reportOrder: 'strict-first', // 'strict-first' | 'strict-only' | 'newest'
  alerts: { savedReports: true, savedConflicts: true, following: false },
  saved: ['gf-burger', 'rice-bowl'], // meal ids
  following: [], // reviewer ids from ./data.js
}

function load() {
  try {
    const raw = readStored(STORAGE_KEY)
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

let account = load()
const listeners = new Set()

function update(patch) {
  account = { ...account, ...patch }
  writeStored(STORAGE_KEY, JSON.stringify(account))
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const toggle = (list, id) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])

export const accountActions = {
  setReportOrder: (reportOrder) => update({ reportOrder }),
  setAlert: (key, on) => update({ alerts: { ...account.alerts, [key]: on } }),
  toggleSaved: (mealId) => update({ saved: toggle(account.saved, mealId) }),
  toggleFollow: (reviewerId) => update({ following: toggle(account.following, reviewerId) }),
  reset: () => {
    removeStored(STORAGE_KEY)
    account = DEFAULTS
    listeners.forEach((listener) => listener())
  },
}

export function useAccount() {
  const value = useSyncExternalStore(subscribe, () => account)
  return { account: value, ...accountActions }
}
