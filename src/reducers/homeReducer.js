import {
  MOVE_NOTE_OVER_COLUMN,
  MOVE_NOTE_OVER_NOTE,
  CREATE_NOTE,
  RECEIVE_CREATE_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  REQUEST_NOTES,
  RECEIVE_NOTES
} from '../actions/notesActions'

/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} [header]
 * @property {string} [text]
 * @property {boolean} [image] - temporal abstraction for an attached image
 * @property {number} order - integer to determine order of a note for render
 */

/**
 * Creates initial state from the array of notes,
 * used in tests
 * @param {Note[]} notes - array of notes
 * @param {number} [columnCount=3] - number of notes columns
 */
export const prepareInitialState = (notes, columnCount = 3) => ({
  notes,
  columnCount,
  isLoading: false,
  columns: spreadNotesToColumns(notes, columnCount)
})

/**
 * Spread (using order) a single notes array into an array of arrays
 * @param {Note[]} notes - array to unflatten
 * @param {number} columnCount - number of resulting sub-arrays
 * @returns {Note[][]} array of arrays (columns) of notes
 */
const spreadNotesToColumns = (notes, columnCount) =>
  Array(columnCount).fill(0).map(
    (column, columnIndex) => notes.filter(note => note.order % columnCount === columnIndex)
  )

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

export const reducer = (
  state = prepareInitialState([], 3),
  action
) => {
  switch (action.type) {
    case REQUEST_NOTES:
      return { ...state, isLoading: true }

    case RECEIVE_NOTES:
      return prepareInitialState(action.notes, state.columnCount)

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
        uiID: action.uiID,
        header: action.header,
        text: action.text,
        order: action.order
      }]

      // TODO: this can be optimized
      const newColumns = spreadNotesToColumns(newNotes, state.columnCount)
      newColumns.map((col, index) => updateOrderInColumn(col, index, state.columnCount))
      return {
        ...state,
        notes: newNotes,
        columns: newColumns
      }
    }

    case RECEIVE_CREATE_NOTE: {
      const newNotes = state.notes.map(
        note => note.uiID === action.uiID ? { ...note, id: action.id } : note
      )

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
