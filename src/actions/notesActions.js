import { add, updateAdded, edit, remove, dropOnColumn, dropOnNote } from '../helpers/notesHandler'

import { removeToken } from './loginActions'
import { showSuccessNotification, showErrorNotification } from './notificationActions'
import request from '../helpers/request'
import uuid from 'uuid'

const handleError = response => {
  switch (response.code) {
    case 401:
      return dispatch => {
        dispatch(removeToken())
        dispatch(showErrorNotification('Please login to continue'))
      }

    default:
      return showErrorNotification(response.body.error)
  }
}

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

export const REQUEST_NOTES = 'REQUEST_NOTES'
const requestNotes = _ => ({ type: REQUEST_NOTES })

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
        dispatch(handleError(response))
      }
    })
}

export const CREATE_NOTE = 'CREATE_NOTE'
export const RECEIVE_CREATE_NOTE = 'RECEIVE_CREATE_NOTE'
/**
 * Redux action for adding a new note
 * @param {string} header - header of the note
 * @param {string} text - text of the note
 */
export const createNote = (header, text) =>
  (dispatch, getState) => {
    const { newColumns, uiID, order, columnIndex } = add(getState().notes.columns, header, text)
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
        const { newColumns } = updateAdded(
          getState().notes.columns,
          uiID,
          response.body.noteId,
          columnIndex
        )
        dispatch({
          type: RECEIVE_CREATE_NOTE,
          newColumns
        })
        dispatch(completeSync(syncId))
      } else {
        dispatch(handleError(response))
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
export const editNote = (noteId, header, text, columnIndex) =>
  (dispatch, getState) => {
    const { newColumns } = edit(getState().notes.columns, noteId, header, text, columnIndex)
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
        dispatch(handleError(response))
      }
    })
  }

export const DELETE_NOTE = 'DELETE_NOTE'
/**
 * Redux action for deleting a note
 * @param {string} noteId - id of the deleted note
 */
export const deleteNote = (noteId, columnIndex) =>
  (dispatch, getState) => {
    const { newColumns } = remove(getState().notes.columns, noteId, columnIndex)
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
          dispatch(handleError(response))
        }
      })
  }

export const MOVE_NOTE_OVER_COLUMN = 'MOVE_NOTE_TO_COLUMN'
/**
   * Redux action for removing note from the oldColumn and appending it to the end of the newColumn
   * @param {string} noteId - id of the note
   * @param {number} oldColumnIndex - initial column the note belonged to
   * @param {number} newColumnIndex - column the note was dropped on
   */
export const moveNoteOverColumn = (noteId, oldColumnIndex, newColumnIndex) =>
  (dispatch, getState) => {
    const { newColumns, newOrder } = dropOnColumn(
      getState().notes.columns,
      noteId,
      oldColumnIndex,
      newColumnIndex
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
        dispatch(handleError(response))
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
export const moveNoteOverNote = (noteId, targetNoteId, oldColumnIndex, newColumnIndex) =>
  (dispatch, getState) => {
    const { newColumns, newOrder } = dropOnNote(
      getState().notes.columns,
      noteId,
      targetNoteId,
      oldColumnIndex,
      newColumnIndex
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
        dispatch(handleError(response))
      }
    })
  }
