import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

/**
 * Application entry point
 * Renders the main App component into the DOM
 * 
 * Note: StrictMode is disabled to prevent double API calls
 * during development, but can be re-enabled for production
 */
const root = createRoot(document.getElementById('root')!);

root.render(
  // StrictMode disabled to avoid double fetch calls during development
  // Uncomment for production to catch potential issues
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
