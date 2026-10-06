import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ActionBar, Button, ScreenHeader, StepHeader } from '../../components'
import { useStore } from '../../data/store.jsx'
import { useAccount } from './accountStore.js'
import { ReportOrderPicker, SETUP_STEPS } from './shared.jsx'

// Step 3. Whose reports come first when reading about a meal.
export default function SetupOrder() {
  const { state } = useStore()
  const { account, setReportOrder } = useAccount()
  const navigate = useNavigate()
  const [order, setOrder] = useState(account.reportOrder)
  if (!state.currentUser.reviewerType) return <Navigate to="/account/setup/type" replace />

  const save = () => {
    setReportOrder(order)
    navigate('/account/setup/done')
  }

  return (
    <>
      <ScreenHeader title="Set up profile" backTo="/account/setup/type" />
      <div className="section stack-4">
        <StepHeader step={3} total={SETUP_STEPS} title="Whose reports should come first?">
          When you read about a meal, reports are listed in this order. You can change it any time
          in Settings.
        </StepHeader>
        <ReportOrderPicker value={order} onChange={setOrder} />
      </div>
      <ActionBar>
        <Button variant="primary" block onClick={save}>
          Save profile
        </Button>
      </ActionBar>
    </>
  )
}
