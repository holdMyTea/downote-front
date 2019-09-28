import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { renderForHome } from '../../../test/utils'
import Home from '../../containers/Home/Home'
import { fireEvent, within, cleanup } from '@testing-library/react'

describe('Home component', () => {
  afterEach(cleanup)

  it('Moves a note to another column using drag\'n\'drop', async () => {
    const { findAllByTestId } = renderForHome((<Home/>))

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

  it('Moves a note in from of another one using drag\'n\'drop', async () => {
    const { findAllByTestId } = renderForHome((<Home/>))

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

  it('Moves a note to the bottom when dragged\'n\'dropped onto its current column', async () => {
    const { findAllByTestId } = renderForHome((<Home/>))

    const [intialColumn] = await findAllByTestId('note-col')
    // saving the initial state of note column
    const [initialFirst, initialSecond] = within(intialColumn).getAllByText(/note/i)

    fireEvent.dragStart(initialFirst)
    fireEvent.dragOver(intialColumn)
    fireEvent.drop(intialColumn)

    // final state should be equal to the initial one with reversed order
    const [finalFirst, finalSecond] = within(intialColumn).getAllByText(/note/i)
    expect(finalFirst).toBe(initialSecond)
    expect(finalSecond).toBe(initialFirst)
  })

  it('Doesn\'t move a note when dragged\'n\'dropped onto the following note in the same column', async () => {
    const { findAllByTestId } = renderForHome((<Home/>))

    const [initialColumn] = await findAllByTestId('note-col')
    // saving the initial state of note column
    const [initialFirst, initialSecond] = within(initialColumn).getAllByText(/note/i)

    fireEvent.dragStart(initialFirst)
    fireEvent.dragOver(initialSecond)
    fireEvent.drop(initialSecond)

    // final state should be equal to the initial one, order shouldn't have changed
    const [finalFirst, finalSecond] = within(initialColumn).getAllByText(/note/i)
    expect(finalFirst).toBe(initialFirst)
    expect(finalSecond).toBe(initialSecond)
  })

  it('Doesn\'t move a note when dragged\'n\'dropped onto itself', async () => {
    const { findAllByTestId } = renderForHome((<Home/>))

    const [initialColumn] = await findAllByTestId('note-col')
    // saving the initial state of note column
    const initialState = within(initialColumn).getAllByText(/note/i)
    const note = initialState[0]

    fireEvent.dragStart(note)
    fireEvent.dragOver(note)
    fireEvent.drop(note)

    // final state should be equal to the initial one, order shouldn't have changed
    expect(initialState).toStrictEqual(within(initialColumn).getAllByText(/note/i))
  })
})
