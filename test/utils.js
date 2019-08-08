import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { render } from '@testing-library/react'

import reducers from '../src/reducers'

export const renderWithRedux = (
  component,
  initialState = {},
  reducer = reducers
) => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk))
  return {
    ...render(
      <BrowserRouter>
        <Provider store={store}>
          {component}
        </Provider>
      </BrowserRouter>
    ),
    store
  }
}

export const flushAllPromises = () => new Promise(resolve => setImmediate(resolve))
