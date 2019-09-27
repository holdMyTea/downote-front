import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { renderWithRedux } from '../../../test/utils'
import Home from '../../containers/Home/Home'
import { fireEvent, within, cleanup } from '@testing-library/react'

describe('Home component', () => {
  afterEach(cleanup)

  it('Drags and drops a note onto a column', async () => {
    // render
    const { findAllByTestId } = renderWithRedux(
      (<Home />),
      // mock login token to not get redirected to login page
      { login: { token: 'totally-valid-token-for-testing' } }
    )

    const [intialColumn, targetColumn] = await findAllByTestId('note-col')

    const noteText = /A paragraph long note/i

    fireEvent.dragStart(within(intialColumn).getByText(noteText))
    fireEvent.dragOver(targetColumn)
    fireEvent.drop(targetColumn)

    // the note is now in target column
    expect(within(targetColumn).getByText(noteText)).toBeTruthy()
    // and is gone from the intial one
    expect(within(intialColumn).queryByText(noteText)).toBeFalsy()
  })

  it('Drags and drops onto another note', async () => {
    // render
    const { findAllByTestId } = renderWithRedux(
      (<Home />),
      // mock login token to not get redirected to login page
      { login: { token: 'totally-valid-token-for-testing' } }
    )

    const [initialColumn, targetColumn] = await findAllByTestId('note-col')

    const draggedNoteText = /A paragraph long note/i

    const targetNoteText = /A rather long note/i
    const targetNote = within(targetColumn).getByText(targetNoteText)

    fireEvent.dragStart(within(initialColumn).getByText(draggedNoteText))
    fireEvent.dragOver(targetNote)
    fireEvent.drop(targetNote)

    // getting all notes from the target column
    const [first, second] = within(targetColumn).getAllByText(/note/i)
    expect(within(first).getByText(draggedNoteText)) // the dragged one should be on top
    expect(within(second).getByText(targetNoteText)) // and the target one -- at the bottom

    // dragged note should not be in the initial column now
    expect(within(initialColumn).queryByText(draggedNoteText)).toBeFalsy()
  })
})
