import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { render } from '@testing-library/react'
import { createBrowserHistory } from 'history'

import reducers from '../reducers'
import { prepareInitialState } from '../reducers/notesReducer'

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

const makePlaceholder = i => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(i)

export const renderForHome = component => {
  const initialNotes = [
    {
      id: 'dvouieur092kdq',
      header: 'A paragraph long note',
      text: makePlaceholder(5),
      order: 0
    },
    {
      id: 'gi34u09fjidc9w',
      header: 'A rather long note',
      text: makePlaceholder(12),
      order: 1
    },
    {
      id: 'g3ijf893hf98uwehfd98w',
      header: 'A short note but with a pic',
      text: makePlaceholder(2),
      image: true,
      order: 2
    },
    {
      id: 'pojef023iwwldjfwpo',
      text: 'No header in the note, but still should be rendered ok',
      order: 3
    },
    {
      id: 'fiwjf934ufi3340f9kk3',
      header: 'Just a header here, must be smth short but important',
      order: 4
    }
  ]

  return renderWithRedux(
    component,
    // mock login token to not get redirected to login page
    {
      login: { token: 'totally-valid-token-for-testing' },
      notes: prepareInitialState(initialNotes, 3)
    }
  )
}
