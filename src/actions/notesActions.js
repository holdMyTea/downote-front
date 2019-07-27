export const MOVE_NOTE_OVER_COLUMN = 'MOVE_NOTE_TO_COLUMN'
export const MOVE_NOTE_OVER_NOTE = 'MOVE_NOTE_OVER_NOTE'

export const moveNoteOverColumn = (noteId, oldColumnIndex, newColumnIndex) => ({
  type: MOVE_NOTE_OVER_COLUMN,
  noteId,
  oldColumnIndex,
  newColumnIndex
})

export const moveNoteOverNote = (noteId, targetNoteId, oldColumnIndex, newColumnIndex) => ({
  type: MOVE_NOTE_OVER_NOTE,
  noteId,
  targetNoteId,
  oldColumnIndex,
  newColumnIndex
})
