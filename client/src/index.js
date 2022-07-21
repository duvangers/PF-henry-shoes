import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './redux/store/'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Auth0Provider domain="dev-a4swi3q7.us.auth0.com" clientId="Vevldv4f1noAKgG6gmJYh1eB5iAo4GZb" redirectUri={window.location.origin} useRefreshTokens cacheLocation="localstorage">
          <App />
        </Auth0Provider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)
reportWebVitals()
