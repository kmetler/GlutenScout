import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import Clarity from '@microsoft/clarity'
import App from './App.jsx'
import { StoreProvider } from './data/store.jsx'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'

// Session recordings + heatmaps. Only runs in production builds so local
// dev sessions don't pollute the data. VITE_CLARITY_PROJECT_ID is set in Vercel.
const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID
if (import.meta.env.PROD && clarityId) Clarity.init(clarityId)

// HashRouter keeps deep links working on static hosts without server rewrites.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </HashRouter>
  </React.StrictMode>,
)
