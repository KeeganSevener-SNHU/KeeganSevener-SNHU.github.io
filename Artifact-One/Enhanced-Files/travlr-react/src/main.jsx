//============================================================================
// Name        : travlr-React
// Author      : Keegan Sevener
// Date        : May 24, 2025
// Version     : 1.0
// Description : Project for SNHU CS499 Capstone
//============================================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import CSS styling.
import './appMainStyles.css'
import './PopUpModalStyles.css'
import './LoginComponent/loginPage.css'
// Import the App function.
import App from './App.jsx'


// Pass the app into the index.html document
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
