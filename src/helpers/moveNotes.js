import uuid from 'uuid/v4'

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

const toOrderArray = n => ({ id: n.id, order: n.order })

const addNote = (columns, header, text) => {
  // selecting the column with the fewest notes
  let index = 0
  let length = Number.POSITIVE_INFINITY
  columns.forEach((c, i) => {
    if (c.length < length) {
      index = i
      length = c.length
    }
  })

  const uiID = uuid()
  columns[index].push({
    header,
    text,
    id: uiID
  })

  columns[index] = updateOrderInColumn(columns[index], index, columns.length)
  const order = columns[index][columns[index].length - 1].order
  return {
    newColumns: [...columns],
    uiID,
    order,
    columnIndex: index
  }
}

const dropNoteOnColumn = (noteId, oldColumnIndex, newColumnIndex, columns) => {
  const newColumns = [ ...columns ]
  const columnCount = newColumns.length
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

  const newOrder = newColumns[oldColumnIndex].map(toOrderArray)

  newOrder.push({
    id: note.id,
    order: note.order
  })

  return {
    newColumns,
    newOrder
  }
}

const dropNoteOnNote = (noteId, targetNoteId, oldColumnIndex, newColumnIndex, columns) => {
  const newColumns = [ ...columns ]
  const columnCount = newColumns.length

  // finding the dragged note
  const note = newColumns[oldColumnIndex].find(n => n.id === noteId)

  // removing the node from the oldColumn
  newColumns[oldColumnIndex] = oldColumnIndex === newColumnIndex
    //
    ? newColumns[oldColumnIndex] = newColumns[oldColumnIndex].filter(
      n => n.id !== noteId
    )
    : updateOrderInColumn( // and updating order in it
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

  const newOrder = oldColumnIndex === newColumnIndex
    ? newColumns[oldColumnIndex].map(toOrderArray)
    : newColumns[oldColumnIndex]
      .map(toOrderArray)
      .concat(
        newColumns[newColumnIndex].map(toOrderArray)
      )

  return {
    newColumns,
    newOrder
  }
}

export {
  addNote,
  dropNoteOnColumn,
  dropNoteOnNote
}
