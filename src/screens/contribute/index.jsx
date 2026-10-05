import { Navigate, Route, Routes } from 'react-router-dom'
import ContributeHub from './ContributeHub.jsx'
import ReportMeal from './ReportMeal.jsx'
import ReportPractices from './ReportPractices.jsx'
import ReportVisit from './ReportVisit.jsx'
import ReportRating from './ReportRating.jsx'
import ReportReview from './ReportReview.jsx'
import ReportSubmitted from './ReportSubmitted.jsx'
import CallPick from './CallPick.jsx'
import CallScript from './CallScript.jsx'
import CallResult from './CallResult.jsx'
import ReviewQueue from './ReviewQueue.jsx'
import ReviewReport from './ReviewReport.jsx'
import ReviewConflict from './ReviewConflict.jsx'
import MyReports from './MyReports.jsx'
import BecomeVerifier from './BecomeVerifier.jsx'

// Section C — Contribute & Verify. Screen map and behavior: docs/contribute-verify.md
export default function ContributeRoutes() {
  return (
    <Routes>
      <Route index element={<ContributeHub />} />
      <Route path="report">
        <Route index element={<Navigate to="meal" replace />} />
        <Route path="meal" element={<ReportMeal />} />
        <Route path="practices" element={<ReportPractices />} />
        <Route path="visit" element={<ReportVisit />} />
        <Route path="rating" element={<ReportRating />} />
        <Route path="review" element={<ReportReview />} />
        <Route path="submitted" element={<ReportSubmitted />} />
      </Route>
      <Route path="call" element={<CallPick />} />
      <Route path="call/:mealId" element={<CallScript />} />
      <Route path="call/:mealId/result" element={<CallResult />} />
      <Route path="review" element={<ReviewQueue />} />
      <Route path="review/:reportId" element={<ReviewReport />} />
      <Route path="review/:reportId/conflict" element={<ReviewConflict />} />
      <Route path="mine" element={<MyReports />} />
      <Route path="verifier" element={<BecomeVerifier />} />
      <Route path="*" element={<Navigate to="/contribute" replace />} />
    </Routes>
  )
}
