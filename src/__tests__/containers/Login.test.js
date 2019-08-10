import '@testing-library/jest-dom/extend-expect'
import { fireEvent, findByText } from '@testing-library/react'

import React from 'react'

import { history, renderWithRedux, flushAllPromises } from '../../../test/utils'
import Login from '../../containers/Login/Login'

describe('Login component', () => {
  beforeEach(() => history.push('/')) // resetting location to root

  it('Logs in on 200', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({ // mocking successful fetch
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

    expect(findByText('Woopsi-Doopsie')).toBeTruthy() // loading message is shown

    await flushAllPromises() // awaiting request processed

    expect(location.pathname).toBe('/home') // checking the user was redirected after login
  })

  it('Shows wrong credentials message on 401', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({ // mocking failed fetch
      json: () => ({ error: 'Wrong login credentials' }),
      ok: false,
      code: 401
    })

    // render
    const { getByPlaceholderText, getByText } = renderWithRedux(
      (<Login />)
    )

    // filling out the form
    fireEvent.change(getByPlaceholderText(/Email/i), { target: { value: 'wrong@mail.com' } })
    fireEvent.change(getByPlaceholderText(/Password/i), { target: { value: 'wrongg' } })

    fireEvent.click(getByText(/Log In/i)) // submitting

    expect(findByText('Woopsi-Doopsie')).toBeTruthy() // loading message is shown

    await flushAllPromises() // awaiting request processed

    expect(location.pathname).toBe('/') // checking the user was NOT redirected
    expect(findByText('Wrong login credentials')).toBeTruthy() // finding error notification
  })
})
