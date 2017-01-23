import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './app/routes'
import './assets/styles/reset.css'
import './assets/styles/bootstrap.css'
import './assets/styles/main.css'

// GA Autotrack
require('autotrack');
require("autotrack/lib/plugins/outbound-form-tracker")
require("autotrack/lib/plugins/url-change-tracker")
require("autotrack/lib/plugins/clean-url-tracker")

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root'))