import { Navigate, Route, Routes } from 'react-router-dom'
import MealDetail from './MealDetail.jsx'
import MealPractices from './MealPractices.jsx'
import PracticeDetail from './PracticeDetail.jsx'
import MealHistory from './MealHistory.jsx'
import MealReports from './MealReports.jsx'
import './meals.css'

// Section B — Meal trust detail. Screen map and behavior: docs/meal-trust-detail.md
export default function MealRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/discover" replace />} />
      <Route path=":mealId" element={<MealDetail />} />
      <Route path=":mealId/practices" element={<MealPractices />} />
      <Route path=":mealId/practices/:practiceKey" element={<PracticeDetail />} />
      <Route path=":mealId/history" element={<MealHistory />} />
      <Route path=":mealId/reports" element={<MealReports />} />
      <Route path="*" element={<Navigate to="/discover" replace />} />
    </Routes>
  )
}
