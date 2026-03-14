import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Импорт
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './contexts/LanguageContext'
import LanguageSwitcher from './components/LanguageSwitcher'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
        <LanguageSwitcher />
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>,
)