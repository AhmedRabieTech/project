import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './index.css'
import './css/style.css'
import './i18n'
import i18n from 'i18next'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Suspense fallback={<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><div className="spinner-border text-primary" role="status"></div></div>}>
            <App />
        </Suspense>
    </React.StrictMode>,
)
