export const MOVE_NOTE = 'MOVE_NOTE'

export const moveNote = (noteId, oldColumnIndex, newColumnIndex) => ({
  type: MOVE_NOTE,
  noteId,
  oldColumnIndex,
  newColumnIndex
})
