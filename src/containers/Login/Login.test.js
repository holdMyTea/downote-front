import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, findByText, waitForElement, getByTestId, waitForElementToBeRemoved } from '@testing-library/react'

import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from '../../reducers'
import Login from './Login'

const renderWithRedux = (
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

test('Allows succesful login', async () => {
  // mocking login api call
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve({
      token: 'mockedtoken'
    })
  })

  // initial redux store
  const initialState = {
    login: {
      token: undefined,
      email: undefined,
      isLoginPending: false,
      error: undefined
    }
  }

  // render
  const { getByPlaceholderText, getByText, store } = renderWithRedux(
    (<Login />),
    initialState
  )

  // filling out the form
  fireEvent.change(getByPlaceholderText(/Email/i), { target: { value: 'kappa@mail.com' } })
  fireEvent.change(getByPlaceholderText(/Password/i), { target: { value: '123123' } })

  // submitting
  fireEvent.click(getByText(/Log In/i))

  await expect(global.fetch).resolves
  expect(global.fetch).toHaveBeenCalledTimes(1) // fetch is called once
  expect(store.getState().login.isLoginPending).toBe(true) // loading prop is true
  expect(findByText('Woopsi-Doopsie')).toBeTruthy() // loading message is shown
})
