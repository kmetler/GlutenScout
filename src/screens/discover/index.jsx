import { Navigate, Route, Routes } from 'react-router-dom'
import DiscoverHub from './DiscoverHub.jsx'
import Search from './Search.jsx'
import Location from './Location.jsx'
import Filters from './Filters.jsx'
import Restaurants from './Restaurants.jsx'
import RestaurantDetail from './RestaurantDetail.jsx'
import HowSorted from './HowSorted.jsx'
import TourWelcome from './TourWelcome.jsx'
import TourEvidence from './TourEvidence.jsx'
import './discover.css'

// Section A — Discover & Browse. Screen map and behavior: docs/discover-browse.md
export default function DiscoverRoutes() {
  return (
    <Routes>
      <Route index element={<DiscoverHub />} />
      <Route path="search" element={<Search />} />
      <Route path="location" element={<Location />} />
      <Route path="filters" element={<Filters />} />
      <Route path="restaurants" element={<Restaurants />} />
      <Route path="restaurants/:restaurantId" element={<RestaurantDetail />} />
      <Route path="how-sorted" element={<HowSorted />} />
      <Route path="welcome" element={<TourWelcome />} />
      <Route path="welcome/evidence" element={<TourEvidence />} />
      <Route path="*" element={<Navigate to="/discover" replace />} />
    </Routes>
  )
}
