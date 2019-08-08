import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, findByText } from '@testing-library/react'

import React from 'react'

import { renderWithRedux, flushAllPromises } from '../../../test/utils'
import Login from '../../containers/Login/Login'

test('Allows succesful login', async () => {
  // mocking login api call
  jest.spyOn(global, 'fetch').mockResolvedValue({ // mocking successful fetch
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

  // submitting
  fireEvent.click(getByText(/Log In/i))

  expect(findByText('Woopsi-Doopsie')).toBeTruthy() // loading message is shown

  await flushAllPromises() // awaiting request processed

  expect(location.pathname).toBe('/home') // checking the user was redirected after login
  expect(global.fetch).toHaveBeenCalledTimes(1)
})
