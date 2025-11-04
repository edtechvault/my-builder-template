
// File: src/main.tsx
// WHY REPLACE: change a single import to avoid requiring `allowImportingTsExtensions`.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'          // <-- no .tsx extension
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
