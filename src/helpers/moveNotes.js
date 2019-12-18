// TODO: this is duplicate, and should not be in reducer
/**
 * Updates the order property of all notes in array
 * @param {Note[]} column - array to update
 * @param {number} columnIndex - index of supplied column
 * @param {number} columnCount - total number of columns
 * @returns {Note[]} array of Notes with updated order
 */
const updateOrderInColumn = (column, columnIndex, columnCount) =>
  column.map(
    (note, index) => {
      note.order = index * columnCount + columnIndex
      return note
    }
  )

const moveNoteOnColumn = (noteId, oldColumnIndex, newColumnIndex, columns, columnCount) => {
  const newColumns = [ ...columns ]
  // finding the dragged note
  const note = newColumns[oldColumnIndex].find(n => n.id === noteId)
  // removing the node from the oldColumn and updating order in it
  newColumns[oldColumnIndex] = updateOrderInColumn(
    newColumns[oldColumnIndex].filter(
      n => n.id !== noteId
    ),
    oldColumnIndex,
    columnCount
  )
  // updating the order of the note before inserting it
  note.order = newColumns[newColumnIndex].length * columnCount + newColumnIndex
  // inserting the note into the new column
  newColumns[newColumnIndex].push(note)
  return newColumns
}

const moveNoteOverNote = (noteId, targetNoteId, oldColumnIndex, newColumnIndex, columns, columnCount) => {
  const newColumns = [ ...columns ]
  // finding the dragged note
  const note = newColumns[oldColumnIndex].find(n => n.id === noteId)
  // removing the node from the oldColumn and updating order in it
  newColumns[oldColumnIndex] = updateOrderInColumn(
    newColumns[oldColumnIndex].filter(
      n => n.id !== noteId
    ),
    oldColumnIndex,
    columnCount
  )
  // inserting the note into the newColumn
  newColumns[newColumnIndex].splice(
    newColumns[newColumnIndex].findIndex(note => note.id === targetNoteId),
    0,
    note
  )
  // updating the order of the newColumn
  newColumns[newColumnIndex] = updateOrderInColumn(
    newColumns[newColumnIndex],
    newColumnIndex,
    columnCount
  )
  return newColumns
}

export {
  moveNoteOnColumn,
  moveNoteOverNote
}
