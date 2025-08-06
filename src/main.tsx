import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  //remove strictMode to avoid double fetch
  // <StrictMode>
    <App />

  // </StrictMode>,
)
