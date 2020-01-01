import uuid from 'uuid/v4'

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

// TODO param ordering in exported functions
// TODO move column spreads to return

const add = (columns, header, text) => {
  // selecting the column with the fewest notes
  let index = 0
  let length = Number.POSITIVE_INFINITY
  Object.values(columns).forEach(
    (v, i) => {
      if (v.length < length) {
        index = i
        length = v.length
      }
    })

  const order = length * Object.values(columns).length + index

  const uiID = uuid()
  columns[index].push({
    header,
    text,
    order,
    id: uiID
  })

  return {
    newColumns: { [index]: columns[index] },
    uiID,
    order,
    columnIndex: index
  }
}

const updateAdded = (oldId, newId, columnIndex, columns) => ({
  [columnIndex]: columns[columnIndex].map(
    n => n.id === oldId ? { ...n, id: newId } : n
  )
})

const dropOnColumn = (noteId, oldColumnIndex, newColumnIndex, columns) => {
  const columnCount = Object.values(columns).length
  // finding the dragged note
  const note = columns[oldColumnIndex].find(n => n.id === noteId)

  let newOrder
  const newColumns = {}

  // when the note is dropped onto the same column it's already in
  if (newColumnIndex === oldColumnIndex) {
    const columnIndex = newColumnIndex
    // removing the note from the column
    newColumns[columnIndex] = columns[columnIndex].filter(
      n => n.id !== noteId
    )
    // and appending it again
    newColumns[columnIndex].push(note)
    newColumns[columnIndex] = updateOrderInColumn(
      newColumns[columnIndex],
      columnIndex,
      columnCount
    )
    newOrder = newColumns[columnIndex].map(toOrderArray)
  } else {
    // removing the node from the oldColumn and updating order in it
    newColumns[oldColumnIndex] = updateOrderInColumn(
      columns[oldColumnIndex].filter(
        n => n.id !== noteId
      ),
      oldColumnIndex,
      columnCount
    )
    // updating the order of the note before inserting it
    note.order = columns[newColumnIndex].length * columnCount + newColumnIndex
    // inserting the note into the new column
    newColumns[newColumnIndex] = [...columns[newColumnIndex], note]

    // adding the whole oldColumn to newOrder
    newOrder = newColumns[oldColumnIndex].map(toOrderArray)
    // and the moved note
    newOrder.push({
      id: note.id,
      order: note.order
    })
  }

  return {
    newColumns,
    newOrder
  }
}

const dropOnNote = (noteId, targetNoteId, oldColumnIndex, newColumnIndex, columns) => {
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

const edit = (noteId, header, text, columnIndex, columns) => {
  const newColumns = [...columns]

  const noteIndex = newColumns[columnIndex].findIndex(n => n.id === noteId)

  newColumns[columnIndex][noteIndex].header = header
  newColumns[columnIndex][noteIndex].text = text

  return {
    newColumns
  }
}

const remove = (noteId, columnIndex, columns) => {
  const newColumns = [...columns]

  newColumns[columnIndex] = newColumns[columnIndex].filter(n => n.id !== noteId)

  return {
    newColumns
  }
}

export {
  add,
  updateAdded,
  edit,
  remove,
  dropOnColumn,
  dropOnNote
}
