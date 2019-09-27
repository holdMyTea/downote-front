import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { renderWithRedux } from '../../../test/utils'
import Home from '../../containers/Home/Home'
import { fireEvent, within } from '@testing-library/react'

describe('Home component', () => {
  it('Drags and drops a note onto a column', async () => {
    // render
    const { findAllByTestId } = renderWithRedux(
      (<Home />),
      // mock login token to not get redirected to login page
      { login: { token: 'totally-valid-token-for-testing' } }
    )

    const [intialColumn, targetColumn] = await findAllByTestId('note-col')

    const noteText = /A paragraph long note/i
    // the note within the initial column
    const note = within(intialColumn).getByText(noteText)

    fireEvent.dragStart(note)
    fireEvent.dragOver(targetColumn)
    fireEvent.drop(targetColumn)

    expect(within(targetColumn).getByText(noteText)).toBeTruthy()
    expect(within(intialColumn).queryByText(noteText)).toBeFalsy()
  })
})
