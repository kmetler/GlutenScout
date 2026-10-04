import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { findMeal, reports as seedReports, votes as seedVotes } from './sample.js'
import { claimsFromAnswers, PRACTICES } from './practices.js'
import { formatISO, todayISO } from './dates.js'
import { readStored, removeStored, writeStored } from './storage.js'

// Shared app state, saved in this browser so test sessions survive a reload.
// Read and write it with useStore() — don't keep separate copies in screens.
// Full behavior: docs/contribute-verify.md

const STORAGE_KEY = 'gs-store-v1'

export const VERIFIER_TYPES = ['Celiac', 'Strict GF']
export const MATCHES_NEEDED = 2

// Peer-review rule:
// - Any dispute → 'conflict' (sent to the moderation team). A risk someone saw is never outvoted.
// - Otherwise 2+ "Matches my visit" votes from different Celiac or Strict GF verifiers → 'confirmed'.
// - Otherwise → 'pending'. Matches from anyone else are recorded but don't count.
export function reportStatus(reportVotes = []) {
  const matches = new Set(
    reportVotes
      .filter((v) => v.kind === 'match' && v.verifier && VERIFIER_TYPES.includes(v.reviewerType))
      .map((v) => v.by),
  ).size
  if (reportVotes.some((v) => v.kind === 'dispute')) return { status: 'conflict', matches }
  return { status: matches >= MATCHES_NEEDED ? 'confirmed' : 'pending', matches }
}

function initialState() {
  return {
    currentUser: { name: 'You', location: 'Provo, UT', reviewerType: 'Celiac', isVerifier: false },
    reports: seedReports,
    votes: seedVotes,
    draft: null,
    calls: {},
  }
}

function load() {
  const raw = readStored(STORAGE_KEY)
  if (!raw) return initialState()
  try {
    return { ...initialState(), ...JSON.parse(raw) }
  } catch {
    return initialState()
  }
}

export function newDraft(mealId, reviewerType) {
  return { mealId, practices: {}, visitDate: todayISO(), reviewerType, rating: null, notes: '' }
}

function myReportCount(state) {
  return state.reports.filter((r) => r.author === 'me').length + 1
}

function reducer(state, action) {
  switch (action.type) {
    case 'startDraft':
      return { ...state, draft: newDraft(action.mealId, state.currentUser.reviewerType) }
    case 'updateDraft':
      return { ...state, draft: { ...state.draft, ...action.patch } }
    case 'discardDraft':
      return { ...state, draft: null }
    case 'submitDraft': {
      const d = state.draft
      const report = {
        id: action.id,
        mealId: d.mealId,
        author: 'me',
        source: 'visit',
        name: state.currentUser.name,
        reviewerType: d.reviewerType,
        location: state.currentUser.location,
        reportCount: myReportCount(state),
        date: formatISO(d.visitDate),
        rating: d.rating,
        body: d.notes.trim(),
        claims: claimsFromAnswers(d.practices, 'visit'),
      }
      return {
        ...state,
        reports: [report, ...state.reports],
        // Your reviewer type is part of your profile, so the latest choice sticks.
        currentUser: { ...state.currentUser, reviewerType: d.reviewerType },
        draft: null,
      }
    }
    case 'setCallAnswer': {
      const answers = { ...state.calls[action.mealId], [action.key]: action.value }
      return { ...state, calls: { ...state.calls, [action.mealId]: answers } }
    }
    case 'submitCall': {
      const meal = findMeal(action.mealId)
      const answers = state.calls[action.mealId] ?? {}
      const today = formatISO(todayISO())
      const report = {
        id: action.id,
        mealId: action.mealId,
        author: 'me',
        source: 'phone',
        name: `${meal.restaurant} (by phone)`,
        reviewerType: 'Restaurant',
        location: `Called by ${state.currentUser.name}`,
        reportCount: myReportCount(state),
        date: today,
        rating: null,
        body: `What staff said when I called on ${today}.${
          answers.available === 'no' ? ' The meal was not available gluten-free that day.' : ''
        }`,
        claims: claimsFromAnswers(
          Object.fromEntries(Object.entries(answers).filter(([key]) => PRACTICES[key])),
          'phone',
        ),
      }
      const calls = { ...state.calls }
      delete calls[action.mealId]
      return { ...state, reports: [report, ...state.reports], calls }
    }
    case 'vote': {
      const others = (state.votes[action.reportId] ?? []).filter((v) => v.by !== 'me')
      const vote = {
        by: 'me',
        name: state.currentUser.name,
        reviewerType: state.currentUser.reviewerType,
        verifier: state.currentUser.isVerifier,
        kind: action.kind,
        claims: action.claims,
        note: action.note,
        date: formatISO(action.date ?? todayISO()),
      }
      return { ...state, votes: { ...state.votes, [action.reportId]: [...others, vote] } }
    }
    case 'unvote': {
      const others = (state.votes[action.reportId] ?? []).filter((v) => v.by !== 'me')
      return { ...state, votes: { ...state.votes, [action.reportId]: others } }
    }
    case 'setReviewerType':
      return { ...state, currentUser: { ...state.currentUser, reviewerType: action.reviewerType } }
    case 'becomeVerifier':
      return { ...state, currentUser: { ...state.currentUser, isVerifier: true } }
    case 'resetDemo':
      return initialState()
    default:
      return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    writeStored(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const actions = useMemo(
    () => ({
      startDraft: (mealId) => dispatch({ type: 'startDraft', mealId }),
      updateDraft: (patch) => dispatch({ type: 'updateDraft', patch }),
      discardDraft: () => dispatch({ type: 'discardDraft' }),
      // Returns the new report's id.
      submitDraft: () => {
        const id = `me-${Date.now()}`
        dispatch({ type: 'submitDraft', id })
        return id
      },
      setCallAnswer: (mealId, key, value) => dispatch({ type: 'setCallAnswer', mealId, key, value }),
      submitCall: (mealId) => {
        const id = `me-${Date.now()}`
        dispatch({ type: 'submitCall', id, mealId })
        return id
      },
      vote: (reportId, kind, details = {}) => dispatch({ type: 'vote', reportId, kind, ...details }),
      unvote: (reportId) => dispatch({ type: 'unvote', reportId }),
      setReviewerType: (reviewerType) => dispatch({ type: 'setReviewerType', reviewerType }),
      becomeVerifier: () => dispatch({ type: 'becomeVerifier' }),
      resetDemo: () => {
        removeStored(STORAGE_KEY)
        dispatch({ type: 'resetDemo' })
      },
    }),
    [],
  )

  const value = useMemo(() => {
    const statusOf = (report) => reportStatus(state.votes[report.id])
    const findReport = (id) => state.reports.find((r) => r.id === id)
    return { state, actions, statusOf, findReport }
  }, [state, actions])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useStore must be used inside <StoreProvider>')
  return value
}
