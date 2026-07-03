import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Cukup render <App /> saja di sini, hapus <BrowserRouter> jika ada */}
    <App />
  </React.StrictMode>,
)