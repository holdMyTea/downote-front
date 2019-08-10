import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { render } from '@testing-library/react'
import { createBrowserHistory } from 'history'

import reducers from '../src/reducers'

// exposing history object, to be able to flush it to root in beforeEach
export const history = createBrowserHistory({ initialEntries: ['/'] })

// render function with all the Providers
export const renderWithRedux = (
  component,
  initialState = {},
  reducer = reducers
) => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk))
  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          { component }
        </Provider>
      </Router>
    ),
    store
  }
}

// immediate resolve for pending promises
export const flushAllPromises = () => new Promise(resolve => setImmediate(resolve), reject => setImmediate(reject))
