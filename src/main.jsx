import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { FirebaseProvider } from './Context/Firebase.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <FirebaseProvider>
      <App />
    </FirebaseProvider>
    </BrowserRouter>
)
