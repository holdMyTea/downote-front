import uuid from 'uuid/v4'

import {
  MOVE_NOTE_OVER_COLUMN,
  MOVE_NOTE_OVER_NOTE,
  CREATE_NOTE,
  EDIT_NOTE,
  DELETE_NOTE
} from '../actions/notesActions'

const makePlaceholder = i => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(i)

const initialNotes = [
  {
    id: uuid(),
    header: 'A paragraph long note',
    text: makePlaceholder(5),
    order: 0
  },
  {
    id: uuid(),
    header: 'A rather long note',
    text: makePlaceholder(12),
    order: 1
  },
  {
    id: uuid(),
    header: 'A short note but with a pic',
    text: makePlaceholder(2),
    image: true,
    order: 2
  },
  {
    id: uuid(),
    text: 'No header in the note, but still should be rendered ok',
    order: 3
  },
  {
    id: uuid(),
    header: 'Just a header here, must be smth short but important',
    order: 6
  }
]

/**
 * Creates initial state from the array of notes,
 * used in tests
 * @param {Object[]} notes - array of notes
 * @param {number} columnCount - number of notes columns
 */
export const prepareInitialState = (notes, columnCount = 3) => ({
  notes,
  columnCount,
  columns: spreadNotesToColumns(notes, columnCount)
})

/**
 * Spread a single notes array into an array of arrays
 * @param {Object[]} notes - array to unflatten
 * @param {number} columnCount - number of resulting sub-arrays
 */
const spreadNotesToColumns = (notes, columnCount) =>
  Array(columnCount).fill(0).map(
    (column, columnIndex) => notes.filter(note => note.order % columnCount === columnIndex)
  )

/**
 * Updates the order property of all notes in array
 * @param {Object[]} column - array to check
 * @param {number} columnIndex - index of supplied column
 * @param {number} columnCount - total number of columns
 */
const updateOrderInColumn = (column, columnIndex, columnCount) =>
  column.map(
    (note, index) => {
      note.order = index * columnCount + columnIndex
      return note
    }
  )

/**
   * Returns the lowest available order for the new note
   * @param {Object[]} notes - arrays of notes to check
   */
const findSmallestAvailableOrder = notes => {
  const sortedOrders = notes
    .map(note => note.order)
    .sort((a, b) => a - b)

  for (let i = 0; i < sortedOrders.length; i++) {
    if (sortedOrders[i] > i) {
      return i
    }
  }

  return sortedOrders.length
}

export const reducer = (
  state = prepareInitialState(initialNotes, 3),
  action
) => {
  switch (action.type) {
    case MOVE_NOTE_OVER_COLUMN: {
      const newColumns = [ ...state.columns ]
      // finding the dragged note
      const note = newColumns[action.oldColumnIndex].find(n => n.id === action.noteId)
      // removing the node from the oldColumn and updating order in it
      newColumns[action.oldColumnIndex] = updateOrderInColumn(
        newColumns[action.oldColumnIndex].filter(
          n => n.id !== action.noteId
        ),
        action.oldColumnIndex,
        state.columnCount
      )
      // updating the order of the note before inserting it
      note.order = newColumns[action.newColumnIndex].length * state.columnCount + action.newColumnIndex
      // inserting the note into the new column
      newColumns[action.newColumnIndex].push(note)
      return { ...state, columns: newColumns }
    }

    case MOVE_NOTE_OVER_NOTE: {
      const newColumns = [ ...state.columns ]
      // finding the dragged note
      const note = newColumns[action.oldColumnIndex].find(n => n.id === action.noteId)
      // removing the node from the oldColumn and updating order in it
      newColumns[action.oldColumnIndex] = updateOrderInColumn(
        newColumns[action.oldColumnIndex].filter(
          n => n.id !== action.noteId
        ),
        action.oldColumnIndex,
        state.columnCount
      )
      // inserting the note into the newColumn
      newColumns[action.newColumnIndex].splice(
        newColumns[action.newColumnIndex].findIndex(note => note.id === action.targetNoteId),
        0,
        note
      )
      // updating the order of the newColumn
      newColumns[action.newColumnIndex] = updateOrderInColumn(
        newColumns[action.newColumnIndex],
        action.newColumnIndex,
        state.columnCount
      )
      return { ...state, columns: newColumns }
    }

    case CREATE_NOTE: {
      const newNotes = [ ...state.notes, {
        id: uuid(),
        header: action.header,
        text: action.text,
        order: findSmallestAvailableOrder(state.notes)
      }]

      const newColumns = spreadNotesToColumns(newNotes, state.columnCount)
      newColumns.map((col, index) => updateOrderInColumn(col, index, state.columnCount))
      return {
        ...state,
        notes: newNotes,
        columns: newColumns
      }
    }

    case EDIT_NOTE: {
      const newNotes = state.notes.map(note =>
        note.id === action.noteId
          ? {
            ...note,
            id: action.noteId,
            header: action.header,
            text: action.text
          }
          : note
      )

      const newColumns = [...state.columns]
      newColumns[action.columnIndex] = newColumns[action.columnIndex].map(
        note => note.id === action.noteId
          ? {
            ...note,
            header: action.header,
            text: action.text
          }
          : note
      )
      return {
        ...state,
        notes: newNotes,
        columns: newColumns
      }
    }

    case DELETE_NOTE: {
      const newNotes = state.notes.filter(
        note => note.id !== action.noteId
      )

      const newColumns = [...state.columns]
      newColumns[action.columnIndex] = updateOrderInColumn(
        newColumns[action.columnIndex].filter(
          note => note.id !== action.noteId
        ),
        action.columnIndex,
        state.columnCount
      )
      return {
        ...state,
        notes: newNotes,
        columns: newColumns
      }
    }

    default: return state
  }
}
