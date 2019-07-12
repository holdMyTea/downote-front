import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'

import 'semantic-ui-css/semantic.min.css'

import reducers from './reducers'
import App from './containers/App/App'

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    logger
  )
)

render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('app')
)
