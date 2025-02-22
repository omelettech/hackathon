import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as bootstrap from 'bootstrap'

import './index.css'
import './scss/styles.scss'

// Import all of Bootstrap's JS
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
