import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { AudioProvider } from './context/AudioContext';

createRoot(document.getElementById('root')).render(
  <AudioProvider>
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>
  </AudioProvider>,
)

