import '@testing-library/jest-dom/extend-expect'
import { fireEvent, wait } from '@testing-library/react'

import React from 'react'

import { history, renderWithRedux } from '../utils'
import Login from '../../containers/Login/Login'

global.fetch = jest.fn()

describe('Login component', () => {
  beforeEach(() => history.push('/')) // resetting location to root

  it('Logs in on 200', async () => {
    global.fetch.mockResolvedValueOnce({ // mocking successful fetch
      json: () => ({ token: '123123123' }),
      ok: true,
      code: 200
    })

    // render
    const { getByPlaceholderText, getByText } = renderWithRedux(
      (<Login />)
    )

    // filling out the form
    fireEvent.change(getByPlaceholderText(/Email/i), { target: { value: 'kappa@mail.com' } })
    fireEvent.change(getByPlaceholderText(/Password/i), { target: { value: '123123' } })

    fireEvent.click(getByText(/Log In/i)) // submitting
    await wait(() =>
      expect(location.pathname).toBe('/home') // checking the user was redirected after login
    )
  })

  it('Shows wrong credentials message on 401', async () => {
    global.fetch.mockResolvedValueOnce({ // mocking successful fetch
      json: () => ({ error: 'Wrong login credentials' }),
      ok: false,
      code: 401
    })

    // render
    const { getByPlaceholderText, getByText, findByText } = renderWithRedux(
      (<Login />)
    )

    // filling out the form
    fireEvent.change(getByPlaceholderText(/Email/i), { target: { value: 'wrong@mail.com' } })
    fireEvent.change(getByPlaceholderText(/Password/i), { target: { value: 'wrongg' } })

    fireEvent.click(getByText(/Log In/i)) // submitting

    expect(findByText('Wrong login credentials')).toBeTruthy() // loading message is shown
    expect(location.pathname).toBe('/') // checking the user was NOT redirected
  })
})
