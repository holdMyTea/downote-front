export const MOVE_NOTE_OVER_COLUMN = 'MOVE_NOTE_TO_COLUMN'
export const MOVE_NOTE_OVER_NOTE = 'MOVE_NOTE_OVER_NOTE'

/**
 * Redux action to remove note from the oldColumn and append to the end of the newColumn
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

/**
 * Redux action to move one note on top of the other
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
