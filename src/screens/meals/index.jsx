import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import MealDetail from './MealDetail.jsx'
import PracticeDetail from './PracticeDetail.jsx'
import './meals.css'

// The old practices / history / reports screens are now part of Meal Detail.
function ToMeal() {
  const { mealId } = useParams()
  return <Navigate to={`/meals/${mealId}`} replace />
}

// Section B — Meal trust detail. Screen map and behavior: docs/meal-trust-detail.md
export default function MealRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/discover" replace />} />
      <Route path=":mealId" element={<MealDetail />} />
      <Route path=":mealId/practices/:practiceKey" element={<PracticeDetail />} />
      <Route path=":mealId/practices" element={<ToMeal />} />
      <Route path=":mealId/history" element={<ToMeal />} />
      <Route path=":mealId/reports" element={<ToMeal />} />
      <Route path="*" element={<Navigate to="/discover" replace />} />
    </Routes>
  )
}
