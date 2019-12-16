import uuid from 'uuid/v4'

import { showSuccessNotification, showErrorNotification } from './notificationActions'
import request from '../helpers/request'

// TODO: move this somewhere
/**
   * Returns the lowest available order for the new note
   * @param {Note[]} notes - arrays of notes to check
   * @returns {number} the lowest available order for the new note
   */
const findSmallestAvailableOrder = notes => {
  const sortedOrders = notes
    .map(note => note.order)
    .sort((a, b) => a - b)

  for (let i = 0; i < sortedOrders.length; i++) {
    if (sortedOrders[i] > i) {
      return i
    }
  }

  return sortedOrders.length
}

export const MOVE_NOTE_OVER_COLUMN = 'MOVE_NOTE_TO_COLUMN'
/**
 * Redux action for removing note from the oldColumn and appending it to the end of the newColumn
 * @param {string} noteId - id of the note
 * @param {number} oldColumnIndex - initial column the note belonged to
 * @param {number} newColumnIndex - column the note was dropped on
 */
export const moveNoteOverColumn = (noteId, oldColumnIndex, newColumnIndex) => ({
  type: MOVE_NOTE_OVER_COLUMN,
  noteId,
  oldColumnIndex,
  newColumnIndex
})

export const MOVE_NOTE_OVER_NOTE = 'MOVE_NOTE_OVER_NOTE'
/**
 * Redux action for moving one note on top of the other
 * @param {string} noteId - id of the note
 * @param {string} targetNoteId - the dragged note will be placed on top of
 * @param {number} oldColumnIndex - initial column the note belonged to
 * @param {number} newColumnIndex - column the note was dropped on (column where target note is)
 */
export const moveNoteOverNote = (noteId, targetNoteId, oldColumnIndex, newColumnIndex) => ({
  type: MOVE_NOTE_OVER_NOTE,
  noteId,
  targetNoteId,
  oldColumnIndex,
  newColumnIndex
})

export const CREATE_NOTE = 'CREATE_NOTE'
export const RECEIVE_CREATE_NOTE = 'RECEIVE_CREATE_NOTE'
/**
 * Redux action for adding a new note
 * @param {Object[]} notes - all current notes
 * @param {string} header - header of the note
 * @param {string} text - text of the note
 */
export const createNote = (notes, header, text) => dispatch => {
  const uiID = uuid()
  const order = findSmallestAvailableOrder(notes)
  dispatch({ // dispatching note creation before fetching
    type: CREATE_NOTE,
    uiID,
    header,
    text,
    order
  })
  dispatch(showSuccessNotification('Note created'))

  return request('http://localhost:8082/note', 'POST', {
    header,
    text,
    order
  }).then(response => {
    if (response.ok) {
      dispatch({
        type: RECEIVE_CREATE_NOTE,
        uiID,
        id: response.noteId
      })
    } else {
      dispatch(showErrorNotification(response.body.error))
    }
  })
}

export const EDIT_NOTE = 'EDIT_NOTE'
/**
 * Redux action for editing of a note
 * @param {string} noteId - id of the note
 * @param {string} header - header of the note
 * @param {string} text - text of the note
 */
export const editNote = (noteId, header, text, columnIndex) => {
  return dispatch => {
    dispatch({
      type: EDIT_NOTE,
      noteId,
      header,
      text,
      columnIndex
    })
    dispatch(showSuccessNotification('Note updated'))
  }
}

export const DELETE_NOTE = 'DELETE_NOTE'
/**
 * Redux action for deleting a note
 * @param {string} noteId - id of the deleted note
 */
export const deleteNote = (noteId, columnIndex) => {
  return dispatch => {
    dispatch({
      type: DELETE_NOTE,
      noteId,
      columnIndex
    })
    dispatch(showSuccessNotification('Note deleted'))
  }
}

export const REQUEST_NOTES = 'REQUEST_NOTES'
const requestNotes = () => ({ type: REQUEST_NOTES })

export const RECEIVE_NOTES = 'RECEIVE_NOTES'
const receiveNotes = notes => ({
  type: RECEIVE_NOTES,
  notes
})

/**
 * Redux action to fetch notes from API.
 */
export const fetchNotes = _ => dispatch => {
  dispatch(requestNotes())
  return request('http://localhost:8082/notes')
    .then(response => {
      if (response.ok) {
        dispatch(receiveNotes(response.body))
      } else {
        dispatch(showErrorNotification(response.body.error))
      }
    })
}
