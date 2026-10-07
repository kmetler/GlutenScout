import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ActionBar, Button, FilterChip, FilterChips, ScreenHeader } from '../../components'
import { REVIEWER_TYPES } from '../../data/practices.js'
import { useAccount } from '../account/accountStore.js'
import { applyReportOrder, reportOrderLabel } from '../account/shared.jsx'
import { ReportItem, useMeal } from './shared.jsx'

const ALL = 'All'
const TYPES = [...REVIEWER_TYPES, 'Restaurant']

// Every report on one meal. Reviewer type is on each report and is the only filter
// (research insight #3: people weigh a report by who wrote it).
export default function MealReports() {
  const { meal, reports } = useMeal()
  const { account } = useAccount()
  const [type, setType] = useState(ALL)
  if (!meal) return <Navigate to="/meals" replace />

  const visible = applyReportOrder(reports, account.reportOrder)
  const hidden = reports.length - visible.length
  const count = (t) => visible.filter((r) => r.reviewerType === t).length
  const shown = type === ALL ? visible : visible.filter((r) => r.reviewerType === type)

  return (
    <>
      <ScreenHeader title="Reports" backTo={`/meals/${meal.id}`} />

      <div className="section stack-3">
        <div className="stack-2">
          <h2 className="t-section-header">{meal.name}</h2>
          <p className="t-meta ink-secondary">{meal.restaurant}</p>
        </div>
        <FilterChips label="Reviewer type">
          <FilterChip selected={type === ALL} onClick={() => setType(ALL)}>
            {ALL} · {visible.length}
          </FilterChip>
          {TYPES.filter(count).map((t) => (
            <FilterChip key={t} selected={type === t} onClick={() => setType(t)}>
              {t} · {count(t)}
            </FilterChip>
          ))}
        </FilterChips>
        <p className="t-meta ink-secondary">
          {reportOrderLabel(account.reportOrder)}
          {hidden > 0 && ` · ${hidden} hidden by your setting`} ·{' '}
          <Link className="link" to="/account/settings">
            Change in Settings
          </Link>
        </p>
      </div>

      <div className="band" />

      <div className="section">
        {shown.map((report) => (
          <ReportItem key={report.id} report={report} />
        ))}
        {!shown.length && (
          <p className="t-body ink-secondary">
            {hidden
              ? 'No reports from celiac or strict GF diners yet.'
              : 'Nobody has reported on this meal yet.'}
          </p>
        )}
      </div>

      <ActionBar>
        <Button variant="primary" block to={`/contribute/report/meal?meal=${meal.id}`}>
          Ate this? Write a report
        </Button>
      </ActionBar>
    </>
  )
}
