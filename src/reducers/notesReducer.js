import {
  MOVE_NOTE_OVER_COLUMN,
  MOVE_NOTE_OVER_NOTE,
  CREATE_NOTE,
  RECEIVE_CREATE_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  REQUEST_NOTES,
  RECEIVE_NOTES,
  START_SYNC,
  COMPLETE_SYNC
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
  columnCount,
  isLoading: false,
  columns: spreadNotesToColumns(notes, columnCount),
  syncArray: []
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

export const reducer = (
  state = prepareInitialState([], 3),
  action
) => {
  switch (action.type) {
    case REQUEST_NOTES:
      return { ...state, isLoading: true }

    case RECEIVE_NOTES:
      return prepareInitialState(action.notes, state.columnCount)

    case CREATE_NOTE: {
      return {
        ...state,
        columns: action.newColumns
      }
    }

    case EDIT_NOTE: {
      return {
        ...state,
        columns: action.newColumns
      }
    }

    case DELETE_NOTE: {
      return {
        ...state,
        columns: action.newColumns
      }
    }

    case MOVE_NOTE_OVER_COLUMN: {
      return {
        ...state,
        columns: action.newColumns
      }
    }

    case MOVE_NOTE_OVER_NOTE: {
      return {
        ...state,
        columns: action.newColumns
      }
    }

    // TODO: move it to the rest of calculations
    case RECEIVE_CREATE_NOTE: {
      const { uiID, id, columnIndex } = action

      const newColumns = [...state.columns]
      // replacing temporal uiId with a permanent noteId from API
      newColumns[columnIndex] = newColumns[columnIndex]
        .map(note => note.id === uiID ? { ...note, id } : note)

      return {
        ...state,
        columns: newColumns
      }
    }

    case START_SYNC: {
      return {
        ...state,
        syncArray: [...state.syncArray, action.syncId]
      }
    }

    case COMPLETE_SYNC: {
      return {
        ...state,
        syncArray: state.syncArray.filter(id => id !== action.syncId)
      }
    }

    default: return state
  }
}