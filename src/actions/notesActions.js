import { add, edit, remove, dropOnColumn, dropOnNote } from '../helpers/notesHandler'

import { showSuccessNotification, showErrorNotification } from './notificationActions'
import request from '../helpers/request'
import uuid from 'uuid'

export const START_SYNC = 'START_SYNC'
const startSync = syncId => ({
  type: START_SYNC,
  syncId
})

export const COMPLETE_SYNC = 'COMPLETE_SYNC'
const completeSync = syncId => ({
  type: COMPLETE_SYNC,
  syncId
})

export const MOVE_NOTE_OVER_COLUMN = 'MOVE_NOTE_TO_COLUMN'
/**
 * Redux action for removing note from the oldColumn and appending it to the end of the newColumn
 * @param {string} noteId - id of the note
 * @param {number} oldColumnIndex - initial column the note belonged to
 * @param {number} newColumnIndex - column the note was dropped on
 */
export const moveNoteOverColumn = (columns, noteId, oldColumnIndex, newColumnIndex) =>
  dispatch => {
    const { newColumns, newOrder } = dropOnColumn(
      noteId,
      oldColumnIndex,
      newColumnIndex,
      columns
    )

    dispatch({
      type: MOVE_NOTE_OVER_COLUMN,
      newColumns
    })

    const syncId = uuid()
    dispatch(startSync(syncId))

    return request('/notes/reorder', 'PUT', {
      newOrder
    }).then(response => {
      if (response.ok) {
        dispatch(completeSync(syncId))
      } else {
        dispatch(showErrorNotification(response.body.error))
      }
    })
  }

export const MOVE_NOTE_OVER_NOTE = 'MOVE_NOTE_OVER_NOTE'
/**
 * Redux action for moving one note on top of the other
 * @param {string} noteId - id of the note
 * @param {string} targetNoteId - the dragged note will be placed on top of
 * @param {number} oldColumnIndex - initial column the note belonged to
 * @param {number} newColumnIndex - column the note was dropped on (column where target note is)
 */
export const moveNoteOverNote = (columns, noteId, targetNoteId, oldColumnIndex, newColumnIndex) =>
  dispatch => {
    const { newColumns, newOrder } = dropOnNote(
      noteId,
      targetNoteId,
      oldColumnIndex,
      newColumnIndex,
      columns
    )

    dispatch({
      type: MOVE_NOTE_OVER_NOTE,
      newColumns
    })

    const syncId = uuid()
    dispatch(startSync(syncId))

    return request('/notes/reorder', 'PUT', {
      newOrder
    }).then(response => {
      if (response.ok) {
        dispatch(completeSync(syncId))
      } else {
        dispatch(showErrorNotification(response.body.error))
      }
    })
  }

export const CREATE_NOTE = 'CREATE_NOTE'
export const RECEIVE_CREATE_NOTE = 'RECEIVE_CREATE_NOTE'
/**
 * Redux action for adding a new note
 * @param {Object[][]} columns - current notes in columns
 * @param {string} header - header of the note
 * @param {string} text - text of the note
 */
export const createNote = (columns, header, text) => dispatch => {
  const { newColumns, uiID, order, columnIndex } = add(columns, header, text)
  dispatch({ // dispatching note creation before fetching
    type: CREATE_NOTE,
    newColumns
  })
  dispatch(showSuccessNotification('Note created'))

  const syncId = uuid()
  dispatch(startSync(syncId))

  return request('/note', 'POST', {
    header,
    text,
    order
  }).then(response => {
    if (response.ok) {
      dispatch({
        type: RECEIVE_CREATE_NOTE,
        uiID,
        id: response.body.noteId,
        columnIndex
      })
      dispatch(completeSync(syncId))
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
export const editNote = (noteId, header, text, columnIndex, columns) =>
  dispatch => {
    const { newColumns } = edit(noteId, header, text, columnIndex, columns)
    dispatch({
      type: EDIT_NOTE,
      newColumns
    })
    dispatch(showSuccessNotification('Note updated'))

    const syncId = uuid()
    dispatch(startSync(syncId))

    return request(`/note/${noteId}`, 'PUT', {
      header,
      text
    }).then(response => {
      if (response.ok) {
        dispatch(completeSync(syncId))
      } else {
        dispatch(showErrorNotification(response.body.error))
      }
    })
  }

export const DELETE_NOTE = 'DELETE_NOTE'
/**
 * Redux action for deleting a note
 * @param {string} noteId - id of the deleted note
 */
export const deleteNote = (noteId, columnIndex, columns) =>
  dispatch => {
    const { newColumns } = remove(noteId, columnIndex, columns)
    dispatch({
      type: DELETE_NOTE,
      newColumns
    })
    dispatch(showSuccessNotification('Note deleted'))

    const syncId = uuid()
    dispatch(startSync(syncId))

    return request(`/note/${noteId}`, 'DELETE')
      .then(response => {
        if (response.ok) {
          dispatch(completeSync(syncId))
        } else {
          dispatch(showErrorNotification(response.body.error))
        }
      })
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
  return request('/notes')
    .then(response => {
      if (response.ok) {
        dispatch(receiveNotes(response.body))
      } else {
        dispatch(showErrorNotification(response.body.error))
      }
    })
}
