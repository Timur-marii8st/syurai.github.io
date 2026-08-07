import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Импорт
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './contexts/LanguageContext'
import LanguageSwitcher from './components/LanguageSwitcher'
import LanguageUrlSync from './components/LanguageUrlSync'

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Аналитика включается переменной окружения VITE_GTAG_ID (например, G-XXXXXXXXXX)
const gtagId = import.meta.env.VITE_GTAG_ID as string | undefined;
if (gtagId) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  gtag('js', new Date());
  gtag('config', gtagId);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <LanguageUrlSync />
        <App />
        <LanguageSwitcher />
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>,
)
