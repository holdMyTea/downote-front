import { showSuccessNotification } from './notificationActions'

export const MOVE_NOTE_OVER_COLUMN = 'MOVE_NOTE_TO_COLUMN'
/**
 * Redux action for removing note from the oldColumn and append to the end of the newColumn
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
/**
 * Redux action for adding a new note
 * @param {string} header - header of the note
 * @param {string} text - text of the note
 */
export const createNote = (header, text) => {
  return dispatch => {
    dispatch({
      type: CREATE_NOTE,
      header,
      text
    })
    dispatch(showSuccessNotification('Note created'))
  }
}

export const EDIT_NOTE = 'EDIT_NOTE'
/**
 * Redux action for editing of a note
 * @param {string} noteId - id of the note
 * @param {string} header - header of the note
 * @param {string} text - text of the note
 */
export const editNote = (noteId, header, text) => {
  return dispatch => {
    dispatch({
      type: EDIT_NOTE,
      noteId,
      header,
      text
    })
    dispatch(showSuccessNotification('Note updated'))
  }
}

export const DELETE_NOTE = 'DELETE_NOTE'
/**
 * Redux action for deleting a note
 * @param {string} noteId - id of the deleted note
 */
export const deleteNote = noteId => {
  return dispatch => {
    dispatch({
      type: DELETE_NOTE,
      noteId
    })
    dispatch(showSuccessNotification('Note deleted'))
  }
}
