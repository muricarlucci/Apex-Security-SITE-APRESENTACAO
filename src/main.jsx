import React from 'react'
import ReactDOM from 'react-dom/client'

/* O sistema de design entra primeiro: assim os CSS dos componentes,
   emitidos depois no bundle, vencem os utilitarios de mesma
   especificidade (ex.: `.nav__cta { display: none }` sobre `.btn`). */
import './styles/global.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
