
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"

// For proper mobile viewport handling
const setVhProperty = () => {
  // Set the value of --vh to the actual viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Set the property initially and on resize
setVhProperty();
window.addEventListener('resize', setVhProperty);

// Handle iOS PWA navigation bar appearance
if (window.navigator && (window.navigator as any).standalone === true) {
  document.body.classList.add('ios-pwa');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
)
