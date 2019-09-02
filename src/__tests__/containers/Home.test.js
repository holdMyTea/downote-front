import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { history, renderWithRedux } from '../../../test/utils'
import Home from '../../containers/Home/Home'

describe('Login component', () => {
  beforeEach(() => history.push('/')) // resetting location to root

  it('Logs in on 200', async () => {
    // render
    renderWithRedux(
      (<Home />)
    )
  })
})
