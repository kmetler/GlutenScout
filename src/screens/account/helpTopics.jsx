import { Link } from 'react-router-dom'
import { PrecautionBadge, ReportStatus, ReviewerTag } from '../../components'
import { MATCHES_NEEDED } from '../../data/store.jsx'
import { STALE_AFTER_DAYS } from './SavedMeals.jsx'
import { TYPE_DESCRIPTIONS } from './shared.jsx'

// Help topics. `keywords` widen search; `related` lists other topic ids.
export const HELP_TOPICS = [
  {
    id: 'badges',
    title: 'What do the badges mean?',
    summary: 'What the check, triangle and clock icons tell you.',
    keywords: 'confirmed conflict unverified icon fryer gloves prep',
    related: ['confirmed', 'evidence'],
    body: (
      <>
        <p>Each badge names one kitchen practice and shows how well it has been checked.</p>
        <div className="claims">
          <PrecautionBadge state="confirmed">Separate prep area</PrecautionBadge>
        </div>
        <p>
          <b>Check:</b> a diner saw this happen in the kitchen.
        </p>
        <div className="claims">
          <PrecautionBadge state="conflict">Shared fryer?</PrecautionBadge>
        </div>
        <p>
          <b>Triangle:</b> reports disagree, or a diner saw that it didn’t happen. Read the
          reports, and consider calling ahead.
        </p>
        <div className="claims">
          <PrecautionBadge state="unverified">Separate wok</PrecautionBadge>
        </div>
        <p>
          <b>Clock:</b> only the staff said so, or nobody has checked recently.
        </p>
      </>
    ),
  },
  {
    id: 'confirmed',
    title: 'How does a report get confirmed?',
    summary: `It stays pending until ${MATCHES_NEEDED} verifiers say it matches their visit.`,
    keywords: 'pending verifier match peer review dispute moderation',
    related: ['types', 'badges'],
    body: (
      <>
        <p>New reports start as pending. One person's visit isn't proof on its own.</p>
        <div className="claims">
          <ReportStatus status="pending" matches={1} />
        </div>
        <p>
          A report is confirmed when {MATCHES_NEEDED} different verifiers say it matches their
          own visit. Verifiers are Celiac or Strict GF diners.
        </p>
        <div className="claims">
          <ReportStatus status="confirmed" matches={MATCHES_NEEDED} />
        </div>
        <p>
          If anyone saw something different, the report is marked as a conflict and goes to our
          moderation team. Matches can't outvote a conflict, and both reports stay visible.
        </p>
        <div className="claims">
          <ReportStatus status="conflict" />
        </div>
        <p>
          <Link className="link" to="/contribute/review">
            Review reports
          </Link>{' '}
          ·{' '}
          <Link className="link" to="/contribute/verifier">
            Become a verifier
          </Link>
        </p>
      </>
    ),
  },
  {
    id: 'types',
    title: 'Why does every report show a reviewer type?',
    summary: 'So you know who wrote it and how strictly they avoid gluten.',
    keywords: 'celiac strict gluten-sensitive restaurant tag profile trust',
    related: ['order', 'confirmed'],
    body: (
      <>
        <p>
          People told us they weigh a report differently depending on who wrote it. Someone who
          reacts to a trace of gluten checks a kitchen more closely than someone who doesn't.
        </p>
        {Object.entries(TYPE_DESCRIPTIONS).map(([type, text]) => (
          <p key={type}>
            <ReviewerTag type={type} /> {text}
          </p>
        ))}
        <p>
          <ReviewerTag type="Restaurant" /> What the restaurant's staff said, for example on a
          call-ahead. Useful, but it isn't a diner's own observation.
        </p>
        <p>
          You choose your own type when you set up your profile.{' '}
          <Link className="link" to="/account/settings/type">
            Change reviewer type
          </Link>
        </p>
      </>
    ),
  },
  {
    id: 'order',
    title: 'Can I choose whose reports I see first?',
    summary: 'Yes. You can list Celiac and Strict GF reports first, or see only those.',
    keywords: 'sort filter order settings hide',
    related: ['types'],
    body: (
      <>
        <p>
          In Settings you can list reports from Celiac and Strict GF diners first, show only
          theirs, or sort everyone's by date.
        </p>
        <p>
          Reports you hide are still there. Conflicts are never hidden from the meal's safety
          profile, whoever raised them.
        </p>
        <p>
          <Link className="link" to="/account/settings">
            Open Settings
          </Link>
        </p>
      </>
    ),
  },
  {
    id: 'evidence',
    title: 'Why doesn’t GlutenScout give a yes-or-no answer?',
    summary: 'It shows what diners saw and when, so you can make the call.',
    keywords: 'gluten-free label trust decide recency date old',
    related: ['badges', 'calling'],
    body: (
      <>
        <p>
          A gluten-free label doesn't tell you how the dish was made. Cross-contact in the kitchen
          — a shared fryer, a cutting board, a glove — is usually the real risk.
        </p>
        <p>
          So GlutenScout shows what diners saw, when they saw it, and who they are. Every claim
          has a date, because kitchens and staff change. Saved meals are flagged when their
          evidence is more than {STALE_AFTER_DAYS} days old.
        </p>
        <p>You know your own needs best. The app gives you the evidence; you make the call.</p>
      </>
    ),
  },
  {
    id: 'calling',
    title: 'How do I call a restaurant ahead?',
    summary: 'Use a list of questions based on what’s still unclear about the meal.',
    keywords: 'phone call script ask staff questions',
    related: ['evidence'],
    body: (
      <>
        <p>
          Calling ahead is still how most people decide. The call-ahead script starts with the
          practices that are disputed or unconfirmed for that meal, so the call is short.
        </p>
        <p>You can save what staff told you as a Restaurant report for others to see.</p>
        <p>
          <Link className="link" to="/contribute/call">
            Start a call-ahead script
          </Link>
        </p>
      </>
    ),
  },
  {
    id: 'support',
    title: 'Where can I find support?',
    summary: 'See who reports on meals near you, or find a national support group.',
    keywords: 'community group help doctor dietitian diagnosis',
    related: ['types'],
    body: (
      <>
        <p>
          Community lists the reviewers near you and how they eat gluten-free. Following someone
          puts them first in that list.
        </p>
        <p>
          <Link className="link" to="/account/community">
            Open Community
          </Link>
        </p>
        <p>
          For questions about your health or diagnosis, talk to a doctor or a registered
          dietitian. National groups such as the Celiac Disease Foundation, Beyond Celiac and the
          Gluten Intolerance Group list local support groups.
        </p>
      </>
    ),
  },
  {
    id: 'prototype',
    title: 'What is this prototype?',
    summary: 'Why the data is made up, and how to reset it.',
    keywords: 'low-fidelity lo-fi test reset demo fake',
    related: [],
    body: (
      <>
        <p>
          GlutenScout is a low-fidelity student prototype. Restaurants, meals, people, reviews and
          dates are made-up examples. Please don't use anything here to decide what to eat.
        </p>
        <p>
          Your profile, saved meals and reports are kept in this browser only. To start over,
          use Reset example data at the bottom of{' '}
          <Link className="link" to="/contribute/mine">
            My reports
          </Link>
          , then Reset account data in{' '}
          <Link className="link" to="/account/settings">
            Settings
          </Link>
          .
        </p>
      </>
    ),
  },
]

export function findTopic(id) {
  return HELP_TOPICS.find((t) => t.id === id)
}
