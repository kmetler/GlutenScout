import { Navigate, Route, Routes } from 'react-router-dom'
import AccountHub from './AccountHub.jsx'
import SetupAbout from './SetupAbout.jsx'
import SetupType from './SetupType.jsx'
import SetupOrder from './SetupOrder.jsx'
import SetupDone from './SetupDone.jsx'
import Community from './Community.jsx'
import ReviewerProfile from './ReviewerProfile.jsx'
import Settings from './Settings.jsx'
import EditProfile from './EditProfile.jsx'
import ChangeType from './ChangeType.jsx'
import Help from './Help.jsx'
import HelpTopic from './HelpTopic.jsx'
import './account.css'

// Section D — Account & Community. Screen map and behavior: docs/account-community.md
export default function AccountRoutes() {
  return (
    <Routes>
      <Route index element={<AccountHub />} />
      <Route path="setup" element={<SetupAbout />} />
      <Route path="setup/type" element={<SetupType />} />
      <Route path="setup/order" element={<SetupOrder />} />
      <Route path="setup/done" element={<SetupDone />} />
      <Route path="saved" element={<Navigate to="/my-meals" replace />} />
      <Route path="community" element={<Community />} />
      <Route path="community/:reviewerId" element={<ReviewerProfile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="settings/type" element={<ChangeType />} />
      <Route path="profile" element={<EditProfile />} />
      <Route path="help" element={<Help />} />
      <Route path="help/:topicId" element={<HelpTopic />} />
      <Route path="*" element={<Navigate to="/account" replace />} />
    </Routes>
  )
}
