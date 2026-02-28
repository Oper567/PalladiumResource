import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Added for global routing
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrapping App in BrowserRouter here allows App.jsx to use useLocation() safely */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)