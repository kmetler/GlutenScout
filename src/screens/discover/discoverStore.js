import { useSyncExternalStore } from 'react'
import { readStored, removeStored, writeStored } from '../../data/storage.js'

// Section A's own saved state: location, sort, filters, tour and recent searches.
// Same pattern as Account's accountStore.js — no provider, no edits to the shared store.

const STORAGE_KEY = 'gs-discover-v1'

export const NO_FILTERS = {
  maxMiles: null, // 1 | 2 | 5 | null (any)
  verifiedWithin: null, // 30 | 90 | null (any)
  practices: [], // practice keys that must be confirmed by diners
}

const DEFAULTS = {
  location: 'Provo, UT',
  sort: 'evidence', // 'evidence' | 'recent' | 'distance'
  filters: NO_FILTERS,
  tourDone: false,
  recent: [], // recent search terms, newest first
}

function load() {
  try {
    const raw = readStored(STORAGE_KEY)
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

let discover = load()
const listeners = new Set()

function update(patch) {
  discover = { ...discover, ...patch }
  writeStored(STORAGE_KEY, JSON.stringify(discover))
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const discoverActions = {
  setLocation: (location) => update({ location }),
  setSort: (sort) => update({ sort }),
  setFilters: (filters) => update({ filters }),
  patchFilters: (patch) => update({ filters: { ...discover.filters, ...patch } }),
  clearFilters: () => update({ filters: NO_FILTERS }),
  finishTour: () => update({ tourDone: true }),
  restartTour: () => update({ tourDone: false }),
  addRecent: (term) => {
    const clean = term.trim()
    if (!clean) return
    const rest = discover.recent.filter((t) => t.toLowerCase() !== clean.toLowerCase())
    update({ recent: [clean, ...rest].slice(0, 5) })
  },
  clearRecent: () => update({ recent: [] }),
  reset: () => {
    removeStored(STORAGE_KEY)
    discover = DEFAULTS
    listeners.forEach((listener) => listener())
  },
}

export function useDiscover() {
  const value = useSyncExternalStore(subscribe, () => discover)
  return { discover: value, ...discoverActions }
}
