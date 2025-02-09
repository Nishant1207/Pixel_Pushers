import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseProvider } from './Context/Firebase.jsx'
import AIInteractionPopup from './Components/Popup';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FirebaseProvider>
      <AIInteractionPopup />
      <App />
    </FirebaseProvider>
  </BrowserRouter>
)
