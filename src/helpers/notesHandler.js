import uuid from 'uuid/v4'

/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} [header]
 * @property {string} [text]
 * @property {boolean} [image] - temporal abstraction for an attached image
 * @property {number} order - integer to determine order of a note for render
 */

/**
 * @typedef {Object} newColumns
 * @property {Note[]} 0 - new 0 column
 * @property {Note[]} 1 - new 1 column
 * @property {Note[]} 2 - new 2 column
 */

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

const updateAdded = (columns, oldId, newId, columnIndex) => ({
  newColumns: {
    [columnIndex]: columns[columnIndex].map(
      n => n.id === oldId ? { ...n, id: newId } : n
    )
  }
})

const edit = (columns, noteId, header, text, columnIndex) => {
  const newColumns = {
    [columnIndex]: columns[columnIndex]
  }

  const noteIndex = newColumns[columnIndex].findIndex(n => n.id === noteId)

  newColumns[columnIndex][noteIndex].header = header
  newColumns[columnIndex][noteIndex].text = text

  return {
    newColumns
  }
}

const remove = (columns, noteId, columnIndex) => ({
  newColumns: {
    [columnIndex]: columns[columnIndex].filter(n => n.id !== noteId)
  }
})

const dropOnColumn = (columns, noteId, oldColumnIndex, newColumnIndex) => {
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

const dropOnNote = (columns, noteId, targetNoteId, oldColumnIndex, newColumnIndex) => {
  const columnCount = Object.values(columns).length

  // finding the dragged note
  const note = columns[oldColumnIndex].find(n => n.id === noteId)

  const newColumns = {}
  let newOrder

  // if the note stays within its initial column
  if (oldColumnIndex === newColumnIndex) {
    const columnIndex = oldColumnIndex

    // removing note from oldColumn
    newColumns[columnIndex] = columns[columnIndex].filter(
      n => n.id !== noteId
    )

    // and adding it back into the new place
    newColumns[columnIndex].splice(
      newColumns[columnIndex].findIndex(note => note.id === targetNoteId),
      0,
      note
    )

    // updating order in column
    newColumns[columnIndex] = updateOrderInColumn(
      newColumns[columnIndex],
      newColumnIndex,
      columnCount
    )

    newOrder = newColumns[columnIndex].map(toOrderArray)
  } else {
    // removing note from oldColumn and updating order in it
    newColumns[oldColumnIndex] = updateOrderInColumn(
      columns[oldColumnIndex].filter(
        n => n.id !== noteId
      ),
      oldColumnIndex,
      columnCount
    )

    newColumns[newColumnIndex] = columns[newColumnIndex]

    // inserting the note into the newColumn
    newColumns[newColumnIndex].splice(
      newColumns[newColumnIndex].findIndex(note => note.id === targetNoteId),
      0,
      note
    )

    // updating the order in the newColumn
    newColumns[newColumnIndex] = updateOrderInColumn(
      columns[newColumnIndex],
      newColumnIndex,
      columnCount
    )

    newOrder = newColumns[oldColumnIndex]
      .concat(newColumns[newColumnIndex])
      .map(toOrderArray)
  }

  return {
    newColumns,
    newOrder
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
